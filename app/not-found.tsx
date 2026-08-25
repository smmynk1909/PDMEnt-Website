import Link from "next/link";

export default function NotFound() {
  return (
    <div className="commerce-page" style={{ textAlign: "center", padding: "120px 22px" }}>
      <p className="triad">Dakshya · Prateet · Soma</p>
      <h1>This aisle is empty.</h1>
      <p className="mono" style={{ color: "var(--rm-ink-soft)", marginTop: 8 }}>
        The page you looked for is not in the mill.
      </p>
      <Link href="/" className="pill" style={{ marginTop: 20 }}>
        Back to Roots and Mills
      </Link>
    </div>
  );
}
