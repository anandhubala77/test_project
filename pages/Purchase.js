import { expect } from "@playwright/test";

export class PurchasePage {
  constructor(page) {
    this.page = page;

    this.Product = page
      .locator(".card-title")
      .filter({ hasText: "Iphone 6 32gb" });
    this.AddtocartButton = page.locator('a[onclick="addToCart(5)"]');
    this.cartLink = page.locator("#cartur");

    this.placeOrderButton = page.locator('button[data-target="#orderModal"]');

    this.nameValue = page.locator("#name");
    this.CountryValue = page.locator("#country");
    this.CityValue = page.locator("#city");
    this.CreditCard = page.locator("#card");
    this.MonthValue = page.locator("#month");
    this.yearValue = page.locator("#year");
    this.PurchaseOrder = page.getByRole("button", {
      name: "Purchase",
      exact: true,
    });
    this.PurchaseClose = page.locator(
      '#exampleModal .modal-footerbutton[data-dismiss="modal"]',
    );

    this.PurchaseOk = page.locator(".confirm.btn.btn-lg.btn-primary");
  }

  async Productclick() {
    await this.Product.click();
  }

  async AddtoCartclick() {
    await this.AddtocartButton.click();
  }

  async GotoCart() {
    await this.cartLink.click();
  }
  async placeorderBTn() {
    const modal = this.page.locator("#orderModal");

    await this.placeOrderButton.waitFor({ state: "visible" });

    await expect(async () => {
      await this.placeOrderButton.click();
      await expect(modal).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 15000 });
  }
  async Placeorder(data) {
    await this.nameValue.fill(data.name);
    await this.CountryValue.fill(data.country);
    await this.CityValue.fill(data.City);
    await this.CreditCard.fill(data.card);
    await this.MonthValue.fill(data.month);
    await this.yearValue.fill(data.year);
  }

  async PurchaseButtonclick() {
    await this.PurchaseOrder.click();
  }

  async okButtonclick() {
    await this.PurchaseOk.click();
  }
}
