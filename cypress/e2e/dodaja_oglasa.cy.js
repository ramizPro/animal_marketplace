describe('Dodajanje in brisanje oglasa', () => {
  it('uporabnik lahko objavi nov oglas in ga izbriše', () => {
    cy.visit('/')

    cy.get('a[href*="login"]').click()
    cy.get('input[name="email"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('geslo')
    cy.get('button[type*="submit"]').click()

    cy.contains('Objavi').click()

    cy.url().should('include', '/objavi_oglas')

    const opisOglasa = 'Prodam mladega telička, zelo miren - TEST ' + Date.now()
    
    cy.get('input[name="opis"]').type(opisOglasa)

    cy.get('select').first().select(1)
    cy.get('select').first().should('not.have.value', '')

    cy.get('select').eq(1).should('not.be.disabled')
    cy.get('select').eq(1).select(1)

    cy.get('input[name="lokacija"]').type('Maribor')
    cy.get('input[name="kontakt"]').type('040123456')
    cy.get('input[name="cena"]').type('250')

    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-slika.jpg')

    cy.get('button[type="submit"]').click()

    cy.contains('Objavljam...').should('exist')
    cy.url().should('include', '/mainPage', { timeout: 10000 })

    cy.wait(1000)
    
    cy.contains(opisOglasa).click()
    
    //cy.url().should('include', '/oglasi/')
    
    cy.contains(opisOglasa).should('exist')

    cy.contains('button', 'Izbriši').click()
    
    cy.on('window:confirm', () => true)

    cy.url().should('include', '/mainPage', { timeout: 10000 })
    
    cy.contains(opisOglasa).should('not.exist')
  })
})