const fs = require("fs");

let hero = "src/pages/Home/sections/Hero/index.tsx";
if (fs.existsSync(hero)) {
  let content = fs.readFileSync(hero, "utf-8");
  content = content.replace(/import React from \x27react\x27;/, "import React, { useEffect } from \x27react\x27;");
  fs.writeFileSync(hero, content);
}

let memViewer = "src/pages/Home/sections/Gallery/MemoryViewer.tsx";
if (fs.existsSync(memViewer)) {
  let content = fs.readFileSync(memViewer, "utf-8");
  content = content.replace(/const \[isZoomed, setIsZoomed\].*\n/g, "");
  fs.writeFileSync(memViewer, content);
}

let storyMgr = "src/pages/Home/StorybookManager.tsx";
if (fs.existsSync(storyMgr)) {
  let content = fs.readFileSync(storyMgr, "utf-8");
  content = content.replace(/pages\.map\(\(p, index\) =>/g, "pages.map((_p, index) =>");
  fs.writeFileSync(storyMgr, content);
}

