import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AudioAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startSingingBowl = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Base calming drone (108Hz & 216Hz - peaceful resonant frequency)
      const droneOsc1 = ctx.createOscillator();
      const droneOsc2 = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.05, ctx.currentTime);

      droneOsc1.type = 'sine';
      droneOsc1.frequency.setValueAtTime(108, ctx.currentTime); // Deep resonant low

      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(162, ctx.currentTime); // 5th harmonic warmth

      droneOsc1.connect(droneGain);
      droneOsc2.connect(droneGain);
      droneGain.connect(masterGain);

      droneOsc1.start();
      droneOsc2.start();

      // Periodic singing bowl strike simulation
      const strikeBowl = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = audioCtxRef.current.currentTime;
        const bowlOsc = audioCtxRef.current.createOscillator();
        const bowlGain = audioCtxRef.current.createGain();

        // Fundamental frequencies of Himalayan singing bowls (~432Hz / 528Hz)
        const freqs = [432, 576, 648, 864];
        const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];

        bowlOsc.type = 'sine';
        bowlOsc.frequency.setValueAtTime(chosenFreq, now);

        // Gentle exponential decay envelope
        bowlGain.gain.setValueAtTime(0.0001, now);
        bowlGain.gain.linearRampToValueAtTime(0.04, now + 0.05);
        bowlGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        bowlOsc.connect(bowlGain);
        bowlGain.connect(masterGain);

        bowlOsc.start(now);
        bowlOsc.stop(now + 6.0);
      };

      // Initial chime
      strikeBowl();
      // Strike every 7 seconds
      intervalRef.current = window.setInterval(strikeBowl, 7000);

      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio could not start automatically', e);
    }
  };

  const stopSingingBowl = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSingingBowl();
    } else {
      startSingingBowl();
    }
  };

  useEffect(() => {
    return () => {
      stopSingingBowl();
    };
  }, []);

  return (
    <button
      id="soundscape-toggle-btn"
      onClick={toggleSound}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs tracking-wide transition-all duration-300 ${
        isPlaying
          ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
          : 'bg-white/90 backdrop-blur-xs text-stone-700 border-stone-200 hover:border-stone-300 hover:text-stone-900 shadow-2xs'
      }`}
      title={isPlaying ? 'Mute Himalayan Singing Bowl Soundscape' : 'Turn on Himalayan Singing Bowl Soundscape for focus'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-[#D95338] rounded-full animate-pulse" />
            <span className="w-0.5 h-2 bg-[#D95338] rounded-full animate-pulse delay-75" />
            <span className="w-0.5 h-3.5 bg-[#D95338] rounded-full animate-pulse delay-150" />
          </div>
          <span className="font-medium whitespace-nowrap">Himalayan Resonance: On</span>
          <Volume2 className="w-3.5 h-3.5 text-[#D95338]" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-colors" />
          <span className="whitespace-nowrap flex items-center gap-1 font-medium">
            Focus Soundscape <Sparkles className="w-3 h-3 text-[#D95338]" />
          </span>
        </>
      )}
    </button>
  );
};
