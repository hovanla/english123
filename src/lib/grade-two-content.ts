import { ActivityType } from "@prisma/client";

type GradeTwoActivitySeed = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

export type GradeTwoLessonSeed = {
  slug: string;
  title: string;
  description: string;
  activities: GradeTwoActivitySeed[];
};

export type GradeTwoUnitSeed = {
  slug: string;
  title: string;
  theme: string;
  description: string;
  words: Array<[string, string]>;
  sentences: Array<[string, string, string]>;
};

export const gradeTwoUnits: GradeTwoUnitSeed[] = [
  { slug: "school", title: "School", theme: "Trường học", description: "Nhận biết các khu vực quen thuộc và giới thiệu ngôi trường của em.", words: [["school bus", "xe buýt trường học"], ["school yard", "sân trường"], ["classroom", "lớp học"], ["library", "thư viện"], ["gym", "phòng thể chất"]], sentences: [["That is my classroom.", "Đó là lớp học của mình.", "Em đứng ngoài hành lang và chỉ vào lớp học của mình."], ["That is our library.", "Đó là thư viện của chúng mình.", "Em giới thiệu thư viện với một người bạn mới."], ["This is the school yard.", "Đây là sân trường.", "Em đang đứng ở sân trường và giới thiệu nơi này."], ["Our gym is over there.", "Phòng thể chất của chúng mình ở đằng kia.", "Em chỉ đường cho bạn đến phòng thể chất."]] },
  { slug: "days-of-the-week", title: "Days of the Week", theme: "Ngày trong tuần", description: "Gọi tên bảy ngày trong tuần và hỏi hôm nay là thứ mấy.", words: [["Monday", "thứ Hai"], ["Tuesday", "thứ Ba"], ["Wednesday", "thứ Tư"], ["Thursday", "thứ Năm"], ["Friday", "thứ Sáu"], ["Saturday", "thứ Bảy"], ["Sunday", "Chủ nhật"]], sentences: [["What day is it?", "Hôm nay là thứ mấy?", "Em xem lịch nhưng chưa biết hôm nay là thứ mấy."], ["It's Monday.", "Hôm nay là thứ Hai.", "Em nhìn lịch và thấy ngày đầu tuần đi học."], ["It's Friday.", "Hôm nay là thứ Sáu.", "Em vui vì hôm nay là ngày học cuối trước cuối tuần."], ["It's Sunday.", "Hôm nay là Chủ nhật.", "Em đang nghỉ ở nhà vào ngày cuối tuần."]] },
  { slug: "jobs", title: "Jobs", theme: "Nghề nghiệp", description: "Gọi tên nghề nghiệp và hỏi một người làm công việc gì.", words: [["doctor", "bác sĩ"], ["farmer", "nông dân"], ["firefighter", "lính cứu hỏa"], ["pilot", "phi công"], ["driver", "tài xế"]], sentences: [["What's your job?", "Cô/chú làm nghề gì?", "Em gặp một người lớn và muốn biết nghề nghiệp của họ."], ["I'm a teacher.", "Tôi là giáo viên.", "Cô giáo giới thiệu nghề nghiệp của mình."], ["He is a doctor.", "Chú ấy là bác sĩ.", "Em giới thiệu người bác sĩ đang khám bệnh."], ["She is a pilot.", "Cô ấy là phi công.", "Em giới thiệu người phụ nữ đang lái máy bay."]] },
  { slug: "personalities", title: "Personalities", theme: "Tính cách", description: "Dùng tính từ đơn giản để nói về tính cách của mọi người.", words: [["hard-working", "chăm chỉ"], ["lazy", "lười biếng"], ["brave", "dũng cảm"], ["honest", "trung thực"], ["talkative", "hay nói"]], sentences: [["He is brave.", "Cậu ấy rất dũng cảm.", "Một bạn nam giúp người khác khi gặp chuyện khó."], ["She is hard-working.", "Bạn ấy rất chăm chỉ.", "Một bạn nữ tập trung học và hoàn thành bài tập."], ["He is honest.", "Cậu ấy rất trung thực.", "Một bạn nhặt được đồ và mang trả người làm mất."], ["She is talkative.", "Bạn ấy rất hay nói.", "Một bạn nữ vui vẻ kể rất nhiều chuyện với bạn bè."]] },
  { slug: "house", title: "House", theme: "Ngôi nhà", description: "Gọi tên các phòng và nói một người đang ở đâu trong nhà.", words: [["bathroom", "phòng tắm"], ["bedroom", "phòng ngủ"], ["living room", "phòng khách"], ["kitchen", "nhà bếp"], ["garden", "khu vườn"]], sentences: [["Where is she?", "Cô ấy đang ở đâu?", "Em tìm một bạn nữ trong ngôi nhà."], ["She's in the kitchen.", "Cô ấy đang ở trong bếp.", "Bạn nữ đang giúp chuẩn bị đồ ăn trong bếp."], ["He's in the bedroom.", "Cậu ấy đang ở trong phòng ngủ.", "Bạn nam đang đọc sách trong phòng ngủ."], ["They're in the garden.", "Họ đang ở trong vườn.", "Hai bạn đang tưới cây ngoài vườn."]] },
  { slug: "furniture", title: "Furniture", theme: "Đồ đạc", description: "Nhận biết đồ đạc trong nhà và mô tả vị trí của đồ vật.", words: [["fan", "quạt"], ["sofa", "ghế sô-pha"], ["light", "đèn"], ["wardrobe", "tủ quần áo"], ["fridge", "tủ lạnh"]], sentences: [["Where is it?", "Nó ở đâu?", "Em đang tìm một món đồ trong phòng khách."], ["It's on the sofa.", "Nó ở trên ghế sô-pha.", "Quyển sách em tìm đang nằm trên ghế sô-pha."], ["It's in the wardrobe.", "Nó ở trong tủ quần áo.", "Chiếc áo đang được cất trong tủ quần áo."], ["It's next to the fridge.", "Nó ở cạnh tủ lạnh.", "Chiếc thùng nhỏ nằm ngay cạnh tủ lạnh."]] },
  { slug: "bathroom", title: "Bathroom", theme: "Phòng tắm", description: "Gọi tên đồ dùng và nói trong phòng tắm có gì.", words: [["basin", "bồn rửa mặt"], ["toilet", "bồn cầu"], ["shower", "vòi sen"], ["mirror", "gương"], ["towel rack", "giá treo khăn"]], sentences: [["There is a mirror in the bathroom.", "Có một cái gương trong phòng tắm.", "Em nhìn thấy một chiếc gương phía trên bồn rửa mặt."], ["There is a shower here.", "Ở đây có một vòi sen.", "Em chỉ vào vòi sen trong phòng tắm."], ["There is a basin by the door.", "Có một bồn rửa mặt cạnh cửa.", "Em mô tả vị trí bồn rửa mặt ở gần cửa."], ["The towel is on the rack.", "Chiếc khăn ở trên giá.", "Em vừa treo khăn lên giá treo khăn."]] },
  { slug: "at-home", title: "At Home", theme: "Ở nhà", description: "Gọi tên và rủ bạn cùng thực hiện hoạt động vui chơi ở nhà.", words: [["draw pictures", "vẽ tranh"], ["do a puzzle", "chơi xếp hình"], ["play with blocks", "chơi xếp khối"], ["play cards", "chơi bài"], ["make crafts", "làm đồ thủ công"]], sentences: [["Let's draw pictures.", "Chúng ta cùng vẽ tranh nhé.", "Em có giấy và bút màu rồi rủ bạn cùng vẽ."], ["Let's do a puzzle.", "Chúng ta cùng chơi xếp hình nhé.", "Em mở hộp xếp hình và rủ bạn chơi cùng."], ["Let's play cards.", "Chúng ta cùng chơi bài nhé.", "Em lấy bộ bài dành cho trẻ em và rủ bạn chơi."], ["Let's make crafts.", "Chúng ta cùng làm đồ thủ công nhé.", "Em chuẩn bị giấy màu và rủ bạn làm đồ thủ công."]] },
  { slug: "feelings", title: "Feelings", theme: "Cảm xúc", description: "Nhận biết cảm xúc và hỏi một người đang cảm thấy thế nào.", words: [["sad", "buồn"], ["angry", "tức giận"], ["scared", "sợ hãi"], ["tired", "mệt"], ["shy", "ngại ngùng"]], sentences: [["Are you happy?", "Bạn đang vui à?", "Em thấy bạn đang mỉm cười và muốn hỏi cảm xúc của bạn."], ["No, I'm sad.", "Không, mình đang buồn.", "Bạn vừa làm rơi món đồ yêu thích và cảm thấy buồn."], ["I'm scared.", "Mình đang sợ.", "Em nghe tiếng sấm lớn và nói cảm xúc của mình."], ["She's tired.", "Bạn ấy đang mệt.", "Một bạn nữ vừa chạy xong và cần nghỉ ngơi."]] },
  { slug: "hobbies", title: "Hobbies", theme: "Sở thích", description: "Gọi tên hoạt động yêu thích và hỏi bạn thích làm gì.", words: [["listen to music", "nghe nhạc"], ["read books", "đọc sách"], ["take photos", "chụp ảnh"], ["play sports", "chơi thể thao"], ["paint", "vẽ màu"]], sentences: [["What do you like doing?", "Bạn thích làm gì?", "Em muốn tìm hiểu sở thích của một người bạn mới."], ["I like listening to music.", "Mình thích nghe nhạc.", "Em đeo tai nghe và nói về sở thích của mình."], ["I like reading books.", "Mình thích đọc sách.", "Em đang ở thư viện với cuốn sách yêu thích."], ["She likes painting.", "Bạn ấy thích vẽ màu.", "Một bạn nữ đang vẽ một bức tranh nhiều màu sắc."]] },
  { slug: "health", title: "Health", theme: "Sức khỏe", description: "Nhận biết triệu chứng thường gặp và nói mình đang bị làm sao.", words: [["runny nose", "sổ mũi"], ["fever", "sốt"], ["cold", "cảm lạnh"], ["cough", "ho"], ["sneeze", "hắt hơi"]], sentences: [["What's wrong?", "Bạn bị làm sao vậy?", "Em thấy bạn không khỏe và muốn hỏi thăm."], ["I have a cough.", "Mình bị ho.", "Em ho và nói cho người lớn biết triệu chứng."], ["I have a fever.", "Mình bị sốt.", "Trán em nóng và nhiệt kế báo nhiệt độ cao."], ["She has a cold.", "Bạn ấy bị cảm lạnh.", "Bạn nữ sổ mũi và đang nghỉ trên giường."]] },
  { slug: "personal-hygiene", title: "Personal Hygiene", theme: "Vệ sinh cá nhân", description: "Gọi tên thói quen vệ sinh và đưa ra lời khuyên đơn giản.", words: [["clip nails", "cắt móng tay"], ["wash hands", "rửa tay"], ["take a shower", "tắm vòi sen"], ["comb hair", "chải tóc"], ["brush teeth", "đánh răng"]], sentences: [["You should wash your hands.", "Bạn nên rửa tay.", "Tay bạn bị bẩn sau khi chơi ngoài sân."], ["You should brush your teeth.", "Bạn nên đánh răng.", "Em chuẩn bị đi ngủ và nhớ chăm sóc răng miệng."], ["You should comb your hair.", "Bạn nên chải tóc.", "Tóc của bạn đang rối trước khi đi học."], ["You should clip your nails.", "Bạn nên cắt móng tay.", "Móng tay đã dài và cần được người lớn giúp cắt."]] },
  { slug: "vegetables", title: "Vegetables", theme: "Rau củ", description: "Gọi tên rau củ và hỏi người khác có muốn ăn không.", words: [["broccoli", "bông cải xanh"], ["cucumber", "dưa chuột"], ["cabbage", "bắp cải"], ["pumpkin", "bí đỏ"], ["mushroom", "nấm"]], sentences: [["Do you want some cabbage?", "Bạn có muốn ăn một ít bắp cải không?", "Em đang chia rau trong bữa ăn và mời bạn."], ["Yes, please.", "Có, cho mình xin nhé.", "Em đồng ý lịch sự khi được mời món mình thích."], ["No, thank you.", "Không, cảm ơn bạn.", "Em từ chối món ăn một cách lịch sự."], ["I want some pumpkin.", "Mình muốn một ít bí đỏ.", "Em chọn món bí đỏ trong bữa ăn."]] },
  { slug: "fruits", title: "Fruits", theme: "Hoa quả", description: "Gọi tên các loại quả và nói loại quả mình thích hoặc không thích.", words: [["guava", "quả ổi"], ["lychee", "quả vải"], ["jackfruit", "quả mít"], ["papaya", "quả đu đủ"], ["longan", "quả nhãn"], ["mango", "quả xoài"]], sentences: [["I like guavas.", "Mình thích quả ổi.", "Em chọn ổi trong giỏ trái cây và nói sở thích."], ["I don't like lychees.", "Mình không thích quả vải.", "Em nói lịch sự rằng mình không thích ăn vải."], ["She likes mangoes.", "Bạn ấy thích xoài.", "Một bạn nữ vui vẻ ăn miếng xoài chín."], ["He likes papayas.", "Bạn ấy thích đu đủ.", "Một bạn nam chọn đu đủ cho món tráng miệng."]] },
  { slug: "mealtime", title: "Mealtime", theme: "Giờ ăn", description: "Gọi tên dụng cụ ăn uống và nhờ người khác đưa đồ một cách lịch sự.", words: [["knife", "dao"], ["spoon", "thìa"], ["bowl", "bát"], ["chopsticks", "đũa"], ["fork", "nĩa"]], sentences: [["Please give me a knife.", "Làm ơn đưa mình con dao.", "Em cần cắt thức ăn và nhờ người lớn đưa dao an toàn."], ["Please give me a spoon.", "Làm ơn đưa mình chiếc thìa.", "Em muốn ăn súp nhưng chưa có thìa."], ["Please give me the chopsticks.", "Làm ơn đưa mình đôi đũa.", "Đôi đũa đang ở phía người đối diện trên bàn ăn."], ["Here is your bowl.", "Bát của bạn đây.", "Em đưa chiếc bát cho người đang ngồi cạnh."]] },
  { slug: "shopping", title: "Shopping", theme: "Mua sắm", description: "Gọi tên cửa hàng và hỏi một người đang đi đâu.", words: [["bookstore", "hiệu sách"], ["market", "chợ"], ["clothing store", "cửa hàng quần áo"], ["toy store", "cửa hàng đồ chơi"], ["bakery", "tiệm bánh"]], sentences: [["Where are you going?", "Bạn đang đi đâu thế?", "Em gặp bạn đang chuẩn bị ra ngoài và muốn hỏi điểm đến."], ["I'm going to the bookstore.", "Mình đang đi tới hiệu sách.", "Em mang danh sách sách cần mua và chuẩn bị đến hiệu sách."], ["We're going to the market.", "Chúng mình đang đi chợ.", "Hai mẹ con mang giỏ và cùng đi mua thực phẩm."], ["She's going to the bakery.", "Bạn ấy đang đi tới tiệm bánh.", "Một bạn nữ muốn mua bánh mì cho bữa sáng."]] },
  { slug: "road-safety", title: "Road Safety", theme: "An toàn trên đường", description: "Nhận biết hành vi an toàn và đưa ra lời khuyên khi đi đường.", words: [["wear a helmet", "đội mũ bảo hiểm"], ["go fast", "đi nhanh"], ["walk on the sidewalk", "đi trên vỉa hè"], ["walk on the crosswalk", "đi trên vạch qua đường"], ["play in the street", "chơi dưới lòng đường"]], sentences: [["You should wear a helmet.", "Bạn nên đội mũ bảo hiểm.", "Bạn chuẩn bị đi xe đạp và cần bảo vệ đầu."], ["You shouldn't go fast.", "Bạn không nên đi quá nhanh.", "Một bạn đang đạp xe nhanh ở nơi đông người."], ["Walk on the sidewalk.", "Hãy đi trên vỉa hè.", "Em hướng dẫn bạn chọn nơi an toàn để đi bộ."], ["Don't play in the street.", "Đừng chơi dưới lòng đường.", "Quả bóng lăn ra đường và em nhắc bạn dừng lại."]] },
  { slug: "transportation", title: "Transportation", theme: "Phương tiện giao thông", description: "Gọi tên phương tiện và hỏi một người đi học bằng cách nào.", words: [["car", "ô tô"], ["motorbike", "xe máy"], ["bike", "xe đạp"], ["train", "tàu hỏa"], ["plane", "máy bay"]], sentences: [["How do you go to school?", "Bạn đi học bằng phương tiện gì?", "Em muốn biết mỗi sáng bạn đến trường bằng cách nào."], ["I go to school by bike.", "Mình đi học bằng xe đạp.", "Em đội mũ bảo hiểm và đạp xe đến trường."], ["I go by motorbike.", "Mình đi bằng xe máy.", "Em ngồi sau xe máy của bố hoặc mẹ."], ["We travel by train.", "Chúng mình đi bằng tàu hỏa.", "Gia đình em kéo hành lý lên tàu cho chuyến đi xa."]] },
  { slug: "seasons", title: "Seasons", theme: "Các mùa", description: "Gọi tên các mùa và mô tả thời tiết đặc trưng.", words: [["season", "mùa"], ["spring", "mùa xuân"], ["summer", "mùa hè"], ["fall", "mùa thu"], ["winter", "mùa đông"]], sentences: [["It's hot in the summer.", "Mùa hè trời nóng.", "Em mặc đồ mát và uống nước trong một ngày hè."], ["It's cold in the winter.", "Mùa đông trời lạnh.", "Em mặc áo khoác và quàng khăn vào mùa đông."], ["It's warm in the spring.", "Mùa xuân trời ấm.", "Hoa nở và thời tiết trở nên ấm áp."], ["It's cool in the fall.", "Mùa thu trời mát.", "Lá đổi màu và gió mát thổi nhẹ."]] },
  { slug: "holiday", title: "Holiday", theme: "Kỳ nghỉ", description: "Gọi tên điểm đến và nói nơi em muốn đến trong kỳ nghỉ.", words: [["beach", "bãi biển"], ["mountain", "núi"], ["countryside", "miền quê"], ["island", "hòn đảo"], ["city", "thành phố"]], sentences: [["I want to go to the beach on holiday.", "Mình muốn đi biển vào kỳ nghỉ.", "Em nhìn ảnh biển và chọn nơi muốn đến trong kỳ nghỉ."], ["I want to visit the mountains.", "Mình muốn đi thăm vùng núi.", "Em muốn ngắm núi và đi bộ cùng gia đình."], ["We visit the countryside.", "Chúng mình về thăm miền quê.", "Gia đình em về nơi có đồng ruộng và không khí trong lành."], ["They want to see the city.", "Họ muốn tham quan thành phố.", "Hai bạn muốn xem các tòa nhà và công viên trong thành phố."]] },
];

export function gradeTwoBoardUrl(slug: string) {
  return `/lesson-assets/grade-two/${slug}.webp`;
}

export function buildGradeTwoLessons(unit: GradeTwoUnitSeed): GradeTwoLessonSeed[] {
  const boardUrl = gradeTwoBoardUrl(unit.slug);
  const sharedSprite = { spriteColumns: 4, spriteRows: 3 };
  const wordActivities: GradeTwoActivitySeed[] = unit.words.map(([word, meaning], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Nhìn tranh, nghe và đoán từ ${index + 1}`,
    instruction: "Nhìn tranh, nghe nếu cần rồi tự đoán từ tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "VISUAL_GUESS", prompt: "Tranh này mô tả từ tiếng Anh nào?", imageUrl: boardUrl, imageAlt: `Tranh minh họa ${meaning}`, spriteIndex: index, ...sharedSprite, audioText: word, front: word, back: meaning },
  }));
  wordActivities.push({
    type: ActivityType.MATCHING,
    title: "Ghép từ với nghĩa",
    instruction: `Ghép đúng ${unit.words.length} từ tiếng Anh với nghĩa tiếng Việt.`,
    order: unit.words.length + 1,
    payload: { prompt: `Ôn từ vựng chủ đề ${unit.theme}.`, pairs: unit.words.map(([left, right]) => ({ left, right })) },
  });

  const sentenceActivities: GradeTwoActivitySeed[] = unit.sentences.map(([target, translation, cue], index) => ({
    type: ActivityType.FLASHCARD,
    title: `Mẫu câu ${index + 1}: Nghe và đoán`,
    instruction: "Nhìn tình huống, bấm nghe và tự đoán câu tiếng Anh trước khi mở đáp án.",
    order: index + 1,
    payload: { mode: "AUDIO_GUESS", prompt: cue, scenario: cue, imageUrl: boardUrl, imageAlt: `Tranh tình huống cho câu ${target}`, spriteIndex: unit.words.length + index, ...sharedSprite, audioText: target, front: target, back: translation },
  }));

  return [
    { slug: "tu-vung", title: "Từ vựng qua hình ảnh & âm thanh", description: "Nhìn tranh, nghe và tự đoán các từ cốt lõi của chủ đề.", activities: wordActivities },
    { slug: "mau-cau", title: "Mẫu câu phản xạ đời thực", description: "Dùng mẫu câu ngắn trong tình huống gần gũi với học sinh Lớp 2.", activities: sentenceActivities },
  ];
}
