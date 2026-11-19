export class LoginPage {
  constructor(page) {
    this.page = page;

    this.LoginLink=page.locator('a[data-target="#logInModal"]');
    this.usernameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.loginButton = page.locator('button[onclick="logIn()"]');
    this.CloseButton = page.getByRole("button", { name: "Close", exact: true });
  }

  async clickLogin(){

    await this.LoginLink.click()
  }

  async enterCredtial(username,password){

    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
  }

  async LoginButtonclick(){
    await this.loginButton.click()


  }

  async clickClose(){
    await this.CloseButton.click()
  }


}
