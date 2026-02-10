import { HeaderMain } from './Header';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SessionProvider } from 'next-auth/react';

describe('HeaderMain Component', () => {
  // Pripravimo mock za router
  const createMockRouter = (overrides = {}) => ({
    back: cy.spy().as('routerBack'),
    forward: cy.spy().as('routerForward'),
    push: cy.spy().as('routerPush'),
    replace: cy.spy().as('routerReplace'),
    refresh: cy.spy().as('routerRefresh'),
    prefetch: cy.stub().resolves(),
    ...overrides,
  });

  it('Prikaže gumb za Prijavo, če uporabnik ni prijavljen', () => {
    const mockRouter = createMockRouter();

    cy.mount(
      <AppRouterContext.Provider value={mockRouter as any}>
        <SessionProvider session={null}>
          <HeaderMain />
        </SessionProvider>
      </AppRouterContext.Provider>
    );

    cy.get('a').contains('Prijava').should('be.visible');
    cy.get('a').should('have.attr', 'href', '/login');
  });

  it('Prikaže gumb za Odjavo, če je uporabnik prijavljen', () => {
    const mockRouter = createMockRouter();
    const mockSession = {
      user: { name: 'Test Uporabnik', email: 'test@agro.si' },
      expires: '2025-01-01',
    };

    cy.mount(
      <AppRouterContext.Provider value={mockRouter as any}>
        <SessionProvider session={mockSession as any}>
          <HeaderMain />
        </SessionProvider>
      </AppRouterContext.Provider>
    );

    cy.get('button').contains('Odjava').should('be.visible');
  });
});