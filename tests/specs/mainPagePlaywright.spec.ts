import { test, expect } from '../fixtures/mainPage';

test.describe('Main page tests', () => {
  test('Test navigation header elements displaying', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  test('Test navigation elements names', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Test navigation header links', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttributes();
  });

  test('Test switching light mode', async ({ mainPage }) => {
    await test.step('Clicking the light mode icon', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Check "mode" attribute changed', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test('Test styles with light mode', async ({ mainPage }) => {
    await test.step('Setting light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Screenshot check with active light mode', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test('Test styles with dark mode', async ({ mainPage }) => {
    await test.step('Setting dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Screenshot check with active dark mode', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
