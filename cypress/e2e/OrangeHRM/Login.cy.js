/// <reference types="cypress"/>

import {loginPage} from "../OrangeHRM/POM/login_Page"

const login= new loginPage()

describe('Login', () => {
 
    it('Login to OrangeHRM site', () => {
      login.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      login.enterUsername('Admin')
      login.enterPassword('admin123')
      login.clickLogin()  
      

    })
  
  
  })