import { expect } from '@wdio/globals';
import MainPage from '../pageobjects/main.page.ts';
import ProductsPage from '../pageobjects/products.page.ts';
import ProductPage from '../pageobjects/product.page.ts';
import Equipment from '../../helpers/equipment.ts';
import { consultation, deleteConsultation, listConsultations } from '../../helpers/backend.ts';

describe('Rentzila application', () => {
    beforeEach(async () => {
        await MainPage.fullscreen();
        await MainPage.open();
    });

    it('[APPROVED] Checking ""Послуги"" section on the main page', async () => {
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

    it('[EDITED] Verify ""У Вас залишилися питання?"" form', async () => {
        let name: string = "Test";
        let phone: string = "+380506743060";

        await MainPage.scrollToConsultation();
        await MainPage.closePopUp();
        await MainPage.clickOnOrder();
        expect((await MainPage.checkOrderConsultationFieldErrorValue(0,"Поле не може бути порожнім")) &&
        (await MainPage.checkOrderConsultationFieldErrorValue(1,"Поле не може бути порожнім")) &&
        (await MainPage.checkOrderConsultationFieldError(0)) &&
        (await MainPage.checkOrderConsultationFieldError(1))).toBe(true);
        await MainPage.fillOrderConsultationField(0,name);
        expect(await MainPage.checkOrderConsultationFieldError(0)).toBe(false);
        await MainPage.fillOrderConsultationField(1,phone);
        await MainPage.clearOrderConsultationField(0);
        await MainPage.clickOnOrder();
        expect(await MainPage.checkOrderConsultationFieldError(0)).toBe(true);
        expect(await MainPage.checkOrderConsultationFieldError(1)).toBe(false);
        await MainPage.clearOrderConsultationField(1);
        await MainPage.fillOrderConsultationField(0,name);
        await MainPage.fillOrderConsultationField(1,"+38063111111");
        await MainPage.clickOnOrder();
        expect((await MainPage.checkOrderConsultationFieldError(1)) &&
        (await MainPage.checkOrderConsultationFieldErrorValue(0,"Телефон не пройшов валідацію"))).toBe(true);
        await MainPage.clearOrderConsultationField(1);
        await MainPage.fillOrderConsultationField(1,"+1 1111111111111");
        await MainPage.clickOnOrder();
        expect((await MainPage.checkOrderConsultationFieldError(1)) &&
        (await MainPage.checkOrderConsultationFieldErrorValue(0,"Телефон не пройшов валідацію"))).toBe(true);
        await MainPage.clearOrderConsultationField(1);
        await MainPage.fillOrderConsultationField(1, phone);
        await MainPage.clickOnOrder();
        await MainPage.sleep(2000)
        await MainPage.confirmModal();
        let order: consultation = (await listConsultations()).pop();
        expect(order.name == name && order.phone == phone).toBe(true);
        expect(await deleteConsultation(order.id)).toBe(true); // clear database after test
    });
})

