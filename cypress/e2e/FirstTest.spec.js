/// <reference types="cypress" />

describe("Our first suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by Tag Name
    cy.get("input");

    //by ID
    cy.get("#inputEmail1");

    //by Class name
    cy.get(".input-full-width");

    //by Attribute name
    cy.get("[placeholder]");

    //by Attribute name and value
    cy.get('[placeholder="Email"]');

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]');

    //by two different attributes
    cy.get('[placeholder="Email"][type="email"]');

    //by tag name, Attribute with value, ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    //selenium
    // const fistForm = cy.contains('nb-card', 'Using the Grid')
    // const secondForm = cy.contains('nb-card', 'Basic form')

    // fistForm.find('[for="inputEmail1"]').should('contain', 'Email')
    // fistForm.find('[for="inputPassword2"]').should('contain', 'Password')
    // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //cypress style

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordSecondText);

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]')
      .should("contain", "Email address")
      .should("have.class", "label")
      .and("have.text", "Email address");

    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
      expect(label).to.have.class("label");
      expect(label).to.have.text("Email address");
    });

    //3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      //.should('contain', 'checked')
      .then((classValue) => {
        expect(classValue).to.contain("checked");
      });
  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).eq(0).should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    //cy.get('[type="checkbox"]').check({force:true})
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it.only("lists and dropdowns", () => {
    cy.visit("/");
    //1
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");
    cy.get("nb-layout-header nav").should(
      "have.css",
      "background-color",
      "rgb(34, 43, 69)"
    );

    //2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it.only("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // edit row
    cy.get("tbody")
      .contains("tr", "Barbara")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("44");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "44");
      });

    // add row
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        // fill inputs
        cy.wrap(tableRow).find('[placeholder="ID"]').type("1709");
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Yergazy");
        cy.wrap(tableRow)
          .find('[placeholder="Last Name"]')
          .type("Nurmaganbetov");
        cy.wrap(tableRow).find('[placeholder="Username"]').type("YergazyNur");
        cy.wrap(tableRow)
          .find('[placeholder="E-mail"]')
          .type("nurmaganbetov0486@gmail.com");
        cy.wrap(tableRow).find('[placeholder="Age"]').type("36");
        cy.wrap(tableRow).find(".nb-checkmark").click();

        // check input values
        cy.get("tbody tr")
          .first()
          .find("td")
          .then((tableColumn) => {
            cy.wrap(tableColumn).eq(2).should("contain", "Yergazy");
            cy.wrap(tableColumn).eq(3).should("contain", "Nurmaganbetov");
          });

        // search

        const age = [20, 30, 40];

        cy.wrap(age).each((age) => {
          cy.get('thead [placeholder="Age"]').clear().type(age);
          cy.wait(500);
          cy.get("tbody tr").each((tableRow) => {
            cy.wrap(tableRow).find("td").eq(6).should("contain", age);
          });
        });
      });
  });
});
