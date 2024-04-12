describe('Login as Admin', () => {
    it('should log in successfully', () => {
      cy.visit('http://localhost:3000/Login');
  
      cy.get('[data-testid="#username"]').type('admin'); 
      
      cy.get('[data-testid="#password"]').type('admin'); 
      
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/admin/users'); 


    });
  });