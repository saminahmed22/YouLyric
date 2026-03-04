import { createContext } from "react";

export const AppContext = createContext({
  settings: {},
  setSettings: () => {},

  videoInfo: {},
  setVideoInfo: () => {},

  status: "fetching",
  setStatus: () => {},

  lyrics: {},
  setLyrics: () => {},

  fontSize: 1.4,
  setFontSize: () => {},

  pip: false,
  setPip: () => {},
});
