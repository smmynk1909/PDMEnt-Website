"use client";

import { useState } from "react";
import type { Product } from "@/types";

export function PdpGallery({ product }: { product: Product }) {
  const { bg, accent, alt } = product.image;
  // Dummy "views" derived from the two brand colours for the tin.
  const views = [bg, accent, `${bg}cc`, `${accent}cc`];
  const [active, setActive] = useState(0);

  return (
    <div className="gallery">
      <div className="main" style={{ background: `${bg}22` }} role="img" aria-label={alt}>
        <span className="tin" style={{ background: views[active] }} />
      </div>
      <div className="thumbs">
        {views.map((c, i) => (
          <button
            key={i}
            type="button"
            className={active === i ? "on" : undefined}
            style={{ background: `${c}22` }}
            aria-label={`View ${i + 1}`}
            onClick={() => setActive(i)}
          >
            <span className="tin" style={{ background: c }} />
          </button>
        ))}
      </div>
    </div>
  );
}
