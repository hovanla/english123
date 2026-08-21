import { ActivityType } from "@prisma/client";
import { buildSecondaryReactionActivities } from "./secondary-reaction";

type ActivitySeed = { type: ActivityType; title: string; instruction: string; order: number; payload: Record<string, unknown> };
export type GradeSevenLessonSeed = { slug: string; title: string; description: string; activities: ActivitySeed[] };
export type GradeSevenUnitSeed = {
  slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeSevenUnits: GradeSevenUnitSeed[] = [
  {
    slug: "back-to-school", title: "Back to School", theme: "Trở lại trường học", description: "Gặp lại bạn bè, làm quen bạn mới và nói về khoảng cách đến trường.",
    words: [["classmate", "bạn cùng lớp"], ["semester", "học kỳ"], ["timetable", "thời khóa biểu"], ["uniform", "đồng phục"], ["subject", "môn học"], ["principal", "hiệu trưởng"], ["library", "thư viện"], ["laboratory", "phòng thí nghiệm"], ["schoolyard", "sân trường"], ["bicycle", "xe đạp"], ["nervous", "lo lắng"], ["excited", "háo hức"]],
    sentences: [["Nice to see you again.", "Rất vui được gặp lại bạn.", "Em gặp lại một người bạn sau kỳ nghỉ."], ["Hi, I'm Lan. I'm new here.", "Chào bạn, mình là Lan. Mình mới đến đây.", "Em tự giới thiệu trong ngày đầu ở trường mới."], ["How far is it from your home to school?", "Từ nhà bạn đến trường bao xa?", "Em hỏi quãng đường đi học của bạn."], ["My favorite subject is English.", "Môn học yêu thích của mình là tiếng Anh.", "Hai bạn đang nói về môn học yêu thích."]],
  },
  {
    slug: "personal-information", title: "Personal Information", theme: "Thông tin cá nhân", description: "Hỏi địa chỉ, số điện thoại, ngày sinh và mời bạn đến dự tiệc.",
    words: [["address", "địa chỉ"], ["phone number", "số điện thoại"], ["birthday", "sinh nhật"], ["date", "ngày"], ["month", "tháng"], ["invitation", "lời mời"], ["party", "bữa tiệc"], ["telephone", "điện thoại"], ["directory", "danh bạ"], ["call", "gọi điện"], ["invite", "mời"], ["arrive", "đến"]],
    sentences: [["What's your address?", "Địa chỉ của bạn là gì?", "Em cần gửi thiệp mời đến nhà bạn."], ["What's your phone number?", "Số điện thoại của bạn là gì?", "Hai bạn trao đổi cách liên lạc."], ["When is your birthday?", "Sinh nhật của bạn vào khi nào?", "Em muốn ghi ngày sinh của bạn vào lịch."], ["Would you like to come to my party?", "Bạn có muốn đến dự tiệc của mình không?", "Em mời bạn đến dự tiệc sinh nhật."]],
  },
  {
    slug: "at-home", title: "At Home", theme: "Ngôi nhà và tiện nghi", description: "Miêu tả phòng, đồ dùng và so sánh nơi ở.",
    words: [["apartment", "căn hộ"], ["kitchen", "nhà bếp"], ["bathroom", "phòng tắm"], ["bedroom", "phòng ngủ"], ["living room", "phòng khách"], ["sink", "bồn rửa"], ["refrigerator", "tủ lạnh"], ["washing machine", "máy giặt"], ["comfortable", "thoải mái"], ["lovely", "đáng yêu"], ["modern", "hiện đại"], ["convenient", "tiện lợi"]],
    sentences: [["What a lovely home!", "Ngôi nhà thật đáng yêu!", "Em đến thăm nhà mới của bạn."], ["There is a refrigerator in the kitchen.", "Có một chiếc tủ lạnh trong bếp.", "Em chỉ một đồ dùng trong căn phòng."], ["This apartment is more comfortable.", "Căn hộ này thoải mái hơn.", "Gia đình đang so sánh hai nơi ở."], ["Which room do you like best?", "Bạn thích căn phòng nào nhất?", "Em hỏi bạn về căn phòng yêu thích."]],
  },
  {
    slug: "at-school", title: "At School", theme: "Môn học và sinh hoạt ở trường", description: "Nói thời khóa biểu, giờ học, thư viện và giờ ra chơi.",
    words: [["schedule", "lịch học"], ["subject", "môn học"], ["mathematics", "toán"], ["literature", "ngữ văn"], ["history", "lịch sử"], ["geography", "địa lý"], ["physics", "vật lý"], ["music", "âm nhạc"], ["art", "mỹ thuật"], ["recess", "giờ ra chơi"], ["cafeteria", "căng tin"], ["uniform", "đồng phục"]],
    sentences: [["What time does the class start?", "Lớp học bắt đầu lúc mấy giờ?", "Em xem lịch và hỏi giờ vào học."], ["What subjects do we have today?", "Hôm nay chúng ta học những môn gì?", "Hai bạn xem thời khóa biểu."], ["Where can I find this book?", "Mình có thể tìm cuốn sách này ở đâu?", "Em hỏi thủ thư về một cuốn sách."], ["What do you usually do at recess?", "Bạn thường làm gì vào giờ ra chơi?", "Hai bạn trò chuyện trong sân trường."]],
  },
  {
    slug: "work-and-play", title: "Work and Play", theme: "Học tập và thực hành", description: "Khám phá hoạt động học ở các môn và nói cảm nhận về môn học.",
    words: [["experiment", "thí nghiệm"], ["equation", "phương trình"], ["map", "bản đồ"], ["drawing", "bức vẽ"], ["computer", "máy tính"], ["calculator", "máy tính cầm tay"], ["repair", "sửa chữa"], ["learn", "học"], ["practice", "luyện tập"], ["enjoy", "thích thú"], ["interested", "hứng thú"], ["difficult", "khó"]],
    sentences: [["Why do you like science?", "Tại sao bạn thích khoa học?", "Em hỏi về môn học yêu thích của bạn."], ["We're doing an experiment.", "Chúng mình đang làm thí nghiệm.", "Nhóm học sinh làm việc trong phòng thí nghiệm."], ["I practice in the computer room.", "Mình thực hành trong phòng máy.", "Em nói nơi mình luyện kỹ năng máy tính."], ["Physics is difficult but interesting.", "Vật lý khó nhưng thú vị.", "Em chia sẻ cảm nhận về một môn học."]],
  },
  {
    slug: "after-school", title: "After School", theme: "Hoạt động sau giờ học", description: "Rủ bạn tham gia câu lạc bộ và sắp xếp kế hoạch sau giờ học.",
    words: [["relax", "thư giãn"], ["activity", "hoạt động"], ["club", "câu lạc bộ"], ["team", "đội"], ["rehearsal", "buổi tập"], ["orchestra", "dàn nhạc"], ["collection", "bộ sưu tập"], ["comic", "truyện tranh"], ["anniversary", "lễ kỷ niệm"], ["volunteer", "tình nguyện"], ["usually", "thường"], ["together", "cùng nhau"]],
    sentences: [["What do you do after school?", "Bạn làm gì sau giờ học?", "Em hỏi kế hoạch buổi chiều của bạn."], ["Would you like to join our club?", "Bạn có muốn tham gia câu lạc bộ không?", "Em mời một bạn mới tham gia."], ["Sorry, I can't. I'm busy.", "Xin lỗi, mình không thể. Mình bận rồi.", "Em từ chối lời mời một cách lịch sự."], ["Let's meet at half past four.", "Chúng ta gặp nhau lúc bốn giờ rưỡi nhé.", "Hai bạn thống nhất giờ gặp."]],
  },
  {
    slug: "the-world-of-work", title: "The World of Work", theme: "Nghề nghiệp và công việc", description: "Nói nghề nghiệp, giờ làm việc, việc làm thêm và ngày nghỉ.",
    words: [["vacation", "kỳ nghỉ"], ["shift", "ca làm"], ["part-time", "bán thời gian"], ["mechanic", "thợ máy"], ["farmer", "nông dân"], ["journalist", "nhà báo"], ["employee", "nhân viên"], ["hard-working", "chăm chỉ"], ["hour", "giờ"], ["day off", "ngày nghỉ"], ["feed", "cho ăn"], ["collect", "thu gom"]],
    sentences: [["What does your father do?", "Bố bạn làm nghề gì?", "Em hỏi nghề nghiệp của người thân bạn."], ["How many hours does she work a week?", "Cô ấy làm bao nhiêu giờ mỗi tuần?", "Hai bạn nói về thời gian làm việc."], ["I have a part-time job at a café.", "Mình làm bán thời gian tại quán cà phê.", "Em kể về công việc ngoài giờ."], ["What will you do on your day off?", "Bạn sẽ làm gì vào ngày nghỉ?", "Hai người lên kế hoạch nghỉ ngơi."]],
  },
  {
    slug: "places", title: "Places", theme: "Địa điểm và chỉ đường", description: "Hỏi đường, chỉ vị trí, hỏi giá và mua quà lưu niệm.",
    words: [["post office", "bưu điện"], ["bank", "ngân hàng"], ["hotel", "khách sạn"], ["market", "chợ"], ["pharmacy", "nhà thuốc"], ["souvenir shop", "cửa hàng lưu niệm"], ["stadium", "sân vận động"], ["railway station", "ga tàu"], ["direction", "phương hướng"], ["straight", "thẳng"], ["turn left", "rẽ trái"], ["opposite", "đối diện"]],
    sentences: [["Could you tell me the way to the post office?", "Bạn có thể chỉ đường đến bưu điện không?", "Em cần hỏi đường ở nơi chưa quen."], ["Go straight and turn left.", "Đi thẳng rồi rẽ trái.", "Em chỉ đường cho một du khách."], ["How much is this postcard?", "Tấm bưu thiếp này giá bao nhiêu?", "Em hỏi giá ở cửa hàng lưu niệm."], ["I'd like to buy this key ring.", "Mình muốn mua chiếc móc khóa này.", "Em chọn một món quà nhỏ."]],
  },
  {
    slug: "at-home-and-away", title: "At Home and Away", theme: "Kỳ nghỉ và chuyến đi", description: "Kể nơi đã đến, hoạt động trong chuyến đi và chia sẻ ảnh kỷ niệm.",
    words: [["vacation", "kỳ nghỉ"], ["trip", "chuyến đi"], ["aquarium", "thủy cung"], ["temple", "ngôi đền"], ["beach", "bãi biển"], ["gift", "quà"], ["photo", "ảnh"], ["shark", "cá mập"], ["dolphin", "cá heo"], ["return", "trở về"], ["visit", "thăm"], ["buy", "mua"]],
    sentences: [["How was your vacation?", "Kỳ nghỉ của bạn thế nào?", "Em hỏi bạn sau khi bạn đi xa về."], ["I went to Nha Trang.", "Mình đã đến Nha Trang.", "Em kể địa điểm đã tới."], ["We saw sharks at the aquarium.", "Chúng mình đã thấy cá mập ở thủy cung.", "Em kể một trải nghiệm đáng nhớ."], ["Would you like to see my photos?", "Bạn có muốn xem ảnh của mình không?", "Em chia sẻ ảnh chuyến đi với bạn."]],
  },
  {
    slug: "health-and-hygiene", title: "Health and Hygiene", theme: "Vệ sinh cá nhân", description: "Nói thói quen buổi sáng và các việc giữ cơ thể sạch sẽ.",
    words: [["toothbrush", "bàn chải"], ["toothpaste", "kem đánh răng"], ["shower", "vòi sen"], ["hair", "tóc"], ["clothes", "quần áo"], ["iron", "bàn là"], ["comb", "chải tóc"], ["wash", "rửa"], ["brush", "đánh/chải"], ["change", "thay"], ["remember", "nhớ"], ["healthy", "khỏe mạnh"]],
    sentences: [["What do you do every morning?", "Bạn làm gì mỗi buổi sáng?", "Em hỏi về thói quen vệ sinh hằng ngày."], ["Remember to brush your teeth.", "Nhớ đánh răng nhé.", "Người thân nhắc em trước khi đi ngủ."], ["I wash my face and comb my hair.", "Mình rửa mặt và chải tóc.", "Em mô tả hai việc trong buổi sáng."], ["Clean clothes help us feel comfortable.", "Quần áo sạch giúp chúng ta thấy dễ chịu.", "Hai bạn nói về việc giữ trang phục sạch."]],
  },
  {
    slug: "keep-fit-stay-healthy", title: "Keep Fit, Stay Healthy", theme: "Khám sức khỏe", description: "Giao tiếp khi khám bệnh, đo chiều cao, cân nặng và nhận lời khuyên.",
    words: [["medical check-up", "khám sức khỏe"], ["temperature", "nhiệt độ"], ["height", "chiều cao"], ["weight", "cân nặng"], ["nurse", "y tá"], ["doctor", "bác sĩ"], ["scale", "cái cân"], ["sick note", "giấy nghỉ ốm"], ["measure", "đo"], ["examine", "khám"], ["normal", "bình thường"], ["nervous", "lo lắng"]],
    sentences: [["I'm here for a medical check-up.", "Em đến để khám sức khỏe.", "Em nói lý do với y tá ở quầy tiếp nhận."], ["How tall are you?", "Bạn cao bao nhiêu?", "Y tá hỏi trước khi đo chiều cao."], ["I have a headache and a fever.", "Em bị đau đầu và sốt.", "Em mô tả triệu chứng với bác sĩ."], ["You should rest and drink more water.", "Em nên nghỉ ngơi và uống nhiều nước.", "Bác sĩ đưa lời khuyên sức khỏe."]],
  },
  {
    slug: "lets-eat", title: "Let's Eat!", theme: "Thực phẩm và bữa ăn", description: "Chọn thực phẩm, cách chế biến và xây dựng bữa ăn cân bằng.",
    words: [["spinach", "rau chân vịt"], ["cucumber", "dưa chuột"], ["papaya", "đu đủ"], ["pineapple", "dứa"], ["beef", "thịt bò"], ["pork", "thịt lợn"], ["selection", "sự lựa chọn"], ["balanced diet", "chế độ ăn cân bằng"], ["boil", "luộc"], ["fry", "chiên"], ["slice", "thái lát"], ["taste", "nếm"]],
    sentences: [["Which vegetables would you like?", "Bạn muốn loại rau nào?", "Em chọn thực phẩm tại chợ."], ["What shall we cook for dinner?", "Chúng ta nấu gì cho bữa tối?", "Gia đình đang lên thực đơn."], ["Would you like some pineapple?", "Bạn có muốn ăn một ít dứa không?", "Em mời bạn dùng trái cây."], ["We need a balanced meal.", "Chúng ta cần một bữa ăn cân bằng.", "Các bạn chọn đủ nhóm thực phẩm."]],
  },
  {
    slug: "activities", title: "Activities", theme: "Thể thao và an toàn", description: "Tham gia thể thao, luyện kỹ năng và chú ý an toàn.",
    words: [["swimming", "bơi lội"], ["skateboarding", "trượt ván"], ["rollerblading", "trượt patin"], ["basketball", "bóng rổ"], ["competition", "cuộc thi"], ["participant", "người tham gia"], ["skill", "kỹ năng"], ["danger", "nguy hiểm"], ["careful", "cẩn thận"], ["win", "chiến thắng"], ["join", "tham gia"], ["practice", "luyện tập"]],
    sentences: [["Would you like to play basketball?", "Bạn có muốn chơi bóng rổ không?", "Em rủ bạn tham gia một môn thể thao."], ["Be careful! The road is dangerous.", "Cẩn thận! Con đường nguy hiểm.", "Em cảnh báo bạn đang trượt patin."], ["She won the school competition.", "Bạn ấy đã thắng cuộc thi của trường.", "Em kể kết quả một cuộc thi."], ["We practice every Saturday.", "Chúng mình luyện tập mỗi thứ Bảy.", "Đội thể thao nói về lịch tập."]],
  },
  {
    slug: "freetime-fun", title: "Freetime Fun", theme: "Truyền hình và giải trí", description: "Chọn chương trình, mời bạn xem phim và bày tỏ sở thích.",
    words: [["television", "truyền hình"], ["program", "chương trình"], ["cartoon", "phim hoạt hình"], ["news", "bản tin"], ["movie", "phim"], ["theater", "rạp hát"], ["concert", "buổi hòa nhạc"], ["viewer", "khán giả"], ["series", "phim dài tập"], ["detective", "thám tử"], ["prefer", "thích hơn"], ["boring", "nhàm chán"]],
    sentences: [["What do you usually watch?", "Bạn thường xem gì?", "Em hỏi sở thích xem truyền hình của bạn."], ["Let's watch the cartoon.", "Chúng ta xem phim hoạt hình nhé.", "Hai bạn chọn chương trình tối nay."], ["Would you like to go to the movies?", "Bạn có muốn đi xem phim không?", "Em mời bạn đi chơi cuối tuần."], ["I prefer music programs.", "Mình thích chương trình âm nhạc hơn.", "Em bày tỏ lựa chọn của mình."]],
  },
  {
    slug: "going-out", title: "Going Out", theme: "Đi chơi và thời gian màn hình", description: "Xin phép đi chơi, hẹn bạn và lựa chọn hoạt động lành mạnh.",
    words: [["amusement center", "trung tâm vui chơi"], ["arcade", "khu trò chơi điện tử"], ["video game", "trò chơi điện tử"], ["outdoor", "ngoài trời"], ["socialize", "giao lưu"], ["neighborhood", "khu phố"], ["robbery", "vụ cướp"], ["inventor", "nhà phát minh"], ["addictive", "dễ gây nghiện"], ["spend", "dành/tiêu"], ["decide", "quyết định"], ["cross", "băng qua"]],
    sentences: [["May I go out with my friends?", "Con có thể đi chơi với các bạn không ạ?", "Em xin phép người thân trước khi ra ngoài."], ["Let's meet at the park entrance.", "Chúng ta gặp ở cổng công viên nhé.", "Nhóm bạn hẹn địa điểm gặp."], ["I'd rather play outdoors.", "Mình thích chơi ngoài trời hơn.", "Em chọn vận động thay cho trò chơi điện tử."], ["We shouldn't spend too long on screens.", "Chúng ta không nên dùng màn hình quá lâu.", "Hai bạn thống nhất giới hạn thời gian chơi."]],
  },
  {
    slug: "people-and-places", title: "People and Places", theme: "Con người và địa danh", description: "Nói về quốc gia, điểm đến, công trình và trải nghiệm du lịch.",
    words: [["Asia", "châu Á"], ["capital", "thủ đô"], ["region", "khu vực"], ["attraction", "điểm tham quan"], ["monument", "công trình tưởng niệm"], ["destination", "điểm đến"], ["pilot", "phi công"], ["famous", "nổi tiếng"], ["ancient", "cổ kính"], ["traditional", "truyền thống"], ["fly", "bay"], ["visit", "thăm"]],
    sentences: [["Which country would you like to visit?", "Bạn muốn thăm quốc gia nào?", "Em hỏi về điểm đến mơ ước của bạn."], ["You should visit the ancient town.", "Bạn nên thăm khu phố cổ.", "Em gợi ý một điểm tham quan."], ["This monument is very famous.", "Công trình này rất nổi tiếng.", "Em giới thiệu một địa danh cho du khách."], ["A pilot travels to many places.", "Phi công đi đến nhiều nơi.", "Hai bạn nói về công việc và du lịch."]],
  },
];

export function gradeSevenBoardUrl(slug: string) {
  return `/lesson-assets/grade-seven/${slug}.webp`;
}

export function buildGradeSevenLessons(unit: GradeSevenUnitSeed): GradeSevenLessonSeed[] {
  const boardUrl = gradeSevenBoardUrl(unit.slug);
  const sharedSprite = { spriteColumns: 5, spriteRows: 5 };
  const wordActivities: ActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh, nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "VISUAL_GUESS", prompt: "Tranh này mô tả từ hoặc cụm từ tiếng Anh nào?", imageUrl: boardUrl, imageAlt: `Tranh minh họa ${meaning}`, spriteIndex: index, ...sharedSprite, audioText: word, front: word, back: meaning },
  }));
  const groups = Array.from({ length: Math.ceil(unit.words.length / 8) }, (_, index) => unit.words.slice(index * 8, index * 8 + 8));
  for (const [index, group] of groups.entries()) wordActivities.push({
    type: ActivityType.MATCHING,
    title: `Ghép từ với nghĩa · phần ${index + 1}`,
    instruction: `Ghép đúng ${group.length} từ tiếng Anh với nghĩa tiếng Việt.`,
    order: unit.words.length + index + 1,
    payload: { prompt: `Ôn từ vựng chủ đề ${unit.theme}.`, pairs: group.map(([left, right]) => ({ left, right })) },
  });
  const sentenceActivities: ActivitySeed[] = buildSecondaryReactionActivities(unit.sentences, {
    imageUrl: boardUrl,
    spriteOffset: unit.words.length,
    ...sharedSprite,
  });
  return [
    { slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Nhìn tranh, nghe và tự đoán từ vựng cốt lõi của chủ đề.", activities: wordActivities },
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 7.", activities: sentenceActivities },
  ];
}
