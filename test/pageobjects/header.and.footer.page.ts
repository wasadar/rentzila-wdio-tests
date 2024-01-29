import Page from './page.ts';
import { Subcategories } from '../../helpers/data.ts';

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
const Catalog: string = '.NavbarCatalog_wrapper__kVmUY';
const CatalogDropDownMenuElementType1: string = '.Catalog_parent__k_4MP';
const CatalogDropDownMenuElementType2: string = '.CatalogItem_item__xvBwY';
const Search: string = '[data-testid="searchInput"]';
const SearchPopUp: string = '.MainSearch_popup_wrapper__w7qVk';
const SearchPopUpLabel: string = '.LeftsideSearch_title__FkeCp';
const SearchServiceOrCategory: string = '[data-testid="resultItem"]';
const SearchClear: string = '[data-testid="searchClear"]';

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
    * Returns a catalog button as WebdriverIO elements
    */
    public async catalog () {
        return this.locator(Catalog);
    }
    
    /**
    * Returns a catalog drop down menu element type 1 as WebdriverIO element by it's text
    * @param text text
    */
    public async catalogDropDownElementType1 (text: string) {
        return await this.getElementByText(text, CatalogDropDownMenuElementType1);
    }
    
    /**
    * Returns a catalog drop down menu element type 2 as WebdriverIO element by it's text
    * @param text text
    */
    public async catalogDropDownElementType2 (text: string) {
        return await this.getElementByText(text, CatalogDropDownMenuElementType2);
    }
    
    /**
    * Returns a list of catalog drop down menu element type 1 as WebdriverIO elements
    */
    public async catalogDropDownElementsType1 () {
        return this.multyLocator(CatalogDropDownMenuElementType1);
    }
    
    /**
    * Returns a list of catalog drop down menu element type 2 as WebdriverIO elements
    */
    public async catalogDropDownElementsType2 () {
        return this.multyLocator(CatalogDropDownMenuElementType2);
    }

    /**
    * Returns a search input field as WebdriverIO element
    */
    public async search () {
        return this.locator(Search);
    }

    /**
    * Returns a search pop up as WebdriverIO element
    */
    public async searchPopUp () {
        return this.locator(SearchPopUp);
    }

    /**
    * Returns a search pop up label as WebdriverIO element by it's text
    * @param text text
    */
    public async searchPopUpLabel (text: string) {
        return await this.getElementByText(text, SearchPopUpLabel);
    }

    /**
    * Returns a list of search drop down results as WebdriverIO elements
    */
    public async searchServicesOrCategories () {
        return this.multyLocator(SearchServiceOrCategory);
    }

    
    /**
    * Returns a search drop down result as WebdriverIO element by it's index
    * @param index index in their list
    */
    public async searchServiceOrCategoryByIndex (index: number) {
        return (await this.searchServicesOrCategories())[index];
    }

    /**
    * Returns a search drop down result as WebdriverIO element by it's text
    * @param text text
    */
    public async searchServiceOrCategoryByText (text: string) {
        let elements: WebdriverIO.Element[] = await this.getElementsByText(text, SearchServiceOrCategory);
        return elements[elements.length - 1];
    }

    /**
    * Returns a clear search button as WebdriverIO element
    */
    public async clearSearch () {
        return this.locator(SearchClear);
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
    public async checkTerms () {
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
    public async checkProducts () {
        let products: WebdriverIO.Element = await this.products();
        return "Оголошення" == await this.text(products);
    }

    /**
     * Checks that tenders page link is visible and has correct text
     */
    public async checkTenders () {
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

    /**
     * Checks that catalog button is present
     */
    public async checkCatalog () {
        return await this.visibility(await this.catalog());
    }

    /**
     * Clicks on the catalog button
     */
    public async clickOnCatalog () {
        await this.click(await this.catalog());
    }

    /**
    * Returns text of catalog drop down menu element type 2 by it's index
    * @param index index of atalog drop down menu element type 2 in their list
    * */
    public async getTextOfCatalogDropDownElementType2ByIndex (index: number) {
        return await this.text((await this.catalogDropDownElementsType2())[index]);
    }

    /**
    * Checks that catalog drop down menu element type 1 with given text is present
    * @param text text
    */
    public async checkCatalogDropDownElementType1 (text: string) {
        return await this.visibility(await this.catalogDropDownElementType1(text));
    }

    /**
    * Checks that catalog drop down menu element type 2 with given text is present
    * @param text text
    */
    public async checkCatalogDropDownElementType2 (text: string) {
        return await this.visibility(await this.catalogDropDownElementType2(text));
    }

    /**
    * Hovers on a catalog drop down menu element type 1 by it's text
    * @param text text
    */
    public async hoverOnCatalogDropDownElementType1 (text: string) {
        await this.hover(await this.catalogDropDownElementType1(text));
    }

    /**
    * Hovers on a catalog drop down menu element type 2 by it's text
    * @param text text
    */
    public async hoverOnCatalogDropDownElementType2 (text: string) {
        await this.hover(await this.catalogDropDownElementType2(text));
    }

    /**
    * Clicks on a catalog drop down menu element type 1 by it's text
    * @param text text
    */
    public async clickOnCatalogDropDownElementType1 (text: string) {
        await this.click(await this.catalogDropDownElementType1(text));
    }

    /**
    * Clicks on a catalog drop down menu element type 2 by it's text
    * @param text text
    */
    public async clickOnCatalogDropDownElementType2 (text: string) {
        await this.click(await this.catalogDropDownElementType2(text));
    }

    /**
    * Checks that all subcategories are displayed correctly accoring to currecntly hovered element's text
    * @param text text of the element that is currently hovered
    * @param diff difference between index of the element with same text in the subcategories list and in categories drop down menu
    */
    public async checkSubcategories (text: string, diff: number) {
        const subcategories: Array<string> = Subcategories[text];
        const dropdowns: WebdriverIO.ElementArray = await this.catalogDropDownElementsType2();

        for (let index: number = 0; index < subcategories.length; index++){
            if (subcategories[index] != await this.text(dropdowns[index + diff])){
                return false;
            }
        }

        return true;
    };

    /**
     * Clicks on the search input field
     */
    public async clickOnSearch () {
        await this.click(await this.search());
    }

    /**
     * Checks that search pop up is visible
     */
    public async checkSearchPopUp () {
        return await this.visibility(await this.searchPopUp());
    }

    /**
     * Checks that search pop up label is visible by it's text
     * @param text text
     */
    public async checkSearchPopUpLabel (text: string) {
        return await this.visibility(await this.searchPopUpLabel(text));
    }

    /**
     * Fills on the search input field with text
     * @param text text
     */
    public async fillSearch (text: string) {
        await this.fill((await this.search()), text);
    }

    /**
     * Returns value in the search input field
     */
    public async getSearchValue () {
        return await this.value(await this.search());
    }

    /**
     * Checks that search pop up result is visible by it's text
     * @param text text
     */
    public async checkSearchPopUpResult (text: string) {
        return await this.visibility(await this.searchServiceOrCategoryByText(text));
    }

    /**
     * Clicks on search pop up result by it's text
     * @param text text
     */
    public async clickOnSearchPopUpResult (text: string) {
        await this.click(await this.searchServiceOrCategoryByText(text));
    }

    /**
     * Clicks on clear search button
     */
    public async clickOnClearSearch () {
        await this.click(await this.clearSearch());
    }

    /**
     * Checks that search pop up is now closed
     */
    public async checkSearchPopUpClose () {
        return !(await this.existence(SearchPopUp));
    }
}
