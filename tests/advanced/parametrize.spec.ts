import { test, expect } from '@playwright/test';

// Tests for login form
test.describe('Parametrized tests for login form', () => {
  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ];

  loginTestCases.forEach(({ username, password, expected }) => {
    test(`Test login: ${username || 'empty'}/${password} → ${expected}`, async ({ page }) => {
      await page.goto('https://osstep.github.io/parametrize');

      await test.step('Fill in login form', async () => {
        if (username) {
          await page.getByRole('textbox', { name: 'Имя пользователя' }).fill(username);
        }
        await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
      });

      await test.step('Submit the form', async () => {
        await page.click('#login-btn');
      });

      await test.step('Assert the result', async () => {
        const message = page.locator('#message');
        await expect(message).toBeVisible();
        await expect(message).toHaveText(expected);

        const expectedClass = expected === 'Успешный вход!' ? 'success' : 'error';
        await expect(message).toHaveClass(new RegExp(expectedClass));
      });
    });
  });
});

// Tests for calculator
test.describe('Parametrized calculator tests', () => {
  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];

  calculatorTestCases.forEach(({ a, b, operation, expected }) => {
    test(`Operation ${operation} for ${a} and ${b} → ${expected}`, async ({ page }) => {
      await page.goto('https://osstep.github.io/parametrize');

      await test.step('Enter numbers', async () => {
        await page.fill('#num1', a.toString());
        await page.fill('#num2', b.toString());
      });

      await test.step('Perform operation', async () => {
        const button = operation === 'add' ? '#add-btn' : '#multiply-btn';
        await page.click(button);
      });

      await test.step('Assert the result', async () => {
        const resultText = await page.locator('#result').innerText();
        expect(resultText).toBe(`Результат: ${expected}`);
      });
    });
  });
});
