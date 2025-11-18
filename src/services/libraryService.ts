import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

const LIBRARY_FOLDER = 'quotd-library';
const METADATA_FILE = 'library-metadata.json';

export interface SavedImage {
  id: string;
  fileName: string;
  timestamp: number;
  uri: string;
}

/**
 * Ensures the library folder exists
 */
async function ensureLibraryFolder(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    await Filesystem.mkdir({
      path: LIBRARY_FOLDER,
      directory: Directory.Data,
      recursive: false,
    });
  } catch (error) {
    // Folder already exists, ignore error
    console.log('Library folder already exists');
  }
}

/**
 * Reads the metadata file containing all saved images
 */
async function readMetadata(): Promise<SavedImage[]> {
  if (!Capacitor.isNativePlatform()) {
    return [];
  }

  try {
    const result = await Filesystem.readFile({
      path: `${LIBRARY_FOLDER}/${METADATA_FILE}`,
      directory: Directory.Data,
      encoding: undefined, // Read as base64
    });

    const jsonString = atob(result.data as string);
    return JSON.parse(jsonString);
  } catch (error) {
    // Metadata file doesn't exist yet
    return [];
  }
}

/**
 * Writes the metadata file with all saved images
 */
async function writeMetadata(images: SavedImage[]): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  const jsonString = JSON.stringify(images, null, 2);
  const base64Data = btoa(jsonString);

  await Filesystem.writeFile({
    path: `${LIBRARY_FOLDER}/${METADATA_FILE}`,
    data: base64Data,
    directory: Directory.Data,
  });
}

/**
 * Saves an image to the library
 * @param base64Data - Base64 encoded image data (without data URL prefix)
 * @returns The saved image metadata
 */
export async function saveToLibrary(base64Data: string): Promise<SavedImage> {
  await ensureLibraryFolder();

  const timestamp = new Date().getTime();
  const fileName = `quote-${timestamp}.png`;
  const id = `${timestamp}`;

  // Save the image file
  const savedFile = await Filesystem.writeFile({
    path: `${LIBRARY_FOLDER}/${fileName}`,
    data: base64Data,
    directory: Directory.Data,
  });

  console.log('File saved to library:', savedFile.uri);

  // Update metadata
  const metadata = await readMetadata();
  const newImage: SavedImage = {
    id,
    fileName,
    timestamp,
    uri: savedFile.uri,
  };
  metadata.unshift(newImage); // Add to beginning (most recent first)
  await writeMetadata(metadata);

  return newImage;
}

/**
 * Lists all saved images in the library
 * @returns Array of saved images, sorted by most recent first
 */
export async function listLibraryImages(): Promise<SavedImage[]> {
  if (!Capacitor.isNativePlatform()) {
    return [];
  }

  return await readMetadata();
}

/**
 * Gets the full data URL for a saved image
 * @param image - The saved image metadata
 * @returns Data URL for the image
 */
export async function getImageDataUrl(image: SavedImage): Promise<string> {
  if (!Capacitor.isNativePlatform()) {
    throw new Error('Library only available on native platforms');
  }

  const result = await Filesystem.readFile({
    path: `${LIBRARY_FOLDER}/${image.fileName}`,
    directory: Directory.Data,
  });

  return `data:image/png;base64,${result.data}`;
}

/**
 * Deletes an image from the library
 * @param imageId - The ID of the image to delete
 */
export async function deleteFromLibrary(imageId: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  const metadata = await readMetadata();
  const image = metadata.find((img) => img.id === imageId);

  if (!image) {
    throw new Error('Image not found');
  }

  // Delete the image file
  await Filesystem.deleteFile({
    path: `${LIBRARY_FOLDER}/${image.fileName}`,
    directory: Directory.Data,
  });

  // Update metadata
  const updatedMetadata = metadata.filter((img) => img.id !== imageId);
  await writeMetadata(updatedMetadata);

  console.log('Deleted image from library:', image.fileName);
}

/**
 * Gets the URI for a saved image (for sharing/opening in other apps)
 * @param image - The saved image metadata
 * @returns URI that can be used with native share/file APIs
 */
export function getImageUri(image: SavedImage): string {
  return image.uri;
}
