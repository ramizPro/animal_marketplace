import React from 'react'
import { SessionProvider } from './SessionProvider'

describe('<SessionProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SessionProvider />)
  })
})