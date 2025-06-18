#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { URL } = require('url');

// Import the ImageUrlList
const ImageUrlList = [
    "/assets/images/leaf.webp",
    "https://images.unsplash.com/photo-1738584672976-3518c132482d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1738249034651-1896f689be58?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1738395548716-522475b89043?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1738279494075-5183d2eadc05?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737100522891-e8946ac97fd1?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737917818689-f3b3708de5d7?q=80&w=2163&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736185597807-371cae1c7e4e?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737903071772-4d20348b4d81?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736849544918-6ddb5cfc2c42?q=80&w=2236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737439987404-a3ee9fb95351?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737403428945-c584529b7b17?q=80&w=2279&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1705021246536-aecfad654893?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737496538329-a59d10148a08?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737464604499-ced062ab5958?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737146248923-84e345b51293?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737535614450-ce142f8e2953?q=80&w=2188&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737373463158-0dec3d42035d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737126270020-df9ba1c787a7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737142928492-13e7b0efe912?q=80&w=2188&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736957764199-8b3f7b6c117d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735767976699-6096acda642d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736774635366-c2fa40e86409?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735597821463-05f8cbd08fca?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736267739939-6ee19bbe7fae?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736698854274-121fc17beb06?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736762046814-678901a05bd3?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1731796603747-409787efd360?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734983235410-cbbc5f5fcdaf?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735370229619-db27d5eed8ef?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736386342218-3408ab5fde95?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735899619841-87a370c1171c?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736177843409-73956dc1c810?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736344322157-d70c7e834e83?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736319551652-4378fc7f9502?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736244032196-5d604770aba8?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1736025254639-803df21d0a73?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735749109022-9b51ecf41077?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735931802315-c69b1b12f413?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735627411982-096d12aa4386?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735421094663-6a022f6bbe63?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735431138989-63ed216c2abe?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735174573101-89f986efd912?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734806846669-e2d360e47e32?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734678898743-db75b69eaa63?q=80&w=2226&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1711869090270-02af29df0597?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734386011664-a17cc4ef6755?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1732106450333-5c95a3763d31?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734523085360-ca37b9ff0cdb?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1733345743514-297504c58bd2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734389481041-fa26afc1267c?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Configuration
const CONFIG = {
    outputDir: path.join(__dirname, '..', 'public', 'assets', 'images', 'download'),
    tempDir: path.join(__dirname, '..', 'temp-downloads'),
    maxConcurrentDownloads: 5,
    retryAttempts: 3,
    cwebpParams: {
        quality: 70,
        maxDimension: 1080
    }
};

// Utility functions
const log = (message, type = 'info') => {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`[${timestamp}] ${prefix} ${message}`);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create directories if they don't exist
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log(`Created directory: ${dir}`);
    }
};

// Generate filename from Unsplash URL
const generateFilename = (url, index) => {
    try {
        const urlObj = new URL(url);
        const photoId = urlObj.pathname.split('/').pop();
        return `image-${index.toString().padStart(3, '0')}-${photoId}`;
    } catch (error) {
        return `image-${index.toString().padStart(3, '0')}-${Date.now()}`;
    }
};

// Download a single image with retry logic
const downloadImage = (url, filepath, retries = CONFIG.retryAttempts) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        
        const request = https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(filepath);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                // Handle redirects
                file.close();
                fs.unlinkSync(filepath); // Remove empty file
                return downloadImage(response.headers.location, filepath, retries);
            } else {
                file.close();
                fs.unlinkSync(filepath); // Remove empty file
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
            }
        });

        request.on('error', (err) => {
            file.close();
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath); // Remove empty file
            }
            
            if (retries > 0) {
                log(`Download failed, retrying... (${retries} attempts left)`, 'error');
                setTimeout(() => {
                    downloadImage(url, filepath, retries - 1)
                        .then(resolve)
                        .catch(reject);
                }, 2000); // Wait 2 seconds before retry
            } else {
                reject(err);
            }
        });

        file.on('error', (err) => {
            file.close();
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
            reject(err);
        });
    });
};

// Convert image to WebP using cwebp
const convertToWebP = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        try {
            const command = `cwebp "${inputPath}" -o "${outputPath}" -q ${CONFIG.cwebpParams.quality} -resize ${CONFIG.cwebpParams.maxDimension} 0`;
            log(`Converting: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
            
            execSync(command, { stdio: 'pipe' });
            
            // Verify the output file was created
            if (fs.existsSync(outputPath)) {
                const stats = fs.statSync(outputPath);
                if (stats.size > 0) {
                    resolve(outputPath);
                } else {
                    reject(new Error('Output file is empty'));
                }
            } else {
                reject(new Error('Output file was not created'));
            }
        } catch (error) {
            reject(new Error(`cwebp failed: ${error.message}`));
        }
    });
};

// Process a single image (download and convert)
const processImage = async (url, index, total) => {
    const filename = generateFilename(url, index);
    const tempPath = path.join(CONFIG.tempDir, `${filename}.jpg`);
    const outputPath = path.join(CONFIG.outputDir, `${filename}.webp`);
    
    try {
        log(`[${index + 1}/${total}] Downloading: ${filename}`);
        await downloadImage(url, tempPath);
        
        log(`[${index + 1}/${total}] Converting: ${filename}`);
        await convertToWebP(tempPath, outputPath);
        
        // Clean up temporary file
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
        
        // Get file size for reporting
        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);
        
        log(`[${index + 1}/${total}] ✅ Completed: ${filename}.webp (${sizeKB}KB)`, 'success');
        return { success: true, filename: `${filename}.webp`, size: sizeKB };
        
    } catch (error) {
        log(`[${index + 1}/${total}] ❌ Failed: ${filename} - ${error.message}`, 'error');
        
        // Clean up any remaining files
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
        
        return { success: false, filename, error: error.message };
    }
};

// Process images in batches with concurrency control
const processImagesInBatches = async (urls) => {
    const results = [];
    const total = urls.length;
    
    for (let i = 0; i < urls.length; i += CONFIG.maxConcurrentDownloads) {
        const batch = urls.slice(i, i + CONFIG.maxConcurrentDownloads);
        const batchPromises = batch.map((url, batchIndex) => 
            processImage(url, i + batchIndex, total)
        );
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Small delay between batches to be respectful to servers
        if (i + CONFIG.maxConcurrentDownloads < urls.length) {
            await sleep(1000);
        }
    }
    
    return results;
};

// Verify cwebp is available
const verifyCwebp = () => {
    try {
        execSync('cwebp -version', { stdio: 'pipe' });
        log('✅ cwebp is available');
        return true;
    } catch (error) {
        log('❌ cwebp is not available. Please install WebP tools.', 'error');
        log('Ubuntu/Debian: sudo apt-get install webp', 'error');
        log('macOS: brew install webp', 'error');
        log('Windows: Download from https://developers.google.com/speed/webp/download', 'error');
        return false;
    }
};

// Main execution function
const main = async () => {
    console.log('🚀 Starting Image Optimization Script');
    console.log('=====================================');
    
    // Verify cwebp is available
    if (!verifyCwebp()) {
        process.exit(1);
    }
    
    // Filter remote URLs only
    const remoteUrls = ImageUrlList.filter(url => url.startsWith('https://'));
    log(`Found ${remoteUrls.length} remote images to process`);
    
    if (remoteUrls.length === 0) {
        log('No remote images found to process.', 'error');
        return;
    }
    
    // Setup directories
    ensureDirectoryExists(CONFIG.tempDir);
    ensureDirectoryExists(CONFIG.outputDir);
    
    // Process all images
    const startTime = Date.now();
    log(`Starting processing of ${remoteUrls.length} images...`);
    log(`Configuration: Quality=${CONFIG.cwebpParams.quality}%, Max dimension=${CONFIG.cwebpParams.maxDimension}px`);
    
    const results = await processImagesInBatches(remoteUrls);
    
    // Clean up temp directory
    if (fs.existsSync(CONFIG.tempDir)) {
        fs.rmSync(CONFIG.tempDir, { recursive: true });
    }
    
    // Generate summary report
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    const totalSize = successful.reduce((sum, r) => sum + r.size, 0);
    const avgSize = successful.length > 0 ? Math.round(totalSize / successful.length) : 0;
    const duration = Math.round((Date.now() - startTime) / 1000);
    
    console.log('\n📊 PROCESSING SUMMARY');
    console.log('====================');
    log(`✅ Successful: ${successful.length}/${remoteUrls.length}`);
    log(`❌ Failed: ${failed.length}/${remoteUrls.length}`);
    log(`📦 Total size: ${Math.round(totalSize / 1024)}MB`);
    log(`📏 Average size: ${avgSize}KB`);
    log(`⏱️  Duration: ${duration}s`);
    log(`📁 Output directory: ${CONFIG.outputDir}`);
    
    if (failed.length > 0) {
        console.log('\n❌ FAILED IMAGES:');
        failed.forEach(f => console.log(`   - ${f.filename}: ${f.error}`));
    }
    
    console.log('\n🎉 Image optimization complete!');
};

// Run the script
if (require.main === module) {
    main().catch(error => {
        log(`Script failed: ${error.message}`, 'error');
        process.exit(1);
    });
}

module.exports = { main };