import React from 'react'
import { HeaderMain } from './Header'

describe('<HeaderMain />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HeaderMain />)
  })
})