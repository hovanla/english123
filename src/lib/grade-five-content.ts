import { ActivityType } from "@prisma/client";

type ActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

export type GradeFiveLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: ActivitySeed[];
};

export type GradeFiveUnitSeed = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeFiveUnits: GradeFiveUnitSeed[] = [
  {
    slug: "whats-your-address", title: "What's your address?", theme: "Nơi ở và địa chỉ", description: "Hỏi, trả lời địa chỉ và miêu tả nơi mình đang sống.",
    words: [["hometown", "quê hương"], ["town", "thị trấn"], ["province", "tỉnh"], ["countryside", "nông thôn"], ["mountain", "núi"], ["live", "sống"], ["address", "địa chỉ"], ["lane", "ngõ"], ["tower", "tòa tháp"], ["flat", "căn hộ"], ["floor", "tầng"], ["quiet", "yên tĩnh"], ["busy", "nhộn nhịp"], ["crowded", "đông đúc"], ["pretty", "xinh đẹp"]],
    sentences: [["Where are you from?", "Bạn đến từ đâu?", "Em gặp một người bạn mới và muốn hỏi quê của bạn."], ["I'm from Ha Noi.", "Mình đến từ Hà Nội.", "Em giới thiệu quê hương của mình."], ["What's your address?", "Địa chỉ của bạn là gì?", "Em muốn gửi thiệp nên hỏi địa chỉ của bạn."], ["It's quiet and pretty.", "Nơi đó yên tĩnh và xinh đẹp.", "Em miêu tả khu phố nơi mình sống."]],
  },
  {
    slug: "daily-routines", title: "I always get up early. How about you?", theme: "Thói quen hằng ngày", description: "Nói hoạt động thường ngày và mức độ thường xuyên.",
    words: [["get up", "thức dậy"], ["brush my teeth", "đánh răng"], ["wash my face", "rửa mặt"], ["have breakfast", "ăn sáng"], ["do homework", "làm bài tập"], ["partner", "bạn cùng nhóm"], ["project", "dự án"], ["always", "luôn luôn"], ["usually", "thường xuyên"], ["often", "thường"], ["sometimes", "thỉnh thoảng"], ["never", "không bao giờ"]],
    sentences: [["What do you do in the morning?", "Bạn làm gì vào buổi sáng?", "Em hỏi về thói quen buổi sáng của bạn."], ["I always get up early.", "Mình luôn thức dậy sớm.", "Em kể thói quen bắt đầu một ngày."], ["How often do you do homework?", "Bạn làm bài tập thường xuyên thế nào?", "Em hỏi tần suất làm bài tập của bạn."], ["I usually do it after school.", "Mình thường làm sau giờ học.", "Em nói thời điểm thường làm bài tập."]],
  },
  {
    slug: "where-did-you-go-on-holiday", title: "Where did you go on holiday?", theme: "Kỳ nghỉ và phương tiện", description: "Kể điểm đến và phương tiện đã dùng trong kỳ nghỉ.",
    words: [["trip", "chuyến đi"], ["airport", "sân bay"], ["ancient town", "phố cổ"], ["imperial city", "cố đô"], ["seaside", "bờ biển"], ["island", "hòn đảo"], ["motorbike", "xe máy"], ["coach", "xe khách"], ["underground", "tàu điện ngầm"], ["train", "tàu hỏa"], ["station", "nhà ga"], ["plane", "máy bay"]],
    sentences: [["Where did you go on holiday?", "Bạn đã đi đâu trong kỳ nghỉ?", "Em hỏi bạn về điểm đến của chuyến nghỉ vừa rồi."], ["I went to Hoi An Ancient Town.", "Mình đã đi Phố cổ Hội An.", "Em kể nơi gia đình đã đến."], ["How did you get there?", "Bạn đến đó bằng cách nào?", "Em hỏi phương tiện bạn đã sử dụng."], ["I went there by coach.", "Mình đến đó bằng xe khách.", "Em trả lời về phương tiện của chuyến đi."]],
  },
  {
    slug: "did-you-go-to-the-party", title: "Did you go to the party?", theme: "Bữa tiệc", description: "Hỏi và kể các hoạt động đã diễn ra tại một bữa tiệc.",
    words: [["party", "bữa tiệc"], ["invite", "mời"], ["enjoy", "thích thú"], ["join", "tham gia"], ["funfair", "hội chợ vui chơi"], ["cartoon", "phim hoạt hình"], ["dance", "nhảy múa"], ["sing", "hát"], ["chat", "trò chuyện"], ["eat cake", "ăn bánh"], ["play games", "chơi trò chơi"]],
    sentences: [["Did you go to the party?", "Bạn có đi dự tiệc không?", "Em hỏi bạn về bữa tiệc hôm qua."], ["Yes, I did.", "Có, mình đã đi.", "Em xác nhận mình có tham dự."], ["What did you do there?", "Bạn đã làm gì ở đó?", "Em muốn biết các hoạt động trong bữa tiệc."], ["We sang and played games.", "Chúng mình đã hát và chơi trò chơi.", "Em kể hai hoạt động vui ở bữa tiệc."]],
  },
  {
    slug: "weekend-plans", title: "Where will you be this weekend?", theme: "Kế hoạch cuối tuần", description: "Nói nơi sẽ đến và hoạt động dự định làm vào cuối tuần.",
    words: [["weekend", "cuối tuần"], ["think", "nghĩ"], ["explore", "khám phá"], ["cave", "hang động"], ["sunbathe", "tắm nắng"], ["seaside", "bờ biển"], ["island", "hòn đảo"], ["countryside", "nông thôn"], ["swim", "bơi"], ["visit", "thăm"], ["picnic", "dã ngoại"]],
    sentences: [["Where will you be this weekend?", "Cuối tuần này bạn sẽ ở đâu?", "Em hỏi kế hoạch địa điểm của bạn."], ["I'll be in the countryside.", "Mình sẽ ở vùng nông thôn.", "Em nói nơi sẽ đến cuối tuần."], ["What will you do there?", "Bạn sẽ làm gì ở đó?", "Em hỏi hoạt động dự định tại nơi ấy."], ["I'll explore a cave.", "Mình sẽ khám phá một hang động.", "Em kể kế hoạch phiêu lưu của mình."]],
  },
  {
    slug: "how-many-lessons-today", title: "How many lessons do you have today?", theme: "Tiết học", description: "Hỏi số tiết học, môn học và tần suất học trong tuần.",
    words: [["lesson", "tiết học"], ["copybook", "vở"], ["crayon", "bút sáp"], ["celebrate", "tổ chức kỷ niệm"], ["Maths", "Toán"], ["English", "Tiếng Anh"], ["Science", "Khoa học"], ["Music", "Âm nhạc"], ["Art", "Mỹ thuật"], ["PE", "Thể dục"], ["week", "tuần"]],
    sentences: [["How many lessons do you have today?", "Hôm nay bạn có bao nhiêu tiết học?", "Em nhìn thời khóa biểu và hỏi số tiết."], ["I have five lessons.", "Mình có năm tiết học.", "Em đếm và trả lời số tiết trong ngày."], ["How often do you have English?", "Bạn học Tiếng Anh bao nhiêu lần?", "Em hỏi tần suất học Tiếng Anh trong tuần."], ["I have it four times a week.", "Mình học bốn lần một tuần.", "Em trả lời dựa theo thời khóa biểu."]],
  },
  {
    slug: "how-do-you-learn-english", title: "How do you learn English?", theme: "Cách học Tiếng Anh", description: "Chia sẻ cách luyện từ, nghe, nói, đọc và viết Tiếng Anh.",
    words: [["foreign language", "ngoại ngữ"], ["understand", "hiểu"], ["practise", "luyện tập"], ["try", "cố gắng"], ["guess", "đoán"], ["email", "thư điện tử"], ["story", "câu chuyện"], ["travel guide", "sách hướng dẫn du lịch"], ["communication", "giao tiếp"], ["necessary", "cần thiết"], ["vocabulary", "từ vựng"], ["grammar", "ngữ pháp"]],
    sentences: [["How do you learn English?", "Bạn học Tiếng Anh như thế nào?", "Em muốn biết cách học hiệu quả của bạn."], ["I practise speaking every day.", "Mình luyện nói mỗi ngày.", "Em chia sẻ thói quen luyện giao tiếp."], ["Why do you learn English?", "Tại sao bạn học Tiếng Anh?", "Em hỏi lý do bạn học ngoại ngữ."], ["Because I want to travel.", "Vì mình muốn đi du lịch.", "Em nói mục tiêu học Tiếng Anh."]],
  },
  {
    slug: "what-are-you-reading", title: "What are you reading?", theme: "Truyện và nhân vật", description: "Nói thể loại truyện, nhân vật và tính cách trong truyện.",
    words: [["fairy tale", "truyện cổ tích"], ["detective story", "truyện trinh thám"], ["comics", "truyện tranh"], ["myth", "truyện thần thoại"], ["fable", "truyện ngụ ngôn"], ["ghost story", "truyện ma"], ["character", "nhân vật"], ["fairy", "nàng tiên"], ["prince", "hoàng tử"], ["princess", "công chúa"], ["king", "vua"], ["queen", "hoàng hậu"], ["enemy", "kẻ thù"], ["kind", "tốt bụng"], ["hard-working", "chăm chỉ"], ["clever", "thông minh"], ["brave", "dũng cảm"]],
    sentences: [["What are you reading?", "Bạn đang đọc gì?", "Em thấy bạn đang cầm một quyển sách."], ["I'm reading a fairy tale.", "Mình đang đọc truyện cổ tích.", "Em nói thể loại truyện đang đọc."], ["What's the main character like?", "Nhân vật chính như thế nào?", "Em hỏi về tính cách nhân vật chính."], ["She's kind and brave.", "Cô ấy tốt bụng và dũng cảm.", "Em nhận xét về nàng công chúa trong truyện."]],
  },
  {
    slug: "what-did-you-see-at-the-zoo", title: "What did you see at the zoo?", theme: "Động vật ở sở thú", description: "Kể con vật đã thấy, hành động và đặc điểm của chúng.",
    words: [["python", "trăn"], ["peacock", "công"], ["gorilla", "khỉ đột"], ["panda", "gấu trúc"], ["trunk", "vòi voi"], ["move", "di chuyển"], ["roar", "gầm"], ["swing", "đu"], ["spray", "phun"], ["quick", "nhanh"], ["slow", "chậm"], ["loud", "to"], ["noisy", "ồn ào"], ["intelligent", "thông minh"]],
    sentences: [["What did you see at the zoo?", "Bạn đã thấy gì ở sở thú?", "Em hỏi về chuyến tham quan sở thú."], ["I saw two pandas.", "Mình đã thấy hai con gấu trúc.", "Em kể con vật mình nhìn thấy."], ["What did the elephants do?", "Những con voi đã làm gì?", "Em hỏi hành động của đàn voi."], ["They sprayed water with their trunks.", "Chúng phun nước bằng vòi.", "Em miêu tả cảnh voi nghịch nước."]],
  },
  {
    slug: "when-will-sports-day-be", title: "When will Sports Day be?", theme: "Ngày hội ở trường", description: "Hỏi thời gian và hoạt động sẽ tham gia trong ngày hội.",
    words: [["Sports Day", "Ngày hội Thể thao"], ["singing contest", "cuộc thi hát"], ["Independence Day", "Ngày Quốc khánh"], ["take part in", "tham gia"], ["win", "chiến thắng"], ["competition", "cuộc thi"], ["race", "cuộc đua"], ["football", "bóng đá"], ["badminton", "cầu lông"], ["next month", "tháng tới"]],
    sentences: [["When will Sports Day be?", "Ngày hội Thể thao sẽ diễn ra khi nào?", "Em hỏi ngày tổ chức sự kiện ở trường."], ["It'll be next Saturday.", "Sự kiện sẽ vào thứ Bảy tới.", "Em trả lời thời gian trên thông báo."], ["What are you going to do?", "Bạn sẽ làm gì?", "Em hỏi hoạt động bạn đăng ký."], ["I'm going to take part in the race.", "Mình sẽ tham gia cuộc đua.", "Em nói phần thi của mình."]],
  },
  {
    slug: "whats-the-matter-with-you", title: "What's the matter with you?", theme: "Sức khỏe", description: "Nói triệu chứng thường gặp và đưa lời khuyên phù hợp.",
    words: [["headache", "đau đầu"], ["toothache", "đau răng"], ["earache", "đau tai"], ["stomach ache", "đau bụng"], ["backache", "đau lưng"], ["sore throat", "đau họng"], ["fever", "sốt"], ["cough", "ho"], ["cold", "cảm lạnh"], ["doctor", "bác sĩ"], ["dentist", "nha sĩ"], ["take a rest", "nghỉ ngơi"], ["take medicine", "uống thuốc"], ["keep clean", "giữ sạch"]],
    sentences: [["What's the matter with you?", "Bạn bị làm sao?", "Em thấy bạn mệt và hỏi thăm."], ["I have a headache.", "Mình bị đau đầu.", "Em nói triệu chứng đang gặp."], ["You should take a rest.", "Bạn nên nghỉ ngơi.", "Em đưa lời khuyên cho người đang mệt."], ["Thank you. I will.", "Cảm ơn bạn. Mình sẽ làm vậy.", "Em đón nhận lời khuyên lịch sự."]],
  },
  {
    slug: "dont-ride-too-fast", title: "Don't ride your bike too fast!", theme: "An toàn và tai nạn", description: "Nhận biết nguy hiểm và cảnh báo để tránh tai nạn.",
    words: [["knife", "dao"], ["stove", "bếp"], ["match", "que diêm"], ["scissors", "kéo"], ["tool", "dụng cụ"], ["helmet", "mũ bảo hiểm"], ["stairs", "cầu thang"], ["balcony", "ban công"], ["touch", "chạm"], ["bite", "cắn"], ["scratch", "cào"], ["fall", "ngã"], ["cut yourself", "tự cứa vào tay"], ["get a burn", "bị bỏng"], ["start a fire", "gây cháy"], ["call for help", "kêu cứu"], ["avoid", "tránh"]],
    sentences: [["Don't ride your bike too fast!", "Đừng đi xe đạp quá nhanh!", "Em cảnh báo bạn đang đạp xe nguy hiểm."], ["Why shouldn't I do that?", "Tại sao mình không nên làm vậy?", "Bạn muốn biết lý do của lời cảnh báo."], ["You may fall off your bike.", "Bạn có thể bị ngã xe.", "Em giải thích tai nạn có thể xảy ra."], ["Okay, I won't.", "Được rồi, mình sẽ không làm.", "Bạn đồng ý làm theo lời nhắc an toàn."]],
  },
  {
    slug: "free-time", title: "What do you do in your free time?", theme: "Hoạt động lúc rảnh", description: "Nói hoạt động mình và người thân thường làm khi rảnh.",
    words: [["free time", "thời gian rảnh"], ["karate", "võ karate"], ["jog", "chạy bộ"], ["surf the Internet", "lướt Internet"], ["go camping", "đi cắm trại"], ["hike", "đi bộ đường dài"], ["read books", "đọc sách"], ["go fishing", "đi câu cá"], ["play chess", "chơi cờ"], ["watch films", "xem phim"]],
    sentences: [["What do you do in your free time?", "Bạn làm gì lúc rảnh?", "Em hỏi sở thích khi không phải học."], ["I usually go camping.", "Mình thường đi cắm trại.", "Em kể hoạt động ngoài trời yêu thích."], ["What does your father do?", "Bố bạn làm gì lúc rảnh?", "Em hỏi hoạt động của người thân bạn."], ["He often goes fishing.", "Bố mình thường đi câu cá.", "Em trả lời về sở thích của bố."]],
  },
  {
    slug: "what-happened-in-the-story", title: "What happened in the story?", theme: "Diễn biến câu chuyện", description: "Kể sự việc và nhận xét nhân vật trong một câu chuyện.",
    words: [["fox", "cáo"], ["wolf", "sói"], ["crow", "quạ"], ["hare", "thỏ rừng"], ["mouse", "chuột"], ["happen", "xảy ra"], ["order", "ra lệnh"], ["find", "tìm thấy"], ["grow", "trồng"], ["exchange", "đổi"], ["allow", "cho phép"], ["greedy", "tham lam"], ["honest", "trung thực"], ["wise", "khôn ngoan"], ["poor", "nghèo"], ["watermelon", "dưa hấu"], ["starfruit", "khế"], ["seed", "hạt giống"], ["lucky", "may mắn"], ["surprised", "ngạc nhiên"]],
    sentences: [["What happened in the story?", "Điều gì đã xảy ra trong câu chuyện?", "Em hỏi bạn tóm tắt diễn biến chính."], ["The fox tricked the crow.", "Con cáo đã lừa con quạ.", "Em kể sự việc quan trọng trong truyện."], ["What do you think of the fox?", "Bạn nghĩ gì về con cáo?", "Em hỏi nhận xét về nhân vật."], ["I think it was clever but greedy.", "Mình nghĩ nó thông minh nhưng tham lam.", "Em nêu ý kiến về tính cách nhân vật."]],
  },
  {
    slug: "future-job", title: "What would you like to be in the future?", theme: "Nghề nghiệp tương lai", description: "Nói nghề mơ ước và lý do lựa chọn nghề đó.",
    words: [["pilot", "phi công"], ["architect", "kiến trúc sư"], ["writer", "nhà văn"], ["engineer", "kỹ sư"], ["footballer", "cầu thủ"], ["design", "thiết kế"], ["look after", "chăm sóc"], ["grow up", "lớn lên"], ["hope", "hy vọng"], ["drive", "lái"], ["space", "không gian"], ["spaceship", "tàu vũ trụ"], ["astronaut", "phi hành gia"], ["dream", "ước mơ"], ["travel", "du hành"]],
    sentences: [["What would you like to be in the future?", "Bạn muốn làm nghề gì trong tương lai?", "Em hỏi về nghề nghiệp mơ ước của bạn."], ["I'd like to be an architect.", "Mình muốn trở thành kiến trúc sư.", "Em nói nghề mình yêu thích."], ["Why would you like that job?", "Tại sao bạn thích nghề đó?", "Em hỏi lý do lựa chọn nghề."], ["Because I'd like to design buildings.", "Vì mình muốn thiết kế các tòa nhà.", "Em giải thích công việc muốn làm."]],
  },
  {
    slug: "wheres-the-post-office", title: "Where's the post office?", theme: "Địa điểm và chỉ đường", description: "Hỏi vị trí, đường đi và phương tiện đến một địa điểm.",
    words: [["bus stop", "điểm xe buýt"], ["post office", "bưu điện"], ["museum", "bảo tàng"], ["stadium", "sân vận động"], ["restaurant", "nhà hàng"], ["take a bus", "đi xe buýt"], ["go on foot", "đi bộ"], ["get on", "lên xe"], ["get off", "xuống xe"], ["stop", "dừng"], ["get lost", "bị lạc"], ["turn left", "rẽ trái"], ["turn right", "rẽ phải"], ["go straight", "đi thẳng"]],
    sentences: [["Where's the post office?", "Bưu điện ở đâu?", "Em cần gửi thư nhưng chưa biết đường."], ["It's next to the museum.", "Nó ở cạnh bảo tàng.", "Người địa phương chỉ vị trí bưu điện."], ["How can I get there?", "Mình đến đó bằng cách nào?", "Em hỏi đường và phương tiện phù hợp."], ["Go straight and turn left.", "Đi thẳng rồi rẽ trái.", "Người chỉ đường hướng dẫn hai bước."]],
  },
  {
    slug: "what-would-you-like-to-eat", title: "What would you like to eat?", theme: "Đồ ăn và định lượng", description: "Gọi món, nói lượng thức ăn và lựa chọn chế độ ăn lành mạnh.",
    words: [["sandwich", "bánh mì kẹp"], ["potato", "khoai tây"], ["sausage", "xúc xích"], ["biscuit", "bánh quy"], ["bread roll", "bánh mì cuộn"], ["tea", "trà"], ["tomato", "cà chua"], ["broth", "nước dùng"], ["butter", "bơ"], ["cheese", "phô mai"], ["egg", "trứng"], ["corn", "ngô"], ["carrot", "cà rốt"], ["cabbage", "bắp cải"], ["fresh", "tươi"], ["bowl", "bát"], ["packet", "gói"], ["glass", "ly"], ["carton", "hộp giấy"], ["bottle", "chai"], ["bar", "thanh"]],
    sentences: [["What would you like to eat?", "Bạn muốn ăn gì?", "Nhân viên hỏi món em muốn gọi."], ["I'd like a sandwich, please.", "Cho mình một chiếc bánh mì kẹp.", "Em gọi món một cách lịch sự."], ["How much water do you drink?", "Bạn uống bao nhiêu nước?", "Em hỏi lượng nước bạn uống mỗi ngày."], ["I drink four bottles a day.", "Mình uống bốn chai mỗi ngày.", "Em trả lời bằng đơn vị định lượng."]],
  },
  {
    slug: "weather-tomorrow", title: "What will the weather be like tomorrow?", theme: "Mùa và thời tiết", description: "Hỏi dự báo thời tiết và miêu tả thời tiết theo mùa.",
    words: [["season", "mùa"], ["spring", "mùa xuân"], ["summer", "mùa hè"], ["autumn", "mùa thu"], ["winter", "mùa đông"], ["forecast", "dự báo"], ["foggy", "có sương mù"], ["warm", "ấm"], ["cool", "mát"], ["dry", "khô"], ["wet", "ẩm ướt"], ["sunny", "có nắng"], ["windy", "có gió"], ["stormy", "có bão"]],
    sentences: [["What will the weather be like tomorrow?", "Ngày mai thời tiết sẽ thế nào?", "Em xem kế hoạch đi chơi và hỏi dự báo."], ["It'll be warm and sunny.", "Trời sẽ ấm và có nắng.", "Em đọc dự báo thời tiết ngày mai."], ["What's summer like in your country?", "Mùa hè ở nước bạn thế nào?", "Em hỏi đặc điểm thời tiết theo mùa."], ["It's usually hot and wet.", "Trời thường nóng và ẩm.", "Em miêu tả mùa hè nơi mình sống."]],
  },
  {
    slug: "which-place-to-visit", title: "Which place would you like to visit?", theme: "Địa điểm tham quan", description: "Chọn địa điểm muốn đến và đưa nhận xét về nơi đó.",
    words: [["pagoda", "chùa"], ["bridge", "cầu"], ["temple", "đền"], ["hill", "đồi"], ["amusement park", "công viên giải trí"], ["attractive", "hấp dẫn"], ["exciting", "sôi động"], ["interesting", "thú vị"], ["wonderful", "tuyệt vời"], ["expect", "mong đợi"], ["visit", "tham quan"], ["landmark", "địa danh"]],
    sentences: [["Which place would you like to visit?", "Bạn muốn tham quan nơi nào?", "Em cùng bạn chọn địa điểm cho chuyến đi."], ["I'd like to visit the old temple.", "Mình muốn đến thăm ngôi đền cổ.", "Em nói địa điểm mình lựa chọn."], ["What do you think of it?", "Bạn nghĩ sao về nơi đó?", "Em hỏi cảm nhận về địa danh."], ["I think it's beautiful and interesting.", "Mình nghĩ nơi đó đẹp và thú vị.", "Em đưa ra hai nhận xét về địa điểm."]],
  },
  {
    slug: "city-or-countryside", title: "Which one is more exciting, life in the city or life in the countryside?", theme: "Thành phố và nông thôn", description: "So sánh cuộc sống ở thành phố và nông thôn.",
    words: [["city", "thành phố"], ["countryside", "nông thôn"], ["noisy", "ồn ào"], ["peaceful", "yên bình"], ["modern", "hiện đại"], ["expensive", "đắt đỏ"], ["cheap", "rẻ"], ["exciting", "sôi động"], ["beautiful", "xinh đẹp"], ["convenient", "thuận tiện"], ["quiet", "yên tĩnh"], ["crowded", "đông đúc"]],
    sentences: [["Which is more exciting, the city or the countryside?", "Nơi nào sôi động hơn, thành phố hay nông thôn?", "Em so sánh nhịp sống ở hai nơi."], ["The city is more exciting.", "Thành phố sôi động hơn.", "Em đưa ra lựa chọn của mình."], ["Which one is more peaceful?", "Nơi nào yên bình hơn?", "Em tiếp tục so sánh đặc điểm khác."], ["The countryside is quieter and cheaper.", "Nông thôn yên tĩnh và rẻ hơn.", "Em so sánh bằng hai tính từ ngắn."]],
  },
];

export function gradeFiveBoardUrl(slug: string) {
  return `/lesson-assets/grade-five/${slug}.webp`;
}

export function buildGradeFiveLessons(unit: GradeFiveUnitSeed): GradeFiveLessonSeed[] {
  const boardUrl = gradeFiveBoardUrl(unit.slug);
  const sharedSprite = { spriteColumns: 5, spriteRows: 5 };
  const wordActivities: ActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh, nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "VISUAL_GUESS", prompt: "Tranh này mô tả từ hoặc cụm từ tiếng Anh nào?", imageUrl: boardUrl, imageAlt: `Tranh minh họa ${meaning}`, spriteIndex: index, ...sharedSprite, audioText: word, front: word, back: meaning },
  }));
  const matchingGroups = Array.from(
    { length: Math.ceil(unit.words.length / 8) },
    (_, index) => unit.words.slice(index * 8, index * 8 + 8),
  );
  if (matchingGroups.length > 1 && matchingGroups.at(-1)?.length === 1) {
    matchingGroups.at(-1)!.unshift(matchingGroups.at(-2)!.pop()!);
  }
  for (const [groupIndex, group] of matchingGroups.entries()) {
    wordActivities.push({
      type: ActivityType.MATCHING,
      title: unit.words.length > 8 ? `Ghép từ với nghĩa · phần ${groupIndex + 1}` : "Ghép từ với nghĩa",
      instruction: `Ghép đúng ${group.length} từ tiếng Anh với nghĩa tiếng Việt.`,
      order: unit.words.length + groupIndex + 1,
      payload: { prompt: `Ôn từ vựng chủ đề ${unit.theme}.`, pairs: group.map(([left, right]) => ({ left, right })) },
    });
  }
  const sentenceActivities: ActivitySeed[] = unit.sentences.map(([target, translation, cue], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Mẫu câu ${index + 1}: Nghe và đoán`,
    instruction: "Nhìn tình huống, bấm nghe và tự đoán câu tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "AUDIO_GUESS", prompt: cue, scenario: cue, imageUrl: boardUrl, imageAlt: `Tranh tình huống cho câu ${target}`, spriteIndex: unit.words.length + index, ...sharedSprite, audioText: target, front: target, back: translation },
  }));
  return [
    { slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Nhìn tranh, nghe và tự đoán đầy đủ từ vựng cốt lõi của chủ đề.", activities: wordActivities },
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 5.", activities: sentenceActivities },
  ];
}
