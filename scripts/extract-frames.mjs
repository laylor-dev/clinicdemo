import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ffmpegPath from 'ffmpeg-static';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const videoPath = join(projectRoot, 'watermark_removed_6987aede-446e-4a2f-a8c5-3cfe08460d1a.mp4');
const outputDir = join(projectRoot, 'public', 'frames');

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory: ${outputDir}`);
}

console.log('FFmpeg path:', ffmpegPath);
console.log('Video path:', videoPath);
console.log('Output dir:', outputDir);

// First get video info
console.log('\nGetting video info...');
try {
  const info = execSync(`"${ffmpegPath}" -i "${videoPath}" 2>&1`, { encoding: 'utf8' });
  console.log(info);
} catch (e) {
  // ffmpeg outputs to stderr, so we catch and print
  console.log(e.stdout || e.message);
}

// Extract frames at 30fps as WebP for optimal performance
// We cap at 30fps since screens are typically 60Hz but we only need half-rate for smooth scrubbing
console.log('\nExtracting frames at 30fps as WebP...');
const cmd = `"${ffmpegPath}" -i "${videoPath}" -vf "fps=30,scale=1920:-1" -q:v 80 "${outputDir}/frame_%04d.webp" -y`;
console.log('Running:', cmd);

try {
  execSync(cmd, { encoding: 'utf8', stdio: 'inherit' });
  console.log('\nFrames extracted successfully!');
  
  // Count frames
  const { readdirSync } = await import('fs');
  const frames = readdirSync(outputDir).filter(f => f.endsWith('.webp'));
  console.log(`Total frames: ${frames.length}`);
  console.log(`Scroll distance needed: ~${frames.length * 20}px (${frames.length} frames × 20px per frame)`);
} catch (e) {
  console.error('Extraction failed:', e.message);
}
