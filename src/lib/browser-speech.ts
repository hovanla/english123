export type EnglishSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: (event: { results: ArrayLike<{ 0: { transcript: string; confidence?: number } }> }) => void;
  onerror: () => void;
  onend?: () => void;
  start: () => void;
};

type SpeechBrowserWindow = Window & {
  SpeechRecognition?: new () => EnglishSpeechRecognition;
  webkitSpeechRecognition?: new () => EnglishSpeechRecognition;
};

function preferredEnglishVoice(voices: SpeechSynthesisVoice[]) {
  const preferredNames = [
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Jenny Online (Natural) - English (United States)",
    "Google US English",
    "Samantha",
  ];
  return preferredNames.map((name) => voices.find((voice) => voice.name === name)).find(Boolean)
    ?? voices.find((voice) => voice.lang.toLowerCase() === "en-us")
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en-"))
    ?? null;
}

export function speakEnglish(text: string) {
  if (!text || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  utterance.pitch = 1;
  const voice = preferredEnglishVoice(window.speechSynthesis.getVoices());
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function startEnglishRecognition(onResult: (transcript: string, confidence?: number) => void, onError: () => void) {
  const speechWindow = window as SpeechBrowserWindow;
  const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
  if (!Recognition) return false;
  const recognition = new Recognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event) => onResult(event.results[0][0].transcript, event.results[0][0].confidence);
  recognition.onerror = onError;
  recognition.start();
  return true;
}
