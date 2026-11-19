export class LogoutPage {
  constructor(page) {
    this.page = page;
    this.LoginLink = page.locator('#logout2');
    
  }

  async clickLogout() {
    await this.LoginLink.click();
  }
}
