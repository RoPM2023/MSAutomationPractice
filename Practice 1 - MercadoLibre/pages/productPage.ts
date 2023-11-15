import {Page, Locator} from "@playwright/test";

export default class ProductPage {

    readonly page : Page;
    readonly quantity : Locator;
    readonly selectedQuantity : Locator;

    constructor(page : Page) {
        this.page = page;
        this.quantity = this.page.locator(".ui-pdp-buybox__quantity__chevron");
        this.selectedQuantity = this.page.locator("//li[@id=':rp:-3']"); //4 unidades
    }

    async selectQuantity () {
        await this.quantity.click();
        await this.selectedQuantity.click();
    }

}