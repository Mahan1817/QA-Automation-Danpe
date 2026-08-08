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

Authentication

Valid login
Invalid credentials
Empty field validation
Logout

Registration
Required field validation
Invalid email
Password mismatch

Dashboard
Open shift
Close shift
Opening cash validation
Closing cash validation

Inventory
Category creation
Category editing
Category deletion

HR & Users
Staff password reset
Test Data

Registration test data is generated dynamically through:

fixtures/testData.ts

Environment Variables

Sensitive credentials are stored in .env and are not committed to GitHub.

Make sure .env is included in .gitignore.

Run Tests

Run all tests:

npx playwright test

Run with browser:

npx playwright test --headed

Run a specific test:

npx playwright test tests/login.spec.ts

Reports

Generate the Playwright HTML report:

npx playwright show-report

Screenshots, traces, and videos are configured to be captured for failed tests.

CI/CD

GitHub Actions automatically runs the Playwright test suite on:

Push to main
Pull requests to main


The workflow:

Installs Node.js and dependencies
Installs Playwright browsers
Runs automated tests
Generates the Playwright report
Uploads the test report as a GitHub Actions artifact