import { test, expect } from '@playwright/test'

test.describe('Auth Guard', () => {
  test('redirects unauthenticated user from /dashboard to /login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
    await expect(page.url()).toContain('callbackUrl=%2Fdashboard')
  })

  test('renders login form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  test('shows validation error on empty form submit', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page.getByText(/email is required/i)).toBeVisible()
  })
})
