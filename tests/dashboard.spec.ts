import { test, expect } from '@playwright/test';

test('User should be able to open and close a shift', async ({ page }) => {

  // Login
  await page.goto('/');

  await page.getByRole('link', { name: 'Sign in' }).click();

  await page
    .getByRole('textbox', { name: 'Enter email' })
    .fill(process.env.TEST_EMAIL!);

  await page
    .getByRole('textbox', { name: 'Enter Password' })
    .fill(process.env.TEST_PASSWORD!);

  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify successful login
  await expect(
    page.getByRole('button', { name: 'Header Avatar' })
  ).toBeVisible();

  // Open Shift
  await page
    .locator('.d-flex.align-items-center.justify-content-center.rounded-3')
    .first()
    .click();

  await expect(
    page.getByRole('spinbutton', {
      name: 'Opening Cash Amount ($)',
    })
  ).toBeVisible();

  await page
    .getByRole('spinbutton', {
      name: 'Opening Cash Amount ($)',
    })
    .fill('1000');

  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Open Shift' })
    .click();

  // Close Shift
  await page
    .locator('.d-flex.align-items-center.justify-content-center.rounded-3')
    .first()
    .click();

  // Open shift selector
  await page
    .locator('.react-select__input-container')
    .click();

  // Select latest shift dynamically
  const latestShift = page
    .getByRole('option', { name: /SHIFT-\d{8}-/ })
    .last();

  await expect(latestShift).toBeVisible();

  await latestShift.click();

  // Enter actual cash amount
  await page
    .getByRole('spinbutton', {
      name: 'Actual Cash Amount ($)',
    })
    .fill('100');

  // Confirm Close
  await page
    .getByRole('button', { name: 'Confirm Close' })
    .click();

});