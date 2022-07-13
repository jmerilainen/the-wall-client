/// <reference types="cypress" />

describe("The WALL", () => {
  beforeEach(() => {
    cy.intercept("GET", "/posts").as("refresh");
    cy.visit("/");
    cy.wait("@refresh");
  });

  it("can load the app", () => {
    cy.get("h1").contains(`WALL`);
  });

  it("has an api url", () => {
    cy.get("[data-test=api_url]").should("not.be.empty");
  });

  it("can add a new entry", () => {
    cy.intercept("POST", "/posts").as("post");
    cy.intercept("GET", "/posts").as("refresh");

    const newItem = "Cypress was here!";

    cy.get("[data-test=new-entry]").type(`First test{enter}`);
    cy.get("[data-test=new-entry]").type(`${newItem}{enter}`);

    cy.wait("@post");
    cy.wait("@refresh");

    cy.get("[data-test=entry]").last().should("contain.text", newItem);
  });

  it("can add delete an entry", () => {
    cy.intercept("DELETE", "/posts/*").as("delete");
    cy.intercept("GET", "/posts").as("refresh");

    const newItem = "Cypress was here!";

    cy.get("[data-test=entry]").last().find("[data-test=remove]").click();

    cy.wait("@delete");
    cy.wait("@refresh");

    cy.get("[data-test=entry]").last().should("not.contain.text", newItem);
  });
});
