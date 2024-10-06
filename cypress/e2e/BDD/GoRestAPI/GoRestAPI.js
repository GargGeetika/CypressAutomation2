import { Given, When, Then,And } from "cypress-cucumber-preprocessor/Steps";
/// <reference types="cypress"/>
const neatCSV=require('neat-csv')


let token='Bearer aba32c2463a315478a1ef82489f6d3713966a011587c12d71fab88287b53235c' 
let pattern="" //used in post call to make a random email
let randomEmail="" //this variable stores a random email value generated
let userId="" //used to store the system generated user id after the post request
let email="" //email is where the final email value is stored
let filedata = []
let fixtureFile='GoRestAPI.json'

//GET API call to pull all the userss
Given('user uses a Get api call to fetch data',()=>{
    cy.request({
        method:'Get', //invoke get method
        url:'https://gorest.co.in/public/v2/users', //pass the url to the request
        headers:{
            'Authorization':token           
        }  
    }).then((res)=>{ //get the response in the res variable
        cy.wrap(res).as('res') //set res as alias for response
    })  
})  

//POST call to insert new data.
    Given('user wants to enter new data using the post call',()=>{
        pattern='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'//define a random pattren for email
        for (var i=0;i<7;i++) // loop the pattern so that some alpha and numbers can be randomly choosen for email
            randomEmail = randomEmail+pattern.charAt(Math.floor(Math.random() * pattern.length))// store the 7 char email
            email=randomEmail+'@testmail.com'// this is the final email value
            filedata.push({ // push all the new user values in array
                id:"",
                name: "Test Automation",
                gender:"female",
                status: "active",
                email:email
          });cy.writeFile('cypress/fixtures/'+fixtureFile, filedata) //write the user data to fixture file

          //now we are ready to post the data using the POST API call
          cy.fixture(fixtureFile).then((dataJson) => { //access data from fixture file
           cy.request({
                method:'POST',  //invoke the post API Request
                url:'https://gorest.co.in/public/v2/users', //pass the endpoint
                headers:{
                    'Authorization':token
                },  
                body: dataJson[0] //pass the fixture file data as body
            })
            }).then((res)=>{ //store the response in the variable
                cy.wrap(res).as('res') //set res as alias for response
                userId=res.body.id //store the new userid generated from POST call in the userId variable
            })
    })

    //this is the PUT call API we will update and validate the data we posted using the POST call
    Given('user wants to update the data of the user record',()=>{
        cy.fixture("GoRestAPI").then((dataJson) => {
            cy.request({
                    method:"PUT", //invoke the PUT API call
                    url:'https://gorest.co.in/public/v2/users/'+userId, //in the url append the userid so that only that user is updated
                    headers:{
                        'Authorization':token
                    },
                    body:{ //update the data of the user
                            "name": dataJson[0].name + ' test',
                            "email": dataJson[0].email,
                            "gender": "male",
                            "status": "inactive"
                    },
                }).then((res)=>{  //store the updated response in res variable                  
                    cy.readFile("cypress/fixtures/" +fixtureFile, (err, data) => {
                        if (err) {
                            return console.error(err);
                        };
                    }).then((data) => { //update the data array with the new data from the response
                        data[0].id=res.body.id,
                        data[0].name=res.body.name,
                        data[0].email=res.body.email,                      
                        data[0].gender=res.body.gender,
                        data[0].status=res.body.status                        
                        cy.writeFile('cypress/fixtures/'+fixtureFile, data)//write the fixute file with the updated data                       
                    }).then(()=>{
                        cy.wrap(res).as('res')//store the response as Alias so that we can validate the data 
                     })   
                                    
                })
            })    
    })

    //GET API call to get the updated data and validate it
    Given ('user uses a Get api call to fetch data using id',()=>{
        cy.request({
            method:'GET', 
            url:"https://gorest.co.in/public/v2/users/"+userId,
            headers:{
                'Authorization':token
            }
        }).then((res)=>{ //get the response in the res variable
            cy.wrap(res).as('res') //set res as alias for response so that we can validate the data 
        })  

    })

    // Delete the data created using the POST call
    Given ('Delete the user created using id',()=>{
        cy.request({
            method:'DELETE',
            url:"https://gorest.co.in/public/v2/users/"+userId,
            headers:{
                'Authorization':token
            }
        }).then((res)=>{ //get the response in the res variable
            cy.wrap(res).as('res') //set res as alias for response
            console.log(res)
        }) 
    })

    //use intercept method to mock the user data. you can give static data in body or use the fixture file
    Given ('Mocking data with intercept call',()=>{
        cy.visit('https://gorest.co.in/') //navigate to the URL
        
        cy.intercept({ //this is the method to intercept the API call
            method:'GET', //we are going to intercept the get method
            url:'https://gorest.co.in/public/v2/users' //this is the endpoint we are going to intercept
            
        },
        {
        statusCode:200,
        fixture: 'GoRestAPI.json' //we are giving the user data from the fixture
        // body: { //this is the part where we can give static data to intercept
                
        //         id: 1234, 
        //         name: "Monika Ahi LLD", 
        //         email: "Monika.Ahi@nicolas-herzog.example",
        //         gender:	"female",
        //         status:	"active"
        //     }
        }).as('users')//store the intercept object in a variable
        cy.get('table.table-responsive-sm:nth-child(2)>tbody>tr:nth-child(1)>td>samp>a.text-white')
        .invoke('removeAttr','target').click() //click on the link which invokes the GET API. Since the link opens
        // as new tab we used removeAttr property so that new tab is not opened. same tab is used
        cy.wait('@users').then(res =>{ //wait till intercept is done and store the response in res
            console.log(JSON.stringify(res.response))// print the response in console to check.
            
        })

    })  

    //this function validates the response code of all API calls
    Then('validates the response code {string}',(resCode)=>{
        cy.get('@res').then((res)=>{ //use the alias to get the response value in another function
            resCode=parseInt(resCode)//convert resCode to Int
            expect(res.status).to.eq(resCode)//verify the status code is matching
        })
    })

    And ('validate the body of the response',()=>{
        cy.readFile('cypress/fixtures/GoRestAPI.json').then((dataJson) => { 
            cy.get('@res').then((res)=>{ //use the alias to get the response value in another function
                expect(res.body).has.property("gender",dataJson[0].gender) //validate the reponse body gender against the json gender
                expect(res.body).has.property("email",dataJson[0].email) //validate the reponse body gender against the json gender
                expect(res.body).has.property("name",dataJson[0].name) //validate the reponse body name against the json name
                expect(res.body).has.property("status",dataJson[0].status) //validate the reponse body status against the json status
            })
        })
    })

    //GET specific users as defined as parameter in the BDD data table
    And('fetch the ids where name is',(dataTable)=>{        
        dataTable.hashes().forEach(element => { //get the values of name in the datatable array from the feature file
            cy.get('@res').then((res)=>{ //use the alias to get the response value in another function
                for(var index in res.body){
                                            if(res.body[index].name==element.Name){ //if the reponse name is equal to the name defined in feature file
                     //console.log ('Name is '+element.Name+ ' and Id is '+ res.body[index].id) //print the names
                }  
             }

            })           
        }) 
   })

   Given ('User navigates to the website with stored session token',()=>{
    cy.LoginUsingAPI().then(()=>{
        cy.visit('https://rahulshettyacademy.com/client',{
            onBeforeLoad: function (window){
                window.localStorage.setItem('token',Cypress.env('token'))
            }    
        })
    })
})

Then ('place an order in the cart',()=>{
    cy.get('.card-body>button.w-10').eq(1).click()
    cy.get('.ng-star-inserted>app-sidebar>nav>ul>li button[routerlink="/dashboard/cart"]').click()
    cy.get('div.cartSection>button.btn-primary').click()

})

And ('select the country and place the order',()=>{
    cy.get('div.form-group>input.text-validated').type('Ind')
    cy.get('.ta-results>button').each(($el,index,$list)=>{
        if($el.text()=== ' India') cy.wrap($el).click()
    })
    cy.get('.action__submit').click()
    cy.wait(2000)
    cy.get('tbody>tr>button.btn.btn-primary.mt-3.mb-3:contains("CSV")').click()
})

And ('download the order csv file',()=>{
    cy.get('tbody>tr>button.btn.btn-primary.mt-3.mb-3:contains("CSV")').click()
    //cy.readFile('/Downloads/fileName.zip').should('exist')
    cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_test123.csv").then(async(text)=>{
        const csv= await neatCSV(text)
        console.log(csv)

    })

})

And ('download the order excel file',()=>{
    cy.get('tbody>tr>button.btn.btn-primary.mt-3.mb-3:contains("Excel")').click()
    const filePath=Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_test123.xlsx"
    //C:\Projects\CypressAutomation\CypressAutomation2\cypress\downloads\order-invoice_test123.xlsx
    cy.task('excelToJsonConverter',filePath).then((result)=>{
        console.log(result)
        cy.log("Product Name= "+result.data[1].B)
    })
    
 
})