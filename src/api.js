export default async function fetchLyrics(title, author) {
  const updatedTitle = encodeURIComponent(title);
  const updatedAuthor = encodeURIComponent(author);

  const url = `https://lrclib.net/api/search?track_name=${updatedTitle}&artist_name=${updatedAuthor}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "YouLyric v1.0.0 (https://github.com/saminahmed22/YouLyric)",
      },
    });

    const data = await response.json();

    if (Object.keys(data).length <= 0) {
      return 404;
    }

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
}
