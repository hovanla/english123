import { ActivityType } from "@prisma/client";
import { buildSecondaryReactionActivities } from "./secondary-reaction";

type ActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

type PracticeQuestion = {
  prompt: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
};

export type BasicEnglishLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: ActivitySeed[];
};

export type BasicEnglishUnitSeed = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  grammar: string;
  words: Array<[word: string, meaning: string]>;
  sentences: Array<[target: string, translation: string, scenario: string]>;
  practice: [PracticeQuestion, PracticeQuestion];
  visuals: string[];
};

export const basicEnglishUnits: BasicEnglishUnitSeed[] = [
  {
    slug: "personal-information", title: "Bài 1 · Thông tin cá nhân", theme: "Personal information", description: "Giới thiệu bản thân và hỏi các thông tin cơ bản bằng động từ to be.", grammar: "I am / You are / He is và câu hỏi với What, Where, How.",
    words: [["first name", "tên"], ["last name", "họ"], ["age", "tuổi"], ["address", "địa chỉ"], ["country", "đất nước"], ["city", "thành phố"], ["nationality", "quốc tịch"], ["occupation", "nghề nghiệp"], ["single", "độc thân"], ["married", "đã kết hôn"]],
    sentences: [["Hi, I'm Hoa. I'm from Vietnam.", "Chào bạn, tôi là Hoa. Tôi đến từ Việt Nam.", "Em giới thiệu tên và quốc gia của mình."], ["Nice to meet you, Hoa.", "Rất vui được gặp bạn, Hoa.", "Người đối diện đáp lại lời giới thiệu."], ["What is your occupation?", "Bạn làm nghề gì?", "Em hỏi nghề nghiệp trên một biểu mẫu giao tiếp."], ["I'm an office worker.", "Tôi là nhân viên văn phòng.", "Em trả lời bằng động từ to be và nghề nghiệp."]],
    practice: [{ prompt: "Chọn câu đúng để giới thiệu quê quán.", options: ["I am from Hue.", "I from Hue.", "I is from Hue."], correctIndex: 0, explanation: "Dùng “I am from + nơi chốn”." }, { prompt: "Hoàn thành: What ___ your name?", options: ["am", "is", "are"], correctIndex: 1, explanation: "“Your name” là chủ ngữ số ít nên dùng is." }],
    visuals: ["🏷️", "🪪", "🎂", "🏠", "🌏", "🏙️", "🇻🇳", "💼", "🙂", "💍", "🙂🌏", "🤝", "💼❓", "🏢🙂"],
  },
  {
    slug: "rooms-at-home", title: "Bài 2 · Các phòng trong nhà", theme: "Places in the house", description: "Gọi tên các phòng, mô tả vị trí đồ vật với there is/there are.", grammar: "There is / There are và giới từ in, on, next to, between.",
    words: [["living room", "phòng khách"], ["bedroom", "phòng ngủ"], ["kitchen", "nhà bếp"], ["bathroom", "phòng tắm"], ["garden", "khu vườn"], ["upstairs", "tầng trên"], ["downstairs", "tầng dưới"], ["next to", "bên cạnh"], ["between", "ở giữa"], ["inside", "bên trong"]],
    sentences: [["There is a sofa in the living room.", "Có một chiếc ghế sofa trong phòng khách.", "Em mô tả một đồ vật trong phòng."], ["Is there a television too?", "Có cả một chiếc ti-vi không?", "Người đối diện hỏi thêm về căn phòng."], ["The kitchen is next to the dining room.", "Nhà bếp ở cạnh phòng ăn.", "Em mô tả vị trí hai căn phòng."], ["There are two bedrooms upstairs.", "Có hai phòng ngủ ở tầng trên.", "Em dùng số nhiều để mô tả ngôi nhà."]],
    practice: [{ prompt: "Hoàn thành: There ___ a table in the kitchen.", options: ["is", "are", "am"], correctIndex: 0, explanation: "Một chiếc bàn là số ít nên dùng there is." }, { prompt: "Hoàn thành: There ___ two chairs.", options: ["is", "are", "be"], correctIndex: 1, explanation: "Two chairs là số nhiều nên dùng there are." }],
    visuals: ["🛋️", "🛏️", "🍳", "🚿", "🌳", "⬆️", "⬇️", "↔️", "🔀", "🏠", "🛋️🏠", "📺❓", "🍳↔️🍽️", "2️⃣🛏️"],
  },
  {
    slug: "family-members", title: "Bài 3 · Gia đình của tôi", theme: "My family", description: "Giới thiệu thành viên và nói về quan hệ sở hữu trong gia đình.", grammar: "Have/has, tính từ sở hữu my/your/his/her và sở hữu cách 's.",
    words: [["parents", "bố mẹ"], ["father", "bố"], ["mother", "mẹ"], ["son", "con trai"], ["daughter", "con gái"], ["husband", "chồng"], ["wife", "vợ"], ["grandparents", "ông bà"], ["cousin", "anh chị em họ"], ["relative", "họ hàng"]],
    sentences: [["This is my sister, Mai.", "Đây là chị/em gái tôi, Mai.", "Em giới thiệu một thành viên trong ảnh gia đình."], ["How old is she?", "Cô ấy bao nhiêu tuổi?", "Người đối diện hỏi tuổi của người vừa được giới thiệu."], ["She has two young children.", "Cô ấy có hai con nhỏ.", "Em dùng has để nói về gia đình của chị/em gái."], ["Their father's name is Nam.", "Tên của bố các cháu là Nam.", "Em dùng sở hữu cách để nói tên một người thân."]],
    practice: [{ prompt: "Chọn câu đúng với chủ ngữ “he”.", options: ["He have a sister.", "He has a sister.", "He having a sister."], correctIndex: 1, explanation: "He/She/It đi với has." }, { prompt: "Hoàn thành: This is Lan. ___ brother is a doctor.", options: ["His", "Her", "Your"], correctIndex: 1, explanation: "Lan là nữ nên dùng tính từ sở hữu her." }],
    visuals: ["👨‍👩‍👧", "👨", "👩", "👦", "👧", "🤵", "👰", "👵👴", "🧑‍🤝‍🧑", "👪", "👧👉", "🎂❓", "👩2️⃣🧒", "🏷️👨"],
  },
  {
    slug: "daily-routine", title: "Bài 4 · Hoạt động hằng ngày", theme: "Everyday activities", description: "Nói về một ngày điển hình bằng hiện tại đơn.", grammar: "Hiện tại đơn, động từ thêm -s/-es với he/she và câu phủ định.",
    words: [["wake up", "thức dậy"], ["get dressed", "thay quần áo"], ["have breakfast", "ăn sáng"], ["go to work", "đi làm"], ["start", "bắt đầu"], ["finish", "kết thúc"], ["have lunch", "ăn trưa"], ["go home", "về nhà"], ["cook dinner", "nấu tối"], ["go to bed", "đi ngủ"]],
    sentences: [["I usually wake up at six.", "Tôi thường thức dậy lúc sáu giờ.", "Em kể thời điểm bắt đầu ngày mới."], ["What time do you start work?", "Bạn bắt đầu làm việc lúc mấy giờ?", "Người đối diện hỏi lịch làm việc hằng ngày."], ["I start at eight and finish at five.", "Tôi bắt đầu lúc tám giờ và kết thúc lúc năm giờ.", "Em nói hai mốc thời gian trong ngày."], ["My husband cooks dinner in the evening.", "Chồng tôi nấu bữa tối vào buổi tối.", "Em nói thói quen của một người khác."]],
    practice: [{ prompt: "Hoàn thành: She ___ work at eight.", options: ["start", "starts", "starting"], correctIndex: 1, explanation: "Hiện tại đơn với she: động từ thêm -s." }, { prompt: "Chọn câu phủ định đúng.", options: ["I don't work on Sunday.", "I doesn't work on Sunday.", "I not work on Sunday."], correctIndex: 0, explanation: "Với I/you/we/they dùng do not hoặc don't." }],
    visuals: ["⏰", "👕", "🥣", "🏢", "▶️", "⏹️", "🍱", "🏠", "🍳", "🛌", "🕕🙂", "🏢⏰❓", "🕗➡️🕔", "👨🍳"],
  },
  {
    slug: "sunday-habits", title: "Bài 5 · Thói quen cuối tuần", theme: "Weekend habits", description: "Nói mức độ thường xuyên và các hoạt động ngày nghỉ.", grammar: "Trạng từ tần suất always, usually, often, sometimes, never.",
    words: [["Sunday", "Chủ nhật"], ["weekend", "cuối tuần"], ["always", "luôn luôn"], ["usually", "thường"], ["often", "thường xuyên"], ["sometimes", "thỉnh thoảng"], ["rarely", "hiếm khi"], ["never", "không bao giờ"], ["relax", "thư giãn"], ["visit", "thăm"]],
    sentences: [["What do you usually do on Sundays?", "Bạn thường làm gì vào Chủ nhật?", "Em hỏi thói quen ngày nghỉ."], ["I often visit my parents.", "Tôi thường đến thăm bố mẹ.", "Em dùng trạng từ tần suất trước động từ thường."], ["Do you ever work at the weekend?", "Bạn có khi nào làm việc cuối tuần không?", "Người đối diện hỏi về một thói quen khác."], ["No, I never work on Sundays.", "Không, tôi không bao giờ làm việc Chủ nhật.", "Em trả lời bằng never."]],
    practice: [{ prompt: "Đặt trạng từ đúng vị trí.", options: ["I visit often my parents.", "I often visit my parents.", "Often I my parents visit."], correctIndex: 1, explanation: "Trạng từ tần suất thường đứng trước động từ thường." }, { prompt: "Từ nào mang nghĩa “không bao giờ”?", options: ["usually", "sometimes", "never"], correctIndex: 2, explanation: "Never diễn tả tần suất bằng 0." }],
    visuals: ["7️⃣", "🗓️", "♾️", "🔁", "🔄", "🎲", "🌙", "🚫", "🧘", "🏡", "🗓️❓", "👪🚗", "💼🗓️❓", "🚫💼"],
  },
  {
    slug: "review-one", title: "Ôn tập 1 · Bài 1–5", theme: "Thông tin, nhà cửa và thói quen", description: "Củng cố to be, have/has, there is/are và hiện tại đơn.", grammar: "Tổng hợp cấu trúc của năm bài đầu.",
    words: [["introduce", "giới thiệu"], ["describe", "mô tả"], ["person", "người"], ["place", "địa điểm"], ["routine", "thói quen"], ["frequency", "tần suất"], ["possess", "sở hữu"], ["singular", "số ít"], ["plural", "số nhiều"], ["review", "ôn tập"]],
    sentences: [["I'm a student and I live in Hanoi.", "Tôi là sinh viên và sống ở Hà Nội.", "Em kết hợp thông tin cá nhân trong một câu."], ["There are three people in my family.", "Gia đình tôi có ba người.", "Em dùng there are để nói số thành viên."], ["My mother has a small garden.", "Mẹ tôi có một khu vườn nhỏ.", "Em kết hợp sở hữu và từ vựng nhà cửa."], ["She often works in the garden.", "Mẹ thường làm việc trong vườn.", "Em mô tả thói quen của mẹ."]],
    practice: [{ prompt: "Chọn câu đúng.", options: ["There is two rooms.", "There are two rooms.", "There two rooms are."], correctIndex: 1, explanation: "Danh từ số nhiều đi với there are." }, { prompt: "Hoàn thành: My father ___ coffee every morning.", options: ["drink", "drinks", "drinking"], correctIndex: 1, explanation: "Chủ ngữ số ít ở hiện tại đơn: drinks." }],
    visuals: ["🙋", "📝", "🙂", "📍", "🔁", "📊", "🔑", "1️⃣", "🔢", "📚", "🎓🏙️", "3️⃣👪", "👩🌳", "👩🔁🌳"],
  },
  {
    slug: "happening-now", title: "Bài 6 · Việc đang diễn ra", theme: "It's happening now", description: "Mô tả thời tiết và hành động đang xảy ra ngay lúc nói.", grammar: "Hiện tại tiếp diễn: am/is/are + động từ-ing.",
    words: [["shine", "chiếu sáng"], ["rain", "mưa"], ["snow", "tuyết rơi"], ["blow", "thổi"], ["wear", "mặc"], ["wait", "chờ"], ["run", "chạy"], ["sit", "ngồi"], ["happen", "xảy ra"], ["now", "bây giờ"]],
    sentences: [["The sun is shining today.", "Hôm nay mặt trời đang tỏa nắng.", "Em nhìn ra ngoài và mô tả thời tiết."], ["What are the children doing?", "Bọn trẻ đang làm gì?", "Em hỏi về hành động trong một bức ảnh."], ["They are playing in the garden.", "Chúng đang chơi trong vườn.", "Em mô tả hành động đang diễn ra."], ["I'm waiting for the bus now.", "Bây giờ tôi đang chờ xe buýt.", "Em nói việc mình đang làm tại thời điểm nói."]],
    practice: [{ prompt: "Hoàn thành: She ___ reading now.", options: ["is", "does", "are"], correctIndex: 0, explanation: "Hiện tại tiếp diễn với she dùng is + V-ing." }, { prompt: "Chọn câu đúng.", options: ["They playing outside.", "They are play outside.", "They are playing outside."], correctIndex: 2, explanation: "Công thức: are + playing." }],
    visuals: ["☀️", "🌧️", "❄️", "💨", "👕", "⏳", "🏃", "🪑", "⚡", "⏱️", "☀️✨", "🧒❓", "🧒🌳", "🚌⏳"],
  },
  {
    slug: "feelings-and-reactions", title: "Bài 7 · Cảm xúc và phản ứng", theme: "Feelings and reactions", description: "Nói cảm xúc, nguyên nhân và phản ứng quen thuộc.", grammar: "When + hiện tại đơn; tính từ cảm xúc và trạng từ chỉ cách thức.",
    words: [["happy", "vui"], ["sad", "buồn"], ["angry", "giận"], ["afraid", "sợ"], ["excited", "hào hứng"], ["worried", "lo lắng"], ["smile", "mỉm cười"], ["cry", "khóc"], ["laugh", "cười"], ["feel", "cảm thấy"]],
    sentences: [["How do you feel today?", "Hôm nay bạn cảm thấy thế nào?", "Em hỏi cảm xúc hiện tại của một người."], ["I'm excited about my new job.", "Tôi hào hứng về công việc mới.", "Em nói cảm xúc và nguyên nhân."], ["What do you do when you're sad?", "Bạn làm gì khi buồn?", "Em hỏi phản ứng trong một trạng thái cảm xúc."], ["I usually talk to a close friend.", "Tôi thường nói chuyện với một người bạn thân.", "Em nói cách mình xử lý cảm xúc."]],
    practice: [{ prompt: "Hoàn thành: I smile when I ___ happy.", options: ["feel", "feels", "feeling"], correctIndex: 0, explanation: "Sau I ở hiện tại đơn dùng feel." }, { prompt: "Chọn từ mô tả cảm xúc.", options: ["slowly", "worried", "speak"], correctIndex: 1, explanation: "Worried là tính từ chỉ cảm xúc lo lắng." }],
    visuals: ["😊", "😢", "😠", "😨", "🤩", "😟", "🙂", "😭", "😂", "💭", "🙂❓", "🤩💼", "😢❓", "🧑‍🤝‍🧑💬"],
  },
  {
    slug: "food-and-drinks", title: "Bài 8 · Đồ ăn và thức uống", theme: "Foods and drinks", description: "Gọi món, nói số lượng và phân biệt danh từ đếm được/không đếm được.", grammar: "Some/any, much/many và danh từ đếm được/không đếm được.",
    words: [["bread", "bánh mì"], ["rice", "cơm, gạo"], ["meat", "thịt"], ["vegetable", "rau"], ["fruit", "trái cây"], ["water", "nước"], ["milk", "sữa"], ["bottle", "chai"], ["piece", "miếng"], ["meal", "bữa ăn"]],
    sentences: [["Is there any milk in the fridge?", "Có sữa trong tủ lạnh không?", "Em kiểm tra một loại đồ uống không đếm được."], ["Yes, there is some milk.", "Có, có một ít sữa.", "Em trả lời khẳng định với some."], ["How many apples do we need?", "Chúng ta cần bao nhiêu quả táo?", "Em hỏi số lượng danh từ đếm được."], ["We need six apples and some bread.", "Chúng ta cần sáu quả táo và một ít bánh mì.", "Em kết hợp danh từ đếm được và không đếm được."]],
    practice: [{ prompt: "Hoàn thành: We don't have ___ rice.", options: ["any", "many", "a"], correctIndex: 0, explanation: "Any thường dùng trong câu phủ định với danh từ không đếm được." }, { prompt: "Chọn câu hỏi đúng.", options: ["How much apples?", "How many apples?", "How any apples?"], correctIndex: 1, explanation: "Apples đếm được nên dùng how many." }],
    visuals: ["🍞", "🍚", "🥩", "🥦", "🍎", "💧", "🥛", "🧴", "🍰", "🍽️", "🥛❓", "🥛✅", "🍎🔢❓", "6️⃣🍎🍞"],
  },
  {
    slug: "everyday-things", title: "Bài 9 · Đồ vật hằng ngày", theme: "Everyday objects", description: "Xác định đồ vật, hỏi chủ sở hữu và mô tả vị trí.", grammar: "This/that/these/those; đại từ sở hữu mine/yours/his/hers.",
    words: [["key", "chìa khóa"], ["wallet", "ví"], ["phone", "điện thoại"], ["glasses", "kính"], ["umbrella", "ô, dù"], ["bag", "túi"], ["charger", "bộ sạc"], ["notebook", "sổ tay"], ["pen", "bút"], ["ticket", "vé"]],
    sentences: [["Are these your keys?", "Đây có phải chìa khóa của bạn không?", "Em nhặt được một chùm chìa khóa gần người đối diện."], ["No, mine are on the table.", "Không, chìa khóa của tôi ở trên bàn.", "Em dùng đại từ sở hữu mine."], ["Whose umbrella is that?", "Chiếc ô kia của ai?", "Em hỏi chủ sở hữu một đồ vật ở xa."], ["I think it's hers.", "Tôi nghĩ nó là của cô ấy.", "Em trả lời bằng đại từ sở hữu hers."]],
    practice: [{ prompt: "Đồ vật ở gần và số nhiều: ___ books.", options: ["This", "These", "That"], correctIndex: 1, explanation: "These dùng cho nhiều đồ vật ở gần." }, { prompt: "Hoàn thành: This phone is my phone. It is ___.", options: ["my", "mine", "me"], correctIndex: 1, explanation: "Mine thay thế cho “my phone”." }],
    visuals: ["🔑", "👛", "📱", "👓", "☂️", "👜", "🔌", "📓", "🖊️", "🎫", "🔑❓", "🔑🪑", "☂️❓", "☂️👩"],
  },
  {
    slug: "abilities-at-work", title: "Bài 10 · Khả năng trong công việc", theme: "Abilities and jobs", description: "Nói điều mình làm được, chưa làm được và hỏi kỹ năng.", grammar: "Can/can't + động từ nguyên mẫu; trạng từ well, quickly, carefully.",
    words: [["skill", "kỹ năng"], ["type", "đánh máy"], ["drive", "lái xe"], ["repair", "sửa chữa"], ["organize", "sắp xếp"], ["design", "thiết kế"], ["speak", "nói"], ["carefully", "cẩn thận"], ["quickly", "nhanh chóng"], ["well", "tốt"]],
    sentences: [["What can you do well?", "Bạn có thể làm tốt việc gì?", "Em hỏi về điểm mạnh nghề nghiệp."], ["I can organize events well.", "Tôi có thể tổ chức sự kiện tốt.", "Em nói một kỹ năng và mức độ thực hiện."], ["Can you use this design program?", "Bạn có thể sử dụng chương trình thiết kế này không?", "Em hỏi một kỹ năng cụ thể."], ["Not yet, but I can learn quickly.", "Chưa, nhưng tôi có thể học nhanh.", "Em nói thật về kỹ năng hiện tại và khả năng học."]],
    practice: [{ prompt: "Hoàn thành: She can ___ a car.", options: ["drives", "drive", "driving"], correctIndex: 1, explanation: "Sau can dùng động từ nguyên mẫu." }, { prompt: "Chọn câu phủ định đúng.", options: ["I don't can swim.", "I can't swim.", "I can not to swim."], correctIndex: 1, explanation: "Phủ định của can là cannot/can't." }],
    visuals: ["🛠️", "⌨️", "🚗", "🔧", "📋", "🎨", "🗣️", "🔎", "⚡", "🌟", "🛠️❓", "📋🌟", "💻❓", "📚⚡"],
  },
  {
    slug: "review-two", title: "Ôn tập 2 · Bài 6–10", theme: "Hiện tại, cảm xúc và khả năng", description: "Củng cố hiện tại tiếp diễn, cảm xúc, lượng từ, chỉ định và can/can't.", grammar: "Tổng hợp cấu trúc của bài 6 đến bài 10.",
    words: [["action", "hành động"], ["emotion", "cảm xúc"], ["quantity", "số lượng"], ["object", "đồ vật"], ["ability", "khả năng"], ["present", "hiện tại"], ["countable", "đếm được"], ["uncountable", "không đếm được"], ["belong", "thuộc về"], ["practise", "luyện tập"]],
    sentences: [["I'm cooking dinner right now.", "Tôi đang nấu bữa tối ngay lúc này.", "Em mô tả hành động hiện tại."], ["How much rice are you cooking?", "Bạn đang nấu bao nhiêu gạo?", "Người đối diện hỏi lượng không đếm được."], ["These vegetables are mine.", "Những rau củ này là của tôi.", "Em xác định đồ ở gần và chủ sở hữu."], ["I can prepare them quickly.", "Tôi có thể chuẩn bị chúng nhanh.", "Em nói khả năng bằng can và trạng từ."]],
    practice: [{ prompt: "Chọn câu đúng.", options: ["He is cook now.", "He cooking now.", "He is cooking now."], correctIndex: 2, explanation: "Hiện tại tiếp diễn: is + cooking." }, { prompt: "Hoàn thành: How ___ water do you need?", options: ["many", "much", "some"], correctIndex: 1, explanation: "Water không đếm được nên dùng how much." }],
    visuals: ["🏃", "😊", "🔢", "🔑", "💪", "⏱️", "🍎", "💧", "🏷️", "📚", "🍳⏱️", "🍚❓", "🥦🙋", "⚡🍳"],
  },
  {
    slug: "last-night", title: "Bài 11 · Chuyện tối qua", theme: "Past events", description: "Hỏi và kể những việc đã xảy ra bằng quá khứ đơn.", grammar: "Quá khứ đơn với did/didn't, động từ có quy tắc và bất quy tắc.",
    words: [["yesterday", "hôm qua"], ["last night", "tối qua"], ["watch", "xem"], ["visit", "thăm"], ["go", "đi"], ["see", "xem, thấy"], ["have", "có, dùng"], ["enjoy", "thích"], ["happen", "xảy ra"], ["ago", "trước đây"]],
    sentences: [["Did you watch the film last night?", "Bạn có xem phim tối qua không?", "Em hỏi về một hoạt động đã kết thúc."], ["No, I went out with my family.", "Không, tôi đã ra ngoài cùng gia đình.", "Em trả lời phủ định rồi kể việc đã làm."], ["Where did you go?", "Bạn đã đi đâu?", "Người đối diện hỏi thêm về địa điểm."], ["We had dinner at a new restaurant.", "Chúng tôi đã ăn tối tại một nhà hàng mới.", "Em kể hoạt động bằng dạng quá khứ had."]],
    practice: [{ prompt: "Hoàn thành: Did she ___ the film?", options: ["watched", "watch", "watches"], correctIndex: 1, explanation: "Sau did dùng động từ nguyên mẫu." }, { prompt: "Dạng quá khứ của go là gì?", options: ["goed", "gone", "went"], correctIndex: 2, explanation: "Go là động từ bất quy tắc: go → went." }],
    visuals: ["📅", "🌙", "🎬", "🏡", "🚶", "👀", "🍽️", "😊", "⚡", "⏪", "🎬❓", "👪🚗", "📍❓", "🍽️🏪"],
  },
  {
    slug: "personal-style", title: "Bài 12 · Phong cách thời trang", theme: "Clothes and style", description: "Mô tả trang phục, so sánh lựa chọn và nói sở thích.", grammar: "Tính từ trước danh từ; so sánh hơn với -er/more và too/enough.",
    words: [["style", "phong cách"], ["shirt", "áo sơ mi"], ["dress", "váy"], ["jacket", "áo khoác"], ["comfortable", "thoải mái"], ["formal", "trang trọng"], ["casual", "thường ngày"], ["bright", "rực rỡ"], ["simple", "đơn giản"], ["fashionable", "hợp thời trang"]],
    sentences: [["Which jacket do you prefer?", "Bạn thích chiếc áo khoác nào hơn?", "Em hỏi người bạn chọn giữa hai món đồ."], ["The blue one is more comfortable.", "Chiếc màu xanh thoải mái hơn.", "Em dùng so sánh hơn với tính từ dài."], ["Is this shirt too large for me?", "Chiếc áo này có quá rộng với tôi không?", "Em hỏi về độ vừa của trang phục."], ["Yes, try the smaller one.", "Đúng, hãy thử chiếc nhỏ hơn.", "Em đưa ra một lựa chọn phù hợp hơn."]],
    practice: [{ prompt: "Hoàn thành: This coat is ___ than that one.", options: ["warm", "warmer", "more warm"], correctIndex: 1, explanation: "Tính từ ngắn warm thêm -er: warmer." }, { prompt: "Chọn cụm đúng.", options: ["a red beautiful dress", "a beautiful red dress", "a dress red beautiful"], correctIndex: 1, explanation: "Tính từ đứng trước danh từ; nhận xét thường đứng trước màu sắc." }],
    visuals: ["✨", "👔", "👗", "🧥", "😌", "🤵", "👕", "🌈", "⚪", "🕶️", "🧥🧥❓", "🔵😌", "👔📏❓", "👕🔽"],
  },
  {
    slug: "past-habits", title: "Bài 13 · Thói quen trước đây", theme: "Used to", description: "So sánh thói quen quá khứ với cuộc sống hiện tại.", grammar: "Used to / didn't use to / Did ... use to ...?",
    words: [["used to", "đã từng, thường trước đây"], ["childhood", "tuổi thơ"], ["before", "trước đây"], ["different", "khác"], ["habit", "thói quen"], ["play", "chơi"], ["collect", "sưu tầm"], ["ride", "đạp, cưỡi"], ["move", "chuyển"], ["change", "thay đổi"]],
    sentences: [["Did you use to play sports?", "Bạn trước đây có thường chơi thể thao không?", "Em hỏi về một thói quen trong quá khứ."], ["Yes, I used to play volleyball.", "Có, trước đây tôi thường chơi bóng chuyền.", "Em kể thói quen không còn duy trì."], ["I didn't use to enjoy exercise.", "Trước đây tôi không thích tập thể dục.", "Em nói một điều không đúng trong quá khứ."], ["My habits changed when I moved here.", "Thói quen của tôi thay đổi khi chuyển đến đây.", "Em giải thích thời điểm thay đổi."]],
    practice: [{ prompt: "Chọn câu đúng.", options: ["I use to play.", "I used to play.", "I used play to."], correctIndex: 1, explanation: "Câu khẳng định dùng used to + động từ nguyên mẫu." }, { prompt: "Hoàn thành câu hỏi: Did he ___ to live here?", options: ["used", "use", "using"], correctIndex: 1, explanation: "Sau did dùng use to, không dùng used to." }],
    visuals: ["⏪", "🧒", "🔙", "↔️", "🔁", "⚽", "🧸", "🚲", "📦", "🔄", "⚽❓", "🏐🙂", "🚫🏃", "📦🔄"],
  },
  {
    slug: "holiday-plans", title: "Bài 14 · Kế hoạch kỳ nghỉ", theme: "Future plans", description: "Nói kế hoạch đã định, hỏi dự định và chuẩn bị cho chuyến đi.", grammar: "Be going to + động từ; câu hỏi và phủ định với kế hoạch tương lai.",
    words: [["holiday", "kỳ nghỉ"], ["trip", "chuyến đi"], ["travel", "du lịch"], ["book", "đặt chỗ"], ["pack", "đóng gói"], ["hotel", "khách sạn"], ["flight", "chuyến bay"], ["passport", "hộ chiếu"], ["plan", "kế hoạch"], ["visit", "tham quan"]],
    sentences: [["What are you going to do this summer?", "Bạn định làm gì mùa hè này?", "Em hỏi về một kế hoạch tương lai đã dự định."], ["We're going to visit Singapore.", "Chúng tôi định tham quan Singapore.", "Em nói điểm đến đã chọn."], ["Have you booked your flights yet?", "Bạn đã đặt chuyến bay chưa?", "Người đối diện hỏi bước chuẩn bị."], ["Not yet. I'm going to book them tonight.", "Chưa. Tôi định đặt tối nay.", "Em nói kế hoạch sẽ thực hiện sớm."]],
    practice: [{ prompt: "Hoàn thành: She is going to ___ a hotel.", options: ["books", "book", "booking"], correctIndex: 1, explanation: "Sau going to dùng động từ nguyên mẫu." }, { prompt: "Chọn câu hỏi đúng.", options: ["What you are going to do?", "What are you going to do?", "What do you going to do?"], correctIndex: 1, explanation: "Đảo are lên trước chủ ngữ trong câu hỏi." }],
    visuals: ["🏖️", "🧳", "✈️", "📅", "🧳", "🏨", "🛫", "🛂", "📝", "📍", "☀️❓", "✈️🇸🇬", "🛫📅❓", "🌙💻"],
  },
  {
    slug: "final-review", title: "Kiểm tra cuối khóa", theme: "Tổng hợp tiếng Anh cơ bản", description: "Kết nối kiến thức từ giới thiệu bản thân đến quá khứ và kế hoạch tương lai.", grammar: "Ôn tổng hợp to be, các thì cơ bản, lượng từ, so sánh, can và used to.",
    words: [["identify", "xác định"], ["choose", "lựa chọn"], ["complete", "hoàn thành"], ["correct", "chính xác"], ["question", "câu hỏi"], ["answer", "câu trả lời"], ["present", "hiện tại"], ["past", "quá khứ"], ["future", "tương lai"], ["progress", "tiến bộ"]],
    sentences: [["I work in Hanoi, but I'm working from home today.", "Tôi làm việc ở Hà Nội, nhưng hôm nay đang làm tại nhà.", "Em phân biệt thói quen và hành động tạm thời."], ["I visited my family last weekend.", "Tôi đã thăm gia đình cuối tuần trước.", "Em kể một hành động quá khứ."], ["I used to travel by bus.", "Trước đây tôi thường đi xe buýt.", "Em nói thói quen cũ."], ["Next month, I'm going to buy a bicycle.", "Tháng tới, tôi định mua một chiếc xe đạp.", "Em nói kế hoạch tương lai."]],
    practice: [{ prompt: "Chọn câu đúng với “right now”.", options: ["I study right now.", "I am studying right now.", "I studied right now."], correctIndex: 1, explanation: "Right now thường dùng với hiện tại tiếp diễn." }, { prompt: "Chọn câu đúng về kế hoạch.", options: ["I going to travel.", "I am go to travel.", "I am going to travel."], correctIndex: 2, explanation: "Công thức: am/is/are going to + động từ." }],
    visuals: ["🔎", "✅", "🏁", "✔️", "❓", "💬", "⏱️", "⏪", "⏩", "📈", "🏢🏠", "👪📅", "🚌⏪", "🚲⏩"],
  },
];

export function basicEnglishBoardUrl(slug: string) {
  return `/basic-english/boards/${slug}.svg`;
}

export function buildBasicEnglishLessons(unit: BasicEnglishUnitSeed, options?: { boardUrl?: string }): BasicEnglishLessonSeed[] {
  const boardUrl = options?.boardUrl ?? basicEnglishBoardUrl(unit.slug);
  const sprite = { spriteColumns: 5, spriteRows: 3 };
  const vocabulary: ActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn hình, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn hình và tự gọi từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: {
      mode: "VISUAL_GUESS",
      prompt: "Hình này gợi đến từ hoặc cụm từ nào?",
      imageUrl: boardUrl,
      imageAlt: `Minh họa trực quan cho nghĩa: ${meaning}`,
      imageHint: `Hình đang mô tả ý “${meaning}”.`,
      spriteIndex: index,
      ...sprite,
      audioText: word,
      front: word,
      back: meaning,
    },
  }));
  for (const [groupIndex, group] of [unit.words.slice(0, 5), unit.words.slice(5)].entries()) {
    vocabulary.push({
      type: ActivityType.MATCHING,
      title: `Ghép từ với nghĩa · phần ${groupIndex + 1}`,
      instruction: "Ghép từng từ tiếng Anh với nghĩa phù hợp.",
      order: unit.words.length + groupIndex + 1,
      payload: {
        prompt: `Ôn từ vựng chủ đề ${unit.theme}.`,
        pairs: group.map(([left, right]) => ({ left, right })),
      },
    });
  }

  const practice = unit.practice.map((question, index): ActivitySeed => ({
    type: ActivityType.MULTIPLE_CHOICE,
    title: `Kiểm tra mẫu câu ${index + 1}`,
    instruction: `Ghi nhớ nhanh: ${unit.grammar}`,
    order: index + 1,
    payload: {
      prompt: question.prompt,
      options: question.options.map((text, optionIndex) => ({ id: `option-${optionIndex}`, text })),
      correctOptionId: `option-${question.correctIndex}`,
      explanation: question.explanation,
    },
  }));

  return [
    { slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Nhìn, nghe và đoán mười từ khóa của bài.", activities: vocabulary },
    {
      slug: "mau-cau",
      title: "Mẫu câu và phản xạ",
      description: `${unit.grammar} Luyện bằng hội thoại ngắn trong tình huống thực tế.`,
      activities: buildSecondaryReactionActivities(unit.sentences, {
        imageUrl: boardUrl,
        spriteOffset: unit.words.length,
        ...sprite,
      }),
    },
    { slug: "kiem-tra", title: "Kiểm tra nhanh", description: `Tự kiểm tra: ${unit.grammar}`, activities: practice },
  ];
}
