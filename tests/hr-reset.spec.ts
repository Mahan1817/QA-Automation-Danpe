import { test, expect } from '@playwright/test';

test('Admin should be able to reset staff password', async ({ page }) => {
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

  await page.getByRole('button', {
    name: 'Sign In',
    exact: true,
  }).click();

  // =========================
  // HR & USERS
  // =========================

  await page.getByRole('link', {
    name: /HR & Users/,
  }).click();

  await page.getByRole('link', {
    name: 'Staffs',
    exact: true,
  }).click();

  // =========================
  // RESET PASSWORD
  // =========================

  // Exact Reset button to avoid matching "Reset Password"
  const resetButton = page.getByRole('button', {
    name: 'Reset',
    exact: true,
  });

  await expect(resetButton).toBeVisible();

  await resetButton.click();

  // =========================
  // ENTER NEW PASSWORD
  // =========================

  const newPassword = page.getByRole('textbox', {
    name: 'Enter Password',
    exact: true,
  });

  const confirmPassword = page.getByRole('textbox', {
    name: 'Confirm Password',
    exact: true,
  });

  await expect(newPassword).toBeVisible();
  await expect(confirmPassword).toBeVisible();

  await newPassword.fill('Test@123');

  await confirmPassword.fill('Test@123');

  // =========================
  // SUBMIT
  // =========================

  const resetPasswordButton = page.getByRole('button', {
    name: 'Reset Password',
    exact: true,
  });

  await expect(resetPasswordButton).toBeVisible();
  await expect(resetPasswordButton).toBeEnabled();

  await resetPasswordButton.click();

  // =========================
  // VERIFY SUCCESS
  // =========================

  // Wait for the reset operation to complete
  await page.waitForTimeout(1000);

  // The Reset Password form should disappear after successful reset
  await expect(
    page.getByRole('button', {
      name: 'Reset Password',
      exact: true,
    })
  ).not.toBeVisible({
    timeout: 10000,
  });

  // Staff list should be visible again
  await expect(
    page.getByRole('button', {
      name: 'Reset',
      exact: true,
    })
  ).toBeVisible({
    timeout: 10000,
  });
});