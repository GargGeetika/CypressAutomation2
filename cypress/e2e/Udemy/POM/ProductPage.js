/// <reference types="cypress"/>

export class productPage{
    
    productPage_url="angularpractice/shop/" //
    productPage_checkout='a.nav-link.btn-primary'
    productPage_totalCol='.table > tbody:nth-child(2) > tr > td:nth-child(4)'
    productPage_totalVal='h3:nth-child(1) > strong'
    totalPrice=0
    totalVal=0
    productPage_cart_checkout='.btn.btn-success'
    
    navigate(){
        //go to the url of the product page to select the mobiles
        cy.visit(Cypress.env('url') +this.productPage_url)
        cy.wait(2000)
    }
    checkOut(){
        //this is the checkout button on the mobile selection page
        cy.get(this.productPage_checkout).click()
    }

    calcTotalPrice(){  
        //calculate the total price of the selected mobile phones      
        return cy.get(this.productPage_totalCol).each(($el,index,$list)=>
            {
                   if(($el.text()!='Total')) { 
                    //split the rupee sign from the price by splitting at the space in bwtween them
                    var total= $el.text().split(' ')[1].trim()  
                    this.totalPrice=parseInt(this.totalPrice)+parseInt(total)
                    } else {
                        //if the value of $el total or anything else break out of if
                        return false
                    }                       
            }) .then(()=>{
                //after the price is calc in the if condition return the value of total price to the calling func
                return this.totalPrice
            })     
    }

    
    findTotalVal(){   
        // find the element which has the total value of the products selected   
        return cy.get(this.productPage_totalVal).then((element)=>{
            //split the rupee sign from the price by splitting at the space in bwtween them
            this. totalVal=parseInt(element.text().split(' ')[1].trim()) 
        }) .then(()=>{
            return this.totalVal
        })   
    }

    checkout_cart(){
        //this is the cart checkout button after the totals are compared.
        //user wiil be taken to select the country page and purchase is completed
        cy.get(this.productPage_cart_checkout).click()
    }
    

}