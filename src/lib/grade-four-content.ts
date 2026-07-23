import { ActivityType } from "@prisma/client";

type ActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

export type GradeFourLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: ActivitySeed[];
};

export type GradeFourUnitSeed = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeFourUnits: GradeFourUnitSeed[] = [
  {
    slug: "nice-to-see-you-again", title: "Nice to see you again.", theme: "Gặp gỡ", description: "Chào hỏi theo từng thời điểm và nói lời tạm biệt lịch sự.",
    words: [["morning", "buổi sáng"], ["afternoon", "buổi chiều"], ["evening", "buổi tối"], ["night", "ban đêm"], ["see", "nhìn thấy, gặp"], ["meet", "gặp gỡ"], ["pupil", "học sinh"], ["study", "học"], ["tomorrow", "ngày mai"]],
    sentences: [["Good morning.", "Chào buổi sáng.", "Em gặp thầy cô vào đầu buổi học."], ["Nice to see you again.", "Rất vui được gặp lại bạn.", "Em gặp lại một người bạn sau kỳ nghỉ."], ["Good evening.", "Chào buổi tối.", "Em chào một người lớn khi trời đã tối."], ["See you tomorrow.", "Hẹn gặp bạn ngày mai.", "Tan học, em chào bạn trước khi về."]],
  },
  {
    slug: "im-from-japan", title: "I'm from Japan.", theme: "Quốc gia và quốc tịch", description: "Hỏi và trả lời về quốc gia, quốc tịch của một người.",
    words: [["nationality", "quốc tịch"], ["country", "quốc gia"], ["America", "nước Mỹ"], ["American", "người Mỹ"], ["Australia", "nước Úc"], ["Australian", "người Úc"], ["Malaysia", "nước Malaysia"], ["Malaysian", "người Malaysia"], ["England", "nước Anh"], ["English", "người Anh"], ["Japan", "nước Nhật"], ["Japanese", "người Nhật"], ["Viet Nam", "Việt Nam"], ["Vietnamese", "người Việt Nam"]],
    sentences: [["Where are you from?", "Bạn đến từ đâu?", "Em gặp một bạn nhỏ đến từ nước khác."], ["I'm from Japan.", "Mình đến từ Nhật Bản.", "Bạn hỏi quê hương và em trả lời."], ["What's your nationality?", "Quốc tịch của bạn là gì?", "Em muốn biết quốc tịch của người bạn mới."], ["I'm Vietnamese.", "Mình là người Việt Nam.", "Em giới thiệu quốc tịch của mình."]],
  },
  {
    slug: "what-day-is-it-today", title: "What day is it today?", theme: "Ngày trong tuần", description: "Nói ngày trong tuần và hoạt động thường làm vào từng ngày.",
    words: [["Monday", "thứ Hai"], ["Tuesday", "thứ Ba"], ["Wednesday", "thứ Tư"], ["Thursday", "thứ Năm"], ["Friday", "thứ Sáu"], ["Saturday", "thứ Bảy"], ["Sunday", "Chủ nhật"], ["guitar", "đàn ghi-ta"], ["visit", "thăm"], ["go to the zoo", "đi sở thú"], ["go swimming", "đi bơi"], ["help my parents", "giúp bố mẹ"]],
    sentences: [["What day is it today?", "Hôm nay là thứ mấy?", "Em nhìn lịch nhưng chưa biết hôm nay là thứ mấy."], ["It's Monday.", "Hôm nay là thứ Hai.", "Em bắt đầu một tuần học mới."], ["What do you do on Sundays?", "Bạn làm gì vào Chủ nhật?", "Em muốn biết hoạt động cuối tuần của bạn."], ["I help my parents.", "Mình giúp bố mẹ.", "Em phụ giúp bố mẹ vào cuối tuần."]],
  },
  {
    slug: "whens-your-birthday", title: "When's your birthday?", theme: "Tháng và ngày sinh", description: "Gọi tên các tháng, ngày thứ tự và hỏi ngày sinh nhật.",
    words: [["January", "tháng Một"], ["February", "tháng Hai"], ["March", "tháng Ba"], ["April", "tháng Tư"], ["May", "tháng Năm"], ["June", "tháng Sáu"], ["July", "tháng Bảy"], ["August", "tháng Tám"], ["September", "tháng Chín"], ["October", "tháng Mười"], ["November", "tháng Mười một"], ["December", "tháng Mười hai"], ["first", "thứ nhất"], ["second", "thứ hai"], ["third", "thứ ba"], ["fourth", "thứ tư"], ["fifth", "thứ năm"], ["tenth", "thứ mười"], ["twenty-first", "thứ hai mươi mốt"], ["thirtieth", "thứ ba mươi"], ["thirty-first", "thứ ba mươi mốt"]],
    sentences: [["What's the date today?", "Hôm nay là ngày bao nhiêu?", "Em xem lịch và hỏi ngày trong tháng."], ["It's the first of June.", "Hôm nay là ngày một tháng Sáu.", "Em đọc ngày đầu tháng trên lịch."], ["When's your birthday?", "Sinh nhật bạn là khi nào?", "Em muốn biết ngày sinh nhật của bạn."], ["It's on the twenty-first of May.", "Sinh nhật mình vào ngày hai mươi mốt tháng Năm.", "Em trả lời ngày sinh của mình."]],
  },
  {
    slug: "can-you-swim", title: "Can you swim?", theme: "Khả năng", description: "Hỏi và trả lời về những hoạt động một người có thể làm.",
    words: [["swim", "bơi"], ["ride a bike", "đi xe đạp"], ["ride a horse", "cưỡi ngựa"], ["swing", "đu xà"], ["count", "đếm"], ["climb", "leo trèo"], ["play volleyball", "chơi bóng chuyền"]],
    sentences: [["Can you swim?", "Bạn có biết bơi không?", "Em muốn biết bạn có thể bơi hay không."], ["Yes, I can.", "Có, mình biết.", "Bạn hỏi đúng một việc em có thể làm."], ["Can he ride a bike?", "Bạn nam ấy biết đi xe đạp không?", "Em nhìn bạn nam đứng cạnh xe đạp."], ["No, he can't.", "Không, bạn ấy không biết.", "Bạn nam chưa biết đi xe đạp."]],
  },
  {
    slug: "wheres-your-school", title: "Where's your school?", theme: "Địa chỉ trường học", description: "Gọi tên địa điểm và hỏi trường của một người ở đâu.",
    words: [["street", "phố"], ["road", "đường"], ["district", "quận, huyện"], ["village", "làng"], ["primary school", "trường tiểu học"]],
    sentences: [["Where's your school?", "Trường của bạn ở đâu?", "Em muốn biết địa chỉ trường của bạn."], ["It's on Hoa Binh Street.", "Trường ở phố Hòa Bình.", "Em nói tên con phố có trường mình."], ["What school do you go to?", "Bạn học trường nào?", "Em gặp một bạn cùng tuổi và hỏi tên trường."], ["I go to Nguyen Du Primary School.", "Mình học Trường Tiểu học Nguyễn Du.", "Em giới thiệu trường mình đang học."]],
  },
  {
    slug: "what-do-you-like-doing", title: "What do you like doing?", theme: "Sở thích", description: "Hỏi hoạt động và sở thích của bạn bè.",
    words: [["collect stamps", "sưu tầm tem"], ["sail a boat", "đi thuyền buồm"], ["fly in a plane", "đi máy bay"], ["play the drums", "chơi trống"], ["read comic books", "đọc truyện tranh"], ["take photographs", "chụp ảnh"]],
    sentences: [["What do you like doing?", "Bạn thích làm gì?", "Em muốn biết hoạt động bạn yêu thích."], ["I like collecting stamps.", "Mình thích sưu tầm tem.", "Em cho bạn xem bộ sưu tập tem."], ["What's your hobby?", "Sở thích của bạn là gì?", "Em hỏi trực tiếp về sở thích của bạn mới."], ["My hobby is taking photographs.", "Sở thích của mình là chụp ảnh.", "Em cầm máy ảnh và giới thiệu sở thích."]],
  },
  {
    slug: "subjects-today", title: "What subjects do you have today?", theme: "Môn học", description: "Gọi tên môn học và hỏi lịch học trong ngày, trong tuần.",
    words: [["subject", "môn học"], ["Music", "Âm nhạc"], ["Art", "Mỹ thuật"], ["Science", "Khoa học"], ["PE", "Thể dục"], ["Vietnamese", "Tiếng Việt"], ["English", "Tiếng Anh"], ["Maths", "Toán"], ["IT", "Tin học"]],
    sentences: [["What subjects do you have today?", "Hôm nay bạn có những môn gì?", "Em muốn biết thời khóa biểu của bạn hôm nay."], ["I have Maths and English.", "Mình có môn Toán và Tiếng Anh.", "Em trả lời hai môn học trong ngày."], ["When do you have Science?", "Khi nào bạn học Khoa học?", "Em muốn biết ngày học môn Khoa học."], ["I have it on Thursday.", "Mình học môn đó vào thứ Năm.", "Em xem thời khóa biểu và trả lời."]],
  },
  {
    slug: "what-are-they-doing", title: "What are they doing?", theme: "Hoạt động trong lớp", description: "Hỏi và miêu tả hoạt động một hoặc nhiều người đang làm.",
    words: [["write a dictation", "viết chính tả"], ["write a letter", "viết thư"], ["make a kite", "làm diều"], ["make a paper boat", "gấp thuyền giấy"], ["make a puppet", "làm con rối"], ["watch a video", "xem video"], ["watch TV", "xem ti vi"], ["paint a mask", "tô mặt nạ"], ["read a text", "đọc đoạn văn"], ["do exercise", "làm bài tập"], ["have a break", "nghỉ giải lao"], ["have fun", "vui chơi"]],
    sentences: [["What is she doing?", "Bạn nữ đang làm gì?", "Em thấy một bạn nữ đang bận trong lớp."], ["She's writing a letter.", "Bạn ấy đang viết thư.", "Bạn nữ ngồi viết một lá thư."], ["What are they doing?", "Họ đang làm gì?", "Em nhìn thấy một nhóm bạn cùng làm thủ công."], ["They're making a kite.", "Họ đang làm một chiếc diều.", "Các bạn đang dán giấy và que tre thành diều."]],
  },
  {
    slug: "where-were-you-yesterday", title: "Where were you yesterday?", theme: "Hoạt động trong quá khứ", description: "Nói mình đã ở đâu và làm gì vào ngày hôm qua.",
    words: [["water the flowers", "tưới hoa"], ["chat online", "trò chuyện trực tuyến"], ["yesterday morning", "sáng hôm qua"], ["yesterday afternoon", "chiều hôm qua"], ["yesterday evening", "tối hôm qua"]],
    sentences: [["Where were you yesterday?", "Hôm qua bạn đã ở đâu?", "Em không gặp bạn hôm qua và muốn hỏi."], ["I was at home.", "Mình đã ở nhà.", "Em trả lời nơi mình ở ngày hôm qua."], ["What did you do yesterday?", "Hôm qua bạn đã làm gì?", "Em hỏi về hoạt động của bạn trong quá khứ."], ["I watered the flowers.", "Mình đã tưới hoa.", "Em nhớ lại việc đã làm trong vườn."]],
  },
  {
    slug: "what-time-is-it", title: "What time is it?", theme: "Thời gian biểu", description: "Hỏi giờ và nói thời điểm làm các hoạt động hằng ngày.",
    words: [["get up", "thức dậy"], ["go to school", "đi học"], ["have breakfast", "ăn sáng"], ["have lunch", "ăn trưa"], ["have dinner", "ăn tối"], ["go home", "về nhà"], ["go to bed", "đi ngủ"]],
    sentences: [["What time is it?", "Mấy giờ rồi?", "Em nhìn đồng hồ nhưng chưa biết giờ."], ["It's seven o'clock.", "Bây giờ là bảy giờ.", "Kim đồng hồ đang chỉ đúng bảy giờ."], ["What time do you go to school?", "Bạn đi học lúc mấy giờ?", "Em hỏi thời gian bạn bắt đầu đi học."], ["I go to school at seven.", "Mình đi học lúc bảy giờ.", "Em nói giờ mình rời nhà đến trường."]],
  },
  {
    slug: "what-does-your-father-do", title: "What does your father do?", theme: "Nghề nghiệp", description: "Hỏi nghề nghiệp và nơi làm việc của người thân.",
    words: [["job", "nghề nghiệp"], ["farmer", "nông dân"], ["nurse", "y tá"], ["doctor", "bác sĩ"], ["driver", "tài xế"], ["worker", "công nhân"], ["hospital", "bệnh viện"], ["field", "cánh đồng"], ["factory", "nhà máy"], ["office", "văn phòng"], ["clerk", "nhân viên văn phòng"]],
    sentences: [["What does your father do?", "Bố bạn làm nghề gì?", "Em muốn biết nghề nghiệp của bố bạn."], ["He's a doctor.", "Bố mình là bác sĩ.", "Em giới thiệu nghề của bố."], ["Where does he work?", "Bố bạn làm việc ở đâu?", "Em hỏi nơi bố bạn đi làm."], ["He works in a hospital.", "Bố mình làm ở bệnh viện.", "Em nói nơi làm việc của bố."]],
  },
  {
    slug: "would-you-like-some-milk", title: "Would you like some milk?", theme: "Đồ ăn và đồ uống", description: "Nói món yêu thích và mời bạn dùng đồ ăn, thức uống.",
    words: [["food", "đồ ăn"], ["vegetable", "rau"], ["rice", "cơm"], ["noodles", "mì"], ["bread", "bánh mì"], ["favourite", "yêu thích"], ["dish", "món ăn"], ["chicken", "thịt gà"], ["beef", "thịt bò"], ["fish", "cá"], ["pork", "thịt lợn"], ["drink", "đồ uống"], ["water", "nước"], ["milk", "sữa"], ["juice", "nước ép"], ["lemonade", "nước chanh"]],
    sentences: [["What's your favourite food?", "Món ăn yêu thích của bạn là gì?", "Em muốn biết bạn thích ăn món nào nhất."], ["My favourite food is noodles.", "Món mình thích nhất là mì.", "Em giới thiệu món ăn yêu thích."], ["Would you like some milk?", "Bạn có muốn uống sữa không?", "Em lịch sự mời bạn một cốc sữa."], ["Yes, please.", "Có, cảm ơn bạn.", "Em nhận lời mời dùng đồ uống."]],
  },
  {
    slug: "what-does-he-look-like", title: "What does he look like?", theme: "Ngoại hình", description: "Hỏi, miêu tả và so sánh ngoại hình của mọi người.",
    words: [["strong", "khỏe mạnh"], ["tall", "cao"], ["short", "thấp"], ["slim", "thon gọn"]],
    sentences: [["What does he look like?", "Anh ấy trông như thế nào?", "Em muốn biết ngoại hình của một người chưa gặp."], ["He's tall and strong.", "Anh ấy cao và khỏe.", "Em miêu tả một người đàn ông cao khỏe."], ["Who is taller?", "Ai cao hơn?", "Em so sánh chiều cao của hai bạn."], ["Nam is taller than Minh.", "Nam cao hơn Minh.", "Em quan sát và so sánh hai bạn nam."]],
  },
  {
    slug: "whens-childrens-day", title: "When's Children's Day?", theme: "Ngày lễ", description: "Gọi tên ngày lễ và nói những hoạt động thường làm trong dịp lễ.",
    words: [["festival", "lễ hội"], ["Children's Day", "Tết Thiếu nhi"], ["Teachers' Day", "Ngày Nhà giáo"], ["Christmas", "Giáng sinh"], ["New Year", "Năm mới"], ["Tet holiday", "Tết"], ["wish", "lời chúc"], ["midnight", "nửa đêm"], ["colorful", "đầy màu sắc"], ["buy", "mua"], ["have a party", "tổ chức tiệc"], ["go shopping", "đi mua sắm"], ["wear new clothes", "mặc quần áo mới"], ["eat fruit and cakes", "ăn trái cây và bánh"], ["decorate the house", "trang trí nhà"], ["make banh chung", "gói bánh chưng"], ["get lucky money", "nhận lì xì"], ["watch firework displays", "xem pháo hoa"]],
    sentences: [["When's Children's Day?", "Tết Thiếu nhi vào ngày nào?", "Em muốn biết ngày diễn ra Tết Thiếu nhi."], ["It's on the first of June.", "Ngày đó vào mùng một tháng Sáu.", "Em trả lời ngày Tết Thiếu nhi."], ["What do you do at Tet?", "Bạn làm gì vào dịp Tết?", "Em hỏi hoạt động ngày Tết của bạn."], ["I wear new clothes and get lucky money.", "Mình mặc quần áo mới và nhận lì xì.", "Em kể hai hoạt động yêu thích ngày Tết."]],
  },
  {
    slug: "lets-go-to-the-bookshop", title: "Let's go to the bookshop.", theme: "Địa điểm trong phố", description: "Rủ bạn đi đâu và giải thích lý do muốn tới đó.",
    words: [["sweet", "kẹo"], ["sweet shop", "cửa hàng kẹo"], ["chocolate", "sô-cô-la"], ["bakery", "tiệm bánh"], ["medicine", "thuốc"], ["pharmacy", "hiệu thuốc"], ["swimming pool", "bể bơi"], ["film", "bộ phim"], ["cinema", "rạp chiếu phim"], ["bookshop", "hiệu sách"], ["supermarket", "siêu thị"], ["hungry", "đói"], ["busy", "bận"]],
    sentences: [["Let's go to the bookshop.", "Chúng ta cùng đến hiệu sách nhé.", "Em muốn rủ bạn đi mua sách."], ["Great idea!", "Ý kiến hay đấy!", "Em đồng ý với lời rủ của bạn."], ["Why do you want to go there?", "Tại sao bạn muốn tới đó?", "Em muốn biết lý do bạn chọn địa điểm này."], ["Because I want to buy a book.", "Vì mình muốn mua một quyển sách.", "Em giải thích mục đích đi hiệu sách."]],
  },
  {
    slug: "how-much-is-the-tshirt", title: "How much is the T-shirt?", theme: "Mua sắm và trang phục", description: "Gọi tên trang phục, hỏi đồ đang mặc và giá tiền.",
    words: [["how much", "bao nhiêu tiền"], ["thousand", "nghìn"], ["dong", "đồng"], ["sales assistant", "nhân viên bán hàng"], ["jeans", "quần bò"], ["trousers", "quần dài"], ["blouse", "áo kiểu nữ"], ["jacket", "áo khoác"], ["skirt", "chân váy"], ["shirt", "áo sơ mi"], ["T-shirt", "áo phông"], ["scarf", "khăn quàng"], ["jumper", "áo len"], ["cap", "mũ lưỡi trai"], ["pair", "đôi, cặp"], ["shoes", "giày"], ["sandals", "xăng-đan"], ["slippers", "dép đi trong nhà"], ["socks", "tất"], ["shorts", "quần soóc"]],
    sentences: [["What are you wearing?", "Bạn đang mặc gì?", "Em hỏi về trang phục của bạn."], ["I'm wearing a T-shirt and jeans.", "Mình đang mặc áo phông và quần bò.", "Em miêu tả quần áo mình đang mặc."], ["How much is the T-shirt?", "Chiếc áo phông giá bao nhiêu?", "Em muốn hỏi giá chiếc áo trong cửa hàng."], ["It's eighty thousand dong.", "Giá tám mươi nghìn đồng.", "Nhân viên bán hàng báo giá chiếc áo."]],
  },
  {
    slug: "whats-your-phone-number", title: "What's your phone number?", theme: "Điện thoại và lời rủ", description: "Hỏi số điện thoại và rủ bạn cùng tham gia hoạt động.",
    words: [["phone number", "số điện thoại"], ["mobile phone", "điện thoại di động"], ["call", "gọi điện"], ["call back", "gọi lại"], ["zero", "số không"], ["oh", "cách đọc số không"], ["go fishing", "đi câu cá"], ["free", "rảnh"], ["relax", "thư giãn"], ["go for a picnic", "đi dã ngoại"], ["speak", "nói chuyện"]],
    sentences: [["What's your phone number?", "Số điện thoại của bạn là gì?", "Em muốn lưu số liên lạc của bạn."], ["It's 090 123 4567.", "Số của mình là 090 123 4567.", "Em đọc chậm số điện thoại cho bạn nghe."], ["Would you like to go for a picnic?", "Bạn có muốn đi dã ngoại không?", "Em gọi điện rủ bạn đi chơi cuối tuần."], ["Sorry, I'm busy.", "Xin lỗi, mình bận.", "Em không thể tham gia và từ chối lịch sự."]],
  },
  {
    slug: "what-animal-do-you-want-to-see", title: "What animal do you want to see?", theme: "Động vật", description: "Gọi tên, lựa chọn và giải thích lý do muốn xem một con vật.",
    words: [["animal", "động vật"], ["crocodile", "cá sấu"], ["tiger", "hổ"], ["bear", "gấu"], ["scary", "đáng sợ"], ["elephant", "voi"], ["zebra", "ngựa vằn"], ["monkey", "khỉ"], ["funny", "vui nhộn"], ["fast", "nhanh"], ["friendly", "thân thiện"], ["wonderful", "tuyệt vời"], ["enormous", "khổng lồ"], ["beautiful", "đẹp"]],
    sentences: [["What animal do you want to see?", "Bạn muốn xem con vật nào?", "Em cùng bạn chọn con vật muốn xem ở sở thú."], ["I want to see the monkeys.", "Mình muốn xem những con khỉ.", "Em chọn khu nuôi khỉ."], ["Why do you want to see them?", "Tại sao bạn muốn xem chúng?", "Bạn hỏi lý do em thích con vật đó."], ["Because they're funny.", "Vì chúng rất vui nhộn.", "Em giải thích điều thú vị ở những chú khỉ."]],
  },
  {
    slug: "summer-plans", title: "What are you going to do this summer?", theme: "Kế hoạch mùa hè", description: "Nói nơi sẽ đến và hoạt động dự định làm trong kỳ nghỉ hè.",
    words: [["summer", "mùa hè"], ["summer holidays", "kỳ nghỉ hè"], ["stay", "ở lại"], ["hotel", "khách sạn"], ["seafood", "hải sản"], ["sea", "biển"], ["beach", "bãi biển"], ["delicious", "ngon"], ["build a sandcastle", "xây lâu đài cát"], ["go on a boat cruise", "đi du thuyền"]],
    sentences: [["Where are you going this summer?", "Mùa hè này bạn sẽ đi đâu?", "Em hỏi điểm đến trong kỳ nghỉ của bạn."], ["I'm going to the beach.", "Mình sẽ đi biển.", "Em nói nơi gia đình sẽ tới."], ["What are you going to do?", "Bạn dự định sẽ làm gì?", "Em hỏi kế hoạch hoạt động của bạn."], ["I'm going to build a sandcastle.", "Mình sẽ xây lâu đài cát.", "Em nói hoạt động muốn làm trên bãi biển."]],
  },
];

export function gradeFourBoardUrl(slug: string) {
  return `/lesson-assets/grade-four/${slug}.webp`;
}

export function buildGradeFourLessons(unit: GradeFourUnitSeed): GradeFourLessonSeed[] {
  const boardUrl = gradeFourBoardUrl(unit.slug);
  const sharedSprite = { spriteColumns: 5, spriteRows: 5 };
  const wordActivities: ActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh, nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "VISUAL_GUESS", prompt: "Tranh này mô tả từ hoặc cụm từ tiếng Anh nào?", imageUrl: boardUrl, imageAlt: `Tranh minh họa ${meaning}`, spriteIndex: index, ...sharedSprite, audioText: word, front: word, back: meaning },
  }));
  const matchingGroups = unit.words.length > 8 && unit.words.length % 8 === 1
    ? [unit.words.slice(0, 7), unit.words.slice(7)]
    : Array.from({ length: Math.ceil(unit.words.length / 8) }, (_, index) => unit.words.slice(index * 8, index * 8 + 8));
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
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 4.", activities: sentenceActivities },
  ];
}
