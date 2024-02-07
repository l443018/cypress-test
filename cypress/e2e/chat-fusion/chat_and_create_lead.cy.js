describe('Chat and create lead', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.intercept('POST', '**/api/chat/bots/*/conversations').as('createConversation')
    cy.intercept('GET', '**/api/chat/universal_conversations/*/messages').as('getResponse')
  })

  it('chat with tryhungry chatbot and have response', () => {
    cy.visit('https://chatfusion-demo.contactloop.com/tryhungry')

    // get first message
    cy.wait('@createConversation', { timeout: 20000 })
    cy.get('.conversation-container').should('have.length', 1)
    cy.get('.message-wrapper.sent').should('have.length', 1)

    // send first message
    const q1 = 'What services do you offer?'
    cy.get('.conversation-container textarea')
      .type(q1).should('have.value', q1)
    cy.get('.conversation-container textarea').siblings('button').click()
    cy.wait('@getResponse', { timeout: 20000 })
    cy.get('.message-wrapper.sent').should('have.length', 2)

    // send second message
    const q2 = 'Can you tell me about the local chefs?'
    cy.get('.conversation-container textarea')
      .type(q2).should('have.value', q2)
    cy.get('.conversation-container textarea').siblings('button').click()
    cy.wait('@getResponse', { timeout: 20000 })
    cy.get('.message-wrapper.sent').should('have.length', 3)

    // send third message
    const q3 = 'Do you offer services to Los Angeles?'
    cy.get('.conversation-container textarea')
      .type(q3).should('have.value', q3)
    cy.get('.conversation-container textarea').siblings('button').click()

    cy.wait('@getResponse', { timeout: 20000 })
    cy.get('.message-wrapper.sent').should('have.length', 4)

    // create lead
    const q4 = `My name is Cypress Test, my phone number is 0000000000`
    cy.get('.conversation-container textarea')
      .type(q4).should('have.value', q4)
    cy.get('.conversation-container textarea').siblings('button').click()

    cy.wait('@getResponse', { timeout: 20000 })
    cy.get('.message-wrapper.sent').should('have.length', 5)

    cy.screenshot(`/tryhungry-${new Date().getTime()}`)
  })

  it('chat with housing chatbot and have response', () => {
    cy.visit('https://chatfusion-demo.contactloop.com/housingexperts')

    // get first message
    cy.wait('@createConversation', { timeout: 20000 })
    cy.get('.conversation-container').should('have.length', 1)
    cy.get('.message-wrapper.sent').should('have.length', 1)

    // send first message
    const q1 = 'I want to rent apartment'
    cy.get('.conversation-container textarea')
      .type(q1).should('have.value', q1)
    cy.get('.conversation-container textarea').siblings('button').click()
    cy.wait('@getResponse', { timeout: 20000 })
    cy.get('.message-wrapper.sent').should('have.length', 2)

    // send second message
    const q2 = 'California'
    cy.get('.conversation-container textarea')
      .type(q2).should('have.value', q2)
    cy.get('.conversation-container textarea').siblings('button').click()
    cy.wait('@getResponse', { timeout: 20000 })
    cy.get('.message-wrapper.sent').should('have.length', 3)

    // create lead
    const q4 = `My name is Cypress Test, my phone number is 0000000000`
    cy.get('.conversation-container textarea')
      .type(q4).should('have.value', q4)
    cy.get('.conversation-container textarea').siblings('button').click()

    cy.wait('@getResponse', { timeout: 20000 })
    cy.get('.message-wrapper.sent').should('have.length', 4)

    cy.screenshot(`/housing-${new Date().getTime()}`)
  })
})
