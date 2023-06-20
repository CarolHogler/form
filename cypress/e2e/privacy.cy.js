
Cypress._.times(5, function() {
    it('Independently validates privacy policy page', function() {
        cy.visit('./src/privacy.html')    
        cy.contains('Form').should('be.visible')
    })
})