const express = require('express');
const multer = require('multer');
const router = express.Router();
const excelController = require('../controllers/excelController');
const excelModel = require('../model/excelData');

// Setup Multer for memory storage of uploaded files
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('excelFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const buffer = req.file.buffer;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    try {
        const financialColumns = ['Amount in Company Currency'];
        const foundFinancialColumns = await excelController.findColumnNames(buffer, financialColumns);

        if (foundFinancialColumns.includes('Amount in Company Currency')) {
            if (financialColumns.every(col => foundFinancialColumns.includes(col))) {
                const results = await excelController.readExcel(buffer, foundFinancialColumns, startDate, endDate);
                const checkData = await excelModel.find({ company_id: req.body.company_id });
            
                if (results.length > 0) {
                    const sum = results.reduce((acc, curr) => acc + curr.sum, 0);
                    const count = results.reduce((acc, curr) => acc + curr.count, 0);
            
                    console.log(count);
            
                    if (checkData.length > 0) {
                        // Update existing data
                        await excelModel.updateOne(
                            { company_id: req.body.company_id },
                            { $set: { totalsale: sum, invoices: count } }
                        );
                    } else {
                        // Create new data
                        await excelModel.create({
                            totalsale: sum,
                            invoices: count,
                            company_id: req.body.company_id
                        });
                    }

                    return res.json({ message: 'File imported successfully.' });
                } else {
                    return res.status(400).json({ error: 'No data found in the Excel file.' });
                }
            } else {
                return res.status(400).json({ error: 'Required columns are missing in the Excel file.' });
            }
        } else {
            const employeeColumns = ['Annual Leave Taken'];
            const foundEmployeeColumns = await excelController.findColumnNames(buffer, employeeColumns);
            
            if (employeeColumns.every(col => foundEmployeeColumns.includes(col))) {
                const results = await excelController.readExcelEmployee(buffer, foundEmployeeColumns, startDate, endDate);
                const checkData = await excelModel.find({ company_id: req.body.company_id });
            
                if (results.length > 0) {
                    const sum = results.reduce((acc, curr) => acc + curr.sum, 0);
                    const count = results.reduce((acc, curr) => acc + curr.count, 0);
            
                    console.log(count);
            
                    if (checkData.length > 0) {
                        // Update existing data
                        await excelModel.updateOne(
                            { company_id: req.body.company_id },
                            { $set: { leaves: sum, totalemplyee: count } }
                        );
                    } else {
                        // Create new data
                        await excelModel.create({
                            leaves: sum,
                            totalemployee: count,
                            company_id: req.body.company_id
                        });
                    }

                    return res.json({ message: 'File imported successfully.' });
                } else {
                    return res.status(400).json({ error: 'No data found in the Excel file.' });
                }
            } else {
                return res.status(400).json({ error: 'Required columns are missing in the Excel file.' });
            }
        }
    } catch (error) {
        console.error("Error processing the uploaded file:", error);
        return res.status(500).json({ error: 'Error processing the uploaded file.' });
    }
});

module.exports = router;
