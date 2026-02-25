export default function extractInfo() {
  const metadata = document.querySelector(
    ".yt-video-attribute-view-model__metadata",
  );

  if (!metadata) {
    return "No_metadata";
  }

  const songTitle = document.querySelector(
    ".yt-video-attribute-view-model__title",
  ).textContent;

  const artistName = document.querySelector(
    ".yt-video-attribute-view-model__subtitle",
  ).textContent;

  return { songTitle, artistName };
}
