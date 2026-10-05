"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import { EXPLAINER_YOUTUBE_ID } from "@/lib/starter-website";
import PhoneMockup from "./PhoneMockup";
import { trackStarter } from "./track";

/**
 * 16:9 hero slot. Until the explainer exists it shows a still example site on a phone,
 * with no play button. With a video id, YouTube (privacy-enhanced) loads only on tap.
 */
export default function VideoSlot() {
  const [playing, setPlaying] = useState(false);

  if (!EXPLAINER_YOUTUBE_ID) {
    return (
      <div className="starter-video starter-video-still">
        <PhoneMockup kind="electrician" priority />
      </div>
    );
  }

  if (playing) {
    return (
      <div className="starter-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${EXPLAINER_YOUTUBE_ID}?autoplay=1&mute=1&cc_load_policy=1&rel=0&playsinline=1`}
          title="How the Starter Website works"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="starter-video starter-video-poster" onClick={() => { setPlaying(true); trackStarter("starter_video_play"); }}>
      {/* Local poster: nothing loads from YouTube until the visitor taps play. */}
      <PhoneMockup kind="electrician" />
      <span className="starter-video-play"><Play size={28} fill="currentColor" aria-hidden="true" /></span>
      <span className="sr-only">Play the explainer video (sound off, captions on)</span>
    </button>
  );
}
