import { useEffect } from "react";
import bgImage from "@/assets/wallpaperflare.com_wallpaper.jpg.asset.json";

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
        backgroundImage: `linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15)), url(${bgImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

