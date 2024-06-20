import { Given,Then,When, And } from "cypress-cucumber-preprocessor/Steps";

let token='Bearer aba32c2463a315478a1ef82489f6d3713966a011587c12d71fab88287b53235c' 
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

    Then('validates the response code {string}',(resCode)=>{
        cy.get('@res').then((res)=>{ //use the alias to get the response value in another function
            resCode=parseInt(resCode)
            expect(res.status).to.eq(resCode)//verify the status code is 200
        })

    })

    And('fetch the ids where name is',(dataTable)=>{        
            dataTable.hashes().forEach(element => { //get the values of name in the datatable array from the feature file
                cy.get('@res').then((res)=>{ //use the alias to get the response value in another function
                    for(var index in res.body){
                                                if(res.body[index].name==element.Name){ //if the reponse name is equal to the name defined in feature file
                         console.log ('Name is '+element.Name+ ' and Id is '+ res.body[index].id) //print the names
                    }  
                 }

                })           
            }) 
       })
    })

