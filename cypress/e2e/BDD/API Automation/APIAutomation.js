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