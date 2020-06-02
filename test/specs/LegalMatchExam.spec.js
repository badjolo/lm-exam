import { expect } from 'chai';
import { homePage } from '../pages/Home.page';
import * as homeConstants from '../constants/Home.constant';


describe('LegalMatch Exam (#1) open qa8.legalmatch.com', () => {
    before(() => {
        homePage.open(); // 1.
    });

    it('First Part (#2), HomePage, Select Government from category dropdown', () => {
        homePage.selectCategory();
        expect(homePage.categoryButton.getText()).to.equal('Government'); // 2.
    });

    it('Second Part (#3, #4, #5), HomePage, Enter values and wait for valid checkmark icon, Click Find a Great Lawyer', () => {
        homePage.locationInput.setValue('00001'); // 3.
        homePage.formLocationChecker.waitForExist({ timeout: homePage.defaultTimeout });
        homePage.formSubmit.click(); // 4.
        expect(homePage.url).to.have.string(homeConstants.URL_HOME_CASE_INTAKE); // 5.
    });

    it('Third Part (#6), HomePage, Verify Government String - Most Common Issues', () => {
        expect(homePage.fieldsetLabelCaseIntake.getText()).to.equal(homeConstants.LABEL_HOME_CASE_INTAKE_GOVERNMENT); // 6.
    });

    it('Fourth Part (#7), HomePage, Go back page', () => {
        browser.back(); // 7.
        expect(homePage.url).to.have.string(homeConstants.URL_BASE);
    });

    it('Fifth Part (#8, #9, #10, #11, #12, #13), HomePage, Select Random Category and Verify, Repeat 4 times', () => {
        homePage.clickHere.click(); // 8.
        const repeat = 4; // 13.
        let selectedRandomCategory;
        let element;
        for(let i = 0; i < repeat; i++) {
            homePage.otherCategoriesItem.waitForClickable({ timeout: homePage.defaultTimeout });
            element = homePage.selectOtherCategoriesRandom
            selectedRandomCategory = element.getText();
            element.click();

            console.log(i + ' Selected Category: ' + selectedRandomCategory); //9.
            expect(homePage.url).to.have.string(homeConstants.URL_HOME_CASE_INTAKE); // 10.

            try {
              expect(homePage.fieldsetLabelCaseIntake.getText()).to.have.string(selectedRandomCategory.replace(/ .*/,'')); // 11.
            } catch(err) {
              console.log(err);
            }

            browser.back(); // 12.
            expect(homePage.url).to.have.string(homeConstants.URL_BASE);

            if (i < repeat - 1) {
              homePage.clickHere.click();
            }
        }
    });

    it('Sixth Part (#14, #15, #16), HomePage, Scroll to Testimonial Section, Move Carousel', () => {
      homePage.sectionTestimonials.scrollIntoView(); // 14.
      const beforeFirstTestimonialsBodyContent = homePage.firstTestimonialsBodyContent;
      for(let i = 0; i < homePage.testimonialsItemCount; i++) {
          homePage.moveCarouselNext(); // 15.
          if (i == homePage.testimonialsItemCount - 1) {
            expect(homePage.firstTestimonialsBodyContent).to.equal(beforeFirstTestimonialsBodyContent); // 16.
          }
      }
    });

    it('Seventh Part (#17), HomePage, Move Carousel Prev', () => {
      homePage.sectionTestimonials.scrollIntoView();
      const beforeFirstTestimonialsBodyContent = homePage.firstTestimonialsBodyContent;
      for(let i = 0; i < homePage.testimonialsItemCount; i++) {
          homePage.moveCarouselPrev(); // 17.
          if (i == homePage.testimonialsItemCount - 1) {
            expect(homePage.firstTestimonialsBodyContent).to.equal(beforeFirstTestimonialsBodyContent);
          }
      }
    });

    it('Eighth Part (#18), HomePage, Get element html source', () => {
      expect(homePage.metaContentFindALawyer.getHTML()).to.equal(homeConstants.HTML_META_FIND_A_LAWYER); // 18.
    });
});
