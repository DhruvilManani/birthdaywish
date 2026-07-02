const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir("src/pages/Home/sections", function(filePath) {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
    let content = fs.readFileSync(filePath, "utf-8");
    let initialContent = content;

    content = content.replace(/import\s+\{?[^;]*useNavigation[^;]*\}?\s+from\s+['"][^'"]*NavigationContext['"];?\n?/g, "");
    content = content.replace(/\s*const\s+\{\s*setChapterComplete\s*\}\s*=\s*useNavigation\(\);\n?/g, "");

    content = content.replace(/\s*useEffect\(\(\)\s*=>\s*\{\s*const timer = setTimeout\(\(\)\s*=>\s*setChapterComplete\(true\),\s*\d+\);\s*return\s*\(\)\s*=>\s*clearTimeout\(timer\);\s*\},\s*\[setChapterComplete\]\);\n?/g, "");
    content = content.replace(/\s*useEffect\(\(\)\s*=>\s*\{\s*setTimeout\(\(\)\s*=>\s*setChapterComplete\(true\),\s*\d+\);\s*\},\s*\[setChapterComplete\]\);\n?/g, "");
    content = content.replace(/\s*const timer = setTimeout\(\(\) => setChapterComplete\(true\), \d+\);\s*return \(\) => clearTimeout\(timer\);\n?/g, "");

    content = content.replace(/\s*setChapterComplete\(true\);?/g, "");
    content = content.replace(/,\s*setChapterComplete/g, "");

    if (content !== initialContent) {
      fs.writeFileSync(filePath, content);
      console.log("Cleaned:", filePath);
    }
  }
});
