describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/read/661536e580140f9eba9922d9')

    cy.get('[data-testid="cypress-div"]').should("exist");
  });
});