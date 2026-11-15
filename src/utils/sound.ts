let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.08,
  delay = 0
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainPeak, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function playClickSound(muted: boolean) {
  if (muted) return;
  playTone(540, 0.06, 'triangle', 0.06);
}

export function playCorrectSound(muted: boolean) {
  if (muted) return;
  playTone(587.33, 0.1, 'triangle', 0.08, 0);
  playTone(880, 0.16, 'triangle', 0.09, 0.06);
}

export function playWrongSound(muted: boolean) {
  if (muted) return;
  playTone(260, 0.14, 'sawtooth', 0.05, 0);
  playTone(196, 0.18, 'sawtooth', 0.05, 0.09);
}

export function playCompleteSound(muted: boolean) {
  if (muted) return;
  playTone(523.25, 0.12, 'triangle', 0.08, 0);
  playTone(659.25, 0.12, 'triangle', 0.08, 0.09);
  playTone(783.99, 0.14, 'triangle', 0.08, 0.18);
  playTone(1046.5, 0.28, 'triangle', 0.09, 0.27);
}
