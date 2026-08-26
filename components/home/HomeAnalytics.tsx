"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function HomeAnalytics() {
  useEffect(() => {
    track("home_view");
  }, []);
  return null;
}
