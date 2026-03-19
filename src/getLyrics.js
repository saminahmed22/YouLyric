import extractInfo from "./extractInfo.js";
import fetchLyrics from "../public/background.js";

import getDB from "./indexedDB.js";

export default async function getLyrics(
  setLyrics,
  status,
  setStatus,
  videoInfo,
) {
  // this function should not be running if the status is not set to "fetching",
  // but due to the useEffect in the AppContent, it will get called everytime the
  // component gets re-rendered, as it only gets re-rendered when status updates and it's an dependency.
  if (status !== "fetching") {
    return;
  }

  const isManuallyTyped = videoInfo.manuallyTyped;

  let songInfo;
  const db = getDB();
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
      songInfo = extractInfo();
    }
  }

  if (songInfo === "no_metadata") {
    setStatus("manual_search");
    return;
  }

  const response = await fetchLyrics(songInfo);

  // When the fetching process fails, due to the metadata having junk it in, or not having a metadata at all,
  // it will call manual search, this block will also call manual search if the user given info is incorrect
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

  return uniqueArr.length > 0
    ? uniqueArr
    : ["No lyrics are available for this track; it is likely an instrumental."];
}
