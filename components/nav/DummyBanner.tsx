export function DummyBanner({
  text = "Viewing dummy mill lots. Orders will be enabled in Phase 3.",
}: {
  text?: string;
}) {
  return <div className="banner">{text}</div>;
}
