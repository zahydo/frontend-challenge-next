export {}
describe('Checking about page', () => {
    it('Checking titles in Spanish', () => {
        cy.visit('/about')
        cy.contains('Ruta de la Seda').should('have.text', 'Ruta de la Seda');
        cy.contains('La leyenda de la seda').should('have.text', 'La leyenda de la seda: Descubriendo los secretos detrás de uno de los tesoros más preciados de la historia');
    })
    it('Checking titles in English', () => {
        cy.visit('/en-US/about')
        cy.contains('The Silk Route').should('have.text', 'The Silk Route');
        cy.contains('The Silk Legend').should('have.text', "The Silk Legend: Uncovering the Secrets Behind One of History's Most Precious Treasures");
    })
})
