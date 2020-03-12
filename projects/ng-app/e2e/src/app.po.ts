import { browser, by, element } from "protractor";

export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText() {
        return element(by.css(".hamburger-menu__header")).getText() as Promise<string>;
    }
}
