import { useContext } from "react";
import { AppContext } from "../../context";

import styles from "./Lyric.module.css";

export default function Lyric() {
  const { lyrics, fontSize } = useContext(AppContext);

  const currentLyricsIndex = lyrics.currentlySelectedLyrics;
  const currentLyrics = lyrics.fetchedLyrics[currentLyricsIndex];

  return (
    <div className={styles.contentDiv}>
      <div className={styles.lyricContainer}>
        <pre
          className={styles.lyricText}
          style={{
            fontSize: `${fontSize}rem`,
          }}
        >
          {currentLyrics}
        </pre>
        <p className={styles.credit}>
          Lyrics were fetched from
          <a
            href="https://lrclib.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            LRCLIB
          </a>
          . Please consider giving them a donation.
        </p>
      </div>
    </div>
  );
}
