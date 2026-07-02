const fs = require("fs");
const path = require("path");

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk("src", function(filePath) {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".ts") || filePath.endsWith(".css")) {
    let original = fs.readFileSync(filePath, "utf-8");
    let content = original;
    // Replace standard tailwind vh classes
    content = content.replace(/h-\[([0-9]+)vh\]/g, "h-[$1dvh]");
    content = content.replace(/min-h-\[([0-9]+)vh\]/g, "min-h-[$1dvh]");
    content = content.replace(/max-h-\[([0-9]+)vh\]/g, "max-h-[$1dvh]");
    
    // Replace vw classes with %
    content = content.replace(/w-\[([0-9]+)vw\]/g, "w-[$1%]");
    content = content.replace(/max-w-\[([0-9]+)vw\]/g, "max-w-[$1%]");
    
    // Handle specific hardcoded vw inside style or className
    content = content.replace(/100vw/g, "100%");
    
    if (original !== content) {
      fs.writeFileSync(filePath, content);
      console.log("Updated:", filePath);
    }
  }
});

