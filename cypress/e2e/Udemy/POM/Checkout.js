/// <reference types="cypress"/>

export class checkoutPage{
    
    chkout_chooseCountry='#country'
    chkout_Suggestion='.suggestions > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)'
    chkout_agreeCheckout='#checkbox2'
    chkout_purchase='.btn.btn-success.btn-lg'
    chkout_message='.alert.alert-success.alert-dismissible'

      selectCountry(){ //select the country to ship the order to
        cy.get(this.chkout_chooseCountry).clear()
        cy.get(this.chkout_chooseCountry).type('Ind') //select country as India
        cy.get(this.chkout_Suggestion).click() //click the dropdown with India as suggestion
    }

    selectAgreeCheckbox(){  
        //this is select the agree to terms button. Since the country dropdown is open and the user cannot
        // see this checkbox, we have to use the flag force: true
        cy.get(this.chkout_agreeCheckout).check({force:true})   
    }

    clickPurchase(){
        //click on the purchase button
        cy.get(this.chkout_purchase).click()
    }

    validateMessage(message){
        //validate the message after clicking the purchase button
        cy.contains(this.chkout_message,message)
    }

}