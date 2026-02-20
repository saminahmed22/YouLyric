import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

let observer = null;

let title, author;

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

document.addEventListener("yt-navigate-finish", () => {
  observer = new MutationObserver(() => {
    const middleRowDiv = document.querySelector("#middle-row");
    const metadata = document.querySelector(
      ".yt-video-attribute-view-model__metadata",
    );
    if (middleRowDiv && metadata) {
      const newTitle = document.querySelector(
        ".yt-video-attribute-view-model__title",
      ).textContent;
      const newAuthor = document.querySelector(
        ".yt-video-attribute-view-model__subtitle",
      ).textContent;

      if (newTitle === title || newAuthor === author) {
        return;
      }

      title = newTitle;
      author = newAuthor;
      observer.disconnect();
      main(title, author);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

//issue playing certain songs, best guess, playlists caches the videos, and might trigger different singals
// document.addEventListener("yt-page-data-updated", () => {
//   observer = new MutationObserver(() => {
//     const middleRowDiv = document.querySelector("#middle-row");
//     const metadata = document.querySelector(
//       ".yt-video-attribute-view-model__metadata",
//     );
//     if (middleRowDiv && metadata) {
//       const newTitle = document.querySelector(
//         ".yt-video-attribute-view-model__title",
//       ).textContent;
//       const newAuthor = document.querySelector(
//         ".yt-video-attribute-view-model__subtitle",
//       ).textContent;

//       if (newTitle === title || newAuthor === author) {
//         return;
//       }

//       title = newTitle;
//       author = newAuthor;
//       observer.disconnect();
//       main(title, author);
//     }
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });
// });
