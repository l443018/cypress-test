describe.only('Chat and create lead', () => {
  it('displays two todo items by default', () => {
    cy.visit('https://chatfusion-demo.contactloop.com/tryhungry');
    cy.get('.conversation-container').should('have.length', 1)
    cy.get('.conversation-container textarea')
      .type('What services do you offer?').should('have.value', 'What services do you offer?')
  })
})
