const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "wireframes");
fs.mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 1600;
const M = 70;
const NAV_H = 86;
const FOOT_H = 110;

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function svg(pageTitle, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#fff"/>
  <style>
    .box{fill:#fff;stroke:#000;stroke-width:2}
    .thin{fill:none;stroke:#000;stroke-width:1.4}
    .dash{fill:none;stroke:#000;stroke-width:1.6;stroke-dasharray:9 7}
    .label{font-family:Arial, Helvetica, sans-serif;font-size:18px;font-weight:700;fill:#000}
    .small{font-family:Arial, Helvetica, sans-serif;font-size:14px;fill:#000}
    .tiny{font-family:Arial, Helvetica, sans-serif;font-size:12px;fill:#000}
    .title{font-family:Arial, Helvetica, sans-serif;font-size:26px;font-weight:700;fill:#000}
    .page{font-family:Arial, Helvetica, sans-serif;font-size:32px;font-weight:700;fill:#000}
  </style>
  <text x="${M}" y="45" class="page">${esc(pageTitle)} Wireframe</text>
  ${nav()}
  ${body}
  ${footer()}
</svg>`;
}

function rect(x, y, w, h, cls = "box", label = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}"/>${label ? text(x + 18, y + 32, label, "label") : ""}`;
}

function line(x1, y1, x2, y2, cls = "thin") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
}

function text(x, y, value, cls = "small") {
  return `<text x="${x}" y="${y}" class="${cls}">${esc(value)}</text>`;
}

function lorem(x, y, width = 280, lines = 3) {
  const words = [
    "Lorem ipsum dolor sit amet",
    "consectetur adipiscing elit",
    "sed do eiusmod tempor",
    "incididunt ut labore",
  ];
  let out = "";
  for (let i = 0; i < lines; i++) {
    out += text(x, y + i * 24, words[i % words.length], "small");
    out += line(x, y + 7 + i * 24, x + width, y + 7 + i * 24);
  }
  return out;
}

function nav() {
  const links = ["Home", "About", "Problem", "Campaigns", "Report", "Rewards", "Data", "Contact"];
  let out = rect(M, 70, W - M * 2, NAV_H, "box", "Navigation");
  out += text(M + 26, 128, "BlueLoop Logo", "label");
  let x = 470;
  links.forEach((link) => {
    out += rect(x, 100, 68, 28, "thin");
    out += text(x + 12, 120, link, "tiny");
    x += 78;
  });
  return out;
}

function footer() {
  const y = H - FOOT_H - 45;
  let out = rect(M, y, W - M * 2, FOOT_H, "box", "Footer");
  out += lorem(M + 180, y + 45, 270, 2);
  out += lorem(M + 535, y + 45, 230, 2);
  out += lorem(M + 830, y + 45, 180, 2);
  return out;
}

function button(x, y, w, label) {
  return rect(x, y, w, 44, "box") + text(x + 22, y + 29, label, "small");
}

function card(x, y, w, h, label, lines = 3) {
  let out = rect(x, y, w, h, "box", label);
  out += rect(x + 18, y + 55, w - 36, 72, "dash", "Image / Visual");
  out += lorem(x + 18, y + 155, w - 54, lines);
  return out;
}

function stats(x, y, count = 4) {
  let out = text(x, y - 18, "Stats Section", "label");
  const gap = 20;
  const w = (W - M * 2 - gap * (count - 1)) / count;
  for (let i = 0; i < count; i++) {
    const sx = x + i * (w + gap);
    out += rect(sx, y, w, 120, "box");
    out += text(sx + 22, y + 42, "00", "title");
    out += line(sx + 22, y + 68, sx + w - 28, y + 68);
    out += text(sx + 22, y + 96, "Stat Label", "small");
  }
  return out;
}

function home() {
  let out = rect(M, 190, W - M * 2, 360, "box", "Hero Section");
  out += text(M + 40, 255, "Large Headline", "title");
  out += lorem(M + 40, 300, 430, 4);
  out += button(M + 40, 420, 150, "CTA Button");
  out += button(M + 210, 420, 160, "CTA Button");
  out += rect(690, 235, 390, 250, "dash", "Right Image Placeholder");
  out += stats(M, 625, 4);
  out += text(M, 825, "Campaign Cards", "label");
  out += card(M, 850, 330, 300, "Campaign Card 01");
  out += card(435, 850, 330, 300, "Campaign Card 02");
  out += card(800, 850, 330, 300, "Campaign Card 03");
  return svg("Home", out);
}

function about() {
  let out = rect(M, 190, W - M * 2, 245, "box", "Large Header Section");
  out += text(M + 40, 260, "About Page Title", "title");
  out += lorem(M + 40, 310, 520, 3);
  out += text(M, 500, "Mission Blocks", "label");
  out += card(M, 530, 330, 245, "Mission Block 01", 2);
  out += card(435, 530, 330, 245, "Mission Block 02", 2);
  out += card(800, 530, 330, 245, "Mission Block 03", 2);
  out += rect(M, 850, W - M * 2, 330, "box", "Info Section");
  out += rect(M + 35, 915, 440, 205, "dash", "Image Placeholder");
  out += text(610, 925, "Text Content", "label");
  out += lorem(610, 970, 420, 5);
  return svg("About", out);
}

function problem() {
  let out = rect(M, 190, W - M * 2, 230, "box", "Title + Explanation Section");
  out += text(M + 40, 260, "Problem Page Title", "title");
  out += lorem(M + 40, 310, 620, 4);
  out += rect(M, 475, W - M * 2, 300, "dash", "Large Visual Placeholder");
  out += text(M, 850, "Problem Cards", "label");
  out += card(M, 880, 330, 260, "Problem Card 01", 2);
  out += card(435, 880, 330, 260, "Problem Card 02", 2);
  out += card(800, 880, 330, 260, "Problem Card 03", 2);
  return svg("Problem", out);
}

function campaigns() {
  let out = rect(M, 190, W - M * 2, 210, "box", "Header");
  out += text(M + 40, 260, "Campaigns Page Title", "title");
  out += lorem(M + 40, 305, 520, 3);
  out += text(M, 470, "Campaign Cards");
  out += card(M, 500, 330, 310, "Campaign Card 01", 3);
  out += card(435, 500, 330, 310, "Campaign Card 02", 3);
  out += card(800, 500, 330, 310, "Campaign Card 03", 3);
  out += rect(M, 900, W - M * 2, 270, "box", "Timeline Section");
  for (let i = 0; i < 4; i++) {
    const x = M + 105 + i * 245;
    out += `<circle cx="${x}" cy="1010" r="18" class="box"/>`;
    out += line(x + 18, 1010, x + 205, 1010);
    out += text(x - 28, 1070, `Step ${i + 1}`, "label");
    out += lorem(x - 45, 1105, 150, 2);
  }
  return svg("Campaigns", out);
}

function report() {
  let out = rect(M, 190, 670, 860, "box", "Report Pollution Form");
  const fields = ["Name", "Email", "Pollution Type", "Location", "Description"];
  fields.forEach((field, i) => {
    const y = 260 + i * 110;
    out += text(M + 35, y, field + " Label", "label");
    out += rect(M + 35, y + 18, 590, i === 4 ? 115 : 54, "box");
  });
  out += rect(M + 35, 830, 590, 120, "dash", "Upload Area");
  out += button(M + 35, 980, 180, "Submit Button");
  out += rect(790, 190, 340, 860, "box", "Side Info Panel");
  out += lorem(825, 260, 250, 8);
  out += rect(825, 560, 250, 200, "dash", "Instruction Box");
  return svg("Report Pollution", out);
}

function rewards() {
  let out = rect(M, 190, W - M * 2, 210, "box", "Header");
  out += text(M + 40, 260, "Rewards Page Title", "title");
  out += lorem(M + 40, 305, 520, 3);
  out += rect(M, 465, 520, 520, "box", "Steps Timeline");
  out += line(M + 80, 545, M + 80, 900);
  for (let i = 0; i < 4; i++) {
    const y = 545 + i * 115;
    out += `<circle cx="${M + 80}" cy="${y}" r="17" class="box"/>`;
    out += text(M + 125, y - 8, `Timeline Step ${i + 1}`, "label");
    out += lorem(M + 125, y + 25, 300, 2);
  }
  out += text(655, 465, "Points Explanation Cards", "label");
  out += card(655, 500, 220, 205, "Points Card", 2);
  out += card(910, 500, 220, 205, "Points Card", 2);
  out += card(655, 740, 220, 205, "Points Card", 2);
  out += card(910, 740, 220, 205, "Points Card", 2);
  out += stats(M, 1080, 3);
  return svg("Rewards", out);
}

function dataInsights() {
  let out = rect(M, 190, W - M * 2, 180, "box", "Dashboard Header");
  out += text(M + 40, 260, "Data Insights Title", "title");
  out += lorem(M + 40, 305, 560, 2);
  out += text(M, 440, "Stats Boxes", "label");
  out += stats(M, 470, 4);
  out += rect(M, 690, 500, 320, "box", "Bar Chart Placeholder");
  for (let i = 0; i < 6; i++) {
    const x = M + 70 + i * 65;
    const h = 70 + i * 18;
    out += rect(x, 940 - h, 36, h, "box");
    out += text(x - 8, 965, "Cat", "tiny");
  }
  out += rect(630, 690, 500, 320, "box", "Line Graph Placeholder");
  out += line(680, 920, 1070, 770);
  out += line(680, 860, 760, 815);
  out += line(760, 815, 850, 840);
  out += line(850, 840, 950, 780);
  out += line(950, 780, 1070, 805);
  out += rect(M, 1070, W - M * 2, 160, "box", "Section Titles / Insight Summary");
  out += lorem(M + 40, 1125, 700, 3);
  return svg("Data Insights", out);
}

function contact() {
  let out = rect(M, 190, 510, 650, "box", "Contact Form");
  ["Name", "Email", "Subject", "Message"].forEach((field, i) => {
    const y = 260 + i * 105;
    out += text(M + 35, y, field + " Label", "label");
    out += rect(M + 35, y + 18, 430, i === 3 ? 145 : 54, "box");
  });
  out += button(M + 35, 765, 175, "Send Button");
  out += rect(640, 190, 490, 650, "dash", "Map / Image Placeholder");
  out += text(M, 920, "Social Section", "label");
  out += card(M, 950, 245, 220, "Social Card 01", 1);
  out += card(365, 950, 245, 220, "Social Card 02", 1);
  out += card(660, 950, 245, 220, "Social Card 03", 1);
  out += card(955, 950, 175, 220, "Social Card 04", 1);
  return svg("Contact", out);
}

const pages = [
  ["01-home-wireframe.svg", home()],
  ["02-about-wireframe.svg", about()],
  ["03-problem-wireframe.svg", problem()],
  ["04-campaigns-wireframe.svg", campaigns()],
  ["05-report-pollution-wireframe.svg", report()],
  ["06-rewards-wireframe.svg", rewards()],
  ["07-data-insights-wireframe.svg", dataInsights()],
  ["08-contact-wireframe.svg", contact()],
];

pages.forEach(([name, content]) => {
  fs.writeFileSync(path.join(outDir, name), content, "utf8");
});

const gallery = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BlueLoop Wireframes</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;margin:32px;background:#fff;color:#000}
    h1{font-size:28px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
    a{color:#000;text-decoration:none}
    img{width:100%;border:1px solid #000;background:#fff}
    p{font-weight:700}
  </style>
</head>
<body>
  <h1>BlueLoop Low-Fidelity Wireframes</h1>
  <div class="grid">
    ${pages
      .map(
        ([name]) => `<a href="${name}"><img src="${name}" alt="${name}"><p>${name}</p></a>`
      )
      .join("\n    ")}
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, "index.html"), gallery, "utf8");
console.log(`Created ${pages.length} wireframes in ${outDir}`);
