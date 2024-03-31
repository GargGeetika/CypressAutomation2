/// <reference types="cypress"/>

import {homePage} from "../Udemy/POM/HomePage"
import { productPage } from "../Udemy/POM/ProductPage"
import { checkoutPage } from "../Udemy/POM/Checkout"

describe('Frames', () => {
    let data
    const home= new homePage()
    const product= new productPage()
    const checkout=new checkoutPage()
    //const url="https://rahulshettyacademy.com/"
    const filename = 'data'  
    const message='Success! Thank you! Your order will be delivered in next few weeks'          
                
    before(()=>{
        
        cy.fixture('test').then((fdata)=>{
            //this is pulling the data for home page
            data=fdata
        })
        cy.fixture(filename).then(()=>{
            //reset the data.json file to a empty file with [] so that file can be rewritten with every run
            cy.writeFile('cypress/fixtures/data.json',"[]")
        })
    })
    it('Use Fixtures to get data-Home Page',()=>{

        home.navigate() //navigate to home page
        home.addName(data.name)// fill in name
        //make sure the name field has the mandatory condition of min len=2
        cy.get('[name="name"].ng-dirty').should('have.attr','minlength','2')
        home.addEmail(data.email)// fill in email
        home.addPassword(data.password)// fill in pwd
        home.chkIcecream()//check the icecream check box
        home.addGender(data.gender)// select the gender
        home.selectEmployment()//select employment
        home.addDOB(data.dob)// fill in the DOB
        home.clickSubmit()// click on submit
        home.validataMessage('Success! The Form has been submitted successfully')// validate the message
        
        
    })

    it('Write the phone name in json file in fixture',()=>{

        product.navigate()//navigate to url of mobile selection page

        let filedata = []//define an array
        //push all the mobile names into the data.json
        cy.get('h4.card-title a[href="#"]').each(($el,index,$list)=>{    
            //push into data.json the index and mobile name       
             filedata.push({id:index, phone: $el.text()}) //push the data in the array filedata          
        });cy.writeFile('cypress/fixtures/data.json', filedata) //now write the array into the empty json
    })

    it('Iterate through the Phone json and click on the add to cart button',()=>{

        let phoneArray

        product.navigate()// navigate to the website

        cy.fixture(filename).then((data) => { // access the data in the data.json file
            for (var index in data) { // run this loop for all the phone in data.json file
              phoneArray=['iphone X', 'Samsung Note 8','Blackberry']// define the mobile phones user wants to buy
                for (var i in phoneArray) { // run this loop for all the selected phones by user
                    if (data[index].phone == phoneArray[i] ) {
                        //click add to cart button for these 3 phones types
                        cy.get('.btn.btn-info').eq(data[index].id).click()
                    }
                   
                }
            }
        })

        product.checkOut()
        cy.wait(2000)                           
           
        // store the calulated total price into the totalPrice variable. Assgin a alias to it
        // so that the alias can be used later to compare total price with total value of phones
           product.calcTotalPrice().then(($totalPrice)=>{ //store the returned value from the function
                var totPrice=$totalPrice
                //assign a aliases 
                cy.wrap(totPrice).as('totPrice')               
              }) 
            
        // store the calulated total value into the totalval variable. Assgin a alias to it
        // so that the alias can be used later to compare total price with total value of phones  
            product.findTotalVal().then (($totalval)=>{ //store the returned value from function
                var totVal=$totalval
                //assign a aliases 
                cy.wrap(totVal).as('totVal')               
            })

            cy.get('@totPrice').then((totPrice)=>{ //fetch value of total price
                cy.get('@totVal').then((totVal)=>{ //fetch value of total val 
                    expect(totPrice).to.eq(totVal) // compare total Price and total val
                })
                
            })
            product.checkout_cart() //checkout the cart after comparing the total price with total value
            cy.wait(2000)
            checkout.selectCountry()//fill in the country of purchase
            checkout.selectAgreeCheckbox() // select the agree checkbox
            checkout.clickPurchase()  //click on the purchase button    
            checkout.validateMessage(message) //validate the success message after purchase is done. 
            
    })


})