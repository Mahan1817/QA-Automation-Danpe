import { test, expect } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.BASE_URL!;
const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;

test.describe('Login', () => {

  test('should login successfully with valid credentials', async ({ page }) => {

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign in' }).click();

    await page
      .getByRole('textbox', { name: 'Enter email' })
      .fill(email);

    await page
      .getByRole('textbox', { name: 'Enter Password' })
      .fill(password);

    await page
      .getByRole('button', { name: 'Sign In' })
      .click();

    await expect(
      page.getByRole('button', { name: 'Header Avatar' })
    ).toBeVisible();
  });


  test('should not login with invalid credentials', async ({ page }) => {

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign in' }).click();

    await page
      .getByRole('textbox', { name: 'Enter email' })
      .fill('invalid@example.com');

    await page
      .getByRole('textbox', { name: 'Enter Password' })
      .fill('WrongPassword@123');

    await page
      .getByRole('button', { name: 'Sign In' })
      .click();

    await expect(
      page.getByRole('button', { name: 'Sign In' })
    ).toBeVisible();
  });


  test('should show validation when login fields are empty', async ({ page }) => {

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign in' }).click();

    await page
      .getByRole('button', { name: 'Sign In' })
      .click();

    await expect(
      page.getByRole('textbox', { name: 'Enter email' })
    ).toBeVisible();

    await expect(
      page.getByRole('textbox', { name: 'Enter Password' })
    ).toBeVisible();
  });


  test('should logout successfully', async ({ page }) => {

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign in' }).click();

    await page
      .getByRole('textbox', { name: 'Enter email' })
      .fill(email);

    await page
      .getByRole('textbox', { name: 'Enter Password' })
      .fill(password);

    await page
      .getByRole('button', { name: 'Sign In' })
      .click();

    await expect(
      page.getByRole('button', { name: 'Header Avatar' })
    ).toBeVisible();

    await page
      .getByRole('button', { name: 'Header Avatar' })
      .click();

    await page
      .getByRole('menuitem', { name: /Logout/ })
      .click();

    await expect(
      page.getByRole('button', { name: 'Sign In' })
    ).toBeVisible();
  });

});