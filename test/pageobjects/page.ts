import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        return browser.url(`https://stage.rentzila.com.ua/${path}`)
    }

    /**
    * Returns an element on the page by selector
    * @param selector selector that matches the element
    * */
    public locator (selector: string) {
        return $(selector);
    }

    /**
    * Returns an element on the page by selector and ancestor
    * @param selector selector that matches the element
    * @param element ancestor element
    * */
    public chainLocator (selector: string, element: WebdriverIO.Element) {
        return element.$(selector);
    }

    /**
    * Returns an array of elements on the page by selector
    * @param selector selector that matches the elements
    * */
    public multyLocator (selector: string) {
        return $$(selector);
    }

    /**
    * Returns an array of elements on the page by selector and ancestor
    * @param selector selector that matches the elements
    * @param element ancestor element
    * */
    public multyChainLocator (selector: string, element: WebdriverIO.Element) {
        return element.$$(selector);
    }

    /**
    * Clicks on the WebdriverIO element
    * @param element element
    * */
    public async click (element: WebdriverIO.Element) {
        await element.click();
    }

    /**
     * Scrolls to the element
     * @param element element
     */
    public async scroll (element: WebdriverIO.Element) {
        await element.scrollIntoView({ block: 'center', inline: 'center' });
    }

    /**
     * Scrolls to the top of page
     */
    public async scrollToTop () {
        await browser.execute(() => {
            window.scrollTo(0, 0);
        });
    }

    /**
    * Returns a text of the element
    * @param element ancestor element
    * */
    public async text (element: WebdriverIO.Element) {
        return await element.getText();
    }

    /**
     * Checks if element is visible to user
     * @param element element that is expected to be visible
     */
    public async visibility (element: WebdriverIO.Element) {
        return await element.isDisplayedInViewport();
    }

    /**
     * Wait for the timeout
     * @param timeout time duration in milliseconds for which the program should sleep
     */
    public async sleep (timeout: number) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    /**
     * Open browser in fullscreen mode to prevent bugs
     */
    public async fullscreen () {
        await browser.maximizeWindow();
    }

    /**
     * Checks if element is clickable
     * @param element element
     */
    public async clickability (element: WebdriverIO.Element) {
        return await element.isClickable();
    }

    /**
     * Checks if element exists by selector
     * @param selector selector
     */
    public async existence (selector: string) {
        return await $(selector).isExisting();
    }

    /**
     * Fills input form by element with value
     * @param element element
     * @param value value
     */
    public async fill (element: WebdriverIO.Element, value: string) {
        return await element.setValue(value);
    }

    /**
     * Clears input form by element
     * @param element element
     */
    public async clear (element: WebdriverIO.Element) {
        return await element.clearValue();
    }

    /**
     * Returns list of the classes of element
     * @param element element
     */
    public async classes (element: WebdriverIO.Element) {
        return (await element.getAttribute('class')).split(' ');
    }

    /**
     * Accepts modal window
     */
    public async confirmModal () {
        await browser.acceptAlert();
    }

    /**
     * Returns url
     */
    public async url () {
        return await browser.getUrl();
    }
}
