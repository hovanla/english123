import { ActivityType } from "@prisma/client";

type ActivitySeed = { type: ActivityType; title: string; instruction: string; order: number; payload: Record<string, unknown> };
export type GradeSixLessonSeed = { slug: string; title: string; description: string; activities: ActivitySeed[] };
export type GradeSixUnitSeed = {
  slug: string; title: string; theme: string; description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeSixUnits: GradeSixUnitSeed[] = [
  {
    slug: "greetings", title: "Greetings", theme: "Chào hỏi và giới thiệu", description: "Chào hỏi, giới thiệu bản thân và hỏi thăm sức khỏe.",
    words: [["greeting", "lời chào"], ["hello", "xin chào"], ["good morning", "chào buổi sáng"], ["good afternoon", "chào buổi chiều"], ["good evening", "chào buổi tối"], ["goodbye", "tạm biệt"], ["name", "tên"], ["age", "tuổi"], ["fine", "khỏe"], ["thank you", "cảm ơn"], ["classmate", "bạn cùng lớp"], ["introduce", "giới thiệu"]],
    sentences: [["Good morning. How are you?", "Chào buổi sáng. Bạn khỏe không?", "Em gặp bạn ở cổng trường vào buổi sáng."], ["I'm fine, thank you.", "Mình khỏe, cảm ơn bạn.", "Em đáp lại lời hỏi thăm của bạn."], ["What's your name?", "Bạn tên là gì?", "Em làm quen với một bạn mới."], ["My name is Minh.", "Mình tên là Minh.", "Em tự giới thiệu tên của mình."]],
  },
  {
    slug: "at-school", title: "At School", theme: "Trường học và lớp học", description: "Gọi tên đồ dùng, thực hiện hướng dẫn và giao tiếp trong lớp.",
    words: [["school", "trường học"], ["classroom", "lớp học"], ["teacher", "giáo viên"], ["student", "học sinh"], ["desk", "bàn học"], ["board", "bảng"], ["book", "sách"], ["notebook", "vở"], ["ruler", "thước"], ["eraser", "tẩy"], ["open", "mở"], ["close", "đóng"], ["stand up", "đứng lên"], ["sit down", "ngồi xuống"]],
    sentences: [["Is this your school?", "Đây có phải trường của bạn không?", "Bạn chỉ vào một ngôi trường và hỏi em."], ["Yes, it is.", "Đúng vậy.", "Em xác nhận đó là trường của mình."], ["Please open your book.", "Hãy mở sách của em.", "Giáo viên bắt đầu bài học mới."], ["May I come in?", "Em có thể vào lớp không ạ?", "Em đến lớp muộn và xin phép lịch sự."]],
  },
  {
    slug: "at-home", title: "At Home", theme: "Gia đình và ngôi nhà", description: "Giới thiệu thành viên gia đình, căn phòng và đồ vật trong nhà.",
    words: [["family", "gia đình"], ["father", "bố"], ["mother", "mẹ"], ["brother", "anh/em trai"], ["sister", "chị/em gái"], ["living room", "phòng khách"], ["bedroom", "phòng ngủ"], ["kitchen", "nhà bếp"], ["bathroom", "phòng tắm"], ["table", "bàn"], ["chair", "ghế"], ["sofa", "ghế sofa"], ["lamp", "đèn"], ["television", "ti vi"]],
    sentences: [["Who is this?", "Đây là ai?", "Bạn nhìn ảnh gia đình và hỏi em."], ["This is my sister.", "Đây là em gái mình.", "Em giới thiệu một người trong ảnh."], ["How many rooms are there?", "Có bao nhiêu phòng?", "Em hỏi về ngôi nhà mới của bạn."], ["There are four rooms.", "Có bốn phòng.", "Bạn đếm và trả lời số phòng."]],
  },
  {
    slug: "big-or-small", title: "Big or Small?", theme: "Trường lớp và kích thước", description: "Miêu tả quy mô trường, vị trí và số lượng học sinh.",
    words: [["big", "lớn"], ["small", "nhỏ"], ["old", "cũ"], ["new", "mới"], ["city", "thành phố"], ["country", "nông thôn"], ["floor", "tầng"], ["grade", "khối lớp"], ["class", "lớp"], ["school yard", "sân trường"], ["hundred", "một trăm"], ["thousand", "một nghìn"]],
    sentences: [["Is your school big?", "Trường bạn có lớn không?", "Em hỏi về quy mô trường của bạn."], ["No, it's small.", "Không, trường mình nhỏ.", "Bạn miêu tả ngôi trường nông thôn."], ["Which grade are you in?", "Bạn học khối mấy?", "Em làm quen với học sinh ở trường mới."], ["I'm in grade six.", "Mình học lớp 6.", "Em nói khối lớp của mình."]],
  },
  {
    slug: "things-i-do", title: "Things I Do", theme: "Hoạt động hằng ngày", description: "Nói giờ giấc và trình tự các hoạt động thường ngày.",
    words: [["get up", "thức dậy"], ["get dressed", "mặc quần áo"], ["brush teeth", "đánh răng"], ["wash face", "rửa mặt"], ["have breakfast", "ăn sáng"], ["go to school", "đi học"], ["have lunch", "ăn trưa"], ["do homework", "làm bài tập"], ["play games", "chơi trò chơi"], ["watch TV", "xem ti vi"], ["go to bed", "đi ngủ"], ["every day", "mỗi ngày"]],
    sentences: [["What time do you get up?", "Bạn thức dậy lúc mấy giờ?", "Em hỏi giờ bắt đầu ngày mới của bạn."], ["I get up at six.", "Mình thức dậy lúc sáu giờ.", "Bạn nhìn đồng hồ và trả lời."], ["What do you do after school?", "Bạn làm gì sau giờ học?", "Em hỏi thói quen buổi chiều."], ["I do my homework.", "Mình làm bài tập.", "Bạn ngồi vào bàn học sau khi về nhà."]],
  },
  {
    slug: "places", title: "Places", theme: "Địa điểm quanh trường", description: "Gọi tên địa điểm và miêu tả vị trí bằng giới từ.",
    words: [["restaurant", "nhà hàng"], ["bookstore", "hiệu sách"], ["temple", "đền"], ["hospital", "bệnh viện"], ["factory", "nhà máy"], ["museum", "bảo tàng"], ["stadium", "sân vận động"], ["park", "công viên"], ["near", "gần"], ["next to", "bên cạnh"], ["between", "ở giữa"], ["opposite", "đối diện"], ["behind", "phía sau"], ["in front of", "phía trước"]],
    sentences: [["What's near your school?", "Gần trường bạn có gì?", "Em hỏi về khu vực quanh trường."], ["There's a bookstore nearby.", "Có một hiệu sách gần đó.", "Bạn chỉ hiệu sách cạnh trường."], ["Where is the hospital?", "Bệnh viện ở đâu?", "Em cần tìm địa điểm trên phố."], ["It's opposite the park.", "Nó ở đối diện công viên.", "Người dân chỉ vị trí bệnh viện."]],
  },
  {
    slug: "your-house", title: "Your House", theme: "Nhà ở và cảnh vật", description: "Miêu tả ngôi nhà, khu vực xung quanh và hỏi sự tồn tại.",
    words: [["house", "ngôi nhà"], ["apartment", "căn hộ"], ["garden", "khu vườn"], ["yard", "sân"], ["flower", "hoa"], ["tree", "cây"], ["lake", "hồ"], ["river", "sông"], ["rice paddy", "cánh đồng lúa"], ["mountain", "núi"], ["well", "giếng"], ["beautiful", "đẹp"], ["quiet", "yên tĩnh"], ["noisy", "ồn ào"]],
    sentences: [["Where do you live?", "Bạn sống ở đâu?", "Em hỏi nơi ở của người bạn mới."], ["I live in a house near a lake.", "Mình sống trong ngôi nhà gần hồ.", "Bạn miêu tả vị trí ngôi nhà."], ["Is there a garden?", "Có khu vườn không?", "Em hỏi về khoảng sân cạnh nhà."], ["Yes, there are many flowers.", "Có, trong đó có nhiều hoa.", "Bạn miêu tả khu vườn đầy màu sắc."]],
  },
  {
    slug: "out-and-about", title: "Out and About", theme: "Giao thông và di chuyển", description: "Nói phương tiện, hành động đang diễn ra và quy tắc giao thông.",
    words: [["car", "ô tô"], ["bus", "xe buýt"], ["truck", "xe tải"], ["motorbike", "xe máy"], ["bicycle", "xe đạp"], ["train", "tàu hỏa"], ["plane", "máy bay"], ["walk", "đi bộ"], ["ride", "đi/cưỡi"], ["drive", "lái xe"], ["wait", "chờ"], ["traffic light", "đèn giao thông"], ["intersection", "ngã tư"], ["road sign", "biển báo"]],
    sentences: [["How do you go to school?", "Bạn đi học bằng cách nào?", "Em hỏi phương tiện đi học của bạn."], ["I go by bus.", "Mình đi bằng xe buýt.", "Bạn đứng tại điểm chờ xe buýt."], ["What is he doing?", "Bạn ấy đang làm gì?", "Em nhìn thấy một bạn ở ngã tư."], ["He's waiting for the green light.", "Bạn ấy đang chờ đèn xanh.", "Bạn tuân thủ tín hiệu giao thông."]],
  },
  {
    slug: "the-body", title: "The Body", theme: "Cơ thể và ngoại hình", description: "Gọi tên bộ phận cơ thể và miêu tả ngoại hình.",
    words: [["head", "đầu"], ["hair", "tóc"], ["face", "khuôn mặt"], ["eye", "mắt"], ["ear", "tai"], ["nose", "mũi"], ["mouth", "miệng"], ["tooth", "răng"], ["shoulder", "vai"], ["arm", "cánh tay"], ["hand", "bàn tay"], ["finger", "ngón tay"], ["leg", "chân"], ["foot", "bàn chân"], ["tall", "cao"], ["short", "thấp"], ["thin", "gầy"], ["strong", "khỏe"]],
    sentences: [["What does she look like?", "Bạn ấy trông thế nào?", "Em hỏi ngoại hình của một người chưa gặp."], ["She has long black hair.", "Bạn ấy có mái tóc đen dài.", "Bạn miêu tả mái tóc của bạn nữ."], ["Is he tall or short?", "Bạn ấy cao hay thấp?", "Em so sánh chiều cao của bạn nam."], ["He's tall and strong.", "Bạn ấy cao và khỏe.", "Bạn miêu tả một vận động viên trẻ."]],
  },
  {
    slug: "staying-healthy", title: "Staying Healthy", theme: "Cảm giác và sức khỏe", description: "Nói cảm giác cơ thể, nhu cầu và lựa chọn để khỏe mạnh.",
    words: [["hungry", "đói"], ["thirsty", "khát"], ["full", "no"], ["hot", "nóng"], ["cold", "lạnh"], ["tired", "mệt"], ["feel", "cảm thấy"], ["water", "nước"], ["juice", "nước ép"], ["rest", "nghỉ ngơi"], ["exercise", "tập thể dục"], ["healthy", "khỏe mạnh"]],
    sentences: [["How do you feel?", "Bạn cảm thấy thế nào?", "Em thấy bạn vừa tập thể thao xong."], ["I'm hot and thirsty.", "Mình nóng và khát.", "Bạn nói cảm giác sau khi chạy."], ["What would you like?", "Bạn muốn dùng gì?", "Em mời bạn một thức uống."], ["I'd like some water.", "Mình muốn một ít nước.", "Bạn chọn đồ uống lành mạnh."]],
  },
  {
    slug: "what-do-you-eat", title: "What Do You Eat?", theme: "Đồ ăn và thức uống", description: "Gọi món, nói bữa ăn và hỏi giá thực phẩm.",
    words: [["breakfast", "bữa sáng"], ["lunch", "bữa trưa"], ["dinner", "bữa tối"], ["rice", "cơm"], ["noodles", "mì"], ["bread", "bánh mì"], ["meat", "thịt"], ["fish", "cá"], ["chicken", "thịt gà"], ["vegetable", "rau"], ["fruit", "trái cây"], ["milk", "sữa"], ["bottle", "chai"], ["packet", "gói"], ["kilo", "ki-lô-gam"], ["menu", "thực đơn"]],
    sentences: [["What do you have for breakfast?", "Bạn ăn gì vào bữa sáng?", "Em hỏi về bữa ăn đầu ngày."], ["I have bread and milk.", "Mình ăn bánh mì và uống sữa.", "Bạn kể bữa sáng đơn giản."], ["Can I help you?", "Tôi có thể giúp gì cho bạn?", "Nhân viên chào khách tại quầy đồ ăn."], ["I'd like a kilo of rice.", "Tôi muốn mua một ki-lô-gam gạo.", "Em nói số lượng thực phẩm cần mua."]],
  },
  {
    slug: "sports-and-pastimes", title: "Sports and Pastimes", theme: "Thể thao và giải trí", description: "Nói môn thể thao, sở thích và tần suất luyện tập.",
    words: [["soccer", "bóng đá"], ["badminton", "cầu lông"], ["volleyball", "bóng chuyền"], ["basketball", "bóng rổ"], ["tennis", "quần vợt"], ["swimming", "bơi lội"], ["jogging", "chạy bộ"], ["aerobics", "thể dục nhịp điệu"], ["fishing", "câu cá"], ["camping", "cắm trại"], ["read", "đọc"], ["listen to music", "nghe nhạc"], ["often", "thường"], ["sometimes", "thỉnh thoảng"]],
    sentences: [["Which sports do you play?", "Bạn chơi môn thể thao nào?", "Em hỏi sở thích vận động của bạn."], ["I play badminton.", "Mình chơi cầu lông.", "Bạn cầm vợt và trả lời."], ["How often do you go jogging?", "Bạn chạy bộ thường xuyên thế nào?", "Em hỏi tần suất luyện tập."], ["I go jogging three times a week.", "Mình chạy bộ ba lần một tuần.", "Bạn nói lịch tập thể thao."]],
  },
  {
    slug: "activities-and-seasons", title: "Activities and Seasons", theme: "Mùa, thời tiết và hoạt động", description: "Nói thời tiết theo mùa và lựa chọn hoạt động phù hợp.",
    words: [["spring", "mùa xuân"], ["summer", "mùa hè"], ["fall", "mùa thu"], ["winter", "mùa đông"], ["warm", "ấm"], ["hot", "nóng"], ["cool", "mát"], ["cold", "lạnh"], ["weather", "thời tiết"], ["go swimming", "đi bơi"], ["fly a kite", "thả diều"], ["go fishing", "đi câu"], ["play basketball", "chơi bóng rổ"], ["go skiing", "đi trượt tuyết"]],
    sentences: [["What's the weather like in summer?", "Mùa hè thời tiết thế nào?", "Em hỏi đặc điểm của một mùa."], ["It's usually hot.", "Trời thường nóng.", "Bạn miêu tả thời tiết mùa hè."], ["What do you do when it's warm?", "Bạn làm gì khi trời ấm?", "Em hỏi hoạt động phù hợp thời tiết."], ["I often fly a kite.", "Mình thường thả diều.", "Bạn chơi ngoài trời trong ngày có gió."]],
  },
  {
    slug: "making-plans", title: "Making Plans", theme: "Kế hoạch và kỳ nghỉ", description: "Rủ bạn, lập kế hoạch và nói dự định trong kỳ nghỉ.",
    words: [["plan", "kế hoạch"], ["vacation", "kỳ nghỉ"], ["visit", "thăm"], ["stay", "ở lại"], ["travel", "du lịch"], ["beach", "bãi biển"], ["citadel", "thành cổ"], ["camp", "cắm trại"], ["camera", "máy ảnh"], ["tent", "lều"], ["tomorrow", "ngày mai"], ["weekend", "cuối tuần"], ["tonight", "tối nay"]],
    sentences: [["What are you going to do?", "Bạn dự định làm gì?", "Em hỏi kế hoạch kỳ nghỉ của bạn."], ["I'm going to visit Hue.", "Mình sẽ đến thăm Huế.", "Bạn nói điểm đến đã chọn."], ["How long are you going to stay?", "Bạn sẽ ở lại bao lâu?", "Em hỏi thời gian chuyến đi."], ["I'm going to stay for three days.", "Mình sẽ ở lại ba ngày.", "Bạn trả lời thời lượng kỳ nghỉ."]],
  },
  {
    slug: "countries", title: "Countries", theme: "Quốc gia và địa lý", description: "Nói quốc gia, quốc tịch, ngôn ngữ và đặc điểm địa lý.",
    words: [["country", "quốc gia"], ["nationality", "quốc tịch"], ["language", "ngôn ngữ"], ["Viet Nam", "Việt Nam"], ["Japan", "Nhật Bản"], ["China", "Trung Quốc"], ["France", "Pháp"], ["Canada", "Canada"], ["Australia", "Úc"], ["British", "người Anh"], ["Japanese", "người Nhật"], ["Vietnamese", "người Việt"], ["mountain", "núi"], ["river", "sông"], ["building", "tòa nhà"], ["world", "thế giới"]],
    sentences: [["Where are you from?", "Bạn đến từ đâu?", "Em gặp một học sinh quốc tế."], ["I'm from Japan.", "Mình đến từ Nhật Bản.", "Bạn giới thiệu quốc gia của mình."], ["Which language do you speak?", "Bạn nói ngôn ngữ nào?", "Em hỏi ngôn ngữ bạn sử dụng."], ["I speak Japanese and English.", "Mình nói tiếng Nhật và tiếng Anh.", "Bạn kể hai ngôn ngữ mình biết."]],
  },
  {
    slug: "man-and-environment", title: "Man and Environment", theme: "Con người và môi trường", description: "Nhận biết tài nguyên, vấn đề môi trường và hành động bảo vệ thiên nhiên.",
    words: [["environment", "môi trường"], ["forest", "rừng"], ["tree", "cây"], ["animal", "động vật"], ["water", "nước"], ["air", "không khí"], ["land", "đất"], ["trash", "rác"], ["pollution", "ô nhiễm"], ["recycle", "tái chế"], ["reuse", "tái sử dụng"], ["save", "tiết kiệm"], ["protect", "bảo vệ"], ["plant", "trồng"], ["destroy", "phá hủy"], ["wildlife", "động vật hoang dã"]],
    sentences: [["Why are forests important?", "Tại sao rừng quan trọng?", "Em thảo luận về vai trò của thiên nhiên."], ["They give animals a home.", "Rừng cho động vật nơi sinh sống.", "Bạn giải thích một lợi ích của rừng."], ["What can we do to help?", "Chúng ta có thể làm gì để giúp?", "Em hỏi hành động bảo vệ môi trường."], ["We can plant trees and recycle.", "Chúng ta có thể trồng cây và tái chế.", "Bạn đề xuất hai việc thiết thực."]],
  },
];

export function gradeSixBoardUrl(slug: string) {
  return `/lesson-assets/grade-six/${slug}.webp`;
}

export function buildGradeSixLessons(unit: GradeSixUnitSeed): GradeSixLessonSeed[] {
  const boardUrl = gradeSixBoardUrl(unit.slug);
  const sharedSprite = { spriteColumns: 5, spriteRows: 5 };
  const wordActivities: ActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh, nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "VISUAL_GUESS", prompt: "Tranh này mô tả từ hoặc cụm từ tiếng Anh nào?", imageUrl: boardUrl, imageAlt: `Tranh minh họa ${meaning}`, spriteIndex: index, ...sharedSprite, audioText: word, front: word, back: meaning },
  }));
  const groups = Array.from({ length: Math.ceil(unit.words.length / 8) }, (_, index) => unit.words.slice(index * 8, index * 8 + 8));
  if (groups.length > 1 && groups.at(-1)?.length === 1) groups.at(-1)!.unshift(groups.at(-2)!.pop()!);
  for (const [index, group] of groups.entries()) wordActivities.push({
    type: ActivityType.MATCHING,
    title: groups.length > 1 ? `Ghép từ với nghĩa · phần ${index + 1}` : "Ghép từ với nghĩa",
    instruction: `Ghép đúng ${group.length} từ tiếng Anh với nghĩa tiếng Việt.`,
    order: unit.words.length + index + 1,
    payload: { prompt: `Ôn từ vựng chủ đề ${unit.theme}.`, pairs: group.map(([left, right]) => ({ left, right })) },
  });
  const sentenceActivities: ActivitySeed[] = unit.sentences.map(([target, translation, cue], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Mẫu câu ${index + 1}: Nghe và đoán`,
    instruction: "Nhìn tình huống, bấm nghe và tự đoán câu tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "AUDIO_GUESS", prompt: cue, scenario: cue, imageUrl: boardUrl, imageAlt: `Tranh tình huống cho câu ${target}`, spriteIndex: unit.words.length + index, ...sharedSprite, audioText: target, front: target, back: translation },
  }));
  return [
    { slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Nhìn tranh, nghe và tự đoán từ vựng cốt lõi của chủ đề.", activities: wordActivities },
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu trong tình huống gần gũi với học sinh Lớp 6.", activities: sentenceActivities },
  ];
}
