export type ShortAudioRecording = {
  stop: () => void;
  cancel: () => void;
};

function supportedMimeType() {
  if (!("MediaRecorder" in window)) return "";
  return ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"]
    .find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

export async function startShortAudioRecording(
  onComplete: (audio: Blob) => void,
  onError: () => void,
  maxDurationMs = 8_000,
): Promise<ShortAudioRecording | null> {
  if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) return null;
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
  } catch {
    onError();
    return null;
  }

  const mimeType = supportedMimeType();
  const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
  const chunks: Blob[] = [];
  let cancelled = false;
  let timer = 0;
  const closeStream = () => stream.getTracks().forEach((track) => track.stop());

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  };
  recorder.onerror = () => {
    cancelled = true;
    window.clearTimeout(timer);
    closeStream();
    onError();
  };
  recorder.onstop = () => {
    window.clearTimeout(timer);
    closeStream();
    if (cancelled) return;
    const audio = new Blob(chunks, { type: recorder.mimeType || mimeType || "audio/webm" });
    if (audio.size < 200) onError();
    else onComplete(audio);
  };
  recorder.start(250);
  timer = window.setTimeout(() => {
    if (recorder.state === "recording") recorder.stop();
  }, maxDurationMs);

  return {
    stop: () => {
      if (recorder.state === "recording") recorder.stop();
    },
    cancel: () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (recorder.state === "recording") recorder.stop();
      else closeStream();
    },
  };
}
