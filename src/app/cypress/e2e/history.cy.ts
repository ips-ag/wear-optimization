describe('History', () => {
  beforeEach(() => {
    // Setup test data in IndexedDB
    cy.visit('/history');
  });

  it('should display analysis history', () => {
    cy.get('[data-testid="history-item"]').should('have.length.gt', 0);
  });

  it('should show analysis details', () => {
    cy.get('[data-testid="history-item"]').first().click();
    cy.get('[data-testid="analysis-details"]').should('be.visible');
  });
});
