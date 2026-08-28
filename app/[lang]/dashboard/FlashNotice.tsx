"use client";

import { useEffect } from "react";

type FlashNoticeProps = {
  param: "import" | "alerts";
  message: string;
  className: string;
};

export function FlashNotice({ param, message, className }: FlashNoticeProps) {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(param)) {
      return;
    }
    url.searchParams.delete(param);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [param]);

  return (
    <p className={className} role="status">
      {message}
    </p>
  );
}
