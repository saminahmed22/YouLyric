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

// This section observes the dom, and when the condition mets it triggers the rendering of the app or remove it from dom.
let observer = null;
function cleanUp() {
  const container = document.querySelector("#youLyricRoot");
  if (container) {
    container.remove();
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  const manualBtn = document.querySelector(".manualSearchTriggerBtn");
  if (manualBtn) {
    manualBtn.remove();
  }
}

// currently observing yt-navigate-finish, switch to observing yt-watch-flexy, from the very beginning, and observe to id changes.
let currentVideoID = null;
function initiate() {
  const ytFlexy = document.querySelector("ytd-watch-flexy");

  const invokeMain = () => {
    const newVideoID = ytFlexy.getAttribute("video-id");

    if (currentVideoID === newVideoID) {
      return;
    }
    currentVideoID = newVideoID;

    observer.disconnect();

    main();
  };

  const target = ytFlexy;
  const config = {
    attributes: true,
    attributeFilter: ["video-id"],
  };

  observer = new MutationObserver(invokeMain);

  observer.observe(target, config);
}

document.addEventListener("yt-navigate-start", cleanUp);
document.addEventListener("yt-navigate-finish", initiate);
// Add later in the description and readme
// Enhancer for YouTube™ is a third-party extension and is not affiliated with YouTube.
// YouTube is a trademark of Google LLC. Use of this trademark is subject to Google Permissions.

// When I go from a song which has metadata to a song that doesn't have one, it keeps he lyrics for some reason
