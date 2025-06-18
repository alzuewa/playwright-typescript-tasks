import { test, expect, Locator } from '@playwright/test';

test.describe('Basic selectOption tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });

  test('Select a country by Name', async ({ page }) => {
    const countrySelect = page.getByLabel('Страна');
    await expect(countrySelect).toHaveValue('');

    await countrySelect.selectOption('de');
    await expect(countrySelect).toHaveValue('de');
    await expect(page.locator('#country-feedback')).toHaveText('Выбрано: Германия');
  });

  test('Select a country by text', async ({ page }) => {
    const countrySelect = page.getByLabel('Страна');
    await countrySelect.selectOption({ label: 'Германия' });

    await expect(countrySelect).toHaveValue('de');
    await expect(page.locator('#country-feedback')).toHaveText('Выбрано: Германия');
  });
});

test.describe('Work with select multiple', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });
  // Helper to get all selected values
  const getSelectedValues = async (locator: Locator) => {
    const checkedOptions = await locator.locator('option:checked').all();
    return Promise.all(checkedOptions.map((option) => option.getAttribute('value')));
  };

  test('Multiple choice by value', async ({ page }) => {
    const languagesSelect = page.getByLabel('Языки программирования');

    await languagesSelect.selectOption(['js', 'py']);

    const selectedOptions = await getSelectedValues(languagesSelect);
    expect(selectedOptions).toEqual(['js', 'py']);
    await expect(page.locator('#languages-feedback')).toHaveText('Выбрано: JavaScript, Python');
  });
});

test.describe('Other scenarios with select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });

  test('Choice from group options', async ({ page }) => {
    const carBrandSelect = page.getByLabel('Марка автомобиля');

    await carBrandSelect.selectOption('toyota');
    await expect(carBrandSelect).toHaveValue('toyota');
  });

  test('Dynamically added select', async ({ page }) => {
    const dynamicSelect = page.getByLabel('Динамический select');
    await expect(dynamicSelect).toBeVisible({ timeout: 2000 });

    await dynamicSelect.selectOption('Опция 2');
    await expect(dynamicSelect).toHaveValue('opt2');
  });
});
