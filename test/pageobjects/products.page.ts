import HeaderAndFooter from './header.and.footer.page.ts';

const FirstProduct: string = 'a[href*="/unit/"]'; 
const Filters: string = '.ResetFilters_selectedCategory___D1E6 p';
const SearchResultLabel: string = '.MapPagination_count__c_dzg .MapPagination_count__c_dzg';
const Pattern: RegExp = /^Знайдено \d+ оголошен.* на видимій території/;
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends HeaderAndFooter {
    /**
     * Returns first relevant product as WebdriverIO element
     */
    public async firstProduct () {
        return (await this.multyLocator(FirstProduct))[0];
    }

    /**
     * Returns applied filters as array of the WebdriverIO elements
     */
    public async filtersList () {
        return this.multyLocator(Filters);
    }

    /**
     * Returns search result label as WebdriverIO element
     */
    public async searchResultLabel () {
        return this.locator(SearchResultLabel);
    }

    /**
    * Returns a name of filter from the list by it's index in the list
    * @param index index of filter in their list
    * */
    public async getFilterNameByIndex (index: number) {
        return this.text((await this.filtersList())[index]);
    }

    /**
     * Checks if the expected value is in applied filters
     * @param value value that is expected to be among filters
     */
    public async checkFilters (value: string) {
        let filters: WebdriverIO.ElementArray = await this.filtersList();

        for (let index: number = 0; index < filters.length; index++) {
            if (value == (await this.getFilterNameByIndex(index))) {
                return true;
            }
        }

        return false;
    }

    /**
    * Checks if there is relevant product links or not
    * */
    public async checkFirstProduct () {
        return await this.existence(FirstProduct);
    }

    /**
    * Clicks on first relevant product link
    * */
    public async openFirstProduct () {
        await this.click(await this.firstProduct());
    }

    /**
     * Returns search result label as text
     */
    public async getSearchResultLabel () {
        return this.text(await this.searchResultLabel());
    }

    /**
     * Checks search result label
     */
    public async checkSearchResultLabel () {
        return Pattern.test(await this.getSearchResultLabel());
    }

    /**
     * Opens the product list page
     */
    public open () {
        return super.open('');
    }
}

export default new ProductsPage();
