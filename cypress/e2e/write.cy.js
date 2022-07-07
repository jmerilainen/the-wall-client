/// <reference types="cypress" />

describe('The WALL', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('can load the app', () => {
    cy.get('h1').contains(`WALL`);
  })

  it('can add a new entry', () => {
    cy.intercept('POST', '/posts',).as('post');

    const newItem = 'Cypress was here!'

    cy.get('[data-test=new-entry]').type(`${newItem}{enter}`)

    // cy.wait('@post');

    cy.wait(1000);

    cy.get('[data-test=entry]')
      .last()
      .should('contain.text', newItem)
  })

  it('can add delete an entry', () => {
    cy.intercept('/posts/*').as('delete');

    const newItem = 'Cypress was here!'

    cy.get('[data-test=entry]')
      .last()
      .find('[data-test=remove]')
      .click();

    // cy.wait('@delete');

    cy.wait(1000);

    cy.get('[data-test=entry]')
      .last()
      .should('not.contain.text', newItem)
  })
})
