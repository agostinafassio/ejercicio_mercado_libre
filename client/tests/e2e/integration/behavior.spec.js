//To run tests: npm run test:e2e

it("loads", () => {
  cy.visit("/");
});

it("shows search bar", () => {
  cy.visit("/")
    .get("#search input");
});

it("doesn't redirect if search bar is empty", () => {
  cy.visit("/");
  cy.get("#search input").click();
  cy.url().should('not.include', 'search');
});

it("gets results while searching", () => {
  cy.visit("/");
  cy.get("#search input").type('celular');
  cy.get("#search span").click();
  cy.get(".result_row");
});

it("navigates to detail page when clicking on result", () => {
  cy.visit("/");
  cy.get("#search input").type('celular');
  cy.get("#search span").click();
  cy.get(".result_row:first .title").click();
  cy.url().should('include', '/items/');
});

it("gets details when clicking on result", () => {
  cy.visit("/");
  cy.get("#search input").type('celular');
  cy.get("#search span").click();
  cy.get(".result_row:first .title").click();
  cy.get("#detail_box_head .title");
});