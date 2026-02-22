export default async function fetchLyrics(title, author) {
  const updatedTitle = title.split(" ").join("+");
  const updatedAuthor = author.split(" ").join("+");

  const url = `https://lrclib.net/api/search?track_name=${updatedTitle}&artist_name=${updatedAuthor}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    if (Object.keys(data).length <= 0) {
      return 404;
    }

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
}
