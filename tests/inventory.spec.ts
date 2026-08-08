import { test, expect } from '@playwright/test';

test('User should be able to create, update and delete an inventory category', async ({
  page,
}) => {
  const categoryName = `Coca Cola ${Date.now()}`;
  const initialDescription = 'coke';
  const updatedDescription = 'coke cola';

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

  // Verify successful login
  await expect(
    page.getByRole('button', { name: 'Header Avatar' })
  ).toBeVisible();

  // =========================
  // INVENTORY → CATEGORY LIST
  // =========================

  await page.getByRole('link', { name: /Inventory/ }).click();

  await page.getByRole('link', { name: 'Category List' }).click();

  // =========================
  // CREATE CATEGORY
  // =========================

  await page.getByRole('button', { name: /Add/ }).click();

  await page
    .getByRole('textbox', { name: 'Name: *' })
    .fill(categoryName);

  await page
    .getByRole('textbox', { name: 'Description:' })
    .fill(initialDescription);

  // Select Cost Center
  await page
    .locator(
      '#costCenterId > .css-13cymwt-control > .css-hlgwow > .css-19bb58m'
    )
    .click();

  await page.getByRole('option', { name: 'BillPrinter' }).click();

  await page.getByRole('button', { name: 'Save' }).click();

  // Verify category was created
  await expect(
    page.getByText(categoryName, { exact: true })
  ).toBeVisible();

  // =========================
  // UPDATE CATEGORY
  // =========================

  const categoryText = page.getByText(categoryName, {
    exact: true,
  });

  await expect(categoryText).toBeVisible();

  // Find the row containing our category
  const categoryRow = categoryText.locator('xpath=ancestor::*[self::tr or @role="row"]').first();

  await categoryRow.getByTitle('Edit').click();

  await page
    .getByRole('textbox', { name: 'Description:' })
    .fill(updatedDescription);

  await page.getByRole('button', { name: 'Save' }).click();

  // Verify update
  await expect(
    page.getByText(categoryName, { exact: true })
  ).toBeVisible();

  // =========================
  // DELETE CATEGORY
  // =========================

  const updatedCategoryText = page.getByText(categoryName, {
    exact: true,
  });

  const updatedCategoryRow = updatedCategoryText
    .locator('xpath=ancestor::*[self::tr or @role="row"]')
    .first();

  await updatedCategoryRow.getByTitle('Delete').click();

  // Confirm deletion
  await expect(
    page.getByRole('button', { name: 'Yes, Delete It!' })
  ).toBeVisible();

  await page
    .getByRole('button', { name: 'Yes, Delete It!' })
    .click();

  // Verify deletion
  await expect(
    page.getByText(categoryName, { exact: true })
  ).not.toBeVisible();
});