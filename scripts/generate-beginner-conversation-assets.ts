import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { beginnerConversationUnits } from "../src/lib/beginner-conversation-content";

const outputDirectory = path.join(process.cwd(), "public", "conversation-beginner", "boards");
const colors = [
  ["#dff7ef", "#087a5b"],
  ["#e8f1ff", "#2563a8"],
  ["#fff2d6", "#b45309"],
  ["#f4e8ff", "#7e22ce"],
  ["#ffe8ec", "#be3654"],
  ["#e7f8ff", "#08789b"],
] as const;

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function boardSvg(visuals: string[]) {
  const width = 1400;
  const height = 1050;
  const cellWidth = width / 4;
  const cellHeight = height / 3;
  const cells = visuals.map((visual, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    const x = column * cellWidth;
    const y = row * cellHeight;
    const [background, accent] = colors[index % colors.length];
    return `
      <g transform="translate(${x} ${y})">
        <rect x="12" y="12" width="${cellWidth - 24}" height="${cellHeight - 24}" rx="34" fill="${background}"/>
        <circle cx="60" cy="58" r="22" fill="${accent}" opacity=".16"/>
        <circle cx="${cellWidth - 58}" cy="${cellHeight - 56}" r="38" fill="${accent}" opacity=".1"/>
        <path d="M42 ${cellHeight - 58} C110 ${cellHeight - 120}, 178 ${cellHeight - 10}, ${cellWidth - 42} ${cellHeight - 82}" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity=".16"/>
        <text x="${cellWidth / 2}" y="${cellHeight / 2 + 34}" text-anchor="middle" font-size="${visual.length > 6 ? 90 : 118}" font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif">${escapeXml(visual)}</text>
      </g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Bộ tranh tình huống giao tiếp">
    <rect width="${width}" height="${height}" fill="#ffffff"/>
    ${cells}
  </svg>`;
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(beginnerConversationUnits.map((unit) =>
    writeFile(path.join(outputDirectory, `${unit.slug}.svg`), boardSvg(unit.visuals), "utf8"),
  ));
  console.log(`Đã tạo ${beginnerConversationUnits.length} bộ tranh giao tiếp tại ${outputDirectory}.`);
}

void main();
