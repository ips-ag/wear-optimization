describe('Capture Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Camera Path', () => {
    it('should navigate to capture page', () => {
      cy.get('[aria-label="Capture"]').click();
      cy.url().should('include', '/capture');
      cy.get('[data-testid="camera-view"]').should('be.visible');
    });

    it('should allow taking photo', () => {
      cy.get('[aria-label="Capture"]').click();
      cy.get('[aria-label="Take Photo"]').click();
      cy.get('[data-testid="image-preview"]').should('be.visible');
    });
  });

  describe('Gallery Path', () => {
    it('should handle image upload from gallery', () => {
      cy.get('[aria-label="Gallery"]').click();
      cy.get('input[type="file"]').selectFile('cypress/fixtures/images/test-wear-pattern.png', { force: true });
      cy.get('[data-testid="image-preview"]').should('be.visible');
    });

    it('should allow retaking after gallery upload', () => {
      cy.get('[aria-label="Gallery"]').click();
      cy.get('input[type="file"]').selectFile('cypress/fixtures/images/test-wear-pattern.png', { force: true });
      cy.get('[aria-label="Retake"]').click();
      cy.get('[data-testid="camera-view"]').should('be.visible');
    });
  });

  describe('Image Actions', () => {
    it('should show action overlay after capture', () => {
      cy.get('[aria-label="Gallery"]').click();
      cy.get('input[type="file"]').selectFile('cypress/fixtures/images/test-wear-pattern.png', { force: true });
      cy.get('[data-testid="image-actions"]').should('be.visible');
      cy.get('[aria-label="Analyze"]').should('be.visible');
      cy.get('[aria-label="Retake"]').should('be.visible');
    });
  });
});
