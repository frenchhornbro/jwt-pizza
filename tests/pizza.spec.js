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

test('buy pizza with register', async({ page }) => {
    await page.goto('/');
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page.getByRole('heading')).toContainText('Welcome to the party');
    await page.getByPlaceholder('Full name').click();
    await page.getByPlaceholder('Full name').fill('My Full Name');
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('myEmailAddress@test.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('abcdefg');
    await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click({
      button: 'right'
    });
    await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByRole('link', { name: 'MN' }).click();
    await expect(page.getByRole('main')).toContainText('My Full Name');
    await page.getByText('myEmailAddress@test.com').click();
    await expect(page.getByRole('main')).toContainText('myEmailAddress@test.com');
    await expect(page.getByRole('main')).toContainText('diner');
    await page.getByRole('link', { name: 'Buy one' }).click();
    await page.getByRole('combobox').selectOption('2');
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await page.getByRole('link', { name: 'Image Description Crusty A' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.locator('tfoot')).toContainText('2 pies');
    await expect(page.locator('tfoot')).toContainText('0.007 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();
    await expect(page.getByRole('main')).toContainText('2');
    await expect(page.getByRole('main')).toContainText('0.007 ₿');
    await page.getByRole('button', { name: 'Verify' }).click();
    await expect(page.locator('h3')).toContainText('JWT Pizza - valid');
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
});

test('login', async({ page }) => {
  //TODO: Figure out how to login
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'KC' }).click();
  await expect(page.getByRole('main')).toContainText('Kai Chen');
  await expect(page.getByRole('main')).toContainText('d@jwt.com');
  await expect(page.getByRole('main')).toContainText('diner');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
});