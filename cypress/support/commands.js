// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
/// <reference types="cypress" />

Cypress.Commands.add('readWriteJson',(filename,element,index)=>{
    cy.fixture(filename).then((filedata) => {
    filedata.push({id:index, phone: element.text() })
    cy.log(filedata)
    cy.writeFile(filename, filedata)
    })
})

Cypress.Commands.add('LoginUsingAPI',()=>{

    cy.request({
        method:"POST",
        url:'https://rahulshettyacademy.com/api/ecom/auth/login',
        body:{
            "userEmail":	"test123@testmail.com",
            "userPassword":	"Wipro@123"
        },
    }).then((response)=>{
        expect(response.status).to.eq(200)
        Cypress.env('token',response.body.token)
    })
})
    
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })