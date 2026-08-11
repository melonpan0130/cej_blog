import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.resolve(__dirname, '../public/posts');
const outputFile = path.resolve(__dirname, '../src/posts.json');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push({ filePath, stat });
    }
  }
  return results;
}

try {
  const files = getFiles(postsDir);
  const posts = [];

  for (const { filePath, stat } of files) {
    const relativePath = path.relative(postsDir, filePath).replace(/\\/g, '/');
    const category = path.dirname(relativePath);
    const fileName = path.basename(relativePath, '.html');
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let title = fileName;
    
    // Parse title from the first line matching class="title" or class='title'
    if (lines.length > 0) {
      const firstLine = lines[0];
      const titleMatch = firstLine.match(/class=['"]title['"][^>]*>([^<]+)<\//i);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].trim();
      }
    }

    // Parse description: strip HTML tags, take first 160 chars (SEO best practice)
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const description = textContent.length > 160 ? textContent.slice(0, 157) + '...' : textContent;

    // Format date: YYYY/M/D HH:mm
    // Use birthtime (creation time) if available, otherwise fallback to mtime
    const d = stat.birthtime || stat.mtime;
    const dateStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    posts.push({
      fileName,
      title,
      description: description || title,
      date: dateStr,
      category: category === '.' ? '' : category
    });
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(outputFile, JSON.stringify({ posts }, null, 2));
  console.log(`Generated ${posts.length} posts to src/posts.json`);
} catch (error) {
  console.error('Error generating posts:', error);
}
