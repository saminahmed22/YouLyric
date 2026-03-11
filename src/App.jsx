import { useState, useEffect, useRef } from "react";
import { AppContext } from "./context";
import AppContent from "./Components/AppContent/AppContent";
import getDB from "./indexedDB";
import extractInfo from "./extractInfo";

// "fetching", Will trigger loading screen, when:
// 1. If metadata exists
// 2. If metadata does not exists BUT DB entry exists
// 3. After manually searched

// "manual_search", will trigger manual search form, when:
// 1. when metadata exists but failed to fetch
// 2. when the button is clicked but no metadata or db entry was found

// "mount", will trigger rendering the app when:
//  1.  Lyrics has been fetched sucessfully

// "unmount", will trigger when div is not supposed to render:
// 1. No metadata exists
// 2. When the close button was pressed

export default function App({ settingObject }) {
  const metadata = !!document.querySelector(
    ".yt-video-attribute-view-model__metadata",
  );

  const { songTitle, artistName } = extractInfo();

  const ytFlexy = document.querySelector("ytd-watch-flexy");
  const getVideoID = ytFlexy.getAttribute("video-id");

  const [videoInfo, setVideoInfo] = useState({
    manuallyTyped: false,
    videoID: getVideoID,
    attributed: metadata,
    songTitle: songTitle,
    artistName: artistName,
  });

  const [settings, setSettings] = useState({
    ...settingObject,
    currentDock: settingObject.startWithPip ? "PIP" : settingObject.startWith,
  });
  const [status, setStatus] = useState(
    settings.autoStart ? (metadata ? "fetching" : "unmount") : "unmount",
  );

  const [lyrics, setLyrics] = useState({
    fetchedLyrics: [],
    currentlySelectedLyrics: 0,
    lyricsCount: 0,
  });

  const [fontSize, setFontSize] = useState(settings.fontSize);

  const [pip, setPip] = useState(settings.startWithPip);

  // this block is responsible for two tasks,
  // 1. check for the db entry on inital run
  // 2. check for the db entry on demand(when button gets clicked), if no entry, trigger manual search
  useEffect(() => {
    const run = async () => {
      const db = getDB();
      const record = await db.videos.get(getVideoID);
      if (record) {
        setStatus("fetching");
      }
    };

    run();
  }, [getVideoID]);

  useEffect(() => {
    const ytpControls = document.querySelector(".ytp-right-controls-left");

    const handler = async (e) => {
      const appDivMount = !!document.querySelector(".appDiv");
      if (appDivMount) return;

      const btn = e.target.closest(".manualSearchTriggerBtn");
      if (!btn) return;

      const db = getDB();
      const record = await db.videos.get(getVideoID);

      setStatus(record || metadata ? "fetching" : "manual_search");
    };
    ytpControls.addEventListener("click", handler);

    return () => {
      ytpControls.removeEventListener("click", handler);
    };
  }, [getVideoID, metadata, settings, settingObject]);

  useEffect(() => {
    localStorage.setItem("youLyricSettings", JSON.stringify(settings));
  }, [settings]);

  const previousDock = useRef(settings.currentDock);
  useEffect(() => {
    if (previousDock.current !== "sidebar") return;

    const changeDock = () => {
      const width = window.innerWidth;

      if (width <= 1120) {
        const youLyricRoot = document.getElementById("youLyricRoot");
        youLyricRoot.remove();

        const targetDiv = document.getElementById("middle-row");
        targetDiv.insertBefore(youLyricRoot, targetDiv.firstChild);

        setSettings((prev) => ({
          ...prev,
          currentDock: "description",
        }));
      } else if (width > 1120) {
        const youLyricRoot = document.getElementById("youLyricRoot");
        youLyricRoot.remove();

        const targetDiv = document.getElementById("secondary");
        targetDiv.insertBefore(youLyricRoot, targetDiv.firstChild);

        setSettings((prev) => ({
          ...prev,
          currentDock: "sidebar",
        }));
      }
    };

    window.addEventListener("resize", changeDock);

    return () => {
      window.removeEventListener("resize", changeDock);
    };
  }, [settings]);

  const appDivRef = useRef(null);
  useEffect(() => {
    if (!appDivRef.current) return;

    const appDiv = appDivRef.current;

    const onMouseDown = () => {
      console.log("Hello");
    };

    appDiv.addEventListener("mousedown", onMouseDown);

    const cleanUP = () => {
      appDiv.removeEventListener("mousedown", onMouseDown);
    };

    return cleanUP;
  }, []);

  const app = () => {
    return (
      <div
        className={pip ? "appDivPIP" : "appDiv"}
        style={
          pip
            ? {
                color: settings.pipFontColor,
                backgroundColor: settings.pipBackgroundColor,
                borderColor: settings.pipBorderColor,
                top: settings.pipPosition.top,
                right: settings.pipPosition.right,
              }
            : {
                color: settings.fontColor,
                backgroundColor: settings.backgroundColor,
                borderColor: settings.borderColor,
              }
        }
        ref={appDivRef}
      >
        <AppContext.Provider
          value={{
            videoInfo,
            setVideoInfo,
            status,
            setStatus,
            lyrics,
            setLyrics,
            fontSize,
            setFontSize,
            settings,
            setSettings,
            pip,
            setPip,
          }}
        >
          <AppContent />
        </AppContext.Provider>
      </div>
    );
  };

  return status === "unmount" ? null : app();
}
