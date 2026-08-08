import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { generateRegistrationData } from '../fixtures/testData';

const baseURL = process.env.BASE_URL!;

test.describe('Registration', () => {

  test('should register a new organization successfully', async ({ page }) => {

    const data = generateRegistrationData();

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign Up' }).click();

    await page
      .getByRole('textbox', { name: 'Enter organization name' })
      .fill(data.organizationName);

    await page
      .getByRole('textbox', { name: 'Enter email address' })
      .fill(data.email);

    await page
      .getByRole('textbox', { name: 'Enter address' })
      .fill(data.address);

    await page
      .getByRole('textbox', { name: 'Enter PAN number' })
      .fill(data.panNumber);

    await page
      .getByRole('textbox', { name: 'Enter telephone number' })
      .fill(data.telephone);

    await page
      .locator('#react-select-2-placeholder')
      .click();

    await page
      .getByRole('option', { name: 'Restaurant' })
      .click();

    await page
      .getByRole('textbox', { name: 'Enter password' })
      .fill(data.password);

    await page
      .getByRole('textbox', { name: 'Confirm password' })
      .fill(data.password);

    await page
      .getByRole('button', { name: 'Register' })
      .click();

    await page.waitForLoadState('networkidle');

    console.log(`Registered email: ${data.email}`);
    console.log(`Organization: ${data.organizationName}`);
  });


  test('should not submit registration with empty required fields', async ({ page }) => {

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign Up' }).click();

    await page
      .getByRole('button', { name: 'Register' })
      .click();

    await expect(
      page.getByRole('textbox', { name: 'Enter organization name' })
    ).toBeVisible();
  });


  test('should reject invalid email address', async ({ page }) => {

    const data = generateRegistrationData();

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign Up' }).click();

    await page
      .getByRole('textbox', { name: 'Enter organization name' })
      .fill(data.organizationName);

    await page
      .getByRole('textbox', { name: 'Enter email address' })
      .fill('invalid-email');

    await page
      .getByRole('textbox', { name: 'Enter address' })
      .fill(data.address);

    await page
      .getByRole('textbox', { name: 'Enter PAN number' })
      .fill(data.panNumber);

    await page
      .getByRole('textbox', { name: 'Enter telephone number' })
      .fill(data.telephone);

    await page
      .locator('#react-select-2-placeholder')
      .click();

    await page
      .getByRole('option', { name: 'Restaurant' })
      .click();

    await page
      .getByRole('textbox', { name: 'Enter password' })
      .fill(data.password);

    await page
      .getByRole('textbox', { name: 'Confirm password' })
      .fill(data.password);

    await page
      .getByRole('button', { name: 'Register' })
      .click();

    await expect(
      page.getByRole('textbox', { name: 'Enter email address' })
    ).toBeVisible();
  });


  test('should reject mismatched passwords', async ({ page }) => {

    const data = generateRegistrationData();

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Sign Up' }).click();

    await page
      .getByRole('textbox', { name: 'Enter organization name' })
      .fill(data.organizationName);

    await page
      .getByRole('textbox', { name: 'Enter email address' })
      .fill(data.email);

    await page
      .getByRole('textbox', { name: 'Enter address' })
      .fill(data.address);

    await page
      .getByRole('textbox', { name: 'Enter PAN number' })
      .fill(data.panNumber);

    await page
      .getByRole('textbox', { name: 'Enter telephone number' })
      .fill(data.telephone);

    await page
      .locator('#react-select-2-placeholder')
      .click();

    await page
      .getByRole('option', { name: 'Restaurant' })
      .click();

    await page
      .getByRole('textbox', { name: 'Enter password' })
      .fill(data.password);

    await page
      .getByRole('textbox', { name: 'Confirm password' })
      .fill('Different@123');

    await page
      .getByRole('button', { name: 'Register' })
      .click();

    await expect(
      page.getByRole('textbox', { name: 'Confirm password' })
    ).toBeVisible();
  });

});