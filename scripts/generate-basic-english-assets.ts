import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { basicEnglishUnits } from "../src/lib/basic-english-content";

const outputDirectory = path.join(process.cwd(), "public", "basic-english", "boards");
const colors = [
  ["#e6f7f0", "#047857"],
  ["#e8f2ff", "#1d4ed8"],
  ["#fff1d6", "#b45309"],
  ["#f4e8ff", "#7e22ce"],
  ["#ffe8ed", "#be123c"],
] as const;

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function boardSvg(visuals: string[]) {
  const width = 1500;
  const height = 900;
  const cellSize = 300;
  const cells = visuals.map((visual, index) => {
    const x = (index % 5) * cellSize;
    const y = Math.floor(index / 5) * cellSize;
    const [background, accent] = colors[index % colors.length];
    return `
      <g transform="translate(${x} ${y})">
        <rect x="10" y="10" width="280" height="280" rx="32" fill="${background}"/>
        <path d="M34 228 C90 178, 142 270, 266 202" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity=".14"/>
        <circle cx="48" cy="48" r="20" fill="${accent}" opacity=".14"/>
        <circle cx="250" cy="246" r="30" fill="${accent}" opacity=".09"/>
        <text x="150" y="176" text-anchor="middle" font-size="${visual.length > 6 ? 78 : 104}" font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif">${escapeXml(visual)}</text>
      </g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Bộ tranh học tiếng Anh cơ bản">
    <rect width="${width}" height="${height}" fill="#ffffff"/>
    ${cells}
  </svg>`;
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(basicEnglishUnits.map((unit) =>
    writeFile(path.join(outputDirectory, `${unit.slug}.svg`), boardSvg(unit.visuals), "utf8"),
  ));
  console.log(`Đã tạo ${basicEnglishUnits.length} bộ tranh tiếng Anh cơ bản tại ${outputDirectory}.`);
}

void main();
