import {Page} from "@playwright/test";

export default class HomePage {
    public page: Page;

    constructor(page : Page) {
        this.page = page;

    }

    async goTo() {
        await this.page.goto("https://www.mercadolibre.com/")
        await this.page.locator("a:has-text('Argentina')").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole("button", {name: "Aceptar cookies"}).click();
    }
}