import { ActivityType } from "@prisma/client";

export type PreschoolUnitInput = {
  slug: string;
  theme: string;
};

type Situation = {
  cue: string;
  target: string;
  translation: string;
  reply: string;
  replyTranslation: string;
};

type Scene = {
  imageAlt: string;
  words: Array<[string, string]>;
  visuals: string[];
  situations: Situation[];
};

type AlignedCurriculum = {
  words: Array<[string, string]>;
  visualIndexes?: number[];
  vocabularyAsset?: string;
  sentences: Array<[string, string]>;
};

type ActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

export type PreschoolLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: ActivitySeed[];
};

const scenes: Record<string, Scene> = {
  hello: {
    imageAlt: "Hai bạn nhỏ gặp nhau và vẫy tay chào",
    words: [["hello", "xin chào"], ["hi", "chào bạn"], ["name", "tên"], ["friend", "người bạn"], ["goodbye", "tạm biệt"], ["meet", "gặp gỡ"]],
    visuals: ["👋", "🙂", "🏷️", "🧒", "👋", "🤝"],
    situations: [
      { cue: "Em vừa gặp một bạn mới. Câu đầu tiên em nói là gì?", target: "Hello!", translation: "Xin chào!", reply: "Hello!", replyTranslation: "Xin chào!" },
      { cue: "Em muốn biết tên của người bạn mới. Em hỏi thế nào?", target: "What's your name?", translation: "Bạn tên là gì?", reply: "My name is Lan.", replyTranslation: "Mình tên là Lan." },
      { cue: "Đến lúc hai bạn tạm biệt nhau. Em nói gì?", target: "Goodbye!", translation: "Tạm biệt!", reply: "Goodbye!", replyTranslation: "Tạm biệt!" },
    ],
  },
  family: {
    imageAlt: "Một gia đình Việt Nam vui vẻ ngồi bên nhau",
    words: [["mother", "mẹ"], ["father", "bố"], ["sister", "chị hoặc em gái"], ["brother", "anh hoặc em trai"], ["baby", "em bé"], ["family", "gia đình"]],
    visuals: ["👩", "👨", "👧", "👦", "👶", "👨‍👩‍👧‍👦"],
    situations: [
      { cue: "Bạn chỉ vào một người trong ảnh gia đình. Em muốn hỏi đó là ai.", target: "Who's this?", translation: "Đây là ai?", reply: "This is my mother.", replyTranslation: "Đây là mẹ của mình." },
      { cue: "Em muốn giới thiệu cả nhà với một người bạn.", target: "This is my family.", translation: "Đây là gia đình của mình.", reply: "Nice to meet you.", replyTranslation: "Rất vui được gặp mọi người." },
    ],
  },
  school: {
    imageAlt: "Bạn nhỏ đang học với sách và bút sáp trong lớp",
    words: [["book", "quyển sách"], ["pencil", "bút chì"], ["crayon", "bút sáp"], ["ruler", "thước kẻ"], ["schoolbag", "cặp sách"], ["chair", "cái ghế"]],
    visuals: ["📖", "✏️", "🖍️", "📏", "🎒", "🪑"],
    situations: [
      { cue: "Em thấy một đồ vật ở bàn học nhưng chưa biết tên. Em hỏi thế nào?", target: "What's this?", translation: "Đây là gì?", reply: "It's a crayon.", replyTranslation: "Đó là một chiếc bút sáp." },
      { cue: "Em muốn mượn quyển sách của bạn một cách lịch sự.", target: "Can I have the book, please?", translation: "Cho mình mượn quyển sách nhé?", reply: "Here you are.", replyTranslation: "Của bạn đây." },
    ],
  },
  feelings: {
    imageAlt: "Các bạn nhỏ thể hiện vui, buồn, mệt và giận",
    words: [["happy", "vui"], ["sad", "buồn"], ["tired", "mệt"], ["angry", "giận"], ["scared", "sợ hãi"], ["excited", "háo hức"]],
    visuals: ["😊", "😢", "😴", "😠", "😨", "🤩"],
    situations: [
      { cue: "Bạn đang mỉm cười. Em muốn hỏi bạn có vui không.", target: "Are you happy?", translation: "Bạn có vui không?", reply: "Yes, I am.", replyTranslation: "Có, mình vui." },
      { cue: "Em gặp bạn và muốn biết hôm nay bạn cảm thấy thế nào.", target: "How are you?", translation: "Bạn cảm thấy thế nào?", reply: "I'm happy.", replyTranslation: "Mình vui." },
    ],
  },
  toys: {
    imageAlt: "Bạn nhỏ đang chọn bóng, búp bê, diều và tàu đồ chơi",
    words: [["ball", "quả bóng"], ["doll", "búp bê"], ["kite", "cái diều"], ["train", "tàu đồ chơi"], ["teddy bear", "gấu bông"], ["toy car", "xe đồ chơi"]],
    visuals: ["⚽", "🪆", "🪁", "🚂", "🧸", "🚗"],
    situations: [
      { cue: "Bạn đưa cho em một món đồ chơi lạ. Em muốn hỏi tên món đó.", target: "What's this?", translation: "Đây là gì?", reply: "It's a ball.", replyTranslation: "Đó là một quả bóng." },
      { cue: "Em muốn chơi cùng chiếc tàu đồ chơi của bạn.", target: "Can I play with the train?", translation: "Mình chơi tàu cùng được không?", reply: "Yes, you can.", replyTranslation: "Được, bạn chơi nhé." },
    ],
  },
  colors: {
    imageAlt: "Những đồ chơi có màu đỏ, xanh dương, vàng và xanh lá",
    words: [["red", "màu đỏ"], ["blue", "màu xanh dương"], ["yellow", "màu vàng"], ["green", "màu xanh lá"], ["orange", "màu cam"], ["purple", "màu tím"]],
    visuals: ["🔴", "🔵", "🟡", "🟢", "🟠", "🟣"],
    situations: [
      { cue: "Em muốn biết quả bóng có màu gì.", target: "What color is it?", translation: "Nó màu gì?", reply: "It's red.", replyTranslation: "Nó màu đỏ." },
      { cue: "Em đoán món đồ chơi màu xanh dương và muốn hỏi lại cho chắc.", target: "Is it blue?", translation: "Nó màu xanh dương phải không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  body: {
    imageAlt: "Bạn nhỏ chỉ vào đầu, tay, chân và bàn chân",
    words: [["head", "đầu"], ["hand", "bàn tay"], ["arm", "cánh tay"], ["leg", "chân"], ["foot", "bàn chân"], ["body", "cơ thể"]],
    visuals: ["🙂", "✋", "💪", "🦵", "🦶", "🧍"],
    situations: [
      { cue: "Khi chơi trò làm theo hiệu lệnh, em muốn bạn chạm vào đầu.", target: "Touch your head.", translation: "Hãy chạm vào đầu.", reply: "Okay!", replyTranslation: "Được thôi!" },
      { cue: "Bạn chỉ vào bàn tay và hỏi đây là gì. Em trả lời thế nào?", target: "This is my hand.", translation: "Đây là bàn tay của mình.", reply: "Very good!", replyTranslation: "Rất tốt!" },
    ],
  },
  face: {
    imageAlt: "Khuôn mặt bạn nhỏ với mắt, tai, mũi và miệng",
    words: [["eyes", "đôi mắt"], ["ears", "đôi tai"], ["nose", "mũi"], ["mouth", "miệng"], ["hair", "tóc"], ["face", "khuôn mặt"]],
    visuals: ["👀", "👂", "👃", "👄", "💇", "🙂"],
    situations: [
      { cue: "Bạn chỉ vào hai mắt trong tranh và muốn biết đó là gì.", target: "What are these?", translation: "Đây là những gì?", reply: "These are eyes.", replyTranslation: "Đây là đôi mắt." },
      { cue: "Bạn chỉ vào chiếc mũi và muốn biết đây là gì.", target: "What's this?", translation: "Đây là gì?", reply: "This is a nose.", replyTranslation: "Đây là một chiếc mũi." },
    ],
  },
  shapes: {
    imageAlt: "Đồ chơi hình tròn, vuông, tam giác và ngôi sao",
    words: [["circle", "hình tròn"], ["square", "hình vuông"], ["triangle", "hình tam giác"], ["star", "hình ngôi sao"], ["rectangle", "hình chữ nhật"], ["heart", "hình trái tim"]],
    visuals: ["⚪", "🟦", "🔺", "⭐", "▭", "❤️"],
    situations: [
      { cue: "Em chỉ vào hình tròn và nói tên hình cho bạn biết.", target: "This is a circle.", translation: "Đây là một hình tròn.", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
      { cue: "Em nghĩ món đồ chơi là hình ngôi sao và muốn hỏi lại.", target: "Is it a star?", translation: "Nó là hình ngôi sao phải không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  clothes: {
    imageAlt: "Bạn nhỏ chọn áo, váy, giày và mũ",
    words: [["shirt", "áo"], ["dress", "váy"], ["pants", "quần dài"], ["shoes", "giày"], ["hat", "mũ"], ["socks", "tất"]],
    visuals: ["👕", "👗", "👖", "👟", "🧢", "🧦"],
    situations: [
      { cue: "Em chỉ vào chiếc quần dài của mình và giới thiệu với bạn.", target: "These are my pants.", translation: "Đây là chiếc quần dài của mình.", reply: "They look nice!", replyTranslation: "Chúng trông đẹp đấy!" },
      { cue: "Em thấy một đôi giày và muốn biết có phải của bạn không.", target: "Are these your shoes?", translation: "Đây có phải giày của bạn không?", reply: "Yes, they are.", replyTranslation: "Đúng, chúng là giày của mình." },
    ],
  },
  fruit: {
    imageAlt: "Giỏ trái cây có táo, chuối, cam và nho",
    words: [["apple", "quả táo"], ["banana", "quả chuối"], ["orange", "quả cam"], ["grapes", "quả nho"], ["mango", "quả xoài"], ["watermelon", "quả dưa hấu"]],
    visuals: ["🍎", "🍌", "🍊", "🍇", "🥭", "🍉"],
    situations: [
      { cue: "Em muốn nói cho bạn biết loại quả mình thích.", target: "I like apples.", translation: "Mình thích táo.", reply: "I like bananas.", replyTranslation: "Mình thích chuối." },
      { cue: "Em muốn biết bạn có thích nho không.", target: "Do you like grapes?", translation: "Bạn có thích nho không?", reply: "Yes, I do.", replyTranslation: "Có, mình thích." },
    ],
  },
  drinks: {
    imageAlt: "Bạn nhỏ chọn nước, sữa, nước ép và trà",
    words: [["water", "nước"], ["milk", "sữa"], ["juice", "nước ép"], ["tea", "trà"], ["lemonade", "nước chanh"], ["smoothie", "sinh tố"]],
    visuals: ["💧", "🥛", "🧃", "🍵", "🍋", "🥤"],
    situations: [
      { cue: "Em muốn biết bạn có thích uống sữa không.", target: "Do you like milk?", translation: "Bạn có thích sữa không?", reply: "Yes, I do.", replyTranslation: "Có, mình thích." },
      { cue: "Em muốn mời bạn uống một ít nước.", target: "Would you like some water?", translation: "Bạn có muốn uống nước không?", reply: "Yes, please.", replyTranslation: "Có, cảm ơn bạn." },
    ],
  },
  snacks: {
    imageAlt: "Đĩa đồ ăn nhẹ có bánh mì, bánh quy, bánh ngọt và phô mai",
    words: [["bread", "bánh mì"], ["cookie", "bánh quy"], ["cake", "bánh ngọt"], ["cheese", "phô mai"], ["sandwich", "bánh mì kẹp"], ["ice cream", "kem"]],
    visuals: ["🍞", "🍪", "🍰", "🧀", "🥪", "🍦"],
    situations: [
      { cue: "Đến giờ ăn nhẹ, em muốn hỏi bạn có đói không.", target: "Are you hungry?", translation: "Bạn có đói không?", reply: "Yes, I am.", replyTranslation: "Có, mình đói." },
      { cue: "Em muốn mời bạn một chiếc bánh quy.", target: "Would you like a cookie?", translation: "Bạn có muốn một chiếc bánh quy không?", reply: "Yes, please.", replyTranslation: "Có, cảm ơn bạn." },
    ],
  },
  "in-the-room": {
    imageAlt: "Căn phòng có bàn, ghế, giường và đèn",
    words: [["table", "cái bàn"], ["chair", "cái ghế"], ["bed", "cái giường"], ["lamp", "cái đèn"], ["sofa", "ghế sofa"], ["wardrobe", "tủ quần áo"]],
    visuals: ["🪵", "🪑", "🛏️", "💡", "🛋️", "🚪"],
    situations: [
      { cue: "Em không thấy chiếc đèn và muốn hỏi nó ở đâu.", target: "Where is the lamp?", translation: "Chiếc đèn ở đâu?", reply: "It's on the table.", replyTranslation: "Nó ở trên bàn." },
      { cue: "Em thấy một chiếc giường và muốn hỏi có phải giường của bạn không.", target: "Is this your bed?", translation: "Đây có phải giường của bạn không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  "at-home": {
    imageAlt: "Bạn nhỏ đọc sách, ăn, ngủ và chơi ở nhà",
    words: [["eat", "ăn"], ["sleep", "ngủ"], ["read", "đọc sách"], ["play", "chơi"], ["watch TV", "xem ti vi"], ["help", "giúp đỡ"]],
    visuals: ["🍽️", "😴", "📖", "🧸", "📺", "🤝"],
    situations: [
      { cue: "Em gọi cho bạn và muốn biết bạn đang làm gì ở nhà.", target: "What are you doing?", translation: "Bạn đang làm gì?", reply: "I'm reading.", replyTranslation: "Mình đang đọc sách." },
      { cue: "Đến giờ đi ngủ, em nói gì với người thân?", target: "Good night!", translation: "Chúc ngủ ngon!", reply: "Good night!", replyTranslation: "Chúc ngủ ngon!" },
    ],
  },
  "i-can": {
    imageAlt: "Bạn nhỏ chạy, nhảy, hát và nhảy múa trong công viên",
    words: [["run", "chạy"], ["jump", "nhảy"], ["sing", "hát"], ["dance", "nhảy múa"], ["swim", "bơi"], ["draw", "vẽ"]],
    visuals: ["🏃", "🤸", "🎤", "💃", "🏊", "🎨"],
    situations: [
      { cue: "Em muốn biết bạn có thể nhảy được không.", target: "Can you jump?", translation: "Bạn có thể nhảy không?", reply: "Yes, I can.", replyTranslation: "Có, mình có thể." },
      { cue: "Em muốn hỏi bạn làm được điều gì.", target: "What can you do?", translation: "Bạn có thể làm gì?", reply: "I can run.", replyTranslation: "Mình có thể chạy." },
    ],
  },
  pets: {
    imageAlt: "Những vật nuôi thân thiện gồm chó, mèo, cá và chim",
    words: [["dog", "con chó"], ["cat", "con mèo"], ["fish", "con cá"], ["bird", "con chim"], ["rabbit", "con thỏ"], ["turtle", "con rùa"]],
    visuals: ["🐶", "🐱", "🐟", "🐦", "🐰", "🐢"],
    situations: [
      { cue: "Em muốn biết bạn có nuôi con vật nào không.", target: "Do you have a pet?", translation: "Bạn có vật nuôi không?", reply: "Yes, I have a dog.", replyTranslation: "Có, mình có một chú chó." },
      { cue: "Em nhìn thấy một con vật nhỏ và muốn hỏi đó là con gì.", target: "What's this?", translation: "Đây là con gì?", reply: "It's a cat.", replyTranslation: "Đó là một con mèo." },
    ],
  },
  "the-farm": {
    imageAlt: "Nông trại có bò, vịt, lợn và cừu",
    words: [["cow", "con bò"], ["duck", "con vịt"], ["pig", "con lợn"], ["sheep", "con cừu"], ["horse", "con ngựa"], ["chicken", "con gà"]],
    visuals: ["🐄", "🦆", "🐷", "🐑", "🐴", "🐔"],
    situations: [
      { cue: "Em nghe tiếng cạp cạp và đoán là con vịt.", target: "Is it a duck?", translation: "Đó có phải con vịt không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
      { cue: "Em thấy một con vật lớn trên đồng cỏ và muốn hỏi tên.", target: "What animal is it?", translation: "Đó là con vật gì?", reply: "It's a cow.", replyTranslation: "Đó là một con bò." },
    ],
  },
  "the-zoo": {
    imageAlt: "Vườn thú có sư tử, hổ, khỉ và voi",
    words: [["lion", "sư tử"], ["tiger", "hổ"], ["monkey", "khỉ"], ["elephant", "voi"], ["giraffe", "hươu cao cổ"], ["bear", "gấu"]],
    visuals: ["🦁", "🐯", "🐒", "🐘", "🦒", "🐻"],
    situations: [
      { cue: "Em thấy một con vật to ở xa và muốn hỏi đó là con gì.", target: "What's that?", translation: "Đằng kia là con gì?", reply: "It's an elephant.", replyTranslation: "Đó là một con voi." },
      { cue: "Em nhìn thấy con vật có bờm và đoán là sư tử.", target: "Is it a lion?", translation: "Đó có phải sư tử không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  "the-park": {
    imageAlt: "Công viên có cầu trượt, xích đu, cây và hoa",
    words: [["slide", "cầu trượt"], ["swing", "xích đu"], ["seesaw", "bập bênh"], ["sandbox", "hố cát"], ["climbing frame", "khung leo trèo"], ["bench", "ghế dài"]],
    visuals: ["🛝", "🎠", "⚖️", "🏖️", "🧗", "🪑"],
    situations: [
      { cue: "Em gặp bạn ở công viên và muốn rủ bạn chơi cùng.", target: "Let's play in the park!", translation: "Cùng chơi trong công viên nhé!", reply: "Yes, let's play!", replyTranslation: "Ừ, cùng chơi nhé!" },
      { cue: "Em muốn chơi xích đu nhưng chưa biết nó ở đâu.", target: "Where is the swing?", translation: "Xích đu ở đâu?", reply: "It's over there.", replyTranslation: "Nó ở đằng kia." },
    ],
  },
};

const alignedCurriculum: Record<string, AlignedCurriculum> = {
  hello: {
    words: [],
    sentences: [["Hello.", "Xin chào."], ["What's your name?", "Tên bạn là gì?"], ["I'm Lisa.", "Mình là Lisa."], ["Goodbye.", "Tạm biệt."]],
  },
  family: {
    words: [["mum", "mẹ"], ["dad", "bố"], ["grandma", "bà"], ["grandpa", "ông"]], vocabularyAsset: "family-aligned",
    sentences: [["Who's this?", "Đây là ai?"], ["It's my mum.", "Đây là mẹ mình."], ["It's my dad.", "Đây là bố mình."], ["It's my grandma.", "Đây là bà mình."], ["It's my grandpa.", "Đây là ông mình."]],
  },
  school: { words: [["bag", "chiếc cặp"], ["book", "quyển sách"], ["pencil", "bút chì"], ["crayon", "bút màu"]], visualIndexes: [4, 0, 1, 2], sentences: [] },
  feelings: {
    words: [["happy", "vui vẻ"], ["sleepy", "buồn ngủ"], ["hungry", "đói"], ["thirsty", "khát"]], vocabularyAsset: "feelings-aligned",
    sentences: [["Are you happy?", "Bạn có vui không?"], ["Yes, I am.", "Có, mình vui."], ["Are you hungry?", "Bạn có đói không?"], ["No, I'm not.", "Không, mình không đói."]],
  },
  toys: {
    words: [["ball", "quả bóng"], ["car", "ô tô"], ["doll", "búp bê"], ["teddy", "gấu bông"]], visualIndexes: [0, 5, 1, 4],
    sentences: [["What's this?", "Đây là cái gì?"], ["It's a ball.", "Đây là quả bóng."], ["It's a car.", "Đây là ô tô."], ["It's a doll.", "Đây là búp bê."], ["It's a teddy.", "Đây là gấu bông."]],
  },
  colors: {
    words: [["red", "màu đỏ"], ["green", "màu xanh lá cây"], ["blue", "màu xanh dương"], ["yellow", "màu vàng"]], visualIndexes: [0, 3, 1, 2],
    sentences: [["What color is it?", "Nó màu gì?"], ["It's blue.", "Nó màu xanh dương."], ["This is a red car.", "Đây là một chiếc ô tô màu đỏ."]],
  },
  body: { words: [["head", "đầu"], ["arms", "cánh tay"], ["hands", "bàn tay"], ["legs", "chân"]], visualIndexes: [0, 2, 1, 3], sentences: [] },
  face: {
    words: [["ears", "đôi tai"], ["eyes", "đôi mắt"], ["nose", "mũi"], ["mouth", "miệng"]], visualIndexes: [1, 0, 2, 3],
    sentences: [["What's this?", "Đây là gì?"], ["It's my nose.", "Đây là mũi của mình."], ["What are these?", "Đây là những gì?"], ["They're my eyes.", "Chúng là mắt của mình."]],
  },
  shapes: {
    words: [["circle", "hình tròn"], ["square", "hình vuông"], ["triangle", "hình tam giác"], ["rectangle", "hình chữ nhật"]], visualIndexes: [0, 1, 2, 4],
    sentences: [["This is a circle.", "Đây là một hình tròn."], ["This is a triangle.", "Đây là một hình tam giác."], ["Is it a square?", "Đây có phải hình vuông không?"], ["Yes, it is.", "Đúng."], ["Is it a triangle?", "Đây có phải hình tam giác không?"], ["No, it isn't. It's a rectangle.", "Không phải. Đây là hình chữ nhật."]],
  },
  clothes: {
    words: [["shirt", "áo sơ mi"], ["skirt", "chân váy"], ["pants", "quần dài"], ["shoes", "đôi giày"]], vocabularyAsset: "clothes-aligned",
    sentences: [["This is my shirt.", "Đây là áo sơ mi của mình."], ["This is your skirt.", "Đây là chân váy của bạn."], ["These are my pants.", "Đây là quần dài của mình."], ["These are your shoes.", "Đây là đôi giày của bạn."]],
  },
  fruit: {
    words: [["apple", "quả táo"], ["orange", "quả cam"], ["banana", "quả chuối"], ["lime", "quả chanh xanh"]], vocabularyAsset: "fruit-aligned",
    sentences: [["I like apples.", "Mình thích táo."], ["I like oranges.", "Mình thích cam."], ["I don't like bananas.", "Mình không thích chuối."], ["I don't like limes.", "Mình không thích chanh xanh."]],
  },
  drinks: {
    words: [["water", "nước"], ["milk", "sữa"], ["juice", "nước ép"], ["coke", "nước ngọt cola"]], vocabularyAsset: "drinks-aligned",
    sentences: [["Do you like juice?", "Bạn có thích nước ép không?"], ["Yes, I do.", "Có, mình thích."], ["Do you like coke?", "Bạn có thích nước ngọt cola không?"], ["No, I don't.", "Không, mình không thích."]],
  },
  snacks: { words: [["cookie", "bánh quy"], ["cake", "bánh kem"], ["jelly", "thạch"], ["ice cream", "kem"]], vocabularyAsset: "snacks-aligned", sentences: [] },
  "in-the-room": { words: [["bed", "chiếc giường"], ["table", "chiếc bàn"], ["chair", "chiếc ghế"], ["TV", "chiếc ti vi"]], vocabularyAsset: "in-the-room-aligned", sentences: [] },
  "at-home": {
    words: [["eat", "ăn"], ["play", "chơi"], ["paint", "vẽ tranh"], ["watch", "xem"]], vocabularyAsset: "at-home-aligned",
    sentences: [["What are you doing?", "Bạn đang làm gì?"], ["I'm eating an apple.", "Mình đang ăn táo."], ["What are you doing?", "Bạn đang làm gì?"], ["I'm playing with my toys.", "Mình đang chơi đồ chơi."]],
  },
  "i-can": { words: [["dance", "nhảy múa"], ["sing", "hát"], ["draw", "vẽ"], ["read", "đọc"]], vocabularyAsset: "i-can-aligned", sentences: [] },
  pets: { words: [["dog", "chó"], ["cat", "mèo"], ["fish", "cá"], ["bird", "chim"]], visualIndexes: [0, 1, 2, 3], sentences: [] },
  "the-farm": {
    words: [["duck", "con vịt"], ["chicken", "con gà"], ["pig", "con lợn"], ["cow", "con bò"]], visualIndexes: [1, 5, 2, 0],
    sentences: [["Is it a duck?", "Đây có phải con vịt không?"], ["Is it a cow?", "Đây có phải con bò không?"], ["Yes, it is.", "Đúng rồi."], ["No, it isn't.", "Không phải."]],
  },
  "the-zoo": {
    words: [["monkey", "khỉ"], ["tiger", "hổ"], ["zebra", "ngựa vằn"], ["bear", "gấu"]], vocabularyAsset: "the-zoo-aligned",
    sentences: [["What's that?", "Kia là con gì?"], ["It's a tiger.", "Kia là con hổ."], ["What are those?", "Chúng là con gì?"], ["They're bears.", "Chúng là những con gấu."]],
  },
  "the-park": { words: [["playground", "sân chơi"], ["seesaw", "bập bênh"], ["slide", "cầu trượt"], ["swing", "xích đu"]], vocabularyAsset: "the-park-aligned", sentences: [] },
};

const helloSentenceCues: Record<string, string> = {
  "Hello.": "Em vừa gặp một người mới. Câu đầu tiên em nói là gì?",
  "What's your name?": "Em muốn biết tên của người bạn mới. Em hỏi thế nào?",
  "I'm Lisa.": "Bạn vừa hỏi tên em. Em trả lời và giới thiệu mình là Lisa thế nào?",
  "Goodbye.": "Đến lúc hai người tạm biệt nhau. Em nói gì?",
};

export function preschoolImageUrl(slug: string) {
  return `/preschool/scenes/${slug}.webp`;
}

export function preschoolVocabularyImageUrl(slug: string) {
  const asset = alignedCurriculum[slug]?.vocabularyAsset || slug;
  return `/preschool/vocabulary/${asset}.webp`;
}

export function buildPreschoolLessons(unit: PreschoolUnitInput): PreschoolLessonSeed[] {
  const baseScene = scenes[unit.slug];
  const curriculum = alignedCurriculum[unit.slug];
  if (!baseScene || !curriculum) throw new Error(`Missing preschool scene content for ${unit.slug}`);
  const imageUrl = preschoolImageUrl(unit.slug);
  const vocabularyImageUrl = preschoolVocabularyImageUrl(unit.slug);

  const reflexActivities = curriculum.sentences.map(([target, translation], index): ActivitySeed => {
    const number = index + 1;
    const cue = unit.slug === "hello" && helloSentenceCues[target]
      ? helloSentenceCues[target]
      : `Trong tình huống thật, em muốn nói “${translation}”. Câu tiếng Anh nào phù hợp?`;
    return {
      type: ActivityType.FLASHCARD,
      title: `Mẫu câu ${number}: Nghe và đoán`,
      instruction: "Nhìn tình huống, bấm nghe và tự đoán câu tiếng Anh trước khi mở đáp án.",
      order: number,
      payload: {
        mode: "AUDIO_GUESS",
        prompt: cue,
        scenario: cue,
        imageUrl,
        imageAlt: baseScene.imageAlt,
        audioText: target,
        front: target,
        back: translation,
      },
    };
  });

  const wordActivities = curriculum.words.map(([word, meaning], index): ActivitySeed => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh trước, bấm nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: {
      mode: "VISUAL_GUESS",
      prompt: "Tranh này mô tả từ tiếng Anh nào?",
      imageUrl: vocabularyImageUrl,
      imageAlt: `Tranh minh họa cho từ ${meaning}`,
      spriteIndex: curriculum.visualIndexes?.[index] ?? index,
      audioText: word,
      front: word,
      back: meaning,
      example: `Nghe lại và ghi nhớ: ${word}.`,
    },
  }));
  if (curriculum.words.length) {
    wordActivities.push({
      type: ActivityType.MATCHING,
      title: "Ghép từ với nghĩa",
      instruction: "Ghép đủ bốn từ tiếng Anh với nghĩa tiếng Việt để kết thúc phần từ vựng.",
      order: curriculum.words.length + 1,
      payload: {
        prompt: `Ôn lại toàn bộ từ vựng chủ đề ${unit.theme}.`,
        pairs: curriculum.words.map(([left, right]) => ({ left, right })),
      },
    });
  }

  const lessons: PreschoolLessonSeed[] = [];
  if (wordActivities.length) lessons.push({ slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Học đúng bốn từ của chủ đề bằng cách nhìn tranh, nghe và tự đoán trước khi xem đáp án.", activities: wordActivities });
  if (reflexActivities.length) lessons.push({ slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Nghe đúng các mẫu câu cốt lõi của chủ đề trong tình huống thật và tự đoán trước khi xem đáp án.", activities: reflexActivities });
  return lessons;
}

export function getPreschoolScene(slug: string) {
  const scene = scenes[slug];
  const curriculum = alignedCurriculum[slug];
  if (!scene || !curriculum) return undefined;
  return { ...scene, words: curriculum.words, sentences: curriculum.sentences, visualIndexes: curriculum.visualIndexes, vocabularyAsset: curriculum.vocabularyAsset };
}
