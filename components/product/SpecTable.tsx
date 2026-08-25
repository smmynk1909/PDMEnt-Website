import type { Product, Variant } from "@/types";
import { variantNetQty } from "@/lib/format";

const HEAT_LABEL = ["None", "Whisper", "Low", "Medium", "High", "Fierce"];

export function SpecTable({
  product,
  variant,
}: {
  product: Product;
  variant: Variant;
}) {
  const origin = product.originRegion
    ? `${product.originCountry} (${product.originRegion})`
    : product.originCountry;

  const rows: [string, string][] = [
    ["SKU", variant.sku],
    ["Net qty", variantNetQty(variant)],
    ["Origin", origin],
    ["Form", product.form ? product.form[0].toUpperCase() + product.form.slice(1) : "—"],
    ["Heat", HEAT_LABEL[product.heat] ?? "None"],
    ["Best before", "12 months (dummy)"],
    ["Veg", product.veg ? "Yes (green dot)" : "No"],
    ["Vendor", product.vendorId],
  ];

  return (
    <table className="spec-table">
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th scope="row">{k}</th>
            <td>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
