import HeaderAndFooter from './header.and.footer.page.ts';

const Services: string = '[data-testid="services"]';
const Equipment: string = '[data-testid="specialEquipment"]';
const Tabs: string = '.RentzilaProposes_service__oHepD';
const Elements: string = '.RentzilaProposes_proposes_item__sY_h2';
const CategoryName: string = '.RentzilaProposes_name__DTnwr';
const PopUpContainer: string = '.RequestsPopup_container__J8leY';
const PopUpCrossButton: string = '[data-testid="crossButton"]';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends HeaderAndFooter {
    /**
    * Returns a pop up container as WebdriverIO element
    */
    public async popUp () {
        return this.locator(PopUpContainer);
    }

    /**
    * Returns a pop up cross button as WebdriverIO element
    */
    public async popUpCrossButton () {
        return this.locator(PopUpCrossButton);
    }

    /**
     * Returns a services block as WebdriverIO element
     */
    public async services () {
        return this.locator(Services);
    }

    /**
     * Returns services tabs as array of the WebdriverIO elements
     */
    public async servicesTabs () {
        return this.multyChainLocator(Tabs, await this.services());
    }

    /**
     * Returns a list of services as array of the WebdriverIO elements
     */
    public async servicesList () {
        return this.multyChainLocator(Elements, await this.services());
    }
    
    /**
    * Returns a name of service from the list by it's index in the list
    * @param index index of service in their list
    * */
    public async getServiceNameByIndex (index: number) {
        let servicesList = await this.servicesList();
        return this.text(await this.chainLocator(CategoryName, servicesList[index]));
    }

    /**
     * Returns an equipment block as WebdriverIO element
     */
    public async equipment () {
        return this.locator(Equipment);
    }

    /**
     * Returns equipment categories tabs as array of the WebdriverIO elements
     */
    public async equipmentTabs () {
        return this.multyChainLocator(Tabs, await this.equipment());
    }
    
    /**
     * Returns a list of equipment caterogies as array of the WebdriverIO elements
     */
    public async equipmentList () {
        return this.multyChainLocator(Elements, await this.equipment());
    }
    
    /**
    * Returns a name of equipment category from the list by it's index in the list
    * @param index index of equipment category in their list
    * */
    public async getEquipmentNameByIndex (index: number) {
        let equipmentList = await this.equipmentList();
        return this.text(await this.chainLocator(CategoryName, equipmentList[index]));
    }

    /**
    * Closes pop up windows
    * */
    public async closePopUp () {
        if (await this.visibility(await this.popUp())) {
            await this.click(await this.popUpCrossButton());
        }
    }

    /**
    * Scrolls screen to services block
    * */
    public async scrollToServices () {
        await this.scroll(await this.services());
    }

    /**
    * Clicks on services tab by it's index
    * @param index index of tab in their list
    * */
    public async clickOnServicesTab (index: number) {
        await this.click((await this.servicesTabs())[index]);
    }

    /**
    * Clicks on service by it's index
    * @param index index of service in their list
    * */
    public async clickOnService (index: number) {
        await this.click((await this.servicesList())[index]);
    }

    /**
    * Scrolls screen to equipment block
    * */
    public async scrollToEquipment () {
        await this.scroll(await this.equipment());
    }

    /**
    * Clicks on equipment tab by it's index
    * @param index index of tab in their list
    * */
    public async clickOnEquipmentTab (index: number) {
        await this.click((await this.equipmentTabs())[index]);
    }

    /**
    * Clicks on equipment category by it's index
    * @param index index of category in their list
    * */
    public async clickOnEquipment (index: number) {
        await this.click((await this.equipmentList())[index]);
    }

    /**
     * Open the main page
     */
    public open () {
        return super.open('');
    }
}

export default new MainPage();
