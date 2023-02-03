import { navigateTo } from "../support/page_objects/navigationPage";

describe('Test with Page Objects', () => {

    // always open base url
    beforeEach('open application', () => {
        cy.visit('/');
    });

    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage();
        navigateTo.datepickerPage();
        navigateTo.toasterPage();
        navigateTo.smartTablePage();
        navigateTo.tooltipPage();
    });

});