import { useContext } from "react";
import { AppContext } from "../../context";

import ActDiv from "../ActDiv/ActDiv";

import styles from "./Header.module.css";

import rightIcon from "../../../icons/chevronRight.png";
import leftIcon from "../../../icons/chevronLeft.png";

export default function Header() {
  const { status, lyrics, setLyrics } = useContext(AppContext);

  const lyricsQuantity = lyrics.lyricsCount;
  const currentLyricIndex = lyrics.currentlySelectedLyrics;

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <span className={styles.headerTitleText} draggable={false}>
          {status === "mount"
            ? "Lyrics"
            : status === "options"
              ? "Options"
              : ""}
        </span>
        {status === "mount" && (
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
              draggable={false}
            >
              <img src={leftIcon} alt="Left icon" draggable={false} />
            </button>
            <span
              className={styles.lyricsVariationText}
              title="Lyrics variations"
            >
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
              draggable={false}
            >
              <img src={rightIcon} alt="Right icon" draggable={false} />
            </button>
          </div>
        )}
      </div>
      <ActDiv />
    </div>
  );
}
