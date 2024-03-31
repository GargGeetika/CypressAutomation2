/// <reference types="cypress"/>

export class homePage{

    homePage_url="angularpractice/"
    homePage_name='[name="name"].ng-invalid'
    homePage_email='[name="email"].ng-invalid'
    homePage_pwd="#exampleInputPassword1"
    homePage_iceCream="#exampleCheck1"
    homePage_gender="#exampleFormControlSelect1"
    homePage_employment="#inlineRadio1"
    homePage_DOB='[name="bday"].form-control'
    homePage_chkName='[name="name"].ng-valid'
    homePage_submit='[type="Submit"].btn-success'
    homePage_message='.alert'

    navigate(ur){
        // navigate to the home page url
        cy.visit(Cypress.env('url') +this.homePage_url)
    }
    addName(name){
        // fill in the name in the name field
        cy.get(this.homePage_name).type(name)

    }
    addEmail(email){
        //fill in the email in the email field. data is in the test.json file in fixtures folder
        cy.get(this.homePage_email).type(email)
    }
    addPassword(pwd){
        // fill in the pwd in the pwd field. data is in the test.json file in fixtures folder
        cy.get(this.homePage_pwd).type(pwd)
    }
    chkIcecream(){
        // select the I love icecream button :)
        cy.get(this.homePage_iceCream).check()
    }
    addGender(gender){
        //select the gender. data is in the test.json file in fixtures folder
        cy.get(this.homePage_gender).type(gender)

    }
    selectEmployment(){
        // select the employment button
        cy.get(this.homePage_employment).check()
    }
    addDOB(dob){
        // fill in the DOB. data is in the test.json file in fixtures folder
        cy.get(this.homePage_DOB).type(dob)
    }
    validateName(name){
        // the name and the name field at the end of home page should have the same value
        cy.get(this.homePage_chkName).should('have.value',name)
    }
    clickSubmit(){
        // click on submit button on home page
        cy.get(this.homePage_submit).click()
    }
    validataMessage(message){
        // validte the message on the home page after submit is clicked
        cy.get(this.homePage_message).contains(message)
    }


}