
describe("Test suite - conjunto de pruebas smoke tests", () => {
    const baseUrl ='https://registrovisitas2022.herokuapp.com';
    
    beforeEach( () => {
        cy.visit( baseUrl )
    })

    const login = () => {
        cy.get('.col-10.pb-0 > .form-group > .input-group > .form-control').type('mario@bros.jp')
        cy.get(':nth-child(3) > .form-group > .input-group > .form-control').type('123456789')
        cy.get('.btn').click()
    }
    

    it("Validar pagina de login", () => {
        cy.get('.font-weight-light').contains("Login")
        cy.title().should('include', "2022Front")
        
    })

    it("Ingresar login exitoso", () => {
        login()
        cy.get('.main-header', { timeout: 8000}).should('be.visible') //esperar hasta que un elemento sea visible
        cy.url().should('eq', `${ baseUrl }/dashboard`)
    })

    it("Registrar INCIDENCIA", () => {
        login()
        const textInput = 'Testing Cypress'
        cy.get(':nth-child(3) > .small-box > .small-box-footer', { timeout: 8000}).click()
        cy.get('.justify-content-center > :nth-child(1) > .form-control').select('Otra')
        cy.get(':nth-child(2) > .form-control').type( textInput )
        cy.get('.btn-primary').click()

        cy.get('.swal2-modal')

        cy.get('tbody > :nth-child(1) > :nth-child(3)').contains( textInput)
    })

    it("Vista crear RESIDENTE", () => {
        login();
        cy.get('.small-box > .white-texto', { timeout: 10000}).click();
        cy.get('.btn').click();
        cy.get('h3').should('be.visible')
        cy.get('h3').should('have.text', 'Registro Nuevo Residente')
        cy.url().should('eq', `${ baseUrl}/dashboard/residentes/publicar-residente`)
    })

    const formRegisterResident = () => {
        const email = 'prueba@cypress.io';
        cy.get('.small-box > .white-texto', { timeout: 10000}).click();
        cy.get('.btn').click();
        cy.get('[formcontrolname="nombre"]').type('Nombre de prueba')
        cy.get('[formcontrolname="apellido_uno"]').type('Cypress')
        cy.get('[formcontrolname="apellido_dos"]').type('io')
        cy.get('[formcontrolname="rut"]').type('9999999-9')
        cy.get('[formcontrolname="email"]').type( email )
        cy.get('.btn-primary').click()
        cy.get('.swal2-modal')
        return email;
    }


    it.only("Registar RESIDENTE", () => {
        login();
        const email = formRegisterResident();
        cy.get('.swal2-success-ring')  //lo que significa que se registró exitosamente, caso contrario serí swal2-x-mark
        cy.get('.swal2-cancel').click()
        cy.get('.card-body').should('be.visible')
        cy.contains('td', email )
            .parent('tr')
    })

    it.only("Registrar RESIDENTE duplicado( email )", () => {
        login();
        formRegisterResident();
        cy.get('.swal2-x-mark')
        cy.get('#swal2-html-container').contains("El email ya se encuentra registrado")
        cy.get('.swal2-cancel').click();
    })



})