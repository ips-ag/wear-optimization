describe('Smoke Tests', () => {
  it('should load home page', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
  });

  it('should navigate to main features', () => {
    cy.visit('/');
    cy.get('[aria-label="Capture"]').should('be.visible');
    cy.get('[aria-label="History"]').should('be.visible');
  });
});
