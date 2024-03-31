/// <reference types="cypress"/>

describe('Login', () => {

    it('Ecom veggie site',()=>{
        cy.visit(Cypress.env('url') +'seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        console.log(cy.get('.product').its('length'))
        cy.get('.product:visible')
        cy.get('.product').each(($el,index,$list)=>{
            if($el.find('h4.product-name').text().includes('Cashews')){
                cy.wrap($el).find('div.product-action button').click()
                cy.wait(2000)

                 cy.get('.cart-info >table>tbody>tr:nth-child(1)>td:nth-child(3)>strong').should('have.text','1')
                
            
            }

        })

    })

})
