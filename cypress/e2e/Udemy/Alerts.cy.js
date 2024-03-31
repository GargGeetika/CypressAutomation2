/// <reference types="cypress"/>

describe('Login', () => {

    it('Alerts and confim',()=>{

        cy.visit(Cypress.env('url') +'AutomationPractice/')
        cy.get('#alertbtn').click()
        cy.on(('window:alert'),(str)=>{
            expect(str).to.contains('Hello , share this practice')
        })

        cy.get('#confirmbtn').click()
        cy.on(('window:confirm'),(str)=>{
            expect(str).to.contains('Hello , Are you sure')
        })
        


    })

})