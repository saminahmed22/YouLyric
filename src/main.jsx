import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

function main() {
  const container = document.createElement("div");
  container.id = "youLyricRoot";
  const descriptionDiv = document.querySelector("#description-inner");
  descriptionDiv.insertBefore(container, descriptionDiv.firstChild);

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

const observer = new MutationObserver(() => {
  if (
    document.querySelector("#description-inner") &&
    document.querySelector(".yt-video-attribute-view-model__metadata")
  ) {
    observer.disconnect();

    main();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
