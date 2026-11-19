import { test, expect } from "@playwright/test";
import { PurchasePage } from "../pages/Purchase";
import { LoginPage } from "../pages/Login";
import dataset from "../testdata/dataset.json";
import orderdata from "../testdata/Placeorder.json";

test.only("purchase test", async ({ page }) => {
  await page.goto("https://www.demoblaze.com");

  const username = dataset.username;
  const password = dataset.password;

  const loginobj = new LoginPage(page);

  await loginobj.clickLogin();
  await loginobj.enterCredtial(username, password);
  await loginobj.LoginButtonclick();

  const purchaseobj = new PurchasePage(page);

  await purchaseobj.Productclick();
  await page.pause();

  await page.pause();

  const dialogPromise = page.waitForEvent("dialog");
  await purchaseobj.AddtoCartclick();
  const dialog = await dialogPromise;
  await dialog.accept();

  await purchaseobj.GotoCart();

  await purchaseobj.placeorderBTn();

  await purchaseobj.Placeorder(orderdata);

  await purchaseobj.PurchaseButtonclick();

  await page.pause();

  await purchaseobj.okButtonclick();
});
