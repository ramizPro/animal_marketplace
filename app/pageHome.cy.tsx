import Home from './page'; 
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

describe('Home Page Component', () => {
  // 1. Deklariraj spremenljivko zunaj, da bo dostopna vsem testom
  let mockRouter: any;

  beforeEach(() => {
    // 2. Ustvari spy-je znotraj beforeEach (tukaj je test že "running")
    mockRouter = {
      back: cy.spy().as('routerBack'),
      forward: cy.spy().as('routerForward'),
      push: cy.spy().as('routerPush'),
      replace: cy.spy().as('routerReplace'),
      refresh: cy.spy().as('routerRefresh'),
      prefetch: cy.stub().as('routerPrefetch').resolves(),
    };

    // 3. Mountaj komponento
    cy.mount(
      <AppRouterContext.Provider value={mockRouter}>
        <Home />
      </AppRouterContext.Provider>
    );
  });

  it('Pravilno izriše naslov AgroTrg', () => {
    cy.get('h1').should('contain', 'AgroTrg');
  });

  it('Preveri gumbe in njihove povezave', () => {
    cy.get('a[href="/login"]').should('be.visible');
    cy.get('a[href="/signUp"]').should('be.visible');
  });
});