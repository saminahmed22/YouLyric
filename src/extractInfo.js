export default function extractInfo() {
  const songTitle =
    document.querySelector(".ytVideoAttributeViewModelTitle")?.textContent ||
    "";

  const artistName =
    document.querySelector(".ytVideoAttributeViewModelSubtitle")?.textContent ||
    "";

  return { songTitle, artistName };
}
