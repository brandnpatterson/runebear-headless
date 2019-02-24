describe('filter by author and match url with title', () => {
  it('tests whether the title is the same as in the url', () => {
    cy.visit('http://localhost:3000/weekly');
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
