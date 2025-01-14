// API Interceptors
Cypress.Commands.add('mockAnalysisAPI', (status = 'success') => {
  cy.intercept('POST', '/api/detect', req => {
    if (status === 'success') {
      req.reply({
        statusCode: 200,
        body: {
          result: {
            imageName: 'test-wear-pattern.png',
            wearCode: 'buildupOnCuttingEdge',
            wearConfidence: 0.95,
            wearCause:
              'Micro galling causes parts of the workpiece material to stick to the cutting edge, resulting in a build-up on the cutting edge',
            suggestedActions: [
              'Increase cutting speed',
              'Use sharper indexable insert',
              'Use cutting tool material with a treated (smoother) surface',
              'Increase coolant pressure/check alignment',
            ],
          },
        },
      });
    } else {
      req.reply({
        statusCode: 500,
        body: {
          error: {
            code: 'ANALYSIS_FAILED',
            message: 'Failed to analyze image',
          },
        },
      });
    }
  }).as('analysisAPI');
});
