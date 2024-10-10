import { test, expect } from 'playwright-test-coverage';

test('home page', async({ page }) => {
    await page.goto('/');
    expect(await page.title()).toBe('JWT Pizza');
});

test('register', async( {page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').fill('ImA Test');
  await page.getByPlaceholder('Full name').press('Tab');
  await page.getByPlaceholder('Email address').fill('ima@test.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('ajsldkfjlsdkflajksdflsdkfalsjfdlkja');
  await expect(page.getByRole('heading')).toContainText('Welcome to the party');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
  await expect(page.locator('.w-screen')).toBeVisible();
  await expect(page.getByRole('link', { name: 'IT' })).toBeVisible();
  await page.getByRole('link', { name: 'IT' }).click();
  await expect(page.getByRole('main')).toContainText('ImA Test');
  await expect(page.getByRole('main')).toContainText('ima@test.com');
  await expect(page.getByRole('main')).toContainText('diner');
  await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
});