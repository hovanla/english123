import { ActivityType } from "@prisma/client";

type ActivitySeed = { type: ActivityType; title: string; instruction: string; order: number; payload: Record<string, unknown> };
export type GradeElevenLessonSeed = { slug: string; title: string; description: string; activities: ActivitySeed[] };
export type GradeElevenUnitSeed = {
  slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeElevenUnits: GradeElevenUnitSeed[] = [
  {
    slug: "friendship", title: "Friendship", theme: "Tình bạn chân thành", description: "Xây dựng tình bạn, bày tỏ sự tin tưởng và giải quyết hiểu lầm một cách tôn trọng.",
    words: [["friendship", "tình bạn"], ["trust", "sự tin tưởng"], ["loyalty", "lòng trung thành"], ["honesty", "sự trung thực"], ["sympathy", "sự đồng cảm"], ["companion", "người bạn đồng hành"], ["secret", "bí mật"], ["misunderstanding", "sự hiểu lầm"], ["supportive", "biết hỗ trợ"], ["reliable", "đáng tin cậy"], ["forgive", "tha thứ"], ["confide", "tâm sự"]],
    sentences: [["What do you value most in a friend?", "Bạn coi trọng điều gì nhất ở một người bạn?", "Hai học sinh trao đổi về tình bạn."], ["I value honesty and reliability.", "Mình coi trọng sự trung thực và đáng tin cậy.", "Bạn nói những phẩm chất quan trọng."], ["Can we talk about what happened?", "Chúng ta có thể nói về chuyện đã xảy ra không?", "Em muốn giải quyết một hiểu lầm."], ["Of course. I don't want this to affect our friendship.", "Tất nhiên. Mình không muốn chuyện này ảnh hưởng tình bạn.", "Người bạn đồng ý trò chuyện thẳng thắn."]],
  },
  {
    slug: "personal-experiences", title: "Personal Experiences", theme: "Trải nghiệm đáng nhớ", description: "Kể lại sự việc, diễn tả cảm xúc và rút ra bài học từ trải nghiệm cá nhân.",
    words: [["experience", "trải nghiệm"], ["memory", "ký ức"], ["incident", "sự việc"], ["embarrassment", "sự ngượng ngùng"], ["surprise", "sự bất ngờ"], ["confidence", "sự tự tin"], ["challenge", "thử thách"], ["decision", "quyết định"], ["realize", "nhận ra"], ["overcome", "vượt qua"], ["memorable", "đáng nhớ"], ["unexpected", "bất ngờ"]],
    sentences: [["What is an experience you'll never forget?", "Trải nghiệm nào bạn sẽ không bao giờ quên?", "Em hỏi bạn về một kỷ niệm đáng nhớ."], ["I once got lost during a school trip.", "Mình từng bị lạc trong một chuyến đi của trường.", "Bạn bắt đầu kể lại sự việc."], ["How did you handle the situation?", "Bạn đã xử lý tình huống thế nào?", "Em hỏi cách bạn vượt qua thử thách."], ["I stayed calm and asked a guide for help.", "Mình giữ bình tĩnh và nhờ hướng dẫn viên giúp.", "Bạn chia sẻ cách giải quyết."]],
  },
  {
    slug: "a-party", title: "A Party", theme: "Tổ chức buổi tiệc", description: "Mời khách, phân công chuẩn bị và ứng xử lịch sự trong một buổi gặp mặt.",
    words: [["party", "buổi tiệc"], ["invitation", "lời mời"], ["host", "chủ tiệc"], ["guest", "khách mời"], ["venue", "địa điểm"], ["decoration", "đồ trang trí"], ["refreshment", "đồ ăn nhẹ"], ["gift", "quà tặng"], ["celebrate", "ăn mừng"], ["attend", "tham dự"], ["organize", "tổ chức"], ["welcome", "chào đón"]],
    sentences: [["Would you like to come to my party?", "Bạn có muốn đến dự tiệc của mình không?", "Em mời một người bạn đến buổi tiệc."], ["I'd love to. What time does it start?", "Mình rất muốn. Tiệc bắt đầu lúc mấy giờ?", "Người bạn nhận lời và hỏi thời gian."], ["Can I help you prepare anything?", "Mình có thể giúp bạn chuẩn bị gì không?", "Em đề nghị hỗ trợ chủ tiệc."], ["Could you bring some fruit and drinks?", "Bạn có thể mang một ít trái cây và đồ uống không?", "Chủ tiệc phân công một việc cụ thể."]],
  },
  {
    slug: "volunteer-work", title: "Volunteer Work", theme: "Hoạt động tình nguyện", description: "Lựa chọn hoạt động cộng đồng, phân công nhiệm vụ và phản hồi về tác động của việc thiện nguyện.",
    words: [["volunteer", "tình nguyện viên"], ["community", "cộng đồng"], ["charity", "tổ chức từ thiện"], ["donation", "đồ quyên góp"], ["campaign", "chiến dịch"], ["shelter", "mái ấm"], ["fundraising", "gây quỹ"], ["participant", "người tham gia"], ["contribute", "đóng góp"], ["deliver", "trao tặng"], ["assist", "hỗ trợ"], ["meaningful", "ý nghĩa"]],
    sentences: [["Which volunteer activity should we join?", "Chúng ta nên tham gia hoạt động tình nguyện nào?", "Nhóm học sinh chọn hoạt động cuối tuần."], ["Let's help at the community food bank.", "Hãy giúp tại ngân hàng thực phẩm cộng đồng.", "Bạn đề xuất một nơi cần hỗ trợ."], ["What task can I take responsibility for?", "Mình có thể phụ trách nhiệm vụ nào?", "Em hỏi cách đóng góp cụ thể."], ["You can sort and pack the donations.", "Bạn có thể phân loại và đóng gói đồ quyên góp.", "Điều phối viên giao nhiệm vụ."]],
  },
  {
    slug: "illiteracy", title: "Illiteracy", theme: "Xóa mù chữ và cơ hội học tập", description: "Thảo luận rào cản đọc viết và những giải pháp mở rộng cơ hội giáo dục.",
    words: [["illiteracy", "nạn mù chữ"], ["literacy", "khả năng đọc viết"], ["education", "giáo dục"], ["learner", "người học"], ["textbook", "sách giáo khoa"], ["classroom", "lớp học"], ["opportunity", "cơ hội"], ["barrier", "rào cản"], ["remote", "xa xôi"], ["educate", "giáo dục"], ["encourage", "khuyến khích"], ["accessible", "dễ tiếp cận"]],
    sentences: [["Why do some adults struggle to read?", "Tại sao một số người lớn gặp khó khăn khi đọc?", "Em tìm hiểu nguyên nhân của nạn mù chữ."], ["They may not have had access to school.", "Họ có thể đã không có cơ hội đến trường.", "Bạn giải thích một rào cản giáo dục."], ["How can we support adult learners?", "Chúng ta hỗ trợ người học trưởng thành bằng cách nào?", "Nhóm học sinh thảo luận giải pháp."], ["We can provide free evening classes.", "Chúng ta có thể mở lớp buổi tối miễn phí.", "Em đề xuất một chương trình dễ tiếp cận."]],
  },
  {
    slug: "competitions", title: "Competitions", theme: "Cuộc thi và tinh thần tiến bộ", description: "Đăng ký cuộc thi, chuẩn bị chiến lược và phản hồi tích cực sau kết quả.",
    words: [["competition", "cuộc thi"], ["contestant", "thí sinh"], ["judge", "giám khảo"], ["prize", "giải thưởng"], ["round", "vòng thi"], ["score", "điểm số"], ["rule", "luật"], ["challenge", "thử thách"], ["participate", "tham gia"], ["perform", "thể hiện"], ["qualify", "đủ điều kiện"], ["fair", "công bằng"]],
    sentences: [["Are you entering the speaking competition?", "Bạn có tham gia cuộc thi nói không?", "Em hỏi bạn về một cuộc thi ở trường."], ["Yes, but I need more practice.", "Có, nhưng mình cần luyện tập thêm.", "Bạn chia sẻ sự chuẩn bị của mình."], ["How did you feel about the result?", "Bạn cảm thấy thế nào về kết quả?", "Em hỏi sau khi cuộc thi kết thúc."], ["I didn't win, but the feedback helped me improve.", "Mình không thắng, nhưng phản hồi giúp mình tiến bộ.", "Bạn nhìn nhận kết quả tích cực."]],
  },
  {
    slug: "world-population", title: "World Population", theme: "Dân số thế giới", description: "Đọc xu hướng dân số và thảo luận tác động đến tài nguyên, dịch vụ và chất lượng sống.",
    words: [["population", "dân số"], ["growth", "sự tăng trưởng"], ["density", "mật độ"], ["birth rate", "tỷ lệ sinh"], ["life expectancy", "tuổi thọ"], ["migration", "di cư"], ["urbanization", "đô thị hóa"], ["resource", "tài nguyên"], ["shortage", "sự thiếu hụt"], ["overcrowded", "quá đông"], ["decline", "suy giảm"], ["forecast", "dự báo"]],
    sentences: [["Why is the city's population growing so quickly?", "Tại sao dân số thành phố tăng nhanh vậy?", "Nhóm học sinh phân tích một biểu đồ."], ["Many people are moving there for work.", "Nhiều người chuyển đến đó để làm việc.", "Bạn giải thích tác động của di cư."], ["What challenges can rapid growth cause?", "Tăng trưởng nhanh có thể gây những thách thức nào?", "Em hỏi về hệ quả dân số."], ["It can put pressure on housing and transport.", "Nó có thể gây áp lực lên nhà ở và giao thông.", "Bạn nêu hai dịch vụ bị ảnh hưởng."]],
  },
  {
    slug: "celebrations", title: "Celebrations", theme: "Lễ hội và truyền thống", description: "Giới thiệu phong tục, so sánh lễ hội và tham gia sự kiện văn hóa một cách tôn trọng.",
    words: [["celebration", "lễ kỷ niệm"], ["festival", "lễ hội"], ["tradition", "truyền thống"], ["custom", "phong tục"], ["ceremony", "nghi lễ"], ["ancestor", "tổ tiên"], ["firework", "pháo hoa"], ["lantern", "đèn lồng"], ["feast", "bữa tiệc lớn"], ["decorate", "trang trí"], ["gather", "sum họp"], ["honor", "tôn vinh"]],
    sentences: [["How does your family celebrate the new year?", "Gia đình bạn đón năm mới như thế nào?", "Em hỏi một người bạn về truyền thống gia đình."], ["We gather for a meal and visit our relatives.", "Chúng mình sum họp ăn cơm và thăm họ hàng.", "Bạn kể hai hoạt động quen thuộc."], ["What does this ceremony represent?", "Nghi lễ này tượng trưng cho điều gì?", "Em tìm hiểu ý nghĩa văn hóa."], ["It honors our ancestors and family traditions.", "Nó tôn vinh tổ tiên và truyền thống gia đình.", "Bạn giải thích giá trị của nghi lễ."]],
  },
  {
    slug: "the-post-office", title: "The Post Office", theme: "Bưu chính và dịch vụ giao nhận", description: "Gửi thư, lựa chọn dịch vụ và xử lý tình huống theo dõi bưu kiện.",
    words: [["post office", "bưu điện"], ["parcel", "bưu kiện"], ["envelope", "phong bì"], ["stamp", "tem"], ["address", "địa chỉ"], ["postcode", "mã bưu chính"], ["delivery", "giao hàng"], ["express", "chuyển phát nhanh"], ["counter", "quầy giao dịch"], ["weigh", "cân"], ["track", "theo dõi"], ["receive", "nhận"]],
    sentences: [["I'd like to send this parcel overseas.", "Tôi muốn gửi bưu kiện này ra nước ngoài.", "Em yêu cầu dịch vụ tại quầy bưu điện."], ["Would you like standard or express delivery?", "Bạn muốn giao thường hay chuyển phát nhanh?", "Nhân viên hỏi loại dịch vụ."], ["How can I track the parcel?", "Tôi theo dõi bưu kiện bằng cách nào?", "Em hỏi sau khi hoàn tất gửi hàng."], ["Use the tracking number on your receipt.", "Hãy dùng mã theo dõi trên biên nhận.", "Nhân viên hướng dẫn kiểm tra hành trình."]],
  },
  {
    slug: "nature-in-danger", title: "Nature in Danger", theme: "Thiên nhiên bị đe dọa", description: "Nhận diện mối đe dọa với sinh vật và lựa chọn hành động bảo vệ hệ sinh thái.",
    words: [["nature", "thiên nhiên"], ["habitat", "môi trường sống"], ["species", "loài"], ["extinction", "sự tuyệt chủng"], ["poaching", "săn trộm"], ["deforestation", "phá rừng"], ["pollution", "ô nhiễm"], ["ecosystem", "hệ sinh thái"], ["endangered", "có nguy cơ tuyệt chủng"], ["destroy", "phá hủy"], ["protect", "bảo vệ"], ["restore", "phục hồi"]],
    sentences: [["Why is this species endangered?", "Tại sao loài này có nguy cơ tuyệt chủng?", "Em hỏi một chuyên gia bảo tồn."], ["Its habitat is being destroyed by deforestation.", "Môi trường sống của nó đang bị phá hủy do phá rừng.", "Chuyên gia nêu nguyên nhân chính."], ["What can people do to protect it?", "Mọi người có thể làm gì để bảo vệ nó?", "Em tìm hành động thiết thực."], ["We must protect its habitat and stop poaching.", "Chúng ta phải bảo vệ nơi sống và ngăn săn trộm.", "Chuyên gia đưa ra hai ưu tiên."]],
  },
  {
    slug: "sources-of-energy", title: "Sources of Energy", theme: "Nguồn năng lượng", description: "So sánh nguồn năng lượng và đánh giá lựa chọn an toàn, hiệu quả, bền vững.",
    words: [["energy", "năng lượng"], ["fossil fuel", "nhiên liệu hóa thạch"], ["coal", "than đá"], ["oil", "dầu mỏ"], ["solar power", "năng lượng mặt trời"], ["wind power", "năng lượng gió"], ["hydropower", "thủy điện"], ["nuclear power", "năng lượng hạt nhân"], ["renewable", "tái tạo"], ["consume", "tiêu thụ"], ["generate", "sản xuất"], ["efficient", "hiệu quả"]],
    sentences: [["Which energy source is best for this area?", "Nguồn năng lượng nào phù hợp nhất với khu vực này?", "Nhóm học sinh thiết kế một dự án năng lượng."], ["Solar power is suitable because it's sunny here.", "Năng lượng mặt trời phù hợp vì nơi đây nhiều nắng.", "Bạn lựa chọn dựa trên điều kiện địa phương."], ["What is the main disadvantage?", "Nhược điểm chính là gì?", "Em đánh giá phương án một cách cân bằng."], ["It cannot generate much power at night.", "Nó không thể tạo nhiều điện vào ban đêm.", "Bạn nêu hạn chế của năng lượng mặt trời."]],
  },
  {
    slug: "the-asian-games", title: "The Asian Games", theme: "Đại hội Thể thao châu Á", description: "Trao đổi về môn thi đấu, thành tích vận động viên và tinh thần thể thao quốc tế.",
    words: [["Asian Games", "Đại hội Thể thao châu Á"], ["athlete", "vận động viên"], ["event", "nội dung thi đấu"], ["medal", "huy chương"], ["record", "kỷ lục"], ["stadium", "sân vận động"], ["ceremony", "lễ"], ["delegation", "đoàn thể thao"], ["compete", "thi đấu"], ["represent", "đại diện"], ["host", "đăng cai"], ["achievement", "thành tích"]],
    sentences: [["Which event are you most excited to watch?", "Bạn mong chờ xem nội dung nào nhất?", "Hai bạn xem lịch thi đấu."], ["I'm looking forward to the swimming finals.", "Mình mong chờ các trận chung kết bơi.", "Bạn nói môn thi đấu yêu thích."], ["How did the athlete break the record?", "Vận động viên đã phá kỷ lục như thế nào?", "Em hỏi về một thành tích nổi bật."], ["She trained consistently and finished strongly.", "Cô ấy tập luyện đều đặn và về đích mạnh mẽ.", "Bạn giải thích yếu tố thành công."]],
  },
  {
    slug: "hobbies", title: "Hobbies", theme: "Sở thích cá nhân", description: "Chia sẻ sở thích, giải thích động lực và cân bằng hoạt động với học tập.",
    words: [["hobby", "sở thích"], ["collection", "bộ sưu tập"], ["photography", "nhiếp ảnh"], ["gardening", "làm vườn"], ["painting", "vẽ tranh"], ["knitting", "đan len"], ["instrument", "nhạc cụ"], ["leisure", "thời gian rảnh"], ["creative", "sáng tạo"], ["patient", "kiên nhẫn"], ["collect", "sưu tầm"], ["relax", "thư giãn"]],
    sentences: [["What hobby have you taken up recently?", "Gần đây bạn bắt đầu sở thích nào?", "Em hỏi về hoạt động lúc rảnh."], ["I've started learning photography.", "Mình bắt đầu học nhiếp ảnh.", "Bạn giới thiệu sở thích mới."], ["What do you enjoy about it?", "Bạn thích điều gì ở sở thích đó?", "Em hỏi về động lực duy trì."], ["It helps me notice beauty in everyday life.", "Nó giúp mình nhận ra vẻ đẹp trong đời thường.", "Bạn nói lợi ích tinh thần."]],
  },
  {
    slug: "recreation", title: "Recreation", theme: "Giải trí lành mạnh", description: "Lên kế hoạch thời gian rảnh và lựa chọn hoạt động cân bằng thể chất, tinh thần.",
    words: [["recreation", "sự giải trí"], ["leisure", "thời gian nhàn rỗi"], ["outdoor", "ngoài trời"], ["indoor", "trong nhà"], ["camping", "cắm trại"], ["hiking", "đi bộ đường dài"], ["picnic", "dã ngoại"], ["board game", "trò chơi bàn"], ["fitness", "thể lực"], ["socialize", "giao lưu"], ["refresh", "làm mới tinh thần"], ["balance", "cân bằng"]],
    sentences: [["What shall we do this weekend?", "Cuối tuần này chúng ta làm gì?", "Nhóm bạn lên kế hoạch giải trí."], ["How about hiking in the hills?", "Đi bộ đường dài trên đồi nhé?", "Bạn đề xuất một hoạt động ngoài trời."], ["What if the weather turns bad?", "Nếu thời tiết xấu thì sao?", "Em nghĩ đến phương án dự phòng."], ["We can play board games at my house.", "Chúng ta có thể chơi trò chơi bàn ở nhà mình.", "Bạn đưa ra kế hoạch trong nhà."]],
  },
  {
    slug: "space-conquest", title: "Space Conquest", theme: "Chinh phục không gian", description: "Tìm hiểu sứ mệnh vũ trụ, công nghệ khám phá và những thách thức của phi hành gia.",
    words: [["space", "không gian"], ["astronaut", "phi hành gia"], ["spacecraft", "tàu vũ trụ"], ["rocket", "tên lửa"], ["orbit", "quỹ đạo"], ["mission", "sứ mệnh"], ["satellite", "vệ tinh"], ["gravity", "trọng lực"], ["launch", "phóng"], ["land", "hạ cánh"], ["explore", "khám phá"], ["achievement", "thành tựu"]],
    sentences: [["What is the goal of this space mission?", "Mục tiêu của sứ mệnh không gian này là gì?", "Em xem buổi giới thiệu một nhiệm vụ khoa học."], ["It will study the surface of Mars.", "Nó sẽ nghiên cứu bề mặt Sao Hỏa.", "Nhà khoa học giải thích mục tiêu."], ["What is the greatest challenge for astronauts?", "Thách thức lớn nhất với phi hành gia là gì?", "Em hỏi về cuộc sống ngoài không gian."], ["They must adapt to low gravity and isolation.", "Họ phải thích nghi với trọng lực thấp và sự cô lập.", "Bạn nêu hai khó khăn quan trọng."]],
  },
  {
    slug: "the-wonders-of-the-world", title: "The Wonders of the World", theme: "Kỳ quan thế giới", description: "Khám phá công trình nổi tiếng, giải thích giá trị và đề xuất cách bảo tồn di sản.",
    words: [["wonder", "kỳ quan"], ["monument", "công trình tưởng niệm"], ["pyramid", "kim tự tháp"], ["temple", "đền"], ["citadel", "thành cổ"], ["architecture", "kiến trúc"], ["construction", "sự xây dựng"], ["civilization", "nền văn minh"], ["ancient", "cổ đại"], ["magnificent", "tráng lệ"], ["preserve", "bảo tồn"], ["recognize", "công nhận"]],
    sentences: [["Which world wonder would you like to visit?", "Bạn muốn thăm kỳ quan thế giới nào?", "Hai học sinh chọn điểm đến mơ ước."], ["I'd like to see the ancient pyramids.", "Mình muốn ngắm các kim tự tháp cổ.", "Bạn nói công trình mình quan tâm."], ["Why is this site considered a wonder?", "Tại sao nơi này được coi là kỳ quan?", "Em hỏi về giá trị của di sản."], ["Its design and construction were extraordinary.", "Thiết kế và cách xây dựng của nó rất phi thường.", "Bạn giải thích điều làm công trình nổi bật."]],
  },
];

export function gradeElevenBoardUrl(slug: string) {
  return `/lesson-assets/grade-eleven/${slug}.webp`;
}

export function buildGradeElevenLessons(unit: GradeElevenUnitSeed): GradeElevenLessonSeed[] {
  const boardUrl = gradeElevenBoardUrl(unit.slug);
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
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 11.", activities: sentenceActivities },
  ];
}
