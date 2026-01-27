import React from 'react'
import { HeaderNazaj } from './Header'

describe('<HeaderNazaj />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HeaderNazaj />)
  })
})