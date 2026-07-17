import fs from "node:fs";
import path from "node:path";
import initSqlJs from "sql.js";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");

const statements = [
  `PRAGMA foreign_keys = ON`,
  `CREATE TABLE IF NOT EXISTS Grade (
    id TEXT NOT NULL PRIMARY KEY,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    level TEXT NOT NULL,
    description TEXT NOT NULL,
    "order" INTEGER NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS Grade_slug_key ON Grade(slug)`,
  `CREATE TABLE IF NOT EXISTS Unit (
    id TEXT NOT NULL PRIMARY KEY,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    theme TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    gradeId TEXT NOT NULL,
    CONSTRAINT Unit_gradeId_fkey FOREIGN KEY (gradeId) REFERENCES Grade(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS Unit_gradeId_slug_key ON Unit(gradeId, slug)`,
  `CREATE TABLE IF NOT EXISTS Vocabulary (
    id TEXT NOT NULL PRIMARY KEY,
    unitId TEXT NOT NULL,
    word TEXT NOT NULL,
    meaning TEXT NOT NULL,
    prompt TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    example TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT Vocabulary_unitId_fkey FOREIGN KEY (unitId) REFERENCES Unit(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS Sentence (
    id TEXT NOT NULL PRIMARY KEY,
    unitId TEXT NOT NULL,
    text TEXT NOT NULL,
    meaning TEXT NOT NULL,
    situation TEXT NOT NULL,
    usage TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT Sentence_unitId_fkey FOREIGN KEY (unitId) REFERENCES Unit(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS ListeningItem (
    id TEXT NOT NULL PRIMARY KEY,
    unitId TEXT NOT NULL,
    text TEXT NOT NULL,
    meaning TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ListeningItem_unitId_fkey FOREIGN KEY (unitId) REFERENCES Unit(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS SpeakingPrompt (
    id TEXT NOT NULL PRIMARY KEY,
    unitId TEXT NOT NULL,
    text TEXT NOT NULL,
    meaning TEXT NOT NULL,
    tip TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT SpeakingPrompt_unitId_fkey FOREIGN KEY (unitId) REFERENCES Unit(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS WritingPrompt (
    id TEXT NOT NULL PRIMARY KEY,
    unitId TEXT NOT NULL,
    prompt TEXT NOT NULL,
    minWords INTEGER NOT NULL,
    keywords TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT WritingPrompt_unitId_fkey FOREIGN KEY (unitId) REFERENCES Unit(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS GameItem (
    id TEXT NOT NULL PRIMARY KEY,
    unitId TEXT NOT NULL,
    type TEXT NOT NULL,
    prompt TEXT NOT NULL,
    answer TEXT NOT NULL,
    options TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT GameItem_unitId_fkey FOREIGN KEY (unitId) REFERENCES Unit(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS ReviewItem (
    id TEXT NOT NULL PRIMARY KEY,
    itemType TEXT NOT NULL,
    contentId TEXT NOT NULL,
    title TEXT NOT NULL,
    answer TEXT NOT NULL,
    imageUrl TEXT,
    dueAt DATETIME NOT NULL,
    intervalIndex INTEGER NOT NULL DEFAULT 0,
    completedCount INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS ReviewItem_itemType_contentId_key ON ReviewItem(itemType, contentId)`,
];

async function main() {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const SQL = await initSqlJs();
  const db = fs.existsSync(dbPath) ? new SQL.Database(fs.readFileSync(dbPath)) : new SQL.Database();
  statements.forEach((statement) => db.run(statement));
  fs.writeFileSync(dbPath, Buffer.from(db.export()));
  db.close();
  console.log(`SQLite database ready at ${dbPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
