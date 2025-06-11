require('dotenv').config();
const { Attendance, TelegramUser } = require('../models');
const { Op } = require('sequelize');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

async function pollTelegramUpdates(offset = 0) {
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates?offset=${offset}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log("telegram data:", data);

        if (!data.ok) {
            console.error("Telegram API error:", data.description);
            return offset;
        }

        for (const update of data.result) {
            if (!update.message) continue; //  Skip non-message updates

            const chat_id = String(update.message.chat.id);
            // You can combine first and last name or use username for better matching
            const firstName = (update.message.from.first_name)?.toUpperCase();
            const lastName = (update.message.from.last_name)?.toUpperCase();
            
            
            const telegramName = lastName ? `${firstName} ${lastName}`.trim().toUpperCase() : firstName;
            

            if (!chat_id && !firstName && !lastName && !telegramName) continue; // Skip messages without name or username

            console.log("Chat ID:", chat_id);
            console.log("First Name:", firstName);
            console.log("Last Name:", lastName);
            console.log("Telegram Name:", telegramName);


            // Already present?
            let user = await TelegramUser.findOne({ where: { chat_id } });

            console.log("User:", user);

            if (!user) {
                // Try to match with Attendance table (case-insensitive)
                const match = await Attendance.findOne({
                    where: {
                        [Op.or]: [
                            { name: { [Op.like]: `%${firstName || ''}%` } },
                            { name: { [Op.like]: `%${lastName || ''}%` } },
                            { name: { [Op.like]: `%${telegramName || ''}%` } }
                        ]
                    }
                });

                console.log("Match:", match);

                const nameToStore = match ? match.name : telegramName;
                await TelegramUser.create({ name: nameToStore, chat_id });
                console.log(`Added Telegram user: ${nameToStore} (${chat_id})`);
            }
        }

        // Return the next offset for polling
        console.log("Next offset:", offset);
        return data.result.length ? data.result[data.result.length - 1].update_id + 1 : offset;
    }
    catch (error) {
        console.error("Polling Error:", error);
        return offset;
    }
}

function startTelegramUserSync() {
    let offset = 0;
    (async function pollLoop() {
        while (true) {
            offset = await pollTelegramUpdates(offset);
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds delay
        }
    })();
}

module.exports = { startTelegramUserSync };