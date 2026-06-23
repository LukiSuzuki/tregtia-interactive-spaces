import { useEffect } from "react";

const bgUrl = "/images/wallpaper.jpg";

export function SiteBackground() {
  useEffect(() => {
    const original = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "transparent";
    return () => {
      document.body.style.backgroundColor = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

