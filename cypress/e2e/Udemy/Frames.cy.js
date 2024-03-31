/// <reference types="cypress"/>
import 'cypress-iframe'

describe('Frames', () => {

    it('Switch and load iframes',()=>{

        cy.visit(Cypress.env('url') +'AutomationPractice/')
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('div.login-btn:nth-child(2) > a:nth-child(1)').click()
        cy.get('#hide-textbox').click()
        
    })



})