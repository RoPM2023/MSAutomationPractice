import {Page, Locator,expect} from "@playwright/test";

export default class ExplorePage {
    readonly page: Page;
    readonly topics : Locator;
    readonly trending : Locator;
    readonly collections : Locator;
    readonly events : Locator;
    readonly sponsors : Locator;

    constructor(page: Page) {
        this.page = page;
        this.topics = this.page.locator("a[data-selected-links='topics_path /topics/ /topics']");
        this.trending = this.page.locator("a[data-selected-links='/trending /trending/developers /trending/developers /trending /trending']");
        this.collections = this.page.locator("a[data-selected-links='collections_path /collections/ /collections']");
        this.events = this.page.locator("a[data-selected-links='events_path /events/ /events']");
        this.sponsors = this.page.locator("a[data-selected-links='sponsors_explore_index_path /sponsors/explore /sponsors/explore']");
    };
    
    async goToTopicsCategory () {
        await this.topics.click();
    }

    async goToTrendingCategory () {
        await this.trending.click();
    }

    async goToCollectionsCategory () {
        await this.collections.click();
    }

    async goToEventsCategory () {
        await this.events.click();
    }

    async goToSponsorsCategory () {
        await this.sponsors.click();
    }
}