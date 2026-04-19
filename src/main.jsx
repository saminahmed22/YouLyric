import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import getManualSearchTriggerBtn from "./manualSearchBtn.js";

// Update startwithpip to false
const currentSettingsVersion = 1;
const defaultSettings = {
  settingsVersion: currentSettingsVersion,

  autoStart: true,
  startWith: "description",
  startWithPip: false,
  currentDock: "description",

  fontSize: 1.4,

  fontColor: "rgba(240, 245, 253, 1)",
  backgroundColor: "rgba(8, 18, 33, 0.31)",
  borderColor: "rgba(134, 165, 219, 0.17)",

  pipFontColor: "rgba(217, 217, 217, 1)",
  pipBackgroundColor: "rgba(9, 10, 11, 0.97)",
  pipBorderColor: "rgba(255, 252, 252, 0.03)",

  pipPosition: { top: "0", left: "0" },
};

function getSettings() {
  const stored = localStorage.getItem("youLyricSettings");
  if (stored) {
    const settings = JSON.parse(stored);
    if (settings?.settingsVersion === currentSettingsVersion) {
      return settings;
    }
  }

  localStorage.setItem("youLyricSettings", JSON.stringify(defaultSettings));
  return defaultSettings;
}

function main(getSettings) {
  getManualSearchTriggerBtn();

  const container = document.createElement("div");
  container.id = "youLyricRoot";

  const settingObject = getSettings();

  const startWithSetting = settingObject.startWithPip
    ? "PIP"
    : settingObject.startWith;

  const getContainer = () => {
    if (startWithSetting === "PIP") return document.body;

    if (startWithSetting === "description")
      return document.getElementById("middle-row");

    // YouTube renders two #secondary
    if (startWithSetting === "sidebar") {
      const divs = document.querySelectorAll("#secondary");

      console.log(divs);

      for (const div of divs) {
        if (div.querySelector("#secondary-inner")) return div;
      }
    }
  };

  const targetDiv = getContainer();

  targetDiv.insertBefore(container, targetDiv.firstChild);

  createRoot(container).render(
    <StrictMode>
      <App settingObject={settingObject} />
    </StrictMode>,
  );
}

// Initially observes the whole document till "ytd-watch-flexy" appears
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
