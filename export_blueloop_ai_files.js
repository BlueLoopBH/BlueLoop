const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "high-fidelity-mockups");
const outDir = path.join(__dirname, "illustrator-files");
fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(sourceDir)
  .filter((name) => name.endsWith(".svg"))
  .sort();

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>BlueLoop Illustrator Files</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;margin:32px;background:#f7f9fb;color:#05304A}
    h1{margin:0 0 10px}
    p{margin:0 0 24px}
    ul{line-height:1.9}
  </style>
</head>
<body>
  <h1>BlueLoop Adobe Illustrator Files</h1>
  <p>These files are vector SVG mockups prepared for opening and editing in Adobe Illustrator.</p>
  <ul>
    ${files
      .map((file) => {
        const aiName = file.replace(".svg", ".ai.svg");
        return `<li><a href="${aiName}">${aiName}</a></li>`;
      })
      .join("\n    ")}
  </ul>
</body>
</html>`;

files.forEach((file) => {
  const svgPath = path.join(sourceDir, file);
  const aiSvgName = file.replace(".svg", ".ai.svg");
  const aiNamedSvgName = file.replace(".svg", ".ai");
  const svgContent = fs.readFileSync(svgPath, "utf8");

  const illustratorReadySvg = svgContent.replace(
    "<svg ",
    '<svg xmlns:xlink="http://www.w3.org/1999/xlink" '
  );

  fs.writeFileSync(path.join(outDir, aiSvgName), illustratorReadySvg, "utf8");
  fs.writeFileSync(path.join(outDir, aiNamedSvgName), illustratorReadySvg, "utf8");
});

fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
console.log(`Created ${files.length} Illustrator-ready SVG files in ${outDir}`);
