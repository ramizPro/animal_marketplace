describe('Dodajanje novega oglasa', () => {
  it('uporabnik lahko objavi nov oglas', () => {
    cy.visit('http://localhost:3000/')

    // ===== PRIJAVA =====
    cy.get('a[href*="login"]').click()
    cy.get('input[name="email"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('geslo')
    cy.get('button[type*="submit"]').click()

    // ===== KLIK NA OBJAVI =====
    cy.contains('Objavi').click()

    cy.url().should('include', '/objavi_oglas')

    // ===== IZPOLNI OBRAZEC =====

    cy.get('input[name="opis"]').type('Prodam mladega telička, zelo miren')

    // izberi vrsto
    cy.get('select').first().select(1)   // prva prava vrsta (ne placeholder)
    cy.get('select').first().should('not.have.value', '')

    // izberi pasmo
    cy.get('select').eq(1).should('not.be.disabled')
    cy.get('select').eq(1).select(1)

    cy.get('input[name="lokacija"]').type('Maribor')
    cy.get('input[name="kontakt"]').type('040123456')
    cy.get('input[name="cena"]').type('250')

    // ===== UPLOAD SLIKE =====
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-slika.jpg')

    // ===== ODDAJA =====
    cy.get('button[type="submit"]').click()

    // tukaj prilagodi glede na tvoje obnašanje po submitu
    cy.contains('Objavljam...').should('exist')

    // primer – po uspehu te vrne na glavno stran
    cy.url().should('include', '/mainPage')
  })
})
