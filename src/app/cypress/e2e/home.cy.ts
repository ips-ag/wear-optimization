describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('body').should('be.visible');
  });

  it('should display main features', () => {
    cy.getByTestId('feature-quick-scan').should('be.visible');
    cy.getByTestId('feature-smart-detection').should('be.visible');
    cy.getByTestId('feature-solutions').should('be.visible');
    cy.getByTestId('feature-history').should('be.visible');
  });

  it('should show empty recent analysis state', () => {
    cy.contains('No recent analysis yet').should('be.visible');
    cy.contains('Start by capturing a new image').should('be.visible');
  });

  it('should show how it works section', () => {
    cy.contains('How It Works').should('be.visible');
    cy.contains('Capture or upload a clear image').should('be.visible');
    cy.contains('AI analyzes the pattern').should('be.visible');
  });
});
