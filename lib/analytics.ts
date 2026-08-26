// Thin analytics wrapper (docs/10). v1 sink is a console/no-op; the event
// names match the specs so a real sink (PostHog) can be swapped in later.

export type AnalyticsProps = Record<string, unknown>;

export function track(event: string, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug(`[track] ${event}`, props);
  }
  // Real sink (PostHog / /api/events) lands in a later phase.
}
