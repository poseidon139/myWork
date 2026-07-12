const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'articles');
const outputFile = path.join(__dirname, 'blog-data.json');

// Ensure directory exists
if (!fs.existsSync(articlesDir)) {
    console.log("Creating 'articles' directory...");
    fs.mkdirSync(articlesDir);
}

// Read all HTML files except the template
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html') && f !== 'article-template.html');

const articles = files.map(file => {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    
    // Extract title
    const titleMatch = content.match(/<h1[^>]*title[^>]*>(.*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled';

    // Extract date
    const dateMatch = content.match(/<p[^>]*text-muted[^>]*>([\s\S]*?)&middot;/i);
    const date = dateMatch ? dateMatch[1].trim() : new Date().toLocaleDateString();

    // Extract image (first image inside article-body)
    const imgMatch = content.match(/<div class="article-body"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i) || content.match(/<img[^>]*src="([^"]+)"/i);
    let image = imgMatch ? imgMatch[1] : 'assets/imgs/avatarNew.svg'; // default fallback image
    
    // Fix image path if it starts with ../ since we access from root
    if (image.startsWith('../')) {
        image = image.substring(3);
    }

    // Extract description (first paragraph)
    const descMatch = content.match(/<div class="article-body"[^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/i);
    let description = descMatch ? descMatch[1].replace(/<[^>]*>?/gm, '').trim() : '';
    if (description.length > 150) {
        description = description.substring(0, 147) + '...';
    }

    // Attempt to create a sorting timestamp from the parsed date
    let timestamp = Date.now();
    try {
        const parsedDate = new Date(date).getTime();
        if (!isNaN(parsedDate)) {
            timestamp = parsedDate;
        }
    } catch (e) {
        // Fallback to file creation time if date is unparseable
        const stats = fs.statSync(path.join(articlesDir, file));
        timestamp = stats.birthtimeMs;
    }

    return {
        filename: 'articles/' + file,
        title,
        date,
        image,
        description,
        timestamp
    };
});

// Sort by newest first
articles.sort((a, b) => b.timestamp - a.timestamp);

fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
console.log(`Successfully generated blog-data.json with ${articles.length} articles.`);
