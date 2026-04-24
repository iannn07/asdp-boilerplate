import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test('switches from light to dark mode', async ({ page }) => {
    await page.goto('/login')
    const html = page.locator('html')

    await expect(html).not.toHaveClass(/dark/)
    await page.getByRole('button', { name: /toggle theme/i }).click()
    await expect(html).toHaveClass(/dark/)
  })

  test('persists theme across page reload', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /toggle theme/i }).click()
    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
