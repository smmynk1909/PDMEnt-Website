import { formatInr } from "@/lib/format";

export function Price({
  amount,
  from = false,
  className,
}: {
  amount: number;
  from?: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      {from ? "From " : ""}
      {formatInr(amount)}
    </span>
  );
}
