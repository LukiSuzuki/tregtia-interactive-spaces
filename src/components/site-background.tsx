import bgImage from "@/assets/wallpaperflare.com_wallpaper.jpg.asset.json";

export function SiteBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${bgImage.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
