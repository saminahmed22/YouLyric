import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import getManualSearchTriggerBtn from "./manualSearchBtn.js";

function main() {
  getManualSearchTriggerBtn();

  const container = document.createElement("div");
  container.id = "youLyricRoot";

  const middleRowDiv = document.querySelector("#middle-row");
  middleRowDiv.appendChild(container);

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// Initially observes the whole document till "ytd-watch-flexy" appears,

function observeFlexy() {
  const ytFlexy = document.querySelector("ytd-watch-flexy");
  const middleRowDiv = document.querySelector("#middle-row");

  if (ytFlexy && middleRowDiv) {
    main();
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
