describe('template spec', () => {
  it('Implicit Assertions', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('get').click()
    cy.get('#query-btn',{timeout:7000})
      .should('contain','Button')
      .should('have.class','query-btn')
      .should('be.visible')
      .invoke('attr','id').should('equal','query-btn')

      //chaining assertions with and
      cy.get('#query-btn')
        .should('contain','Button')
        .and('have.class','query-btn')
        .and('be.visible')
        .invoke('attr','id').should('equal','query-btn')

    
  })

  it('Explicit Assertions', () => {
    // there will be no logs if the tests pass. Logs will only show failures
    //expect assertion
    expect(true).to.be.true

    let name='Olivia'
    expect(name).to.be.equal('Olivia')

    //assert assertion

    assert.equal(4,4,'not equal')
    assert.strictEqual(4,'4','not equal')
    

  
  })

})