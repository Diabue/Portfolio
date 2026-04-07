import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = 'src/assets';
const files = fs.readdirSync(assetsDir);

console.log('--- Starting Image Optimization ---');

files.forEach(async (file) => {
    if (file.match(/\.(png|jpg|jpeg)$/i) && !file.includes('.webp')) {
        const inputPath = path.join(assetsDir, file);
        const fileName = path.parse(file).name;
        const outputPath = path.join(assetsDir, `${fileName}.webp`);

        try {
            const metadata = await sharp(inputPath).metadata();
            console.log(`Processing ${file} (Original Size: ${Math.round(fs.statSync(inputPath).size / 1024)} KB, Width: ${metadata.width}px)`);

            await sharp(inputPath)
                .resize({ width: 1200, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(outputPath);

            const newSize = fs.statSync(outputPath).size;
            console.log(`✅ Optimized ${file} -> ${fileName}.webp (${Math.round(newSize / 1024)} KB)`);
        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err);
        }
    }
});
