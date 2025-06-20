import { test, expect } from '@playwright/test';

test.describe('Test registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/steps');
  });

  test('Test full registration scenario', async ({ page }) => {
    await test.step('Preconditions: Check initial form state', async () => {
      await expect(page.locator('#username')).toBeEmpty();
      await expect(page.locator('#email')).toBeEmpty();
      await expect(page.locator('#password')).toBeEmpty();
      await expect(page.locator('#error-message')).toBeHidden();
      await expect(page.locator('#success-message')).toBeHidden();
      await expect(page.locator('.profile-section')).toBeHidden();
    });

    await test.step('1: Attempt to register with empty data', async () => {
      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

      await expect(page.locator('#error-message')).toBeVisible();
      await expect(page.locator('#error-message')).toHaveText(
        'Все поля обязательны для заполнения',
      );
      await expect(page.locator('#success-message')).toBeHidden();
    });

    await test.step('2: Attempt to register with invalid data', async () => {
      await page.locator('#username').fill('testuser');
      await page.locator('#email').fill('invalid-email');
      await page.locator('#password').fill('123');
      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

      await expect(page.locator('#error-message')).toBeVisible();
      await expect(page.locator('#error-message')).toContainText(
        'Пароль должен быть не менее 6 символов',
      );
    });

    await test.step('3: Successful registration', async () => {
      await page.locator('#email').fill('test@example.com');
      await page.locator('#password').fill('securepassword123');
      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

      await expect(page.locator('#error-message')).toBeHidden();
      await expect(page.locator('#success-message')).toBeVisible();
      await expect(page.locator('#welcome-user')).toHaveText('testuser');
      await expect(page.locator('.profile-section')).toBeVisible();
    });

    await test.step('4: Check user profile data', async () => {
      await expect(page.locator('#profile-username')).toHaveText('testuser');
      await expect(page.locator('#profile-email')).toHaveText('test@example.com');
    });

    await test.step('5: Log out from system', async () => {
      await page.getByRole('button', { name: 'Выйти' }).click();

      await expect(page.locator('.profile-section')).toBeHidden();
      await expect(page.locator('#username')).toBeEmpty();
      await expect(page.locator('#auth-form')).toBeVisible();
    });
  });

  test.describe('Parametrized registration tests', () => {
    const testCases = [
      {
        title: 'Short password (5 symbols)',
        data: { username: 'user1', email: 'user1@test.com', password: '12345' },
        expectedError: 'Пароль должен быть не менее 6 символов',
      },
    ];

    for (const testCase of testCases) {
      test(testCase.title, async ({ page }) => {
        await test.step('Arrange: Enter test data', async () => {
          await page.locator('#username').fill(testCase.data.username);
          await page.locator('#email').fill(testCase.data.email);
          await page.locator('#password').fill(testCase.data.password);
        });

        await test.step('Action: Send the form', async () => {
          await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        });

        await test.step('Assert: Error message', async () => {
          await expect(page.locator('#error-message')).toBeVisible();
          await expect(page.locator('#error-message')).toContainText(testCase.expectedError);
        });
      });
    }
  });

  test('Nested steps with group checks', async ({ page }) => {
    await test.step('Group: Test fields validations', async () => {
      await test.step('Empty fields: Sending an empty form', async () => {
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });

      await test.step('Partially filled form: Username only', async () => {
        await page.locator('#username').fill('partialuser');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });
    });

    await test.step('Group: Test successful scenarios', async () => {
      await test.step('Valid data: Fully filled form', async () => {
        await page.locator('#username').fill('validuser');
        await page.locator('#email').fill('valid@example.com');
        await page.locator('#password').fill('validpassword123');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#success-message')).toBeVisible();
      });
    });
  });
});
