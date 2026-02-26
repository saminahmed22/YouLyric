import lyricsIcon from "../icons/lyricsIcon.png";

export default function getManualSearchTriggerBtn() {
  const button = document.createElement("button");
  button.className =
    "manualSearchTriggerBtn ytp-autohide-fade-transition ytp-button";
  button.title = "Manually search for the lyrics";
  button.setAttribute("aria-label", "Manually search for the lyrics");
  button.tabIndex = -1;

  const img = document.createElement("img");
  img.src = lyricsIcon;
  img.alt = "Manual search icon";

  const iconDiv = document.createElement("div");
  iconDiv.className = "manualSearchIconDiv";
  iconDiv.setAttribute("fill-opacity", 1);

  iconDiv.appendChild(img);
  button.appendChild(iconDiv);

  const ytpControls = document.querySelector(".ytp-right-controls-left");
  if (ytpControls) {
    ytpControls.insertBefore(button, ytpControls.firstChild);
  }
}
