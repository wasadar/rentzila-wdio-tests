import HeaderAndFooter from './header.and.footer.page.ts';
import Equipment from '../../equipment.ts';

const ServicesBlock: string = '.UnitCharacteristics_services_container__hSEbl';
const ServicesList: string = '.UnitCharacteristics_service__aTyk2';
const CharacteristicsBlock: string = '.UnitCharacteristics_main_characteristics__uSWQh';
const CharacteristicsList: string = '.UnitCharacteristics_flex_row__YmJff .UnitCharacteristics_characteristics_info__piBDI';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends HeaderAndFooter {
    /**
     * Returns a services block as WebdriverIO element
     */
    public async servicesBlock () {
        return this.locator(ServicesBlock);
    }

    /**
     * Returns a list of services as array of the WebdriverIO elements
     */
    public async servicesList () {
        return this.multyChainLocator(ServicesList, await this.servicesBlock());
    }

    /**
     * Returns a characteristic block as WebdriverIO element
     */
    public async characteristicsBlock () {
        return this.locator(CharacteristicsBlock);
    }

    /**
     * Returns a list of characteristics as array of the WebdriverIO elements
     */
    public async characteristicsList () {
        return this.multyChainLocator(CharacteristicsList, await this.characteristicsBlock());
    }

    /**
    * Scrolls screen to services block
    * */
    public async scrollToServices () {
        await this.scroll(await this.servicesBlock());
    }

    /**
    * Returns a name of service from the list by it's index in the list
    * @param index index of service in their list
    * */
    public async getServiceNameByIndex (index: number) {
        return this.text((await this.servicesList())[index]);
    }

    /**
     * Checks if the expected value is in services list
     * @param value value that is expected to be among services
     */
    public async checkServices(value: string) {
        let filters: WebdriverIO.ElementArray = await this.servicesList();

        for (let index: number = 0; index < filters.length; index++) {
            if (value == (await this.getServiceNameByIndex(index))) {
                return true;
            }
        }

        return false;
    }

    /**
    * Scrolls screen to characteristics block
    * */
    public async scrollToCharacteristics () {
        await this.scroll(await this.characteristicsBlock());
    }

    /**
     * Checks if product category match with expected
     * @param value expected category
     */
    public async checkCategory(value: string) {
        let text: string = await this.text((await this.characteristicsList())[0]);
        let list: Array<string> = Equipment[value] || [];

        for (let index: number = 0; index < list.length; index++){
            if (list[index].toLowerCase() == text.toLowerCase() || list[index].toLowerCase().includes(text.toLowerCase())) {
                return true;
            }
        }

        return false;
    }
}

export default new ProductPage();
