const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "high-fidelity-mockups");
fs.mkdirSync(outDir, { recursive: true });

const W = 1440;
const H = 1900;
const M = 96;
const NAV_H = 84;
const FOOT_H = 230;

const colors = {
  navy: "#05304A",
  teal: "#0E7490",
  aqua: "#2DD4BF",
  bg: "#F7F9FB",
  coral: "#FF6B6B",
  white: "#FFFFFF",
  ink: "#12313F",
  muted: "#5A7280",
  line: "#D8E5EA",
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function defs() {
  return `
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#05304A" flood-opacity="0.14"/>
    </filter>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#05304A" flood-opacity="0.10"/>
    </filter>
    <linearGradient id="oceanHero" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#05304A"/>
      <stop offset="0.55" stop-color="#0E7490"/>
      <stop offset="1" stop-color="#2DD4BF"/>
    </linearGradient>
    <linearGradient id="lightOcean" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ECF8FA"/>
      <stop offset="1" stop-color="#F7F9FB"/>
    </linearGradient>
    <linearGradient id="imageTint" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0E7490"/>
      <stop offset="1" stop-color="#05304A"/>
    </linearGradient>
    <linearGradient id="coralGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF8A8A"/>
      <stop offset="1" stop-color="#FF6B6B"/>
    </linearGradient>
  </defs>`;
}

function svg(title, body, active = "Home") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${defs()}
<rect width="${W}" height="${H}" fill="${colors.bg}"/>
<style>
  .font{font-family:Inter, Poppins, Arial, Helvetica, sans-serif}
  .mock-label{font:700 22px Inter,Arial,sans-serif;fill:${colors.teal};letter-spacing:.8px}
  .nav{font:700 16px Inter,Arial,sans-serif;fill:#fff}
  .brand{font:800 24px Inter,Arial,sans-serif;fill:#fff}
  .eyebrow{font:800 14px Inter,Arial,sans-serif;fill:${colors.aqua};letter-spacing:2.2px}
  .h1{font:800 58px Inter,Arial,sans-serif;fill:#fff}
  .h1dark{font:800 54px Inter,Arial,sans-serif;fill:${colors.navy}}
  .h2{font:800 34px Inter,Arial,sans-serif;fill:${colors.navy}}
  .h3{font:800 22px Inter,Arial,sans-serif;fill:${colors.navy}}
  .body{font:400 18px Inter,Arial,sans-serif;fill:${colors.ink}}
  .muted{font:400 16px Inter,Arial,sans-serif;fill:${colors.muted}}
  .small{font:700 13px Inter,Arial,sans-serif;fill:${colors.teal};letter-spacing:.8px}
  .white{fill:#fff}
  .button{font:800 15px Inter,Arial,sans-serif;fill:#fff;letter-spacing:.4px}
  .button-dark{font:800 15px Inter,Arial,sans-serif;fill:${colors.navy};letter-spacing:.4px}
  .kpi{font:800 36px Inter,Arial,sans-serif;fill:${colors.navy}}
</style>
<text x="${M}" y="58" class="mock-label">${esc(title)} Mockup</text>
${nav(active)}
${body}
${footer()}
</svg>`;
}

function r(x, y, w, h, fill = colors.white, stroke = "none", rx = 26, filter = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"${filter ? ` filter="url(#${filter})"` : ""}/>`;
}

function t(x, y, value, cls = "body") {
  return `<text x="${x}" y="${y}" class="${cls}">${esc(value)}</text>`;
}

function lines(x, y, textLines, cls = "body", gap = 28) {
  return textLines.map((line, i) => t(x, y + i * gap, line, cls)).join("");
}

function nav(active = "Home") {
  const links = ["Home", "About", "Problem", "Campaigns", "Report", "Rewards", "Data", "Contact"];
  let out = `<rect x="0" y="84" width="${W}" height="${NAV_H}" fill="${colors.navy}"/>`;
  out += t(M, 138, "BlueLoop", "brand");
  let x = 520;
  links.forEach((link, i) => {
    if (link === active) out += r(x - 18, 106, Math.max(76, link.length * 10 + 34), 40, colors.aqua, "none", 12);
    out += t(x, 132, link, link === active ? "button-dark" : "nav");
    x += link.length > 8 ? 125 : 86;
  });
  out += r(W - M - 84, 106, 84, 40, "rgba(255,255,255,.08)", "rgba(255,255,255,.25)", 20);
  out += t(W - M - 61, 132, "EN / AR", "nav");
  return out;
}

function footer() {
  const y = H - FOOT_H;
  let out = `<rect x="0" y="${y}" width="${W}" height="${FOOT_H}" fill="${colors.navy}"/>`;
  out += t(M, y + 70, "BlueLoop", "brand");
  out += lines(M, y + 105, ["Marine protection platform for Bahrain.", "Report pollution. Support cleaner seas."], "muted white", 24);
  out += t(610, y + 70, "Pages", "eyebrow");
  out += lines(610, y + 110, ["Home   About   Problem   Campaigns", "Report   Rewards   Data Insights   Contact"], "nav", 28);
  out += t(1010, y + 70, "Contact", "eyebrow");
  out += lines(1010, y + 110, ["hello@blueloop.bh", "Bahrain coastal community"], "nav", 28);
  return out;
}

function btn(x, y, label, fill = colors.coral, colorCls = "button", w = 178) {
  return r(x, y, w, 54, fill, "none", 16, "softShadow") + t(x + 28, y + 35, label, colorCls);
}

function chip(x, y, label, fill = "rgba(45,212,191,.14)") {
  return r(x, y, label.length * 9 + 44, 34, fill, "rgba(14,116,144,.18)", 17) + t(x + 20, y + 23, label, "small");
}

function imageBox(x, y, w, h, label, fill = "url(#imageTint)") {
  let out = r(x, y, w, h, fill, "none", 24, "softShadow");
  out += `<path d="M${x + 28} ${y + h - 58} C${x + 170} ${y + h - 130}, ${x + 260} ${y + h - 20}, ${x + w - 30} ${y + h - 92}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="5"/>`;
  out += `<circle cx="${x + w - 90}" cy="${y + 76}" r="42" fill="rgba(255,255,255,.18)"/>`;
  out += t(x + 34, y + h - 34, label, "nav");
  return out;
}

function imgCard(x, y, w, h, href, title, desc, badge) {
  const id = `clip_${Math.round(x)}_${Math.round(y)}`;
  let out = `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28"/></clipPath>`;
  out += r(x, y, w, h, colors.navy, "none", 28, "shadow");
  out += `<image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>`;
  out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="rgba(5,48,74,.62)"/>`;
  out += chip(x + 26, y + 28, badge, "rgba(255,255,255,.18)");
  out += t(x + 28, y + h - 96, title, "h3 white");
  out += lines(x + 28, y + h - 58, desc, "nav", 24);
  return out;
}

function card(x, y, w, h, title, desc, accent = colors.teal) {
  let out = r(x, y, w, h, colors.white, "none", 26, "softShadow");
  out += `<circle cx="${x + 44}" cy="${y + 48}" r="18" fill="${accent}"/>`;
  out += t(x + 80, y + 55, title, "h3");
  out += lines(x + 30, y + 100, desc, "muted", 25);
  return out;
}

function kpi(x, y, value, label) {
  let out = r(x, y, 260, 136, colors.white, "none", 24, "softShadow");
  out += t(x + 28, y + 58, value, "kpi");
  out += t(x + 28, y + 94, label, "muted");
  return out;
}

function hero(x, y, titleLines, subLines, visual, dark = false) {
  let out = r(x, y, W - M * 2, 420, dark ? "url(#oceanHero)" : "url(#lightOcean)", "none", 34, "shadow");
  out += t(x + 54, y + 78, "BLUELOOP", "eyebrow");
  out += lines(x + 54, y + 150, titleLines, dark ? "h1" : "h1dark", 64);
  out += lines(x + 56, y + 290, subLines, dark ? "nav" : "body", 30);
  out += visual;
  return out;
}

function home() {
  let visual = dashboard(815, 250, 390, 300);
  let out = hero(M, 210, ["Turn coastal reports", "into cleaner seas."], ["BlueLoop helps Bahrain report pollution,", "reward action, and map marine impact."], visual, false);
  out += btn(M + 54, 560, "Report Pollution", colors.coral, "button", 190);
  out += btn(M + 264, 560, "View Campaigns", colors.white, "button-dark", 178);
  out += t(M, 720, "Impact Stats", "h2");
  out += kpi(M, 760, "1,284", "Reports submitted") + kpi(392, 760, "24", "Cleanup campaigns") + kpi(688, 760, "92K", "Reward points earned") + kpi(984, 760, "16", "Partner companies");
  out += t(M, 990, "Campaign Preview Cards", "h2");
  out += imgCard(M, 1040, 384, 320, "../images/plastic-watch.jpg", "Plastic Watch", ["North coast reporting drive", "for plastic waste hotspots."], "Reporting");
  out += imgCard(528, 1040, 384, 320, "../images/marine-cleanup.jpg", "Weekend Marine Cleanup", ["Community cleanup action", "with volunteers and teams."], "Cleanup");
  out += imgCard(960, 1040, 384, 320, "../images/partner-impact.jpg", "Partner Impact Challenge", ["Companies support verified", "cleanup requests and data."], "Partners");
  return svg("Home Page", out, "Home");
}

function dashboard(x, y, w, h) {
  let out = r(x, y, w, h, colors.white, "none", 28, "shadow");
  out += t(x + 28, y + 48, "Live Report Dashboard", "h3");
  out += chip(x + 28, y + 70, "Verified report");
  out += r(x + 28, y + 124, w - 56, 86, colors.bg, "none", 18);
  out += t(x + 50, y + 158, "Oil trace near marina", "body");
  out += t(x + 50, y + 186, "Status: cleanup requested", "muted");
  out += r(x + 28, y + 232, 94, 42, colors.aqua, "none", 12);
  out += r(x + 144, y + 232, 94, 42, colors.teal, "none", 12);
  out += r(x + 260, y + 232, 74, 42, colors.coral, "none", 12);
  return out;
}

function about() {
  let out = hero(M, 210, ["Building a cleaner", "future for Bahrain."], ["BlueLoop connects citizens, teams,", "and companies around marine protection."], imageBox(845, 270, 330, 260, "Marine protection visual"), true);
  out += t(M, 720, "Mission Section", "h2");
  out += card(M, 770, 384, 230, "Report faster", ["Make pollution reporting simple", "and useful for cleanup teams."], colors.aqua);
  out += card(528, 770, 384, 230, "Reward action", ["Encourage residents and students", "to support cleaner coastlines."], colors.coral);
  out += card(960, 770, 384, 230, "Share insight", ["Turn verified reports into", "environmental business data."], colors.teal);
  out += r(M, 1080, W - M * 2, 300, colors.white, "none", 32, "shadow");
  out += imageBox(M + 42, 1130, 440, 200, "Bahrain coastline image area");
  out += t(620, 1150, "Bahrain Marine Protection", "h2");
  out += lines(620, 1205, ["As an island nation, Bahrain depends on clean waters,", "healthy coastal spaces, and community participation.", "BlueLoop makes marine care easier to report and track."], "body", 32);
  return svg("About Page", out, "About");
}

function problem() {
  let out = hero(M, 210, ["Marine pollution", "needs visible action."], ["Pollution becomes easier to solve when", "reports are clear, mapped, and verified."], imageBox(845, 270, 330, 260, "Pollution map visual"), true);
  out += r(M, 710, W - M * 2, 300, colors.white, "none", 32, "shadow");
  out += t(M + 48, 770, "Pollution Explanation", "h2");
  out += lines(M + 48, 830, ["Plastic waste, oil traces, discarded fishing nets, and beach litter can harm marine life", "and reduce the quality of coastal spaces. BlueLoop turns community observations into", "structured reports that help response teams understand what is happening and where."], "body", 32);
  out += t(M, 1090, "Impact Blocks", "h2");
  out += card(M, 1140, 384, 230, "Marine life", ["Reports help identify risks", "to habitats and sea animals."], colors.aqua);
  out += card(528, 1140, 384, 230, "Coastlines", ["Cleaner beaches support tourism,", "health, and public spaces."], colors.teal);
  out += card(960, 1140, 384, 230, "Community", ["Residents can take part in", "visible environmental action."], colors.coral);
  out += r(M, 1445, W - M * 2, 150, colors.navy, "none", 30, "shadow");
  out += t(M + 48, 1510, "Bahrain-specific marine issue section", "h3 white");
  out += lines(M + 48, 1550, ["Coastal reporting helps highlight recurring locations and support faster cleanup planning."], "nav", 24);
  out += btn(W - M - 230, 1495, "Report Pollution", colors.coral, "button", 190);
  return svg("Problem Page", out, "Problem");
}

function campaigns() {
  let out = hero(M, 210, ["Join campaigns that", "protect the coastline."], ["Featured drives turn pollution reports", "into cleanup action and community impact."], imageBox(845, 270, 330, 260, "Campaign hero image"), true);
  out += r(M, 710, W - M * 2, 310, colors.white, "none", 32, "shadow");
  out += imageBox(M + 36, 760, 430, 210, "Featured campaign image");
  out += t(590, 775, "Featured Campaign", "eyebrow");
  out += t(590, 835, "Plastic Watch: North Coast Reporting Drive", "h2");
  out += lines(590, 895, ["A focused reporting campaign to map plastic waste hotspots", "and prepare cleanup priorities along Bahrain's north coast."], "body", 32);
  out += btn(590, 950, "Join Campaign", colors.coral, "button", 170);
  out += t(M, 1100, "Campaign Cards", "h2");
  out += imgCard(M, 1150, 384, 300, "../images/plastic-watch.jpg", "Plastic Watch", ["Track plastic waste and", "submit verified reports."], "North Coast");
  out += imgCard(528, 1150, 384, 300, "../images/marine-cleanup.jpg", "Weekend Cleanup", ["Volunteer cleanup action", "for local coastal areas."], "Cleanup");
  out += imgCard(960, 1150, 384, 300, "../images/partner-impact.jpg", "Partner Challenge", ["Company support for", "cleanup impact and data."], "Business");
  out += r(M, 1510, W - M * 2, 130, colors.white, "none", 26, "softShadow");
  out += t(M + 38, 1568, "Upcoming Events / Timeline", "h3");
  out += lines(M + 38, 1605, ["Report review  •  Volunteer briefing  •  Cleanup weekend  •  Impact summary"], "body", 24);
  return svg("Campaigns Page", out, "Campaigns");
}

function formField(x, y, label, w = 470, h = 56) {
  return t(x, y, label, "small") + r(x, y + 16, w, h, colors.bg, colors.line, 14);
}

function report() {
  let out = hero(M, 210, ["Report pollution", "with clear evidence."], ["Submit location, type, details, and photos", "so cleanup teams can review your report."], imageBox(845, 270, 330, 260, "Upload evidence visual"), true);
  out += r(M, 710, 710, 760, colors.white, "none", 32, "shadow");
  out += t(M + 44, 770, "Report Pollution Form", "h2");
  out += formField(M + 44, 825, "Full name");
  out += formField(M + 44, 925, "Email address");
  out += formField(M + 44, 1025, "Pollution type");
  out += formField(M + 44, 1125, "Location");
  out += formField(M + 44, 1225, "Description", 560, 112);
  out += r(M + 44, 1370, 560, 76, colors.bg, colors.line, 16);
  out += t(M + 70, 1416, "Upload image area", "body");
  out += btn(M + 44, 1488, "Submit Report", colors.coral, "button", 175);
  out += r(860, 710, 484, 760, colors.white, "none", 32, "shadow");
  out += t(910, 770, "Reporting Tips", "h2");
  out += card(910, 825, 360, 150, "Be specific", ["Add location details and", "visible evidence when possible."], colors.aqua);
  out += card(910, 1010, 360, 150, "Stay safe", ["Do not enter unsafe areas", "to take photos or videos."], colors.coral);
  out += card(910, 1195, 360, 150, "What happens next?", ["BlueLoop reviews reports and", "shares cleanup requests."], colors.teal);
  out += r(910, 1380, 360, 58, "#E9F8F5", "none", 16);
  out += t(935, 1417, "Success message area", "small");
  return svg("Report Pollution Page", out, "Report");
}

function rewards() {
  let out = hero(M, 210, ["Points that reward", "real community action."], ["BlueLoop rewards verified reports,", "campaign support, and cleaner-sea effort."], imageBox(845, 270, 330, 260, "Rewards visual"), true);
  out += r(M, 710, 520, 520, colors.white, "none", 32, "shadow");
  out += t(M + 42, 770, "Points Timeline", "h2");
  for (let i = 0; i < 4; i++) {
    const y = 840 + i * 85;
    out += `<circle cx="${M + 62}" cy="${y}" r="17" fill="${i % 2 ? colors.teal : colors.coral}"/>`;
    if (i < 3) out += `<line x1="${M + 62}" y1="${y + 20}" x2="${M + 62}" y2="${y + 66}" stroke="${colors.line}" stroke-width="4"/>`;
    out += t(M + 100, y - 4, ["Submit report", "Get verified", "Earn points", "Redeem rewards"][i], "h3");
    out += t(M + 100, y + 26, "Clear action, simple progress.", "muted");
  }
  out += t(690, 710, "Reward Cards", "h2");
  out += card(690, 760, 285, 180, "Cleanup badge", ["Recognition for campaign", "participation."], colors.aqua);
  out += card(1010, 760, 285, 180, "Eco voucher", ["Partner rewards for", "verified impact."], colors.coral);
  out += r(690, 990, 605, 145, colors.white, "none", 26, "softShadow");
  out += t(730, 1045, "Progress Bar Section", "h3");
  out += r(730, 1075, 500, 18, colors.bg, "none", 9);
  out += r(730, 1075, 340, 18, colors.aqua, "none", 9);
  out += t(730, 1125, "680 / 1,000 points toward next reward", "muted");
  out += r(M, 1305, W - M * 2, 250, colors.white, "none", 30, "shadow");
  out += t(M + 42, 1365, "FAQ Section", "h2");
  out += lines(M + 42, 1425, ["How do I earn points?  Reports and campaign actions can earn points after review.", "When are rewards available?  Rewards appear when eligible partner offers are active.", "Can schools join?  Yes, community and school programs can participate."], "body", 34);
  return svg("Rewards Page", out, "Rewards");
}

function data() {
  let out = hero(M, 210, ["Environmental data", "for responsible companies."], ["BlueLoop turns verified coastal reports", "into dashboard insights and cleanup priorities."], dashboard(815, 250, 390, 300), true);
  out += t(M, 710, "KPI Cards", "h2");
  out += kpi(M, 750, "214", "Reports this month") + kpi(392, 750, "12", "Verified hotspots") + kpi(688, 750, "+31%", "Campaign impact") + kpi(984, 750, "8", "Cleanup requests");
  out += r(M, 970, 590, 360, colors.white, "none", 28, "shadow");
  out += t(M + 38, 1030, "Pollution Reports by Type", "h3");
  ["Plastic", "Oil", "Nets", "Litter", "Verified"].forEach((label, i) => {
    const x = M + 70 + i * 95;
    const h = [180, 112, 88, 150, 205][i];
    out += r(x, 1255 - h, 46, h, i % 2 ? colors.teal : colors.aqua, "none", 12);
    out += t(x - 12, 1288, label, "muted");
  });
  out += r(754, 970, 590, 360, colors.white, "none", 28, "shadow");
  out += t(792, 1030, "Monthly Verified Reports", "h3");
  out += `<polyline points="810,1220 900,1160 1000,1188 1090,1106 1190,1130 1290,1050" fill="none" stroke="${colors.coral}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
  out += `<polyline points="810,1260 900,1230 1000,1240 1090,1190 1190,1204 1290,1150" fill="none" stroke="${colors.aqua}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  out += r(M, 1410, W - M * 2, 170, colors.white, "none", 28, "shadow");
  out += t(M + 38, 1470, "Business Benefits Section", "h2");
  out += lines(M + 38, 1525, ["Identify hotspots, support verified cleanup requests, measure campaign impact, and plan", "environmental responsibility initiatives using clearer coastal data."], "body", 30);
  out += btn(W - M - 220, 1478, "Request Data", colors.coral, "button", 170);
  return svg("Data Insights Page", out, "Data");
}

function contact() {
  let out = hero(M, 210, ["Contact BlueLoop", "and stay connected."], ["Reach the team, ask about partnerships,", "or follow marine protection efforts."], imageBox(845, 270, 330, 260, "Contact visual"), true);
  out += r(M, 710, 590, 590, colors.white, "none", 32, "shadow");
  out += t(M + 42, 770, "Contact Form", "h2");
  out += formField(M + 42, 825, "Name", 480);
  out += formField(M + 42, 925, "Email", 480);
  out += formField(M + 42, 1025, "Subject", 480);
  out += formField(M + 42, 1125, "Message", 480, 112);
  out += btn(M + 42, 1260, "Send Message", colors.coral, "button", 170);
  out += r(760, 710, 584, 270, colors.white, "none", 32, "shadow");
  out += t(806, 770, "Contact Details", "h2");
  out += lines(806, 830, ["Email: hello@blueloop.bh", "Location: Bahrain coastal community", "Partnerships: companies and schools"], "body", 34);
  out += r(760, 1020, 584, 280, "url(#lightOcean)", "none", 32, "shadow");
  out += t(806, 1085, "Map Placeholder", "h2");
  out += `<path d="M830 1210 C930 1120 1035 1260 1160 1148 C1220 1105 1275 1120 1305 1160" fill="none" stroke="${colors.teal}" stroke-width="8" stroke-linecap="round"/>`;
  out += t(M, 1385, "Follow BlueLoop Social Media Cards", "h2");
  out += imgCard(M, 1435, 276, 230, "../images/instagram-cover.jpg", "Instagram", ["Campaign updates", "and cleanup visuals."], "IG");
  out += imgCard(414, 1435, 276, 230, "../images/twitter-cover.jpg", "Twitter X", ["Fast updates and", "public notices."], "X");
  out += imgCard(732, 1435, 276, 230, "../images/linkedin-cover.jpg", "LinkedIn", ["Partners and", "company insights."], "in");
  out += imgCard(1050, 1435, 276, 230, "../images/tiktok-cover.jpg", "TikTok", ["Short awareness", "and community clips."], "TT");
  return svg("Contact Page", out, "Contact");
}

const pages = [
  ["01-home-high-fidelity-mockup.svg", home()],
  ["02-about-high-fidelity-mockup.svg", about()],
  ["03-problem-high-fidelity-mockup.svg", problem()],
  ["04-campaigns-high-fidelity-mockup.svg", campaigns()],
  ["05-report-pollution-high-fidelity-mockup.svg", report()],
  ["06-rewards-high-fidelity-mockup.svg", rewards()],
  ["07-data-insights-high-fidelity-mockup.svg", data()],
  ["08-contact-high-fidelity-mockup.svg", contact()],
];

pages.forEach(([name, content]) => fs.writeFileSync(path.join(outDir, name), content, "utf8"));

const gallery = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BlueLoop High-Fidelity Mockups</title>
  <style>
    body{margin:0;background:#F7F9FB;font-family:Inter,Arial,sans-serif;color:#05304A}
    header{padding:34px 44px;background:#05304A;color:white}
    h1{margin:0;font-size:30px}
    main{padding:36px 44px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:28px}
    a{display:block;color:#05304A;text-decoration:none;font-weight:800}
    img{width:100%;background:white;border-radius:18px;box-shadow:0 14px 35px rgba(5,48,74,.14)}
    p{margin:12px 0 0}
  </style>
</head>
<body>
  <header><h1>BlueLoop High-Fidelity Website Mockups</h1></header>
  <main>
    <div class="grid">
      ${pages.map(([name]) => `<a href="${name}"><img src="${name}" alt="${name}"><p>${name}</p></a>`).join("\n      ")}
    </div>
  </main>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, "index.html"), gallery, "utf8");
console.log(`Created ${pages.length} high-fidelity mockups in ${outDir}`);
