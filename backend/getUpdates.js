// require('dotenv').config();

// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; // Paste your token


// async function getUpdates() {
//     console.log("Telegram bot token:", TELEGRAM_TOKEN);
//   const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`;
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(JSON.stringify(data, null, 2));
// }

// getUpdates();


const { TelegramUser } = require('./models');
TelegramUser.create({ name: "BHAGYASHREE SINHA", chat_id: "2081435434" });
console.log("User created successfully.");


// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; // Paste your token
// const CHAT_ID = '7724001439'; // Your chat_id

// async function sendTest() {
//   const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
//   await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       chat_id: CHAT_ID,
//       text: "This is a test from your attendance system!",
//     }),
//   });
//   console.log('Sent!');
// }

// sendTest();
