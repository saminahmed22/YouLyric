import { useContext } from "react";
import { AppContext } from "../../context";

import ActDiv from "../ActDiv/ActDiv";

import styles from "./Header.module.css";

import rightIcon from "../../../icons/chevronRight.png";
import leftIcon from "../../../icons/chevronLeft.png";

export default function Header() {
  const { lyrics, setLyrics } = useContext(AppContext);

  const lyricsQuantity = lyrics.lyricsCount;
  const currentLyricIndex = lyrics.currentlySelectedLyrics;

  return (
    <div className={styles.header}>
      <div className={styles.lyricTitle}>
        Lyrics
        <div className={styles.lyricScroll}>
          <button
            className={`${styles.scrollBtn} extensionBtn`}
            title="Scroll left"
            onClick={() => {
              setLyrics({
                ...lyrics,
                currentlySelectedLyrics: currentLyricIndex - 1,
              });
            }}
            disabled={currentLyricIndex + 1 <= 1}
          >
            <img src={leftIcon} alt="Left icon" />
          </button>
          <span>
            {currentLyricIndex + 1}/{lyricsQuantity}
          </span>
          <button
            className={`${styles.scrollBtn} extensionBtn`}
            title="Scroll right"
            onClick={() => {
              setLyrics({
                ...lyrics,
                currentlySelectedLyrics: currentLyricIndex + 1,
              });
            }}
            disabled={currentLyricIndex + 1 >= lyricsQuantity}
          >
            <img src={rightIcon} alt="Right icon" />
          </button>
        </div>
      </div>
      <ActDiv />
    </div>
  );
}
