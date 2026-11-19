import { test, expect } from "@playwright/test";
import { PurchasePage } from "../pages/Purchase";
import { LoginPage } from "../pages/Login";
import dataset from "../testdata/dataset.json";
import orderdata from "../testdata/Placeorder.json";

// Run sequentially so the same user account doesn't have cart collisions
test.describe.configure({ mode: "serial" });

test.describe("Demoblaze Purchase Flow", () => {
  let purchaseobj;

  // Runs automatically before every test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.demoblaze.com");

    const loginobj = new LoginPage(page);
    await loginobj.clickLogin();
    await loginobj.enterCredtial(dataset.username, dataset.password);
    await loginobj.LoginButtonclick();

    // Verify login succeeded before starting the test
    await expect(page.locator("#nameofuser")).toBeVisible();

    purchaseobj = new PurchasePage(page);
  });

  // Helper function for the shared Add-to-Cart + Checkout steps
  async function completeCheckout(page) {
    const dialogPromise = page.waitForEvent("dialog");
    await purchaseobj.AddtoCartclick();
    const dialog = await dialogPromise;
    await dialog.accept();

    await purchaseobj.GotoCart();
    await purchaseobj.placeorderBTn();
    await purchaseobj.Placeorder(orderdata);
    await purchaseobj.PurchaseButtonclick();

    // Assertion: verify order confirmation appears
    await expect(page.getByText("Thank you for your purchase!")).toBeVisible();
    await purchaseobj.okButtonclick();
  }

  test("7. Purchase a product", async ({ page }) => {
    await purchaseobj.Productclick();
    await completeCheckout(page);
  });

  test("8. Purchase a laptop", async ({ page }) => {
    await purchaseobj.Laptop();
    await purchaseobj.Lap();
    await completeCheckout(page);
  });

  test("9. Purchase a monitor", async ({ page }) => {
    await purchaseobj.MonitorFilterCLick();
    await purchaseobj.MonitorSelect();
    await completeCheckout(page);
  });
});