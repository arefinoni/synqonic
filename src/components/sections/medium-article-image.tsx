"use client";

import Image from "next/image";
import { useState } from "react";

export function MediumArticleImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`article-image${failed ? " article-image-placeholder" : ""}`} aria-hidden="true">
      {failed ? <span>Synqonic · Field notes</span> : <Image src={src} alt="" width={320} height={180} onError={() => setFailed(true)} />}
    </div>
  );
}
