describe("e2e test", () => {
  it("render page with main components", () => {
    cy.visit("/");

    cy.get('[data-testid="logo"]').should("exist");
    cy.get('[data-testid="page-title"]').should("exist");
    cy.get('[data-testid="main-content"]').should("exist");
  });

  it("display list of bots", () => {
    cy.visit("/");

    cy.get('[data-testid="bots-card"]').should("exist");
    cy.get('[data-testid="bot-workers-btn"]').should("have.length", 3);
    cy.get('[data-testid="bot-logs-btn"]').should("have.length", 3);
  });

  it("display list of workers associated with a bot", () => {
    cy.visit("/");
    cy.get('[data-testid="bot-workers-btn"]').first().click();

    cy.get('[data-testid="workers-card"]').should("exist");
    cy.get('[data-testid="worker-logs-btn"]').should("have.length", 6);
  });

  it("display logs for a bot", () => {
    cy.visit("/");
    cy.get('[data-testid="bot-logs-btn"]').first().click();

    cy.contains("Logs for Bot One");
    cy.get('[data-testid="log-table"]').should("have.length", 10);
    cy.get('[data-testid="log-table"] tbody')
      .first()
      .children()
      .should("have.length", 5);
  });

  it("display logs for a worker associated with a bot", () => {
    cy.visit("/");
    cy.get('[data-testid="bot-workers-btn"]').first().click();
    cy.get('[data-testid="worker-logs-btn"]').first().click();

    cy.contains("Logs for Worker One");
    cy.get('[data-testid="log-table"]').should("have.length", 10);
    cy.get('[data-testid="log-table"] tbody')
      .first()
      .children()
      .should("have.length", 5);
  });
});
