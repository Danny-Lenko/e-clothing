describe('visit homepage', () => {
   it('passes', () => {
      cy.visit('http://localhost:3000')
      cy.findByRole('link', { name: /shop/i })
         .should('have.css', 'cursor')
         .and('match', /pointer/)
      cy.findByRole('link', { name: /shop/i }).click()
      cy.url().should('include', '/shop')
      cy.findByRole('link', {  name: /group/i}).click()
      cy.url().should('include', '/')
   })
})
