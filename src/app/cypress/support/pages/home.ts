// Page-specific commands
Cypress.Commands.add('verifyFeatureCard', (name: string) => {
  cy.getByTestId(`feature-${name.toLowerCase()}`).should('be.visible');
});
