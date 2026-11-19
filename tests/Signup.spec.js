import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/Signup";
import dataset from "../testdata/dataset.json";
test("Sign up test", async ({ page }) => {
  await page.goto("https://www.demoblaze.com");

  const usrName = dataset.username;
  const password = dataset.password;

  const signobj = new SignupPage(page);

  await signobj.Signuplink();
  await signobj.enterUsername(usrName);
  await signobj.enterPassword(password);
   await page.pause();
  const dialogPromise = page.waitForEvent("dialog");
  await signobj.ClickSignup();
  const dialog = await dialogPromise;
  console.log(dialog.message());
  await dialog.accept();
});

test.only("close button ", async ({ page }) => {
  await page.goto("https://www.demoblaze.com");

  const closeobj = new SignupPage(page);

  await closeobj.Signuplink()
  await closeobj.clickClose();

  await expect(closeobj.signupModal).toBeHidden();
});
