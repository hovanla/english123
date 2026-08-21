import type { BasicEnglishUnitSeed } from "./basic-english-content";
import { buildBasicEnglishLessons } from "./basic-english-content";

type UnitInput = Omit<BasicEnglishUnitSeed, "practice">;

function communicationUnit(input: UnitInput): BasicEnglishUnitSeed {
  const first = input.sentences[0];
  const second = input.sentences[1];
  return {
    ...input,
    practice: [
      {
        prompt: `Chọn câu mở đầu phù hợp với tình huống: ${first[2]}`,
        options: [first[0], "I don't have any information.", "The weather was tomorrow."],
        correctIndex: 0,
        explanation: first[1],
      },
      {
        prompt: `Câu “${second[0]}” có nghĩa là gì?`,
        options: [second[1], "Tôi chưa từng gặp người đó.", "Xin hãy đóng cửa sổ."],
        correctIndex: 0,
        explanation: second[2],
      },
    ],
  };
}

export const basicCommunicationUnits: BasicEnglishUnitSeed[] = [
  communicationUnit({
    slug: "basic-communication-names-titles", title: "Bài 1 · Tên và cách xưng hô", theme: "Names and titles", description: "Giới thiệu tên, hỏi cách xưng hô và sửa tên gọi một cách lịch sự.", grammar: "To be; Mr, Ms, Mrs, Dr và câu hỏi How should I address you?",
    words: [["first name", "tên"], ["last name", "họ"], ["full name", "họ và tên"], ["title", "danh xưng"], ["nickname", "biệt danh"], ["spell", "đánh vần"], ["form of address", "cách xưng hô"], ["introduce", "giới thiệu"], ["formal", "trang trọng"], ["prefer", "thích hơn"]],
    sentences: [["Hi, I'm Minh Tran. Nice to meet you.", "Chào bạn, tôi là Minh Trần. Rất vui được gặp bạn.", "Em giới thiệu mình khi gặp một người mới."], ["Nice to meet you too, Minh.", "Tôi cũng rất vui được gặp bạn, Minh.", "Người đối diện đáp lại lời giới thiệu."], ["How should I address you?", "Tôi nên xưng hô với anh/chị thế nào?", "Em chưa biết nên dùng tên hay danh xưng."], ["Please call me Ms Lan.", "Hãy gọi tôi là cô Lan.", "Người đối diện cho biết cách xưng hô mong muốn."]],
    visuals: ["🙂 MINH Tran", "🙂 Minh TRAN", "📛 MINH TRAN", "🧑‍⚕️ Dr Lan", "🙂 Minh ➜ “Bin”", "🔤 M-I-N-H", "👩 “Ms Lan”", "🙂🤝🙂", "🧑‍💼👔🏢", "👕👔 ➜ ❤️👔", "👋🙂  🙂", "🙂  🤝  🙂", "Lan / Ms Lan ❓", "👩 “Ms Lan” ✓"],
  }),
  communicationUnit({
    slug: "basic-communication-describing-people", title: "Bài 2 · Miêu tả người", theme: "Describing people", description: "Mô tả ngoại hình và tính cách để nhận diện người một cách tôn trọng.", grammar: "Be + adjective; have/has; What does ... look like?",
    words: [["tall", "cao"], ["short", "thấp"], ["curly", "xoăn"], ["straight", "thẳng"], ["glasses", "kính"], ["friendly", "thân thiện"], ["quiet", "ít nói"], ["helpful", "hay giúp đỡ"], ["young", "trẻ"], ["recognize", "nhận ra"]],
    sentences: [["What does your new colleague look like?", "Đồng nghiệp mới của bạn trông như thế nào?", "Em hỏi để nhận diện một người chưa gặp."], ["She's tall and has short curly hair.", "Cô ấy cao và có tóc xoăn ngắn.", "Em mô tả hai đặc điểm dễ nhận biết."], ["What's she like?", "Tính cách cô ấy thế nào?", "Em hỏi về tính cách thay vì ngoại hình."], ["She's friendly and very helpful.", "Cô ấy thân thiện và rất hay giúp đỡ.", "Em trả lời bằng hai nét tính cách tích cực."]],
    visuals: ["📏", "↕️", "🌀", "➖", "👓", "😊", "🤫", "🤲", "🌱", "👀", "👩❓", "👩🌀", "💭❓", "😊🤲"],
  }),
  communicationUnit({
    slug: "basic-communication-clothes", title: "Bài 3 · Quần áo", theme: "Clothes", description: "Nói về trang phục đang mặc, màu sắc và lựa chọn đồ phù hợp.", grammar: "Hiện tại tiếp diễn với wear; this/that/these/those.",
    words: [["shirt", "áo sơ mi"], ["jacket", "áo khoác"], ["dress", "váy"], ["trousers", "quần dài"], ["shoes", "giày"], ["size", "kích cỡ"], ["fit", "vừa"], ["wear", "mặc"], ["casual", "thường ngày"], ["formal", "trang trọng"]],
    sentences: [["What are you wearing to the event?", "Bạn sẽ mặc gì đến sự kiện?", "Em hỏi kế hoạch trang phục."], ["I'm wearing a blue shirt and black trousers.", "Tôi sẽ mặc áo xanh và quần đen.", "Em mô tả bộ đồ đã chọn."], ["Does this jacket fit me?", "Áo khoác này có vừa tôi không?", "Em hỏi ý kiến khi thử đồ."], ["Yes, it fits you really well.", "Có, nó rất vừa với bạn.", "Người đối diện đưa phản hồi tích cực."]],
    visuals: ["👔", "🧥", "👗", "👖", "👟", "📏", "✅", "👚", "👕", "🤵", "🎉👚", "👔👖", "🧥❓", "✅🙂"],
  }),
  communicationUnit({
    slug: "basic-communication-time", title: "Bài 4 · Thời gian", theme: "Time", description: "Hỏi giờ, nói lịch hẹn và xác nhận sớm hoặc muộn.", grammar: "What time; at + giờ; past/to trong cách nói giờ.",
    words: [["o'clock", "giờ đúng"], ["quarter", "mười lăm phút"], ["half", "ba mươi phút"], ["early", "sớm"], ["late", "muộn"], ["schedule", "lịch"], ["appointment", "cuộc hẹn"], ["start", "bắt đầu"], ["finish", "kết thúc"], ["around", "khoảng"]],
    sentences: [["What time does the meeting start?", "Cuộc họp bắt đầu lúc mấy giờ?", "Em hỏi giờ bắt đầu một lịch hẹn."], ["It starts at a quarter past nine.", "Nó bắt đầu lúc chín giờ mười lăm.", "Người đối diện trả lời bằng cách nói giờ."], ["Am I too early?", "Tôi có đến sớm quá không?", "Em kiểm tra khi đến trước giờ."], ["No, you're right on time.", "Không, bạn đến đúng giờ.", "Người đối diện xác nhận thời điểm phù hợp."]],
    visuals: ["🕘", "¼", "½", "⏪", "⏰", "📋", "📅", "▶️", "⏹️", "≈", "🕘❓", "🕤", "⏪❓", "✅⏰"],
  }),
  communicationUnit({
    slug: "basic-communication-dates", title: "Bài 5 · Ngày tháng", theme: "Dates", description: "Hỏi ngày, xác nhận lịch và nói ngày sinh hoặc sự kiện.", grammar: "Số thứ tự; on + ngày; in + tháng/năm.",
    words: [["date", "ngày tháng"], ["calendar", "lịch"], ["birthday", "sinh nhật"], ["anniversary", "ngày kỷ niệm"], ["weekday", "ngày trong tuần"], ["weekend", "cuối tuần"], ["month", "tháng"], ["year", "năm"], ["next", "tiếp theo"], ["available", "rảnh"]],
    sentences: [["What's the date today?", "Hôm nay là ngày bao nhiêu?", "Em hỏi ngày hiện tại."], ["It's the twelfth of August.", "Hôm nay là ngày mười hai tháng Tám.", "Người đối diện trả lời bằng số thứ tự."], ["Are you available on Friday the fifteenth?", "Bạn có rảnh vào thứ Sáu ngày mười lăm không?", "Em đề xuất một ngày cụ thể."], ["Yes, that date works for me.", "Có, ngày đó phù hợp với tôi.", "Người đối diện xác nhận lịch."]],
    visuals: ["📅", "🗓️", "🎂", "💐", "🏢", "🌤️", "📆", "🧭", "➡️", "✅", "📅❓", "1️⃣2️⃣", "📆❓", "✅📅"],
  }),
  communicationUnit({
    slug: "basic-communication-jobs", title: "Bài 6 · Nghề nghiệp", theme: "Jobs", description: "Hỏi nghề nghiệp, nơi làm việc và nhiệm vụ hằng ngày.", grammar: "Hiện tại đơn; What do you do?; work as/for/at.",
    words: [["job", "công việc"], ["company", "công ty"], ["office", "văn phòng"], ["customer", "khách hàng"], ["manager", "quản lý"], ["engineer", "kỹ sư"], ["teacher", "giáo viên"], ["nurse", "điều dưỡng"], ["shift", "ca làm"], ["responsibility", "trách nhiệm"]],
    sentences: [["What do you do for a living?", "Bạn làm nghề gì?", "Em hỏi nghề nghiệp trong cuộc trò chuyện."], ["I work as a designer for a small company.", "Tôi làm nhà thiết kế cho một công ty nhỏ.", "Em nói chức danh và nơi làm việc."], ["What does your job involve?", "Công việc của bạn gồm những gì?", "Em hỏi sâu hơn về nhiệm vụ."], ["I create visual materials for customers.", "Tôi tạo tài liệu hình ảnh cho khách hàng.", "Em mô tả nhiệm vụ chính."]],
    visuals: ["💼", "🏢", "🖥️", "🧑", "👔", "⚙️", "👩‍🏫", "🧑‍⚕️", "🕒", "📋", "💼❓", "🎨🏢", "📋❓", "🎨🧑"],
  }),
  communicationUnit({
    slug: "basic-communication-review-one", title: "Ôn tập 1 · Bài 1–6", theme: "Thông tin cá nhân và lịch hẹn", description: "Ôn cách giới thiệu, mô tả người, trang phục, giờ giấc, ngày tháng và nghề nghiệp.", grammar: "Tổng hợp to be, hiện tại đơn/tiếp diễn và giới từ thời gian.",
    words: [["introduce", "giới thiệu"], ["describe", "mô tả"], ["appearance", "ngoại hình"], ["outfit", "trang phục"], ["schedule", "lịch"], ["punctual", "đúng giờ"], ["date", "ngày"], ["occupation", "nghề nghiệp"], ["confirm", "xác nhận"], ["review", "ôn tập"]],
    sentences: [["Let me introduce my colleague, Ms Hoa.", "Để tôi giới thiệu đồng nghiệp của tôi, cô Hoa.", "Em kết hợp tên và danh xưng khi giới thiệu."], ["She's wearing a grey jacket today.", "Hôm nay cô ấy mặc áo khoác xám.", "Em mô tả trang phục hiện tại."], ["Our appointment is at ten on Monday.", "Cuộc hẹn của chúng ta lúc mười giờ thứ Hai.", "Em kết hợp giờ và ngày."], ["She works as an engineer in Hanoi.", "Cô ấy làm kỹ sư ở Hà Nội.", "Em nói nghề nghiệp và nơi làm việc."]],
    visuals: ["🤝", "📝", "👀", "👔", "📋", "⏰", "📅", "💼", "✅", "📚", "👩🤝", "🧥", "🕙📅", "⚙️🏙️"],
  }),
  communicationUnit({
    slug: "basic-communication-sports-exercise", title: "Bài 7 · Thể thao và vận động", theme: "Sports and exercise", description: "Nói về môn thể thao, tần suất tập và rủ bạn cùng vận động.", grammar: "Like/enjoy + V-ing; trạng từ tần suất; can/can't.",
    words: [["exercise", "tập thể dục"], ["football", "bóng đá"], ["swimming", "bơi lội"], ["cycling", "đạp xe"], ["gym", "phòng tập"], ["team", "đội"], ["practice", "luyện tập"], ["often", "thường xuyên"], ["fit", "khỏe mạnh"], ["join", "tham gia"]],
    sentences: [["What kind of exercise do you enjoy?", "Bạn thích loại hình vận động nào?", "Em hỏi sở thích tập luyện."], ["I enjoy cycling and swimming.", "Tôi thích đạp xe và bơi.", "Em trả lời với enjoy + V-ing."], ["Would you like to join us this weekend?", "Bạn có muốn tham gia cùng chúng tôi cuối tuần này không?", "Em mời người khác cùng tập."], ["Sure. What time do you usually start?", "Được. Các bạn thường bắt đầu lúc mấy giờ?", "Người đối diện nhận lời và hỏi lịch."]],
    visuals: ["🏃", "⚽", "🏊", "🚴", "🏋️", "👥", "🎯", "🔁", "💪", "🙋", "🏃❓", "🚴🏊", "🙋❓", "⏰❓"],
  }),
  communicationUnit({
    slug: "basic-communication-locations", title: "Bài 8 · Vị trí và địa điểm", theme: "Locations", description: "Hỏi một nơi ở đâu và mô tả vị trí tương quan dễ hiểu.", grammar: "There is/are; giới từ opposite, between, next to, near.",
    words: [["location", "vị trí"], ["near", "gần"], ["opposite", "đối diện"], ["between", "ở giữa"], ["next to", "bên cạnh"], ["corner", "góc đường"], ["entrance", "lối vào"], ["floor", "tầng"], ["building", "tòa nhà"], ["map", "bản đồ"]],
    sentences: [["Excuse me, where is the nearest pharmacy?", "Xin lỗi, nhà thuốc gần nhất ở đâu?", "Em hỏi vị trí một địa điểm cần thiết."], ["It's opposite the bank, near the corner.", "Nó đối diện ngân hàng, gần góc đường.", "Người đối diện mô tả bằng hai mốc."], ["Is the entrance on this side of the building?", "Lối vào có ở phía này của tòa nhà không?", "Em xác nhận chi tiết cuối."], ["No, it's around the back.", "Không, nó ở vòng phía sau.", "Người đối diện sửa hướng ngắn gọn."]],
    visuals: ["📍", "🤏", "↔️", "🔀", "🔗", "📐", "🚪", "🏢", "🏬", "🗺️", "💊❓", "🏦↔️", "🚪❓", "🔙"],
  }),
  communicationUnit({
    slug: "basic-communication-family", title: "Bài 9 · Gia đình", theme: "Family", description: "Giới thiệu người thân và nói ngắn về quan hệ, công việc hoặc nơi sống.", grammar: "Have/has; sở hữu cách; đại từ sở hữu.",
    words: [["parents", "bố mẹ"], ["sibling", "anh chị em ruột"], ["husband", "chồng"], ["wife", "vợ"], ["son", "con trai"], ["daughter", "con gái"], ["cousin", "anh chị em họ"], ["relative", "họ hàng"], ["married", "đã kết hôn"], ["live", "sống"]],
    sentences: [["Do you have any brothers or sisters?", "Bạn có anh chị em không?", "Em hỏi về anh chị em trong gia đình."], ["Yes, I have an older sister.", "Có, tôi có một chị gái.", "Em trả lời và nói thứ tự tuổi."], ["Where does your family live?", "Gia đình bạn sống ở đâu?", "Em hỏi thêm về nơi ở."], ["My parents live in Hue, but my sister lives nearby.", "Bố mẹ tôi sống ở Huế, còn chị tôi sống gần đây.", "Em mô tả hai nơi sống khác nhau."]],
    visuals: ["👪", "🧑‍🤝‍🧑", "🤵", "👰", "👦", "👧", "🫂", "👥", "💍", "🏠", "🧑‍🤝‍🧑❓", "👩⬆️", "🏠❓", "🏠📍"],
  }),
  communicationUnit({
    slug: "basic-communication-entertainment", title: "Bài 10 · Giải trí", theme: "Entertainment", description: "Hỏi sở thích giải trí, đề xuất hoạt động và thống nhất kế hoạch.", grammar: "Would like to; Let's; Why don't we...?",
    words: [["concert", "buổi hòa nhạc"], ["theatre", "nhà hát"], ["music", "âm nhạc"], ["game", "trò chơi"], ["show", "chương trình"], ["ticket", "vé"], ["performance", "buổi biểu diễn"], ["free time", "thời gian rảnh"], ["recommend", "giới thiệu"], ["available", "còn chỗ, rảnh"]],
    sentences: [["What do you like doing in your free time?", "Bạn thích làm gì lúc rảnh?", "Em hỏi sở thích giải trí."], ["I usually listen to music or watch a show.", "Tôi thường nghe nhạc hoặc xem chương trình.", "Em kể hai hoạt động quen thuộc."], ["Why don't we go to the concert on Saturday?", "Sao chúng ta không đi hòa nhạc thứ Bảy?", "Em đề xuất một kế hoạch."], ["That sounds great. I'll check the tickets.", "Nghe hay đấy. Tôi sẽ kiểm tra vé.", "Người đối diện đồng ý và nhận một việc."]],
    visuals: ["🎵", "🎭", "🎧", "🎮", "📺", "🎫", "👏", "🕊️", "👍", "✅", "🕊️❓", "🎧📺", "🎵📅", "🎫🔍"],
  }),
  communicationUnit({
    slug: "basic-communication-prices", title: "Bài 11 · Giá cả", theme: "Prices", description: "Hỏi giá, hiểu giảm giá và so sánh lựa chọn trong ngân sách.", grammar: "How much; this/these; so sánh hơn với cheaper/more expensive.",
    words: [["price", "giá"], ["cost", "có giá"], ["cheap", "rẻ"], ["expensive", "đắt"], ["discount", "giảm giá"], ["sale", "đợt giảm giá"], ["cash", "tiền mặt"], ["card", "thẻ"], ["change", "tiền thừa"], ["afford", "có khả năng mua"]],
    sentences: [["How much does this bag cost?", "Chiếc túi này giá bao nhiêu?", "Em hỏi giá một món đồ."], ["It's forty dollars, including tax.", "Nó giá bốn mươi đô, gồm thuế.", "Nhân viên báo tổng giá rõ ràng."], ["Is there a discount if I buy two?", "Có giảm giá nếu tôi mua hai cái không?", "Em hỏi điều kiện khuyến mãi."], ["Yes, the second one is half price.", "Có, món thứ hai giảm còn nửa giá.", "Nhân viên giải thích ưu đãi."]],
    visuals: ["🏷️", "💲", "🟢", "🔴", "🔻", "🛍️", "💵", "💳", "🪙", "🤔", "👜❓", "4️⃣0️⃣", "2️⃣❓", "½🏷️"],
  }),
  communicationUnit({
    slug: "basic-communication-restaurants", title: "Bài 12 · Nhà hàng", theme: "Restaurants", description: "Đặt bàn, gọi món, nêu yêu cầu ăn uống và thanh toán.", grammar: "I'd like; Could I have; some/any.",
    words: [["reservation", "đặt bàn"], ["menu", "thực đơn"], ["order", "gọi món"], ["starter", "món khai vị"], ["main course", "món chính"], ["dessert", "món tráng miệng"], ["bill", "hóa đơn"], ["vegetarian", "ăn chay"], ["allergy", "dị ứng"], ["recommend", "giới thiệu"]],
    sentences: [["I'd like a table for two, please.", "Tôi muốn một bàn cho hai người.", "Em yêu cầu bàn tại nhà hàng."], ["Certainly. Do you have a reservation?", "Vâng. Anh/chị đã đặt bàn chưa?", "Nhân viên kiểm tra thông tin đặt bàn."], ["Could you recommend a vegetarian main course?", "Bạn có thể giới thiệu món chính chay không?", "Em hỏi món phù hợp nhu cầu ăn uống."], ["The vegetable curry is very popular.", "Cà ri rau củ rất được ưa chuộng.", "Nhân viên giới thiệu một món cụ thể."]],
    visuals: ["📅", "📖", "📝", "🥗", "🍛", "🍰", "🧾", "🌿", "⚠️", "👍", "2️⃣🍽️", "📅❓", "🌿❓", "🍛⭐"],
  }),
  communicationUnit({
    slug: "basic-communication-small-talk", title: "Bài 13 · Chuyện trò xã giao", theme: "Small talk", description: "Mở đầu trò chuyện, duy trì bằng câu hỏi tiếp nối và kết thúc lịch sự.", grammar: "Câu hỏi đuôi đơn giản; câu hỏi mở với how/what.",
    words: [["conversation", "cuộc trò chuyện"], ["weekend", "cuối tuần"], ["local", "địa phương"], ["event", "sự kiện"], ["interesting", "thú vị"], ["busy", "bận"], ["enjoy", "thích"], ["meet", "gặp"], ["chat", "trò chuyện"], ["anyway", "dù sao"]],
    sentences: [["It's a lovely place, isn't it?", "Nơi này đẹp nhỉ?", "Em mở lời bằng nhận xét chung an toàn."], ["It is. Have you been here before?", "Đúng vậy. Bạn đã từng đến đây chưa?", "Người đối diện đáp và hỏi tiếp."], ["What did you get up to at the weekend?", "Cuối tuần bạn đã làm gì?", "Em chuyển sang một chủ đề đời thường."], ["I visited a local food festival.", "Tôi đã ghé lễ hội ẩm thực địa phương.", "Em chia sẻ một trải nghiệm ngắn."]],
    visuals: ["💬", "🌤️", "📍", "🎪", "✨", "📚", "😊", "🤝", "🗣️", "➡️", "🏞️❓", "🔁❓", "🌤️❓", "🎪🍜"],
  }),
  communicationUnit({
    slug: "basic-communication-vacations", title: "Bài 14 · Kỳ nghỉ", theme: "Vacations", description: "Nói về kế hoạch nghỉ, phương tiện, chỗ ở và hoạt động muốn thử.", grammar: "Be going to; tương lai với will; giới từ du lịch.",
    words: [["vacation", "kỳ nghỉ"], ["trip", "chuyến đi"], ["hotel", "khách sạn"], ["beach", "bãi biển"], ["mountain", "núi"], ["book", "đặt"], ["flight", "chuyến bay"], ["luggage", "hành lý"], ["sightseeing", "tham quan"], ["relax", "thư giãn"]],
    sentences: [["Are you going anywhere for your vacation?", "Bạn có đi đâu trong kỳ nghỉ không?", "Em hỏi kế hoạch du lịch."], ["Yes, we're going to spend a week in Da Nang.", "Có, chúng tôi sẽ dành một tuần ở Đà Nẵng.", "Em nói điểm đến và thời lượng."], ["Have you booked your hotel yet?", "Bạn đã đặt khách sạn chưa?", "Em hỏi tiến độ chuẩn bị."], ["Not yet. We'll do it tonight.", "Chưa. Tối nay chúng tôi sẽ đặt.", "Người đối diện nêu quyết định sắp làm."]],
    visuals: ["🏖️", "🧳", "🏨", "🌊", "⛰️", "✅", "✈️", "🛄", "📸", "🧘", "🏖️❓", "📍7️⃣", "🏨❓", "🌙✅"],
  }),
  communicationUnit({
    slug: "basic-communication-apartment-living", title: "Bài 15 · Sống ở căn hộ", theme: "Apartment living", description: "Mô tả căn hộ, tiện ích và trao đổi lịch sự về vấn đề hàng xóm.", grammar: "There is/are; have got; could để yêu cầu lịch sự.",
    words: [["apartment", "căn hộ"], ["rent", "tiền thuê"], ["landlord", "chủ nhà"], ["neighbor", "hàng xóm"], ["elevator", "thang máy"], ["balcony", "ban công"], ["furnished", "có nội thất"], ["noise", "tiếng ồn"], ["parking", "chỗ đỗ xe"], ["maintenance", "bảo trì"]],
    sentences: [["What's your new apartment like?", "Căn hộ mới của bạn thế nào?", "Em hỏi mô tả nơi ở mới."], ["It's small, but it has a sunny balcony.", "Nó nhỏ nhưng có ban công nhiều nắng.", "Em mô tả ưu và nhược điểm."], ["Could you keep the noise down after ten?", "Bạn có thể giảm tiếng ồn sau mười giờ không?", "Em đề nghị hàng xóm một cách lịch sự."], ["Of course. Sorry about that.", "Tất nhiên. Xin lỗi về việc đó.", "Người đối diện xin lỗi và đồng ý."]],
    visuals: ["🏢", "💵", "🧑", "🏘️", "🛗", "🌤️", "🛋️", "🔊", "🅿️", "🛠️", "🏢❓", "🌤️🏠", "🔉❓", "🙏✅"],
  }),
  communicationUnit({
    slug: "basic-communication-movies", title: "Bài 16 · Phim ảnh", theme: "Movies", description: "Hỏi thể loại phim, đưa nhận xét và gợi ý phim phù hợp.", grammar: "Quá khứ đơn; tính từ -ed/-ing; which/that.",
    words: [["movie", "bộ phim"], ["comedy", "phim hài"], ["drama", "phim chính kịch"], ["action", "phim hành động"], ["actor", "diễn viên"], ["director", "đạo diễn"], ["plot", "cốt truyện"], ["ending", "đoạn kết"], ["funny", "hài hước"], ["recommend", "giới thiệu"]],
    sentences: [["What kind of movies are you into?", "Bạn thích thể loại phim nào?", "Em hỏi sở thích phim ảnh tự nhiên."], ["I like comedies that have clever dialogue.", "Tôi thích phim hài có lời thoại thông minh.", "Em nêu thể loại và đặc điểm yêu thích."], ["What did you think of the ending?", "Bạn thấy đoạn kết thế nào?", "Em hỏi nhận xét sau khi xem."], ["It was surprising but a little confusing.", "Nó bất ngờ nhưng hơi khó hiểu.", "Em đưa đánh giá cân bằng."]],
    visuals: ["🎬", "😂", "🎭", "💥", "🧑‍🎤", "🎥", "📖", "🔚", "😄", "👍", "🎬❓", "😂💬", "🔚❓", "😮🤔"],
  }),
  communicationUnit({
    slug: "basic-communication-weather", title: "Bài 17 · Thời tiết", theme: "Weather", description: "Mô tả thời tiết, hỏi dự báo và thay đổi kế hoạch theo điều kiện.", grammar: "It is; be going to trong dự báo; may/might.",
    words: [["sunny", "nắng"], ["cloudy", "nhiều mây"], ["windy", "có gió"], ["humid", "ẩm"], ["storm", "bão"], ["forecast", "dự báo"], ["temperature", "nhiệt độ"], ["shower", "mưa rào"], ["clear", "quang đãng"], ["umbrella", "ô"]],
    sentences: [["What's the weather supposed to be like tomorrow?", "Ngày mai dự báo thời tiết thế nào?", "Em hỏi dự báo để lên kế hoạch."], ["It's going to be cloudy with a few showers.", "Trời sẽ nhiều mây và có vài cơn mưa rào.", "Người đối diện tóm tắt dự báo."], ["Should we move the picnic indoors?", "Chúng ta có nên chuyển buổi dã ngoại vào trong không?", "Em đề xuất điều chỉnh kế hoạch."], ["Let's wait and check the forecast again tonight.", "Hãy đợi và xem lại dự báo tối nay.", "Người đối diện đề xuất chưa quyết định vội."]],
    visuals: ["☀️", "☁️", "💨", "💧", "⛈️", "📡", "🌡️", "🌦️", "🌤️", "☂️", "🌤️❓", "☁️🌦️", "🧺🏠❓", "🌙📡"],
  }),
  communicationUnit({
    slug: "basic-communication-shopping", title: "Bài 18 · Mua sắm", theme: "Shopping", description: "Tìm sản phẩm, hỏi kích cỡ, thử đồ và đổi trả lịch sự.", grammar: "Could/Can I; one/ones; too/enough.",
    words: [["shop", "cửa hàng"], ["size", "kích cỡ"], ["try on", "thử đồ"], ["receipt", "hóa đơn"], ["return", "trả hàng"], ["exchange", "đổi hàng"], ["available", "có sẵn"], ["aisle", "lối hàng"], ["checkout", "quầy thanh toán"], ["customer", "khách hàng"]],
    sentences: [["Do you have this in a larger size?", "Bạn có món này cỡ lớn hơn không?", "Em hỏi một biến thể sản phẩm."], ["Let me check what's available.", "Để tôi kiểm tra hàng còn sẵn.", "Nhân viên phản hồi trước khi đi tìm."], ["Can I exchange it if it doesn't fit?", "Tôi có thể đổi nếu nó không vừa không?", "Em hỏi chính sách đổi hàng."], ["Yes, as long as you keep the receipt.", "Có, miễn là bạn giữ hóa đơn.", "Nhân viên nêu điều kiện đổi hàng."]],
    visuals: ["🏬", "📏", "👕", "🧾", "↩️", "🔄", "✅", "🛒", "💳", "🧑", "📏❓", "🔍✅", "🔄❓", "🧾✅"],
  }),
  communicationUnit({
    slug: "basic-communication-telephones", title: "Bài 19 · Gọi điện thoại", theme: "Using telephones", description: "Mở đầu cuộc gọi, xin gặp người cần tìm, để lại lời nhắn và xử lý mất tiếng.", grammar: "May/Could I speak to; lời nhắn gián tiếp.",
    words: [["call", "cuộc gọi"], ["answer", "trả lời"], ["message", "lời nhắn"], ["voicemail", "hộp thư thoại"], ["hold", "giữ máy"], ["line", "đường dây"], ["signal", "tín hiệu"], ["repeat", "lặp lại"], ["available", "có mặt"], ["call back", "gọi lại"]],
    sentences: [["Hello, could I speak to Mr Nam, please?", "Xin chào, tôi có thể gặp ông Nam không?", "Em gọi đến và xin gặp một người."], ["I'm afraid he's not available right now.", "Rất tiếc, hiện giờ ông ấy không có mặt.", "Người nhận cuộc gọi báo người cần gặp đang bận."], ["Could I leave a message?", "Tôi có thể để lại lời nhắn không?", "Em chọn để lại thông tin."], ["Of course. I'll ask him to call you back.", "Được. Tôi sẽ nhờ ông ấy gọi lại.", "Người nhận xác nhận sẽ chuyển lời."]],
    visuals: ["📞", "✅", "✉️", "🔊", "⏸️", "〰️", "📶", "🔁", "🟢", "↩️", "📞👨❓", "🚫🕒", "✉️❓", "↩️✅"],
  }),
  communicationUnit({
    slug: "basic-communication-describing-things", title: "Bài 20 · Miêu tả đồ vật", theme: "Describing things", description: "Mô tả hình dạng, chất liệu, công dụng và đặc điểm để xác định đồ vật.", grammar: "What is it like/used for/made of; mệnh đề quan hệ.",
    words: [["shape", "hình dạng"], ["round", "tròn"], ["square", "vuông"], ["material", "chất liệu"], ["wooden", "bằng gỗ"], ["metal", "kim loại"], ["heavy", "nặng"], ["light", "nhẹ"], ["useful", "hữu ích"], ["purpose", "công dụng"]],
    sentences: [["What does the item look like?", "Món đồ trông như thế nào?", "Em hỏi đặc điểm để tìm một đồ vật."], ["It's small, round and made of metal.", "Nó nhỏ, tròn và làm bằng kim loại.", "Em mô tả kích thước, hình và chất liệu."], ["What is it used for?", "Nó được dùng để làm gì?", "Em hỏi công dụng khi chưa đoán ra."], ["It's used for opening bottles.", "Nó dùng để mở chai.", "Người đối diện giải thích công dụng."]],
    visuals: ["🔷", "⭕", "⬜", "🧱", "🪵", "🔩", "🏋️", "🪶", "🧰", "🎯", "📦❓", "⭕🔩", "🧰❓", "🍾🔓"],
  }),
  communicationUnit({
    slug: "basic-communication-directions", title: "Bài 21 · Chỉ đường", theme: "Directions", description: "Hỏi đường, nghe các bước rẽ và xác nhận mốc đến.", grammar: "Mệnh lệnh; turn/go/cross; until/when.",
    words: [["straight", "thẳng"], ["turn", "rẽ"], ["left", "trái"], ["right", "phải"], ["cross", "băng qua"], ["traffic lights", "đèn giao thông"], ["intersection", "giao lộ"], ["block", "dãy phố"], ["past", "đi qua"], ["destination", "điểm đến"]],
    sentences: [["Could you tell me how to get to the station?", "Bạn có thể chỉ tôi đường đến ga không?", "Em hỏi đường một cách lịch sự."], ["Go straight for two blocks, then turn left.", "Đi thẳng hai dãy phố rồi rẽ trái.", "Người đối diện đưa hai bước rõ ràng."], ["Is it before or after the traffic lights?", "Nó ở trước hay sau đèn giao thông?", "Em xác nhận mốc dễ nhầm."], ["It's just after the lights, on your right.", "Nó ngay sau đèn, bên phải bạn.", "Người đối diện bổ sung vị trí cuối."]],
    visuals: ["⬆️", "↪️", "⬅️", "➡️", "🚸", "🚦", "➕", "🏙️", "⏩", "📍", "🚉❓", "2️⃣⬅️", "🚦❓", "🚦➡️"],
  }),
  communicationUnit({
    slug: "basic-communication-people-we-know", title: "Bài 22 · Những người quen", theme: "People we know", description: "Nói về cách quen một người, mối quan hệ hiện tại và điểm chung.", grammar: "Quá khứ đơn với meet; hiện tại hoàn thành với know; for/since.",
    words: [["friend", "bạn"], ["colleague", "đồng nghiệp"], ["neighbor", "hàng xóm"], ["classmate", "bạn cùng lớp"], ["meet", "gặp"], ["know", "quen, biết"], ["together", "cùng nhau"], ["close", "thân thiết"], ["keep in touch", "giữ liên lạc"], ["introduce", "giới thiệu"]],
    sentences: [["How do you know Linh?", "Bạn quen Linh thế nào?", "Em hỏi về mối liên hệ giữa hai người."], ["We met when we worked at the same company.", "Chúng tôi gặp nhau khi làm cùng công ty.", "Em kể hoàn cảnh lần đầu gặp."], ["Have you known each other long?", "Hai bạn quen nhau lâu chưa?", "Em hỏi thời gian mối quan hệ."], ["Yes, we've been friends for about eight years.", "Có, chúng tôi là bạn khoảng tám năm rồi.", "Em trả lời bằng hiện tại hoàn thành với for."]],
    visuals: ["🤝", "🧑‍💼", "🏘️", "🎓", "👋", "🧠", "👥", "💛", "📱", "🙋", "👩❓", "🏢🤝", "⏳❓", "8️⃣💛"],
  }),
  communicationUnit({
    slug: "basic-communication-health", title: "Bài 23 · Sức khỏe", theme: "Health", description: "Mô tả triệu chứng thường gặp, hỏi thời gian và hiểu lời khuyên cơ bản.", grammar: "Have got; present perfect với for/since; should.",
    words: [["headache", "đau đầu"], ["fever", "sốt"], ["cough", "ho"], ["sore throat", "đau họng"], ["tired", "mệt"], ["pain", "đau"], ["medicine", "thuốc"], ["rest", "nghỉ ngơi"], ["appointment", "lịch hẹn"], ["doctor", "bác sĩ"]],
    sentences: [["What seems to be the problem?", "Bạn đang gặp vấn đề gì?", "Nhân viên y tế hỏi triệu chứng chính."], ["I've had a sore throat for three days.", "Tôi đau họng ba ngày rồi.", "Em mô tả triệu chứng và thời gian."], ["Do you have a fever or a cough?", "Bạn có sốt hoặc ho không?", "Nhân viên hỏi thêm triệu chứng liên quan."], ["You should rest and arrange an appointment if it gets worse.", "Bạn nên nghỉ và đặt lịch khám nếu nặng hơn.", "Người đối diện đưa lời khuyên an toàn chung."]],
    visuals: ["🤕", "🌡️", "😷", "🗣️", "😴", "⚡", "💊", "🛌", "📅", "🧑‍⚕️", "🩺❓", "🗣️3️⃣", "🌡️😷❓", "🛌📅"],
  }),
  communicationUnit({
    slug: "basic-communication-review-final", title: "Ôn tập cuối · Bài 7–23", theme: "Giao tiếp đời sống tổng hợp", description: "Ôn cách mời, hỏi vị trí, mua sắm, gọi điện, chỉ đường, nói quan hệ và sức khỏe.", grammar: "Tổng hợp câu hỏi lịch sự, các thì cơ bản và động từ khuyết thiếu.",
    words: [["invite", "mời"], ["locate", "xác định vị trí"], ["recommend", "giới thiệu"], ["reserve", "đặt trước"], ["exchange", "đổi"], ["message", "lời nhắn"], ["describe", "mô tả"], ["direction", "chỉ dẫn"], ["relationship", "mối quan hệ"], ["advice", "lời khuyên"]],
    sentences: [["Could you recommend somewhere nearby for dinner?", "Bạn có thể giới thiệu chỗ ăn tối gần đây không?", "Em kết hợp hỏi địa điểm và nhà hàng."], ["There's a popular restaurant opposite the station.", "Có một nhà hàng nổi tiếng đối diện nhà ga.", "Người đối diện giới thiệu và chỉ vị trí."], ["I'll call to reserve a table and leave a message if necessary.", "Tôi sẽ gọi đặt bàn và để lại lời nhắn nếu cần.", "Em kết hợp kỹ năng gọi điện và đặt chỗ."], ["After dinner, could you show me the way back?", "Sau bữa tối, bạn có thể chỉ đường về cho tôi không?", "Em dùng yêu cầu lịch sự trong tình huống tổng hợp."]],
    visuals: ["🙋", "📍", "👍", "📅", "🔄", "✉️", "📝", "🧭", "🤝", "💡", "🍽️❓", "🚉🍴", "📞📅", "🧭🏠"],
  }),
];

export function basicCommunicationBoardUrl(slug: string) {
  const situationalBoards = new Set([
    "basic-communication-names-titles",
    "basic-communication-describing-people",
    "basic-communication-clothes",
    "basic-communication-time",
    "basic-communication-dates",
    "basic-communication-jobs",
    "basic-communication-sports-exercise",
  ]);
  if (situationalBoards.has(slug)) {
    return `/basic-communication/boards/${slug}-v5.png`;
  }
  return `/basic-communication/boards/${slug}.svg?v=4`;
}

export function buildBasicCommunicationLessons(unit: BasicEnglishUnitSeed) {
  return buildBasicEnglishLessons(unit, { boardUrl: basicCommunicationBoardUrl(unit.slug) });
}
