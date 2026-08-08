import { test, expect } from '@playwright/test';

test('User should be able to open and close a shift', async ({ page }) => {
  // =========================
  // LOGIN
  // =========================

  await page.goto('/');

  await page.getByRole('link', { name: 'Sign in' }).click();

  await page
    .getByRole('textbox', { name: 'Enter email' })
    .fill(process.env.TEST_EMAIL!);

  await page
    .getByRole('textbox', { name: 'Enter Password' })
    .fill(process.env.TEST_PASSWORD!);

  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for dashboard
  await page.waitForLoadState('networkidle');

  // =========================
  // OPEN SHIFT
  // =========================

  const shiftControl = page
    .locator('.d-flex.align-items-center.justify-content-center.rounded-3')
    .first();

  await shiftControl.waitFor({
    state: 'visible',
    timeout: 15000,
  });

  await shiftControl.click();

  // Opening cash amount
  const openingCash = page.getByRole('spinbutton', {
    name: 'Opening Cash Amount ($)',
  });

  await openingCash.waitFor({
    state: 'visible',
    timeout: 15000,
  });

  await openingCash.fill('1000');

  // Confirm Open Shift
  const openShiftButton = page
    .getByRole('dialog')
    .getByRole('button', {
      name: 'Open Shift',
      exact: true,
    });

  await openShiftButton.click();

  // Verify the dialog closed
  await expect(openingCash).not.toBeVisible({
    timeout: 10000,
  });

  // =========================
  // CLOSE SHIFT
  // =========================

  await page.waitForTimeout(1000);

  // Open shift management again
  await shiftControl.click();

  // Open shift selector
  const shiftSelector = page.locator(
    '.react-select__input-container'
  );

  await shiftSelector.click();

  // Select the latest/current shift dynamically
  const currentShift = page.getByRole('option', {
    name: /SHIFT-\d{8}-/,
  }).last();

  await currentShift.click();

  // Actual cash amount
  const actualCash = page.getByRole('spinbutton', {
    name: 'Actual Cash Amount ($)',
  });

  await actualCash.fill('100');

  // Confirm close
  await page
    .getByRole('button', {
      name: 'Confirm Close',
      exact: true,
    })
    .click();

  // =========================
  // VERIFY
  // =========================

  await expect(
    page.getByRole('button', {
      name: 'Confirm Close',
      exact: true,
    })
  ).not.toBeVisible({
    timeout: 10000,
  });
});