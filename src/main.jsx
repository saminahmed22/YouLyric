import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

let observer = null;

// bad solution for manual search but I'll see it later
export function main(title, author, method = "auto") {
  if (method !== "auto") {
    const container = document.querySelector("#youLyricRoot");
    if (container) {
      container.remove();
    }
  }

  const container = document.createElement("div");
  container.id = "youLyricRoot";

  const middleRowDiv = document.querySelector("#middle-row");
  middleRowDiv.appendChild(container);

  createRoot(container).render(
    <StrictMode>
      <App title={title} author={author} />
    </StrictMode>,
  );
}

document.addEventListener("yt-navigate-start", () => {
  const lyricDiv = document.querySelector("#youLyricRoot");
  if (lyricDiv) {
    lyricDiv.remove();
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }
});

let currentVideoID = null;

document.addEventListener("yt-navigate-finish", () => {
  const ytFlexy = document.querySelector("ytd-watch-flexy");

  const invokeMain = () => {
    const newVideoID = ytFlexy.getAttribute("video-id");

    if (currentVideoID === newVideoID) {
      return;
    }
    currentVideoID = newVideoID;

    const middleRowDiv = document.querySelector("#middle-row");
    const metadata = document.querySelector(
      ".yt-video-attribute-view-model__metadata",
    );
    if (middleRowDiv && metadata) {
      const title = document.querySelector(
        ".yt-video-attribute-view-model__title",
      ).textContent;
      const author = document.querySelector(
        ".yt-video-attribute-view-model__subtitle",
      ).textContent;

      observer.disconnect();
      main(title, author);
    }
  };

  const target = ytFlexy;
  const config = {
    attributes: true,
    attributeFilter: ["video-id"],
  };

  observer = new MutationObserver(invokeMain);

  observer.observe(target, config);
});
