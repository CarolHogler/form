
Cypress.Commands.add('preenchaCampoObrigatórioDepoisEnvie', function() {
    cy.get('#nome').type('Carolina')
    cy.get('#sobrenome').type('Hogler')
    cy.get('#email').type('k.hogler@gmail.com')
    cy.get('#comentario').type('Texto fictício utilizado para preenchimento do campo comentário do formulário.')
    cy.contains('button', 'Enviar').click() 
})
