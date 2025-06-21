import { test, expect } from '@playwright/test';

test.describe('page.evaluate() practice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/evaluate');
  });

  test('Getting element text content', async ({ page }) => {
    // 1. Get current counter value
    const counterValue = await page.evaluate(() => {
      return document.getElementById('counter')?.textContent;
    });

    // Check: counter initial value equals '0' on page load
    expect(counterValue).toBe('0');

    // 2: Click incresing button
    await page.click('#increment');

    // 3: Get updated counter value with param usage
    const updatedValue = await page.evaluate((selector) => {
      return document.querySelector(selector)?.textContent;
    }, '#counter');

    // It's the same as await page.evaluate(() => {
    //   return document.getElementById('counter')?.textContent;
    // }); but simply another way of getting element in DOM

    // Check: Counter value has increased by 1
    expect(updatedValue).toBe('1');
  });

  test('DOM modification using evaluate', async ({ page }) => {
    // Test shows how to change DOM structure

    // 1. Check initial content
    const initialContent = await page.locator('#dynamic-content').innerText();
    expect(initialContent).toContain('Исходное содержимое');

    // 2. Modify initial content using evaluate - it needs to add new content to #dynamic-content element from above using evaluate
    // <h3>New content</h3><p>Generated with evaluate()</p>
    await page.evaluate(() => {
      const div = document.getElementById('dynamic-content');
      if (div) {
        div.innerHTML = '<h3>New content</h3><p>Generated with evaluate()</p>';
      }
    });

    // Check: the content has changed
    await expect(page.locator('#dynamic-content h3')).toHaveText('New content');
  });

  // This is a demo test
  test('Work with complex objects', async ({ page }) => {
    // Test demontrates passing and returning objects

    // 1. Create user in UI (click the button Create user)
    await page.click('#create-user');

    // 2. Get user data through evaluate and return it as an object
    const userData = await page.evaluate(() => {
      const userCard = document.querySelector('.user-card');
      if (!userCard) return null;

      return {
        title: userCard.querySelector('h3')?.textContent,
        date: userCard.querySelector('p')?.textContent,
        color: window.getComputedStyle(userCard).backgroundColor,
      };
    });

    // Check: user data is correct
    expect(userData).toEqual({
      title: expect.stringContaining('Пользователь #'),
      date: expect.stringContaining('Дата создания:'),
      color: 'rgba(0, 0, 0, 0)', // transparent background
    });
  });

  // This is a demo test
  test('Get info about browser', async ({ page }) => {
    // Test demontrates an access to browser objects

    // 1. Git data through evaluate
    const browserInfo = await page.evaluate(() => {
      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenWidth: screen.width,
        screenHeight: screen.height,
        documentTitle: document.title,
      };
    });

    // 2. Reveal info to debug
    console.log('Browser info', browserInfo);

    // Check: the data is correct
    expect(browserInfo.userAgent).toContain('Mozilla');
    expect(browserInfo.documentTitle).toBe('Практика page.evaluate()');
    expect(browserInfo.screenWidth).toBeGreaterThan(0);
  });

  // This is a demo test
  test('Error handling in evaluate', async ({ page }) => {
    // Test shows errors handling

    // 1. Try to obtain non-existent element
    const result = await page.evaluate(() => {
      try {
        const element = document.getElementById('non-existent-element');
        if (!element) throw new Error('Element not found');
        return element.textContent;
      } catch (error) {
        console.error('Error in evaluate:', error.message);
        return null;
      }
    });

    // Check: Error has handled properly
    expect(result).toBeNull();
  });

  // This is a demo test
  test('Comparing with Playwright methods', async ({ page }) => {
    // Test demonstrates the difference between evaluate() and standard Playwright methods

    // 1. Get counter value with Playwright method
    const playwrightValue = await page.locator('#counter').innerText();

    // 2. Get the same counter value with evaluate()
    const evaluateValue = await page.evaluate(() => {
      return document.getElementById('counter')?.textContent;
    });

    // Check: Values are equal
    expect(playwrightValue).toBe(evaluateValue);

    // 3. Measure performance
    console.time('Standard method');
    await page.locator('#counter').innerText();
    console.timeEnd('Standard method');

    console.time('Evaluate method');
    await page.evaluate(() => document.getElementById('counter')?.textContent);
    console.timeEnd('Evaluate method');
  });
});
