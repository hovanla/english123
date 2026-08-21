import { ActivityType } from "@prisma/client";
import { buildSecondaryReactionActivities } from "./secondary-reaction";

type ActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

export type BeginnerConversationLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: ActivitySeed[];
};

export type BeginnerConversationUnitSeed = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  words: Array<[word: string, meaning: string]>;
  sentences: Array<[target: string, translation: string, scenario: string]>;
  visuals: string[];
};

export const beginnerConversationUnits: BeginnerConversationUnitSeed[] = [
  {
    slug: "first-meeting", title: "Ngày 1 · Gặp nhau lần đầu", theme: "Chào hỏi lần đầu", description: "Mở lời tự nhiên, giới thiệu ngắn và đáp lại khi làm quen.",
    words: [["hello", "xin chào"], ["hi", "chào"], ["meet", "gặp"], ["name", "tên"], ["new", "mới"], ["friend", "người bạn"], ["welcome", "chào mừng"], ["too", "cũng vậy"]],
    sentences: [["Hello, I'm Minh.", "Xin chào, tôi là Minh.", "Em gặp một người mới và chủ động giới thiệu tên."], ["Hi, I'm Anna.", "Chào bạn, tôi là Anna.", "Người đối diện mỉm cười và giới thiệu lại."], ["Nice to meet you.", "Rất vui được gặp bạn.", "Em muốn thể hiện sự thân thiện sau khi biết tên người kia."], ["Nice to meet you too.", "Tôi cũng rất vui được gặp bạn.", "Em đáp lại lời chào làm quen của người đối diện."]],
    visuals: ["👋", "🙂", "🤝", "🏷️", "✨", "🧑‍🤝‍🧑", "🙌", "↔️", "🧑👋", "👩👋", "🤝😊", "😊🤝"],
  },
  {
    slug: "daily-greetings", title: "Ngày 2 · Chào hỏi hằng ngày", theme: "Lời chào theo thời điểm", description: "Chọn lời chào phù hợp buổi sáng, chiều, tối và hỏi thăm.",
    words: [["morning", "buổi sáng"], ["afternoon", "buổi chiều"], ["evening", "buổi tối"], ["today", "hôm nay"], ["fine", "khỏe, ổn"], ["great", "rất tốt"], ["busy", "bận"], ["tired", "mệt"]],
    sentences: [["Good morning! How are you?", "Chào buổi sáng! Bạn khỏe không?", "Em gặp đồng nghiệp vào đầu ngày."], ["I'm fine, thank you.", "Tôi khỏe, cảm ơn bạn.", "Em đáp lại câu hỏi thăm sức khỏe."], ["Good afternoon. How is your day?", "Chào buổi chiều. Hôm nay của bạn thế nào?", "Em gặp lại một người vào buổi chiều."], ["It's going well.", "Mọi việc đang diễn ra tốt.", "Em trả lời ngắn về ngày hôm nay."]],
    visuals: ["🌅", "☀️", "🌆", "📅", "😊", "🌟", "💼", "😴", "🌅👋", "😊👍", "☀️💬", "📈😊"],
  },
  {
    slug: "natural-goodbyes", title: "Ngày 3 · Tạm biệt tự nhiên", theme: "Kết thúc cuộc trò chuyện", description: "Tạm biệt lịch sự và nói thời điểm có thể gặp lại.",
    words: [["goodbye", "tạm biệt"], ["bye", "chào nhé"], ["later", "sau nhé"], ["soon", "sớm"], ["again", "lại"], ["tomorrow", "ngày mai"], ["weekend", "cuối tuần"], ["take care", "giữ gìn sức khỏe"]],
    sentences: [["I have to go now.", "Bây giờ tôi phải đi rồi.", "Em cần kết thúc cuộc trò chuyện để rời đi."], ["Okay. See you tomorrow.", "Được rồi. Hẹn gặp bạn ngày mai.", "Người đối diện xác nhận lần gặp tiếp theo."], ["Thanks for your time.", "Cảm ơn bạn đã dành thời gian.", "Em kết thúc một cuộc trao đổi lịch sự."], ["Take care. See you soon.", "Giữ gìn sức khỏe. Hẹn sớm gặp lại.", "Em chào một người bạn trước khi rời đi."]],
    visuals: ["👋", "👋🙂", "⏭️", "🔜", "🔁", "🌤️", "🗓️", "💚", "🚶👋", "📅👋", "🙏⏰", "💚👋"],
  },
  {
    slug: "names-and-spelling", title: "Ngày 4 · Tên và cách đánh vần", theme: "Hỏi và giới thiệu tên", description: "Hỏi tên, tên đầy đủ và nhờ đánh vần khi chưa nghe rõ.",
    words: [["first name", "tên"], ["last name", "họ"], ["full name", "họ và tên"], ["spell", "đánh vần"], ["letter", "chữ cái"], ["repeat", "lặp lại"], ["call", "gọi"], ["nickname", "biệt danh"]],
    sentences: [["What's your name?", "Bạn tên là gì?", "Em muốn biết tên người vừa gặp."], ["My name is Linh.", "Tôi tên là Linh.", "Em trả lời bằng tên mình."], ["How do you spell that?", "Tên đó đánh vần thế nào?", "Em nghe được tên nhưng chưa biết cách viết."], ["You can call me Lily.", "Bạn có thể gọi tôi là Lily.", "Em giới thiệu tên thường dùng của mình."]],
    visuals: ["🙂", "👤", "🪪", "🔤", "🔠", "🔁", "📣", "🏷️", "❓🏷️", "🙂🏷️", "🔤❓", "📣🙂"],
  },
  {
    slug: "hometown-and-home", title: "Ngày 5 · Quê quán và nơi ở", theme: "Nơi mình đến và đang sống", description: "Phân biệt quê quán với nơi ở hiện tại và hỏi đáp ngắn.",
    words: [["hometown", "quê quán"], ["city", "thành phố"], ["village", "làng, quê"], ["country", "đất nước"], ["live", "sống"], ["from", "đến từ"], ["near", "gần"], ["far", "xa"]],
    sentences: [["Where are you from?", "Bạn đến từ đâu?", "Em hỏi quê quán của một người mới quen."], ["I'm from Da Nang.", "Tôi đến từ Đà Nẵng.", "Em giới thiệu thành phố quê mình."], ["Where do you live now?", "Hiện giờ bạn sống ở đâu?", "Em muốn biết nơi ở hiện tại của người kia."], ["I live near the city center.", "Tôi sống gần trung tâm thành phố.", "Em mô tả ngắn vị trí nơi mình sống."]],
    visuals: ["🏡", "🏙️", "🌾", "🌏", "🏠", "📍", "↔️", "🛣️", "🗺️❓", "📍🏙️", "🏠❓", "🏙️🏠"],
  },
  {
    slug: "age-and-personal-status", title: "Ngày 6 · Tuổi và thông tin cá nhân", theme: "Chia sẻ thông tin phù hợp", description: "Hỏi tuổi và tình trạng cá nhân trong hoàn cảnh phù hợp, lịch sự.",
    words: [["age", "tuổi"], ["old", "tuổi"], ["young", "trẻ"], ["single", "độc thân"], ["married", "đã kết hôn"], ["private", "riêng tư"], ["comfortable", "thoải mái"], ["answer", "trả lời"]],
    sentences: [["How old are you?", "Bạn bao nhiêu tuổi?", "Trong buổi đăng ký phù hợp, em cần hỏi tuổi."], ["I'm twenty-five years old.", "Tôi 25 tuổi.", "Em trả lời tuổi của mình bằng một câu đầy đủ."], ["Are you comfortable answering that?", "Bạn có thoải mái trả lời câu đó không?", "Em nhận ra câu hỏi có thể mang tính riêng tư."], ["I'd rather keep that private.", "Tôi muốn giữ thông tin đó riêng tư.", "Em lịch sự từ chối chia sẻ thông tin cá nhân."]],
    visuals: ["🎂", "🔢", "🌱", "🙂", "💍", "🔒", "😌", "💬", "🎂❓", "2️⃣5️⃣", "🤝❓", "🔒🙂"],
  },
  {
    slug: "jobs-and-workplaces", title: "Ngày 7 · Công việc và nơi làm việc", theme: "Nghề nghiệp", description: "Hỏi nghề nghiệp, nơi làm việc và mô tả công việc đơn giản.",
    words: [["job", "công việc"], ["work", "làm việc"], ["office", "văn phòng"], ["company", "công ty"], ["teacher", "giáo viên"], ["engineer", "kỹ sư"], ["manager", "quản lý"], ["student", "học sinh, sinh viên"]],
    sentences: [["What do you do?", "Bạn làm nghề gì?", "Em hỏi nghề nghiệp trong một cuộc làm quen."], ["I'm a graphic designer.", "Tôi là nhà thiết kế đồ họa.", "Em giới thiệu nghề của mình."], ["Where do you work?", "Bạn làm việc ở đâu?", "Em hỏi tiếp về nơi làm việc."], ["I work for a small company.", "Tôi làm cho một công ty nhỏ.", "Em mô tả nơi mình đang làm."]],
    visuals: ["💼", "🧑‍💻", "🏢", "🏭", "🧑‍🏫", "🧑‍🔧", "🧑‍💼", "🎓", "💼❓", "🎨💻", "🏢❓", "🏢🙂"],
  },
  {
    slug: "safe-contact-details", title: "Ngày 8 · Thông tin liên lạc", theme: "Số điện thoại và email", description: "Hỏi, xác nhận và đọc thông tin liên lạc trong hoàn cảnh an toàn.",
    words: [["phone", "điện thoại"], ["number", "con số"], ["email", "thư điện tử"], ["address", "địa chỉ"], ["contact", "liên lạc"], ["send", "gửi"], ["check", "kiểm tra"], ["correct", "chính xác"]],
    sentences: [["How can I contact the office?", "Tôi có thể liên hệ văn phòng bằng cách nào?", "Em cần thông tin liên hệ công khai của một cơ quan."], ["You can email our support team.", "Bạn có thể gửi email cho đội hỗ trợ.", "Nhân viên chỉ dẫn kênh liên hệ phù hợp."], ["Could you repeat the number, please?", "Bạn có thể đọc lại số đó không?", "Em chưa nghe rõ một số liên hệ công khai."], ["Let me check that I wrote it correctly.", "Để tôi kiểm tra xem đã viết đúng chưa.", "Em xác nhận lại thông tin vừa ghi."]],
    visuals: ["📱", "🔢", "✉️", "📇", "☎️", "📤", "✅", "✔️", "🏢☎️", "✉️🧑‍💻", "🔢🔁", "📝✅"],
  },
  {
    slug: "free-time", title: "Ngày 9 · Sở thích", theme: "Thời gian rảnh", description: "Hỏi sở thích, nói điều mình thích và tìm điểm chung.",
    words: [["hobby", "sở thích"], ["free time", "thời gian rảnh"], ["read", "đọc"], ["travel", "du lịch"], ["cook", "nấu ăn"], ["music", "âm nhạc"], ["sport", "thể thao"], ["enjoy", "thích"]],
    sentences: [["What do you do in your free time?", "Bạn làm gì lúc rảnh?", "Em muốn tìm hiểu sở thích của người đối diện."], ["I enjoy reading and cooking.", "Tôi thích đọc sách và nấu ăn.", "Em nói hai hoạt động mình yêu thích."], ["Do you like traveling?", "Bạn có thích du lịch không?", "Em hỏi về một sở thích cụ thể."], ["Yes, especially short weekend trips.", "Có, đặc biệt là những chuyến đi ngắn cuối tuần.", "Em trả lời và bổ sung sở thích chi tiết hơn."]],
    visuals: ["🎨", "🕒", "📚", "🧳", "🍳", "🎵", "⚽", "❤️", "🕒❓", "📚🍳", "🧳❓", "🚗🗓️"],
  },
  {
    slug: "my-family", title: "Ngày 10 · Gia đình của tôi", theme: "Giới thiệu gia đình", description: "Nói số thành viên và giới thiệu những người thân gần gũi.",
    words: [["family", "gia đình"], ["parent", "bố hoặc mẹ"], ["husband", "chồng"], ["wife", "vợ"], ["child", "con"], ["brother", "anh hoặc em trai"], ["sister", "chị hoặc em gái"], ["member", "thành viên"]],
    sentences: [["How many people are in your family?", "Gia đình bạn có bao nhiêu người?", "Em hỏi tổng số thành viên trong gia đình người quen."], ["There are four people in my family.", "Gia đình tôi có bốn người.", "Em trả lời bằng số thành viên."], ["Do you have any brothers or sisters?", "Bạn có anh chị em không?", "Em hỏi thêm về anh chị em trong nhà."], ["I have one younger sister.", "Tôi có một em gái.", "Em giới thiệu một người em trong gia đình."]],
    visuals: ["👨‍👩‍👧‍👦", "🧑‍🧒", "👨", "👩", "🧒", "👦", "👧", "👥", "👨‍👩‍👧‍👦❓", "4️⃣👨‍👩‍👧‍👦", "👧👦❓", "1️⃣👧"],
  },
  {
    slug: "talking-about-relatives", title: "Ngày 11 · Nói về người thân", theme: "Tuổi và công việc của người thân", description: "Mô tả tuổi, nghề nghiệp và tính cách của một người trong gia đình.",
    words: [["father", "bố"], ["mother", "mẹ"], ["relative", "họ hàng"], ["retired", "đã nghỉ hưu"], ["kind", "tốt bụng"], ["friendly", "thân thiện"], ["care for", "chăm sóc"], ["together", "cùng nhau"]],
    sentences: [["What does your mother do?", "Mẹ bạn làm nghề gì?", "Em hỏi nghề nghiệp của một người thân."], ["She's a nurse at a local hospital.", "Mẹ tôi là y tá tại bệnh viện địa phương.", "Em nói nghề và nơi làm việc của mẹ."], ["What is your father like?", "Bố bạn là người thế nào?", "Em hỏi về tính cách của bố người bạn."], ["He's quiet but very kind.", "Bố tôi ít nói nhưng rất tốt bụng.", "Em mô tả hai nét tính cách."]],
    visuals: ["👨", "👩", "👪", "🧓", "💛", "😊", "🤲", "🫶", "👩💼❓", "👩‍⚕️🏥", "👨❓", "🤫💛"],
  },
  {
    slug: "saying-thanks", title: "Ngày 12 · Nói lời cảm ơn", theme: "Biết ơn và đáp lời", description: "Cảm ơn ở nhiều mức độ và đáp lại một cách tự nhiên.",
    words: [["thanks", "cảm ơn"], ["help", "sự giúp đỡ"], ["kind", "tốt bụng"], ["gift", "món quà"], ["appreciate", "trân trọng"], ["welcome", "không có gì"], ["pleasure", "niềm vui"], ["much", "rất nhiều"]],
    sentences: [["Thank you for your help.", "Cảm ơn bạn đã giúp đỡ.", "Một người vừa giúp em giải quyết vấn đề."], ["You're welcome.", "Không có gì.", "Em đáp lại khi người khác cảm ơn."], ["I really appreciate it.", "Tôi thực sự trân trọng điều đó.", "Em muốn thể hiện sự biết ơn rõ hơn."], ["It was my pleasure.", "Tôi rất vui được giúp.", "Em đáp lời cảm ơn một cách ấm áp."]],
    visuals: ["🙏", "🤝", "💛", "🎁", "💐", "🙂", "😊", "✨", "🙏🤝", "😊👌", "💐🙏", "😊🤲"],
  },
  {
    slug: "apologising", title: "Ngày 13 · Xin lỗi chân thành", theme: "Xin lỗi và nhận trách nhiệm", description: "Xin lỗi, giải thích ngắn và đề nghị sửa sai.",
    words: [["sorry", "xin lỗi"], ["mistake", "lỗi"], ["fault", "lỗi, trách nhiệm"], ["late", "muộn"], ["accident", "vô tình"], ["mean", "cố ý"], ["forgive", "tha thứ"], ["fix", "sửa"]],
    sentences: [["I'm sorry I'm late.", "Tôi xin lỗi vì đến muộn.", "Em đến cuộc hẹn trễ hơn dự kiến."], ["That's okay. We just started.", "Không sao. Chúng tôi vừa mới bắt đầu.", "Em giúp người đến muộn bớt lo."], ["It was my mistake.", "Đó là lỗi của tôi.", "Em nhận trách nhiệm về một việc làm sai."], ["Let me fix it for you.", "Để tôi sửa lại cho bạn.", "Em chủ động đề nghị khắc phục vấn đề."]],
    visuals: ["🙏", "❌", "🙋", "⏰", "💥", "💭", "🤝", "🛠️", "⏰🙏", "🙂🕐", "🙋❌", "🛠️🤝"],
  },
  {
    slug: "telling-time", title: "Ngày 14 · Hỏi và nói giờ", theme: "Giờ giấc", description: "Hỏi giờ, đọc giờ và nói thời điểm bắt đầu một hoạt động.",
    words: [["time", "thời gian, giờ"], ["clock", "đồng hồ"], ["hour", "giờ"], ["minute", "phút"], ["half past", "giờ rưỡi"], ["quarter", "mười lăm phút"], ["early", "sớm"], ["late", "muộn"]],
    sentences: [["What time is it?", "Bây giờ là mấy giờ?", "Em không có đồng hồ và cần biết giờ."], ["It's half past seven.", "Bây giờ là bảy giờ rưỡi.", "Em đọc giờ trên đồng hồ."], ["What time does the class start?", "Lớp học bắt đầu lúc mấy giờ?", "Em cần biết giờ bắt đầu buổi học."], ["It starts at eight o'clock.", "Lớp bắt đầu lúc tám giờ.", "Em cung cấp giờ bắt đầu chính xác."]],
    visuals: ["⏰", "🕰️", "🕐", "⏱️", "🕢", "🕒", "🌅", "⌛", "⌚❓", "🕢", "🏫⏰❓", "🏫🕗"],
  },
  {
    slug: "days-and-dates", title: "Ngày 15 · Thứ và ngày tháng", theme: "Lịch", description: "Hỏi thứ, ngày tháng và xác nhận một ngày quan trọng.",
    words: [["day", "ngày, thứ"], ["date", "ngày tháng"], ["week", "tuần"], ["month", "tháng"], ["Monday", "thứ Hai"], ["Friday", "thứ Sáu"], ["birthday", "sinh nhật"], ["calendar", "lịch"]],
    sentences: [["What day is it today?", "Hôm nay là thứ mấy?", "Em muốn xác định thứ trong tuần."], ["It's Monday.", "Hôm nay là thứ Hai.", "Em trả lời thứ hôm nay."], ["What's the date today?", "Hôm nay là ngày bao nhiêu?", "Em cần ghi ngày lên một biểu mẫu."], ["It's the tenth of May.", "Hôm nay là ngày 10 tháng 5.", "Em đọc ngày tháng theo cách tự nhiên."]],
    visuals: ["📅", "🔢", "🗓️", "📆", "1️⃣", "5️⃣", "🎂", "🗓️", "📅❓", "1️⃣📅", "📝📆❓", "🔟🌸"],
  },
  {
    slug: "making-plans", title: "Ngày 16 · Hẹn gặp", theme: "Sắp xếp cuộc hẹn", description: "Đề nghị thời gian, hỏi sự thuận tiện và xác nhận lịch.",
    words: [["meet", "gặp"], ["available", "rảnh"], ["plan", "kế hoạch"], ["appointment", "cuộc hẹn"], ["schedule", "lịch"], ["afternoon", "buổi chiều"], ["place", "địa điểm"], ["confirm", "xác nhận"]],
    sentences: [["Are you free on Saturday morning?", "Bạn rảnh sáng thứ Bảy không?", "Em muốn sắp xếp một cuộc gặp cuối tuần."], ["Yes, that works for me.", "Có, thời gian đó phù hợp với tôi.", "Em đồng ý với thời gian được đề nghị."], ["Shall we meet at the café?", "Chúng ta gặp ở quán cà phê nhé?", "Em đề xuất địa điểm gặp."], ["Great. See you there at nine.", "Tuyệt. Hẹn gặp bạn ở đó lúc chín giờ.", "Em xác nhận cả địa điểm và thời gian."]],
    visuals: ["🤝", "✅", "📝", "📌", "🗓️", "☀️", "📍", "✔️", "🗓️❓", "✅🙂", "☕❓", "☕🕘"],
  },
  {
    slug: "changing-plans", title: "Ngày 17 · Đổi hoặc từ chối lịch", theme: "Từ chối lịch sự", description: "Nói mình bận, xin đổi lịch và đề xuất thời gian khác.",
    words: [["busy", "bận"], ["change", "thay đổi"], ["cancel", "hủy"], ["another", "khác"], ["instead", "thay vào đó"], ["possible", "có thể"], ["afraid", "e rằng"], ["sorry", "xin lỗi"]],
    sentences: [["I'm afraid I can't meet on Friday.", "Tôi e rằng không thể gặp vào thứ Sáu.", "Em cần từ chối thời gian đã được đề nghị."], ["No problem. Is Sunday better?", "Không sao. Chủ nhật có phù hợp hơn không?", "Em đề xuất một ngày thay thế."], ["Could we move it to the afternoon?", "Chúng ta chuyển sang buổi chiều được không?", "Em vẫn gặp được nhưng muốn đổi giờ."], ["Yes, the afternoon is fine.", "Được, buổi chiều phù hợp.", "Em chấp nhận thời gian mới."]],
    visuals: ["💼", "🔄", "❌", "➕", "↪️", "✅", "😕", "🙏", "📅❌", "📅❓", "🕒🔄", "🕒✅"],
  },
  {
    slug: "when-you-dont-understand", title: "Ngày 18 · Khi chưa hiểu", theme: "Yêu cầu nói lại", description: "Báo rằng mình chưa hiểu, nhờ nói chậm và hỏi nghĩa.",
    words: [["understand", "hiểu"], ["repeat", "lặp lại"], ["slowly", "chậm rãi"], ["mean", "có nghĩa"], ["explain", "giải thích"], ["clear", "rõ"], ["again", "lại"], ["example", "ví dụ"]],
    sentences: [["Sorry, I didn't understand.", "Xin lỗi, tôi chưa hiểu.", "Em không theo kịp điều người đối diện vừa nói."], ["Could you say that more slowly?", "Bạn có thể nói chậm hơn không?", "Em muốn nghe lại với tốc độ chậm hơn."], ["What does this word mean?", "Từ này có nghĩa là gì?", "Em gặp một từ mới trong cuộc trò chuyện."], ["It means the same as 'happy'.", "Nó có nghĩa giống từ 'happy'.", "Em giải thích nghĩa bằng một từ quen thuộc."]],
    visuals: ["💡", "🔁", "🐢", "❓", "🧑‍🏫", "🔎", "↩️", "📖", "😕💬", "🐢🗣️", "📖❓", "😊🟰"],
  },
  {
    slug: "offering-help", title: "Ngày 19 · Đề nghị giúp đỡ", theme: "Chủ động hỗ trợ", description: "Nhận biết khi người khác cần giúp và đưa ra lời đề nghị phù hợp.",
    words: [["help", "giúp đỡ"], ["carry", "mang"], ["open", "mở"], ["show", "chỉ"], ["need", "cần"], ["anything", "bất cứ điều gì"], ["heavy", "nặng"], ["glad", "vui lòng"]],
    sentences: [["Can I help you with those bags?", "Tôi giúp bạn mang những túi đó nhé?", "Em thấy một người đang mang nhiều túi nặng."], ["Yes, please. They're quite heavy.", "Vâng, cảm ơn. Chúng khá nặng.", "Em chấp nhận lời giúp đỡ."], ["Is there anything else I can do?", "Tôi còn có thể giúp gì nữa không?", "Em muốn kiểm tra xem người kia còn cần hỗ trợ không."], ["No, that's everything. Thanks.", "Không, vậy là đủ rồi. Cảm ơn.", "Em cho biết mình đã nhận đủ sự giúp đỡ."]],
    visuals: ["🤝", "👜", "🚪", "👉", "🆘", "✨", "🏋️", "😊", "👜🤲", "🏋️🙏", "🤝❓", "✅🙏"],
  },
  {
    slug: "asking-for-help", title: "Ngày 20 · Nhờ người khác giúp", theme: "Yêu cầu hỗ trợ", description: "Nhờ giúp một cách lịch sự, nói rõ việc cần làm và cảm ơn.",
    words: [["please", "làm ơn"], ["favor", "việc giúp"], ["hand", "sự giúp đỡ"], ["problem", "vấn đề"], ["move", "di chuyển"], ["find", "tìm"], ["sure", "chắc chắn, được"], ["moment", "một lát"]],
    sentences: [["Could you help me, please?", "Bạn có thể giúp tôi được không?", "Em cần trợ giúp nhưng chưa nói rõ việc gì."], ["Sure. What do you need?", "Được. Bạn cần gì?", "Em sẵn sàng giúp và hỏi thêm chi tiết."], ["Can you help me move this table?", "Bạn giúp tôi di chuyển chiếc bàn này nhé?", "Em nói rõ việc cần người kia hỗ trợ."], ["Of course. Let's lift it together.", "Tất nhiên. Chúng ta cùng nâng nhé.", "Em đề xuất phối hợp để làm việc an toàn."]],
    visuals: ["🙏", "🤲", "🤝", "⚠️", "↔️", "🔍", "👌", "⏳", "🙏🆘", "👌❓", "🪑↔️", "🏋️‍♂️🏋️‍♀️"],
  },
  {
    slug: "asking-permission", title: "Ngày 21 · Xin phép", theme: "Được phép làm gì", description: "Xin phép, đồng ý hoặc từ chối bằng cách lịch sự.",
    words: [["may", "có thể, được phép"], ["permission", "sự cho phép"], ["enter", "đi vào"], ["borrow", "mượn"], ["use", "sử dụng"], ["mind", "phiền"], ["allowed", "được phép"], ["wait", "chờ"]],
    sentences: [["May I come in?", "Tôi vào được không?", "Em đứng ngoài cửa một căn phòng."], ["Yes, please come in.", "Được, mời bạn vào.", "Em cho phép người đang chờ ngoài cửa đi vào."], ["Do you mind if I open the window?", "Bạn có phiền nếu tôi mở cửa sổ không?", "Phòng hơi nóng và em muốn mở cửa."], ["Not at all. Go ahead.", "Không phiền đâu. Bạn cứ làm đi.", "Em đồng ý với đề nghị của người kia."]],
    visuals: ["✅", "🔑", "🚪", "🤲", "🛠️", "💭", "✔️", "⏳", "🚪❓", "🚪🙂", "🪟❓", "🪟👌"],
  },
  {
    slug: "offering-food-and-drink", title: "Ngày 22 · Mời đồ ăn và thức uống", theme: "Mời và nhận lời", description: "Mời khách, lựa chọn món và từ chối thêm một cách lịch sự.",
    words: [["offer", "mời"], ["drink", "thức uống"], ["snack", "món ăn nhẹ"], ["coffee", "cà phê"], ["tea", "trà"], ["water", "nước"], ["some", "một ít"], ["enough", "đủ"]],
    sentences: [["Would you like some tea?", "Bạn dùng một chút trà nhé?", "Em mời khách một thức uống."], ["Yes, please. That would be lovely.", "Vâng, cảm ơn. Như vậy thật tuyệt.", "Em vui vẻ nhận lời mời."], ["Would you like another cookie?", "Bạn dùng thêm một chiếc bánh nhé?", "Em mời khách dùng thêm đồ ăn."], ["No, thank you. I've had enough.", "Không, cảm ơn. Tôi dùng đủ rồi.", "Em từ chối thêm đồ ăn một cách lịch sự."]],
    visuals: ["🤲", "🥤", "🍪", "☕", "🍵", "💧", "➕", "✅", "🍵🤲", "🍵😊", "🍪➕❓", "🙏✅"],
  },
  {
    slug: "wishes-and-congratulations", title: "Ngày 23 · Lời chúc và chúc mừng", theme: "Những dịp vui", description: "Chúc mừng thành tích, sinh nhật và gửi lời chúc chân thành.",
    words: [["congratulations", "chúc mừng"], ["wish", "lời chúc"], ["birthday", "sinh nhật"], ["success", "thành công"], ["luck", "may mắn"], ["celebrate", "ăn mừng"], ["proud", "tự hào"], ["wonderful", "tuyệt vời"]],
    sentences: [["Congratulations on your new job!", "Chúc mừng công việc mới của bạn!", "Một người bạn vừa nhận việc mới."], ["Thank you. I'm really excited.", "Cảm ơn. Tôi rất háo hức.", "Em đáp lại lời chúc mừng."], ["Happy birthday! I wish you all the best.", "Chúc mừng sinh nhật! Chúc bạn mọi điều tốt đẹp.", "Em gửi lời chúc trong ngày sinh nhật."], ["That's very kind of you.", "Bạn thật tốt khi nói vậy.", "Em cảm ơn một lời chúc ấm áp."]],
    visuals: ["🎉", "🌠", "🎂", "🏆", "🍀", "🥳", "😊", "🌟", "💼🎉", "😊✨", "🎂🎁", "💛🙏"],
  },
  {
    slug: "comforting-someone", title: "Ngày 24 · An ủi và động viên", theme: "Ở bên khi người khác buồn", description: "Thể hiện sự cảm thông, trấn an và khuyến khích người khác.",
    words: [["worry", "lo lắng"], ["fine", "ổn"], ["chance", "cơ hội"], ["hope", "hy vọng"], ["support", "ủng hộ"], ["sad", "buồn"], ["better", "tốt hơn"], ["believe", "tin tưởng"]],
    sentences: [["You look worried. Are you okay?", "Bạn trông lo lắng. Bạn ổn chứ?", "Em nhận thấy một người bạn đang không vui."], ["I didn't pass the interview.", "Tôi không vượt qua buổi phỏng vấn.", "Em chia sẻ lý do mình buồn."], ["I'm sorry to hear that.", "Tôi rất tiếc khi nghe điều đó.", "Em thể hiện sự cảm thông trước tin không vui."], ["Don't give up. There will be other chances.", "Đừng bỏ cuộc. Sẽ còn những cơ hội khác.", "Em động viên người bạn tiếp tục cố gắng."]],
    visuals: ["😟", "🙂", "🚪", "🌈", "🤝", "😢", "📈", "💪", "😟❓", "💼❌", "🤝😔", "💪🌈"],
  },
  {
    slug: "asking-about-health", title: "Ngày 25 · Hỏi thăm sức khỏe", theme: "Triệu chứng thông thường", description: "Hỏi người khác có khỏe không và mô tả triệu chứng cơ bản.",
    words: [["health", "sức khỏe"], ["sick", "ốm"], ["headache", "đau đầu"], ["fever", "sốt"], ["rest", "nghỉ ngơi"], ["medicine", "thuốc"], ["doctor", "bác sĩ"], ["better", "khá hơn"]],
    sentences: [["You don't look well. What's wrong?", "Bạn trông không khỏe. Có chuyện gì vậy?", "Em thấy một người có vẻ mệt."], ["I have a headache.", "Tôi bị đau đầu.", "Em mô tả triệu chứng đơn giản."], ["You should get some rest.", "Bạn nên nghỉ ngơi một chút.", "Em đưa ra lời khuyên thông thường, không chẩn đoán."], ["Thanks. I'll see a doctor if it gets worse.", "Cảm ơn. Tôi sẽ gặp bác sĩ nếu nặng hơn.", "Em chọn tìm hỗ trợ chuyên môn khi cần."]],
    visuals: ["❤️", "🤒", "🤕", "🌡️", "🛌", "💊", "🧑‍⚕️", "🙂", "🤒❓", "🤕", "🛌💡", "🧑‍⚕️✅"],
  },
  {
    slug: "weather-talk", title: "Ngày 26 · Nói về thời tiết", theme: "Thời tiết hằng ngày", description: "Hỏi thời tiết, mô tả trời và chọn đồ phù hợp.",
    words: [["weather", "thời tiết"], ["sunny", "nắng"], ["rainy", "mưa"], ["cloudy", "nhiều mây"], ["windy", "nhiều gió"], ["hot", "nóng"], ["cold", "lạnh"], ["umbrella", "ô, dù"]],
    sentences: [["What's the weather like today?", "Hôm nay thời tiết thế nào?", "Em chuẩn bị ra ngoài và hỏi về thời tiết."], ["It's cloudy and a little cold.", "Trời nhiều mây và hơi lạnh.", "Em mô tả hai đặc điểm thời tiết."], ["Is it going to rain?", "Trời có sắp mưa không?", "Em thấy mây đen và muốn kiểm tra."], ["Yes. Take an umbrella with you.", "Có. Hãy mang theo ô.", "Em nhắc người kia chuẩn bị cho trời mưa."]],
    visuals: ["🌦️", "☀️", "🌧️", "☁️", "💨", "🥵", "🥶", "☂️", "🌦️❓", "☁️🥶", "🌧️❓", "☂️✅"],
  },
  {
    slug: "phone-calls", title: "Ngày 27 · Nói chuyện qua điện thoại", theme: "Gọi và nhận cuộc gọi", description: "Giới thiệu người gọi, xin gặp ai đó và để lại lời nhắn.",
    words: [["call", "cuộc gọi"], ["speak", "nói chuyện"], ["hold", "giữ máy"], ["message", "lời nhắn"], ["later", "sau"], ["available", "có mặt, rảnh"], ["wrong number", "nhầm số"], ["call back", "gọi lại"]],
    sentences: [["Hello, this is Nam speaking.", "Xin chào, Nam đang nghe.", "Em nhận điện thoại và giới thiệu mình."], ["Could I speak to Ms. Lan, please?", "Tôi có thể gặp cô Lan được không?", "Em gọi đến văn phòng và xin gặp một người."], ["She's not available right now.", "Hiện giờ cô ấy không có mặt.", "Em thông báo người được hỏi chưa thể nghe máy."], ["Could you ask her to call me back?", "Bạn nhắn cô ấy gọi lại cho tôi được không?", "Em để lại yêu cầu gọi lại."]],
    visuals: ["📞", "🗣️", "⏸️", "📝", "⏭️", "✅", "❌📱", "↩️📞", "📞🙂", "📞👩❓", "👩⏳", "📝↩️"],
  },
  {
    slug: "finding-places", title: "Ngày 28 · Hỏi vị trí địa điểm", theme: "Địa điểm quanh mình", description: "Hỏi một nơi ở đâu và hiểu các chỉ dẫn vị trí ngắn.",
    words: [["bank", "ngân hàng"], ["station", "nhà ga"], ["pharmacy", "nhà thuốc"], ["corner", "góc đường"], ["opposite", "đối diện"], ["next to", "bên cạnh"], ["near", "gần"], ["there", "ở đó"]],
    sentences: [["Excuse me, where is the nearest pharmacy?", "Xin lỗi, nhà thuốc gần nhất ở đâu?", "Em cần tìm một địa điểm gần đó."], ["It's next to the supermarket.", "Nó ở cạnh siêu thị.", "Em chỉ vị trí bằng một mốc dễ thấy."], ["Is it far from here?", "Nó có xa đây không?", "Em muốn biết khoảng cách tương đối."], ["No, it's just around the corner.", "Không, nó ngay gần góc đường.", "Em cho biết địa điểm ở rất gần."]],
    visuals: ["🏦", "🚉", "💊", "↪️", "↔️", "🏪🏥", "📍", "👉", "💊❓", "🏪↔️💊", "🛣️❓", "↪️📍"],
  },
  {
    slug: "asking-directions", title: "Ngày 29 · Hỏi và chỉ đường", theme: "Di chuyển trên phố", description: "Hỏi đường, hiểu các động từ chỉ hướng và xác nhận điểm đến.",
    words: [["straight", "thẳng"], ["turn", "rẽ"], ["left", "trái"], ["right", "phải"], ["cross", "băng qua"], ["traffic lights", "đèn giao thông"], ["way", "đường đi"], ["map", "bản đồ"]],
    sentences: [["Could you show me the way to the station?", "Bạn có thể chỉ đường đến nhà ga không?", "Em đang trên phố và chưa biết đường."], ["Go straight and turn left at the lights.", "Đi thẳng rồi rẽ trái ở đèn giao thông.", "Em đưa ra hai bước chỉ đường."], ["Is the station on the right?", "Nhà ga ở bên phải phải không?", "Em xác nhận vị trí cuối cùng."], ["Yes, you'll see it opposite the bank.", "Đúng, bạn sẽ thấy nó đối diện ngân hàng.", "Em dùng thêm một địa điểm mốc."]],
    visuals: ["⬆️", "↪️", "⬅️", "➡️", "🚶", "🚦", "🛣️", "🗺️", "🚉🗺️❓", "⬆️🚦⬅️", "🚉➡️❓", "🏦↔️🚉"],
  },
  {
    slug: "clothes-shopping", title: "Ngày 30 · Mua quần áo", theme: "Chọn và thử đồ", description: "Nói món cần tìm, hỏi kích cỡ và xin thử quần áo.",
    words: [["shirt", "áo sơ mi"], ["size", "kích cỡ"], ["small", "nhỏ"], ["large", "lớn"], ["color", "màu sắc"], ["try on", "mặc thử"], ["fit", "vừa"], ["changing room", "phòng thử đồ"]],
    sentences: [["I'm looking for a blue shirt.", "Tôi đang tìm một chiếc áo sơ mi xanh.", "Em nói rõ món đồ mình muốn mua."], ["What size do you need?", "Bạn cần cỡ nào?", "Nhân viên hỏi kích cỡ."], ["Do you have this in a smaller size?", "Bạn có chiếc này cỡ nhỏ hơn không?", "Món đồ hiện tại hơi rộng."], ["Can I try it on?", "Tôi có thể thử nó không?", "Em muốn mặc thử trước khi quyết định."]],
    visuals: ["👔", "📏", "🔹", "🔷", "🎨", "🪞", "✅", "🚪", "👔🔵", "📏❓", "👕🔽❓", "🪞❓"],
  },
  {
    slug: "prices-and-payment", title: "Ngày 31 · Hỏi giá và thanh toán", theme: "Thanh toán khi mua sắm", description: "Hỏi giá, chọn phương thức trả tiền và nhận hóa đơn.",
    words: [["price", "giá"], ["cost", "có giá"], ["cash", "tiền mặt"], ["card", "thẻ"], ["receipt", "hóa đơn"], ["expensive", "đắt"], ["cheap", "rẻ"], ["change", "tiền thừa"]],
    sentences: [["How much is this jacket?", "Chiếc áo khoác này giá bao nhiêu?", "Em muốn biết giá trước khi mua."], ["It's forty dollars.", "Nó có giá 40 đô la.", "Nhân viên báo giá sản phẩm."], ["Can I pay by card?", "Tôi có thể thanh toán bằng thẻ không?", "Em hỏi phương thức thanh toán."], ["Yes. Would you like a receipt?", "Được. Bạn có muốn lấy hóa đơn không?", "Nhân viên xác nhận và hỏi về hóa đơn."]],
    visuals: ["🏷️", "💲", "💵", "💳", "🧾", "💸", "🪙", "🔄", "🧥❓", "4️⃣0️⃣💲", "💳❓", "💳🧾"],
  },
  {
    slug: "entering-a-restaurant", title: "Ngày 32 · Vào nhà hàng", theme: "Đặt bàn và ngồi bàn", description: "Nói số người, hỏi bàn trống và làm theo hướng dẫn của nhân viên.",
    words: [["table", "bàn"], ["reservation", "đặt chỗ"], ["guest", "khách"], ["menu", "thực đơn"], ["seat", "chỗ ngồi"], ["available", "còn trống"], ["waiter", "nhân viên phục vụ"], ["ready", "sẵn sàng"]],
    sentences: [["A table for two, please.", "Cho tôi một bàn hai người.", "Em bước vào nhà hàng cùng một người bạn."], ["Do you have a reservation?", "Bạn có đặt bàn trước không?", "Nhân viên kiểm tra thông tin đặt chỗ."], ["No, we don't.", "Không, chúng tôi chưa đặt.", "Em trả lời ngắn và rõ."], ["That's fine. Please follow me.", "Không sao. Mời đi theo tôi.", "Nhân viên dẫn khách đến bàn còn trống."]],
    visuals: ["🍽️", "📅", "🧑‍🤝‍🧑", "📖", "🪑", "✅", "🧑‍🍳", "👍", "2️⃣🍽️", "📅❓", "🙅", "🚶👉"],
  },
  {
    slug: "ordering-food", title: "Ngày 33 · Gọi món và gọi hóa đơn", theme: "Ăn tại nhà hàng", description: "Xin thực đơn, gọi món, yêu cầu thêm và thanh toán.",
    words: [["order", "gọi món"], ["starter", "món khai vị"], ["main course", "món chính"], ["dessert", "món tráng miệng"], ["bill", "hóa đơn"], ["delicious", "ngon"], ["recommend", "gợi ý"], ["water", "nước"]],
    sentences: [["Could we see the menu, please?", "Cho chúng tôi xem thực đơn được không?", "Em ngồi vào bàn và cần chọn món."], ["What do you recommend?", "Bạn gợi ý món nào?", "Em muốn nghe gợi ý từ nhân viên."], ["I'll have the chicken and some water.", "Tôi gọi món gà và một ít nước.", "Em gọi món chính và thức uống."], ["Could we have the bill, please?", "Cho chúng tôi xin hóa đơn.", "Em đã ăn xong và muốn thanh toán."]],
    visuals: ["📝", "🥗", "🍛", "🍰", "🧾", "😋", "👍", "💧", "📖🤲", "🧑‍🍳❓", "🍗💧", "🧾🤲"],
  },
  {
    slug: "getting-around", title: "Ngày 34 · Đi lại", theme: "Phương tiện và thời gian đi", description: "Hỏi khoảng cách, phương tiện và thời gian của một chuyến đi.",
    words: [["travel", "đi lại"], ["bus", "xe buýt"], ["train", "tàu"], ["motorbike", "xe máy"], ["walk", "đi bộ"], ["distance", "khoảng cách"], ["take", "mất thời gian"], ["traffic", "giao thông"]],
    sentences: [["How do you get to work?", "Bạn đi làm bằng cách nào?", "Em hỏi phương tiện đi lại hằng ngày."], ["I usually take the bus.", "Tôi thường đi xe buýt.", "Em nói phương tiện mình thường dùng."], ["How long does the journey take?", "Chuyến đi mất bao lâu?", "Em hỏi thời gian di chuyển."], ["It takes about thirty minutes.", "Nó mất khoảng 30 phút.", "Em trả lời bằng khoảng thời gian."]],
    visuals: ["🧳", "🚌", "🚆", "🏍️", "🚶", "↔️", "⏱️", "🚦", "🏢🚌❓", "🚌🙂", "⏱️❓", "3️⃣0️⃣⏱️"],
  },
  {
    slug: "at-work", title: "Ngày 35 · Ở nơi làm việc", theme: "Tình huống văn phòng", description: "Báo vắng, mô tả thiết bị hỏng và đề nghị hỗ trợ tại nơi làm việc.",
    words: [["office", "văn phòng"], ["meeting", "cuộc họp"], ["printer", "máy in"], ["broken", "bị hỏng"], ["sick leave", "nghỉ ốm"], ["vacation", "kỳ nghỉ"], ["report", "báo cáo"], ["deadline", "hạn chót"]],
    sentences: [["Is Mai in the office today?", "Hôm nay Mai có ở văn phòng không?", "Em cần trao đổi với một đồng nghiệp."], ["No, she's off sick.", "Không, cô ấy nghỉ ốm.", "Em thông báo lý do đồng nghiệp vắng mặt."], ["The printer isn't working.", "Máy in không hoạt động.", "Em báo một thiết bị văn phòng bị hỏng."], ["I'll call technical support.", "Tôi sẽ gọi bộ phận hỗ trợ kỹ thuật.", "Em chủ động tìm người xử lý sự cố."]],
    visuals: ["🏢", "👥", "🖨️", "⚠️", "🤒", "🏖️", "📄", "⏰", "🏢👩❓", "🤒🏠", "🖨️❌", "☎️🛠️"],
  },
];

export function beginnerConversationBoardUrl(slug: string) {
  return `/conversation-beginner/boards/${slug}.svg`;
}

export function buildBeginnerConversationLessons(unit: BeginnerConversationUnitSeed): BeginnerConversationLessonSeed[] {
  const boardUrl = beginnerConversationBoardUrl(unit.slug);
  const sprite = { spriteColumns: 4, spriteRows: 3 };
  const vocabulary: ActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tình huống, nghe và đoán từ ${index + 1}`,
    instruction: "Quan sát hình, tự đoán từ tiếng Anh rồi mới mở đáp án.",
    order: index + 1,
    payload: {
      mode: "VISUAL_GUESS",
      prompt: "Hình này gợi đến từ hoặc cụm từ tiếng Anh nào?",
      imageUrl: boardUrl,
      imageAlt: `Minh họa trực quan cho nghĩa: ${meaning}`,
      imageHint: `Hình đang gợi ý nghĩa “${meaning}”.`,
      spriteIndex: index,
      ...sprite,
      audioText: word,
      front: word,
      back: meaning,
    },
  }));
  vocabulary.push({
    type: ActivityType.MATCHING,
    title: "Ghép từ với nghĩa",
    instruction: "Ghép tám từ khóa với nghĩa tiếng Việt.",
    order: unit.words.length + 1,
    payload: {
      prompt: `Ôn nhanh từ khóa của chủ đề ${unit.theme.toLowerCase()}.`,
      pairs: unit.words.map(([left, right]) => ({ left, right })),
    },
  });

  return [
    {
      slug: "tu-khoa",
      title: "Từ khóa qua hình ảnh & âm thanh",
      description: "Nhìn hình, nghe âm và đoán trước khi xem nghĩa.",
      activities: vocabulary,
    },
    {
      slug: "hoi-thoai",
      title: "Phản xạ hội thoại đời thực",
      description: "Nghe lượt nói, quan sát tình huống và tạo câu phản hồi ngay.",
      activities: buildSecondaryReactionActivities(unit.sentences, {
        imageUrl: boardUrl,
        spriteOffset: unit.words.length,
        ...sprite,
      }),
    },
  ];
}
