import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Authorization tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Sucsessful login', async () => {
    await loginPage.login('admin', 'admin123');
    await expect(loginPage.page).toHaveURL(/products.html/);
  });

  test('Unsuccessful login with empty fields', async () => {
    await loginPage.clickLogin();
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Все поля обязательны');
  });

  test('Unsuccessful login with incorrect data', async () => {
    await loginPage.login('wrong', 'credentials');
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Неверные учетные данные');
  });
});
