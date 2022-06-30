
describe("Test suite - conjunto de pruebas smoke tests", () => {

    beforeEach( () => {
        cy.visit("https://registrovisitas2022.herokuapp.com/")
    })
    const baseUrl ='https://registrovisitas2022.herokuapp.com';

    const login = () => {
        cy.get('.col-10.pb-0 > .form-group > .input-group > .form-control').type('mario@bros.jp')
        cy.get(':nth-child(3) > .form-group > .input-group > .form-control').type('123456789')
        cy.get('.btn').click()
    }
    

    it("Validar pagina de inicio", () => {
        cy.get('.font-weight-light').contains("Login")
        cy.title().should('include', "2022Front")
        
    })

    it("Ingresar credenciales de acceso", () => {
        login()
        cy.get('.main-header', { timeout: 8000}).should('be.visible') //esperar hasta que un elemento sea visible
        cy.url().should('eq', `${ baseUrl }/dashboard`)
    })

    it.only("Registrar INCIDENCIA", () => {
        login()
        const textInput = 'Testing Cypress'
        cy.get(':nth-child(3) > .small-box > .small-box-footer', { timeout: 8000}).click()
        cy.get('.justify-content-center > :nth-child(1) > .form-control').select('Otra')
        cy.get(':nth-child(2) > .form-control').type( textInput )
        cy.get('.btn-primary').click()

        cy.get('.swal2-modal')

        cy.get('tbody > :nth-child(1) > :nth-child(3)').contains( textInput)


    })



})