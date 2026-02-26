import extractInfo from "./extractInfo.js";
import fetchLyrics from "../public/background.js";

export default async function getLyrics(
  setLyrics,
  setFetched,
  manuallyTypedInfo = null,
) {
  setFetched("fetching");

  const songInfo = manuallyTypedInfo ? manuallyTypedInfo : extractInfo();

  if (songInfo === "No_metadata") {
    setFetched("No_metadata");
  }

  const response = await fetchLyrics(songInfo);

  if (response === "couldn't_fetch") {
    setFetched("couldn't_fetch");
  } else {
    filterLyrics(response);
    setFetched("fetched_successfully");
  }

  const fileredResponse = filterLyrics(response);

  setLyrics({
    fetchedLyrics: fileredResponse,
    currentlySelectedLyrics: 0,
    lyricsCount: fileredResponse.length,
  });
}

// Fiters the empty string, random Portugese strings and duplicates
function filterLyrics(arr) {
  const lyricArr = [];
  arr.forEach((obj) => {
    const lyrics = obj.plainLyrics;
    const cursedPortugeses = [
      "as letras nao estao sincronizadas com a musica",
      "a letra nao esta sincronizada com a musica",
    ];

    if (!cursedPortugeses.includes(lyrics) && lyrics.length > 5) {
      lyricArr.push(lyrics);
    }
  });
  return [...new Set(lyricArr)];
}
