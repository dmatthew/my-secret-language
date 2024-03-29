import { test, expect } from '@playwright/test'

test('should not be able to use the app unless logged in', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  // await page.goto('/')
  // Find an element with the text 'Add new word' and click on it
  // await page.click('text=Add new word')
  // The new url should be "/add-word" (baseURL is used there)
  // await expect(page).toHaveURL('/add-word')
  // The new page should contain an h3 with "Add a new word"
  // await expect(page.locator('h3')).toContainText('Add a new word')

  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/')

  // If not logged in, user should be redirected to login page
  await expect(page).toHaveURL('/login')
})
