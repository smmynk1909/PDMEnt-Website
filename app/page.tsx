import Link from "next/link";
import { getFeatured, getAllReviews } from "@/lib/catalog";
import { LineupCard } from "@/components/category/LineupCard";
import { HomeAnalytics } from "@/components/home/HomeAnalytics";
import { FamilyLockups } from "@/components/home/FamilyLockups";

export default function HomePage() {
  const featured = getFeatured(4);
  const voices = getAllReviews().slice(0, 6);

  return (
    <>
      <HomeAnalytics />

      <section className="hero">
        <p className="triad">Dakshya · Prateet · Soma</p>
        <h1>Roots and Mills</h1>
        <p className="gloss">
          Mastery · Trust · Calm — a brand of PDM Enterprises
          <br />
          Pratik, Daxesh &amp; Mayank
        </p>
        <div className="hero-cta">
          <Link className="pill" href="/masalas">
            Shop masalas
          </Link>
          <Link className="pill ghost" href="#families">
            Explore the mill
          </Link>
        </div>
      </section>

      <section className="block wrap" id="families">
        <h2 className="section-head">Five families</h2>
        <p className="section-sub">
          One calm nav weight for each. Choose where the kitchen starts.
        </p>
        <FamilyLockups />
      </section>

      <section className="block wrap">
        <h2 className="section-head">From the mill.</h2>
        <p className="section-sub mono">
          This week&apos;s dummy lots — for view, not yet the warehouse.
        </p>
        <div className="row">
          {featured.map((p) => (
            <LineupCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      <section className="block wrap">
        <h2 className="section-head">Dakshya · Prateet · Soma</h2>
        <div className="triad-grid">
          <div className="triad-col">
            <div className="pillar">Dakshya</div>
            <div className="en">Mastery</div>
            <p>
              Milled for the job — colour strength, grind, roast or press decided
              before bulk. The craft is in the choosing.
            </p>
          </div>
          <div className="triad-col">
            <div className="pillar">Prateet</div>
            <div className="en">Trust</div>
            <p>
              Every lot carries a code, a screen, and an honest spec. No fillers,
              no painted colour — what the pack says is what the mill made.
            </p>
          </div>
          <div className="triad-col">
            <div className="pillar">Soma</div>
            <div className="en">Calm</div>
            <p>
              Close the tin. A pinch in the pan. No ceremony, no rush — the
              kitchen stays quiet.
            </p>
          </div>
        </div>
      </section>

      <section className="block wrap">
        <h2 className="section-head">Voices</h2>
        <div className="filmstrip">
          {voices.map((r) => (
            <article className="review-card" key={r.id}>
              <div className="stars">{"★".repeat(r.rating)}</div>
              <h4>{r.title}</h4>
              <p>{r.body}</p>
              <p className="who">
                {r.author} · {r.city}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
