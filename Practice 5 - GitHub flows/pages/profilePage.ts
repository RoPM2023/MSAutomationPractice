import {Page, Locator,expect} from "@playwright/test";
import { log } from "console";

export default class ProfilePage {

    readonly page : Page;
    readonly mainRepoCont : Locator;
    readonly repoCard : Locator;
    readonly RepoTitle : Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainRepoCont = this.page.locator("div.col-lg-9");
        this.repoCard = this.page.locator(".col-12.d-block.width-full.py-4.border-bottom");
        this.RepoTitle = this.page.locator(".d-inline-block.mb-1 a");
    }

    async printEveryRepo() {
        const count: number = await this.repoCard.count();
        const everyRepoTitle : Array<string> = [];

        for(let i = 0; i < count ; i++) {

            let title = await this.repoCard.nth(i).locator(this.RepoTitle).textContent();
            everyRepoTitle.push(title!);
        };

        console.log(everyRepoTitle);
        
    };
}