/// <reference types="cypress"/>

describe('Table', () => {

    it('Select a table row',()=>{

        cy.visit(Cypress.env('url') +'AutomationPractice/')
        cy.get('.table-display>tbody>tr>td:nth-child(2)').each(($el,index,$list)=>{
            //console.log($el)
            if(($el.text()).includes('Python')){
                cy.get('.table-display>tbody>tr>td:nth-child(2)').eq(index).next().then(function(price){
                        console.log(price.text())
                        expect(price.text()).equal('25')

                })
                
            }

        })

        


    })

})