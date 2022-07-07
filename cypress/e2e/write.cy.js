/// <reference types="cypress" />

describe('The WALL', () => {
  beforeEach(() => {
    cy.intercept('GET', '/posts', {
      statusCode: 200,
      body: [
        {
          "id": 1,
          "content": "Test",
          "created_at": "2022-07-06 20:51:08",
          "updated_at": "2022-07-06 20:51:08"
        },
      ]
    }).as('refresh');
    cy.visit('/')
    cy.wait('@refresh');
  })

  it('can load the app', () => {
    cy.get('h1').contains(`WALL`);
  })

  it('has an api url', () => {
    cy.get('[data-test=api_url]').should('not.be.empty');
  })

  it('can add a new entry', () => {
    cy.intercept('POST', '/posts').as('post');
    cy.intercept('GET', '/posts', {
      statusCode: 200,
      body: [
        {
          "id": 1,
          "content": "Test",
          "created_at": "2022-07-06 20:51:08",
          "updated_at": "2022-07-06 20:51:08"
        },
        {
          "id": 2,
          "content": "Cypress was here!",
          "created_at": "2022-07-07 20:51:08",
          "updated_at": "2022-07-07 20:51:08"
        },
      ]
    }).as('refresh');

    const newItem = 'Cypress was here!'

    cy.get('[data-test=new-entry]').type(`${newItem}{enter}`)

    cy.wait('@post');
    cy.wait('@refresh');

    cy.get('[data-test=entry]')
      .last()
      .should('contain.text', newItem)
  })

  it('can add delete an entry', () => {
    cy.intercept('DELETE', '/posts/*').as('delete');
    cy.intercept('GET', '/posts', {
      statusCode: 200,
      body: [
        {
          "id": 1,
          "content": "Test",
          "created_at": "2022-07-06 20:51:08",
          "updated_at": "2022-07-06 20:51:08"
        },
      ]
    }).as('refresh');

    const newItem = 'Cypress was here!'

    cy.get('[data-test=entry]')
      .last()
      .find('[data-test=remove]')
      .click();

    cy.wait('@delete');
    cy.wait('@refresh');

    cy.get('[data-test=entry]')
      .last()
      .should('not.contain.text', newItem)
  })
})
