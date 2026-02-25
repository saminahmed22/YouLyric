export default async function fetchLyrics({ songTitle, artistName }) {
  const updatedTitle = songTitle.split(" ").join("+");
  const updatedArtist = artistName.split(" ").join("+");

  const url = `https://lrclib.net/api/search?track_name=${updatedTitle}&artist_name=${updatedArtist}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    if (Object.keys(data).length <= 0) {
      return "couldn't_fetch";
    }
    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
}
