# RestroOrder QA Automation

Playwright + TypeScript automation project for testing the RestroOrder UAT application.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Setup

Install dependencies:

```bash
npm install
npx playwright install

Create a .env file:

BASE_URL=https://uat-cloud.restroorder.com
TEST_EMAIL=your_test_email
TEST_PASSWORD=your_test_password

Test Coverage
Login
Valid login
Invalid credentials
Empty fields
Logout

Registration
Successful registration
Required field validation
Invalid email
Password mismatch

Registration test data is generated dynamically through:
fixtures/testData.ts


Run all tests:

npx playwright test

Run with browser:

npx playwright test --headed

Run a specific test file:

npx playwright test tests/login.spec.ts

Reports

View the Playwright HTML report:

npx playwright show-report

CI/CD

Tests are executed automatically through GitHub Actions on push/pull request.