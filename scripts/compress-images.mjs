import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const srcDir = path.resolve('public/assets/thethingswechoose');
const destDir = path.resolve('public/assets/swipe');

async function main() {
    await sharp(path.join(srcDir, '6.png'))
        .resize(1000)
        .webp({ quality: 75 })
        .toFile(path.join(destDir, '1.webp'));
        
    await sharp(path.join(srcDir, '7.png'))
        .resize(1000)
        .webp({ quality: 75 })
        .toFile(path.join(destDir, '2.webp'));
        
    console.log('Images compressed successfully.');
}

main().catch(console.error);
