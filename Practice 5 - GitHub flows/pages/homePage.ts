import {Page, Locator,expect} from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly accountMenuBtn : Locator;
    readonly closeAccountMenuBtn : Locator;
    readonly yourStarred : Locator;
    readonly sideMenu : Locator;
    readonly explore: Locator;
    readonly yourProfile : Locator;

    constructor(page : Page) {
        this.page = page;
        this.accountMenuBtn = page.locator("(//img[@class='avatar circle'])[1]");
        this.closeAccountMenuBtn = this.page.locator("modal-dialog[role='dialog'] button.close-button.Overlay-closeButton").nth(3);
        this.yourStarred = this.page.locator("//a[contains(.,'Your stars')]");
        this.sideMenu = this.page.locator("button[aria-label='Open global navigation menu']");
        this.explore = this.page.locator("modal-dialog[role='dialog'] a .ActionListItem-label").nth(5);
        this.yourProfile = this.page.locator("//span[text()[normalize-space()='Your profile']]");
    };

    async gotoLandPage(url :string) {
        this.page.goto(url);
    };

    async openAccountMenu() {
        await this.accountMenuBtn.click();
    };

    async setAndDeleteStatus() {

        const statusOp = this.page.locator("button[data-action='click:user-drawer-side-panel#openDialog']");
        const setcurrentStatus = this.page.locator("input.d-table-cell.width-full");
        const myStatus = 'Studying';
        const busyCheck = this.page.locator("input.js-user-status-limited-availability-checkbox");
        const clearSelect = this.page.locator("#expires_at");
        const setStatus = this.page.locator('button.js-user-status-submit.Button--primary');
        const clearStatus = this.page.locator("button.js-clear-user-status-button.Button--secondary");

        await statusOp.click();
        await setcurrentStatus.fill(myStatus);
        await busyCheck.check();
        await clearSelect.selectOption("in 1 hour");
        await setStatus.click();
        await this.page.waitForLoadState('networkidle');
        await this.closeAccountMenuBtn.click();
        await this.accountMenuBtn.click();
        await expect(this.page.locator("button[data-action='click:user-drawer-side-panel#openDialog']")).toContainText(myStatus);
        await statusOp.click();
        await clearStatus.click();
    };

    async goToStarred() {
        await this.yourStarred.click();
    };

    async closeAccountMenu() {
        await this.closeAccountMenuBtn.click();
    };

    async openSideMenu() {
        await this.sideMenu.click();
    };

    async goToExplore() {
        //await this.page.pause();
        await this.explore.click();
    };

    async goToProfile() {
        await this.yourProfile.click();
    };

}