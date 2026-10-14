"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: site.timeZone,
});

/** Local time on the bench (Islamabad). Renders a stable placeholder on the server. */
export function Clock({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="text-dim">ISB&nbsp;</span>
      <time className="tabular-nums" suppressHydrationWarning>
        {now ?? "--:--:--"}
      </time>
      <span className="text-dim">&nbsp;{site.tzLabel}</span>
    </span>
  );
}
