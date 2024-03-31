/// <reference types="cypress"/>

import {selectVeg} from "../../Udemy/Veg-ecom/POM/selectVeg"


describe('Veg eCom', () => {
   
    const veg=new selectVeg()
    const filename='vegList'
                
    before(()=>{
        
        // cy.fixture('test').then((fdata)=>{
        //     //this is pulling the data for home page
        //     data=fdata
        // })
        cy.fixture(filename).then(()=>{
            //reset the data.json file to a empty file with [] so that file can be rewritten with every run
            cy.writeFile('cypress/fixtures/'+filename+'.json',"[]")
        })
    })
    it('Buy Veggies',()=>{
        veg.navigate()
        veg.searchVeg('MA')
        veg.addVeggieToFile(filename)
        veg.addtoCart(filename)
        veg.validatePriceQuantity(filename)

        
        
        
    })
})