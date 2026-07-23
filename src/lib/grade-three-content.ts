import { ActivityType } from "@prisma/client";

type ActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

export type GradeThreeLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: ActivitySeed[];
};

export type GradeThreeUnitSeed = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeThreeUnits: GradeThreeUnitSeed[] = [
  {
    slug: "hello", title: "Hello", theme: "Chào hỏi", description: "Chào, tạm biệt và hỏi thăm sức khỏe khi gặp bạn bè.",
    words: [["hello", "xin chào"], ["hi", "chào"], ["nice to meet you", "rất vui được gặp bạn"], ["goodbye", "tạm biệt"], ["bye", "tạm biệt"], ["bye-bye", "tạm biệt nhé"], ["fine", "khỏe"], ["thanks", "cảm ơn"], ["thank you", "cảm ơn bạn"], ["how are you", "bạn có khỏe không"]],
    sentences: [["Hello. Nice to meet you.", "Xin chào. Rất vui được gặp bạn.", "Em gặp một người bạn mới lần đầu."], ["How are you?", "Bạn có khỏe không?", "Em gặp lại bạn và muốn hỏi thăm sức khỏe."], ["I'm fine, thank you.", "Mình khỏe, cảm ơn bạn.", "Bạn hỏi thăm và em muốn trả lời lịch sự."], ["Goodbye. See you again.", "Tạm biệt. Hẹn gặp lại.", "Buổi gặp kết thúc và em chào tạm biệt."]],
  },
  {
    slug: "whats-your-name", title: "What's your name?", theme: "Tên và đánh vần", description: "Hỏi tên, trả lời và nhờ bạn đánh vần tên.",
    words: [["what", "gì"], ["how", "như thế nào"], ["you", "bạn"], ["your", "của bạn"], ["name", "tên"], ["spell", "đánh vần"]],
    sentences: [["What's your name?", "Bạn tên là gì?", "Em gặp một người bạn mới và muốn biết tên bạn."], ["My name is Mai.", "Mình tên là Mai.", "Một người bạn hỏi tên và em trả lời."], ["How do you spell your name?", "Bạn đánh vần tên thế nào?", "Em nghe tên bạn nhưng chưa biết cách viết."], ["M-A-I. Mai.", "M-A-I. Mai.", "Em đánh vần tên Mai thật chậm cho bạn nghe."]],
  },
  {
    slug: "this-is-minnie", title: "This is Minnie.", theme: "Giới thiệu bạn bè", description: "Giới thiệu và xác nhận một người bạn mới.",
    words: [["this", "đây, cái này"], ["that", "đó, cái kia"], ["yes", "vâng, đúng"], ["no", "không"], ["friend", "bạn bè"]],
    sentences: [["This is Minnie.", "Đây là Minnie.", "Em dẫn một người bạn tới và giới thiệu bạn ấy."], ["Is this your friend?", "Đây có phải bạn của bạn không?", "Em thấy một bạn nhỏ đi cùng bạn mình."], ["Yes, she is.", "Vâng, đúng vậy.", "Người kia hỏi đúng về bạn nữ đi cùng em."], ["No, he isn't.", "Không, không phải.", "Người kia nhầm một bạn nam với bạn của em."]],
  },
  {
    slug: "how-old-are-you", title: "How old are you?", theme: "Tuổi và số đếm", description: "Hỏi tuổi của bạn và dùng số đếm từ một đến mười.",
    words: [["who", "ai"], ["how old", "bao nhiêu tuổi"], ["year old", "tuổi"], ["he", "cậu ấy"], ["she", "cô ấy"], ["one", "một"], ["two", "hai"], ["three", "ba"], ["four", "bốn"], ["five", "năm"], ["six", "sáu"], ["seven", "bảy"], ["eight", "tám"], ["nine", "chín"], ["ten", "mười"]],
    sentences: [["How old are you?", "Bạn bao nhiêu tuổi?", "Em muốn biết tuổi của người bạn mới."], ["I'm eight years old.", "Mình tám tuổi.", "Bạn hỏi tuổi và em trả lời."], ["How old is she?", "Bạn nữ ấy bao nhiêu tuổi?", "Em muốn hỏi tuổi của một bạn nữ."], ["She's nine years old.", "Bạn ấy chín tuổi.", "Em biết tuổi của bạn nữ và trả lời."]],
  },
  {
    slug: "are-they-your-friends", title: "Are they your friends?", theme: "Bạn bè", description: "Hỏi và trả lời về một hoặc nhiều người bạn.",
    words: [["teacher", "giáo viên"], ["classmate", "bạn cùng lớp"], ["friend", "bạn"], ["they", "họ"], ["too", "cũng"]],
    sentences: [["Is he your friend?", "Cậu ấy có phải bạn của bạn không?", "Em thấy một bạn nam đứng cạnh bạn mình."], ["Yes, he is.", "Vâng, đúng vậy.", "Em xác nhận bạn nam đó là bạn của mình."], ["Are they your friends?", "Họ có phải là bạn của bạn không?", "Em thấy một nhóm bạn mới đang cùng chơi."], ["They're my classmates.", "Họ là bạn cùng lớp của mình.", "Em giới thiệu nhóm bạn học cùng lớp."]],
  },
  {
    slug: "stand-up", title: "Stand up!", theme: "Chỉ dẫn trong lớp", description: "Hiểu và làm theo các lời chỉ dẫn thường dùng trong lớp học.",
    words: [["stand up", "đứng lên"], ["sit down", "ngồi xuống"], ["open", "mở ra"], ["close", "đóng lại"], ["come in", "đi vào"], ["go out", "đi ra"], ["look", "nhìn"], ["put your hand up", "giơ tay lên"], ["answer", "trả lời"], ["say it aloud", "nói to lên"], ["repeat after me", "nhắc lại theo cô"], ["speak", "nói"], ["write", "viết"], ["be quiet", "giữ trật tự"], ["come here", "lại đây"], ["talk to your friend", "nói chuyện với bạn"]],
    sentences: [["Stand up, please.", "Hãy đứng lên.", "Cô giáo muốn cả lớp đứng dậy."], ["Open your book, please.", "Hãy mở sách ra.", "Cô giáo bắt đầu bài học mới trong sách."], ["May I come in?", "Em có thể vào lớp không ạ?", "Em đến cửa lớp và xin phép vào."], ["Yes, you can.", "Được, em vào đi.", "Cô giáo đồng ý cho học sinh vào lớp."]],
  },
  {
    slug: "thats-my-school", title: "That's my school.", theme: "Trường học", description: "Giới thiệu trường và miêu tả các khu vực trong trường.",
    words: [["school", "trường học"], ["room", "căn phòng"], ["classroom", "lớp học"], ["library", "thư viện"], ["gym", "phòng thể chất"], ["playground", "sân chơi"], ["big", "to"], ["large", "rộng lớn"], ["small", "nhỏ"], ["new", "mới"], ["old", "cũ"], ["beautiful", "đẹp"], ["nice", "xinh đẹp"]],
    sentences: [["That's my school.", "Đó là trường của mình.", "Em đứng ngoài cổng và chỉ cho bạn ngôi trường."], ["Is your school big?", "Trường của bạn có lớn không?", "Bạn muốn biết trường của em lớn hay nhỏ."], ["Yes, it is.", "Có, trường mình lớn.", "Em trả lời về ngôi trường rộng lớn."], ["The library is new.", "Thư viện còn mới.", "Em giới thiệu thư viện mới của trường."]],
  },
  {
    slug: "this-is-my-pen", title: "This is my pen.", theme: "Đồ dùng học tập", description: "Gọi tên, giới thiệu và phân biệt đồ dùng học tập.",
    words: [["pen", "bút mực"], ["pencil", "bút chì"], ["rubber", "cục tẩy"], ["pencil sharpener", "gọt bút chì"], ["pencil case", "hộp bút"], ["school bag", "cặp sách"], ["notebook", "vở"], ["ruler", "thước kẻ"], ["short", "ngắn"], ["long", "dài"], ["these", "những cái này"], ["those", "những cái kia"]],
    sentences: [["This is my pen.", "Đây là bút của mình.", "Em cầm chiếc bút và giới thiệu với bạn."], ["These are my pencils.", "Đây là những chiếc bút chì của mình.", "Em chỉ vào nhiều bút chì trên bàn."], ["Those are my notebooks.", "Kia là những quyển vở của mình.", "Em chỉ những quyển vở ở phía xa."], ["Is your ruler long?", "Thước của bạn có dài không?", "Em so sánh hai chiếc thước trên bàn."]],
  },
  {
    slug: "what-color-is-it", title: "What color is it?", theme: "Màu sắc và lớp học", description: "Hỏi màu của đồ dùng và gọi tên đồ vật trong lớp.",
    words: [["color", "màu sắc"], ["red", "màu đỏ"], ["yellow", "màu vàng"], ["blue", "màu xanh dương"], ["purple", "màu tím"], ["brown", "màu nâu"], ["pink", "màu hồng"], ["orange", "màu cam"], ["green", "màu xanh lá"], ["black", "màu đen"], ["white", "màu trắng"], ["table", "cái bàn"], ["desk", "bàn học"], ["chair", "cái ghế"], ["box", "cái hộp"], ["bookcase", "giá sách"]],
    sentences: [["What color is it?", "Nó có màu gì?", "Em nhìn thấy một chiếc hộp nhưng chưa biết màu."], ["It's red.", "Nó màu đỏ.", "Em nhận ra đồ vật có màu đỏ."], ["What color are your pencils?", "Những chiếc bút chì của bạn màu gì?", "Em thấy nhiều bút chì màu trên bàn bạn."], ["They're blue.", "Chúng màu xanh dương.", "Em trả lời màu của những chiếc bút chì."]],
  },
  {
    slug: "break-time", title: "What do you do at break time?", theme: "Giờ giải lao", description: "Nói về hoạt động và trò chơi yêu thích trong giờ nghỉ.",
    words: [["break time", "giờ giải lao"], ["play", "chơi"], ["football", "bóng đá"], ["badminton", "cầu lông"], ["basketball", "bóng rổ"], ["table tennis", "bóng bàn"], ["like", "thích"], ["chess", "cờ vua"], ["skating", "trượt patin"], ["hide-and-seek", "trốn tìm"], ["blind man's bluff", "bịt mắt bắt dê"]],
    sentences: [["What do you do at break time?", "Bạn làm gì vào giờ giải lao?", "Em muốn biết bạn thường chơi gì khi ra chơi."], ["I play football.", "Mình chơi bóng đá.", "Em đang đá bóng với bạn ở sân trường."], ["Do you like badminton?", "Bạn có thích cầu lông không?", "Em muốn rủ bạn chơi cầu lông."], ["Yes, I do.", "Có, mình thích.", "Bạn hỏi đúng môn thể thao em yêu thích."]],
  },
  {
    slug: "this-is-my-family", title: "This is my family.", theme: "Gia đình", description: "Giới thiệu, hỏi tuổi và gọi tên các thành viên trong gia đình.",
    words: [["mother", "mẹ"], ["father", "bố"], ["parents", "bố mẹ"], ["family", "gia đình"], ["photo", "bức ảnh"], ["grandmother", "bà"], ["grandfather", "ông"], ["daughter", "con gái"], ["son", "con trai"], ["sister", "chị hoặc em gái"], ["brother", "anh hoặc em trai"], ["woman", "người phụ nữ"], ["man", "người đàn ông"], ["young", "trẻ"], ["old", "già"], ["happy", "vui vẻ"]],
    sentences: [["This is my family.", "Đây là gia đình của mình.", "Em cho bạn xem một bức ảnh gia đình."], ["Who's that man?", "Người đàn ông kia là ai?", "Em chỉ vào một người đàn ông trong ảnh."], ["He's my father.", "Đó là bố của mình.", "Em giới thiệu bố trong ảnh gia đình."], ["How old is your grandmother?", "Bà của bạn bao nhiêu tuổi?", "Em muốn hỏi tuổi của bà bạn."]],
  },
  {
    slug: "this-is-my-house", title: "This is my house.", theme: "Ngôi nhà", description: "Giới thiệu các phòng và khu vực xung quanh ngôi nhà.",
    words: [["house", "ngôi nhà"], ["living room", "phòng khách"], ["bathroom", "phòng tắm"], ["bedroom", "phòng ngủ"], ["dining room", "phòng ăn"], ["gate", "cổng"], ["yard", "sân"], ["garage", "nhà để xe"], ["kitchen", "nhà bếp"], ["over there", "ở đằng kia"], ["fence", "hàng rào"], ["garden", "vườn"], ["tree", "cây"], ["pond", "ao"]],
    sentences: [["This is my house.", "Đây là ngôi nhà của mình.", "Em mời một người bạn tới nhà lần đầu."], ["There's a garden over there.", "Có một khu vườn ở đằng kia.", "Em chỉ khu vườn phía sau nhà."], ["Is there a pond?", "Có cái ao nào không?", "Bạn nhìn quanh sân và hỏi về cái ao."], ["Yes, there is.", "Có.", "Em xác nhận nhà mình có một cái ao."]],
  },
  {
    slug: "wheres-my-book", title: "Where's my book?", theme: "Vị trí đồ vật", description: "Hỏi và trả lời vị trí của đồ vật trong nhà.",
    words: [["ball", "quả bóng"], ["bed", "cái giường"], ["chair", "cái ghế"], ["coat", "áo khoác"], ["picture", "bức tranh"], ["poster", "áp phích"], ["here", "ở đây"], ["there", "ở đó"], ["on", "ở trên"], ["under", "ở dưới"], ["in front of", "ở phía trước"], ["behind", "ở phía sau"], ["next to", "ở bên cạnh"], ["near", "ở gần"]],
    sentences: [["Where's my book?", "Sách của mình đâu rồi?", "Em tìm quyển sách trong phòng ngủ."], ["It's on the bed.", "Nó ở trên giường.", "Bạn nhìn thấy sách nằm trên giường."], ["Where are the posters?", "Những tấm áp phích ở đâu?", "Em muốn tìm nhiều áp phích trong phòng."], ["They're behind the door.", "Chúng ở sau cánh cửa.", "Bạn phát hiện các áp phích sau cửa."]],
  },
  {
    slug: "posters-in-the-room", title: "Are there any posters in the room?", theme: "Đồ vật trong phòng", description: "Hỏi sự tồn tại và số lượng đồ vật trong một căn phòng.",
    words: [["TV", "ti vi"], ["sofa", "ghế sô-pha"], ["fan", "quạt"], ["map", "bản đồ"], ["cupboard", "tủ đựng đồ"], ["wardrobe", "tủ quần áo"], ["cup", "cái cốc"], ["lamp", "đèn"], ["door", "cửa ra vào"], ["window", "cửa sổ"], ["mirror", "gương"], ["how many", "bao nhiêu"], ["count", "đếm"]],
    sentences: [["Are there any posters in the room?", "Có tấm áp phích nào trong phòng không?", "Em bước vào phòng và tìm các tấm áp phích."], ["Yes, there are.", "Có.", "Em nhìn thấy nhiều tấm áp phích trên tường."], ["How many fans are there?", "Có bao nhiêu cái quạt?", "Em muốn biết số quạt trong lớp."], ["There are two fans.", "Có hai cái quạt.", "Em đếm được hai chiếc quạt."]],
  },
  {
    slug: "do-you-have-any-toys", title: "Do you have any toys?", theme: "Đồ chơi", description: "Hỏi xem bạn hoặc người khác có món đồ chơi nào.",
    words: [["car", "ô tô đồ chơi"], ["plane", "máy bay đồ chơi"], ["ship", "tàu thủy đồ chơi"], ["robot", "rô-bốt"], ["puzzle", "trò xếp hình"], ["yo-yo", "con quay yo-yo"], ["doll", "búp bê"], ["teddy bear", "gấu bông"], ["kite", "diều"], ["many", "nhiều"]],
    sentences: [["Do you have any toys?", "Bạn có món đồ chơi nào không?", "Em muốn biết bạn có đồ chơi ở nhà không."], ["Yes, I have a robot.", "Có, mình có một rô-bốt.", "Em cho bạn xem món đồ chơi rô-bốt."], ["Does he have a kite?", "Bạn nam ấy có diều không?", "Em thấy bạn nam chuẩn bị ra công viên."], ["No, he doesn't.", "Không, bạn ấy không có.", "Bạn nam không mang theo chiếc diều nào."]],
  },
  {
    slug: "do-you-have-any-pets", title: "Do you have any pets?", theme: "Thú cưng", description: "Gọi tên thú cưng và hỏi vị trí của chúng.",
    words: [["pet", "thú cưng"], ["parrot", "con vẹt"], ["rabbit", "con thỏ"], ["goldfish", "cá vàng"], ["tortoise", "rùa cạn"], ["cute", "dễ thương"], ["keep", "nuôi, giữ"], ["cage", "lồng"], ["fish tank", "bể cá"], ["flower pot", "chậu hoa"]],
    sentences: [["Do you have any pets?", "Bạn có con thú cưng nào không?", "Em muốn biết bạn có nuôi thú cưng không."], ["Yes, I have a rabbit.", "Có, mình có một con thỏ.", "Em giới thiệu chú thỏ cưng của mình."], ["Where's your parrot?", "Con vẹt của bạn ở đâu?", "Em nhìn quanh nhưng chưa thấy con vẹt."], ["It's in the cage.", "Nó ở trong lồng.", "Bạn chỉ con vẹt đang ở trong chiếc lồng."]],
  },
  {
    slug: "what-toys-do-you-like", title: "What toys do you like?", theme: "Sở thích đồ chơi", description: "Hỏi món đồ chơi yêu thích và so sánh giống, khác nhau.",
    words: [["playroom", "phòng chơi"], ["truck", "xe tải đồ chơi"], ["same", "giống nhau"], ["different", "khác nhau"]],
    sentences: [["What toys do you like?", "Bạn thích món đồ chơi nào?", "Em muốn biết món đồ chơi bạn thích nhất."], ["I like trucks.", "Mình thích xe tải đồ chơi.", "Em đang chơi với những chiếc xe tải."], ["Are they the same?", "Chúng có giống nhau không?", "Em đặt hai món đồ chơi cạnh nhau để so sánh."], ["No, they're different.", "Không, chúng khác nhau.", "Hai chiếc xe có hình dáng và màu khác nhau."]],
  },
  {
    slug: "what-are-you-doing", title: "What are you doing?", theme: "Hoạt động đang diễn ra", description: "Hỏi một người đang ở đâu và đang làm gì.",
    words: [["read a book", "đọc sách"], ["cook", "nấu ăn"], ["sing", "hát"], ["dance", "nhảy múa"], ["clean the floor", "lau sàn"], ["listen to music", "nghe nhạc"], ["draw a picture", "vẽ tranh"], ["play the piano", "chơi đàn piano"], ["watch TV", "xem ti vi"], ["do homework", "làm bài tập về nhà"]],
    sentences: [["What are you doing?", "Bạn đang làm gì vậy?", "Em thấy bạn đang bận và muốn hỏi."], ["I'm doing my homework.", "Mình đang làm bài tập.", "Em đang ngồi học tại bàn."], ["Where is she?", "Bạn nữ ấy đang ở đâu?", "Em tìm một bạn nữ trong nhà."], ["She's in the living room watching TV.", "Bạn ấy đang xem ti vi trong phòng khách.", "Bạn nữ ngồi trên ghế và xem ti vi."]],
  },
  {
    slug: "theyre-in-the-park", title: "They're in the park.", theme: "Công viên và thời tiết", description: "Nói về hoạt động ngoài trời và miêu tả thời tiết.",
    words: [["park", "công viên"], ["cycle", "đạp xe"], ["fly kites", "thả diều"], ["skate", "trượt patin"], ["skip", "nhảy dây"], ["today", "hôm nay"], ["weather", "thời tiết"], ["great", "tuyệt vời"], ["fine", "đẹp, tốt"], ["bad", "xấu, tệ"], ["sunny", "nắng"], ["rainy", "mưa"], ["cloudy", "nhiều mây"], ["windy", "nhiều gió"], ["stormy", "có bão"], ["snowy", "có tuyết"]],
    sentences: [["They're in the park.", "Họ đang ở trong công viên.", "Em nhìn thấy các bạn đang chơi ngoài công viên."], ["What are they doing?", "Họ đang làm gì?", "Em muốn biết nhóm bạn đang chơi trò gì."], ["They're flying kites.", "Họ đang thả diều.", "Những chiếc diều đang bay trên trời."], ["What's the weather like today?", "Hôm nay thời tiết thế nào?", "Em nhìn ra cửa sổ và hỏi về thời tiết."]],
  },
  {
    slug: "wheres-sa-pa", title: "Where's Sa Pa?", theme: "Địa điểm và khoảng cách", description: "Hỏi vị trí và khoảng cách của những địa danh Việt Nam.",
    words: [["city", "thành phố"], ["island", "hòn đảo"], ["north", "miền Bắc"], ["south", "miền Nam"], ["central", "miền Trung"], ["bay", "vịnh"], ["water puppet theatre", "nhà hát múa rối nước"], ["near", "gần"], ["far", "xa"]],
    sentences: [["Where's Sa Pa?", "Sa Pa ở đâu?", "Em nhìn bản đồ Việt Nam và tìm Sa Pa."], ["It's in the north of Vietnam.", "Nơi đó ở miền Bắc Việt Nam.", "Em chỉ vị trí Sa Pa trên bản đồ."], ["Is Ha Long Bay near Ha Noi?", "Vịnh Hạ Long có gần Hà Nội không?", "Em so sánh vị trí hai địa danh trên bản đồ."], ["No, it's far from here.", "Không, nơi đó xa đây.", "Địa điểm em muốn tới còn ở khá xa."]],
  },
];

export function gradeThreeBoardUrl(slug: string) {
  return `/lesson-assets/grade-three/${slug}.webp`;
}

export function buildGradeThreeLessons(unit: GradeThreeUnitSeed): GradeThreeLessonSeed[] {
  const boardUrl = gradeThreeBoardUrl(unit.slug);
  const sharedSprite = { spriteColumns: 5, spriteRows: 4 };
  const wordActivities: ActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh, nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "VISUAL_GUESS", prompt: "Tranh này mô tả từ tiếng Anh nào?", imageUrl: boardUrl, imageAlt: `Tranh minh họa ${meaning}`, spriteIndex: index, ...sharedSprite, audioText: word, front: word, back: meaning },
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
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu ngắn trong tình huống gần gũi với học sinh Lớp 3.", activities: sentenceActivities },
  ];
}
