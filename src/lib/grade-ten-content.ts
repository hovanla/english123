import { ActivityType } from "@prisma/client";

type ActivitySeed = { type: ActivityType; title: string; instruction: string; order: number; payload: Record<string, unknown> };
export type GradeTenLessonSeed = { slug: string; title: string; description: string; activities: ActivitySeed[] };
export type GradeTenUnitSeed = {
  slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeTenUnits: GradeTenUnitSeed[] = [
  {
    slug: "a-day-in-the-life-of", title: "A Day in the Life of", theme: "Một ngày thường nhật", description: "Kể lịch sinh hoạt, công việc hằng ngày và cách sắp xếp thời gian hợp lý.",
    words: [["routine", "thói quen"], ["occupation", "nghề nghiệp"], ["schedule", "lịch trình"], ["household", "việc nhà"], ["commute", "đi lại hằng ngày"], ["shift", "ca làm việc"], ["break", "giờ nghỉ"], ["deadline", "hạn chót"], ["productive", "hiệu quả"], ["prepare", "chuẩn bị"], ["harvest", "thu hoạch"], ["rest", "nghỉ ngơi"]],
    sentences: [["What time does your day usually begin?", "Ngày của bạn thường bắt đầu lúc mấy giờ?", "Em phỏng vấn một người về lịch sinh hoạt."], ["I usually get up at half past five.", "Mình thường thức dậy lúc năm giờ rưỡi.", "Người được hỏi mô tả buổi sáng."], ["How do you organize your work?", "Bạn sắp xếp công việc như thế nào?", "Em hỏi cách quản lý một ngày bận rộn."], ["I make a schedule and take short breaks.", "Mình lập lịch và nghỉ ngắn giữa giờ.", "Người bạn chia sẻ cách làm việc hiệu quả."]],
  },
  {
    slug: "school-talks", title: "School Talks", theme: "Trò chuyện ở trường", description: "Bắt chuyện, trao đổi môn học và tham gia các hoạt động trong môi trường học đường.",
    words: [["classmate", "bạn cùng lớp"], ["subject", "môn học"], ["timetable", "thời khóa biểu"], ["assignment", "bài tập"], ["presentation", "bài thuyết trình"], ["laboratory", "phòng thí nghiệm"], ["canteen", "căng tin"], ["club", "câu lạc bộ"], ["enroll", "đăng ký"], ["discuss", "thảo luận"], ["confident", "tự tin"], ["nervous", "lo lắng"]],
    sentences: [["Which subject do you enjoy most?", "Bạn thích môn học nào nhất?", "Hai học sinh mới làm quen trong giờ nghỉ."], ["I enjoy biology because we do experiments.", "Mình thích sinh học vì được làm thí nghiệm.", "Bạn giải thích lý do yêu thích môn học."], ["Are you joining any school clubs?", "Bạn có tham gia câu lạc bộ nào không?", "Em hỏi về hoạt động sau giờ học."], ["I've enrolled in the debate club.", "Mình đã đăng ký câu lạc bộ tranh biện.", "Bạn chia sẻ lựa chọn của mình."]],
  },
  {
    slug: "peoples-background", title: "People's Background", theme: "Tiểu sử và thành tựu", description: "Hỏi và trình bày quá trình học tập, nghề nghiệp cùng những cột mốc quan trọng.",
    words: [["background", "hoàn cảnh"], ["biography", "tiểu sử"], ["education", "học vấn"], ["degree", "bằng cấp"], ["career", "sự nghiệp"], ["achievement", "thành tựu"], ["research", "nghiên cứu"], ["graduate", "tốt nghiệp"], ["award", "giải thưởng"], ["influence", "ảnh hưởng"], ["determined", "quyết tâm"], ["remarkable", "đáng chú ý"]],
    sentences: [["Where did she receive her education?", "Cô ấy được học tập ở đâu?", "Em tìm hiểu tiểu sử một nhân vật."], ["She graduated from university in Paris.", "Cô ấy tốt nghiệp đại học tại Paris.", "Bạn cung cấp một mốc học vấn."], ["What was her greatest achievement?", "Thành tựu lớn nhất của cô ấy là gì?", "Em hỏi về đóng góp nổi bật."], ["Her research changed modern medicine.", "Nghiên cứu của cô ấy đã thay đổi y học hiện đại.", "Bạn tóm tắt tầm ảnh hưởng của nhân vật."]],
  },
  {
    slug: "special-education", title: "Special Education", theme: "Giáo dục hòa nhập", description: "Thấu hiểu nhu cầu học tập khác nhau và đề xuất cách hỗ trợ để mọi người cùng tiến bộ.",
    words: [["inclusive", "hòa nhập"], ["disability", "khuyết tật"], ["accessibility", "khả năng tiếp cận"], ["braille", "chữ nổi Braille"], ["sign language", "ngôn ngữ ký hiệu"], ["support", "hỗ trợ"], ["adapt", "điều chỉnh"], ["individual", "cá nhân"], ["visual", "thuộc thị giác"], ["hearing", "thính giác"], ["patient", "kiên nhẫn"], ["independent", "độc lập"]],
    sentences: [["How can we make this lesson accessible?", "Chúng ta làm bài học này dễ tiếp cận hơn bằng cách nào?", "Nhóm học sinh thiết kế tài liệu hòa nhập."], ["We can add captions and clear visuals.", "Chúng ta có thể thêm phụ đề và hình ảnh rõ ràng.", "Em đề xuất một cách hỗ trợ người học."], ["Does everyone need the same kind of help?", "Mọi người có cần cùng một kiểu trợ giúp không?", "Em suy nghĩ về nhu cầu cá nhân."], ["No, support should match each learner's needs.", "Không, hỗ trợ nên phù hợp nhu cầu từng người.", "Giáo viên giải thích nguyên tắc hòa nhập."]],
  },
  {
    slug: "technology-and-you", title: "Technology and You", theme: "Công nghệ trong cuộc sống", description: "Sử dụng thiết bị số, giải quyết sự cố và bảo vệ thông tin cá nhân.",
    words: [["device", "thiết bị"], ["software", "phần mềm"], ["keyboard", "bàn phím"], ["screen", "màn hình"], ["storage", "bộ nhớ"], ["database", "cơ sở dữ liệu"], ["network", "mạng"], ["password", "mật khẩu"], ["install", "cài đặt"], ["update", "cập nhật"], ["backup", "sao lưu"], ["secure", "bảo mật"]],
    sentences: [["Why isn't this application working?", "Tại sao ứng dụng này không hoạt động?", "Em gặp sự cố khi dùng máy tính."], ["It may need a software update.", "Có thể nó cần được cập nhật phần mềm.", "Bạn phán đoán nguyên nhân."], ["How can I protect my files?", "Mình bảo vệ tệp bằng cách nào?", "Em hỏi về an toàn dữ liệu."], ["Use a strong password and make regular backups.", "Hãy dùng mật khẩu mạnh và sao lưu thường xuyên.", "Bạn đưa ra hai biện pháp bảo mật."]],
  },
  {
    slug: "an-excursion", title: "An Excursion", theme: "Chuyến tham quan", description: "Lập kế hoạch, chuẩn bị và trao đổi thông tin cho một chuyến học tập ngoài lớp.",
    words: [["excursion", "chuyến tham quan"], ["destination", "điểm đến"], ["itinerary", "lịch trình chuyến đi"], ["permission", "sự cho phép"], ["transport", "phương tiện"], ["departure", "khởi hành"], ["arrival", "đến nơi"], ["admission", "vé vào cửa"], ["guide", "hướng dẫn viên"], ["equipment", "dụng cụ"], ["reserve", "đặt trước"], ["assemble", "tập trung"]],
    sentences: [["Where are we going on the excursion?", "Chúng ta sẽ đi tham quan ở đâu?", "Lớp nghe phổ biến kế hoạch ngoại khóa."], ["We're visiting the science museum.", "Chúng ta sẽ thăm bảo tàng khoa học.", "Bạn thông báo điểm đến."], ["What should we bring with us?", "Chúng ta nên mang theo gì?", "Em chuẩn bị đồ cho chuyến đi."], ["Bring your notebook and arrive by seven.", "Hãy mang sổ ghi chép và có mặt trước bảy giờ.", "Lớp trưởng nhắc đồ dùng và thời gian."]],
  },
  {
    slug: "the-mass-media", title: "The Mass Media", theme: "Truyền thông đại chúng", description: "So sánh các kênh truyền thông, chọn nội dung phù hợp và đánh giá thông tin có trách nhiệm.",
    words: [["mass media", "truyền thông đại chúng"], ["broadcast", "chương trình phát sóng"], ["channel", "kênh"], ["audience", "khán giả"], ["documentary", "phim tài liệu"], ["headline", "tiêu đề tin"], ["journalist", "nhà báo"], ["advertisement", "quảng cáo"], ["coverage", "phạm vi đưa tin"], ["current affairs", "thời sự"], ["inform", "cung cấp thông tin"], ["entertain", "giải trí"]],
    sentences: [["How do you usually follow the news?", "Bạn thường theo dõi tin tức bằng cách nào?", "Em hỏi thói quen tiếp nhận thông tin."], ["I listen to a morning news podcast.", "Mình nghe podcast tin tức buổi sáng.", "Bạn nói kênh truyền thông yêu thích."], ["Why do you trust this report?", "Tại sao bạn tin bản tin này?", "Em đánh giá độ tin cậy của nội dung."], ["It includes evidence from several sources.", "Bản tin có bằng chứng từ nhiều nguồn.", "Bạn giải thích cách kiểm chứng."]],
  },
  {
    slug: "the-story-of-my-village", title: "The Story of My Village", theme: "Sự đổi thay của quê hương", description: "Miêu tả thay đổi ở cộng đồng và trao đổi về lợi ích, thách thức của phát triển.",
    words: [["village", "làng quê"], ["community", "cộng đồng"], ["road", "con đường"], ["bridge", "cây cầu"], ["irrigation", "hệ thống tưới tiêu"], ["crop", "cây trồng"], ["market", "chợ"], ["facility", "cơ sở vật chất"], ["develop", "phát triển"], ["improve", "cải thiện"], ["transform", "thay đổi"], ["prosperous", "thịnh vượng"]],
    sentences: [["How has the village changed?", "Ngôi làng đã thay đổi như thế nào?", "Em trò chuyện với một người dân lâu năm."], ["The new bridge has improved transportation.", "Cây cầu mới đã cải thiện việc đi lại.", "Người dân kể một thay đổi tích cực."], ["Has development created any problems?", "Sự phát triển có gây ra vấn đề nào không?", "Em tìm hiểu cả hai mặt của thay đổi."], ["Yes, we need to manage waste more carefully.", "Có, chúng ta cần quản lý rác thải cẩn thận hơn.", "Người dân nêu một thách thức mới."]],
  },
  {
    slug: "undersea-world", title: "Undersea World", theme: "Thế giới dưới biển", description: "Khám phá hệ sinh thái biển, mô tả sinh vật và thảo luận cách bảo vệ đại dương.",
    words: [["ocean", "đại dương"], ["coral reef", "rạn san hô"], ["marine life", "sinh vật biển"], ["whale", "cá voi"], ["dolphin", "cá heo"], ["jellyfish", "sứa"], ["depth", "độ sâu"], ["current", "dòng hải lưu"], ["habitat", "môi trường sống"], ["species", "loài"], ["dive", "lặn"], ["observe", "quan sát"]],
    sentences: [["What animals live around the coral reef?", "Những loài nào sống quanh rạn san hô?", "Em quan sát mô hình hệ sinh thái biển."], ["Many fish and sea turtles live there.", "Nhiều loài cá và rùa biển sống ở đó.", "Bạn kể tên sinh vật trong rạn san hô."], ["Why are coral reefs important?", "Tại sao rạn san hô quan trọng?", "Em hỏi vai trò của môi trường biển."], ["They provide food and shelter for marine life.", "Chúng cung cấp thức ăn và nơi trú ẩn cho sinh vật biển.", "Bạn giải thích chức năng của rạn san hô."]],
  },
  {
    slug: "conservation", title: "Conservation", theme: "Bảo tồn thiên nhiên", description: "Nhận diện nguy cơ với môi trường và lựa chọn hành động sử dụng tài nguyên bền vững.",
    words: [["conservation", "sự bảo tồn"], ["ecosystem", "hệ sinh thái"], ["biodiversity", "đa dạng sinh học"], ["resource", "tài nguyên"], ["deforestation", "phá rừng"], ["erosion", "xói mòn"], ["pollution", "ô nhiễm"], ["endangered", "có nguy cơ tuyệt chủng"], ["restore", "phục hồi"], ["preserve", "gìn giữ"], ["sustainable", "bền vững"], ["campaign", "chiến dịch"]],
    sentences: [["What is threatening this forest?", "Điều gì đang đe dọa khu rừng này?", "Nhóm học sinh nghiên cứu một hệ sinh thái."], ["Illegal logging is destroying animal habitats.", "Khai thác gỗ trái phép đang phá hủy nơi sống của động vật.", "Em xác định nguyên nhân chính."], ["How can our community help?", "Cộng đồng chúng ta có thể giúp bằng cách nào?", "Em tìm giải pháp bảo tồn."], ["We can restore native trees and reduce waste.", "Chúng ta có thể phục hồi cây bản địa và giảm rác thải.", "Bạn đề xuất hai hành động cụ thể."]],
  },
  {
    slug: "national-parks", title: "National Parks", theme: "Vườn quốc gia", description: "Tìm hiểu cảnh quan, quy định tham quan và vai trò của khu bảo tồn.",
    words: [["national park", "vườn quốc gia"], ["landscape", "cảnh quan"], ["trail", "đường mòn"], ["waterfall", "thác nước"], ["cave", "hang động"], ["wildlife", "động vật hoang dã"], ["ranger", "kiểm lâm"], ["visitor", "du khách"], ["campground", "khu cắm trại"], ["boundary", "ranh giới"], ["protect", "bảo vệ"], ["explore", "khám phá"]],
    sentences: [["Which trail should we take?", "Chúng ta nên đi đường mòn nào?", "Nhóm bạn xem bản đồ vườn quốc gia."], ["The forest trail leads to a waterfall.", "Đường mòn xuyên rừng dẫn đến một thác nước.", "Kiểm lâm hướng dẫn lộ trình."], ["Are visitors allowed to feed animals?", "Du khách có được cho động vật ăn không?", "Em hỏi về quy định bảo vệ thiên nhiên."], ["No, wildlife must remain undisturbed.", "Không, động vật hoang dã cần được để yên.", "Kiểm lâm giải thích quy tắc tham quan."]],
  },
  {
    slug: "music", title: "Music", theme: "Âm nhạc và cảm xúc", description: "Trao đổi về thể loại, nhạc cụ và vai trò của âm nhạc trong cuộc sống.",
    words: [["melody", "giai điệu"], ["rhythm", "nhịp điệu"], ["lyrics", "lời bài hát"], ["composer", "nhà soạn nhạc"], ["musician", "nhạc công"], ["instrument", "nhạc cụ"], ["performance", "buổi biểu diễn"], ["concert", "hòa nhạc"], ["classical", "cổ điển"], ["folk", "dân gian"], ["inspire", "truyền cảm hứng"], ["rehearse", "tập dượt"]],
    sentences: [["What kind of music do you listen to?", "Bạn nghe thể loại nhạc nào?", "Hai người bạn chia sẻ sở thích âm nhạc."], ["I enjoy folk music with traditional instruments.", "Mình thích nhạc dân gian có nhạc cụ truyền thống.", "Bạn mô tả thể loại yêu thích."], ["How does this song make you feel?", "Bài hát này khiến bạn cảm thấy thế nào?", "Em trao đổi cảm xúc sau khi nghe nhạc."], ["Its melody makes me feel calm.", "Giai điệu của nó khiến mình thấy bình yên.", "Bạn diễn tả tác động của âm nhạc."]],
  },
  {
    slug: "films-and-cinema", title: "Films and Cinema", theme: "Điện ảnh", description: "Chọn phim, nhận xét nội dung và trao đổi về các yếu tố tạo nên một tác phẩm điện ảnh.",
    words: [["cinema", "rạp chiếu phim"], ["director", "đạo diễn"], ["actor", "diễn viên"], ["character", "nhân vật"], ["plot", "cốt truyện"], ["scene", "cảnh phim"], ["soundtrack", "nhạc phim"], ["subtitle", "phụ đề"], ["documentary", "phim tài liệu"], ["comedy", "phim hài"], ["review", "bài đánh giá"], ["recommend", "giới thiệu"]],
    sentences: [["What film would you recommend?", "Bạn giới thiệu bộ phim nào?", "Em chọn phim cho buổi tối cuối tuần."], ["I'd recommend a documentary about space.", "Mình giới thiệu một phim tài liệu về không gian.", "Bạn đưa ra lựa chọn phù hợp."], ["What did you think of the ending?", "Bạn nghĩ gì về phần kết?", "Hai bạn nhận xét sau khi xem phim."], ["It was surprising but made sense.", "Nó bất ngờ nhưng hợp lý.", "Bạn đánh giá cốt truyện."]],
  },
  {
    slug: "the-world-cup", title: "The World Cup", theme: "Bóng đá thế giới", description: "Theo dõi giải đấu, bình luận trận đấu và thể hiện tinh thần thể thao.",
    words: [["tournament", "giải đấu"], ["team", "đội"], ["player", "cầu thủ"], ["coach", "huấn luyện viên"], ["stadium", "sân vận động"], ["supporter", "cổ động viên"], ["qualify", "giành quyền tham dự"], ["score", "ghi bàn"], ["defend", "phòng ngự"], ["champion", "nhà vô địch"], ["final", "trận chung kết"], ["fair play", "chơi đẹp"]],
    sentences: [["Which team are you supporting?", "Bạn đang cổ vũ đội nào?", "Hai cổ động viên trò chuyện trước trận đấu."], ["I'm supporting the team in blue.", "Mình đang cổ vũ đội mặc áo xanh.", "Bạn nói lựa chọn của mình."], ["How did they reach the final?", "Họ vào chung kết bằng cách nào?", "Em hỏi về hành trình của đội bóng."], ["They defended well and scored late goals.", "Họ phòng ngự tốt và ghi bàn vào cuối trận.", "Bạn tóm tắt chiến thuật của đội."]],
  },
  {
    slug: "cities", title: "Cities", theme: "Thành phố và cuộc sống đô thị", description: "So sánh thành phố, hỏi đường và thảo luận giải pháp cho không gian đô thị đáng sống.",
    words: [["capital", "thủ đô"], ["population", "dân số"], ["landmark", "địa danh nổi bật"], ["district", "quận"], ["suburb", "ngoại ô"], ["transportation", "giao thông"], ["skyscraper", "nhà chọc trời"], ["pedestrian", "người đi bộ"], ["crowded", "đông đúc"], ["modern", "hiện đại"], ["historic", "cổ kính"], ["convenient", "thuận tiện"]],
    sentences: [["What do you like most about this city?", "Bạn thích điều gì nhất ở thành phố này?", "Em trò chuyện với một người dân địa phương."], ["I like its parks and public transport.", "Mình thích công viên và giao thông công cộng.", "Người dân nêu hai ưu điểm."], ["How can we make the center less crowded?", "Chúng ta làm trung tâm bớt đông bằng cách nào?", "Nhóm học sinh thảo luận quy hoạch đô thị."], ["We could improve buses and pedestrian areas.", "Chúng ta có thể cải thiện xe buýt và khu đi bộ.", "Em đề xuất một giải pháp."]],
  },
  {
    slug: "historical-place", title: "Historical Place", theme: "Di tích lịch sử", description: "Tìm hiểu giá trị của di sản, ứng xử khi tham quan và góp phần gìn giữ ký ức cộng đồng.",
    words: [["historical site", "di tích lịch sử"], ["monument", "đài tưởng niệm"], ["citadel", "thành cổ"], ["temple", "đền"], ["dynasty", "triều đại"], ["architecture", "kiến trúc"], ["artifact", "hiện vật"], ["heritage", "di sản"], ["ancestor", "tổ tiên"], ["restore", "trùng tu"], ["preserve", "bảo tồn"], ["commemorate", "tưởng niệm"]],
    sentences: [["When was this citadel built?", "Thành cổ này được xây khi nào?", "Em hỏi hướng dẫn viên về một di tích."], ["It was built during the early dynasty.", "Nó được xây vào thời kỳ đầu của triều đại.", "Hướng dẫn viên cung cấp bối cảnh lịch sử."], ["Why should we preserve this place?", "Tại sao chúng ta nên bảo tồn nơi này?", "Em suy nghĩ về giá trị của di sản."], ["It helps future generations understand their history.", "Nó giúp thế hệ tương lai hiểu lịch sử của mình.", "Bạn giải thích ý nghĩa của việc gìn giữ."]],
  },
];

export function gradeTenBoardUrl(slug: string) {
  return `/lesson-assets/grade-ten/${slug}.webp`;
}

export function buildGradeTenLessons(unit: GradeTenUnitSeed): GradeTenLessonSeed[] {
  const boardUrl = gradeTenBoardUrl(unit.slug);
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
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 10.", activities: sentenceActivities },
  ];
}
