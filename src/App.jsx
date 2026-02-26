import { useState, useEffect } from "react";
import { AppContext } from "./context";

import AppContent from "./Components/AppContent/AppContent";

export default function App() {
  const metadata = !!document.querySelector(
    ".yt-video-attribute-view-model__metadata",
  );

  const [mount, setMount] = useState(metadata);
  const [videoInfo, setVideoInfo] = useState({
    videoID: null,
    attributed: null,
    songTitle: null,
    artistName: null,
  });

  const [status, setStatus] = useState("fetching");

  const [lyrics, setLyrics] = useState({
    fetchedLyrics: [],
    currentlySelectedLyrics: 0,
    lyricsCount: 0,
  });
  const [fontSize, setFontSize] = useState(1.4);

  useEffect(() => {
    const ytpControls = document.querySelector(".ytp-right-controls-left");

    const handler = (e) => {
      const btn = e.target.closest(".manualSearchTriggerBtn");
      if (!btn) return;

      setMount(true);
    };

    ytpControls.addEventListener("click", handler);

    return () => {
      ytpControls.removeEventListener("click", handler);
    };
  }, [mount]);

  const app = () => {
    return (
      <div className="appDiv">
        <AppContext.Provider
          value={{
            mount,
            setMount,
            videoInfo,
            setVideoInfo,
            status,
            setStatus,
            lyrics,
            setLyrics,
            fontSize,
            setFontSize,
          }}
        >
          <AppContent />
        </AppContext.Provider>
      </div>
    );
  };

  return mount ? app() : null;
}
