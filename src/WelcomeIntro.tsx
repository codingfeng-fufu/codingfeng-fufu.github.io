import { useEffect, useState } from "react";

const sessionKey = "zf-welcome-seen";
const introPreview = import.meta.env.DEV
  ? new URLSearchParams(window.location.search).get("intro")
  : null;

export function shouldShowWelcome() {
  if (window.location.hash || new URLSearchParams(window.location.search).has("project")) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (introPreview === "replay" || introPreview === "hold") return true;
  try { return sessionStorage.getItem(sessionKey) !== "1"; } catch { return true; }
}

export default function WelcomeIntro({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { sessionStorage.setItem(sessionKey, "1"); } catch { /* Storage may be unavailable. */ }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setLeaving(true); };
    window.addEventListener("keydown", escape);
    // A failed or slow image must never block entry to the site.
    const fallback = introPreview === "hold" ? undefined : window.setTimeout(() => setLeaving(true), 4500);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!ready || introPreview === "hold") return;
    const timer = window.setTimeout(() => setLeaving(true), 2400);
    return () => window.clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(onComplete, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1500);
    return () => window.clearTimeout(timer);
  }, [leaving, onComplete]);

  return <section className={`welcome-intro${ready ? " is-ready" : ""}${leaving ? " is-leaving" : ""}`} role="dialog" aria-modal="true" aria-label="Welcome to Zonglin Feng’s homepage">
    <span className="welcome-signature" aria-hidden="true">ZF /</span>
    <div className="welcome-content">
      <img src="./assets/mascot-transparent-coffee.webp" width="700" height="700" alt="My personal mascot enjoying a coffee" fetchPriority="high" onLoad={() => setReady(true)} onError={() => setLeaving(true)} />
      <div className="welcome-greeting"><p>Hi, I’m Zonglin.</p><span>你好，欢迎来坐坐。</span></div>
      <span className="welcome-line" aria-hidden="true" />
    </div>
    <button className="welcome-skip" autoFocus onClick={() => setLeaving(true)}>Skip intro <span aria-hidden="true">↗</span></button>
  </section>;
}
