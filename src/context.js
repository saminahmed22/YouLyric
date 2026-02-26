import { createContext } from "react";

export const AppContext = createContext({
  mount: false,
  setMount: () => {},

  videoInfo: {},
  setVideoInfo: () => {},

  status: "fetching",
  setStatus: () => {},

  lyrics: {},
  setLyrics: () => {},

  fontSize: 1.4,
  setFontSize: () => {},
});
