"use client";

import Image from "next/image";
import { useState } from "react";
import type { FeedVideo } from "@/lib/content-feeds";

export function YouTubeVideoCard({ video }: { video: FeedVideo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="feed-card">
      <div className="feed-video-frame">
        {playing ? (
          <iframe
            className="feed-video-iframe"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button className="feed-video-play" type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${video.title}`}>
            <Image src={video.thumbnail} alt="" width={480} height={270} />
            <span aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      <div className="feed-card-copy">
        <h3><a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}<span className="sr-only"> (opens in a new tab)</span></a></h3>
        {video.publishedAt ? <time dateTime={video.publishedAt}>{new Date(video.publishedAt).toLocaleDateString("en", { dateStyle: "medium" })}</time> : null}
      </div>
    </article>
  );
}
