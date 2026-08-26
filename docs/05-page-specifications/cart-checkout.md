# Bag, Checkout, Orders

Refero flows: **Adding to Cart**, **Shopping**, Payment Method, Billing.  
Mobbin: checkout, wallet, adding to cart.  
Apple: bag icon, sparse checkout, no clutter.

## Bag drawer / `/bag`

- Line items: image 64, name, variant, Inconsolata qty, remove
- Subtotal, estimated GST dummy, shipping `Calculated at pincode`
- Primary: **Checkout**
- Continue shopping → last family

Mini recommendations: 2 Soma pairings, not a product dump.

## Checkout `/checkout` (Phase 3; mock in Phase 2)

Steps (one page with chapters, not 5-page wizard):

1. Contact (email/phone)
2. Delivery (pincode first — India)
3. Address
4. Payment (Razorpay UPI / cards / netbanking; COD flag per pincode later)
5. Review

Always show order summary sticky on the right (desktop).

No account required for dummy checkout; offer **Save this mill account**.

Legal: T&C, dummy cancellation.

## Thank you

Inconsolata lot-style order id `RM-ORD-XXXX`.  
Triad line: `Dakshya in the pack. Prateet on the invoice. Soma at your door.`

## Account orders

List: date, id, status chips (Milling dummy / Packed / Shipped / Delivered).  
PDP-like typewriter for invoice fields.

## Failure states

Payment fail: keep bag, forest retry. Never clear the bag on Razorpay dismiss.

## Analytics

`bag_view`, `checkout_start`, `checkout_step`, `purchase` (or `dummy_purchase`), `payment_fail`
