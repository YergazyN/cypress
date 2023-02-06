import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatePickerPage } from "../support/page_objects/datepickerPage"; 
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () => {

    // always open base url
    beforeEach('open application', () => {
        cy.visit('/');
    });

    // it('verify navigations across the pages', () => {
    //     navigateTo.formLayoutsPage();
    //     navigateTo.datepickerPage();
    //     navigateTo.toasterPage();
    //     navigateTo.smartTablePage();
    //     navigateTo.tooltipPage();
    // });

    it.only('Submit forms and choose next day in the datepicker', () => {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineForm('Yergazy', 'yergazy0486@yahoo.com');
        onFormLayoutsPage.submitFormWithEmailAndPassword('yergazy0486@yahoo.com', '123456');
        // navigateTo.datepickerPage();
        // onDatePickerPage.selectCommonDatepickerDateFromToday(3);
        // onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14);
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Yergazy', 'Nurmaganbetov')
        onSmartTablePage.updateAgeByFirstName('Yergazy', '36')
        onSmartTablePage.deleteRowByIndex(1)
    });

});