// email/sendReport.js
const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendWeeklyAttendanceReport({ to, subject, html, attachmentPath }) {
  const mailOptions = {
    from: `"EPO Attendance System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments: attachmentPath ? [{
      filename: path.basename(attachmentPath),
      path: attachmentPath,
    }] : [],
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
}

module.exports = { sendWeeklyAttendanceReport };
