import { useState, useEffect, useRef } from "react";
import { AppContext } from "./context";

import AppContent from "./Components/AppContent/AppContent";

import getDB from "./indexedDB";

export default function App({ settingObject }) {
  //#region metadata, info, flexy, videoID
  const metadataClass = ".ytVideoAttributeViewModelMetadata";
  const titleClass = ".ytVideoAttributeViewModelTitle";
  const subtitleClass = ".ytVideoAttributeViewModelSubtitle";

  const metadata = !!document.querySelector(metadataClass);

  const songTitle = document.querySelector(titleClass)?.textContent || "";
  const artistName = document.querySelector(subtitleClass)?.textContent || "";

  const ytFlexy = document.querySelector("ytd-watch-flexy");
  const getVideoID = ytFlexy.getAttribute("video-id");
  //#endregion

  //#region context states
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
  //#endregion

  //#region useEffects
  // 1. check for the db entry on inital run
  // 2. check for the db entry on demand(when button gets clicked), if no entry, trigger manual search
  const initialDeny = useRef(settings.autoStart); // stops fetching from the db if autostart is false.
  useEffect(() => {
    if (!initialDeny.current) {
      initialDeny.current = true;
      return;
    }

    const checkDB = async () => {
      const db = getDB();
      const record = await db.videos.get(getVideoID);
      if (record) {
        setStatus("fetching");
      }
    };

    checkDB();
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
  }, [getVideoID, metadata]);

  useEffect(() => {
    localStorage.setItem("youLyricSettings", JSON.stringify(settings));
  }, [settings]);

  // changes dock to "description" if window inner width <= 1120px
  const forcedShift = useRef({ dock: false, pip: false });
  useEffect(() => {
    const changeDock = () => {
      if (
        settings.currentDock === "description" &&
        settings.startWith === "description" &&
        !forcedShift.current.pip
      )
        return;

      const width = window.innerWidth;

      if (width <= 1120 && !forcedShift.current.dock) {
        if (pip) {
          forcedShift.current.pip = true;
          setPip(false);
        }
        setSettings((prev) => ({
          ...prev,
          currentDock: "description",
        }));
        forcedShift.current.dock = true;
      }

      if (width > 1120 && forcedShift.current.dock) {
        if (forcedShift.current.pip) {
          setSettings((prev) => ({
            ...prev,
            currentDock: "PIP",
          }));
        } else {
          setSettings((prev) => ({
            ...prev,
            currentDock: prev.startWith,
          }));
        }

        if (forcedShift.current.pip) {
          setPip(true);
        }

        forcedShift.current.pip = false;
        forcedShift.current.dock = false;
      }
    };

    window.addEventListener("resize", changeDock);

    return () => {
      window.removeEventListener("resize", changeDock);
    };
  }, [settings.currentDock, settings.startWith, pip]);

  // Removes and re-injects the extension on dock change
  const initDeny = useRef(false);

  useEffect(() => {
    if (!initDeny.current) {
      initDeny.current = true;
      return;
    }

    const youLyricRoot = document.getElementById("youLyricRoot");

    youLyricRoot.remove();

    const getContainer = () => {
      if (settings.currentDock === "PIP") return document.body;

      if (settings.currentDock === "description")
        return document.getElementById("middle-row");

      // YouTube renders two #secondary
      if (settings.currentDock === "sidebar") {
        const divs = document.querySelectorAll("#secondary");

        for (const div of divs) {
          if (div.querySelector("#secondary-inner")) return div;
        }
      }
    };

    const targetDiv = getContainer();
    targetDiv.insertBefore(youLyricRoot, targetDiv.firstChild);
  }, [settings.currentDock]);

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

      const maxX = window.innerWidth - appDiv.offsetWidth;
      const maxY = window.innerHeight - appDiv.offsetHeight;

      const clampedX = Math.min(Math.max(nextX, 0), maxX);
      const clampedY = Math.min(Math.max(nextY, 0), maxY);

      appDiv.style.left = `${clampedX}px`;
      appDiv.style.top = `${clampedY}px`;
      document.body.style.userSelect = "none";
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
  }, [settings.currentDock, status]);
  //#endregion

  const app = () => {
    return (
      <div
        className={`appDiv ${pip ? "appDivPIP" : settings.currentDock === "sidebar" ? "appDivSidebar" : "appDivDescription"}`}
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

  // "unmount" status will trigger when:
  // 1. No metadata exists
  // 2. When the close button was pressed

  return status === "unmount" ? null : app();
}
