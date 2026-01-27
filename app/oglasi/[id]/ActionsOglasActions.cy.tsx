import React from 'react'
import OglasActions from './Actions'

describe('<OglasActions />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<OglasActions />)
  })
})