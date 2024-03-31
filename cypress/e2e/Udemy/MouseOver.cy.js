/// <reference types="cypress"/>

describe('Mouse Over', () => {

    it('Mouse over using show',()=>{

        cy.visit(Cypress.env('url') +'AutomationPractice/')
        cy.get('div .mouse-hover-content').invoke('show') 
        cy.get('div.mouse-hover-content a[href="#top"]').click()
        cy.url().should('include','top')

        
    })

    it('Mouse over using force',()=>{

        cy.visit(Cypress.env('url') +'AutomationPractice/')
        //cy.get('div .mouse-hover-content').invoke('show') 
        cy.get('div.mouse-hover-content a[href="#top"]').click({force: true})
        cy.url().should('include','top')

        
    })

})