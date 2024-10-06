const cucumber = require('cypress-cucumber-preprocessor').default;
const excelToJson = require('convert-excel-to-json');
const { defineConfig } = require("cypress");
const fs = require('fs');
const excelToJs = require('exceljs');

async function setupNodeEvents(on, config) {
  on('file:preprocessor', cucumber());

  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync returns a Buffer
      });
      return result;
    },
    
    async writeExcelFile({ filePath, sheetName, searchTxt, replaceTxt }) {
      const workbook = new excelToJs.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet(sheetName);
      const output = await readExcel(worksheet, searchTxt);
      
      if (output.row === -1 || output.col === -1) {
        throw new Error('Cell not found');
      }

      const cell = worksheet.getCell(output.row, output.col) // Correctly access the cell
      console.log('Cell found:', cell);
      cell.value = replaceTxt;
      
      // Write to Excel file
      try {
        await workbook.xlsx.writeFile(filePath);
        return true; // Indicate success
      } catch (error) {
        console.error('Error writing Excel file:', error);
        return false; // Indicate failure
      }
    }
  });
  return config;
}

async function readExcel(worksheet, searchTxt) {
  let output = { row: -1, col: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchTxt) {
        output.row = rowNumber;
        output.col = colNumber; 
        console.log('Found:', output);
      }
    });
  });
  return output; 
}

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    url: "https://rahulshettyacademy.com/"
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  watchForFileChanges: false,
  defaultCommandTimeout: 4000,
  e2e: { 
    setupNodeEvents,     
    specPattern: "cypress/e2e/BDD/*.feature",    
  },
});
