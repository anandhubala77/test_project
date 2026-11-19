import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";
import CredentialData from "../testdata/Logincredential.json";

for (const data of CredentialData) {
  test(`Login test  ${data.username} ${data.password}`, async ({ page }) => {
    await page.goto("https://www.demoblaze.com");

    const username = data.username;
    const password = data.password;

    const Loginobj = new LoginPage(page);

    await Loginobj.clickLogin();

    await Loginobj.enterCredtial(username,password);

    await page.pause();

    page.on("dialog", async (dialog) => {
      console.log("Alert message:", dialog.message());
      await page.pause();
      await dialog.accept();
    });

    await Loginobj.LoginButtonclick();

    if (data.expectedResult === "success") {
      console.log(await expect(page).toHaveTitle("STORE"));
    }
  });
}
