/// <reference types="cypress" />

describe("Recherche destination", () => {
  it("1 ere recherche", () => {
    cy.visit("https://www.airbnb.fr/");
    cy.get(".mv91188 > :nth-child(1) > .l1ovpqvx").should("be.visible").click();
    cy.wait(2000);
    cy.get('[data-testid="structured-search-input-field-query"]').type(
      "Houston",
      { delay: 100 }
    );

    cy.intercept("POST", "**/api/v3/StaysSearch/**").as("staysSearch");

    cy.contains("Dates flexibles").should("be.visible").click();
    cy.wait(2000);
    cy.get(
      ".piqlc25 > .ptpmekl > .t1cd0gxn > #tabs > :nth-child(2) > #panel--tabs--0 > .d1xjigzy > .h1yby4o2 > :nth-child(4) > .e46z8ty > .ecjc60a > :nth-child(1)"
    ) // panneau de date
      .contains("29") // bouton avec texte "21"
      .should("be.visible")
      .click();
    cy.get('button[aria-label*="mois suivant"]').first().click();

    cy.get(
      ".piqlc25 > .ptpmekl > .t1cd0gxn > #tabs > :nth-child(2) > #panel--tabs--0 > .d1xjigzy > .h1yby4o2 > :nth-child(4) > .e46z8ty > .ecjc60a > :nth-child(2)"
    )
      .contains("19")
      .should("be.visible")
      .click();

    cy.contains("Voyageurs").should("be.visible").click();
    cy.get(
      '.piqlc25 > .pgigb2o > .g6e6z5i > :nth-child(1) > [data-testid="search-block-filter-stepper-row-adults"] > #stepper-adults > [data-testid="stepper-adults-increase-button"] > .i98ho2o'
    )
      .should("be.visible")
      .click()
      .click();

    cy.get(
      '.piqlc25 > .pgigb2o > .g6e6z5i > :nth-child(1) > [data-testid="search-block-filter-stepper-row-children"] > #stepper-children > [data-testid="stepper-children-increase-button"] > .i98ho2o'
    )
      .should("be.visible")
      .click()
      .click();
    cy.contains("Rechercher").should("be.visible").click();
    cy.wait("@staysSearch").its("response.statusCode").should("eq", 200);
  });
});
