import { test, expect } from '@playwright/test';

test('User should be able to create, update and delete a customer', async ({
  page,
}) => {
  const firstName = `Mahan${Date.now()}`;
  const lastName = 'Khanal';
  const email = `mahan${Date.now()}@gmail.com`;

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
  // CRM → CUSTOMERS
  // =========================

  await page.getByRole('link', { name: /CRM/ }).click();

  await page.getByRole('link', { name: 'Customers' }).click();

  // =========================
  // CREATE CUSTOMER
  // =========================

  await page.getByRole('button', { name: /Add Customer/ }).click();

  await page
    .getByRole('textbox', { name: 'First Name' })
    .fill(firstName);

  await page
    .getByRole('textbox', { name: 'Last Name' })
    .fill(lastName);

  await page
    .getByRole('textbox', { name: 'Enter email' })
    .fill(email);

  // Create
  await page.getByRole('button', { name: 'Create' }).click();

  // Verify customer was created
  await expect(
    page.getByText(firstName, { exact: true })
  ).toBeVisible();

  // =========================
  // UPDATE CUSTOMER
  // =========================

  const customer = page.getByText(firstName, {
    exact: true,
  });

  const customerRow = customer
    .locator('xpath=ancestor::*[self::tr or @role="row"]')
    .first();

  await customerRow.getByTitle('Edit').click();

  // Change last name
  await page
    .getByRole('textbox', { name: 'Last Name' })
    .fill('Updated');

  // Use the actual button name after inspecting Codegen.
  // If the button is "Update", use:
  await page.getByRole('button', { name: /Update|Save/ }).click();

  // Verify updated customer
  await expect(
    page.getByText(firstName, { exact: true })
  ).toBeVisible();

  // =========================
  // DELETE CUSTOMER
  // =========================

  const updatedCustomer = page.getByText(firstName, {
    exact: true,
  });

  const updatedRow = updatedCustomer
    .locator('xpath=ancestor::*[self::tr or @role="row"]')
    .first();

  await updatedRow.getByTitle('Delete').click();

  // Confirmation
  await expect(
    page.getByRole('button', { name: /Yes, Delete It!/ })
  ).toBeVisible();

  await page
    .getByRole('button', { name: /Yes, Delete It!/ })
    .click();

  // Verify deletion
  await expect(
    page.getByText(firstName, { exact: true })
  ).not.toBeVisible();
});