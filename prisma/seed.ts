import { ActivityType, ContentStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

const PUBLISHED = ContentStatus.PUBLISHED;
const imageUrl = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80";

const gradeShells = [
  ["mam-non", "Mầm non", "Khởi đầu", "Làm quen âm thanh, hình ảnh và từ đơn giản.", 0],
  ["lop-1", "Lớp 1", "Tiểu học", "Từ vựng quen thuộc và câu giao tiếp ngắn.", 1],
  ["lop-2", "Lớp 2", "Tiểu học", "Mở rộng từ vựng về gia đình, trường học và thói quen.", 2],
  ["lop-3", "Lớp 3", "Tiểu học", "Đọc câu ngắn, nghe câu đơn và viết câu cơ bản.", 3],
  ["lop-4", "Lớp 4", "Tiểu học", "Tăng vốn từ theo chủ đề và luyện hỏi đáp ngắn.", 4],
  ["lop-5", "Lớp 5", "Tiểu học", "Củng cố giao tiếp và viết đoạn văn ngắn.", 5],
  ["lop-6", "Lớp 6", "THCS", "Nội dung đang được biên soạn.", 6],
  ["lop-7", "Lớp 7", "THCS", "Nội dung đang được biên soạn.", 7],
  ["lop-8", "Lớp 8", "THCS", "Nội dung đang được biên soạn.", 8],
  ["lop-9", "Lớp 9", "THCS", "Nội dung đang được biên soạn.", 9],
  ["lop-10", "Lớp 10", "THPT", "Nội dung đang được biên soạn.", 10],
  ["lop-11", "Lớp 11", "THPT", "Nội dung đang được biên soạn.", 11],
  ["lop-12", "Lớp 12", "THPT", "Nội dung đang được biên soạn.", 12],
] as const;

type UnitSeed = {
  grade: string; slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>; sentence: [string, string]; writing: string;
};

const units: UnitSeed[] = [
  { grade: "lop-1", slug: "hello-friends", title: "Hello, Friends!", theme: "Chào hỏi", description: "Chào hỏi và giới thiệu bản thân.", words: [["hello", "xin chào"], ["friend", "người bạn"], ["name", "tên"], ["goodbye", "tạm biệt"]], sentence: ["My name is Lan.", "Tên mình là Lan."], writing: "Viết một câu giới thiệu tên của em." },
  { grade: "lop-1", slug: "colors-around-me", title: "Colors Around Me", theme: "Màu sắc", description: "Nhận biết màu sắc quanh em.", words: [["red", "màu đỏ"], ["blue", "màu xanh dương"], ["yellow", "màu vàng"], ["green", "màu xanh lá"]], sentence: ["It is a red ball.", "Đó là một quả bóng màu đỏ."], writing: "Viết một câu về màu em yêu thích." },
  { grade: "lop-2", slug: "my-family", title: "My Family", theme: "Gia đình", description: "Gọi tên và giới thiệu người thân.", words: [["mother", "mẹ"], ["father", "bố"], ["sister", "chị hoặc em gái"], ["brother", "anh hoặc em trai"]], sentence: ["This is my mother.", "Đây là mẹ của mình."], writing: "Viết hai câu ngắn về gia đình em." },
  { grade: "lop-2", slug: "school-things", title: "School Things", theme: "Đồ dùng học tập", description: "Nói về những vật dụng trong lớp.", words: [["book", "quyển sách"], ["pencil", "bút chì"], ["ruler", "thước kẻ"], ["bag", "cặp sách"]], sentence: ["This is my new book.", "Đây là quyển sách mới của mình."], writing: "Viết hai đồ dùng có trong cặp của em." },
  { grade: "lop-3", slug: "daily-routines", title: "My Day", theme: "Hoạt động hằng ngày", description: "Kể về các hoạt động trong ngày.", words: [["wake up", "thức dậy"], ["breakfast", "bữa sáng"], ["study", "học"], ["sleep", "ngủ"]], sentence: ["I get up at seven.", "Mình thức dậy lúc bảy giờ."], writing: "Viết ba câu về một ngày của em." },
  { grade: "lop-3", slug: "fun-animals", title: "Amazing Animals", theme: "Động vật", description: "Mô tả những con vật quen thuộc.", words: [["tiger", "con hổ"], ["monkey", "con khỉ"], ["elephant", "con voi"], ["rabbit", "con thỏ"]], sentence: ["The elephant is big.", "Con voi rất to."], writing: "Mô tả một con vật em thích." },
  { grade: "lop-4", slug: "food-and-drinks", title: "Food and Drinks", theme: "Đồ ăn và thức uống", description: "Nói về món ăn và sở thích.", words: [["rice", "cơm"], ["chicken", "thịt gà"], ["water", "nước"], ["juice", "nước ép"]], sentence: ["I would like some juice.", "Mình muốn một ít nước ép."], writing: "Viết về bữa ăn em yêu thích." },
  { grade: "lop-4", slug: "places-in-town", title: "Around Town", theme: "Nơi chốn", description: "Hỏi và chỉ đường đến nơi quen thuộc.", words: [["library", "thư viện"], ["hospital", "bệnh viện"], ["park", "công viên"], ["market", "chợ"]], sentence: ["The library is next to the park.", "Thư viện ở cạnh công viên."], writing: "Mô tả một địa điểm gần nhà em." },
  { grade: "lop-5", slug: "healthy-habits", title: "Healthy Habits", theme: "Thói quen lành mạnh", description: "Nói về cách giữ cơ thể khỏe mạnh.", words: [["exercise", "tập thể dục"], ["healthy", "khỏe mạnh"], ["vegetable", "rau củ"], ["rest", "nghỉ ngơi"]], sentence: ["You should exercise every day.", "Bạn nên tập thể dục mỗi ngày."], writing: "Viết ba lời khuyên để sống khỏe." },
  { grade: "lop-5", slug: "future-dreams", title: "Future Dreams", theme: "Ước mơ", description: "Nói về nghề nghiệp và ước mơ.", words: [["doctor", "bác sĩ"], ["teacher", "giáo viên"], ["engineer", "kỹ sư"], ["artist", "họa sĩ"]], sentence: ["I want to be a teacher.", "Mình muốn trở thành giáo viên."], writing: "Viết về nghề nghiệp em mơ ước." },
];

function activitiesFor(unit: UnitSeed) {
  const [sentence, translation] = unit.sentence;
  return [
    {
      slug: "tu-vung", title: "Từ vựng chủ đề", description: "Học và ghi nhớ từ mới.", activities: [
        ...unit.words.map(([word, meaning], index) => ({ type: ActivityType.FLASHCARD, title: `${word} — ${meaning}`, instruction: "Lật thẻ, nghe và đánh dấu khi em đã nhớ.", order: index + 1, payload: { prompt: `Em có nhớ từ ${word} không?`, front: word, back: meaning, example: `I know the word ${word}.` } })),
        { type: ActivityType.MATCHING, title: "Ghép từ với nghĩa", instruction: "Ghép mỗi từ tiếng Anh với nghĩa đúng.", order: unit.words.length + 1, payload: { prompt: "Hãy ghép đúng tất cả các cặp.", pairs: unit.words.map(([left, right]) => ({ left, right })) } },
      ],
    },
    {
      slug: "mau-cau", title: "Mẫu câu hữu ích", description: "Hiểu và dùng mẫu câu trong tình huống.", activities: [
        { type: ActivityType.SENTENCE, title: sentence, instruction: "Đọc mẫu câu rồi nhập lại câu tiếng Anh.", order: 1, payload: { prompt: translation, target: sentence, acceptedAnswers: [sentence], usage: `Dùng khi nói về chủ đề ${unit.theme.toLowerCase()}.` } },
        { type: ActivityType.MULTIPLE_CHOICE, title: "Chọn nghĩa đúng", instruction: "Chọn nghĩa tiếng Việt phù hợp.", order: 2, payload: { prompt: sentence, options: [{ id: "correct", text: translation }, { id: "other", text: "Mình chưa biết câu này." }, { id: "wrong", text: "Hôm nay trời rất đẹp." }], correctOptionId: "correct", explanation: translation } },
      ],
    },
    {
      slug: "luyen-ky-nang", title: "Luyện kỹ năng", description: "Nghe, nói và viết với nội dung vừa học.", activities: [
        { type: ActivityType.LISTEN_CHOOSE, title: "Nghe và chọn", instruction: "Bấm nghe rồi chọn câu đúng.", order: 1, payload: { prompt: "Em nghe thấy câu nào?", text: sentence, options: [{ id: "correct", text: sentence }, { id: "wrong", text: "How are you today?" }], correctOptionId: "correct" } },
        { type: ActivityType.SPEAK_REPEAT, title: "Nói theo", instruction: "Nghe và nói lại câu mẫu.", order: 2, payload: { prompt: "Nói rõ từng từ.", target: sentence, translation } },
        { type: ActivityType.SHORT_WRITING, title: "Viết của em", instruction: unit.writing, order: 3, payload: { prompt: unit.writing, minWords: unit.grade === "lop-1" ? 3 : 6, keywords: unit.words.slice(0, 3).map(([word]) => word) } },
      ],
    },
  ];
}

async function main() {
  await prisma.productEvent.deleteMany();
  await prisma.reviewSchedule.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.activityAttempt.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.course.deleteMany();
  await prisma.learnerProfile.deleteMany();
  await prisma.grade.deleteMany();

  const grades = new Map<string, string>();
  for (const [slug, name, level, description, order] of gradeShells) {
    const grade = await prisma.grade.create({ data: { slug, name, level, description, order } });
    grades.set(slug, grade.id);
  }

  const courses = new Map<string, string>();
  for (let number = 1; number <= 5; number += 1) {
    const slug = `lop-${number}`;
    const course = await prisma.course.create({ data: { gradeId: grades.get(slug)!, slug: `tieng-anh-${slug}`, title: `Tiếng Anh Lớp ${number}`, description: `Lộ trình tiếng Anh nền tảng dành cho học sinh Lớp ${number}.`, order: 1, status: PUBLISHED } });
    courses.set(slug, course.id);
  }

  for (const [index, unit] of units.entries()) {
    await prisma.unit.create({
      data: {
        courseId: courses.get(unit.grade)!, slug: unit.slug, title: unit.title, theme: unit.theme, description: unit.description, imageUrl, order: (index % 2) + 1, status: PUBLISHED,
        lessons: { create: activitiesFor(unit).map((lesson, lessonIndex) => ({ slug: lesson.slug, title: lesson.title, description: lesson.description, order: lessonIndex + 1, status: PUBLISHED, estimatedMinutes: lessonIndex === 2 ? 10 : 7, activities: { create: lesson.activities.map((activity) => ({ ...activity, status: PUBLISHED })) } })) },
      },
    });
  }

  if (process.env.BOOTSTRAP_ADMIN_EMAIL && process.env.BOOTSTRAP_ADMIN_PASSWORD) {
    await prisma.user.upsert({
      where: { email: process.env.BOOTSTRAP_ADMIN_EMAIL.toLowerCase() },
      create: { email: process.env.BOOTSTRAP_ADMIN_EMAIL.toLowerCase(), name: "Quản trị English123", passwordHash: await bcrypt.hash(process.env.BOOTSTRAP_ADMIN_PASSWORD, 12), role: Role.ADMIN },
      update: { role: Role.ADMIN, passwordHash: await bcrypt.hash(process.env.BOOTSTRAP_ADMIN_PASSWORD, 12) },
    });
  }
  console.log(`Đã tạo ${gradeShells.length} cấp lớp, 5 khóa học và ${units.length} unit pilot.`);
}

main().finally(() => prisma.$disconnect());
