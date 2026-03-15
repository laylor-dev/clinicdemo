const { execSync } = require('child_process');
const { existsSync, mkdirSync, readdirSync, rmSync } = require('fs');
const path = require('path');

const ffmpegPath = require('ffmpeg-static');
const videoPath = path.join(__dirname, '..', 'newvid.mp4');
const outputDir = path.join(__dirname, '..', 'public', 'frames');

// Clear existing frames
if (existsSync(outputDir)) {
  rmSync(outputDir, { recursive: true });
}
mkdirSync(outputDir, { recursive: true });
console.log('Output dir ready:', outputDir);
console.log('Video:', videoPath);
console.log('FFmpeg:', ffmpegPath);

// Get video info first
console.log('\n--- Video Info ---');
try {
  execSync(`"${ffmpegPath}" -i "${videoPath}"`, { stdio: 'inherit' });
} catch (_) {}

// Extract at 30fps as JPEG quality 85 (good balance of quality vs file size)
// Scale to 1920 wide preserving aspect ratio
console.log('\n--- Extracting frames at 30fps ---');
const outputPattern = path.join(outputDir, 'frame_%04d.jpg');
const cmd = [
  `"${ffmpegPath}"`,
  `-i "${videoPath}"`,
  `-vf "fps=30,scale=1920:-2:flags=lanczos"`,
  `-q:v 3`,
  `"${outputPattern}"`,
  `-y`
].join(' ');

console.log('CMD:', cmd);

try {
  execSync(cmd, { stdio: 'inherit' });
} catch (e) {
  console.error('FFmpeg error (may still have produced frames):', e.message);
}

const frames = readdirSync(outputDir).filter(f => f.endsWith('.jpg'));
console.log(`\n✅ Extracted ${frames.length} frames`);
console.log(`First: ${frames[0]}, Last: ${frames[frames.length - 1]}`);
