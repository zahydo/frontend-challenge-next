export {}

describe('Checking process page', () => {
    it('Checking titles in Spanish', () => {
        cy.visit('/process')
        cy.contains('El arte de la seda artesanal').should('have.text', 'El arte de la seda artesanal: del cultivo de morera al producto final');
    })
    it('Checking titles in English', () => {
        cy.visit('/en-US/process')
        cy.contains('The art of artisanal silk').should('have.text', 'The art of artisanal silk: from mulberry cultivation to the final product');
    })
})
