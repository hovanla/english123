import { ActivityType, ContentStatus, Prisma, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { buildPreschoolLessons, preschoolImageUrl } from "../src/lib/preschool-content";
import { buildGradeOneLessons, gradeOneBoardUrl, gradeOneUnits } from "../src/lib/grade-one-content";
import { buildGradeTwoLessons, gradeTwoBoardUrl, gradeTwoUnits } from "../src/lib/grade-two-content";

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
  letters?: string[]; number?: number;
};

const preschoolUnits: UnitSeed[] = [
  { grade: "mam-non", slug: "hello", title: "Hello", theme: "Xin chào", description: "Làm quen lời chào, chữ A và số 1.", letters: ["A"], number: 1, words: [["hello", "xin chào"], ["hi", "chào bạn"], ["goodbye", "tạm biệt"], ["friend", "người bạn"]], sentence: ["Hello, my friend!", "Xin chào, bạn của mình!"], writing: "Nói lời chào với một người bạn." },
  { grade: "mam-non", slug: "family", title: "Family", theme: "Gia đình", description: "Gọi tên người thân và làm quen chữ B.", letters: ["B"], words: [["mother", "mẹ"], ["father", "bố"], ["baby", "em bé"], ["family", "gia đình"]], sentence: ["This is my family.", "Đây là gia đình của mình."], writing: "Giới thiệu một người trong gia đình." },
  { grade: "mam-non", slug: "school", title: "School", theme: "Trường học", description: "Khám phá đồ dùng ở trường, chữ C và số 2.", letters: ["C"], number: 2, words: [["school", "trường học"], ["class", "lớp học"], ["book", "quyển sách"], ["crayon", "bút sáp"]], sentence: ["I have two books.", "Mình có hai quyển sách."], writing: "Chỉ và gọi tên một đồ dùng học tập." },
  { grade: "mam-non", slug: "feelings", title: "Feelings", theme: "Cảm xúc", description: "Nhận biết cảm xúc và làm quen chữ D.", letters: ["D"], words: [["happy", "vui"], ["sad", "buồn"], ["tired", "mệt"], ["angry", "giận"]], sentence: ["I am happy today.", "Hôm nay mình rất vui."], writing: "Nói cảm xúc của em hôm nay." },
  { grade: "mam-non", slug: "toys", title: "Toys", theme: "Đồ chơi", description: "Gọi tên đồ chơi, chữ E và số 3.", letters: ["E"], number: 3, words: [["ball", "quả bóng"], ["doll", "búp bê"], ["kite", "cái diều"], ["train", "tàu đồ chơi"]], sentence: ["I have three toys.", "Mình có ba món đồ chơi."], writing: "Nói tên món đồ chơi em thích." },
  { grade: "mam-non", slug: "colors", title: "Colors", theme: "Màu sắc", description: "Nhận biết màu cơ bản và làm quen chữ F.", letters: ["F"], words: [["red", "màu đỏ"], ["blue", "màu xanh dương"], ["yellow", "màu vàng"], ["green", "màu xanh lá"]], sentence: ["My kite is red.", "Cái diều của mình màu đỏ."], writing: "Chọn và nói màu em yêu thích." },
  { grade: "mam-non", slug: "body", title: "Body", theme: "Cơ thể", description: "Gọi tên bộ phận cơ thể, chữ G và số 4.", letters: ["G"], number: 4, words: [["head", "đầu"], ["hand", "bàn tay"], ["leg", "chân"], ["foot", "bàn chân"]], sentence: ["I have two hands.", "Mình có hai bàn tay."], writing: "Chỉ vào một bộ phận cơ thể và gọi tên." },
  { grade: "mam-non", slug: "face", title: "Face", theme: "Khuôn mặt", description: "Nhận biết các phần trên khuôn mặt và chữ H.", letters: ["H"], words: [["eye", "mắt"], ["ear", "tai"], ["nose", "mũi"], ["mouth", "miệng"]], sentence: ["These are my eyes.", "Đây là đôi mắt của mình."], writing: "Chỉ và gọi tên một phần trên khuôn mặt." },
  { grade: "mam-non", slug: "shapes", title: "Shapes", theme: "Hình dạng", description: "Phân biệt hình dạng, chữ I và số 5.", letters: ["I"], number: 5, words: [["circle", "hình tròn"], ["square", "hình vuông"], ["triangle", "hình tam giác"], ["star", "hình ngôi sao"]], sentence: ["It is a yellow star.", "Đó là một ngôi sao màu vàng."], writing: "Tìm và gọi tên một hình dạng quanh em." },
  { grade: "mam-non", slug: "clothes", title: "Clothes", theme: "Quần áo", description: "Gọi tên trang phục và làm quen chữ J.", letters: ["J"], words: [["shirt", "áo sơ mi"], ["dress", "váy"], ["shoes", "giày"], ["hat", "mũ"]], sentence: ["This is my blue hat.", "Đây là chiếc mũ màu xanh của mình."], writing: "Nói tên một món đồ em đang mặc." },
  { grade: "mam-non", slug: "fruit", title: "Fruit", theme: "Trái cây", description: "Khám phá trái cây, chữ K và số 6.", letters: ["K"], number: 6, words: [["apple", "quả táo"], ["banana", "quả chuối"], ["orange", "quả cam"], ["grape", "quả nho"]], sentence: ["I like red apples.", "Mình thích những quả táo đỏ."], writing: "Nói tên loại quả em thích." },
  { grade: "mam-non", slug: "drinks", title: "Drink", theme: "Đồ uống", description: "Gọi tên đồ uống và làm quen chữ L.", letters: ["L"], words: [["water", "nước"], ["milk", "sữa"], ["juice", "nước ép"], ["tea", "trà"]], sentence: ["I would like some milk.", "Mình muốn một ít sữa."], writing: "Chọn và nói đồ uống em thích." },
  { grade: "mam-non", slug: "snacks", title: "Snack", theme: "Đồ ăn nhẹ", description: "Gọi tên món ăn nhẹ, chữ M và số 7.", letters: ["M"], number: 7, words: [["bread", "bánh mì"], ["cookie", "bánh quy"], ["cake", "bánh ngọt"], ["cheese", "phô mai"]], sentence: ["This cookie is yummy.", "Chiếc bánh quy này thật ngon."], writing: "Nói tên một món ăn nhẹ em biết." },
  { grade: "mam-non", slug: "in-the-room", title: "In the Room", theme: "Trong phòng", description: "Khám phá đồ vật trong phòng và chữ N.", letters: ["N"], words: [["table", "cái bàn"], ["chair", "cái ghế"], ["bed", "cái giường"], ["lamp", "đèn bàn"]], sentence: ["The lamp is on the table.", "Đèn ở trên bàn."], writing: "Chỉ và gọi tên một đồ vật trong phòng." },
  { grade: "mam-non", slug: "at-home", title: "At Home", theme: "Ở nhà", description: "Nói về hoạt động ở nhà, chữ O–P và số 8.", letters: ["O", "P"], number: 8, words: [["eat", "ăn"], ["sleep", "ngủ"], ["read", "đọc"], ["play", "chơi"]], sentence: ["I am reading at home.", "Mình đang đọc sách ở nhà."], writing: "Làm động tác và nói một hoạt động ở nhà." },
  { grade: "mam-non", slug: "i-can", title: "I Can", theme: "Mình có thể", description: "Nói về khả năng và làm quen chữ Q–R.", letters: ["Q", "R"], words: [["run", "chạy"], ["jump", "nhảy"], ["sing", "hát"], ["dance", "nhảy múa"]], sentence: ["I can run and jump.", "Mình có thể chạy và nhảy."], writing: "Làm động tác và nói điều em có thể làm." },
  { grade: "mam-non", slug: "pets", title: "Pet", theme: "Vật nuôi", description: "Gọi tên vật nuôi, chữ S–T và số 9.", letters: ["S", "T"], number: 9, words: [["dog", "con chó"], ["cat", "con mèo"], ["fish", "con cá"], ["bird", "con chim"]], sentence: ["My little cat can jump.", "Chú mèo nhỏ của mình có thể nhảy."], writing: "Nói tên một vật nuôi em thích." },
  { grade: "mam-non", slug: "the-farm", title: "The Farm", theme: "Nông trại", description: "Khám phá con vật nông trại và chữ U–V.", letters: ["U", "V"], words: [["cow", "con bò"], ["duck", "con vịt"], ["pig", "con lợn"], ["sheep", "con cừu"]], sentence: ["The duck is on the farm.", "Con vịt ở trong nông trại."], writing: "Bắt chước tiếng và gọi tên một con vật." },
  { grade: "mam-non", slug: "the-zoo", title: "The Zoo", theme: "Vườn thú", description: "Khám phá động vật hoang dã, chữ W–X và số 10.", letters: ["W", "X"], number: 10, words: [["lion", "sư tử"], ["tiger", "hổ"], ["monkey", "khỉ"], ["elephant", "voi"]], sentence: ["That is a big elephant.", "Đó là một chú voi to."], writing: "Nói tên một con vật trong vườn thú." },
  { grade: "mam-non", slug: "the-park", title: "The Park", theme: "Công viên", description: "Vui chơi ở công viên và hoàn thành chữ Y–Z.", letters: ["Y", "Z"], words: [["slide", "cầu trượt"], ["swing", "xích đu"], ["tree", "cây"], ["flower", "bông hoa"]], sentence: ["Let us play in the park.", "Chúng mình cùng chơi trong công viên nhé."], writing: "Nói hoạt động em thích ở công viên." },
];

const units: UnitSeed[] = [
  ...preschoolUnits,
  ...gradeOneUnits.map((unit): UnitSeed => ({ grade: "lop-1", slug: unit.slug, title: unit.title, theme: unit.theme, description: unit.description, words: unit.words, sentence: [unit.sentences[0][0], unit.sentences[0][1]], writing: "" })),
  ...gradeTwoUnits.map((unit): UnitSeed => ({ grade: "lop-2", slug: unit.slug, title: unit.title, theme: unit.theme, description: unit.description, words: unit.words, sentence: [unit.sentences[0][0], unit.sentences[0][1]], writing: "" })),
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
  const preschoolCourse = await prisma.course.create({ data: { gradeId: grades.get("mam-non")!, slug: "tieng-anh-mam-non", title: "Tiếng Anh Mầm non", description: "Lộ trình 20 unit cho trẻ 3–6 tuổi: từ vựng qua hình ảnh, nghe đoán và mẫu câu phản xạ đời thực.", order: 1, status: PUBLISHED } });
  courses.set("mam-non", preschoolCourse.id);
  for (let number = 1; number <= 5; number += 1) {
    const slug = `lop-${number}`;
    const course = await prisma.course.create({ data: { gradeId: grades.get(slug)!, slug: `tieng-anh-${slug}`, title: `Tiếng Anh Lớp ${number}`, description: `Lộ trình tiếng Anh nền tảng dành cho học sinh Lớp ${number}.`, order: 1, status: PUBLISHED } });
    courses.set(slug, course.id);
  }

  const orderByGrade = new Map<string, number>();
  for (const unit of units) {
    const order = (orderByGrade.get(unit.grade) || 0) + 1;
    orderByGrade.set(unit.grade, order);
    const gradeOneSeed = unit.grade === "lop-1" ? gradeOneUnits.find((item) => item.slug === unit.slug) : undefined;
    const gradeTwoSeed = unit.grade === "lop-2" ? gradeTwoUnits.find((item) => item.slug === unit.slug) : undefined;
    const lessons = unit.grade === "mam-non" ? buildPreschoolLessons(unit) : gradeOneSeed ? buildGradeOneLessons(gradeOneSeed) : gradeTwoSeed ? buildGradeTwoLessons(gradeTwoSeed) : activitiesFor(unit);
    await prisma.unit.create({
      data: {
        courseId: courses.get(unit.grade)!, slug: unit.slug, title: unit.title, theme: unit.theme, description: unit.grade === "mam-non" ? `Học từ vựng và mẫu câu về ${unit.theme.toLowerCase()} qua hình ảnh, âm thanh và tình huống đời thực.` : unit.description, imageUrl: unit.grade === "mam-non" ? preschoolImageUrl(unit.slug) : gradeOneSeed ? gradeOneBoardUrl(unit.slug) : gradeTwoSeed ? gradeTwoBoardUrl(unit.slug) : imageUrl, order, status: PUBLISHED,
        lessons: { create: lessons.map((lesson, lessonIndex) => ({ slug: lesson.slug, title: lesson.title, description: lesson.description, order: lessonIndex + 1, status: PUBLISHED, estimatedMinutes: unit.grade === "mam-non" ? (lessonIndex === 0 ? 9 : 7) : gradeOneSeed ? (lessonIndex === 0 ? 6 : 5) : gradeTwoSeed ? (lessonIndex === 0 ? 7 : 5) : lessonIndex === 2 ? 10 : 7, activities: { create: lesson.activities.map((activity) => ({ ...activity, payload: activity.payload as Prisma.InputJsonValue, status: PUBLISHED })) } })) },
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
  console.log(`Đã tạo ${gradeShells.length} cấp lớp, 6 khóa học và ${units.length} unit (20 unit Mầm non, 20 unit Lớp 1, 20 unit Lớp 2).`);
}

main().finally(() => prisma.$disconnect());
