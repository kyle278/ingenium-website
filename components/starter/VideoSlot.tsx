"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

import { EXPLAINER_VIDEO } from "@/lib/starter-website";
import { useStarter } from "./StarterProvider";
import { trackStarter } from "./track";

/**
 * Hero explainer. It tries to start with sound; browsers usually block sound until the visitor
 * has interacted, so it then plays muted with a "Tap for sound", and the first tap or key press
 * anywhere on the page turns the sound on. Reduced-motion visitors get the poster and a play button.
 */
export default function VideoSlot() {
  const video = useRef<HTMLVideoElement>(null);
  const { formOpen } = useStarter();
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const [ended, setEnded] = useState(false);
  const userMuted = useRef(false);
  const resumeAfterForm = useRef(false);
  const tracked = useRef({ play: false, half: false });

  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      return v.play();
    }).catch(() => { /* Autoplay fully blocked: the play button stays visible. */ });

    function unmuteOnFirstInteraction(event: Event) {
      const target = event.target as Element | null;
      if (target?.closest?.(".starter-video-controls")) return; // those buttons handle themselves
      document.removeEventListener("pointerdown", unmuteOnFirstInteraction, true);
      document.removeEventListener("keydown", unmuteOnFirstInteraction, true);
      if (!v || userMuted.current || !v.muted) return;
      v.muted = false;
      trackStarter("starter_video_unmute", { method: "page" });
    }
    document.addEventListener("pointerdown", unmuteOnFirstInteraction, true);
    document.addEventListener("keydown", unmuteOnFirstInteraction, true);
    return () => {
      document.removeEventListener("pointerdown", unmuteOnFirstInteraction, true);
      document.removeEventListener("keydown", unmuteOnFirstInteraction, true);
    };
  }, []);

  // Pause behind the qualification form, then carry on where it left off.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (formOpen && !v.paused) { resumeAfterForm.current = true; v.pause(); }
    if (!formOpen && resumeAfterForm.current) { resumeAfterForm.current = false; v.play().catch(() => {}); }
  }, [formOpen]);

  function toggleSound() {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    userMuted.current = v.muted;
    if (!v.muted) {
      trackStarter("starter_video_unmute", { method: "button" });
      if (v.paused) v.play().catch(() => {});
    }
  }

  function togglePlay() {
    const v = video.current;
    if (!v) return;
    if (v.ended) v.currentTime = 0;
    if (v.paused) v.play().catch(() => {}); else v.pause();
  }

  return (
    <div className="starter-video">
      <video
        ref={video}
        poster={EXPLAINER_VIDEO.poster}
        playsInline
        preload="metadata"
        aria-label="How the Starter Website works: a 40-second explainer"
        onClick={togglePlay}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onPlay={(e) => {
          setPaused(false); setEnded(false); setMuted(e.currentTarget.muted);
          if (!tracked.current.play) { tracked.current.play = true; trackStarter("starter_video_play", { muted: String(e.currentTarget.muted) }); }
        }}
        onPause={() => setPaused(true)}
        onEnded={() => { setEnded(true); trackStarter("starter_video_complete"); }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!tracked.current.half && v.duration && v.currentTime / v.duration >= 0.5) { tracked.current.half = true; trackStarter("starter_video_50"); }
        }}
      >
        <source src={EXPLAINER_VIDEO.mobileSrc} type="video/mp4" media="(max-width: 899px)" />
        <source src={EXPLAINER_VIDEO.src} type="video/mp4" />
      </video>

      {paused && !ended && (
        <button type="button" className="starter-video-play" onClick={togglePlay} aria-label="Play the explainer video">
          <Play size={30} fill="currentColor" aria-hidden="true" />
        </button>
      )}

      <div className="starter-video-controls">
        {ended ? (
          <button type="button" onClick={togglePlay}><RotateCcw size={18} aria-hidden="true" />Watch again</button>
        ) : (
          <>
            <button type="button" className={muted ? "is-prompt" : ""} onClick={toggleSound} aria-label={muted ? undefined : "Mute"}>
              {muted ? <><VolumeX size={18} aria-hidden="true" />Tap for sound</> : <Volume2 size={18} aria-hidden="true" />}
            </button>
            {!paused && (
              <button type="button" onClick={togglePlay} aria-label="Pause"><Pause size={18} aria-hidden="true" /></button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
