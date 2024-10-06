import { Given, When, Then,And } from "cypress-cucumber-preprocessor/Steps";
/// <reference types="cypress"/>


let filePath_data=Cypress.config('downloadsFolder')+'/order-invoice_test123.xlsx'
let sheetName_data='data'
let searchText='India'
let replaceText='Canada'

Given('User passes the excel file details which has to be modified',()=>{
    cy.task('writeExcelFile',{filePath:filePath_data, sheetName:sheetName_data
        ,searchTxt:searchText, replaceTxt:replaceText});   //call the writeExcelFile task function which is defined
        //in the cypress.congif.js file     
})

