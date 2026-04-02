import fetchLyrics from "../public/background.js";

import getDB from "./indexedDB.js";

export default async function getLyrics(setLyrics, setStatus, videoInfo) {
  const db = getDB();

  const isManuallyTyped = videoInfo.manuallyTyped;

  let songInfo;

  if (isManuallyTyped) {
    songInfo = {
      songTitle: videoInfo.songTitle,
      artistName: videoInfo.artistName,
    };
  } else {
    const record = await db.videos.get(videoInfo.videoID);

    if (record) {
      songInfo = {
        songTitle: record.songTitle,
        artistName: record.artistName,
      };
    } else {
      songInfo = {
        songTitle: videoInfo.songTitle,
        artistName: videoInfo.artistName,
      };
    }
  }

  if (songInfo === "no_metadata") {
    setStatus("manual_search");
    return;
  }

  const response = await fetchLyrics(songInfo);

  if (response === "failed") {
    setStatus("manual_search");
    return;
  }

  const fileredResponse = filterLyrics(response);

  setLyrics({
    fetched: true,
    fetchedLyrics: fileredResponse,
    currentlySelectedLyrics: 0,
    lyricsCount: fileredResponse?.length ?? 0,
  });

  if (isManuallyTyped) {
    const data = {
      videoID: videoInfo.videoID,
      songTitle: videoInfo.songTitle,
      artistName: videoInfo.artistName,
    };

    db.videos.put(data);
  }

  setStatus("mount");
}

// Fiters the empty string, random cursed Portugese strings and duplicates
function filterLyrics(arr) {
  const isInstrumental = arr[0].instrumental;
  if (isInstrumental) {
    return [
      "No lyrics are available for this track; it is likely an instrumental.",
    ];
  }

  const lyricArr = [];

  arr.forEach((obj) => {
    const lyrics = obj?.plainLyrics ?? "";

    const cursedPortugeses = [
      "as letras nao estao sincronizadas com a musica",
      "a letra nao esta sincronizada com a musica",
    ];

    if (!cursedPortugeses.includes(lyrics) && lyrics?.length > 5) {
      lyricArr.push(lyrics);
    }
  });

  const uniqueArr = [...new Set(lyricArr)];

  return uniqueArr;
}
