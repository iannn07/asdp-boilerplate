import { test, expect } from '@playwright/test'

test.describe('Locale Switcher', () => {
  test('default locale is Indonesian', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Masuk ke akun Anda')).toBeVisible()
  })

  test('switches to English', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'EN' }).click()
    await page.waitForURL(/\/login/)
    await expect(page.getByText('Sign in to your account')).toBeVisible()
  })

  test('persists locale after page reload', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'EN' }).click()
    await page.reload()
    await expect(page.getByText('Sign in to your account')).toBeVisible()
  })
})
