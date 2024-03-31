import {Given, Then, When, And} from "cypress-cucumber-preprocessor/Steps";

import { homePage } from "../../Udemy/POM/HomePage";
import { productPage } from "../../Udemy/POM/ProductPage";
import { checkoutPage } from "../../Udemy/POM/Checkout";

let data 
const home=new homePage() //home page object
const product= new productPage() //product page object
const checkout=new checkoutPage() //checkout page object
const filename = 'data' //json file with phone data
 let product_phoneName='.card-body >.card-title >a' 

before(()=>{    //assign the customer data to the data variable form test json file in fixture folder
    cy.fixture('test').then((fdata)=>{
        data=fdata
    })

    cy.fixture(filename).then(()=>{ 
        //empty and reinitialize the data json file so that mobile phone data is stored dynamically
        cy.writeFile('cypress/fixtures/data.json',"[]")
    })
    
})

Given('navigate to ecom site',()=>{ //navigate to home page
    home.navigate()

})

When ('fill in the user data',()=>{ //fill in the user data from the test json file
    home.addName(data.name)
    home.addEmail(data.email)
    home.addPassword(data.password)
    home.addDOB(data.dob)
    home.chkIcecream()
    home.addGender(data.gender)
    home.selectEmployment()
})

And('validate the user data',()=>{
    //run the validations on the customer data fields.
    cy.get('[name="name"].ng-dirty').should('have.attr','minlength','2')
    home.validateName(data.name)
})

Then('click on the submit button and validate the Success message',()=>{
    //fill in the customer data and validate the success message
    home.clickSubmit()
    home.validataMessage('Success! The Form has been submitted successfully')
})

Given('navigate to the shop link',()=>{
    //Go to the mobile shop link
    product.navigate()
})

Then('write all the mobile data in the json file',()=>{
    //find all the available mobile phones for sale and push the names to data.json file
    let filedata=[]
    cy.get(product_phoneName).each(($el,index,$list)=>{ //iterate through all the mobile names
        filedata.push({id:index, phone:$el.text()}) //push the names and index to an array     
    });cy.writeFile('cypress/fixtures/data.json',filedata) //write the array data to json

})

And('user selects the phones he wants to buy',(dataTable)=>{
    cy.fixture(filename).then((data)=>{ //pull all the mobile data from data.json file
        for (var index in data){ //loop the data.json file
            //cy.log("index fixture "+ index)
            dataTable.hashes().forEach(element => { //loop the mobile data parameters from the feature file
                if(data[index].phone==element.Mobile){ //if mobile name from data file and feature file match
                    //cy.log("index datatable "+ index)
                    cy.get('.btn.btn-info').eq(data[index].id).click() //click on the Add to cart button
                }
                
            });
        }

    })

    And ('user clicks on the checkout button on the mobile selection page',()=>{
        product.checkOut() //checkout the cart once the moile phone are added to the cart
    })

    And ('user calculates the total price of selected mobile phones',($totPrice)=>{
        product.calcTotalPrice() //cal the total price of the mobile phones
        cy.wrap($totPrice).as('totPrice') //assign the value to an alias

    })

    And('user finds out the subtotal of the mobile phones',($totVal)=>{
        product.findTotalVal() //find the total price on the page of the mobile phones
        cy.wrap($totVal).as('totVal') //assign the value to an alias
        
    })
    And('user verifies the total price with the subtotal price',()=>{
        cy.get('@totPrice').then((totPrice)=>{
            cy.get('@totVal').then((totVal)=>{
                expect(totPrice).to.eq(totVal) //compare the price and it should be same
            })
                
        })

    }) 
    
    And('user clicks on checkout button on the mobile price page',()=>{
        product.checkout_cart() //check out of the price page for moile phones
    })

    And('user selects the delivery location',()=>{
        checkout.selectCountry() // select the delivery country
    }) 

    And('user agrees to the term and condition',()=>{
        checkout.selectAgreeCheckbox() //agree to the terms and conditions
    }) 

    And('user clicks on Purchase button',()=>{
        checkout.clickPurchase() //click on the purchanse button
    }) 

    Then('user verifies the message {string}',(message)=>{
        checkout.validateMessage //validate the success message
    }) 


    
    

})