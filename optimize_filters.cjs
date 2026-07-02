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
  if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
    let original = fs.readFileSync(filePath, "utf-8");
    let content = original;
    
    // Replace heavy blurs with standard gradients or remove the blur class if it relies on background color.
    // e.g. bg-[#36428c]/30 blur-[150px]
    // A radial gradient simulates a glow without the blur calculation.
    content = content.replace(/blur-\[1[0-9]{2}px\]/g, ""); 
    content = content.replace(/blur-2xl/g, "");
    content = content.replace(/blur-3xl/g, "");
    content = content.replace(/blur-xl/g, "blur-md");

    // Reduce backdrop blurs
    content = content.replace(/backdrop-blur-md/g, "backdrop-blur-sm");
    content = content.replace(/backdrop-blur-lg/g, "backdrop-blur-sm");
    content = content.replace(/backdrop-blur-xl/g, "backdrop-blur-sm");

    // Add loading lazy to img tags that don\x27t already have it
    // Don\x27t apply this blindly to Hero section
    if (!filePath.includes("HeroImage.tsx")) {
      content = content.replace(/<img(?![^>]*loading=)/g, "<img loading=\"lazy\"");
    }
    
    if (original !== content) {
      fs.writeFileSync(filePath, content);
      console.log("Optimized:", filePath);
    }
  }
});

