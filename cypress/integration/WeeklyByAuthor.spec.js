describe('filter by author and match url with title', () => {
  it('Visit the app', () => {
    cy.visit('/weekly');
    cy.get('.card-author')
      .first()
      .click();

    cy.get('.filter-header h1')
      .invoke('text')
      .then(text => {
        cy.url().should(
          'include',
          text
            .toLowerCase()
            .split(' ')
            .join('-')
        );
      });
  });
});
