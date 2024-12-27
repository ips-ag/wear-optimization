import '@testing-library/cypress/add-commands';

// Generic element commands
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});
