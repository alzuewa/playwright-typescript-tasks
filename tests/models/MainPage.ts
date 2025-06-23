import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
        text: 'Node.js',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
        name: 'Community link',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub repository link',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord server link',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Command+K)' }),
        name: 'Search button',
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable end-to-end testing for modern web apps.',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started link',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }

  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }

  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      await test.step(`Check element ${name} visibility`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Check the name of element ${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  async checkElementsHrefAttributes() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Check href attribute of element ${name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }

  async clickSwitchLightModeIcon() {
    await this.page
      .getByRole('button', { name: 'Switch between dark and light' })
      .click({ clickCount: 2 });
  }

  async checkDataThemeAttributeValue() {
    await expect
      .soft(this.page.locator('html'))
      .toHaveAttribute('data-theme', 'dark', { timeout: 10000 });
  }

  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }

  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot('pageWithLightMode.png');
  }

  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot('pageWithDarkMode.png');
  }
}
