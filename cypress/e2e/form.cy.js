///<reference types="Cypress" />
describe('Centro de Apoio aos Usuário-s', function() {
    const THREE_SECONDS_IN_MS = 3000
    this.beforeEach(function () { 
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação.', function() {
       cy.title().should('be.equal','Centro de Atendimento aos Usuário-s')
    })
    it('Verifica o preenchimento dos campos obrigatórios e realiza o envio do formulário.', function() {
        const longText = 'Variavél de texto longo para preenchimento rápido do campo de solicitação no teste realizado pelo Centro de Atendimento aos Usuário-s (CAU-s). Isso torna o preenchimento do teste mais rápido.'
        cy.clock()        
        cy.get('#firstName').type('Carolina')
        cy.get('#lastName').type('Hogler')
        cy.get('#email').type('k.hogler@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click() 
        cy.get('.success').should('be.visible') 
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible') 
    })
    it('Verifica a apresentação da mensagem de erro em tela quando o usário enviar o formulário preenchido com o campo e-mail no formato inválida.', function() {
        cy.clock()
        cy.get('#firstName').type('Carolina')
        cy.get('#lastName').type('Hogler')
        cy.get('#email').type('k.hogler@gmail,com')
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click() 
        cy.get('.error').should('be.visible') 
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible') 
    })
    Cypress._.times(3, function() { 
        it('Verifica se o campo Telefone permanece vazio quando preenchido com um valor não numérico.', function() {
            cy.get('#phone')
              .type('abcdefg')
              .should('have.value', '')
        })
    })
    it('Verifica a apresentação da mensagem de erro quando o campo Telefone for obrigatório, mas não ter sido preenchido antes do envio do formulário.', function() {
        cy.clock()        
        cy.get('#firstName').type('Carolina')
        cy.get('#lastName').type('Hogler')
        cy.get('#email').type('k.hogler@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible') 
    })
    it('Verifica o preenchimento e a limpeza dos campos de nome, sobrenome, e-mail e telefone.', function() {
        cy.get('#firstName').type('Carolina').should('have.value', 'Carolina').clear().should('have.value', '')
        cy.get('#lastName').type('Hogler').should('have.value', 'Hogler').clear().should('have.value', '')        
        cy.get('#email').type('k.hogler@gmail.com').should('have.value', 'k.hogler@gmail.com').clear().should('have.value', '')        
        cy.get('#phone').type('47984138128').should('have.value', '47984138128').clear().should('have.value', '')
    })
    it('Verifica a apresentação da mensagem de erro ao clicar no botão Enviar sem ter preenchido os campos obrigatórios.', function() {
        cy.clock()
        cy.contains('button', 'Enviar').click() 
        cy.get('.error').should('be.visible') 
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible') 
    })
    it('Verifica o envio do formulário aprensentando a mensagem de sucesso usando um comando personalizado.', function() {
        cy.clock()
        cy.preenchaCampoObrigatórioDepoisEnvie()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible') 
    })
    it('Verifica a seleção do produto Youtube pelo seu texto.', function() {     
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
   })
   it('Verifica a seleção do produto Mentoring pelo seu valor', function() {
      cy.get('#product').select('mentoring').should('have.value', 'mentoring')
   })
    it('Verifica a seleção do produto Blog pelo seu índice.', function() {
      cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('Verifica a disponibilidade do campo Tipo de Serviço e marca a opção de feedback.', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    it('Verifica a disponibilidade do campo Tipo de Serviço e marca todas as opções de serviço.', function(){
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {  
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
    it('Verifica a disponibilidade do campo com caixa de seleção e marca as duas caixas de seleção e desmarca a última.', function() {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')  
    })

    it('Verifica a disponibilidade do campo para seleção de arquivo e seleciona um arquivo da pasta de fixtures.', function() {
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json').should(function($input) { 
          expect($input[0].files[0].name).to.equal('example.json') 
        })
    })
    it('Verifica a disponibilidade da seleção de arquivo simulando arrastar e soltar', function() {
        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'}).should(function($input) { 
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Verifica a disponibilidade de seleção de arquivo usando um acessório que recebeu um alias.', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input) { 
            expect($input[0].files[0].name).to.equal('example.json') 
        })
    })
    it('Verifica se a política de privacidade abre em outra aba sem a necessidade de um clique.', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank') 
    })
    it('Verifica o acesso à página de política de privacidade removendo o alvo e, em seguida, removendo o link.', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('USF').should('be.visible')   
    })

    it('Verifica a disponibilidade de exibir e ocultar mensagens de sucesso e erro usando .invoke.', function() {
        cy.get('.success').should('not.be.visible').invoke('show').should('be.visible').and('contain', 'Message sent successfully.').invoke('hide').should('not.be.visible') //verificar se não está visivel
        cy.get('.error').should('not.be.visible').invoke('show').should('be.visible').and('contain', 'Validate the required fields!').invoke('hide').should('not.be.visible')
      })  
    it('Verifica o preenchimento da área de texto usando o comando .invoke.', function() {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
    })  
})