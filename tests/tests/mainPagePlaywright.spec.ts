import { test, expect, Locator, Page } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

let mainPage: MainPage;

test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Test navigation header elements displaying', async () => {
    await mainPage.checkElementsVisibility();
  });

  test('Test navigation elements names', async () => {
    await mainPage.checkElementsText();
  });

  test('Test navigation header links', async () => {
    await mainPage.checkElementsHrefAttributes();
  });

  test('Test switching light mode', async () => {
    await test.step('Clicking the light mode icon', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Check "mode" attribute changed', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test('Test styles with light mode', async () => {
    await test.step('Setting light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Screenshot check with active light mode', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test('Test styles with dark mode', async () => {
    await test.step('Setting dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Screenshot check with active dark mode', async () => {
      await mainPage.checkLayoutWithDarktMode();
    });
  });
});
