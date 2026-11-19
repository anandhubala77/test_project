import { test, expect } from "@playwright/test";
import { PurchasePage } from "../pages/Purchase";
import { LoginPage } from "../pages/Login";
import dataset from "../testdata/dataset.json";
import orderdata from "../testdata/Placeorder.json";

import { LogoutPage } from "../pages/Logout";

test("purchase test", async ({ page }) => {
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

test("purchase laptop",async ({page})=>{
  await page.goto("https://www.demoblaze.com");

  const username = dataset.username;
  const password = dataset.password;

  const loginobj = new LoginPage(page);

  await loginobj.clickLogin();
  await loginobj.enterCredtial(username, password);
  await loginobj.LoginButtonclick();

    
  const laptopobj=new PurchasePage(page);

  await laptopobj.Laptop();
  await laptopobj.Lap();

})

test("purchase monitor",async ({page})=>{
  await page.goto("https://www.demoblaze.com");

  const username = dataset.username;
  const password = dataset.password;

  const loginobj = new LoginPage(page);

  await loginobj.clickLogin();
  await loginobj.enterCredtial(username, password);
  await loginobj.LoginButtonclick();

    
  const monitorobj=new PurchasePage(page);      
  await monitorobj.MonitorFilterCLick();
  await monitorobj.MonitorSelect();
})

test.only("logOut",async({page})=>{
   await page.goto("https://www.demoblaze.com");

  const username = dataset.username;
  const password = dataset.password;

  const loginobj = new LoginPage(page);

  await loginobj.clickLogin();
  await loginobj.enterCredtial(username, password);
  await loginobj.LoginButtonclick();

  const logoutobj = new LogoutPage(page);

  await logoutobj.clickLogout();


   
})
