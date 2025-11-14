import { FontDefinitions } from '../../data/FontDefinitions';

// Helper function to load an image and return a promise that resolves when the image is loaded
export const loadImageByUrl = (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
};

// Helper function to load a font and return a promise that resolves when the font is loaded
export const loadFontByIndex = (fontIndex: number): Promise<void> => {
  return new Promise((resolve) => {
    const hiddenElement = document.createElement('span');
    Object.assign(hiddenElement.style, {
      fontFamily: `"${FontDefinitions[fontIndex].fontName}"`,
      visibility: 'hidden',
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '0px',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      maxWidth: 0,
      maxHeight: 0,
    });
    hiddenElement.textContent = '\u00A0';
    document.body.appendChild(hiddenElement);

    document.fonts.ready.then(() => {
      const checkFontLoaded = () => {
        if (document.fonts.check(`1em "${FontDefinitions[fontIndex].fontName}"`)) {
          hiddenElement.remove();
          resolve();
          return true;
        }
        return false;
      };
      const isLoadedPreviously = checkFontLoaded();

      if (!isLoadedPreviously) {
        document.fonts.load(`1em "${FontDefinitions[fontIndex].fontName}"`);
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            resolve();
          }, 100);
          if (checkFontLoaded()) {
            break;
          }
        }
        hiddenElement.remove();
      }
    });
  });
};
