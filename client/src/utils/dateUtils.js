// // src/utils/dateUtils.js

// // Format date to local Indian format (DD/MM/YYYY)
// export function formatLocalDate(utcDateString) {
//   if (!utcDateString) return '';
  
//   const date = new Date(utcDateString);
//   return date.toLocaleDateString('en-IN', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   });
// }

// // Check if employee is late (shift starts at 10:00)
// export function isLate(checkInTime) {
//   if (!checkInTime) return false;
  
//   try {
//     // Extract time part (assuming format "DD/MM/YYYY HH:MM:SS")
//     const timePart = checkInTime.split(' ')[1];
//     const [hours] = timePart.split(':').map(Number);
    
//     // Shift starts at 10:00, so arrival at 10:00 or later is late
//     return hours >= 10;
//   } catch (e) {
//     console.error('Error parsing time:', e);
//     return false;
//   }
// }

// // Calculate minutes late
// export function calculateMinutesLate(checkInTime) {
//   if (!checkInTime || !isLate(checkInTime)) return 0;
  
//   try {
//     const timePart = checkInTime.split(' ')[1];
//     const [hours, minutes] = timePart.split(':').map(Number);
//     return (hours - 10) * 60 + minutes;
//   } catch (e) {
//     console.error('Error calculating late minutes:', e);
//     return 0;
//   }
// }