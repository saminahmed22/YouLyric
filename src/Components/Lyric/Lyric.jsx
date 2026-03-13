import { useContext, useEffect } from "react";
import { AppContext } from "../../context";

import styles from "./Lyric.module.css";

export default function Lyric() {
  const { lyrics, fontSize, settings, pip } = useContext(AppContext);

  const currentLyricsIndex = lyrics.currentlySelectedLyrics;
  const currentLyrics = lyrics.fetchedLyrics[currentLyricsIndex];

  // When docked in sidebar, it will change height based on video element's height as it shrinks when the window shrinks too.
  useEffect(() => {
    const currentDock = settings.currentDock;
    const lyricsText = document.querySelector(".lyricsTextPre");

    if (currentDock !== "sidebar") {
      if (currentDock === "description") {
        lyricsText.style.maxHeight = "500px";
      } else {
        lyricsText.style.maxHeight = "450px";
      }
      return;
    }

    const video = document.querySelector("video");
    if (!video) return;

    const callback = (entries) => {
      const entry = entries[0];
      const { height } = entry.contentRect;
      const textMaxHeight = height - 148;

      lyricsText.style.maxHeight = `${textMaxHeight}px`;
    };

    const observer = new ResizeObserver(callback);
    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [settings.currentDock, pip]);

  return (
    <div className={styles.contentDiv}>
      <div className={styles.lyricContainer}>
        <pre
          className={`lyricsTextPre ${pip ? styles.lyricsTextPIP : styles.lyricsText}`}
          style={{
            fontSize: `${fontSize}rem`,
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
              style={
                pip
                  ? { color: settings.pipFontColor }
                  : {
                      color: settings.fontColor,
                    }
              }
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
              style={
                pip
                  ? { color: settings.pipFontColor }
                  : {
                      color: settings.fontColor,
                    }
              }
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
