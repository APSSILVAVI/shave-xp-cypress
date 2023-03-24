

// padrão pascoal case pela convenção javascript
//iniciando com letra maiuscula 
class LoginPage {
    constructor(){
        this.alertError = '.alert-error'
    }

    submit(email = null, password = null) {
        cy.visit('/')
        cy.get('input[placeholder$=email]').as('email')
        cy.get('input[placeholder*=senha]').as('password')


        if (email) {
            cy.get('@email').type(email)
        }


        if (password) {
            cy.get('@password').type(password)
        }

        cy.contains('button', 'Entrar').click()
    }
    noticeShoulbe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }

    alertShoulBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)

    }

    requiredFields(emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 2)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(emailMessage)
                expect($small.get(1).textContent).to.equal(passwordMessage)
            })

    }
}

export default new LoginPage()
//exportar a classe Login e (new) ativada , com acesso a todos os recursos da classe