export default function VideoBg() {
  return (
    <div className="og2-video" aria-hidden="true">
      <iframe
        src="https://www.youtube.com/embed/VkBnNxneA_A?autoplay=1&mute=1&loop=1&playlist=VkBnNxneA_A&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&playsinline=1"
        allow="autoplay; encrypted-media"
        title="Background video"
        tabIndex={-1}
      />
    </div>
  );
}
