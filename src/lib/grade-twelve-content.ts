import { ActivityType } from "@prisma/client";

type ActivitySeed = { type: ActivityType; title: string; instruction: string; order: number; payload: Record<string, unknown> };
export type GradeTwelveLessonSeed = { slug: string; title: string; description: string; activities: ActivitySeed[] };
export type GradeTwelveUnitSeed = {
  slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeTwelveUnits: GradeTwelveUnitSeed[] = [
  {
    slug: "home-life", title: "Home Life", theme: "Cuộc sống gia đình", description: "Chia sẻ trách nhiệm, thảo luận quy tắc và xây dựng sự gắn kết trong gia đình.",
    words: [["household", "gia đình"], ["responsibility", "trách nhiệm"], ["chore", "việc nhà"], ["relationship", "mối quan hệ"], ["generation", "thế hệ"], ["routine", "thói quen"], ["support", "sự hỗ trợ"], ["conflict", "mâu thuẫn"], ["cooperate", "hợp tác"], ["respect", "tôn trọng"], ["share", "chia sẻ"], ["close-knit", "gắn bó"]],
    sentences: [["How are household chores divided in your family?", "Việc nhà được phân chia thế nào trong gia đình bạn?", "Hai học sinh trao đổi về trách nhiệm ở nhà."], ["We take turns cooking and cleaning.", "Chúng mình luân phiên nấu ăn và dọn dẹp.", "Bạn mô tả cách gia đình hợp tác."], ["What should we do when we disagree?", "Chúng ta nên làm gì khi bất đồng?", "Em muốn giải quyết mâu thuẫn trong gia đình."], ["We should listen calmly and find a compromise.", "Chúng ta nên bình tĩnh lắng nghe và tìm cách thỏa hiệp.", "Một thành viên đề xuất cách trao đổi tôn trọng."]],
  },
  {
    slug: "cultural-diversity", title: "Cultural Diversity", theme: "Đa dạng văn hóa", description: "So sánh phong tục, tránh định kiến và ứng xử tôn trọng trong môi trường đa văn hóa.",
    words: [["culture", "văn hóa"], ["diversity", "sự đa dạng"], ["custom", "phong tục"], ["tradition", "truyền thống"], ["belief", "niềm tin"], ["ceremony", "nghi lễ"], ["etiquette", "phép xã giao"], ["identity", "bản sắc"], ["stereotype", "định kiến khuôn mẫu"], ["respectful", "tôn trọng"], ["adapt", "thích nghi"], ["celebrate", "tôn vinh"]],
    sentences: [["Is this greeting appropriate here?", "Cách chào này có phù hợp ở đây không?", "Em chuẩn bị gặp một người từ nền văn hóa khác."], ["A slight bow is considered polite.", "Cúi nhẹ được coi là lịch sự.", "Người bạn giải thích phép xã giao địa phương."], ["How can we avoid cultural stereotypes?", "Chúng ta tránh định kiến văn hóa bằng cách nào?", "Nhóm học sinh thảo luận về sự đa dạng."], ["Ask questions and learn from individual experiences.", "Hãy đặt câu hỏi và học từ trải nghiệm của từng người.", "Bạn đề xuất cách tiếp cận cởi mở."]],
  },
  {
    slug: "ways-of-socialising", title: "Ways of Socialising", theme: "Giao tiếp xã hội", description: "Bắt chuyện, đọc tín hiệu phi ngôn ngữ và lựa chọn cách giao tiếp phù hợp hoàn cảnh.",
    words: [["socialise", "giao tiếp xã hội"], ["conversation", "cuộc trò chuyện"], ["gesture", "cử chỉ"], ["eye contact", "giao tiếp bằng mắt"], ["posture", "tư thế"], ["expression", "nét mặt"], ["tone", "giọng điệu"], ["compliment", "lời khen"], ["apology", "lời xin lỗi"], ["introduce", "giới thiệu"], ["respond", "phản hồi"], ["formal", "trang trọng"]],
    sentences: [["Have you met our new classmate?", "Bạn đã gặp bạn học mới chưa?", "Em bắt đầu một cuộc trò chuyện ở trường."], ["Not yet. Could you introduce us?", "Chưa. Bạn có thể giới thiệu chúng mình không?", "Bạn nhờ kết nối với người mới."], ["Did my message sound too direct?", "Tin nhắn của mình có quá thẳng không?", "Em xem lại giọng điệu khi giao tiếp trực tuyến."], ["A friendly greeting would make it sound warmer.", "Một lời chào thân thiện sẽ khiến nó ấm áp hơn.", "Bạn góp ý cách viết lịch sự."]],
  },
  {
    slug: "school-education-system", title: "School Education System", theme: "Hệ thống giáo dục phổ thông", description: "Tìm hiểu các cấp học, đánh giá và lựa chọn lộ trình học tập phù hợp.",
    words: [["education system", "hệ thống giáo dục"], ["primary", "tiểu học"], ["secondary", "trung học"], ["curriculum", "chương trình học"], ["semester", "học kỳ"], ["assessment", "đánh giá"], ["examination", "kỳ thi"], ["compulsory", "bắt buộc"], ["academic", "học thuật"], ["vocational", "nghề nghiệp"], ["graduate", "tốt nghiệp"], ["enroll", "nhập học"]],
    sentences: [["When does compulsory education begin?", "Giáo dục bắt buộc bắt đầu khi nào?", "Em tìm hiểu hệ thống trường học của một quốc gia."], ["It usually begins at primary school.", "Nó thường bắt đầu ở bậc tiểu học.", "Bạn trả lời về cấp học đầu tiên."], ["How are students assessed during the year?", "Học sinh được đánh giá thế nào trong năm?", "Em hỏi về phương thức đánh giá."], ["They complete projects, tests, and final exams.", "Họ làm dự án, bài kiểm tra và thi cuối kỳ.", "Bạn nêu các hình thức đánh giá."]],
  },
  {
    slug: "higher-education", title: "Higher Education", theme: "Giáo dục đại học", description: "Tìm ngành học, chuẩn bị hồ sơ và cân nhắc học phí, học bổng cùng cơ hội nghề nghiệp.",
    words: [["university", "trường đại học"], ["college", "trường cao đẳng"], ["major", "chuyên ngành"], ["degree", "bằng cấp"], ["admission", "tuyển sinh"], ["application", "hồ sơ đăng ký"], ["scholarship", "học bổng"], ["tuition", "học phí"], ["campus", "khuôn viên"], ["lecture", "bài giảng"], ["undergraduate", "sinh viên đại học"], ["qualification", "trình độ"]],
    sentences: [["Which major are you considering?", "Bạn đang cân nhắc chuyên ngành nào?", "Hai học sinh tìm hiểu lựa chọn sau phổ thông."], ["I'm interested in environmental engineering.", "Mình quan tâm ngành kỹ thuật môi trường.", "Bạn nói lĩnh vực mong muốn."], ["What documents does the application require?", "Hồ sơ đăng ký cần giấy tờ gì?", "Em hỏi bộ phận tuyển sinh."], ["You need your transcript and a personal statement.", "Bạn cần bảng điểm và bài luận cá nhân.", "Nhân viên hướng dẫn hồ sơ."]],
  },
  {
    slug: "future-jobs", title: "Future Jobs", theme: "Nghề nghiệp tương lai", description: "Khám phá nghề, chuẩn bị kỹ năng và thực hành giao tiếp trong tuyển dụng.",
    words: [["career", "sự nghiệp"], ["occupation", "nghề nghiệp"], ["vacancy", "vị trí tuyển dụng"], ["applicant", "ứng viên"], ["employer", "nhà tuyển dụng"], ["interview", "phỏng vấn"], ["résumé", "sơ yếu lý lịch"], ["qualification", "năng lực"], ["experience", "kinh nghiệm"], ["skill", "kỹ năng"], ["recruit", "tuyển dụng"], ["flexible", "linh hoạt"]],
    sentences: [["What kind of career are you looking for?", "Bạn đang tìm kiếm kiểu sự nghiệp nào?", "Em trao đổi với tư vấn viên nghề nghiệp."], ["I'd like work that combines technology and design.", "Mình muốn công việc kết hợp công nghệ và thiết kế.", "Bạn mô tả định hướng nghề."], ["How should I prepare for the interview?", "Mình nên chuẩn bị cho phỏng vấn thế nào?", "Em hỏi cách tăng cơ hội tuyển dụng."], ["Research the company and practise clear answers.", "Hãy tìm hiểu công ty và luyện trả lời rõ ràng.", "Tư vấn viên đưa ra lời khuyên."]],
  },
  {
    slug: "economic-reforms", title: "Economic Reforms", theme: "Cải cách kinh tế", description: "Hiểu thay đổi kinh tế và thảo luận tác động đến doanh nghiệp, việc làm cùng đời sống.",
    words: [["economy", "nền kinh tế"], ["reform", "cải cách"], ["policy", "chính sách"], ["market", "thị trường"], ["enterprise", "doanh nghiệp"], ["investment", "đầu tư"], ["industry", "ngành công nghiệp"], ["agriculture", "nông nghiệp"], ["productivity", "năng suất"], ["employment", "việc làm"], ["develop", "phát triển"], ["stable", "ổn định"]],
    sentences: [["What was the goal of the economic reform?", "Mục tiêu của cải cách kinh tế là gì?", "Nhóm học sinh phân tích một giai đoạn phát triển."], ["It aimed to increase productivity and employment.", "Nó nhằm tăng năng suất và việc làm.", "Bạn tóm tắt hai mục tiêu."], ["How did small businesses benefit?", "Doanh nghiệp nhỏ được hưởng lợi thế nào?", "Em hỏi về tác động thực tế."], ["They gained better access to markets and investment.", "Họ tiếp cận thị trường và đầu tư tốt hơn.", "Bạn giải thích cơ hội mới."]],
  },
  {
    slug: "life-in-the-future", title: "Life in the Future", theme: "Cuộc sống tương lai", description: "Dự đoán thay đổi về công nghệ, đô thị và việc làm dựa trên lợi ích cùng rủi ro.",
    words: [["future", "tương lai"], ["automation", "tự động hóa"], ["artificial intelligence", "trí tuệ nhân tạo"], ["robot", "rô-bốt"], ["smart city", "thành phố thông minh"], ["virtual reality", "thực tế ảo"], ["remote work", "làm việc từ xa"], ["innovation", "đổi mới"], ["predict", "dự đoán"], ["transform", "chuyển đổi"], ["convenient", "thuận tiện"], ["uncertain", "không chắc chắn"]],
    sentences: [["How might technology change our homes?", "Công nghệ có thể thay đổi ngôi nhà thế nào?", "Nhóm học sinh hình dung cuộc sống tương lai."], ["Smart systems may manage energy automatically.", "Hệ thống thông minh có thể tự động quản lý năng lượng.", "Bạn đưa ra một dự đoán."], ["Will automation replace every job?", "Tự động hóa sẽ thay thế mọi công việc sao?", "Em xem xét một lo ngại về tương lai."], ["No, but people will need to learn new skills.", "Không, nhưng con người sẽ cần học kỹ năng mới.", "Bạn đưa ra nhận định cân bằng."]],
  },
  {
    slug: "deserts", title: "Deserts", theme: "Hệ sinh thái sa mạc", description: "Khám phá khí hậu, sinh vật thích nghi và tác động của sa mạc hóa.",
    words: [["desert", "sa mạc"], ["dune", "cồn cát"], ["oasis", "ốc đảo"], ["cactus", "xương rồng"], ["camel", "lạc đà"], ["rainfall", "lượng mưa"], ["drought", "hạn hán"], ["temperature", "nhiệt độ"], ["adaptation", "sự thích nghi"], ["arid", "khô cằn"], ["survive", "sống sót"], ["desertification", "sa mạc hóa"]],
    sentences: [["How do plants survive in the desert?", "Thực vật sống sót trong sa mạc bằng cách nào?", "Em tìm hiểu khả năng thích nghi ở nơi khô hạn."], ["They store water and reduce water loss.", "Chúng tích trữ nước và giảm mất nước.", "Bạn giải thích hai cơ chế sinh tồn."], ["What causes desertification?", "Điều gì gây ra sa mạc hóa?", "Em hỏi về sự mở rộng vùng đất khô cằn."], ["Drought and poor land use can both contribute.", "Hạn hán và sử dụng đất kém đều có thể góp phần.", "Bạn nêu nguyên nhân tự nhiên và con người."]],
  },
  {
    slug: "endangered-species", title: "Endangered Species", theme: "Các loài có nguy cơ tuyệt chủng", description: "Đánh giá nguy cơ, tìm hiểu bảo tồn và lựa chọn hành động bảo vệ động vật hoang dã.",
    words: [["endangered", "có nguy cơ tuyệt chủng"], ["species", "loài"], ["habitat", "môi trường sống"], ["population", "quần thể"], ["extinction", "sự tuyệt chủng"], ["poaching", "săn trộm"], ["wildlife", "động vật hoang dã"], ["reserve", "khu bảo tồn"], ["breed", "sinh sản"], ["monitor", "theo dõi"], ["protect", "bảo vệ"], ["recover", "phục hồi"]],
    sentences: [["How many of this species remain in the wild?", "Còn bao nhiêu cá thể loài này trong tự nhiên?", "Em xem dữ liệu tại một trung tâm bảo tồn."], ["Only a small population remains.", "Chỉ còn một quần thể nhỏ.", "Nhà nghiên cứu mô tả tình trạng nguy cấp."], ["What is being done to help them recover?", "Người ta đang làm gì để giúp chúng phục hồi?", "Em hỏi về chương trình bảo tồn."], ["Their habitat is protected and the population is monitored.", "Nơi sống được bảo vệ và quần thể được theo dõi.", "Nhà nghiên cứu nêu hai biện pháp."]],
  },
  {
    slug: "books", title: "Books", theme: "Sách và thói quen đọc", description: "Lựa chọn sách, nhận xét nội dung và xây dựng thói quen đọc có chiều sâu.",
    words: [["book", "sách"], ["novel", "tiểu thuyết"], ["biography", "tiểu sử"], ["fiction", "hư cấu"], ["non-fiction", "phi hư cấu"], ["author", "tác giả"], ["character", "nhân vật"], ["plot", "cốt truyện"], ["chapter", "chương"], ["review", "bài đánh giá"], ["recommend", "giới thiệu"], ["engaging", "cuốn hút"]],
    sentences: [["What are you reading at the moment?", "Hiện tại bạn đang đọc gì?", "Hai người bạn trao đổi về sách."], ["I'm reading a biography of a scientist.", "Mình đang đọc tiểu sử một nhà khoa học.", "Bạn giới thiệu cuốn sách đang đọc."], ["Would you recommend it?", "Bạn có giới thiệu cuốn đó không?", "Em hỏi ý kiến trước khi chọn sách."], ["Yes, it's informative and very engaging.", "Có, nó giàu thông tin và rất cuốn hút.", "Bạn đưa ra nhận xét ngắn."]],
  },
  {
    slug: "water-sports", title: "Water Sports", theme: "Thể thao dưới nước", description: "Tìm hiểu môn thể thao, thiết bị và quy tắc an toàn khi hoạt động dưới nước.",
    words: [["swimming", "bơi lội"], ["diving", "lặn"], ["surfing", "lướt sóng"], ["sailing", "đua thuyền buồm"], ["rowing", "chèo thuyền"], ["water polo", "bóng nước"], ["lifeguard", "nhân viên cứu hộ"], ["life jacket", "áo phao"], ["pool", "bể bơi"], ["wave", "sóng"], ["compete", "thi đấu"], ["rescue", "cứu hộ"]],
    sentences: [["Which water sport would you like to try?", "Bạn muốn thử môn thể thao dưới nước nào?", "Hai bạn chọn hoạt động trong kỳ nghỉ."], ["I'd like to learn how to sail.", "Mình muốn học lái thuyền buồm.", "Bạn nói môn thể thao quan tâm."], ["What safety equipment do we need?", "Chúng ta cần thiết bị an toàn nào?", "Em chuẩn bị trước khi xuống nước."], ["Everyone must wear a life jacket.", "Mọi người phải mặc áo phao.", "Huấn luyện viên nêu quy tắc bắt buộc."]],
  },
  {
    slug: "the-22nd-sea-games", title: "The 22nd SEA Games", theme: "SEA Games lần thứ 22", description: "Tìm hiểu sự kiện thể thao khu vực và trao đổi về thành tích, tinh thần đoàn kết.",
    words: [["SEA Games", "Đại hội Thể thao Đông Nam Á"], ["host country", "nước chủ nhà"], ["athlete", "vận động viên"], ["delegation", "đoàn thể thao"], ["medal", "huy chương"], ["record", "kỷ lục"], ["ceremony", "buổi lễ"], ["venue", "địa điểm thi đấu"], ["compete", "thi đấu"], ["represent", "đại diện"], ["victory", "chiến thắng"], ["solidarity", "đoàn kết"]],
    sentences: [["Which country hosted the 22nd SEA Games?", "Quốc gia nào đăng cai SEA Games lần thứ 22?", "Em ôn lại một sự kiện thể thao khu vực."], ["Viet Nam hosted the games in 2003.", "Việt Nam đăng cai đại hội năm 2003.", "Bạn cung cấp thông tin chính."], ["What made the event memorable?", "Điều gì khiến sự kiện đáng nhớ?", "Em hỏi về ý nghĩa ngoài thành tích."], ["It strengthened friendship among Southeast Asian nations.", "Nó củng cố tình hữu nghị giữa các quốc gia Đông Nam Á.", "Bạn nói về tinh thần khu vực."]],
  },
  {
    slug: "international-organizations", title: "International Organizations", theme: "Các tổ chức quốc tế", description: "Tìm hiểu sứ mệnh, hoạt động cứu trợ và cách các quốc gia hợp tác giải quyết vấn đề chung.",
    words: [["organization", "tổ chức"], ["international", "quốc tế"], ["humanitarian", "nhân đạo"], ["aid", "viện trợ"], ["relief", "cứu trợ"], ["healthcare", "chăm sóc sức khỏe"], ["education", "giáo dục"], ["peace", "hòa bình"], ["cooperation", "hợp tác"], ["mission", "sứ mệnh"], ["respond", "ứng phó"], ["support", "hỗ trợ"]],
    sentences: [["What is this organization's main mission?", "Sứ mệnh chính của tổ chức này là gì?", "Em tìm hiểu một tổ chức quốc tế."], ["It provides emergency healthcare and relief.", "Tổ chức cung cấp chăm sóc y tế khẩn cấp và cứu trợ.", "Bạn tóm tắt hoạt động chính."], ["How do countries work together through it?", "Các quốc gia hợp tác thông qua tổ chức thế nào?", "Em hỏi về cơ chế phối hợp."], ["They share resources and coordinate their response.", "Họ chia sẻ nguồn lực và phối hợp ứng phó.", "Bạn giải thích hai hình thức hợp tác."]],
  },
  {
    slug: "women-in-society", title: "Women in Society", theme: "Phụ nữ trong xã hội", description: "Thảo luận bình đẳng cơ hội, ghi nhận đóng góp và loại bỏ rào cản giới.",
    words: [["equality", "bình đẳng"], ["opportunity", "cơ hội"], ["education", "giáo dục"], ["leadership", "khả năng lãnh đạo"], ["workforce", "lực lượng lao động"], ["achievement", "thành tựu"], ["rights", "quyền"], ["barrier", "rào cản"], ["discrimination", "phân biệt đối xử"], ["empower", "trao quyền"], ["contribute", "đóng góp"], ["independent", "độc lập"]],
    sentences: [["Why is equal opportunity important?", "Tại sao cơ hội bình đẳng quan trọng?", "Nhóm học sinh thảo luận vai trò của phụ nữ."], ["It allows everyone to contribute their abilities.", "Nó cho phép mọi người đóng góp năng lực.", "Bạn giải thích lợi ích cho xã hội."], ["What barriers still need to be removed?", "Những rào cản nào vẫn cần được loại bỏ?", "Em tìm hiểu thách thức hiện tại."], ["Discrimination in education and work must end.", "Phân biệt đối xử trong giáo dục và việc làm phải chấm dứt.", "Bạn nêu hai lĩnh vực cần thay đổi."]],
  },
  {
    slug: "the-association-of-southeast-asian-nations", title: "The Association of Southeast Asian Nations", theme: "Hiệp hội các quốc gia Đông Nam Á", description: "Tìm hiểu ASEAN và trao đổi về hợp tác khu vực trong kinh tế, giáo dục, văn hóa.",
    words: [["ASEAN", "Hiệp hội các quốc gia Đông Nam Á"], ["association", "hiệp hội"], ["member state", "quốc gia thành viên"], ["region", "khu vực"], ["cooperation", "hợp tác"], ["community", "cộng đồng"], ["economy", "kinh tế"], ["trade", "thương mại"], ["education", "giáo dục"], ["culture", "văn hóa"], ["peace", "hòa bình"], ["integration", "hội nhập"]],
    sentences: [["What is the purpose of ASEAN?", "Mục đích của ASEAN là gì?", "Em tìm hiểu về một tổ chức khu vực."], ["It promotes peace and regional cooperation.", "Tổ chức thúc đẩy hòa bình và hợp tác khu vực.", "Bạn tóm tắt mục tiêu chính."], ["How do students benefit from cooperation?", "Học sinh được lợi gì từ sự hợp tác?", "Em hỏi về tác động gần gũi với người học."], ["They gain more exchange and learning opportunities.", "Họ có thêm cơ hội trao đổi và học tập.", "Bạn nêu lợi ích thiết thực."]],
  },
];

export function gradeTwelveBoardUrl(slug: string) {
  return `/lesson-assets/grade-twelve/${slug}.webp`;
}

export function buildGradeTwelveLessons(unit: GradeTwelveUnitSeed): GradeTwelveLessonSeed[] {
  const boardUrl = gradeTwelveBoardUrl(unit.slug);
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
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 12.", activities: sentenceActivities },
  ];
}
