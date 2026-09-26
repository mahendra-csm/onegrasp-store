// Stock footage: "Researcher Looking Through a Microscope" by RDNE Stock project (Pexels, free licence).
export default function VideoBg() {
  return (
    <div className="og2-video" aria-hidden="true">
      <video src="/videos/researcher.mp4" autoPlay muted loop playsInline preload="auto" />
    </div>
  );
}
