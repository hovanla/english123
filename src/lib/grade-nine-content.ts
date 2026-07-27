import { ActivityType } from "@prisma/client";

type ActivitySeed = { type: ActivityType; title: string; instruction: string; order: number; payload: Record<string, unknown> };
export type GradeNineLessonSeed = { slug: string; title: string; description: string; activities: ActivitySeed[] };
export type GradeNineUnitSeed = {
  slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeNineUnits: GradeNineUnitSeed[] = [
  {
    slug: "a-visit-from-a-pen-pal", title: "A Visit from a Pen Pal", theme: "Bạn qua thư và văn hóa", description: "Đón một người bạn quốc tế, giới thiệu địa danh và chia sẻ khác biệt văn hóa.",
    words: [["pen pal", "bạn qua thư"], ["correspond", "trao đổi thư"], ["mosque", "nhà thờ Hồi giáo"], ["mausoleum", "lăng"], ["temple", "đền"], ["museum", "bảo tàng"], ["religion", "tôn giáo"], ["culture", "văn hóa"], ["impressed", "ấn tượng"], ["friendly", "thân thiện"], ["pray", "cầu nguyện"], ["depend on", "phụ thuộc vào"]],
    sentences: [["Is this your first visit to Viet Nam?", "Đây có phải lần đầu bạn đến Việt Nam không?", "Em đón một người bạn quốc tế tại sân bay."], ["Which place would you like to visit?", "Bạn muốn tham quan nơi nào?", "Em hỏi sở thích của bạn trước khi lên lịch."], ["I'm really impressed by this city.", "Mình thực sự ấn tượng với thành phố này.", "Người bạn chia sẻ cảm nhận sau chuyến đi."], ["I wish you could stay longer.", "Mình ước bạn có thể ở lại lâu hơn.", "Em nói lời tạm biệt khi bạn sắp về nước."]],
  },
  {
    slug: "clothing", title: "Clothing", theme: "Trang phục và bản sắc", description: "Miêu tả quần áo, chọn trang phục phù hợp và nói về thời trang bền vững.",
    words: [["tunic", "áo dài"], ["silk", "lụa"], ["cotton", "bông"], ["denim", "vải bò"], ["pattern", "hoa văn"], ["stripe", "sọc"], ["sleeve", "tay áo"], ["uniform", "đồng phục"], ["fashion", "thời trang"], ["traditional", "truyền thống"], ["embroider", "thêu"], ["casual", "thường ngày"]],
    sentences: [["What are you wearing to the ceremony?", "Bạn sẽ mặc gì đến buổi lễ?", "Hai bạn chuẩn bị tham dự một sự kiện."], ["I'm going to wear a traditional tunic.", "Mình sẽ mặc áo dài truyền thống.", "Em chọn trang phục phù hợp với nghi lễ."], ["What is this shirt made of?", "Chiếc áo này làm từ chất liệu gì?", "Em kiểm tra chất liệu trước khi mua."], ["It's made of recycled cotton.", "Nó được làm từ bông tái chế.", "Nhân viên giải thích về sản phẩm bền vững."]],
  },
  {
    slug: "a-trip-to-the-countryside", title: "A Trip to the Countryside", theme: "Chuyến đi về nông thôn", description: "Hỏi đường, miêu tả cảnh vật và kể trải nghiệm trong chuyến đi ngoại ô.",
    words: [["countryside", "nông thôn"], ["paddy field", "cánh đồng lúa"], ["banyan tree", "cây đa"], ["shrine", "miếu"], ["riverbank", "bờ sông"], ["buffalo", "trâu"], ["harvest", "mùa gặt"], ["picnic", "chuyến dã ngoại"], ["route", "tuyến đường"], ["entrance", "lối vào"], ["collect", "thu hoạch"], ["exchange", "trao đổi"]],
    sentences: [["How do we get to the village?", "Chúng ta đến làng bằng cách nào?", "Em hỏi đường trước chuyến đi."], ["Take this road past the banyan tree.", "Đi theo đường này qua cây đa.", "Người dân chỉ đường đến làng."], ["What did you enjoy most?", "Bạn thích điều gì nhất?", "Em hỏi bạn sau chuyến dã ngoại."], ["I enjoyed walking through the rice fields.", "Mình thích đi bộ qua những cánh đồng lúa.", "Em kể trải nghiệm đáng nhớ ở nông thôn."]],
  },
  {
    slug: "learning-a-foreign-language", title: "Learning a Foreign Language", theme: "Học ngoại ngữ", description: "Chọn khóa học, hỏi thông tin và xây dựng chiến lược luyện ngoại ngữ.",
    words: [["foreign language", "ngoại ngữ"], ["course", "khóa học"], ["beginner", "người mới bắt đầu"], ["intermediate", "trung cấp"], ["advanced", "nâng cao"], ["tuition", "học phí"], ["scholarship", "học bổng"], ["examiner", "giám khảo"], ["fluency", "độ lưu loát"], ["pronunciation", "phát âm"], ["practice", "luyện tập"], ["qualify", "đủ điều kiện"]],
    sentences: [["Which course is suitable for me?", "Khóa học nào phù hợp với mình?", "Em hỏi tư vấn tại trung tâm ngoại ngữ."], ["You should take the intermediate class.", "Bạn nên học lớp trung cấp.", "Người tư vấn dựa vào trình độ của em."], ["How can I improve my speaking?", "Mình cải thiện kỹ năng nói bằng cách nào?", "Em xin lời khuyên từ giáo viên."], ["Practice a little every day.", "Hãy luyện tập một ít mỗi ngày.", "Giáo viên gợi ý thói quen hiệu quả."]],
  },
  {
    slug: "the-media", title: "The Media", theme: "Truyền thông và thông tin", description: "Lựa chọn nguồn tin, đánh giá độ tin cậy và sử dụng truyền thông có trách nhiệm.",
    words: [["media", "truyền thông"], ["newspaper", "báo giấy"], ["broadcast", "phát sóng"], ["documentary", "phim tài liệu"], ["headline", "tiêu đề tin"], ["article", "bài báo"], ["website", "trang web"], ["social network", "mạng xã hội"], ["source", "nguồn tin"], ["reliable", "đáng tin cậy"], ["publish", "xuất bản"], ["verify", "xác minh"]],
    sentences: [["Where did you get this information?", "Bạn lấy thông tin này từ đâu?", "Em hỏi nguồn của một tin đang lan truyền."], ["I read it on a news website.", "Mình đọc nó trên một trang tin.", "Bạn nói nơi mình thấy thông tin."], ["Have you checked another source?", "Bạn đã kiểm tra nguồn khác chưa?", "Em nhắc bạn xác minh tin tức."], ["We should verify news before sharing it.", "Chúng ta nên xác minh tin trước khi chia sẻ.", "Nhóm học sinh thống nhất cách dùng mạng có trách nhiệm."]],
  },
  {
    slug: "the-environment", title: "The Environment", theme: "Ô nhiễm và bảo vệ môi trường", description: "Nhận diện vấn đề môi trường, tìm nguyên nhân và đề xuất hành động cộng đồng.",
    words: [["environment", "môi trường"], ["pollution", "ô nhiễm"], ["litter", "rác vứt bừa bãi"], ["sewage", "nước thải"], ["pesticide", "thuốc trừ sâu"], ["deforestation", "phá rừng"], ["wildlife", "động vật hoang dã"], ["conservation", "bảo tồn"], ["shore", "bờ biển"], ["prevent", "ngăn chặn"], ["protect", "bảo vệ"], ["volunteer", "tình nguyện"]],
    sentences: [["What is causing pollution here?", "Điều gì đang gây ô nhiễm ở đây?", "Em quan sát một dòng kênh bị bẩn."], ["Wastewater is flowing into the river.", "Nước thải đang chảy vào sông.", "Nhóm học sinh xác định nguyên nhân."], ["What can our class do to help?", "Lớp chúng ta có thể làm gì để giúp?", "Em lên kế hoạch hành động xanh."], ["We can organize a weekend clean-up.", "Chúng ta có thể tổ chức dọn vệ sinh cuối tuần.", "Em đề xuất hoạt động cộng đồng."]],
  },
  {
    slug: "saving-energy", title: "Saving Energy", theme: "Tiết kiệm năng lượng", description: "Theo dõi mức sử dụng, lựa chọn thiết bị hiệu quả và thay đổi thói quen hằng ngày.",
    words: [["energy", "năng lượng"], ["electricity", "điện"], ["appliance", "thiết bị điện"], ["bulb", "bóng đèn"], ["solar panel", "tấm pin mặt trời"], ["water heater", "máy nước nóng"], ["bill", "hóa đơn"], ["efficient", "hiệu quả"], ["renewable", "tái tạo"], ["consume", "tiêu thụ"], ["switch off", "tắt"], ["reduce", "giảm"]],
    sentences: [["Why is the electricity bill so high?", "Tại sao hóa đơn tiền điện cao vậy?", "Gia đình xem lại chi phí tháng này."], ["We leave too many lights on.", "Chúng ta để quá nhiều đèn sáng.", "Em nhận ra một thói quen lãng phí."], ["How can we save more energy?", "Chúng ta tiết kiệm thêm năng lượng bằng cách nào?", "Cả nhà cùng tìm giải pháp."], ["Let's switch off appliances when not in use.", "Hãy tắt thiết bị khi không sử dụng.", "Em đề xuất một quy tắc đơn giản."]],
  },
  {
    slug: "celebrations", title: "Celebrations", theme: "Ngày lễ và lòng biết ơn", description: "Chúc mừng, chuẩn bị sự kiện và bày tỏ tình cảm với gia đình, cộng đồng.",
    words: [["celebration", "lễ kỷ niệm"], ["occasion", "dịp"], ["parade", "diễu hành"], ["gift", "món quà"], ["card", "thiệp"], ["relative", "họ hàng"], ["guest", "khách"], ["tradition", "truyền thống"], ["decorate", "trang trí"], ["congratulate", "chúc mừng"], ["gather", "sum họp"], ["appreciate", "trân trọng"]],
    sentences: [["What are we celebrating today?", "Hôm nay chúng ta kỷ niệm điều gì?", "Em tham gia một buổi gặp mặt đặc biệt."], ["We're celebrating our grandparents' anniversary.", "Chúng ta kỷ niệm ngày cưới của ông bà.", "Người thân giải thích dịp lễ."], ["How can I make the day special?", "Mình làm ngày này đặc biệt bằng cách nào?", "Em muốn bày tỏ lòng biết ơn."], ["You could write them a thank-you card.", "Bạn có thể viết thiệp cảm ơn cho ông bà.", "Bạn gợi ý một món quà ý nghĩa."]],
  },
  {
    slug: "natural-disasters", title: "Natural Disasters", theme: "Thiên tai và ứng phó", description: "Nhận cảnh báo, chuẩn bị đồ thiết yếu và thực hiện các bước an toàn khi có thiên tai.",
    words: [["earthquake", "động đất"], ["typhoon", "bão nhiệt đới"], ["flood", "lũ lụt"], ["drought", "hạn hán"], ["landslide", "sạt lở"], ["tornado", "lốc xoáy"], ["warning", "cảnh báo"], ["shelter", "nơi trú ẩn"], ["emergency kit", "bộ đồ khẩn cấp"], ["evacuate", "sơ tán"], ["forecast", "dự báo"], ["rescue", "cứu hộ"]],
    sentences: [["Have you heard the storm warning?", "Bạn đã nghe cảnh báo bão chưa?", "Em nhận thông báo thời tiết khẩn cấp."], ["Yes, we should prepare an emergency kit.", "Rồi, chúng ta nên chuẩn bị bộ đồ khẩn cấp.", "Gia đình bắt đầu chuẩn bị an toàn."], ["Where should we go if the river rises?", "Chúng ta nên đi đâu nếu nước sông dâng?", "Em hỏi kế hoạch sơ tán."], ["Move to the community shelter.", "Hãy di chuyển đến nơi trú ẩn cộng đồng.", "Người lớn hướng dẫn địa điểm an toàn."]],
  },
  {
    slug: "life-on-the-other-planets", title: "Life on the Other Planets", theme: "Không gian và sự sống ngoài Trái Đất", description: "Nói về khám phá vũ trụ, bằng chứng khoa học và giả thuyết về hành tinh khác.",
    words: [["planet", "hành tinh"], ["spacecraft", "tàu vũ trụ"], ["astronaut", "phi hành gia"], ["telescope", "kính thiên văn"], ["galaxy", "thiên hà"], ["orbit", "quỹ đạo"], ["surface", "bề mặt"], ["gravity", "trọng lực"], ["alien", "sinh vật ngoài hành tinh"], ["evidence", "bằng chứng"], ["explore", "khám phá"], ["communicate", "giao tiếp"]],
    sentences: [["Do you think life exists on other planets?", "Bạn có nghĩ sự sống tồn tại trên hành tinh khác không?", "Nhóm học sinh thảo luận một câu hỏi khoa học."], ["It may exist where there is liquid water.", "Sự sống có thể tồn tại ở nơi có nước lỏng.", "Em đưa ra một giả thuyết có căn cứ."], ["How do scientists explore distant planets?", "Các nhà khoa học khám phá hành tinh xa bằng cách nào?", "Em hỏi về công nghệ vũ trụ."], ["They use telescopes and robotic spacecraft.", "Họ dùng kính thiên văn và tàu vũ trụ robot.", "Bạn giải thích hai công cụ nghiên cứu."]],
  },
];

export function gradeNineBoardUrl(slug: string) {
  return `/lesson-assets/grade-nine/${slug}.webp`;
}

export function buildGradeNineLessons(unit: GradeNineUnitSeed): GradeNineLessonSeed[] {
  const boardUrl = gradeNineBoardUrl(unit.slug);
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
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 9.", activities: sentenceActivities },
  ];
}
