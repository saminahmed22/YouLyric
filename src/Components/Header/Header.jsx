import { useContext } from "react";
import { AppContext } from "../../context";

import ActDiv from "../ActDiv/ActDiv";

import styles from "./Header.module.css";

import rightIcon from "../../../icons/chevronRight.png";
import leftIcon from "../../../icons/chevronLeft.png";
import searchIcon from "../../../icons/search.png";
import undoIcon from "../../../icons/undo.png";

export default function Header() {
  const { status, setStatus, lyrics, setLyrics, settings } =
    useContext(AppContext);

  const lyricsQuantity = lyrics.lyricsCount;
  const currentLyricIndex = lyrics.currentlySelectedLyrics;

  const handleDoubleClick = () => {
    setStatus(status === "mount" ? "manual_search" : "mount");
  };

  return (
    <div
      className={`${styles.header} appDivHeader ${settings.currentDock === "PIP" && "headerPIP"}`}
    >
      <div className={styles.headerTitle}>
        {status === "mount" ? (
          <button
            className={`${styles.headerSearchButton} ${styles.headerTitleText}`}
            title="Double click to search manually"
            onDoubleClick={handleDoubleClick}
          >
            <span
              className={styles.headerTitleText}
              draggable={false}
              style={
                settings.currentDock === "PIP"
                  ? { color: settings.pipFontColor }
                  : { color: settings.fontColor }
              }
            >
              Lyrics
            </span>
            <sup>
              <img
                title="Double click to search manually"
                className={styles.HeaderSearchIcon}
                src={searchIcon}
                alt="Search Icon"
              />
            </sup>
          </button>
        ) : status === "options" ? (
          <span className={styles.headerTitleText} draggable={false}>
            Options
          </span>
        ) : status === "manual_search" ? (
          lyrics.fetched ? (
            <button
              className={`${styles.headerSearchButton} ${styles.headerTitleText}`}
              title="Click to go back"
              onClick={handleDoubleClick}
            >
              <span
                className={styles.headerTitleText}
                draggable={false}
                style={
                  settings.currentDock === "PIP"
                    ? { color: settings.pipFontColor }
                    : { color: settings.fontColor }
                }
              >
                Manual Search
              </span>
              <sup>
                <img
                  title="Double click to go back"
                  className={styles.HeaderSearchIcon}
                  src={undoIcon}
                  alt="Undo Icon"
                />
              </sup>
            </button>
          ) : (
            <span>Manual search</span>
          )
        ) : (
          ""
        )}

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
