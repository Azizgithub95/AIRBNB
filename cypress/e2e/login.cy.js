/// <reference types="cypress" />
Cypress.on("uncaught:exception", (err, runnable) => {
  // Ignore l'erreur Facebook uniquement
  if (err.message.includes("FB SDK init timeout")) {
    return false; // Empêche l'échec du test
  }
});

describe("LOGIN", () => {
  it("Login with correct mail and password", () => {
    cy.log("je suis dans le premier scenario");
    cy.visit("https://www.airbnb.fr/");
    cy.get(".mv91188 > :nth-child(1) > .l1ovpqvx").should("be.visible").click();
    cy.get('[data-testid="cypress-headernav-profile"] > .b15up7el')
      .should("be.visible")
      .click();
    cy.get('[href="/signup_login"] > .ll03w7j > .c7igm0s > span')
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.contains("Continuer avec une adresse e-mail").click({ force: true });
    cy.wait(2000);
    cy.get("#email-login-email")
      .should("be.visible")
      .type("aziztesteur@hotmail.com");
    cy.wait(6000);
    cy.contains("Continuer").should("be.visible").click();
    cy.wait(2000);
    cy.get('input[name="user[password]"]').type("Hakimpwd&9");
    cy.wait(2000);
    cy.contains("Se connecter").should("be.visible").click();
  });
});
