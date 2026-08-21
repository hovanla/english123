import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { basicCommunicationUnits } from "../src/lib/basic-communication-content";

const outputDirectory = path.join(process.cwd(), "public", "basic-communication", "boards");
const colors = [["#ecfdf5", "#047857"], ["#eff6ff", "#1d4ed8"], ["#fff7ed", "#c2410c"], ["#fdf4ff", "#a21caf"], ["#fefce8", "#a16207"]] as const;
const sceneOverrides: Record<string, string> = {
  tall: "🧍 ↕️ 🧍", short: "🧍 ↕️ 🧒", curly: "👩‍🦱", "basic-communication-describing-people|straight": "👩‍🦰 ➖", friendly: "🙂🤝🙂", quiet: "🤫📚", helpful: "🙂🤲📦", young: "👧🌱", recognize: "👀 ➜ 🙂",
  "basic-communication-clothes|fit": "👕✅🙂", "basic-communication-sports-exercise|fit": "🙂💪❤️", wear: "🙂 ➜ 👕", casual: "👕👖", formal: "🤵🏢",
  "o'clock": "🕘 9:00", quarter: "🕘 9:15", half: "🕘 9:30", early: "🙂 ➜ 🕘", late: "🕘 ➜ 🏃", schedule: "🗓️✅✅", appointment: "🙂📅🙂", start: "🚦▶️", finish: "🏁✅", around: "🕘 ≈",
  date: "🗓️ 12", calendar: "🗓️📌", birthday: "🗓️🎂", anniversary: "🗓️💍", weekday: "🏢 Mon–Fri", weekend: "Sat–Sun 🌤️", month: "🗓️ ×12", year: "Jan ➜ Dec", next: "1 ➜ 2", available: "🗓️ 🟢",
  job: "🙂💼🏢", company: "👥🏢", office: "🖥️🪑🏢", customer: "🙂🛍️", manager: "👔 ➜ 👥", shift: "🌞🔄🌙", responsibility: "🙂📋✅",
  exercise: "🏃💪", team: "🙂🙂🙂🏆", practice: "🔁⚽🎯", often: "🗓️🔁", join: "🙂 ➕ 👥",
  location: "🗺️📍", near: "🏠↔️🏪", opposite: "🏠 ↔️ 🏦", between: "🏠 🏪 🏠", "next to": "🏠🏪", corner: "🛣️↱🏪", entrance: "🏢🚪➡️", floor: "🏢 1️⃣2️⃣3️⃣", building: "🏢🏙️", map: "🗺️📍➡️",
  married: "🙂💍🙂", live: "🙂🏠📍",
  "free time": "🕊️🎧📚", recommend: "🙂👍➡️⭐", concert: "🎤🎵👥", performance: "🎭👏", ticket: "🎫➡️🎭",
  price: "👜🏷️❓", cost: "👜 = 💵", cheap: "🏷️⬇️", expensive: "🏷️⬆️", discount: "100 ➜ 70", sale: "🏬🔻🔻", change: "💵➡️🪙", afford: "👛✅🛍️",
  reservation: "📅✅🍽️", order: "🙂📝🍽️", starter: "🥗 ➜ 🍛", "main course": "🍛⭐", bill: "🧾💳", allergy: "🥜🚫⚠️",
  conversation: "🙂💬🙂", local: "📍🏘️", event: "🗓️🎪👥", interesting: "👀✨", busy: "🙂📋📋⏰", enjoy: "🙂❤️🎵", meet: "🙂🤝🙂", chat: "🙂💬🙂", anyway: "💬 ➜ 🚪",
  vacation: "🏢➡️🏖️", trip: "📍✈️📍", book: "📅✅🏨", sightseeing: "🚌📸🏛️", relax: "🧘🏖️",
  rent: "🏠🔑💵", landlord: "🙂🔑🏠", neighbor: "🏠🙂↔️🙂🏠", furnished: "🏠🛋️🛏️", noise: "🏠🔊⚠️", parking: "🚗🅿️🏢", maintenance: "🏢🛠️",
  movie: "🎬🍿", plot: "📖➡️🎬", ending: "🎬➡️🔚", funny: "🎬😂",
  forecast: "📺🌤️➡️🌧️", temperature: "🌡️ 30°", clear: "☁️➡️☀️", shower: "☀️🌦️☀️",
  size: "👕 S M L", "try on": "👕➡️🙂🪞", receipt: "🛍️🧾", return: "🛍️↩️🏬", exchange: "👕🔄👕", aisle: "🛒↔️🛒", checkout: "🛒➡️💳", shop: "🙂➡️🏬",
  call: "🙂📞🙂", answer: "📞➡️✅", message: "📞➡️✉️", voicemail: "📞🔊💾", hold: "📞⏸️", line: "📞〰️📞", signal: "📱📶", repeat: "💬❓🔁", "call back": "📞↩️",
  shape: "⭕ 🔺 ⬜", material: "🪵 🔩 🧵", wooden: "🪵➡️🪑", metal: "🔩➡️🔧", heavy: "📦🏋️", light: "📦🪶", useful: "🧰✅", purpose: "❓ ➜ 🧰",
  "basic-communication-directions|straight": "🙂⬆️📍", turn: "🙂↪️📍", cross: "🙂🚸🛣️", "traffic lights": "🙂🚦🛣️", intersection: "🛣️➕🛣️", block: "🏢🏢🏢", past: "🙂➡️🏦➡️", destination: "🙂➡️📍✅",
  friend: "🙂💛🙂", colleague: "🙂💼🙂", classmate: "🙂📚🙂", know: "🙂💭🙂", together: "🙂➕🙂", close: "🙂💛🙂", "keep in touch": "🙂📱↔️📱🙂", introduce: "🙂➡️🙂🤝🙂",
  tired: "😴🔋⬇️", pain: "🙂⚡🤕", medicine: "🤒➡️💊", rest: "🤒➡️🛌", doctor: "🤒➡️🧑‍⚕️",
  confirm: "❓➡️✅", punctual: "🙂🕘✅", occupation: "🙂💼", review: "📚🔁✅", invite: "🙂🙋➡️👥", locate: "🗺️🔍📍", reserve: "📅✅", describe: "👀➡️💬", direction: "🙂🧭➡️📍", relationship: "🙂🔗🙂", advice: "🙂💡🙂",
};

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function boardSvg(unit: (typeof basicCommunicationUnits)[number]) {
  const cells = unit.visuals.map((visual, index) => {
    const x = (index % 5) * 300;
    const y = Math.floor(index / 5) * 300;
    const [background, accent] = colors[index % colors.length];
    const scene = index < unit.words.length ? sceneOverrides[`${unit.slug}|${unit.words[index][0]}`] ?? sceneOverrides[unit.words[index][0]] ?? visual : visual;
    return `<g transform="translate(${x} ${y})"><rect x="10" y="10" width="280" height="280" rx="34" fill="${background}"/><circle cx="48" cy="48" r="22" fill="${accent}" opacity=".13"/><circle cx="250" cy="56" r="30" fill="${accent}" opacity=".08"/><circle cx="54" cy="224" r="34" fill="#fff" opacity=".55"/><circle cx="246" cy="218" r="46" fill="#fff" opacity=".45"/><path d="M30 232 C88 182,154 266,270 190" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round" opacity=".14"/><text x="150" y="175" text-anchor="middle" font-size="${scene.length > 18 ? 26 : scene.length > 14 ? 30 : scene.length > 10 ? 36 : scene.length > 6 ? 48 : 84}" font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji','Segoe UI',sans-serif">${escapeXml(scene)}</text></g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="900" viewBox="0 0 1500 900" role="img" aria-label="Bộ tranh giao tiếp cơ bản"><rect width="1500" height="900" fill="#fff"/>${cells}</svg>`;
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(basicCommunicationUnits.map((unit) => writeFile(path.join(outputDirectory, `${unit.slug}.svg`), boardSvg(unit), "utf8")));
  console.log(`Đã tạo ${basicCommunicationUnits.length} bộ tranh giao tiếp cơ bản tại ${outputDirectory}.`);
}

void main();
