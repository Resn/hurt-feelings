const fs = require('fs');
const path = require('path');

const ASSET_TYPES = {
  IMAGES: 'images',
  CSS: 'css',
  JS: 'js'
};

const PATHS = {
  EXPORT_DIR: 'webflow-export',
  WEBFLOW_DIR: 'public/webflow',
  ASSETS: 'assets'
};

const HTML_REPLACE = [
  {
    pattern: /src="images\//g,
    replacement: 'src="/webflow/assets/images/'
  },
  {
    pattern: /href="css\//g,
    replacement: 'href="/webflow/assets/css/'
  },
  {
    pattern: /src="js\//g,
    replacement: 'src="/webflow/assets/js/'
  },
  {
    pattern: /<script async="" src="https:\/\/hurt-feelings\.netlify\.app\/bundle\.js"><\/script>/,
    replacement: '<script type="module" src="/src/main.js"></script>'
  },
  {
    pattern: /href="([^"]+)\.html"/g,
    replacer: (match, p1) => p1 === 'index' ? 'href="/"' : `href="/${p1}"`
  }
];

/**
 * Creates the necessary directories for Webflow assets.
 */
function createRequiredDirectories() {
  const assetDirs = [
    PATHS.WEBFLOW_DIR,
    path.join(PATHS.WEBFLOW_DIR, PATHS.ASSETS),
    ...Object.values(ASSET_TYPES).map(type =>
        path.join(PATHS.WEBFLOW_DIR, PATHS.ASSETS, type)
    )
  ];

  assetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

/**
 * Copies assets from the export directory to the Webflow assets directory.
 */
function copyAssets() {
  Object.values(ASSET_TYPES).forEach(assetType => {
    const sourcePath = path.join(PATHS.EXPORT_DIR, assetType);
    if (fs.existsSync(sourcePath)) {
      fs.cpSync(
          sourcePath,
          path.join(PATHS.WEBFLOW_DIR, PATHS.ASSETS, assetType),
          { recursive: true }
      );
    }
  });
}

/**
 * Handle the srcset attribute rewrite
 * @param srcset
 * @returns {string}
 */
function replaceSrcSet(srcset) {
  const sources = srcset.split(',').map(source => {
    const [imagePath, size] = source.trim().split(' ');
    if (imagePath.startsWith('images/')) {
      return `/webflow/assets/images/${imagePath.substring(7)} ${size || ''}`.trim();
    }
    return source.trim();
  });
  return `srcset="${sources.join(', ')}"`;
}

/**
 * Processes the HTML content by applying our html replacements
 * @param html
 * @returns {*}
 */
function processHtmlContent(html) {
  let processedHtml = html;

  HTML_REPLACE.forEach(({ pattern, replacement, replacer }) => {
    processedHtml = processedHtml.replace(pattern, replacer || replacement);
  });

  return processedHtml.replace(/srcset="([^"]+)"/g, (match, srcset) => replaceSrcSet(srcset));
}

/**
 * Saves the processed HTML content to the Webflow directory.
 * @param filename
 * @param html
 */
function writeWebflowDir(filename, html) {
  const outputFilename = filename === 'index.html'
      ? 'index.html'
      : `${path.basename(filename, '.html')}/index.html`;

  const outputPath = path.join(PATHS.WEBFLOW_DIR, outputFilename);

  if (filename !== 'index.html') {
    const dirPath = path.join(PATHS.WEBFLOW_DIR, path.basename(filename, '.html'));
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  fs.writeFileSync(outputPath, html);
  console.log(`Processed: ${filename} -> ${outputPath}`);
}

/**
 *
 * @param filename
 */
function processHtmlFile(filename) {
  const htmlPath = path.join(PATHS.EXPORT_DIR, filename);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const processedHtml = processHtmlContent(html);
  writeWebflowDir(filename, processedHtml);
}

function importWebflowExport() {
  try {

    const htmlFiles = fs.readdirSync(PATHS.EXPORT_DIR)
        .filter(file => file.endsWith('.html'));

    if (htmlFiles.length === 0) {
      console.warn(`No HTML files found in ${PATHS.EXPORT_DIR} directory.`);
      console.error(`Make sure you have exported your Webflow site and placed the files in the ${PATHS.EXPORT_DIR} directory`);

      return;
    }

    createRequiredDirectories();
    copyAssets();

    htmlFiles.forEach(processHtmlFile);
    console.log('Successfully processed all Webflow export files!');
  } catch (error) {
    console.error('Error processing Webflow export:', error);
    console.error(`Make sure you have exported your Webflow site and placed the files in the ${PATHS.EXPORT_DIR} directory`);
  }
}
importWebflowExport();