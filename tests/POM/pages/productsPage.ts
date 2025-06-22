import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartLink: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.product-card');
    this.cartLink = page.locator('#cart-link');
    this.cartCount = page.locator('#cart-count');
  }

  async navigate() {
    await this.page.goto('https://osstep.github.io/products');
  }

  async getProductByName(name: string) {
    return this.page.locator(`.product-card:has-text("${name}")`);
  }

  async addProductToCart(name: string) {
    const product = await this.getProductByName(name);
    await product.locator('.add-to-cart').click();
  }

  async getCartCount() {
    return parseInt((await this.cartCount.textContent()) || '0');
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
