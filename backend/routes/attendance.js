const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const {Attendance} = require('../models');
const { Op, Sequelize } = require('sequelize');


router.get('/sync', attendanceController.syncAttendance);

// GET all attendance records
// Replace your existing router.get('/', ...) with this:

// GET all attendance records with pagination and filtering
// router.get('/', async (req, res) => {
//   try {
//     const { page = 1, limit = 50, date, month, name, showLate } = req.query;
//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);
//     const offset = (pageNum - 1) * limitNum;

//     // Build where condition
//     const where = {};
//     if (date) where.date = date;
    
//     if (month) {
//       const [year, monthPart] = month.split('-');
//       where.date = {
//         [Op.and]: [
//           Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
//           Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), monthPart)
//         ]
//       };
//     }
    
//     if (name) where.name = { [Op.like]: `%${name}%` };

//     // Find and count records
//     const { count, rows } = await Attendance.findAndCountAll({
//       where,
//       order: [['date', 'DESC']],
//       offset,
//       limit: limitNum
//     });

//     const totalPages = Math.ceil(count / limitNum);

//     res.json({
//       data: rows,
//       total: count,
//       totalPages
//     });
    
//   } catch (error) {
//     console.error('Error fetching attendance:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// GET distinct employee names
// router.get('/employees', async (req, res) => {
//   try {
//     const employees = await Attendance.findAll({
//       attributes: ['name'],
//       group: ['name'],
//       raw: true
//     });

//     res.json(employees ? employees.map(e => e.name) : []);
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


router.get('/', attendanceController.listAttendance);              // main attendance list (filtered, paginated)
router.get('/summary', attendanceController.attendanceSummary);    // dashboard stats summary
router.get('/absent', attendanceController.absentList);            // absent employees list
router.get('/employees', attendanceController.getEmployees);       // list of all employees


// Add to attendanceRoutes.js
router.get('/debug', async (req, res) => {
  const record = await Attendance.findAll();
  res.json(record);
});


router.post('/bulk-insert', attendanceController.bulkInsertAttendance);


// Add other endpoints here...
module.exports = router;
