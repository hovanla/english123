import fs from "node:fs/promises";
import path from "node:path";
import initSqlJs, { Database } from "sql.js";
import { ActivityType, ContentStatus, Prisma, PrismaClient } from "@prisma/client";

type Row = Record<string, string | number | null>;
const prisma = new PrismaClient();

function rows(db: Database, sql: string, params: Array<string | number> = []): Row[] {
  const statement = db.prepare(sql); statement.bind(params); const result: Row[] = [];
  while (statement.step()) result.push(statement.getAsObject() as Row);
  statement.free(); return result;
}

async function main() {
  const legacyPath = path.resolve(process.env.LEGACY_SQLITE_PATH || "prisma/dev.db");
  const bytes = await fs.readFile(legacyPath); const SQL = await initSqlJs(); const db = new SQL.Database(bytes);
  const gradeRows = rows(db, "SELECT * FROM Grade ORDER BY `order`");
  for (const grade of gradeRows) {
    await prisma.grade.upsert({ where: { slug: String(grade.slug) }, create: { id: String(grade.id), slug: String(grade.slug), name: String(grade.name), level: String(grade.level), description: String(grade.description), order: Number(grade.order) }, update: { name: String(grade.name), level: String(grade.level), description: String(grade.description), order: Number(grade.order) } });
  }

  for (const unit of rows(db, "SELECT * FROM Unit ORDER BY gradeId, `order`")) {
    const grade = gradeRows.find((item) => item.id === unit.gradeId); if (!grade) continue;
    const course = await prisma.course.upsert({ where: { gradeId_slug: { gradeId: String(unit.gradeId), slug: `tieng-anh-${grade.slug}` } }, create: { gradeId: String(unit.gradeId), slug: `tieng-anh-${grade.slug}`, title: `Tiếng Anh ${grade.name}`, description: `Nội dung được chuyển từ phiên bản MVP.`, order: 1, status: ContentStatus.DRAFT }, update: {} });
    const targetUnit = await prisma.unit.upsert({ where: { courseId_slug: { courseId: course.id, slug: String(unit.slug) } }, create: { id: String(unit.id), courseId: course.id, slug: String(unit.slug), title: String(unit.title), theme: String(unit.theme), description: String(unit.description), imageUrl: unit.imageUrl ? String(unit.imageUrl) : null, order: Number(unit.order), status: ContentStatus.DRAFT }, update: {} });
    const lessonData = [
      { slug: "tu-vung-cu", title: "Từ vựng", description: "Từ vựng chuyển từ MVP.", table: "Vocabulary", type: ActivityType.FLASHCARD },
      { slug: "mau-cau-cu", title: "Mẫu câu", description: "Mẫu câu chuyển từ MVP.", table: "Sentence", type: ActivityType.SENTENCE },
      { slug: "ky-nang-cu", title: "Luyện kỹ năng", description: "Nghe, nói, viết và game chuyển từ MVP.", table: "skills", type: ActivityType.LISTEN_TYPE },
    ];
    for (const [lessonIndex, definition] of lessonData.entries()) {
      const lesson = await prisma.lesson.upsert({ where: { unitId_slug: { unitId: targetUnit.id, slug: definition.slug } }, create: { unitId: targetUnit.id, slug: definition.slug, title: definition.title, description: definition.description, order: lessonIndex + 1, status: ContentStatus.DRAFT }, update: {} });
      let activityRows: Array<{ id: string; type: ActivityType; title: string; instruction: string; payload: Prisma.InputJsonValue }> = [];
      if (definition.table === "Vocabulary") activityRows = rows(db, "SELECT * FROM Vocabulary WHERE unitId = ?", [String(unit.id)]).map((item) => ({ id: String(item.id), type: ActivityType.FLASHCARD, title: String(item.word), instruction: String(item.prompt || "Học từ mới."), payload: { prompt: String(item.prompt || item.meaning), front: String(item.word), back: String(item.meaning), example: String(item.example || "") } }));
      if (definition.table === "Sentence") activityRows = rows(db, "SELECT * FROM Sentence WHERE unitId = ?", [String(unit.id)]).map((item) => ({ id: String(item.id), type: ActivityType.SENTENCE, title: String(item.text), instruction: String(item.situation || "Luyện mẫu câu."), payload: { prompt: String(item.meaning), target: String(item.text), acceptedAnswers: [String(item.text)], usage: String(item.usage || "") } }));
      if (definition.table === "skills") {
        activityRows = [
          ...rows(db, "SELECT * FROM ListeningItem WHERE unitId = ?", [String(unit.id)]).map((item) => ({ id: String(item.id), type: ActivityType.LISTEN_TYPE, title: "Nghe và viết", instruction: "Nghe rồi nhập lại câu.", payload: { prompt: String(item.meaning), text: String(item.text), acceptedAnswers: [String(item.text)] } as Prisma.InputJsonValue })),
          ...rows(db, "SELECT * FROM SpeakingPrompt WHERE unitId = ?", [String(unit.id)]).map((item) => ({ id: String(item.id), type: ActivityType.SPEAK_REPEAT, title: "Nói theo", instruction: String(item.tip), payload: { prompt: String(item.meaning), target: String(item.text), translation: String(item.meaning) } as Prisma.InputJsonValue })),
          ...rows(db, "SELECT * FROM WritingPrompt WHERE unitId = ?", [String(unit.id)]).map((item) => ({ id: String(item.id), type: ActivityType.SHORT_WRITING, title: "Viết ngắn", instruction: String(item.prompt), payload: { prompt: String(item.prompt), minWords: Number(item.minWords), keywords: String(item.keywords).split(",").map((value) => value.trim()).filter(Boolean) } as Prisma.InputJsonValue })),
          ...rows(db, "SELECT * FROM GameItem WHERE unitId = ?", [String(unit.id)]).map((item) => { const options = String(item.options).split(",").map((text, index) => ({ id: `option-${index}`, text: text.trim() })); const correct = options.find((option) => option.text === String(item.answer))?.id || "option-0"; return { id: String(item.id), type: ActivityType.MULTIPLE_CHOICE, title: "Trò chơi", instruction: String(item.prompt), payload: { prompt: String(item.prompt), options, correctOptionId: correct } as Prisma.InputJsonValue }; }),
        ];
      }
      for (const [order, activity] of activityRows.entries()) await prisma.activity.upsert({ where: { id: activity.id }, create: { ...activity, lessonId: lesson.id, order: order + 1, status: ContentStatus.DRAFT }, update: {} });
    }
    console.log(`Đã chuyển unit ${unit.slug}; ID Grade, Unit và nội dung cũ được giữ nguyên.`);
  }
  db.close();
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
