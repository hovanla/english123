import { ActivityType } from "@prisma/client";

type GradeOneActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

export type GradeOneLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: GradeOneActivitySeed[];
};

export type GradeOneUnitSeed = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeOneUnits: GradeOneUnitSeed[] = [
  { slug: "hello", title: "Hello", theme: "Xin chào", description: "Hiểu hiệu lệnh trong lớp và hỏi thăm bạn bè.", words: [["listen", "lắng nghe"], ["repeat", "nhắc lại"], ["look", "nhìn"], ["be quiet", "giữ trật tự"]], sentences: [["How are you?", "Bạn có khỏe không?", "Em gặp một người bạn và muốn hỏi thăm bạn."], ["I'm fine, thank you.", "Mình khỏe, cảm ơn bạn.", "Bạn vừa hỏi thăm sức khỏe. Em trả lời lịch sự."], ["I'm good.", "Mình khỏe.", "Em muốn nói ngắn gọn rằng mình đang khỏe."], ["And you?", "Còn bạn thì sao?", "Sau khi trả lời, em muốn hỏi lại người bạn."]] },
  { slug: "family", title: "Family", theme: "Gia đình", description: "Gọi tên và giới thiệu những người thân trong gia đình.", words: [["sister", "chị hoặc em gái"], ["brother", "anh hoặc em trai"], ["baby", "em bé"], ["uncle", "chú, bác hoặc cậu"], ["aunt", "cô, dì hoặc bác gái"]], sentences: [["He is my brother.", "Bạn ấy là anh hoặc em trai của mình.", "Em giới thiệu một bạn nam trong gia đình."], ["She is my sister.", "Bạn ấy là chị hoặc em gái của mình.", "Em giới thiệu một bạn nữ trong gia đình."], ["He is my uncle.", "Đây là chú, bác hoặc cậu của mình.", "Em giới thiệu một người chú trong ảnh gia đình."], ["She is my aunt.", "Đây là cô, dì hoặc bác gái của mình.", "Em giới thiệu một người cô trong ảnh gia đình."]] },
  { slug: "face", title: "Face", theme: "Khuôn mặt", description: "Gọi tên các bộ phận trên đầu và khuôn mặt.", words: [["chin", "cằm"], ["neck", "cổ"], ["cheeks", "má"], ["forehead", "trán"], ["teeth", "răng"]], sentences: [["What's this?", "Đây là gì?", "Em chỉ vào một bộ phận ở gần và hỏi tên."], ["This is my chin.", "Đây là cằm của mình.", "Em chỉ vào cằm của mình."], ["This is my neck.", "Đây là cổ của mình.", "Em chỉ vào cổ của mình."], ["These are my teeth.", "Đây là răng của mình.", "Em mỉm cười và chỉ vào nhiều chiếc răng."]] },
  { slug: "body", title: "Body", theme: "Cơ thể", description: "Nhận biết các bộ phận cơ thể thường gặp.", words: [["shoulders", "vai"], ["fingers", "ngón tay"], ["feet", "bàn chân"], ["toes", "ngón chân"], ["knees", "đầu gối"]], sentences: [["What are these?", "Đây là những gì?", "Em muốn hỏi tên nhiều bộ phận đang được chỉ vào."], ["These are my shoulders.", "Đây là hai vai của mình.", "Em chỉ vào hai vai."], ["These are my fingers.", "Đây là các ngón tay của mình.", "Em giơ hai bàn tay và chỉ vào các ngón."], ["These are my feet.", "Đây là hai bàn chân của mình.", "Em chỉ vào hai bàn chân."]] },
  { slug: "colors", title: "Colors", theme: "Màu sắc", description: "Mở rộng các màu sắc quen thuộc quanh em.", words: [["orange", "màu cam"], ["pink", "màu hồng"], ["purple", "màu tím"], ["white", "màu trắng"], ["black", "màu đen"]], sentences: [["What color is it?", "Nó màu gì?", "Em muốn biết màu của một đồ vật."], ["It's orange.", "Nó màu cam.", "Em nhìn thấy một đồ vật màu cam và trả lời."], ["It's pink.", "Nó màu hồng.", "Em nhìn thấy một đồ vật màu hồng và trả lời."], ["It's black.", "Nó màu đen.", "Em nhìn thấy một đồ vật màu đen và trả lời."]] },
  { slug: "shapes", title: "Shapes", theme: "Hình khối", description: "Nhận biết và mô tả màu sắc của các hình.", words: [["diamond", "hình thoi"], ["heart", "hình trái tim"], ["star", "hình ngôi sao"], ["oval", "hình bầu dục"], ["hexagon", "hình lục giác"]], sentences: [["This is a blue circle.", "Đây là một hình tròn màu xanh.", "Em giới thiệu màu và hình của một khối đồ chơi."], ["This is a red diamond.", "Đây là một hình thoi màu đỏ.", "Em giới thiệu một hình thoi màu đỏ."], ["This is a pink heart.", "Đây là một hình trái tim màu hồng.", "Em giới thiệu một hình trái tim màu hồng."], ["This is a yellow star.", "Đây là một ngôi sao màu vàng.", "Em giới thiệu một ngôi sao màu vàng."]] },
  { slug: "appearance", title: "Appearance", theme: "Ngoại hình", description: "Dùng tính từ đơn giản để miêu tả người.", words: [["tall", "cao"], ["short", "thấp"], ["old", "già hoặc lớn tuổi"], ["young", "trẻ"], ["cute", "dễ thương"]], sentences: [["I'm tall.", "Mình cao.", "Em miêu tả chiều cao của chính mình."], ["I'm short.", "Mình thấp.", "Em miêu tả chiều cao của chính mình."], ["He is old.", "Ông ấy lớn tuổi.", "Em miêu tả một người đàn ông lớn tuổi."], ["She is young.", "Cô ấy trẻ.", "Em miêu tả một người phụ nữ trẻ."]] },
  { slug: "clothes", title: "Clothes", theme: "Quần áo", description: "Gọi tên quần áo và hỏi màu của nhiều đồ vật.", words: [["dress", "váy liền"], ["jumper", "áo len"], ["T-shirt", "áo phông"], ["shorts", "quần đùi"], ["socks", "tất"]], sentences: [["What color are they?", "Chúng có màu gì?", "Em muốn hỏi màu của nhiều món đồ."], ["They're white.", "Chúng màu trắng.", "Em trả lời màu của một đôi tất."], ["My socks are black.", "Tất của mình màu đen.", "Em miêu tả đôi tất của mình."], ["Her dress is pink.", "Váy của bạn ấy màu hồng.", "Em miêu tả chiếc váy của một bạn nữ."]] },
  { slug: "school-things", title: "School Things", theme: "Đồ dùng học tập", description: "Gọi tên và đếm đồ dùng trong cặp sách.", words: [["ruler", "thước kẻ"], ["notebook", "vở"], ["pen", "bút mực"], ["pencil case", "hộp bút"], ["eraser", "cục tẩy"]], sentences: [["How many?", "Có bao nhiêu?", "Em muốn hỏi số lượng đồ dùng trên bàn."], ["There are nine rulers.", "Có chín chiếc thước.", "Em đếm và nói số thước kẻ."], ["I have two notebooks.", "Mình có hai quyển vở.", "Em nói số vở mình đang có."], ["There are three pens.", "Có ba chiếc bút.", "Em đếm ba chiếc bút trên bàn."]] },
  { slug: "classroom", title: "Classroom", theme: "Lớp học", description: "Nhận biết và nói về đồ vật trong lớp.", words: [["bin", "thùng rác"], ["board", "bảng"], ["clock", "đồng hồ"], ["door", "cửa ra vào"], ["window", "cửa sổ"]], sentences: [["There is a board.", "Có một cái bảng.", "Em nhìn quanh lớp và nói về cái bảng."], ["There is a clock.", "Có một chiếc đồng hồ.", "Em nhìn quanh lớp và nói về đồng hồ."], ["There is a door.", "Có một cánh cửa.", "Em nhìn quanh lớp và nói về cửa ra vào."], ["There are two windows.", "Có hai cửa sổ.", "Em đếm và nói số cửa sổ trong lớp."]] },
  { slug: "toys", title: "Toys", theme: "Đồ chơi", description: "Gọi tên và đếm những món đồ chơi mới.", words: [["airplane", "máy bay đồ chơi"], ["ship", "tàu thủy đồ chơi"], ["puzzle", "trò xếp hình"], ["robot", "rô-bốt"], ["train", "tàu hỏa đồ chơi"]], sentences: [["There are eleven planes.", "Có mười một chiếc máy bay.", "Em đếm một nhóm máy bay đồ chơi."], ["There is a robot.", "Có một con rô-bốt.", "Em nhìn thấy một con rô-bốt trong phòng."], ["I have a puzzle.", "Mình có một bộ xếp hình.", "Em giới thiệu món đồ chơi của mình."], ["This is a train.", "Đây là một đoàn tàu.", "Em chỉ vào tàu hỏa đồ chơi."]] },
  { slug: "outdoor-games", title: "Outdoor Games", theme: "Trò chơi ngoài trời", description: "Nói về những trò chơi ngoài trời em thích.", words: [["hide and seek", "trốn tìm"], ["skipping", "nhảy dây"], ["skating", "trượt patin"], ["Blind Man's Bluff", "bịt mắt bắt dê"], ["throwing and catching", "ném và bắt bóng"]], sentences: [["I like skipping.", "Mình thích nhảy dây.", "Em nói trò chơi ngoài trời mình thích."], ["I don't like skating.", "Mình không thích trượt patin.", "Em nói trò chơi mình không thích."], ["I like hide and seek.", "Mình thích chơi trốn tìm.", "Em nói mình thích chơi trốn tìm."], ["Let's play catch.", "Cùng chơi ném bắt bóng nhé.", "Em rủ một người bạn chơi ném bắt bóng."]] },
  { slug: "food", title: "Food", theme: "Thức ăn", description: "Gọi tên thức ăn và hỏi về sở thích.", words: [["fish", "cá"], ["meat", "thịt"], ["carrot", "cà rốt"], ["grape", "nho"], ["tomato", "cà chua"]], sentences: [["Do you like fish?", "Bạn có thích cá không?", "Em muốn hỏi món cá có hợp khẩu vị bạn không."], ["Yes, I do.", "Có, mình thích.", "Em trả lời rằng mình thích món vừa được hỏi."], ["I like carrots.", "Mình thích cà rốt.", "Em chọn cà rốt và nói sở thích."], ["I don't like meat.", "Mình không thích thịt.", "Em nói món ăn mình không thích."]] },
  { slug: "mealtime", title: "Mealtime", theme: "Giờ ăn", description: "Nói về các bữa ăn trong ngày.", words: [["breakfast", "bữa sáng"], ["lunch", "bữa trưa"], ["dinner", "bữa tối"], ["dessert", "món tráng miệng"], ["snack", "bữa ăn nhẹ"]], sentences: [["I have bread for breakfast.", "Mình ăn bánh mì vào bữa sáng.", "Em kể món mình ăn vào buổi sáng."], ["I have rice for lunch.", "Mình ăn cơm vào bữa trưa.", "Em kể món mình ăn vào buổi trưa."], ["We eat dinner together.", "Chúng mình ăn tối cùng nhau.", "Em kể về bữa tối cùng gia đình."], ["I like dessert.", "Mình thích món tráng miệng.", "Em nói phần mình thích trong bữa ăn."]] },
  { slug: "activities", title: "Activities", theme: "Các hoạt động", description: "Nói về những hoạt động em có thể làm.", words: [["skip", "nhảy dây hoặc nhảy chân sáo"], ["jump", "nhảy"], ["climb", "leo trèo"], ["run", "chạy"], ["swim", "bơi"]], sentences: [["I can swim.", "Mình biết bơi.", "Em nói về khả năng bơi của mình."], ["I can jump.", "Mình có thể nhảy.", "Em nói về khả năng nhảy của mình."], ["I can climb.", "Mình có thể leo trèo.", "Em nói về khả năng leo trèo của mình."], ["I can run.", "Mình có thể chạy.", "Em nói về khả năng chạy của mình."]] },
  { slug: "music", title: "Music", theme: "Âm nhạc", description: "Gọi tên nhạc cụ và hỏi về khả năng chơi nhạc.", words: [["drum", "trống"], ["flute", "sáo"], ["guitar", "đàn ghi-ta"], ["piano", "đàn dương cầm"], ["violin", "đàn vi-ô-lông"]], sentences: [["Can you play the piano?", "Bạn có biết chơi đàn dương cầm không?", "Em muốn hỏi bạn có chơi được đàn dương cầm không."], ["Yes, I can.", "Có, mình biết chơi.", "Em trả lời rằng mình làm được điều vừa hỏi."], ["I can play the guitar.", "Mình biết chơi đàn ghi-ta.", "Em giới thiệu nhạc cụ mình chơi được."], ["I can't play the violin.", "Mình chưa biết chơi đàn vi-ô-lông.", "Em nói nhạc cụ mình chưa chơi được."]] },
  { slug: "places", title: "Places", theme: "Nơi chốn", description: "Gọi tên nơi quen thuộc và nói mình đang ở đâu.", words: [["home", "nhà"], ["park", "công viên"], ["zoo", "vườn thú"], ["cinema", "rạp chiếu phim"], ["school", "trường học"]], sentences: [["Where are you?", "Bạn đang ở đâu?", "Em gọi cho bạn và muốn biết bạn đang ở đâu."], ["I'm at home.", "Mình đang ở nhà.", "Em nói vị trí hiện tại là ở nhà."], ["I'm at the park.", "Mình đang ở công viên.", "Em nói vị trí hiện tại là công viên."], ["I'm at school.", "Mình đang ở trường.", "Em nói vị trí hiện tại là trường học."]] },
  { slug: "farm", title: "Farm", theme: "Nông trại", description: "Gọi tên và nhận biết động vật ở nông trại.", words: [["bee", "con ong"], ["buffalo", "con trâu"], ["goat", "con dê"], ["horse", "con ngựa"], ["sheep", "con cừu"]], sentences: [["Is it a buffalo?", "Đó có phải con trâu không?", "Em nhìn thấy một con vật và đoán đó là con trâu."], ["Yes, it is.", "Đúng rồi.", "Em xác nhận con vật vừa được đoán đúng."], ["No, it isn't.", "Không phải.", "Em phủ nhận một dự đoán chưa đúng."], ["It's a goat.", "Đó là một con dê.", "Em sửa lại và nói đúng tên con vật."]] },
  { slug: "sports", title: "Sports", theme: "Thể thao", description: "Gọi tên và nói về môn thể thao yêu thích.", words: [["football", "bóng đá"], ["badminton", "cầu lông"], ["dancing", "nhảy múa"], ["cycling", "đạp xe"], ["swimming", "bơi lội"]], sentences: [["What sports do you like?", "Bạn thích môn thể thao nào?", "Em muốn biết môn thể thao bạn yêu thích."], ["I like football.", "Mình thích bóng đá.", "Em nói môn thể thao mình thích."], ["I like badminton.", "Mình thích cầu lông.", "Em nói mình thích chơi cầu lông."], ["I like cycling.", "Mình thích đạp xe.", "Em nói mình thích đạp xe."]] },
  { slug: "weather", title: "Weather", theme: "Thời tiết", description: "Miêu tả thời tiết bằng những từ đơn giản.", words: [["hot", "nóng"], ["cold", "lạnh"], ["cool", "mát mẻ"], ["rainy", "có mưa"], ["sunny", "có nắng"]], sentences: [["What's the weather like?", "Thời tiết như thế nào?", "Em nhìn ra ngoài và hỏi về thời tiết hôm nay."], ["It's sunny.", "Trời có nắng.", "Em thấy mặt trời sáng và trả lời."], ["It's rainy.", "Trời đang mưa.", "Em thấy mưa rơi và trả lời."], ["It's cold.", "Trời lạnh.", "Em mặc áo ấm và nói về thời tiết."]] },
];

export function gradeOneBoardUrl(slug: string) {
  return `/grade-one/boards/${slug}.webp`;
}

export function buildGradeOneLessons(unit: GradeOneUnitSeed): GradeOneLessonSeed[] {
  const boardUrl = gradeOneBoardUrl(unit.slug);
  const wordActivities: GradeOneActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh, nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "VISUAL_GUESS", prompt: "Tranh này mô tả từ tiếng Anh nào?", imageUrl: boardUrl, imageAlt: `Tranh minh họa ${meaning}`, spriteIndex: index, spriteColumns: 3, spriteRows: 3, audioText: word, front: word, back: meaning },
  }));
  wordActivities.push({ type: ActivityType.MATCHING, title: "Ghép từ với nghĩa", instruction: `Ghép đúng ${unit.words.length} từ tiếng Anh với nghĩa tiếng Việt.`, order: unit.words.length + 1, payload: { prompt: `Ôn từ vựng chủ đề ${unit.theme}.`, pairs: unit.words.map(([left, right]) => ({ left, right })) } });

  const sentenceActivities: GradeOneActivitySeed[] = unit.sentences.map(([target, translation, cue], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Mẫu câu ${index + 1}: Nghe và đoán`,
    instruction: "Nhìn tình huống, bấm nghe và tự đoán câu tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "AUDIO_GUESS", prompt: cue, scenario: cue, imageUrl: boardUrl, imageAlt: `Tranh tình huống cho câu ${target}`, spriteIndex: 5 + index, spriteColumns: 3, spriteRows: 3, audioText: target, front: target, back: translation },
  }));

  return [
    { slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Nhìn tranh, nghe và tự đoán các từ cốt lõi của chủ đề.", activities: wordActivities },
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu ngắn trong tình huống gần gũi với học sinh Lớp 1.", activities: sentenceActivities },
  ];
}
