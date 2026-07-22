import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildPreschoolLessons, getPreschoolScene, preschoolSentenceImageUrl, preschoolVocabularyImageUrl } from "./preschool-content";

const expectedWords: Record<string, string[]> = {
  hello: [],
  family: ["mum", "dad", "grandma", "grandpa"],
  school: ["bag", "book", "pencil", "crayon"],
  feelings: ["happy", "sleepy", "hungry", "thirsty"],
  toys: ["ball", "car", "doll", "teddy"],
  colors: ["red", "green", "blue", "yellow"],
  body: ["head", "arms", "hands", "legs"],
  face: ["ears", "eyes", "nose", "mouth"],
  shapes: ["circle", "square", "triangle", "rectangle"],
  clothes: ["shirt", "skirt", "pants", "shoes"],
  fruit: ["apple", "orange", "banana", "lime"],
  drinks: ["water", "milk", "juice", "coke"],
  snacks: ["cookie", "cake", "jelly", "ice cream"],
  "in-the-room": ["bed", "table", "chair", "TV"],
  "at-home": ["eat", "play", "paint", "watch"],
  "i-can": ["dance", "sing", "draw", "read"],
  pets: ["dog", "cat", "fish", "bird"],
  "the-farm": ["duck", "chicken", "pig", "cow"],
  "the-zoo": ["monkey", "tiger", "zebra", "bear"],
  "the-park": ["playground", "seesaw", "slide", "swing"],
};

const expectedSentences: Record<string, string[]> = {
  hello: ["Hello.", "What's your name?", "I'm Lisa.", "Goodbye."],
  family: ["Who's this?", "It's my mum.", "It's my dad.", "It's my grandma.", "It's my grandpa."],
  feelings: ["Are you happy?", "Yes, I am.", "Are you hungry?", "No, I'm not."],
  toys: ["What's this?", "It's a ball.", "It's a car.", "It's a doll.", "It's a teddy."],
  colors: ["What color is it?", "It's blue.", "This is a red car."],
  face: ["What's this?", "It's my nose.", "What are these?", "They're my eyes."],
  shapes: ["This is a circle.", "This is a triangle.", "Is it a square?", "Yes, it is.", "Is it a triangle?", "No, it isn't. It's a rectangle."],
  clothes: ["This is my shirt.", "This is your skirt.", "These are my pants.", "These are your shoes."],
  fruit: ["I like apples.", "I like oranges.", "I don't like bananas.", "I don't like limes."],
  drinks: ["Do you like juice?", "Yes, I do.", "Do you like coke?", "No, I don't."],
  "at-home": ["What are you doing?", "I'm eating an apple.", "What are you doing?", "I'm playing with my toys."],
  "the-farm": ["Is it a duck?", "Is it a cow?", "Yes, it is.", "No, it isn't."],
  "the-zoo": ["What's that?", "It's a tiger.", "What are those?", "They're bears."],
};

describe("preschool curriculum aligned to the public reference outline", () => {
  it("uses the exact four-word lists and only the lesson sections present in each unit", () => {
    for (const [slug, words] of Object.entries(expectedWords)) {
      const scene = getPreschoolScene(slug);
      expect(scene?.words.map(([word]) => word), `words ${slug}`).toEqual(words);
      const lessons = buildPreschoolLessons({ slug, theme: slug });
      const expectedLessonSlugs = [words.length ? "tu-vung" : null, expectedSentences[slug] ? "mau-cau" : null].filter(Boolean);
      expect(lessons.map((lesson) => lesson.slug), `sections ${slug}`).toEqual(expectedLessonSlugs);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);

      const vocabularyLesson = lessons.find((lesson) => lesson.slug === "tu-vung");
      if (vocabularyLesson) {
        expect(vocabularyLesson.activities).toHaveLength(5);
        expect(vocabularyLesson.activities.slice(0, 4).every((activity) => activity.payload.imageUrl === preschoolVocabularyImageUrl(slug) && typeof activity.payload.spriteIndex === "number" && activity.payload.audioText)).toBe(true);
      }
    }
  });

  it("uses the exact public sentence lists without adding sections to word-only units", () => {
    for (const slug of Object.keys(expectedWords)) {
      const lessons = buildPreschoolLessons({ slug, theme: slug });
      const sentenceLesson = lessons.find((lesson) => lesson.slug === "mau-cau");
      const actual = sentenceLesson?.activities.map((activity) => activity.payload.front) || [];
      expect(actual, `sentences ${slug}`).toEqual(expectedSentences[slug] || []);
      expect(sentenceLesson?.activities.every((activity) => activity.payload.mode === "AUDIO_GUESS" && !("options" in activity.payload)) ?? true).toBe(true);
      expect(sentenceLesson?.activities.every((activity, index) => activity.payload.imageUrl === preschoolSentenceImageUrl(slug) && activity.payload.spriteIndex === index) ?? true).toBe(true);
    }
  });
});
