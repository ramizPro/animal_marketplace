describe('Filtri živali', () => {
  it('preveri vse kombinacije vrste in pasme', () => {
    cy.visit('http://localhost:3000/')

    // prijava
    cy.get('a[href*="login"]').click()
    cy.get('input[name="email"]').type('test1@gmail.com')
    cy.get('input[name="password"]').type('geslo')
    cy.get('button[type*="submit"]').click()

    // ====== TVOJ DEL ======
    cy.get('select').first().then($select => {
      const vrste = [...$select.find('option')].map(o => o.value)

      vrste.forEach(vrsta => {
        cy.get('select').first().select(vrsta)

        if (vrsta === '') {
          cy.get('select').eq(1).should('be.disabled')
        } else {
          cy.get('select').eq(1).should('not.be.disabled')

          cy.get('select').eq(1).then($pasme => {
            const pasme = [...$pasme.find('option')].map(o => o.value)

            pasme.forEach(p => {
              cy.get('select').eq(1).select(p)
              cy.get('select').eq(1).should('have.value', p)
            })
          })
        }
      })
    })
  })
})
