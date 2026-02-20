import { createContext } from "react";

export const AppContext = createContext({
  loaded: false,
  setLoaded: () => {},
  fontSize: 1.4,
  setFontSize: () => {},
  mount: true,
  setMount: () => {},
  lyrics: [],
  setLyrics: () => {},
});
