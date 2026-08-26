export function EmptySoma({
  message,
  onClear,
}: {
  message: string;
  onClear?: () => void;
}) {
  return (
    <div className="empty-soma">
      <p>{message}</p>
      {onClear ? (
        <button
          type="button"
          className="pill ghost small"
          style={{ marginTop: 12 }}
          onClick={onClear}
        >
          Clear filters
        </button>
      ) : null}
    </div>
  );
}
