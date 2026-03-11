import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import getManualSearchTriggerBtn from "./manualSearchBtn.js";

// Update startwithpip to false
const defaultSettings = {
  autoStart: true,
  startWith: "description",
  startWithPip: false,
  currentDock: "description",

  fontSize: 1.4,

  fontColor: "rgb(134,166,220)",
  backgroundColor: "rgb(8,18,33)",
  borderColor: "rgb(134,166,220)",

  pipFontColor: "rgb(134,166,220)",
  pipBackgroundColor: "rgba(6,2,18,0.97)",
  pipBorderColor: "rgb(134,166,220)",
  pipPosition: { top: "10%", right: "50%" },
};

function getSettings() {
  const stored = localStorage.getItem("youLyricSettings");
  if (stored) return JSON.parse(stored);

  localStorage.setItem("youLyricSettings", JSON.stringify(defaultSettings));
  return defaultSettings;
}

function main(getSettings) {
  getManualSearchTriggerBtn();

  const container = document.createElement("div");
  container.id = "youLyricRoot";

  const settingObject = getSettings();
  const startWithSetting = settingObject.startWith;

  let targetDiv = document.querySelector(
    startWithSetting === "description" ? "#middle-row" : "#secondary",
  );
  targetDiv.insertBefore(container, targetDiv.firstChild);

  createRoot(container).render(
    <StrictMode>
      <App settingObject={settingObject} />
    </StrictMode>,
  );
}

// Initially observes the whole document till "ytd-watch-flexy" appears,

function observeFlexy() {
  const ytFlexy = document.querySelector("ytd-watch-flexy");
  const middleRowDiv = document.querySelector("#middle-row");

  if (ytFlexy && middleRowDiv) {
    main(getSettings);
  }
}

let docObserver = null;
function initiateFlexyObserver() {
  const flexyTarget = document.querySelector("ytd-watch-flexy");

  if (flexyTarget) {
    docObserver.disconnect();
    docObserver = null;

    const flexyConfig = {
      attributes: true,
      attributeFilter: ["video-id"],
    };

    const flexyObserver = new MutationObserver(observeFlexy);
    flexyObserver.observe(flexyTarget, flexyConfig);
  }
}

const docTarget = document;
const docConfig = {
  childList: true,
  subtree: true,
};

docObserver = new MutationObserver(initiateFlexyObserver);
docObserver.observe(docTarget, docConfig);

function cleanUp() {
  const container = document.querySelector("#youLyricRoot");
  if (container) {
    container.remove();
  }
}
document.addEventListener("yt-navigate-start", cleanUp);
