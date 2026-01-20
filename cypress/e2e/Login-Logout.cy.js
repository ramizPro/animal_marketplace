describe('Navigation', () => {
  it('Pregleda login in logout', () => {
    cy.visit('http://localhost:3000/')
 
    cy.get('a[href*="login"]').click()
 
    cy.url().should('include', '/login')

    cy.get('h1').contains('Prijava')

    cy.get('input[name="email"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('geslo')

    cy.get('button[type*="submit"]').click()

    cy.url().should('include', '/mainPage')

    cy.get('h1').contains('AgroTrg')

    cy.contains('a', 'Odjava').click()
  })
})