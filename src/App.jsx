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
    fetched: false,
    fetchedLyrics: [],
    currentlySelectedLyrics: 0,
    lyricsCount: 0,
  });

  const [fontSize, setFontSize] = useState(settings.fontSize);

  const [pip, setPip] = useState(settings.startWithPip);

  // 1. check for the db entry on inital run
  // 2. check for the db entry on demand(when button gets clicked), if no entry, trigger manual search
  const isAutoStart = useRef(settings.autoStart);
  useEffect(() => {
    if (!isAutoStart.current) return;

    const run = async () => {
      const db = getDB();
      const record = await db.videos.get(getVideoID);
      if (record) {
        setStatus("fetching");
      }
    };

    run();
  }, [getVideoID]);

  // Adds click listeners to manual search button
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
  }, [getVideoID, metadata]); //settings, settingObject

  useEffect(() => {
    localStorage.setItem("youLyricSettings", JSON.stringify(settings));
  }, [settings]);

  // Shifts dock to description if window width is too small to contian sidebar dock or pip
  useEffect(() => {
    if (
      settings.currentDock === "description" &&
      settings.startWith === "description"
    )
      return;

    const changeDock = () => {
      const width = window.innerWidth;

      const youLyricRoot = document.getElementById("youLyricRoot");
      const sidebarButton = document.querySelector(".sideBarButton");
      const pipButton = document.querySelector(".pipBtn");

      if (width <= 1120) {
        youLyricRoot.remove();

        const targetDiv = document.getElementById("middle-row");

        targetDiv.insertBefore(youLyricRoot, targetDiv.firstChild);

        if (pip) {
          setPip(false);
        }

        setSettings((prev) => ({
          ...prev,
          currentDock: "description",
        }));
      } else if (width > 1120) {
        youLyricRoot.remove();

        const targetDiv = document.getElementById("secondary");

        targetDiv.insertBefore(youLyricRoot, targetDiv.firstChild);

        pipButton.style.display = "inline-block";

        sidebarButton.disabled = false;

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
  }, [settings.currentDock, settings.startWith, pip]);

  // Removes and re-injects the extension on dock change
  const initDeny = useRef(false);
  const startingPIP = useRef(settings.startWithPip);
  useEffect(() => {
    if (!startingPIP && !initDeny.current) {
      initDeny.current = true;
      return;
    }

    const youLyricRoot = document.getElementById("youLyricRoot");

    youLyricRoot.remove();

    if (settings.currentDock === "PIP") {
      document.body.appendChild(youLyricRoot);

      return;
    } else {
      const targetDiv = document.getElementById(
        settings.startWith === "sidebar" ? "secondary" : "middle-row",
      );
      targetDiv.insertBefore(youLyricRoot, targetDiv.firstChild);

      const runSetSettings = () => {
        setSettings((prev) => ({
          ...prev,
          currentDock: prev.startWith,
        }));
      };

      runSetSettings();
    }
  }, [settings.currentDock, settings.startWith]);

  // For making the PIP draggable
  const isClicked = useRef(false);
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: settings.pipPosition.left,
    lastY: settings.pipPosition.top,
  });

  useEffect(() => {
    const appDiv = document.querySelector(".appDivPIP");

    if (settings.currentDock !== "PIP" || !appDiv) return;

    const appDivHeader = document.querySelector(".appDivHeader");

    const onMouseDown = (e) => {
      isClicked.current = true;

      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;

      coords.current.lastX = appDiv.offsetLeft;
      coords.current.lastY = appDiv.offsetTop;
      document.body.style.userSelect = "auto";

      setSettings((prev) => ({
        ...prev,
        pipPosition: { top: appDiv.offsetTop, left: appDiv.offsetLeft },
      }));
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      if (nextX > 0 && nextY > 0) {
        appDiv.style.left = `${nextX}px`;
        appDiv.style.top = `${nextY}px`;
        document.body.style.userSelect = "none";
      }
    };

    appDivHeader.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    const cleanUp = () => {
      appDivHeader.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };

    return cleanUp;
  }, [settings.currentDock]);

  const app = () => {
    return (
      <div
        className={`appDiv ${pip ? "appDivPIP" : settings.currentDock === "sidebar" ? "appDivSidebar" : "addDivDescription"}`}
        style={
          pip
            ? {
                color: settings.pipFontColor,
                backgroundColor: settings.pipBackgroundColor,
                borderColor: settings.pipBorderColor,
                top: `${settings.pipPosition.top}px`,
                left: `${settings.pipPosition.left}px`,
              }
            : {
                color: settings.fontColor,
                backgroundColor: settings.backgroundColor,
                borderColor: settings.borderColor,
              }
        }
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
