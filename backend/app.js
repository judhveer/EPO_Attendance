process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});


const sequelize = require('./config/db');




require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const cron = require('node-cron');
const { Op } = require('sequelize');
const axios = require('axios');
const attendanceRoutes = require('./routes/attendance');
const { TelegramUser, Attendance } = require('./models');
const { sendTelegramMessage } = require('./utils/telegram');
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const { DateTime } = require('luxon');
const bot = require("./utils/bot");




const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(helmet());


app.use(express.static('dist'));


app.use(express.json());
app.use('/api/attendance', attendanceRoutes);






// At minute 0 past every hour from 10 through 18 (10 AM - 6 PM) every day
// 0 10-20 * * *

// Morning + Early Afternoon: every 5 minutes from 9:00 to 13:55
cron.schedule('*/5 9-13 * * *', async () => {
  try {
    console.log('Running attendance sync cron job (office hours)...');
    const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
    const res = await axios.get(`${BASE_URL}/api/attendance/sync`);
    console.log('Attendance sync result:', res.data);
  } catch (error) {
    console.error('Attendance sync cron failed:', error.response?.data || error.message);
  }
});


// Evening: every 5 minutes from 17:00 to 20:55
cron.schedule('*/5 17-20 * * *', async () => {
  try {
    console.log('Running attendance sync cron job (office hours)...');
    const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
    const res = await axios.get(`${BASE_URL}/api/attendance/sync`);
    console.log('Attendance sync result:', res.data);
  } catch (error) {
    console.error('Attendance sync cron failed:', error.response?.data || error.message);
  }
});

// Once at 21:00

cron.schedule('0 21 * * *', async () => {
  try {
    console.log('Running attendance sync cron job (office hours)...');
    const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
    const res = await axios.get(`${BASE_URL}/api/attendance/sync`);
    console.log('Attendance sync result:', res.data);
  } catch (error) {
    console.error('Attendance sync cron failed:', error.response?.data || error.message);
  }
});





cron.schedule('0,15 18-20 * * *', async () => {
  const today = DateTime.now().setZone('Asia/Kolkata').toFormat('yyyy-MM-dd');

  console.log("today:", today);
  // find all employees who checked in but NOT checked out today
  const missingCheckout = await Attendance.findAll({
    where: {
      date: today,
      check_in_time: { [Op.not]: null },
      check_out_time: null
    }
  });
  console.log('Missing checkout records:', missingCheckout.map(r => r.name));

  for (const record of missingCheckout) {
    const user = await TelegramUser.findOne({
      where: {
        name: record.name
      }
    });

    console.log('User:', user);

    if (user && user.chat_id) {
      await sendTelegramMessage(
        user.chat_id,
        `Hi ${record.name}, you forgot to check out. Please check out at your earliest convenience and please remember to do so next time. Thanks`
      );
      console.log('sending telegram reminder for missing checkout to', record.name);
    }
  }

  console.log('Telegram reminders sent for missing checkouts');
});



(async () => {
  try {
    await sequelize.sync({ alter: true }); // sync DB
    console.log("Database synced");
    await bot.telegram.deleteWebhook();
    bot.launch();
    // start bot
    console.log("Bot is running");
  } catch (error) {
    console.log("Startup error: ", error);
  }
})();





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Backend running on http://0.0.0.0:${PORT}`);
// });


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));