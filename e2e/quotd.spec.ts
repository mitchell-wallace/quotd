import { expect, Locator, test } from '@playwright/test';

async function getFontFamily(locator: Locator) {
  return locator.evaluate((element) => window.getComputedStyle(element as HTMLElement).fontFamily);
}

async function getFontSize(locator: Locator) {
  return locator.evaluate((element) =>
    parseFloat(window.getComputedStyle(element as HTMLElement).fontSize),
  );
}

async function getTrimmedText(locator: Locator) {
  return locator.textContent().then((value) => value?.trim() ?? '');
}

test.describe('Navigation', () => {
  test('navigates between home and app via header links', async ({ page }) => {
    await page.goto('/');
    const welcomeHeading = page.getByTestId('welcome-heading');
    await expect(welcomeHeading).toBeVisible();

    await page.getByTestId('header-link-app').click();
    await expect(page).toHaveURL(/\/app$/);
    await expect(page.getByTestId('quote-controls')).toBeVisible();

    await page.getByTestId('header-link-home').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(welcomeHeading).toBeVisible();
  });
});

test.describe('Quote customisation controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
    await expect(page.getByTestId('quote-text')).toBeVisible();
  });

  test('cycles fonts forwards and backwards', async ({ page }) => {
    const quoteText = page.getByTestId('quote-text');
    const nextFontButton = page.getByTestId('font-control-next');
    const prevFontButton = page.getByTestId('font-control-prev');
    const initialFont = await getFontFamily(quoteText);

    await nextFontButton.click();
    await expect.poll(async () => getFontFamily(quoteText)).not.toBe(initialFont);
    const updatedFont = await getFontFamily(quoteText);
    expect(updatedFont).not.toBe(initialFont);

    await prevFontButton.click();
    await expect.poll(async () => getFontFamily(quoteText)).toBe(initialFont);
  });

  test('adjusts font size within limits', async ({ page }) => {
    const quoteText = page.getByTestId('quote-text');
    const nextSizeButton = page.getByTestId('font-size-control-next');
    const prevSizeButton = page.getByTestId('font-size-control-prev');
    const initialSize = await getFontSize(quoteText);

    await nextSizeButton.click();
    await expect.poll(async () => getFontSize(quoteText)).toBeGreaterThan(initialSize);
    const increasedSize = await getFontSize(quoteText);
    expect(increasedSize).toBeGreaterThan(initialSize);

    await prevSizeButton.click();
    await expect.poll(async () => getFontSize(quoteText)).toBeLessThanOrEqual(increasedSize);
    await expect.poll(async () => {
      const current = await getFontSize(quoteText);
      return Math.abs(current - initialSize);
    }).toBeLessThan(0.5);
  });

  test('cycles through available quotes forwards and backwards', async ({ page }) => {
    const quoteText = page.getByTestId('quote-text');
    const nextWordsButton = page.getByTestId('words-control-next');
    const prevWordsButton = page.getByTestId('words-control-prev');
    const initialQuote = await getTrimmedText(quoteText);

    await nextWordsButton.click();
    await expect.poll(async () => getTrimmedText(quoteText)).not.toBe(initialQuote);
    const updatedQuote = await getTrimmedText(quoteText);
    expect(updatedQuote).not.toBe(initialQuote);

    await prevWordsButton.click();
    await expect.poll(async () => getTrimmedText(quoteText)).toBe(initialQuote);
  });

  test('cycles through background images forwards and backwards', async ({ page }) => {
    const image = page.getByTestId('quote-image');
    const nextImageButton = page.getByTestId('image-control-next');
    const prevImageButton = page.getByTestId('image-control-prev');
    const initialSrc = await image.getAttribute('src');

    await nextImageButton.click();
    await expect.poll(async () => image.getAttribute('src')).not.toBe(initialSrc);
    const updatedSrc = await image.getAttribute('src');
    expect(updatedSrc).not.toBe(initialSrc);

    await prevImageButton.click();
    await expect.poll(async () => image.getAttribute('src')).toBe(initialSrc);
  });

  test('downloads the composed quote as a PNG', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('download-quote-button').click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/quote-\d+\.png$/);
    const stream = await download.createReadStream();
    if (stream) {
      stream.destroy();
    } else {
      const downloadPath = await download.path();
      expect(downloadPath).not.toBeNull();
    }
  });
});
