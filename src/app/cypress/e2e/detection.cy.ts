describe('Detection Flow', () => {
  beforeEach(() => {
    cy.visit('/capture');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg');
  });

  it('should analyze image and show results', () => {
    cy.get('[aria-label="Analyze"]').click();
    cy.url().should('include', '/detection/result');
    cy.get('[data-testid="detection-result"]').should('be.visible');
  });

  it('should allow feedback submission', () => {
    cy.get('[aria-label="Analyze"]').click();
    cy.get('[data-testid="feedback-button"]').click();
    cy.get('textarea[name="feedback"]').type('Test feedback');
    cy.get('[type="submit"]').click();
    cy.contains('Thank you for your feedback').should('be.visible');
  });
});
