// jobs/scheduleWeeklyReport.js
const cron = require('node-cron');
const { DateTime } = require('luxon');
const { generateWeeklyAttendancePDF } = require('../reports/weeklyAttendance');
const { sendWeeklyAttendanceReport } = require('../email/sendReport');
const { ZONE } = require('../utils/week');

function startWeeklyReportJob() {
  // Every Sunday at 08:00 (IST)
  cron.schedule('0 8 * * 0', async () => {
    try {
      const now = DateTime.now().setZone(ZONE);
      console.log(`[WeeklyReport] Starting at ${now.toISO()}`);

      const { outPath, startStr, endStr, agg, performers } = await generateWeeklyAttendancePDF({ when: now });

      const subject = `Weekly Attendance Report (Mon-Sat: ${startStr} → ${endStr})`;
      const html = `
        <p>Hello,</p>
        <p>Please find attached the weekly attendance report for <b>${startStr}</b> to <b>${endStr}</b>.</p>
        <ul>
          <li>Total Employees: ${agg.length}</li>
          <li>Perfect Attendance: ${performers.perfectAttendance.length}</li>
          <li>Late ≥ 3 Days: ${performers.late3plus.length}</li>
        </ul>
        <p>— EPO Attendance System</p>
      `;

      await sendWeeklyAttendanceReport({
        to: process.env.REPORT_TO || process.env.EMAIL_USER,
        subject, html, attachmentPath: outPath,
      });

      console.log(`[WeeklyReport] Sent: ${outPath}`);
    } catch (err) {
      console.error('[WeeklyReport] ERROR:', err);
    }
  }, { timezone: ZONE });
}

module.exports = { startWeeklyReportJob };
