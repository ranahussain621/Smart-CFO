const ExcelJS = require('exceljs');
const { parse, isValid, isWithinInterval } = require('date-fns');

async function findColumnNames(buffer, requiredColumnNames) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    const foundColumnNames = [];

    // Scan the first row for any of the specified column names
    worksheet.getRow(1).eachCell((cell, colIndex) => {
        if (requiredColumnNames.includes(cell.text.trim())) {
            foundColumnNames.push(cell.text.trim());
        }
    });

    return foundColumnNames;
}

// Define an array of date formats you expect to encounter
const DATE_FORMATS = [
    'yyyy/MM/dd', // for dates like '2005/9/21'
    'dd/MM/yyyy', // for dates like '15/09/2021'
    'MM/dd/yyyy', // add more as needed
];

function parseExcelDate(date) {
    if (typeof date === 'number') {
        // Handle date as an Excel serial number
        const originDate = new Date(Date.UTC(1899, 11, 30)); // Excel's epoch, adjusted for the leap year bug
        const parsedDate = new Date(originDate.getTime());
        parsedDate.setDate(parsedDate.getDate() + date - 2);
        return parsedDate;
    } else if (typeof date === 'string') {
        // Attempt to parse the string using the defined formats
        for (let format of DATE_FORMATS) {
            const parsedDate = parse(date, format, new Date());
            if (isValid(parsedDate)) {
                return parsedDate;
            }
        }
        // Fallback to Date.parse if no format matches
        return new Date(Date.parse(date));
    }
    return null; // return null if date is neither a number nor a string
}



async function readExcel(buffer, columnNames, startDate, endDate, dateColumnName) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];
    const columnIndices = [];
    let dateColumnIndex = -1;

    worksheet.getRow(1).eachCell((cell, index) => {
        if (cell.value === dateColumnName) {
            dateColumnIndex = index;
        }
        if (columnNames.includes(cell.value)) {
            columnIndices.push(index);
        }
    });

    if (dateColumnIndex === -1) {
        throw new Error(`Column '${dateColumnName}' not found in the Excel file.`);
    }
    if (columnIndices.length !== columnNames.length) {
        throw new Error("Not all specified columns were found in the Excel file.");
    }

    const results = columnIndices.map(() => ({ sum: 0, count: 0 }));
        worksheet.eachRow({ includeEmpty: false, skip: 1 }, function (row) {
            const excelDate = row.getCell(dateColumnIndex).value;
            const billingDate = parseExcelDate(excelDate);
            // Check if billingDate is within the specified range or null
         
                columnIndices.forEach((index, i) => {
                    const cellValue = row.getCell(index).value;
                    // Check if cell value is a number and add it to the corresponding sum
                    if (!isNaN(cellValue)) {
                        results[i].sum += cellValue;
                        results[i].count += 1;
                    }
                });
            
        });


        return results;
    }





module.exports = {
    findColumnNames,
    readExcel: (buffer, columnNames, startDate, endDate) => readExcel(buffer, columnNames, startDate, endDate, 'Billing Date'),
    readExcelEmployee: (buffer, columnNames, startDate, endDate) => readExcel(buffer, columnNames, startDate, endDate, 'Date Joined')
};
