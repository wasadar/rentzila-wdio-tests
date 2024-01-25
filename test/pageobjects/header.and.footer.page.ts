import Page from './page.js';

const Logo: string = '[data-testid="logo"]';
const Footer: string = '.Footer_footer__Dhw_9';
const About: string = '.RentzilaAbout_title__vI_3A';
const Privacy: string = 'a[href="/privacy-policy/"]';
const Cookies: string = 'a[href="/cookie-policy/"]';
const Terms: string = 'a[href="/terms-conditions/"]';
const ForCustomers: string = '.RentzilaForBuyers_title__k3tHn';
const Products: string = 'a[href="/products/"]';
const Tenders: string = 'a[href="/tenders-map/"]';
const Requests: string = 'a[href="/requests-map/"]';
const Contacts: string = '.RentzilaContacts_title__SxcO7';
const Rights: string = '[data-testid="copyright"]';
const Email: string = 'a[href="mailto:info@rentzila.com.ua"]';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class HeaderAndFooter extends Page {
    /**
    * Returns a logo as WebdriverIO element by it's index or just first one
    * @param index index of logo in case if there're few logo's on page
    */
    public async logo (index: number = 0) {
        return (await this.multyLocator(Logo))[index];
    }

    /**
    * Returns a footer as WebdriverIO element
    */
    public async footer () {
        return this.locator(Footer);
    }

    /**
    * Returns an about us label as WebdriverIO element
    */
    public async about () {
        return this.locator(About);
    }

    /**
    * Returns a link on privacy policy as WebdriverIO element
    */
    public async privacy () {
        return this.locator(Privacy);
    }

    /**
    * Returns a link on cookies policy as WebdriverIO element
    */
    public async cookies () {
        return this.locator(Cookies);
    }

    /**
    * Returns a link on terms conditions as WebdriverIO element
    */
    public async terms () {
        return this.locator(Terms);
    }

    /**
    * Returns a for customers label as WebdriverIO element
    */
    public async forCustomers () {
        return this.locator(ForCustomers);
    }

    /**
    * Returns a link on products list as WebdriverIO element
    */
    public async products () {
        return this.locator(Products);
    }

    /**
    * Returns a link on tenders list as WebdriverIO element
    */
    public async tenders () {
        return this.locator(Tenders);
    }

    /**
    * Returns a link on job requests list as WebdriverIO element
    */
    public async requests () {
        return this.locator(Requests);
    }

    /**
    * Returns a contacts label as WebdriverIO element
    */
    public async contacts () {
        return this.locator(Contacts);
    }

    /**
    * Returns a link on page for sending feedback email as WebdriverIO element
    */
    public async email () {
        return this.locator(Email);
    }

    /**
    * Returns a copyright message as WebdriverIO element
    */
    public async copyright () {
        return this.locator(Rights);
    }

    /**
    * Scrolls screen to footer
    * */
    public async scrollToFooter () {
        await this.scroll(await this.footer());
    }

    /**
    * Clicks on the logo
    * */
    public async clickOnLogo () {
        await this.click(await this.logo());
    }

    /**
     * Checks that footer is visible and it's logo is not clickable
     */
    public async checkFooter () {
        return await this.visibility(await this.footer()) && !await this.clickability(await this.logo(1));
    }

    /**
     * Checks that about us label is visible and has correct text
     */
    public async checkAboutUs () {
        let about: WebdriverIO.Element = await this.about();
        return await this.visibility(about) && "Про нас" == await this.text(about);
    }

    /**
     * Checks that privacy policy link is visible and has correct text
     */
    public async checkPrivacy () {
        let privacy: WebdriverIO.Element = await this.privacy();
        return "Політика конфіденційності" == await this.text(privacy);
    }

    /**
     * Checks that cookies policy link is visible and has correct text
     */
    public async checkCookies () {
        let cookies: WebdriverIO.Element = await this.cookies();
        return "Правила використання файлів cookie" == await this.text(cookies);
    }

    /**
     * Checks that terms conditions link is visible and has correct text
     */
    public async checkTerms() {
        let terms: WebdriverIO.Element = await this.terms();
        return "Умови доступу та користування" == await this.text(terms);
    }

    /**
     * Checks that for customers label is visible and has correct text
     */
    public async checkForCustomers () {
        let forCustomers: WebdriverIO.Element = await this.forCustomers();
        return await this.visibility(forCustomers) && "Користувачам" == await this.text(forCustomers);
    }

    /**
     * Checks that products page link is visible and has correct text
     */
    public async checkProducts() {
        let products: WebdriverIO.Element = await this.products();
        return "Оголошення" == await this.text(products);
    }

    /**
     * Checks that tenders page link is visible and has correct text
     */
    public async checkTenders() {
        let tenders: WebdriverIO.Element = await this.tenders();
        return "Тендери" == await this.text(tenders);
    }

    /**
     * Checks that contact label and contact email are visible
     */
    public async checkContacts () {
        let contacts: WebdriverIO.Element = await this.contacts();
        return await this.visibility(contacts) && "Контакти" == await this.text(contacts) && await this.visibility(await this.email());
    }

    /**
     * Checks that copright message is visible and has correct text
     */
    public async checkCopyright () {
        let copyright: WebdriverIO.Element = await this.copyright();
        return await this.visibility(copyright) && (await this.text(copyright)).includes("Усі права захищені");
    }

    /**
     * Clicks on the link to privacy policy
     */
    public async clickOnPrivacy () {
        await this.click(await this.privacy());
    }

    /**
     * Clicks on the link to cookies policy
     */
    public async clickOnCookies () {
        await this.click(await this.cookies());
    }

    /**
     * Clicks on the link to terms conditions
     */
    public async clickOnTerms () {
        await this.click(await this.terms());
    }

    /**
     * Clicks on the link to products page
     */
    public async clickOnProducts () {
        await this.click(await this.products());
    }

    /**
     * Clicks on the link to tenders page
     */
    public async clickOnTenders () {
        await this.click(await this.tenders());
    }

    /**
     * Checks that feedback email link is visible
     */
    public async checkEmail () {
        return await this.visibility(await this.email());
    }
}
