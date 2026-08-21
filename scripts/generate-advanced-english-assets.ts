import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { advancedEnglishUnits } from "../src/lib/advanced-english-content";

const outputDirectory = path.join(process.cwd(), "public", "advanced-english", "boards");
const colors = [["#eef2ff", "#4338ca"], ["#ecfeff", "#0e7490"], ["#f0fdf4", "#15803d"], ["#fff7ed", "#c2410c"], ["#fdf2f8", "#be185d"]] as const;

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function boardSvg(visuals: string[]) {
  const cells = visuals.map((visual, index) => {
    const x = (index % 5) * 300;
    const y = Math.floor(index / 5) * 300;
    const [background, accent] = colors[index % colors.length];
    return `<g transform="translate(${x} ${y})"><rect x="10" y="10" width="280" height="280" rx="32" fill="${background}"/><path d="M32 226 C94 176,154 270,268 196" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity=".13"/><circle cx="50" cy="50" r="22" fill="${accent}" opacity=".14"/><circle cx="248" cy="240" r="34" fill="${accent}" opacity=".08"/><text x="150" y="176" text-anchor="middle" font-size="${visual.length > 6 ? 76 : 102}" font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif">${escapeXml(visual)}</text></g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="900" viewBox="0 0 1500 900" role="img" aria-label="Bộ tranh tiếng Anh nâng cao"><rect width="1500" height="900" fill="#fff"/>${cells}</svg>`;
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(advancedEnglishUnits.map((unit) => writeFile(path.join(outputDirectory, `${unit.slug}.svg`), boardSvg(unit.visuals), "utf8")));
  console.log(`Đã tạo ${advancedEnglishUnits.length} bộ tranh tiếng Anh nâng cao tại ${outputDirectory}.`);
}

void main();
