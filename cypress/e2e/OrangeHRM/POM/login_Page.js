/// <reference types="cypress"/>

export class loginPage{
    loginPage_userName='input[name="username"]'
    loginPage_password='input[type="password"]'
    loginPage_submitButton='button[type="submit"]'

    navigate(url){
        cy.visit(url)
    }

    enterUsername(uname){
        cy.get(this.loginPage_userName).type(uname)
    }

    enterPassword(pwd){
        cy.get(this.loginPage_password).type(pwd)
    }

    clickLogin(){
        cy.get(this.loginPage_submitButton).click()
    }
}