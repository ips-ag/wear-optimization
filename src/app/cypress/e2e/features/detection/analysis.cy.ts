describe('Wear Pattern Analysis', () => {
  describe('Quick Scan Flow', () => {
    beforeEach(() => {
      cy.mockAnalysisAPI('success');
      cy.visit('/');
    });

    it('should complete full analysis flow with uploaded image', () => {
      // Verify home page elements
      cy.getByTestId('feature-quick-scan').should('be.visible');
      cy.getByTestId('feature-smart-detection').should('be.visible');
      cy.getByTestId('feature-solutions').should('be.visible');
      cy.getByTestId('feature-history').should('be.visible');

      // Start capture flow
      cy.get('[aria-label="Capture"]').click();
      cy.url().should('include', '/capture');

      // Upload image via gallery
      cy.get('input[type="file"]').selectFile('cypress/fixtures/images/test-wear-pattern.png', { force: true });

      // Wait for API call to complete
      cy.wait('@analysisAPI').then(interception => {
        // Log the response to see what we're getting
        cy.log('API Response:', JSON.stringify(interception.response?.body));
      });

      // Add debug logging for the result
      cy.window().then(win => {
        cy.log('Window State:', win);
      });

      // Verify analysis results
      cy.url().should('include', '/result');

      // Verify wear code and confidence
      cy.contains('Buildup on cutting edge').should('be.visible');
      cy.contains('95%').should('be.visible');

      // Verify cause
      cy.contains('Micro galling causes parts').should('be.visible');

      // Verify suggested actions
      cy.contains('Increase cutting speed').should('be.visible');
      cy.contains('Use sharper indexable insert').should('be.visible');
      cy.contains('Use cutting tool material with a treated (smoother) surface').should('be.visible');
      cy.contains('Increase coolant pressure/check alignment').should('be.visible');

      // Verify result is saved in history
      // cy.get('[aria-label="History"]').click();
      // cy.url().should('include', '/history');
      // cy.get('[data-testid="history-item"]')
      //   .first()
      //   .within(() => {
      //     cy.contains('Buildup on cutting edge').should('be.visible');
      //   });
    });

    it('should handle offline analysis queue', () => {
      // Simulate offline
      cy.window().then(win => {
        cy.stub(win.navigator, 'onLine').value(false);
        win.dispatchEvent(new Event('offline'));
      });

      // Capture image
      cy.get('[aria-label="Capture"]').click();
      cy.get('input[type="file"]').selectFile('cypress/fixtures/images/test-wear-pattern.png', { force: true });

      // Verify offline toast
      cy.contains('Image saved').should('be.visible');
      cy.contains('Analysis will complete when you are back online').should('be.visible');

      // Simulate coming back online
      cy.window().then(win => {
        cy.stub(win.navigator, 'onLine').value(true);
        win.dispatchEvent(new Event('online'));
      });

      // Verify analysis completed
      cy.contains('Analysis complete').should('be.visible');
      cy.get('[data-testid="history-item"]').should('be.visible');
    });
  });
});
