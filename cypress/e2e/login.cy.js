import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/Shavers'
import header from '../support/components/header'
// import data from '../fixtures/users-login.json'

describe('login', () => {
    beforeEach(() => {
        cy.fixture('users-login').then(function (data) {
            this.data = data

        })
    })


    context('quando submeto o formulário', () => {
        it('deve logar com sucesso', function() {
            const user = this.data

            //importo com formato camelcase iniciando com l minuscula
            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: "Ana",
                email: 'apssilva@gmail.com',
                password: 'test4567'
            }

            loginPage.submit(user.email, user.password)
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShoulbe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: "Ana",
                email: 'apssilva@1410.com',
                password: 'test4567'
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShoulbe(message)

        })

        it('não deve logar com email invalidos', () => {
            const user = {
                name: "Ana",
                email: 'apssilva1410.com',
                password: 'test4567'
            }

            const message = 'Informe um email válido'

            loginPage.submit(user.email, user.password)

            cy.get('.alert-error')
                .should('be.visible')
                .should('have.text', message)


        })

        it('campos obrigatorios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')


            cy.contains('.alert-error', 'E-mail é obrigatório')
                .should('be.visible')

            cy.contains('.alert-error', 'Senha é obrigatória')
                .should('be.visible')

        })
    })

    context('senha muito curta', () => {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('apssilva@gmail.com', p)
                loginPage.alertShoulBe('Pelo menos 6 caracteres')
                //     cy.get('.alert-error')
                //         .should('be.visible')
                //         .should('have.text', 'Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        const emails = [
            'apssilva&gmail.com',
            'apssilva.com.br',
            '@mail.com',
            'apssilva',
            '@',
            '12345689@@',
            'xpto12263',
            'apssilva@',
            'apssilva@br'
        ]


        emails.forEach((e) => {
            it(`não deve logar com email: ${e}`, () => {
                loginPage.submit(e, '1234567')
                loginPage.alertShoulBe('Informe um email válido')

                // cy.get('.alert-error')
                //     .should('be.visible')
                //     .should('have.text', 'Informe um email válido')
            })
        })
    })
})