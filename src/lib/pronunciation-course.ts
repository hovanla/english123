export type PronunciationLesson = { id: string; group: string; title: string; symbol: string; tip: string; mistake: string; words: string[]; sentence: string; pair: string[] };
type Row = [id: string, symbol: string, title: string, tip: string, mistake: string, words: string, sentence: string, pair?: string];
function group(name: string, rows: Row[]): PronunciationLesson[] {
  return rows.map(([id, symbol, title, tip, mistake, words, sentence, pair]) => ({ id, group: name, symbol, title: `${symbol ? `/${symbol}/ · ` : ""}${title}`, tip, mistake, words: words.split("|"), sentence, pair: pair ? pair.split("|") : [] }));
}

// General American teaching inventory: symbols label sounds, not English letters.
// /ɔ/ is retained for speakers without the cot–caught merger; /ɝ, ɚ/ are r-colored vowels.
export const pronunciationLessons = [
  ...group("Nguyên âm đơn", [
    ["v-i", "i", "see", "Nâng phần trước lưỡi lên cao, môi hơi kéo ngang, để hơi ra tự do. Nghe see rồi seat; âm có thể chuyển động nhẹ trong giọng Mỹ.", "Không chỉ kéo dài /ɪ/ để tạo âm này.", "see|seat|green|meet", "We meet near the green tree.", "seat|sit"],
    ["v-ih", "ɪ", "sit", "Thả lỏng môi, phần trước lưỡi cao nhưng thấp hơn /i/. Đọc sit ngắn, nhẹ; so sánh vị trí lưỡi với seat.", "Tránh đọc sit thành seat.", "sit|ship|fish|milk", "The fish is in the ship.", "ship|sheep"],
    ["v-eh", "ɛ", "bed", "Đặt lưỡi phía trước ở độ cao vừa, môi thả lỏng, hàm mở vừa phải. Ký hiệu này cũng được viết /e/ trong một số từ điển.", "Không khép miệng quá hẹp như /ɪ/.", "bed|pen|red|head", "The red pen is on the bed.", "pen|pan"],
    ["v-ae", "æ", "cat", "Hạ hàm, đặt phần trước lưỡi thấp, môi không tròn. So sánh bed và bad để cảm nhận miệng mở rộng hơn.", "Âm trước m hoặc n có thể biến đổi theo giọng Mỹ; không ép mọi từ giống hệt nhau.", "cat|bad|map|black", "The black cat is on the mat.", "bad|bed"],
    ["v-ah", "ɑ", "hot", "Mở hàm rộng, lưỡi thấp và hơi về sau, môi không tròn. Giữ hơi liên tục khi chuyển từ h sang nguyên âm trong hot.", "Không bắt buộc tròn môi như âm o tiếng Việt.", "hot|father|top|clock", "My father has a clock.", "hot|hat"],
    ["v-aw", "ɔ", "law", "Lưỡi ở phía sau, hàm mở và môi hơi tròn. Đây là âm trong law với người Mỹ còn phân biệt cot–caught.", "Nhiều giọng Mỹ gộp /ɔ/ với /ɑ/; đó là biến thể hợp lệ, không phải lỗi.", "law|saw|talk|thought", "We saw them talk.", "saw|so"],
    ["v-uh", "ʊ", "book", "Nâng phần sau lưỡi vừa phải, môi hơi tròn và thả lỏng. Đọc book, tránh đẩy môi căng quá mức.", "Phân biệt chất âm full với fool, không chỉ độ dài.", "book|good|full|foot", "The book is very good.", "full|fool"],
    ["v-oo", "u", "blue", "Nâng lưỡi cao, môi tròn; vị trí lưỡi có thể ra trước hơn tùy giọng Mỹ. Giữ đường hơi mở.", "Không dùng đúng khẩu hình /ʊ/ rồi chỉ đọc dài hơn.", "blue|food|moon|school", "The moon is above the school.", "pool|pull"],
    ["v-strut", "ʌ", "cup", "Môi thả lỏng, hàm mở vừa, lưỡi ở vùng giữa. Đọc rõ nguyên âm được nhấn trong cup hoặc sun.", "Không đồng nhất âm được nhấn này với mọi âm schwa không nhấn.", "cup|sun|bus|love", "The cup is on the bus.", "cut|cat"],
    ["v-schwa", "ə", "about", "Thả lỏng môi và lưỡi, đọc nhẹ ở âm tiết không nhấn: âm đầu trong about hoặc âm cuối trong sofa.", "Không nhấn mạnh mọi âm tiết hoặc đọc theo từng chữ cái.", "about|ago|sofa|banana", "A banana is on the sofa."],
  ]),
  ...group("Nguyên âm đôi", [
    ["d-ay", "eɪ", "day", "Bắt đầu với lưỡi phía trước ở độ cao vừa rồi nâng nhẹ về /ɪ/. Giữ chuyển động liền trong một âm tiết.", "Không tách thành hai âm tiết rời.", "day|name|late|rain", "Say my name on a rainy day.", "late|let"],
    ["d-eye", "aɪ", "my", "Bắt đầu với miệng mở, lưỡi thấp rồi nâng phần trước lưỡi về /ɪ/; hàm khép dần.", "Không giữ nguyên miệng mở suốt âm.", "my|time|light|five", "My light turns on at five.", "light|late"],
    ["d-oy", "ɔɪ", "boy", "Bắt đầu với môi hơi tròn, lưỡi phía sau rồi chuyển về /ɪ/ và bớt tròn môi.", "Giữ một âm tiết, không thêm âm ở cuối.", "boy|toy|coin|voice", "The boy found a coin.", "boy|buy"],
    ["d-oh", "oʊ", "go", "Bắt đầu với lưỡi phía sau ở độ cao vừa, nâng dần và tròn môi hơn ở cuối âm.", "Trong giọng Mỹ ký hiệu thường là /oʊ/, khác cách ghi /əʊ/ của nhiều giọng Anh.", "go|home|boat|slow", "Go home in the slow boat.", "boat|bought"],
    ["d-ow", "aʊ", "now", "Bắt đầu mở miệng, lưỡi thấp rồi nâng phần sau lưỡi, môi tròn dần về /ʊ/.", "Không bỏ phần chuyển động cuối của âm.", "now|house|brown|mouth", "The brown house is near us.", "now|no"],
  ]),
  ...group("Nguyên âm có r", [
    ["r-stressed", "ɝ", "bird", "Lưỡi hơi cuộn hoặc dồn về giữa tùy người, hai bên lưỡi có thể chạm răng hàm trên. Đầu lưỡi không rung; đọc âm có r trong âm tiết nhấn.", "Không tách bird thành nguyên âm rồi một tiếng r rung riêng.", "bird|her|turn|work", "The bird returns to her.", "bird|bed"],
    ["r-weak", "ɚ", "teacher", "Dùng khẩu hình r tương tự /ɝ/ nhưng đọc nhẹ hơn ở âm tiết không nhấn, như phần cuối teacher.", "Không bỏ r cuối khi đang theo giọng Mỹ có r.", "teacher|water|sister|mother", "My sister is a teacher."],
    ["r-combinations", "", "Các tổ hợp nguyên âm + r", "Giữ nguyên âm rồi chuyển liên tục sang r: car, more, near, care. Nghe từng từ vì nguyên âm trước r có nhiều biến thể vùng miền.", "Không xem /ɪə, eə, ʊə/ kiểu Anh là ba âm bắt buộc riêng trong giọng Mỹ.", "car|more|near|care", "Park the car near the store.", "car|core"],
  ]),
  ...group("Phụ âm", [
    ["c-p", "p", "pen", "Khép hai môi, giữ hơi ngắn rồi mở môi. Ở đầu âm tiết nhấn như pen thường có một luồng hơi bật ra.", "Không thêm nguyên âm ơ sau /p/ cuối từ.", "pen|paper|cup|happy", "Put the paper in the cup.", "pat|bat"],
    ["c-b", "b", "book", "Khép hai môi rồi mở, tạo âm hữu thanh; có thể cảm nhận rung cổ rõ hơn giữa các nguyên âm.", "Không bật hơi mạnh như /p/ đầu âm tiết nhấn.", "book|baby|job|bag", "The baby has a book.", "bat|pat"],
    ["c-t", "t", "tea", "Đầu hoặc phần trước lưỡi chạm vùng ngay sau răng trên, chặn hơi rồi thả ra.", "Âm t giữa nguyên âm có thể thành âm vỗ trong giọng Mỹ; trước hết luyện t rõ.", "tea|top|cat|ten", "Ten cats sit on the mat.", "ten|den"],
    ["c-d", "d", "day", "Chạm lưỡi sau răng trên như /t/, rồi thả ra với âm hữu thanh. Luyện day chậm.", "Không bỏ d cuối hoặc thêm một âm tiết sau nó.", "day|dog|red|door", "The red dog is at the door.", "den|ten"],
    ["c-k", "k", "key", "Nâng phần sau lưỡi chạm vòm mềm, chặn hơi rồi thả ra. Đầu lưỡi không cần chạm răng.", "Giữ động tác khép ở cuối back, không thêm ơ.", "key|cat|back|school", "The key is at the back.", "coat|goat"],
    ["c-g", "ɡ", "go", "Chặn hơi bằng phần sau lưỡi như /k/, rồi thả ra với âm hữu thanh.", "Đừng đọc g trong go giống âm đầu của job.", "go|game|bag|big", "Go and get the big bag.", "goat|coat"],
    ["c-f", "f", "fan", "Răng trên chạm nhẹ môi dưới; thổi hơi liên tục qua khe, cổ không rung.", "Không khép cả hai môi như b hoặc p.", "fan|fine|coffee|leaf", "The fan is near the leaf.", "fan|van"],
    ["c-v", "v", "van", "Răng trên chạm nhẹ môi dưới, cho hơi qua khe và thêm rung cổ.", "Không đổi thành /w/: môi dưới vẫn gần răng trên.", "van|very|seven|love", "Seven vans are very big.", "vest|west"],
    ["c-th", "θ", "think", "Đầu lưỡi chạm nhẹ hoặc nhô giữa răng; thổi hơi liên tục, cổ không rung.", "Đừng chặn hơi thành /t/ hoặc rút lưỡi thành /s/.", "think|thin|three|bath", "I think three things are missing.", "thin|tin"],
    ["c-dh", "ð", "this", "Giữ lưỡi gần răng như /θ/, thêm rung cổ khi hơi đi qua khe.", "Không đóng kín đường hơi như /d/.", "this|that|mother|breathe", "This is my mother.", "they|day"],
    ["c-s", "s", "see", "Lưỡi gần vùng sau răng trên, tạo khe hẹp cho hơi xì liên tục; cổ không rung.", "Không thêm nguyên âm sau /s/ cuối bus.", "see|sun|bus|rice", "We see the sun from the bus.", "sip|zip"],
    ["c-z", "z", "zoo", "Giữ khe hơi như /s/ và thêm rung cổ. Soi gương để không đổi khẩu hình quá nhiều.", "Âm cuối có thể rung yếu, nhưng không nên bỏ hẳn.", "zoo|zip|busy|nose", "The zoo is busy today.", "zip|sip"],
    ["c-sh", "ʃ", "she", "Lưỡi lùi hơn /s/, môi hơi tròn, cho hơi ra liên tục qua khe rộng hơn.", "Không dùng cùng khẩu hình với see.", "she|ship|shoe|fish", "She has a fish on the ship.", "ship|sip"],
    ["c-zh", "ʒ", "vision", "Dùng vị trí lưỡi và môi gần /ʃ/, thêm rung cổ. Tìm âm ở giữa vision và measure.", "Không thêm đoạn chặn hơi đầu như /dʒ/.", "vision|measure|usual|beige", "We measure the usual size."],
    ["c-ch", "tʃ", "chair", "Chặn hơi bằng lưỡi rồi thả ngay thành tiếng xát /ʃ/; hai phần nối rất chặt.", "Không tách t và sh thành hai âm tiết.", "chair|cheese|watch|teacher", "The teacher has a watch.", "cheap|jeep"],
    ["c-j", "dʒ", "job", "Chặn rồi thả hơi thành âm xát hữu thanh; môi hơi tròn, cổ có rung.", "Phân biệt với /ʒ/ vốn không có đoạn chặn đầu.", "job|jeep|orange|bridge", "The jeep is on the bridge.", "jeep|cheap"],
    ["c-h", "h", "hat", "Mở đường hơi ở cổ, thở nhẹ ra rồi chuyển thẳng sang nguyên âm của từ.", "Không tạo tiếng kh mạnh bằng phần sau lưỡi.", "hat|home|hello|behind", "Hello, is he at home?", "heat|eat"],
    ["c-m", "m", "moon", "Khép hai môi, cho âm vang qua mũi, cổ rung. Đặt tay gần mũi để cảm nhận luồng hơi.", "Giữ môi khép ở cuối home, không thêm ơ.", "moon|milk|home|summer", "My mother is at home.", "sum|sun"],
    ["c-n", "n", "name", "Chạm đầu lưỡi vào vùng sau răng trên, cho âm vang qua mũi; môi không cần khép.", "Không đổi âm cuối n thành ng.", "name|nose|sun|dinner", "The sun is near the horizon.", "sin|sing"],
    ["c-ng", "ŋ", "sing", "Nâng phần sau lưỡi chạm vòm mềm, cho hơi qua mũi; đầu lưỡi thả lỏng.", "Sing kết thúc bằng /ŋ/, không tự thêm /ɡ/; finger lại có /ŋɡ/.", "sing|long|ring|singing", "We sing a long song.", "sing|sin"],
    ["c-l", "l", "light", "Đầu lưỡi chạm vùng sau răng trên, hơi đi hai bên lưỡi. Ở cuối từ, phần sau lưỡi thường nâng thêm tạo dark l.", "Không thay âm cuối l bằng nguyên âm hoàn toàn.", "light|leaf|feel|milk", "I feel the light on my face.", "light|right"],
    ["c-r", "ɹ", "right", "Dồn hoặc hơi cuộn lưỡi, đầu lưỡi không chạm vòm; môi có thể hơi tròn. /ɹ/ thường được từ điển viết gọn là /r/.", "Không rung đầu lưỡi nhiều lần; giữ r trong car theo giọng Mỹ.", "right|red|car|rain", "The red car turns right.", "right|light"],
    ["c-w", "w", "we", "Tròn môi và nâng phần sau lưỡi, rồi mở nhanh sang nguyên âm kế tiếp. Không để răng trên chạm môi dưới.", "Đừng đọc thành /v/.", "we|water|win|away", "We want warm water.", "west|vest"],
    ["c-y", "j", "yes", "Nâng phần trước lưỡi gần vòm cứng nhưng không chạm, rồi trượt sang nguyên âm. Đây là âm y trong yes.", "Ký hiệu /j/ không phải âm chữ j trong job.", "yes|yellow|you|year", "Yes, you have a yellow hat.", "year|ear"],
  ]),
  ...group("Âm cuối và biến thể", [
    ["finals", "", "Phụ âm cuối", "Hoàn tất vị trí môi hoặc lưỡi của âm cuối. /p t k/ cuối từ có thể không bật hơi rõ nhưng vẫn có động tác đóng.", "Không thêm ơ để đọc rõ âm cuối.", "cap|cat|back|bag", "Put the bag on the back seat.", "cap|cat"],
    ["clusters", "", "Cụm phụ âm đầu", "Luyện chậm từng cụm rồi nối liền: s + t, s + p, s + k, s + t + r. Trong stop, p/t/k sau s không bật hơi mạnh như đầu từ riêng.", "Không thêm nguyên âm giữa các phụ âm.", "stop|school|spring|street", "Stop at the school on this street."],
    ["final-clusters", "", "Cụm phụ âm cuối", "Luyện từ ngắn rồi mở rộng: desk → desks, next → next time. Giữ đủ động tác dù âm bật hơi có thể rất nhẹ.", "Không bỏ toàn bộ cụm cuối vì khó đọc.", "desks|next|asked|helped", "I asked for the next task."],
    ["suffix-s", "", "Đuôi -s và -es", "Đọc /ɪz/ sau /s z ʃ ʒ tʃ dʒ/; /s/ sau phụ âm vô thanh còn lại; /z/ sau nguyên âm và phụ âm hữu thanh còn lại. Dựa vào âm cuối, không dựa chữ cái.", "Cats, dogs, buses có ba cách đọc đuôi khác nhau.", "cats|dogs|buses|watches", "The dogs watch the cats."],
    ["suffix-ed", "", "Đuôi -ed", "Đọc /ɪd/ sau /t d/; /t/ sau phụ âm vô thanh còn lại; /d/ sau nguyên âm và phụ âm hữu thanh còn lại. Một số tính từ có cách đọc riêng cần tra từ điển.", "Không đọc mọi đuôi ed thành một âm tiết mới.", "wanted|needed|walked|played", "We walked home and played a game."],
    ["flap", "ɾ", "Âm vỗ t/d", "Giữa một nguyên âm nhấn và một nguyên âm không nhấn, t/d thường được đọc bằng một lần chạm lưỡi rất nhanh trong giọng Mỹ: city, water.", "Đây là biến thể của âm, không phải quy tắc đổi mọi chữ t thành d.", "city|water|better|ladder", "The water tastes better here."],
    ["syllabic", "", "Âm tiết với n/l", "Trong button hoặc little, n/l có thể tạo phần trung tâm âm tiết khi nguyên âm giảm rất mạnh. Nghe mẫu rồi nối từ âm trước sang n/l.", "Không bắt buộc chèn nguyên âm mạnh giữa các phụ âm.", "button|little|bottle|sudden", "The little bottle has a cap."],
  ]),
  ...group("Trọng âm và hội thoại", [
    ["word-stress", "ˈ", "Trọng âm từ", "Nhấn một âm tiết nổi bật: TEAcher, baNAna, aBOUT. Dấu ˈ đứng trước âm tiết nhấn; ˌ chỉ trọng âm phụ. Tra từ điển khi gặp từ mới.", "Không áp dụng một vị trí trọng âm cho mọi từ.", "teacher|banana|about|beautiful", "The teacher has a beautiful garden."],
    ["weak-forms", "", "Âm yếu trong câu", "Các từ a, to, of, and thường được đọc nhẹ khi không mang thông tin đối lập. So sánh từ riêng với cả cụm a cup of tea.", "Không làm yếu từ đang được nhấn để đối lập hoặc sửa thông tin.", "a cup of tea|go to school|bread and butter|a glass of water", "I would like a cup of tea."],
    ["sentence-stress", "", "Trọng âm câu", "Chọn từ mang thông tin mới hoặc cần nhấn. Trong I wanted the BLUE one, blue nổi bật vì đang chọn màu. Thay trọng âm có thể thay điều được nhấn mạnh.", "Không đọc tất cả từ mạnh bằng nhau.", "the blue one|my new book|two small bags|come here now", "I wanted the blue one."],
    ["linking", "", "Nối âm và chia cụm", "Chuyển phụ âm cuối thẳng sang nguyên âm đầu từ kế: pick it up, an apple. Ngắt ở ranh giới ý, không ngắt sau mọi từ.", "Không nuốt mất từ khi tăng tốc.", "pick it up|turn it on|an apple|take it out", "Pick it up and put it on the table."],
    ["intonation", "", "Ngữ điệu", "Câu kể trung tính thường xuống giọng; câu hỏi yes/no trung tính thường lên giọng. Câu hỏi wh thường xuống. Ý định và cảm xúc có thể thay đổi đường giọng.", "Đây là xu hướng, không phải luật cứng cho mọi câu hỏi.", "Are you ready?|Where are you going?|I am ready.|Really?", "Are you ready to go?"],
    ["shadowing", "", "Luyện tổng hợp", "Nghe cả câu, chia cụm theo ý, đọc chậm rồi bắt chước nhịp. Tập 3 vòng: nghe, đọc cùng, tự đọc. Giữ rõ từ trước khi tăng tốc.", "Không đánh giá đã chuẩn chỉ vì máy nhận đúng chữ.", "Could you help me?|I would like some water.|Please turn it on.|Thank you for your help.", "Could you help me carry this bag?"],
  ]),
];
export const pronunciationGroups = [...new Set(pronunciationLessons.map((lesson) => lesson.group))];
export const pronunciationLessonIds = pronunciationLessons.map((lesson) => lesson.id);
