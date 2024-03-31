
/// <reference types="cypress"/>

export class selectVeg{

    selectVeg_searchInput='input.search-keyword'
    //selectVeg_clickSearch='button.search-button'
    selectVeg_product='h4.product-name'
    selectVeg_price='.product p.product-price'
    selectVeg_inputQuantity='.stepper-input input.quantity'
    //selectVeg_addToCart='div .product-action'
    selectVeg_cartIcon='.cart-icon > img'
    

    navigate(){
        cy.visit(Cypress.env('url')+'seleniumPractise/#/')
    }

    searchVeg(searchStr){
        cy.get(this.selectVeg_searchInput).type(searchStr)
        cy.wait(1000)
    }

    addVeggieToFile(filename){
        var vegArray=[]
        let vegPrice
        cy.get(this.selectVeg_product).each(($el,index,$list)=>{            
            let vegName=($el.text().split('-')[0].trim())
               cy.get(this.selectVeg_price).eq(index).then((price)=>{
                vegPrice=((price).text())
                cy.wrap(vegPrice).as('vegPrice')
            });cy.get('@vegPrice').then((vegPrice)=>{ 
            vegArray.push({id:(index+1), Name:vegName,Price:vegPrice})
            })      
        });cy.writeFile('cypress/fixtures/'+filename+'.json',vegArray)
    }

    addtoCart(filename){
        cy.readFile('cypress/fixtures/'+filename+'.json').then((veg)=>{            
            for (var index in veg) 
            {
                if(cy.get(this.selectVeg_product).contains(veg[index].Name)) 
                {
                    //cy.log(veg[index].Name)
                    cy.get('div.product:nth-child('+veg[index].id+') > div:nth-child(4) > input').clear()
                    cy.get('div.product:nth-child('+veg[index].id+') > div:nth-child(4) > input').type(veg[index].id)
                    //cy.wait(1000)
                    cy.get(':nth-child('+veg[index].id+') > .product-action > button').click()    
                }
            }
                
        })
    } 
//.cart-preview > div:nth-child(1) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2) > div:nth-child(2) > p
    validatePriceQuantity(filename){
        let vegName
        let vegPrice
        let vegQuantity
        let cartArr

        cy.get(this.selectVeg_cartIcon).click()
         cy.get('.cart-items li.cart-item:visible',).then(($el)=>{
            cartArr=Array.from($el, el=>el.innerText)
            // console.log("array "+cartArr)
        
        }).then (()=>{console.log("arr is "+cartArr)})
        // cy.get('.cart-items li.cart-item:visible',).each(($el,index,$list)=>{
        //     console.log("test "+$list.text() )
        
        // })
        // cy.readFile('cypress/fixtures/'+filename+'.json').then((veg)=>{
        //     for (var index in veg){
             
        //         //console.log('yahoo')
        //     } 

        //   })          
            

    }
	 
    
}