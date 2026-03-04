import { useContext, useEffect } from "react";
import { AppContext } from "../../context";

import styles from "./Lyric.module.css";

export default function Lyric() {
  const { lyrics, fontSize, settings } = useContext(AppContext);

  const currentLyricsIndex = lyrics.currentlySelectedLyrics;
  const currentLyrics = lyrics.fetchedLyrics[currentLyricsIndex];

  useEffect(() => {
    const currentDock = settings.currentDock;
    const lyricsText = document.querySelector(".lyricsTextPre");
    const video = document.querySelector("video");
    const height = video.clientHeight;
    const textMaxHeight = height - 149;

    if (currentDock === "sidebar") {
      lyricsText.style.setProperty(
        "max-height",
        `${textMaxHeight}px`,
        "important",
      );
    }
  }, [settings.currentDock, settings.pipSize]);

  return (
    <div className={styles.contentDiv}>
      <div className={styles.lyricContainer}>
        <pre
          className={`${settings.currentDock === "PIP" ? styles.lyricsTextPIP : styles.lyricsText}  lyricsTextPre`}
          style={{
            fontSize: `${fontSize}rem`,
            maxHeight: settings.pipSize.height - 149,
          }}
        >
          {currentLyrics}
        </pre>
        <div className={styles.credit}>
          <p className={styles.creditText}>
            Lyrics were fetched from{" "}
            <a
              href="https://lrclib.net/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: settings.fontColor,
              }}
            >
              LRCLIB
            </a>
            .
          </p>
          <p className={styles.creditText}>
            {" "}
            Please consider giving them a{" "}
            <a
              href="https://github.com/tranxuanthang/lrclib#donation"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: settings.fontColor,
              }}
            >
              donation
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
