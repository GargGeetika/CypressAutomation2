/// <reference types="cypress"/>

describe('Login', () => {

    it('Child tabs or windows',()=>{

        cy.visit(Cypress.env('url') +'AutomationPractice/')
        cy.get('#opentab').invoke('removeAttr','target').click()
        cy.wait(2000)
        //you have to give origin again when you move from one domain to another like in this case
        // we moved from rahulshettyacademy to qaclickacademy
        cy.origin('https://www.qaclickacademy.com/',()=>{
            cy.url().should('contain','https://www.qaclickacademy.com/')
        })

        //use the below code to navigate to child window and navigate back when we are in same domain.
        //refer--https://www.tutorialspoint.com/cypress/cypress_child_windows.htm


        //cy.url().should('contain','https://rahulshettyacademy.com/')
        //cy.go('back')
        


    })

})