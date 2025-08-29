// utils/week.js
const { DateTime } = require('luxon');

const ZONE = 'Asia/Kolkata';

function getLastWeekMonSatRange(now = DateTime.now().setZone(ZONE)) {
  // If we run on Sunday, this gives last week's Mon-Sat
  const end = now.startOf('day').minus({ days: 1 }).endOf('day'); // Saturday 23:59:59
  const start = end.minus({ days: 5 }).startOf('day');            // Monday 00:00:00
  return { start, end };
}

function ymd(dt) { return dt.setZone(ZONE).toFormat('yyyy-LL-dd'); }

function parseDateTimeFlexible(s) {
  if (!s) return null;
  const zone = ZONE;

  const candidates = [
    () => DateTime.fromSQL(s, { zone }),                         // 2025-06-02 08:58:32
    () => DateTime.fromISO(s, { zone }),                         // 2025-06-02T08:58:32
    () => DateTime.fromFormat(s, 'yyyy-LL-dd HH:mm:ss', { zone }),
    () => DateTime.fromFormat(s, 'dd/LL/yyyy HH:mm:ss', { zone }),
    () => DateTime.fromFormat(s, 'yyyy-LL-dd HH:mm', { zone }),
    () => DateTime.fromFormat(s, 'dd/LL/yyyy HH:mm', { zone }),
  ];

  for (const mk of candidates) {
    const dt = mk();
    if (dt.isValid) return dt;
  }
  return null; // will be treated as no check-in
}

// unchanged:
function isLate(checkIn) {
  if (!checkIn) return false;
  // Late if strictly AFTER 10:15 AM (10:15 equals on-time)
  const cutoff = checkIn.set({ hour: 10, minute: 15, second: 0, millisecond: 0 });
  return checkIn > cutoff;
}

module.exports = {
  ZONE,
  getLastWeekMonSatRange,
  ymd,
  parseDateTimeFlexible,
  isLate,
};
