export {}
describe('Checking index page', () => {
    it('Checking titles in English', () => {
        cy.visit('/en-US')
        cy.get('#index_banner_title').should('have.text', 'Craft Natural Silk');
        cy.get('#index_banner_subtitle').should('have.text', 'Experience our products made with 100% handmade silk.');
    })
    it('Checking titles in Spanish', () => {
        cy.visit('/')
        cy.get('#index_banner_title').should('have.text', 'Seda Artesanal');
        cy.get('#index_banner_subtitle').should('have.text', 'Experimenta nuestros productos elaborados con seda 100% artesanal.');
    })
})