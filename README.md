# 🏢 EPO Attendance Project

**A robust, production-grade, real-time attendance and employee management platform deployed for [Eastern Panorama Offset, Shillong](https://www.easternpanorama.com/), built with Node.js, Express, Sequelize, MySQL, and Telegram Bot.**

---

## 📸 Overview

This application provides an end-to-end solution for digital attendance tracking, shift management, and employee notifications for a busy offset printing company.  
Deployed on the company's in-house server, it automates attendance collection, absence/late detection, and HR reporting, all while keeping employees engaged through Telegram.

---

## 🚀 Live Features

- **Telegram Bot Integration**
  - Employees self-register via `/register` command.
  - Bot automatically notifies employees for missing check-outs.
- **Google Sheets Sync**
  - Fetches attendance logs directly from Google Sheets for backup & reconciliation.
  - Data can be imported and processed for **all historical dates** (not just today), fixing missed syncs/server downtimes.
- **Auto Late/Absent/Shift Tracking**
  - Dynamically marks "Late" and "Absent" based on business logic.
  - Shift times calculated automatically; absent/late marking respects office rules.
  - Automated absent marking for employees who miss check-in before cut-off.
- **Admin Dashboard & API**
  - Real-time dashboard for attendance stats (React.js/Tailwind frontend ready, if used).
  - Detailed API for HR/admin actions: viewing, updating, and exporting attendance data.
- **Automated Cron Jobs**
  - Flexible schedule for data sync, reminders, and reconciliation.
  - Runs every 5 minutes during key hours (configurable).
- **Historical Data Correction**
  - Can retroactively sync/update past days (auto-fixes missing check-outs).
- **Production-Ready Engineering**
  - Direct Sequelize model sync (no migration files; uses robust upsert/update logic).
  - Unique constraints at the DB/model level to prevent duplicate records.
  - Modular, well-organized codebase (controllers, models, routes, utils, scripts).
- **In-House Deployment**
  - Runs on Windows in company premises, fully private and secure.
- **Sample Data & Seed Scripts**
  - Seeder scripts included for quick onboarding of new employees.
  - Bulk sync/insert/clean-up utilities for database hygiene.
- **Secure and Modern**
  - Uses `helmet`, CORS, and environment-based configuration.
  - Secrets and credentials are always in `.env`, never committed.
- **Instant HR Notifications**
  - Real-time alerts for admins about attendance issues or failed syncs.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (Sequelize ORM, with direct model sync and unique constraints)
- **Messaging:** Telegram Bot API (Telegraf)
- **Scheduling:** node-cron
- **Data Integration:** Google Sheets API, Axios
- **Time/Date:** Luxon (handles IST, late/absent cutoffs)
- **Frontend (optional):** React.js, Tailwind CSS (admin dashboard)
- **Security:** Helmet, CORS

---

## 🗂️ Project Structure


backend/
├─ config/ # DB and server configs
├─ controllers/ # All business logic (including attendance processing)
├─ models/ # Sequelize models (no migrations, only models)
├─ routes/ # Express routes
├─ scripts/ # Seeder/utility scripts
├─ utils/ # Telegram bot, Google Sheets, helpers
├─ attendance_dummy.json # Sample/mock data
├─ app.js # Main server file
frontend/
├─ ... # Admin dashboard UI (if included)


---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-username/epo-attendance-project.git
cd epo-attendance-project/backend
npm install


### 2. Environment Setup

Create .env in /backend:

DB_USER=your_mysql_user
DB_PASS=your_mysql_pass
DB_NAME=attendance_db
DB_HOST=localhost
TELEGRAM_TOKEN=your_telegram_bot_token
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
SHEET_ID=your_google_sheet_id
GOOGLE_API_KEY=your_google_api_key


### 3. Database Prep

Start your MySQL server and create the attendance_db database (empty; tables auto-created).
[Optional] Run the seeder script to add employees:
node scripts/seedDoers.js


###  4. Start the Server

node app.js
Backend will run at http://localhost:5000.

🤖 Telegram Bot Usage
/register – Register your Telegram account with the system

Employees receive reminders if they forget to check-out.

Only recognized employees (in TelegramUser table) can register.

🕒 Cron Job Schedule
Morning+Afternoon: Every 5 min, 9:00–13:55 IST

Evening: Every 5 min, 17:00–20:55 IST

Night: Once at 21:00 IST

Customizable via node-cron

🧩 Features Showcase
No Duplicates: Robust DB logic & unique constraints; multiple syncs don’t create double entries.

Flexible Sync: Admin can trigger full re-sync for all days if any server downtime/data loss.

Google Sheets: Pulls and processes data from live Google Sheets attendance logs.

Auto Attendance Map: For each employee, each day, earliest IN and latest OUT are auto-detected.

Status Logic:

PRESENT if on time,

LATE if after cut-off,

ABSENT if no IN by cutoff.

Shift Time Calculation: Accurate calculation of daily working hours.

Admin Tools:

Easily view/export attendance

Manage employees

Add/remove records

🛡️ Security & Best Practices
.env config for all credentials

Uses CORS, Helmet, and input validation

Modular codebase – easy to extend or audit

No hardcoded secrets or production credentials in source


🙏 Acknowledgements
Special thanks to Eastern Panorama Offset, Shillong, for trusting me with their mission-critical attendance system!

Thanks to the open-source community for great libraries like Sequelize, Luxon, Telegraf, and Express.

💡 How to Contribute
Pull requests welcome! For major changes, please open an issue first.

✨ Why This Project Stands Out
Live deployed in a real business: Used daily by all employees at Eastern Panorama Offset.

Handles real-world edge cases: Server downtime, missing check-outs, rapid re-syncs, bulk corrections—all solved.

Clean, scalable engineering: No migration pain, simple yet powerful upsert logic, instantly extensible.

Professional stack: Modern Node.js, proven libraries, secure and maintainable.

Full documentation, seed scripts, and setup instructions for easy adoption elsewhere.

📈 Interested Companies/HR
This repo showcases my ability to build real-world, production-level, reliable backend systems, integrate with external APIs (Telegram, Google Sheets), implement robust business logic, and deliver clear, maintainable code.
Let’s work together!

