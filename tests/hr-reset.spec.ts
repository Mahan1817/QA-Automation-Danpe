import { test, expect } from '@playwright/test';

test('User should be able to reset staff password', async ({ page }) => {

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

  // Verify login
  await expect(
    page.getByRole('button', { name: 'Header Avatar' })
  ).toBeVisible();

  // =========================
  // HR & USERS → STAFFS
  // =========================

  await page.getByRole('link', { name: /HR & Users/ }).click();

  await page.getByRole('link', { name: 'Staffs' }).click();

  // =========================
  // RESET PASSWORD
  // =========================

  await page.getByRole('button', { name: 'Reset' }).click();

  await expect(
    page.getByRole('textbox', { name: 'Enter Password' })
  ).toBeVisible();

  await page
    .getByRole('textbox', { name: 'Enter Password' })
    .fill('Test@123');

  await page
    .getByRole('textbox', { name: 'Confirm Password' })
    .fill('Test@123');

  await page
    .getByRole('button', { name: 'Reset Password' })
    .click();

  // =========================
  // VERIFY
  // =========================

  // Give the application a moment to process the reset
  await expect(
    page.getByRole('button', { name: 'Reset' })
  ).toBeVisible();
});