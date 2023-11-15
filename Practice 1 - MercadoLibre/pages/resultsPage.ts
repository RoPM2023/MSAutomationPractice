import {Page, Locator} from "@playwright/test";


export default class ResultsPage {
    readonly navBar : Locator;
    readonly searchBtn : Locator;
    readonly filterArrivesToday : Locator;
    readonly filterFreeDelivery : Locator;
    readonly filterGender : Locator;
    readonly filterSize : Locator;
    readonly filterBrand : Locator;
    readonly minPrice : Locator;
    readonly maxPrice : Locator;
    readonly priceBtn : Locator;
    readonly tenOff : Locator;
    readonly location : Locator;
    readonly filterColor : Locator;
    readonly allProducts : Locator;
    readonly allShoesTxt : Locator;
    readonly addToCart : Locator;

    constructor(public page : Page) {
        this.page = page;
        this.navBar = page.locator(".nav-search-input")
        this.searchBtn = page.locator (".nav-search-btn");
        this.filterArrivesToday = page.locator("(//button[@name='button'])[1]");
        this.filterFreeDelivery = page.locator("(//button[@name='button'])[3]");
        this.filterGender = page.locator("a[aria-label='Mujer']");
        this.filterSize = page.locator("a[aria-label='39']");
        this.filterBrand = page.locator("a[aria-label='Vizzano']");
        this.minPrice = page.getByPlaceholder("Mínimo");
        this.maxPrice = page.getByPlaceholder("Máximo");
        this.priceBtn = page.locator(".ui-search-price-filter-action-btn");
        this.tenOff = page.locator("a[aria-label='Desde 10% OFF']");
        this.location = page.locator("a[aria-label='Capital Federal']");
        this.filterColor = page.locator("(//div[@class='andes-tooltip__trigger']//a)[2]");
        this.allProducts = page.locator(".andes-card");
        this.allShoesTxt = page.locator("div.ui-search-result__content-wrapper a");
        this.addToCart = page.locator("span:has-text('Agregar al carrito')");
    }

    async searchByFilters(myProductSearch : string) {
        await this.navBar.fill(myProductSearch);
        await this.searchBtn.click(); 
        await this.filterGender.click()
        await this.filterArrivesToday.click(); 
        await this.filterFreeDelivery.click();    
        await this.filterSize.click();              
        await this.filterBrand.click(); 
        await this.page.waitForLoadState('networkidle');
        await this.minPrice.fill("27000");
        await this.maxPrice.fill("64000");
        await this.priceBtn.click();
        await this.tenOff.click();  
        await this.location.click();     
        await this.filterColor.click();
        await this.page.waitForLoadState('networkidle');

    }

    async selectProduct (myProductTitle : string) {
        const shoesCount = await this.allProducts.count();

        for(let i = 0; i < shoesCount ; i++) {

            if ( await this.allShoesTxt.nth(i).locator("h2").textContent() === myProductTitle ) {
                await this.allShoesTxt.nth(i).click();
                break;
            };
        };
        await this.page.waitForLoadState('networkidle');

    }

}