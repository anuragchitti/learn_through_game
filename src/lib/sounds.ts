// Tiny Web Audio API sound synthesizer — no external files needed
// All functions are SSR-safe (check typeof window before using AudioContext)

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx || ctx.state === "closed") {
    try {
      ctx = new AudioContext();
    } catch {
      return null;
    }
  }
  return ctx;
}

function playTone(
  frequency: number,
  type: OscillatorType,
  startTime: number,
  duration: number,
  gainPeak: number,
  audioCtx: AudioContext
) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainPeak, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

/** Short ascending chime — played when hero collects a gem */
export function playGemCollect(): void {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  playTone(880, "sine", now, 0.15, 0.3, audioCtx);
  playTone(1320, "sine", now + 0.08, 0.15, 0.2, audioCtx);
}

/** Triumphant 3-note arpeggio — played on level complete */
export function playLevelComplete(): void {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  playTone(523, "triangle", now, 0.2, 0.4, audioCtx);       // C5
  playTone(659, "triangle", now + 0.15, 0.2, 0.4, audioCtx); // E5
  playTone(784, "triangle", now + 0.3, 0.35, 0.5, audioCtx); // G5
}

/** Low thud — played on error or hero death */
export function playError(): void {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  playTone(120, "sawtooth", now, 0.25, 0.35, audioCtx);
  playTone(80, "sawtooth", now + 0.05, 0.2, 0.2, audioCtx);
}

/** Short hit sound — played on each ATTACK command */
export function playAttack(): void {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  playTone(220, "square", now, 0.08, 0.25, audioCtx);
  playTone(180, "square", now + 0.04, 0.1, 0.15, audioCtx);
}
