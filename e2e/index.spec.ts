import { test, expect } from '@playwright/test'

test('should navigate to the Add new word page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')
  // Find an element with the text 'Add new word' and click on it
  await page.click('text=Add new word')
  // The new url should be "/add-word" (baseURL is used there)
  await expect(page).toHaveURL('/add-word')
  // The new page should contain an h1 with "About Page"
  await expect(page.locator('h3')).toContainText('Add a new word')
})
