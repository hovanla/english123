import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { basicEnglishTwoUnits } from "../src/lib/basic-english-two-content";

const outputDirectory = path.join(process.cwd(), "public", "basic-english-two", "boards");
const colors = [["#e8f5ff", "#1d4ed8"], ["#e9f9f1", "#047857"], ["#fff1dc", "#b45309"], ["#f5ecff", "#7e22ce"], ["#ffebee", "#be123c"]] as const;

function escapeXml(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }

function boardSvg(visuals: string[]) {
  const cells = visuals.map((visual, index) => {
    const x = (index % 5) * 300; const y = Math.floor(index / 5) * 300; const [background, accent] = colors[index % colors.length];
    return `<g transform="translate(${x} ${y})"><rect x="10" y="10" width="280" height="280" rx="32" fill="${background}"/><circle cx="48" cy="48" r="20" fill="${accent}" opacity=".14"/><circle cx="250" cy="246" r="30" fill="${accent}" opacity=".09"/><path d="M34 228 C90 178,142 270,266 202" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity=".14"/><text x="150" y="176" text-anchor="middle" font-size="${visual.length > 6 ? 78 : 104}" font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif">${escapeXml(visual)}</text></g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="900" viewBox="0 0 1500 900" role="img" aria-label="Bộ tranh tiếng Anh cơ bản 2"><rect width="1500" height="900" fill="#fff"/>${cells}</svg>`;
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(basicEnglishTwoUnits.map((unit) => writeFile(path.join(outputDirectory, `${unit.slug}.svg`), boardSvg(unit.visuals), "utf8")));
  console.log(`Đã tạo ${basicEnglishTwoUnits.length} bộ tranh tiếng Anh cơ bản 2 tại ${outputDirectory}.`);
}
void main();
