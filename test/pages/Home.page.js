import Page from './page'

class HomePage extends Page {

    constructor() {
        super();
        const defaultTimeout = 3000;
    }

    open() {
       super.open("");
    }

    get categoryButton() {
        return $('.case-intake-form__input-button');
    }

    get locationInput() {
        return $('[name="location"]');
    }

    get formLocationChecker() {
        return $('.case-intake-form__location-checker--valid');
    }

    get formSubmit() {
        return $('.case-intake-form__submit_label--desktop');
    }

    get fieldsetLabelCaseIntake() {
        return $('fieldset legend');
    }

    get clickHere() {
        return $('span*=Click here');
    }

    get otherCategoriesItemCount(){
        return $$('.other-categories__item').length;
    }

    get otherCategoriesRandomIndex(){
        return Math.floor(Math.random() * this.otherCategoriesItemCount) + 1;
    }

    get otherCategoriesItem() {
        return $('.other-categories__item');
    }

    get otherCategoriesRandomItem() {
        return $(`${'(//li[contains(@class, "other-categories__item")])' + '['}${  this.otherCategoriesRandomIndex  }]`).getText();
    }

    get sectionTestimonials() {
        return $('h2*=What People Are Saying About LegalMatch');
    }

    get testimonialsItemCount() {
        return $$('.js-carousel-dot').length;
    }

    get firstTestimonialItem() {
        return $('(//p[@class="w-testimonials__item-body-content"])[2]')
    }

    get firstTestimonialsBodyContent() {
        return this.firstTestimonialItem.getAttribute('data-content');
    }

    get metaContentFindALawyer() {
        return $('[content*="find a lawyer"]');
    }

    get selectOtherCategoriesRandom() {
        $(`span*=${  homePage.otherCategoriesRandomItem}`).waitForClickable({ timeout: homePage.defaultTimeout });
        return $(`span*=${  homePage.otherCategoriesRandomItem}`)
    }

    moveCarouselNext(){
        $('(//button[contains(@class, "carousel-controls__next")])[2]').click();
        browser.pause('1000');
    }

    moveCarouselPrev(){
        $('(//button[contains(@class, "carousel-controls__prev")])[2]').click();
        browser.pause('1000');
    }

    selectCategory() {
        this.categoryButton.click();
        $('.case-intake-form__dropdown-item:nth-child(10)').click();
    }
}

export const homePage = new HomePage();
