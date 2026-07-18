import { ActivityType } from "@prisma/client";

export type PreschoolUnitInput = {
  slug: string;
  theme: string;
  words: Array<[string, string]>;
  letters?: string[];
  number?: number;
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
  visuals: string[];
  situations: [Situation, Situation];
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
    visuals: ["👋", "🙂", "🙋", "🧒"],
    situations: [
      { cue: "Em vừa gặp một bạn mới. Câu đầu tiên em nói là gì?", target: "Hello!", translation: "Xin chào!", reply: "Hello!", replyTranslation: "Xin chào!" },
      { cue: "Em muốn biết tên của người bạn mới. Em hỏi thế nào?", target: "What's your name?", translation: "Bạn tên là gì?", reply: "My name is Lan.", replyTranslation: "Mình tên là Lan." },
    ],
  },
  family: {
    imageAlt: "Một gia đình Việt Nam vui vẻ ngồi bên nhau",
    visuals: ["👩", "👨", "👶", "👨‍👩‍👧‍👦"],
    situations: [
      { cue: "Bạn chỉ vào một người trong ảnh gia đình. Em muốn hỏi đó là ai.", target: "Who's this?", translation: "Đây là ai?", reply: "This is my mother.", replyTranslation: "Đây là mẹ của mình." },
      { cue: "Em muốn giới thiệu cả nhà với một người bạn.", target: "This is my family.", translation: "Đây là gia đình của mình.", reply: "Nice to meet you.", replyTranslation: "Rất vui được gặp mọi người." },
    ],
  },
  school: {
    imageAlt: "Bạn nhỏ đang học với sách và bút sáp trong lớp",
    visuals: ["🏫", "🧑‍🏫", "📖", "🖍️"],
    situations: [
      { cue: "Em thấy một đồ vật ở bàn học nhưng chưa biết tên. Em hỏi thế nào?", target: "What's this?", translation: "Đây là gì?", reply: "It's a crayon.", replyTranslation: "Đó là một chiếc bút sáp." },
      { cue: "Em muốn mượn quyển sách của bạn một cách lịch sự.", target: "Can I have the book, please?", translation: "Cho mình mượn quyển sách nhé?", reply: "Here you are.", replyTranslation: "Của bạn đây." },
    ],
  },
  feelings: {
    imageAlt: "Các bạn nhỏ thể hiện vui, buồn, mệt và giận",
    visuals: ["😊", "😢", "😴", "😠"],
    situations: [
      { cue: "Bạn đang mỉm cười. Em muốn hỏi bạn có vui không.", target: "Are you happy?", translation: "Bạn có vui không?", reply: "Yes, I am.", replyTranslation: "Có, mình vui." },
      { cue: "Em gặp bạn và muốn biết hôm nay bạn cảm thấy thế nào.", target: "How are you?", translation: "Bạn cảm thấy thế nào?", reply: "I'm happy.", replyTranslation: "Mình vui." },
    ],
  },
  toys: {
    imageAlt: "Bạn nhỏ đang chọn bóng, búp bê, diều và tàu đồ chơi",
    visuals: ["⚽", "🪆", "🪁", "🚂"],
    situations: [
      { cue: "Bạn đưa cho em một món đồ chơi lạ. Em muốn hỏi tên món đó.", target: "What's this?", translation: "Đây là gì?", reply: "It's a ball.", replyTranslation: "Đó là một quả bóng." },
      { cue: "Em muốn chơi cùng chiếc tàu đồ chơi của bạn.", target: "Can I play with the train?", translation: "Mình chơi tàu cùng được không?", reply: "Yes, you can.", replyTranslation: "Được, bạn chơi nhé." },
    ],
  },
  colors: {
    imageAlt: "Những đồ chơi có màu đỏ, xanh dương, vàng và xanh lá",
    visuals: ["🔴", "🔵", "🟡", "🟢"],
    situations: [
      { cue: "Em muốn biết quả bóng có màu gì.", target: "What color is it?", translation: "Nó màu gì?", reply: "It's red.", replyTranslation: "Nó màu đỏ." },
      { cue: "Em đoán món đồ chơi màu xanh dương và muốn hỏi lại cho chắc.", target: "Is it blue?", translation: "Nó màu xanh dương phải không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  body: {
    imageAlt: "Bạn nhỏ chỉ vào đầu, tay, chân và bàn chân",
    visuals: ["🙂", "✋", "🦵", "🦶"],
    situations: [
      { cue: "Khi chơi trò làm theo hiệu lệnh, em muốn bạn chạm vào đầu.", target: "Touch your head.", translation: "Hãy chạm vào đầu.", reply: "Okay!", replyTranslation: "Được thôi!" },
      { cue: "Bạn chỉ vào bàn tay và hỏi đây là gì. Em trả lời thế nào?", target: "This is my hand.", translation: "Đây là bàn tay của mình.", reply: "Very good!", replyTranslation: "Rất tốt!" },
    ],
  },
  face: {
    imageAlt: "Khuôn mặt bạn nhỏ với mắt, tai, mũi và miệng",
    visuals: ["👀", "👂", "👃", "👄"],
    situations: [
      { cue: "Bạn chỉ vào hai mắt và hỏi. Em gọi tên chúng thế nào?", target: "These are my eyes.", translation: "Đây là đôi mắt của mình.", reply: "I see your eyes.", replyTranslation: "Mình thấy đôi mắt của bạn." },
      { cue: "Khi chơi trò làm theo hiệu lệnh, em muốn bạn chạm vào mũi.", target: "Touch your nose.", translation: "Hãy chạm vào mũi.", reply: "Okay!", replyTranslation: "Được thôi!" },
    ],
  },
  shapes: {
    imageAlt: "Đồ chơi hình tròn, vuông, tam giác và ngôi sao",
    visuals: ["⚪", "🟦", "🔺", "⭐"],
    situations: [
      { cue: "Em nhìn thấy một khối đồ chơi và muốn hỏi hình gì.", target: "What shape is it?", translation: "Nó là hình gì?", reply: "It's a circle.", replyTranslation: "Nó là hình tròn." },
      { cue: "Em nghĩ món đồ chơi là hình ngôi sao và muốn hỏi lại.", target: "Is it a star?", translation: "Nó là hình ngôi sao phải không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  clothes: {
    imageAlt: "Bạn nhỏ chọn áo, váy, giày và mũ",
    visuals: ["👕", "👗", "👟", "🧢"],
    situations: [
      { cue: "Em muốn hỏi hôm nay bạn đang mặc gì.", target: "What are you wearing?", translation: "Bạn đang mặc gì?", reply: "I'm wearing a shirt.", replyTranslation: "Mình đang mặc áo." },
      { cue: "Em thấy một đôi giày và muốn biết có phải của bạn không.", target: "Are these your shoes?", translation: "Đây có phải giày của bạn không?", reply: "Yes, they are.", replyTranslation: "Đúng, chúng là giày của mình." },
    ],
  },
  fruit: {
    imageAlt: "Giỏ trái cây có táo, chuối, cam và nho",
    visuals: ["🍎", "🍌", "🍊", "🍇"],
    situations: [
      { cue: "Em muốn biết bạn thích loại quả nào.", target: "What fruit do you like?", translation: "Bạn thích loại quả nào?", reply: "I like apples.", replyTranslation: "Mình thích táo." },
      { cue: "Em muốn mời bạn một quả chuối.", target: "Would you like a banana?", translation: "Bạn có muốn một quả chuối không?", reply: "Yes, please.", replyTranslation: "Có, cảm ơn bạn." },
    ],
  },
  drinks: {
    imageAlt: "Bạn nhỏ chọn nước, sữa, nước ép và trà",
    visuals: ["💧", "🥛", "🧃", "🍵"],
    situations: [
      { cue: "Sau khi chạy chơi, em muốn hỏi bạn có khát không.", target: "Are you thirsty?", translation: "Bạn có khát không?", reply: "Yes, I am.", replyTranslation: "Có, mình khát." },
      { cue: "Em muốn mời bạn uống sữa.", target: "Would you like some milk?", translation: "Bạn có muốn uống sữa không?", reply: "Yes, please.", replyTranslation: "Có, cảm ơn bạn." },
    ],
  },
  snacks: {
    imageAlt: "Đĩa đồ ăn nhẹ có bánh mì, bánh quy, bánh ngọt và phô mai",
    visuals: ["🍞", "🍪", "🍰", "🧀"],
    situations: [
      { cue: "Đến giờ ăn nhẹ, em muốn hỏi bạn có đói không.", target: "Are you hungry?", translation: "Bạn có đói không?", reply: "Yes, I am.", replyTranslation: "Có, mình đói." },
      { cue: "Em muốn mời bạn một chiếc bánh quy.", target: "Would you like a cookie?", translation: "Bạn có muốn một chiếc bánh quy không?", reply: "Yes, please.", replyTranslation: "Có, cảm ơn bạn." },
    ],
  },
  "in-the-room": {
    imageAlt: "Căn phòng có bàn, ghế, giường và đèn",
    visuals: ["🪑", "🪑", "🛏️", "💡"],
    situations: [
      { cue: "Em không thấy chiếc đèn và muốn hỏi nó ở đâu.", target: "Where is the lamp?", translation: "Chiếc đèn ở đâu?", reply: "It's on the table.", replyTranslation: "Nó ở trên bàn." },
      { cue: "Em thấy một chiếc giường và muốn hỏi có phải giường của bạn không.", target: "Is this your bed?", translation: "Đây có phải giường của bạn không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  "at-home": {
    imageAlt: "Bạn nhỏ đọc sách, ăn, ngủ và chơi ở nhà",
    visuals: ["🍽️", "😴", "📖", "🧸"],
    situations: [
      { cue: "Em gọi cho bạn và muốn biết bạn đang làm gì ở nhà.", target: "What are you doing?", translation: "Bạn đang làm gì?", reply: "I'm reading.", replyTranslation: "Mình đang đọc sách." },
      { cue: "Đến giờ đi ngủ, em nói gì với người thân?", target: "Good night!", translation: "Chúc ngủ ngon!", reply: "Good night!", replyTranslation: "Chúc ngủ ngon!" },
    ],
  },
  "i-can": {
    imageAlt: "Bạn nhỏ chạy, nhảy, hát và nhảy múa trong công viên",
    visuals: ["🏃", "🤸", "🎤", "💃"],
    situations: [
      { cue: "Em muốn biết bạn có thể nhảy được không.", target: "Can you jump?", translation: "Bạn có thể nhảy không?", reply: "Yes, I can.", replyTranslation: "Có, mình có thể." },
      { cue: "Em muốn hỏi bạn làm được điều gì.", target: "What can you do?", translation: "Bạn có thể làm gì?", reply: "I can run.", replyTranslation: "Mình có thể chạy." },
    ],
  },
  pets: {
    imageAlt: "Những vật nuôi thân thiện gồm chó, mèo, cá và chim",
    visuals: ["🐶", "🐱", "🐟", "🐦"],
    situations: [
      { cue: "Em muốn biết bạn có nuôi con vật nào không.", target: "Do you have a pet?", translation: "Bạn có vật nuôi không?", reply: "Yes, I have a dog.", replyTranslation: "Có, mình có một chú chó." },
      { cue: "Em nhìn thấy một con vật nhỏ và muốn hỏi đó là con gì.", target: "What's this?", translation: "Đây là con gì?", reply: "It's a cat.", replyTranslation: "Đó là một con mèo." },
    ],
  },
  "the-farm": {
    imageAlt: "Nông trại có bò, vịt, lợn và cừu",
    visuals: ["🐄", "🦆", "🐷", "🐑"],
    situations: [
      { cue: "Em nghe tiếng cạp cạp và đoán là con vịt.", target: "Is it a duck?", translation: "Đó có phải con vịt không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
      { cue: "Em thấy một con vật lớn trên đồng cỏ và muốn hỏi tên.", target: "What animal is it?", translation: "Đó là con vật gì?", reply: "It's a cow.", replyTranslation: "Đó là một con bò." },
    ],
  },
  "the-zoo": {
    imageAlt: "Vườn thú có sư tử, hổ, khỉ và voi",
    visuals: ["🦁", "🐯", "🐒", "🐘"],
    situations: [
      { cue: "Em thấy một con vật to ở xa và muốn hỏi đó là con gì.", target: "What's that?", translation: "Đằng kia là con gì?", reply: "It's an elephant.", replyTranslation: "Đó là một con voi." },
      { cue: "Em nhìn thấy con vật có bờm và đoán là sư tử.", target: "Is it a lion?", translation: "Đó có phải sư tử không?", reply: "Yes, it is.", replyTranslation: "Đúng rồi." },
    ],
  },
  "the-park": {
    imageAlt: "Công viên có cầu trượt, xích đu, cây và hoa",
    visuals: ["🛝", "🎠", "🌳", "🌼"],
    situations: [
      { cue: "Em gặp bạn ở công viên và muốn rủ bạn chơi cùng.", target: "Do you want to play?", translation: "Bạn có muốn chơi không?", reply: "Yes, let's play!", replyTranslation: "Có, cùng chơi nhé!" },
      { cue: "Em muốn chơi xích đu nhưng chưa biết nó ở đâu.", target: "Where is the swing?", translation: "Xích đu ở đâu?", reply: "It's over there.", replyTranslation: "Nó ở đằng kia." },
    ],
  },
};

const phraseDistractors = ["Good morning!", "I am sleepy.", "It's a book.", "Thank you!", "Goodbye!", "I like bananas."];
const meaningDistractors = ["Chào buổi sáng!", "Mình đang buồn ngủ.", "Đó là một quyển sách.", "Cảm ơn bạn!", "Tạm biệt!", "Mình thích chuối."];
const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

function alternatives(pool: string[], correct: string) {
  return pool.filter((item) => item !== correct).slice(0, 2);
}

export function preschoolImageUrl(slug: string) {
  return `/preschool/scenes/${slug}.webp`;
}

export function buildPreschoolLessons(unit: PreschoolUnitInput): PreschoolLessonSeed[] {
  const scene = scenes[unit.slug];
  if (!scene) throw new Error(`Missing preschool scene content for ${unit.slug}`);
  const imageUrl = preschoolImageUrl(unit.slug);

  const reflexActivities = scene.situations.flatMap((situation, index): ActivitySeed[] => {
    const wrongPhrases = alternatives(phraseDistractors, situation.target);
    const wrongMeanings = alternatives(meaningDistractors, situation.replyTranslation);
    const number = index + 1;
    return [
      {
        type: ActivityType.MULTIPLE_CHOICE,
        title: `Tình huống ${number}: Em sẽ nói gì?`,
        instruction: "Quan sát tình huống, tự nghĩ câu trả lời rồi mới chọn đáp án.",
        order: index * 3 + 1,
        payload: {
          prompt: situation.cue,
          scenario: situation.cue,
          imageUrl,
          imageAlt: scene.imageAlt,
          options: [situation.target, ...wrongPhrases].map((text, optionIndex) => ({ id: optionIndex === 0 ? "correct" : `wrong-${optionIndex}`, text })),
          correctOptionId: "correct",
          explanation: `${situation.target} — ${situation.translation}`,
          modelAnswer: `Người kia có thể đáp: ${situation.reply} — ${situation.replyTranslation}`,
        },
      },
      {
        type: ActivityType.SPEAK_REPEAT,
        title: `Bật phản xạ: ${situation.target}`,
        instruction: "Nghe một lần, nhìn tình huống và nói lại như đang trò chuyện thật.",
        order: index * 3 + 2,
        payload: { prompt: situation.cue, scenario: situation.cue, target: situation.target, translation: situation.translation, imageUrl, imageAlt: scene.imageAlt },
      },
      {
        type: ActivityType.LISTEN_CHOOSE,
        title: "Nghe người kia trả lời",
        instruction: "Không nhìn câu tiếng Anh. Bấm nghe và chọn đúng điều em hiểu.",
        order: index * 3 + 3,
        payload: {
          prompt: "Người kia vừa trả lời điều gì?",
          text: situation.reply,
          options: [situation.replyTranslation, ...wrongMeanings].map((text, optionIndex) => ({ id: optionIndex === 0 ? "correct" : `wrong-${optionIndex}`, text })),
          correctOptionId: "correct",
          explanation: `${situation.reply} — ${situation.replyTranslation}`,
        },
      },
    ];
  });

  const wordActivities = unit.words.flatMap(([word, meaning], index): ActivitySeed[] => {
    const otherMeanings = unit.words.filter((_, otherIndex) => otherIndex !== index).map(([, itemMeaning]) => itemMeaning).slice(0, 2);
    return [
      {
        type: ActivityType.FLASHCARD,
        title: "Nhìn hình và đoán từ",
        instruction: "Nhìn tranh, tìm đồ vật hoặc hành động được gợi ý. Hãy đoán trước khi lật đáp án.",
        order: index * 2 + 1,
        payload: {
          mode: "VISUAL_GUESS",
          prompt: `Trong tranh, em hãy tìm hình mô tả “${meaning}”. Từ tiếng Anh là gì?`,
          imageUrl,
          imageAlt: scene.imageAlt,
          visual: scene.visuals[index] || "✨",
          front: word,
          back: meaning,
          example: `Nghe và nói lại: ${word}.`,
        },
      },
      {
        type: ActivityType.LISTEN_CHOOSE,
        title: "Chỉ nghe và đoán nghĩa",
        instruction: "Không nhìn từ. Bấm nghe, đoán từ em vừa nghe rồi chọn nghĩa đúng.",
        order: index * 2 + 2,
        payload: {
          prompt: "Em nghe thấy từ nào?",
          text: word,
          visual: "🎧",
          options: [meaning, ...otherMeanings].map((text, optionIndex) => ({ id: optionIndex === 0 ? "correct" : `wrong-${optionIndex}`, text })),
          correctOptionId: "correct",
          explanation: `${word} — ${meaning}`,
        },
      },
    ];
  });

  const letters = unit.letters || [];
  const otherLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    .filter((letter) => !letters.includes(letter)).slice(0, 2);
  const letterActivities: ActivitySeed[] = [
    ...letters.map((letter, index) => ({
      type: ActivityType.FLASHCARD,
      title: `Chữ ${letter}`,
      instruction: "Nhìn chữ, nghe tên chữ rồi đọc theo.",
      order: index + 1,
      payload: { prompt: `Đây là chữ ${letter}.`, visual: "🔤", front: `${letter} ${letter.toLowerCase()}`, back: `Letter ${letter}`, example: `Say: ${letter}.` },
    })),
    ...(unit.number ? [{
      type: ActivityType.FLASHCARD,
      title: `Số ${unit.number}`,
      instruction: "Nhìn số, nghe rồi đọc theo.",
      order: letters.length + 1,
      payload: { prompt: `Cùng đếm đến ${unit.number}.`, visual: "🔢", front: String(unit.number), back: numberWords[unit.number], example: `Say: ${numberWords[unit.number]}.` },
    }] : []),
    {
      type: ActivityType.MULTIPLE_CHOICE,
      title: "Tìm chữ đúng",
      instruction: "Chọn chữ cái em vừa học.",
      order: letters.length + (unit.number ? 2 : 1),
      payload: {
        prompt: `Đâu là chữ ${letters[0]}?`,
        options: [letters[0], ...otherLetters].map((text, index) => ({ id: index === 0 ? "correct" : `wrong-${index}`, text })),
        correctOptionId: "correct",
        explanation: `Đây là chữ ${letters[0]}.`,
      },
    },
  ];

  return [
    { slug: "phan-xa-doi-thuc", title: "Phản xạ đời thực", description: "Gặp tình huống, tự nghĩ câu cần nói, nghe đáp lại và luyện nói.", activities: reflexActivities },
    { slug: "nhin-nghe-doan-tu", title: "Nhìn và nghe đoán từ", description: "Nhìn tranh đoán từ, sau đó chỉ nghe âm thanh để chọn nghĩa.", activities: wordActivities },
    { slug: "chu-cai-chu-so", title: "Chữ cái & Chữ số", description: "Nhìn, nghe và nhận biết chữ cái, chữ số trong unit.", activities: letterActivities },
  ];
}

export function getPreschoolScene(slug: string) {
  return scenes[slug];
}
