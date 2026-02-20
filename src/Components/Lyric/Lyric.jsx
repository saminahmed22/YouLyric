import { useContext, useState } from "react";
import { AppContext } from "../../context";
import ActDiv from "../ActDiv/ActDiv";

import styles from "./Lyric.module.css";

import rightIcon from "../../../icons/chevronRight.png";
import leftIcon from "../../../icons/chevronLeft.png";

export default function Lyric() {
  const { lyrics, fontSize } = useContext(AppContext);
  const [currentLyricIndex, setCurrentLyric] = useState(0);
  const lyricsQuantity = lyrics.length;
  const currentLyrics = lyrics[currentLyricIndex].plainLyrics;

  return (
    <div className={styles.contentDiv}>
      <div className={styles.contentHeader}>
        <div className={styles.lyricDivHeader}>
          Lyrics
          <div className={styles.lyricScroll}>
            <button
              className={styles.scrollBtn}
              title="Scroll left"
              onClick={() => {
                setCurrentLyric(currentLyricIndex - 1);
              }}
              disabled={currentLyricIndex + 1 <= 1}
            >
              <img src={leftIcon} alt="Left icon" />
            </button>
            <span>
              {currentLyricIndex + 1}/{lyricsQuantity}
            </span>
            <button
              className={styles.scrollBtn}
              title="Scroll right"
              onClick={() => {
                setCurrentLyric(currentLyricIndex + 1);
              }}
              disabled={currentLyricIndex + 1 >= lyricsQuantity}
            >
              <img src={rightIcon} alt="Right icon" />
            </button>
          </div>
        </div>
        <ActDiv />
      </div>
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
          Lyrics were fetched from{" "}
          <a
            href="https://lrclib.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LRCLIB
          </a>
          . Please consider supporting them.
        </p>
      </div>
    </div>
  );
}
