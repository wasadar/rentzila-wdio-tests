import { expect } from '@wdio/globals';
import MainPage from '../pageobjects/main.page.ts';
import ProductsPage from '../pageobjects/products.page.ts';
import ProductPage from '../pageobjects/product.page.ts';
import { Equipment } from '../../helpers/data.ts';
import { consultation, deleteConsultation, listConsultations } from '../../helpers/backend.ts';

/**
* A set of often repeated steps for a test case C530 extracted into a separate function.
*/
async function search(inputValue: string, expectedResultValue: string = inputValue) {
    await MainPage.clickOnSearch();
    expect((await MainPage.checkSearchPopUp()) &&
    (await MainPage.checkSearchPopUpLabel("Історія пошуку")) &&
    (await MainPage.checkSearchPopUpLabel("Послуги")) &&
    (await MainPage.checkSearchPopUpLabel("Категорії"))).toBe(true);
    await MainPage.fillSearch(inputValue);
    await MainPage.pressEnter();
    await ProductsPage.sleep(2000);
    expect((await ProductsPage.url()).includes("/products/")).toBe(true);
    expect(await ProductsPage.getSearchValue()).toBe(expectedResultValue);
    expect(await ProductsPage.checkSearchResultLabel()).toBe(true);
    await ProductsPage.clickOnLogo();
    await MainPage.sleep(2000);
}

/**
* A set of often repeated steps for a test case C530 extracted into a separate function.
*/
async function searchServiceOrCategory(value: string) {
    await MainPage.clickOnSearch();
    await MainPage.fillSearch(value);
    await ProductsPage.sleep(1000);
    expect(await MainPage.checkSearchPopUpResult(value)).toBe(true);
    await MainPage.clickOnSearchPopUpResult(value);
    await ProductsPage.sleep(2000);
    expect((await ProductsPage.url()).includes("/products/")).toBe(true);
    expect(await ProductsPage.checkFilters(value)).toBe(true);
    expect(await ProductsPage.checkSearchResultLabel()).toBe(true);
    await ProductsPage.clickOnLogo();
    await MainPage.sleep(2000);
}

describe('Rentzila application', () => {
    beforeEach(async () => {
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
        expect((await MainPage.url()).includes("/privacy-policy/")).toBe(true);
        await MainPage.scrollToFooter();
        await MainPage.clickOnCookies();
        expect((await MainPage.url()).includes("/cookie-policy/")).toBe(true);
        await MainPage.scrollToFooter();
        await MainPage.clickOnTerms();
        expect((await MainPage.url()).includes("/terms-conditions/")).toBe(true);
        await MainPage.scrollToFooter();
        await MainPage.clickOnProducts();
        expect((await MainPage.url()).includes("/products/")).toBe(true);
        await MainPage.clickOnLogo();
        await MainPage.scrollToFooter();
        await MainPage.clickOnTenders();
        expect((await MainPage.url()).includes("/tenders-map/")).toBe(true);
        await MainPage.clickOnLogo();
        await MainPage.scrollToFooter();
        expect(await MainPage.checkEmail()).toBe(true);
    });

    it('[EDITING]Verify Search Input', async () => {
        await search("");
        await search("Трактор");
        await search("Ремонт гідравлики");
        await search("          ");
        await search("!");
        await search("@");
        await search("#");
        await search("$");
        await search("%");
        await search("(");
        await search(")");
        await search("*");
        await search("[");
        await search("]");
        await search("<","");
        await search(">","");
        await search("^","");
        await search(";","");
        await search("{","");
        await search("}","");
        await searchServiceOrCategory("Асфальтування");
        await searchServiceOrCategory("драглайни");
        await MainPage.clickOnSearch();
        await MainPage.fillSearch("Ремонт");
        expect((await MainPage.checkSearchPopUp()) &&
        (await MainPage.checkSearchPopUpLabel("Історія пошуку")) &&
        (await MainPage.checkSearchPopUpLabel("Послуги")) &&
        (await MainPage.checkSearchPopUpLabel("Категорії"))).toBe(true);
        await MainPage.clickOnClearSearch();
        expect(await MainPage.checkSearchPopUpClose()).toBe(true);
        expect(await MainPage.getSearchValue()).toBe("");
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

    it('Verify ""Каталог"" [APPROVED]', async () => {
        let index: number = 0;
        let text: string;
        let length: number;

        // Here I slightly changed the order of steps by checking reaction on hover before reaction on click process test case faster
        do {
            expect(await MainPage.checkCatalog()).toBe(true);
            await MainPage.clickOnCatalog();
            expect((await MainPage.checkCatalogDropDownElementType1("Спецтехніка")) && 
            (await MainPage.checkCatalogDropDownElementType1("Послуги"))).toBe(true);
            await MainPage.hoverOnCatalogDropDownElementType1("Спецтехніка");
            expect((await MainPage.checkCatalogDropDownElementType2("Будівельна техніка")) &&
            (await MainPage.checkCatalogDropDownElementType2("Комунальна техніка")) &&
            (await MainPage.checkCatalogDropDownElementType2("Сільськогосподарська техніка")) &&
            (await MainPage.checkCatalogDropDownElementType2("Складська техніка"))).toBe(true);
            length = (await MainPage.catalogDropDownElementsType2()).length;
            text = await MainPage.getTextOfCatalogDropDownElementType2ByIndex(index);
            await MainPage.hoverOnCatalogDropDownElementType2(text);
            expect(await MainPage.checkSubcategories(text,length)).toBe(true);
            await MainPage.clickOnCatalogDropDownElementType2(text);
            await MainPage.sleep(2000);
            expect(await ProductsPage.checkFilters(text)).toBe(true);
            await MainPage.clickOnLogo();
            await MainPage.sleep(2000);
        } while(++index < length);
        
        index = 0;

        do {
            expect(await MainPage.checkCatalog()).toBe(true);
            await MainPage.clickOnCatalog();
            expect((await MainPage.checkCatalogDropDownElementType1("Спецтехніка")) && 
            (await MainPage.checkCatalogDropDownElementType1("Послуги"))).toBe(true);
            await MainPage.hoverOnCatalogDropDownElementType1("Послуги");
            expect((await MainPage.checkCatalogDropDownElementType2("Будівельні")) &&
            (await MainPage.checkCatalogDropDownElementType2("Інші")) &&
            (await MainPage.checkCatalogDropDownElementType2("Сільськогосподарські"))).toBe(true);
            length = (await MainPage.catalogDropDownElementsType2()).length;
            text = await MainPage.getTextOfCatalogDropDownElementType2ByIndex(index);
            await MainPage.hoverOnCatalogDropDownElementType2(text);
            expect(await MainPage.checkSubcategories(text,length)).toBe(true);
            text = await MainPage.getTextOfCatalogDropDownElementType2ByIndex(length);
            await MainPage.clickOnCatalogDropDownElementType2(text);
            await MainPage.sleep(2000);
            expect(await ProductsPage.checkFilters(text)).toBe(true);
            await MainPage.clickOnLogo();
            await MainPage.sleep(2000);
        } while(++index < length);
    });
})
