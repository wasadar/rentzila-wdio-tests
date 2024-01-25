import { expect } from '@wdio/globals';
import MainPage from '../pageobjects/main.page.ts';
import ProductsPage from '../pageobjects/products.page.ts';
import ProductPage from '../pageobjects/product.page.ts';
import Equipment from '../../equipment.ts';

describe('Rentzila application', () => {
    it('[APPROVED] Checking ""Послуги"" section on the main page', async () => {
        await MainPage.fullscreen();
        await MainPage.open();

        await MainPage.scrollToServices();
        let tabsNumber: number = (await MainPage.servicesTabs()).length;
        for (let tabIndex: number = 0; tabIndex < tabsNumber; tabIndex++) {
            await MainPage.clickOnServicesTab(tabIndex);
            let serviceIndex: number = 0;
            let serviceName: string = '';
            while (true) {
                await MainPage.closePopUp();
                serviceName = await MainPage.getServiceNameByIndex(serviceIndex);
                await MainPage.clickOnService(serviceIndex);
                await MainPage.sleep(1500);
                expect(await ProductsPage.checkFilters(serviceName)).toBe(true);
                if (await ProductsPage.checkFirstProduct()) {
                    await ProductsPage.openFirstProduct();
                    await ProductPage.scrollToServices();
                    expect(await ProductPage.checkServices(serviceName)).toBe(true);
                    await ProductPage.scrollToTop();
                    await MainPage.sleep(500);
                }
                await ProductPage.clickOnLogo();
                await MainPage.scrollToServices();
                await MainPage.clickOnServicesTab(tabIndex);
                serviceIndex++;
                if (serviceIndex >= (await MainPage.servicesList()).length) {
                    break;
                }
            }
        }
    });

    it('[APPROVED] Checking ""Спецтехніка"" section on the main page', async () => {
        await MainPage.fullscreen();
        await MainPage.open();

        await MainPage.scrollToEquipment();
        let tabsNumber: number = (await MainPage.equipmentTabs()).length;
        for (let tabIndex: number = 0; tabIndex < tabsNumber; tabIndex++) {
            await MainPage.clickOnEquipmentTab(tabIndex);
            let categoryIndex: number = 0;
            let categoryName: string = '';
            while (true) {
                await MainPage.closePopUp();
                categoryName = await MainPage.getEquipmentNameByIndex(categoryIndex);
                await MainPage.clickOnEquipment(categoryIndex);
                await MainPage.sleep(1500);
                expect(await ProductsPage.checkFilters(Equipment[categoryName][0])).toBe(true);
                if (await ProductsPage.checkFirstProduct()){
                    await ProductsPage.openFirstProduct();
                    await ProductPage.scrollToCharacteristics();
                    expect(await ProductPage.checkCategory(categoryName)).toBe(true);
                    await ProductPage.scrollToTop();
                    await MainPage.sleep(500);
                }
                await ProductPage.clickOnLogo();
                await MainPage.scrollToEquipment();
                await MainPage.clickOnEquipmentTab(tabIndex);
                categoryIndex++;
                if (categoryIndex >= (await MainPage.equipmentList()).length) {
                    break;
                }
            }
        }
    });

    it('[APPROVED] Verify that all elements on the footer are displayed and all links are clickable', async () => {
        await MainPage.fullscreen();
        await MainPage.open();
        await MainPage.scrollToFooter();
        expect(await MainPage.checkFooter()).toBe(true);
        expect(await MainPage.checkAboutUs()).toBe(true);
        expect(await MainPage.checkPrivacy()).toBe(true);
        expect(await MainPage.checkCookies()).toBe(true);
        expect(await MainPage.checkTerms()).toBe(true);
        expect(await MainPage.checkForCustomers()).toBe(true);
        expect(await MainPage.checkProducts()).toBe(true);
        expect(await MainPage.checkTenders()).toBe(true);
        expect(await MainPage.checkContacts()).toBe(true);
        expect(await MainPage.checkCopyright()).toBe(true);
        await MainPage.clickOnPrivacy();
        expect((await MainPage.url()).includes("/privacy-policy/"));
        await MainPage.scrollToFooter();
        await MainPage.clickOnCookies();
        expect((await MainPage.url()).includes("/cookie-policy/"));
        await MainPage.scrollToFooter();
        await MainPage.clickOnTerms();
        expect((await MainPage.url()).includes("/terms-conditions/"));
        await MainPage.scrollToFooter();
        await MainPage.clickOnProducts();
        expect((await MainPage.url()).includes("/products/"));
        await MainPage.clickOnLogo();
        await MainPage.scrollToFooter();
        await MainPage.clickOnTerms();
        expect((await MainPage.url()).includes("/tenders-map/"));
        await MainPage.clickOnLogo();
        await MainPage.scrollToFooter();
        expect(await MainPage.checkEmail()).toBe(true);
    });
})

