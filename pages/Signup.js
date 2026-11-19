export class SignupPage {
  constructor(page) {
    this.page = page;
    this.signupModal = page.locator("#signInModal");
    this.SignupLink = page.locator('a[data-target="#signInModal"]');
    this.usernameInput = page.locator("#sign-username");
    this.passwordInput = page.locator("#sign-password");
    this.signupButton = page.locator('button[onclick="register()"]');
    this.CloseButton = page.locator(
      '#signInModal .modal-footer button[data-dismiss="modal"]',
    );
  }

  async Signuplink() {
    await this.SignupLink.click();
  }

  async enterUsername(usernameValue) {
    await this.usernameInput.fill(usernameValue);
  }

  async enterPassword(passwordValue) {
    await this.passwordInput.fill(passwordValue);
  }

  async ClickSignup() {
    await this.signupButton.click();
  }
  async clickClose() {
    await this.CloseButton.click();
  }
}
