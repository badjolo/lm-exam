class Page {

    constructor(){ };

    get title() { return browser.getTitle(); };

    get url() { return browser.getUrl(); };

    open(path) {
        browser.url(`/${path}`);
    }

}

module.exports = Page;
