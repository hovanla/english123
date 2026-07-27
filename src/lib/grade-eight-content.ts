import { ActivityType } from "@prisma/client";

type ActivitySeed = { type: ActivityType; title: string; instruction: string; order: number; payload: Record<string, unknown> };
export type GradeEightLessonSeed = { slug: string; title: string; description: string; activities: ActivitySeed[] };
export type GradeEightUnitSeed = {
  slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeEightUnits: GradeEightUnitSeed[] = [
  {
    slug: "my-friends", title: "My Friends", theme: "Bạn bè và tính cách", description: "Miêu tả ngoại hình, tính cách và điều khiến một người trở thành bạn tốt.",
    words: [["character", "tính cách"], ["generous", "hào phóng"], ["sociable", "hòa đồng"], ["reserved", "kín đáo"], ["humorous", "hài hước"], ["orphanage", "trại trẻ mồ côi"], ["neighbor", "hàng xóm"], ["appearance", "ngoại hình"], ["slim", "mảnh mai"], ["curly", "xoăn"], ["helpful", "hay giúp đỡ"], ["trustworthy", "đáng tin cậy"]],
    sentences: [["What does your best friend look like?", "Bạn thân của bạn trông như thế nào?", "Em giới thiệu ngoại hình của một người bạn."], ["She's slim and has curly hair.", "Bạn ấy mảnh mai và có mái tóc xoăn.", "Em miêu tả người bạn trong ảnh."], ["What is he like?", "Tính cách của bạn ấy thế nào?", "Em hỏi về một người mình chưa gặp."], ["He's humorous and always helpful.", "Bạn ấy hài hước và luôn hay giúp đỡ.", "Em giải thích vì sao mình quý một người bạn."]],
  },
  {
    slug: "making-arrangements", title: "Making Arrangements", theme: "Hẹn gặp và liên lạc", description: "Gọi điện, để lại lời nhắn và thống nhất thời gian, địa điểm gặp.",
    words: [["arrangement", "sự sắp xếp"], ["message", "lời nhắn"], ["telephone", "điện thoại"], ["directory", "danh bạ"], ["mobile phone", "điện thoại di động"], ["appointment", "cuộc hẹn"], ["available", "rảnh"], ["hold on", "chờ máy"], ["invite", "mời"], ["agree", "đồng ý"], ["postpone", "hoãn lại"], ["confirm", "xác nhận"]],
    sentences: [["Can I speak to Mai, please?", "Cho mình gặp Mai được không?", "Em gọi điện đến nhà một người bạn."], ["I'm sorry, she's out at the moment.", "Xin lỗi, hiện giờ bạn ấy đi vắng.", "Người nghe máy báo bạn chưa có nhà."], ["Would you like to meet at seven?", "Bạn có muốn gặp lúc bảy giờ không?", "Em đề nghị thời gian gặp."], ["Let's meet outside the cinema.", "Chúng ta gặp nhau ngoài rạp chiếu phim nhé.", "Hai bạn thống nhất địa điểm."]],
  },
  {
    slug: "at-home", title: "At Home", theme: "An toàn và việc nhà", description: "Gọi tên thiết bị trong nhà, phân công việc và nhắc nhở an toàn.",
    words: [["chore", "việc nhà"], ["cupboard", "tủ chén"], ["saucepan", "nồi cán dài"], ["steamer", "nồi hấp"], ["socket", "ổ cắm điện"], ["match", "que diêm"], ["chemical", "hóa chất"], ["scissors", "kéo"], ["dangerous", "nguy hiểm"], ["tidy", "gọn gàng"], ["repair", "sửa chữa"], ["prepare", "chuẩn bị"]],
    sentences: [["What chores do you have to do?", "Bạn phải làm những việc nhà nào?", "Em hỏi cách bạn chia sẻ công việc gia đình."], ["I have to tidy my room.", "Mình phải dọn phòng.", "Em nói nhiệm vụ của mình."], ["Why must we cover electrical sockets?", "Tại sao chúng ta phải che ổ điện?", "Em thảo luận quy tắc an toàn trong nhà."], ["Because children may touch them.", "Vì trẻ nhỏ có thể chạm vào chúng.", "Em giải thích nguyên nhân của một quy tắc."]],
  },
  {
    slug: "our-past", title: "Our Past", theme: "Cuộc sống ngày xưa", description: "So sánh quá khứ với hiện tại và kể lại kỷ niệm gia đình.",
    words: [["traditional", "truyền thống"], ["folktale", "truyện dân gian"], ["equipment", "thiết bị"], ["electricity", "điện"], ["straw", "rơm"], ["festival", "lễ hội"], ["ancestor", "tổ tiên"], ["memory", "kỷ niệm"], ["used to", "đã từng"], ["light", "thắp sáng"], ["harvest", "thu hoạch"], ["raise", "nuôi dưỡng"]],
    sentences: [["What was life like in the past?", "Cuộc sống ngày xưa như thế nào?", "Em hỏi ông bà về thời thơ ấu."], ["People used to work without machines.", "Mọi người từng làm việc không có máy móc.", "Em so sánh cách lao động xưa và nay."], ["Did you use to walk to school?", "Ngày trước ông/bà có đi bộ đến trường không?", "Em hỏi về thói quen thời nhỏ."], ["Yes, and we studied by an oil lamp.", "Có, và chúng tôi học bằng đèn dầu.", "Người lớn kể một kỷ niệm ngày xưa."]],
  },
  {
    slug: "study-habits", title: "Study Habits", theme: "Thói quen học tập", description: "Nói cách học từ mới, đặt mục tiêu và xin lời khuyên học hiệu quả.",
    words: [["habit", "thói quen"], ["semester", "học kỳ"], ["report card", "học bạ"], ["pronunciation", "phát âm"], ["grammar", "ngữ pháp"], ["vocabulary", "từ vựng"], ["dictionary", "từ điển"], ["highlight", "đánh dấu"], ["revise", "ôn lại"], ["memorize", "ghi nhớ"], ["improve", "cải thiện"], ["satisfactory", "đạt yêu cầu"]],
    sentences: [["How do you learn new words?", "Bạn học từ mới như thế nào?", "Em hỏi bí quyết học từ vựng của bạn."], ["I write them on flashcards.", "Mình viết chúng lên thẻ học.", "Em chia sẻ một phương pháp ghi nhớ."], ["You should practice pronunciation daily.", "Bạn nên luyện phát âm hằng ngày.", "Em đưa lời khuyên cho bạn."], ["My goal is to improve my English.", "Mục tiêu của mình là cải thiện tiếng Anh.", "Em nói mục tiêu trong học kỳ mới."]],
  },
  {
    slug: "the-young-pioneers-club", title: "The Young Pioneers Club", theme: "Câu lạc bộ và cộng đồng", description: "Đăng ký hoạt động, tham gia tình nguyện và giúp đỡ cộng đồng.",
    words: [["organization", "tổ chức"], ["application", "đơn đăng ký"], ["citizenship", "quốc tịch"], ["volunteer", "tình nguyện viên"], ["fund", "quỹ"], ["campaign", "chiến dịch"], ["community", "cộng đồng"], ["elderly", "người cao tuổi"], ["environment", "môi trường"], ["enroll", "đăng ký"], ["collect", "quyên góp"], ["participate", "tham gia"]],
    sentences: [["I'd like to join the volunteer club.", "Mình muốn tham gia câu lạc bộ tình nguyện.", "Em đăng ký một hoạt động sau giờ học."], ["Could you fill in this form?", "Bạn có thể điền vào mẫu đơn này không?", "Người phụ trách hướng dẫn đăng ký."], ["What can we do for our community?", "Chúng ta có thể làm gì cho cộng đồng?", "Nhóm học sinh lên kế hoạch tình nguyện."], ["We can collect books for children.", "Chúng ta có thể quyên góp sách cho trẻ em.", "Em đề xuất một việc thiết thực."]],
  },
  {
    slug: "my-neighborhood", title: "My Neighborhood", theme: "Khu phố và dịch vụ", description: "Miêu tả nơi sống, hỏi thông tin dịch vụ và nói về thay đổi gần đây.",
    words: [["neighborhood", "khu phố"], ["grocery store", "cửa hàng tạp hóa"], ["hairdresser", "tiệm làm tóc"], ["stadium", "sân vận động"], ["wet market", "chợ dân sinh"], ["facility", "tiện ích"], ["resident", "cư dân"], ["convenient", "tiện lợi"], ["peaceful", "yên bình"], ["nearby", "gần đây"], ["serve", "phục vụ"], ["improve", "cải thiện"]],
    sentences: [["How long have you lived here?", "Bạn đã sống ở đây bao lâu?", "Em làm quen với một người hàng xóm."], ["I've lived here for five years.", "Mình đã sống ở đây năm năm.", "Em nói thời gian mình ở khu phố."], ["Is there a grocery store nearby?", "Gần đây có cửa hàng tạp hóa không?", "Em tìm một dịch vụ thiết yếu."], ["The neighborhood has changed a lot.", "Khu phố đã thay đổi rất nhiều.", "Hai người nói về những thay đổi gần đây."]],
  },
  {
    slug: "country-life-and-city-life", title: "Country Life and City Life", theme: "Nông thôn và thành thị", description: "So sánh môi trường sống, nhịp sống và những thay đổi do đô thị hóa.",
    words: [["countryside", "nông thôn"], ["urban", "đô thị"], ["rural", "thuộc nông thôn"], ["traffic jam", "tắc đường"], ["population", "dân số"], ["opportunity", "cơ hội"], ["entertainment", "giải trí"], ["fresh air", "không khí trong lành"], ["noisy", "ồn ào"], ["peaceful", "yên bình"], ["migrate", "di cư"], ["modernize", "hiện đại hóa"]],
    sentences: [["Which place do you prefer?", "Bạn thích nơi nào hơn?", "Em hỏi lựa chọn giữa thành phố và nông thôn."], ["The countryside is quieter and cleaner.", "Nông thôn yên tĩnh và sạch hơn.", "Em so sánh hai môi trường sống."], ["Why do people move to cities?", "Tại sao mọi người chuyển đến thành phố?", "Lớp học thảo luận về đô thị hóa."], ["They look for jobs and education.", "Họ tìm kiếm việc làm và giáo dục.", "Em giải thích một nguyên nhân di cư."]],
  },
  {
    slug: "a-first-aid-course", title: "A First-Aid Course", theme: "Sơ cứu và tình huống khẩn cấp", description: "Gọi trợ giúp, mô tả tai nạn và thực hiện các bước sơ cứu cơ bản.",
    words: [["first aid", "sơ cứu"], ["ambulance", "xe cứu thương"], ["emergency", "tình huống khẩn cấp"], ["wound", "vết thương"], ["bandage", "băng gạc"], ["burn", "vết bỏng"], ["bleeding", "chảy máu"], ["conscious", "tỉnh táo"], ["victim", "nạn nhân"], ["elevate", "nâng cao"], ["pressure", "áp lực"], ["sterile", "vô trùng"]],
    sentences: [["Please send an ambulance.", "Xin hãy cử xe cứu thương đến.", "Em gọi trợ giúp trong tình huống khẩn cấp."], ["What happened to the victim?", "Nạn nhân đã gặp chuyện gì?", "Nhân viên y tế hỏi về tai nạn."], ["Keep the wound under running water.", "Hãy để vết thương dưới vòi nước chảy.", "Em hướng dẫn xử lý vết bỏng nhẹ."], ["Don't move the injured person.", "Đừng di chuyển người bị thương.", "Em nhắc một nguyên tắc sơ cứu an toàn."]],
  },
  {
    slug: "recycling", title: "Recycling", theme: "Tái chế và giảm rác", description: "Phân loại vật liệu, tái sử dụng đồ vật và giải thích quy trình tái chế.",
    words: [["recycle", "tái chế"], ["reuse", "tái sử dụng"], ["reduce", "giảm"], ["compost", "phân hữu cơ"], ["glass", "thủy tinh"], ["metal", "kim loại"], ["plastic", "nhựa"], ["paper", "giấy"], ["fabric", "vải"], ["container", "đồ chứa"], ["separate", "phân loại"], ["refill", "nạp lại"]],
    sentences: [["Which bin should this bottle go in?", "Chai này nên bỏ vào thùng nào?", "Em đang phân loại rác ở trường."], ["Put it in the glass recycling bin.", "Hãy bỏ nó vào thùng tái chế thủy tinh.", "Em hướng dẫn bạn phân loại đúng."], ["How can we reduce plastic waste?", "Chúng ta giảm rác nhựa bằng cách nào?", "Nhóm học sinh bàn kế hoạch xanh."], ["We can reuse bags and refill bottles.", "Chúng ta có thể dùng lại túi và nạp lại chai.", "Em đề xuất hai thói quen bền vững."]],
  },
  {
    slug: "traveling-around-vietnam", title: "Traveling Around Vietnam", theme: "Du lịch Việt Nam", description: "Hỏi thông tin, đề xuất điểm đến và sắp xếp hành trình trong nước.",
    words: [["destination", "điểm đến"], ["waterfall", "thác nước"], ["cave", "hang động"], ["harbor", "bến cảng"], ["limestone", "đá vôi"], ["temple", "ngôi đền"], ["railway", "đường sắt"], ["canoe", "xuồng"], ["tour guide", "hướng dẫn viên"], ["itinerary", "lịch trình"], ["book", "đặt chỗ"], ["explore", "khám phá"]],
    sentences: [["Could you suggest a place to visit?", "Bạn có thể gợi ý một nơi để tham quan không?", "Em hỏi hướng dẫn viên về điểm đến."], ["You should visit Ha Long Bay.", "Bạn nên thăm Vịnh Hạ Long.", "Em giới thiệu một danh thắng Việt Nam."], ["How can we get there?", "Chúng ta đến đó bằng cách nào?", "Nhóm bạn lên kế hoạch di chuyển."], ["We can take the morning train.", "Chúng ta có thể đi chuyến tàu sáng.", "Em chọn phương tiện phù hợp."]],
  },
  {
    slug: "a-vacation-abroad", title: "A Vacation Abroad", theme: "Kỳ nghỉ ở nước ngoài", description: "Làm thủ tục, hỏi thông tin chuyến đi và kể trải nghiệm ở nước ngoài.",
    words: [["abroad", "ở nước ngoài"], ["passport", "hộ chiếu"], ["flight", "chuyến bay"], ["airport", "sân bay"], ["customs", "hải quan"], ["luggage", "hành lý"], ["accommodation", "chỗ ở"], ["souvenir", "quà lưu niệm"], ["sightseeing", "tham quan"], ["departure", "khởi hành"], ["arrive", "đến"], ["exchange", "đổi tiền"]],
    sentences: [["May I see your passport?", "Tôi có thể xem hộ chiếu của bạn không?", "Nhân viên kiểm tra giấy tờ tại sân bay."], ["What time does the flight depart?", "Chuyến bay khởi hành lúc mấy giờ?", "Em hỏi thông tin chuyến bay."], ["Where are you staying?", "Bạn sẽ ở đâu?", "Người quen hỏi về chỗ ở trong kỳ nghỉ."], ["I've never seen snow before.", "Trước đây mình chưa từng thấy tuyết.", "Em kể một trải nghiệm mới ở nước ngoài."]],
  },
  {
    slug: "festivals", title: "Festivals", theme: "Lễ hội và phong tục", description: "Miêu tả hoạt động lễ hội, trình tự nghi thức và trải nghiệm văn hóa.",
    words: [["festival", "lễ hội"], ["ceremony", "nghi lễ"], ["procession", "đám rước"], ["competition", "cuộc thi"], ["fireworks", "pháo hoa"], ["lantern", "đèn lồng"], ["costume", "trang phục"], ["prize", "giải thưởng"], ["decorate", "trang trí"], ["perform", "biểu diễn"], ["celebrate", "kỷ niệm"], ["participate", "tham gia"]],
    sentences: [["When is the festival held?", "Lễ hội được tổ chức khi nào?", "Em hỏi thời gian diễn ra lễ hội."], ["It's held on the full moon day.", "Lễ hội được tổ chức vào ngày trăng tròn.", "Người dân giải thích thời điểm tổ chức."], ["What happens during the ceremony?", "Điều gì diễn ra trong nghi lễ?", "Em muốn hiểu trình tự một phong tục."], ["People carry lanterns and perform dances.", "Mọi người rước đèn và biểu diễn múa.", "Em miêu tả hoạt động trong lễ hội."]],
  },
  {
    slug: "wonders-of-the-world", title: "Wonders of the World", theme: "Kỳ quan thế giới", description: "Nói vị trí, lịch sử, vật liệu và giá trị của những công trình nổi tiếng.",
    words: [["wonder", "kỳ quan"], ["pyramid", "kim tự tháp"], ["statue", "tượng"], ["temple", "đền"], ["citadel", "thành cổ"], ["heritage", "di sản"], ["structure", "công trình"], ["stone", "đá"], ["ancient", "cổ đại"], ["magnificent", "tráng lệ"], ["construct", "xây dựng"], ["preserve", "bảo tồn"]],
    sentences: [["Where is this wonder located?", "Kỳ quan này nằm ở đâu?", "Em xem ảnh và hỏi vị trí công trình."], ["It was built thousands of years ago.", "Nó được xây từ hàng nghìn năm trước.", "Em giới thiệu tuổi đời của một kỳ quan."], ["Do you know how it was constructed?", "Bạn có biết nó được xây như thế nào không?", "Hai bạn tò mò về kỹ thuật cổ."], ["We should preserve it for the future.", "Chúng ta nên bảo tồn nó cho tương lai.", "Em nói về trách nhiệm với di sản."]],
  },
  {
    slug: "computers", title: "Computers", theme: "Máy tính và kỹ năng số", description: "Sử dụng thiết bị, xử lý lỗi cơ bản và giao tiếp an toàn trên mạng.",
    words: [["computer", "máy tính"], ["keyboard", "bàn phím"], ["monitor", "màn hình"], ["printer", "máy in"], ["mouse", "chuột máy tính"], ["document", "tài liệu"], ["password", "mật khẩu"], ["internet", "mạng internet"], ["download", "tải xuống"], ["upload", "tải lên"], ["connect", "kết nối"], ["install", "cài đặt"]],
    sentences: [["How do I save this document?", "Mình lưu tài liệu này bằng cách nào?", "Em cần trợ giúp khi làm bài trên máy tính."], ["Click the save icon and choose a folder.", "Nhấp biểu tượng lưu và chọn thư mục.", "Bạn hướng dẫn từng bước."], ["Why isn't the printer working?", "Tại sao máy in không hoạt động?", "Em gặp một lỗi thiết bị."], ["Check the cable and restart it.", "Hãy kiểm tra dây cáp và khởi động lại.", "Bạn đề xuất cách xử lý đơn giản."]],
  },
  {
    slug: "inventions", title: "Inventions", theme: "Phát minh và đổi mới", description: "Nói công dụng, người phát minh và tác động của công nghệ trong đời sống.",
    words: [["invention", "phát minh"], ["inventor", "nhà phát minh"], ["device", "thiết bị"], ["machine", "máy móc"], ["engine", "động cơ"], ["process", "quy trình"], ["material", "vật liệu"], ["prototype", "nguyên mẫu"], ["automatic", "tự động"], ["useful", "hữu ích"], ["design", "thiết kế"], ["experiment", "thử nghiệm"]],
    sentences: [["What is this device used for?", "Thiết bị này dùng để làm gì?", "Em xem một phát minh chưa biết."], ["It's used for cleaning the floor.", "Nó được dùng để lau sàn.", "Bạn giải thích công dụng của thiết bị."], ["Who invented the telephone?", "Ai đã phát minh ra điện thoại?", "Em hỏi về lịch sử một phát minh."], ["This invention changed how people communicate.", "Phát minh này đã thay đổi cách con người giao tiếp.", "Em nói về tác động của công nghệ."]],
  },
];

export function gradeEightBoardUrl(slug: string) {
  return `/lesson-assets/grade-eight/${slug}.webp`;
}

export function buildGradeEightLessons(unit: GradeEightUnitSeed): GradeEightLessonSeed[] {
  const boardUrl = gradeEightBoardUrl(unit.slug);
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
  const sentenceActivities: ActivitySeed[] = unit.sentences.map(([target, translation, cue], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Mẫu câu ${index + 1}: Nghe và đoán`,
    instruction: "Nhìn tình huống, bấm nghe và tự đoán câu tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "AUDIO_GUESS", prompt: cue, scenario: cue, imageUrl: boardUrl, imageAlt: `Tranh tình huống cho câu ${target}`, spriteIndex: 21 + index, ...sharedSprite, audioText: target, front: target, back: translation },
  }));
  return [
    { slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Nhìn tranh, nghe và tự đoán từ vựng cốt lõi của chủ đề.", activities: wordActivities },
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 8.", activities: sentenceActivities },
  ];
}
