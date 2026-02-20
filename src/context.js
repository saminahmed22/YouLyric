import { createContext } from "react";

export const AppContext = createContext({
  loaded: false,
  setLoaded: () => {},
  fontSize: 1.4,
  setFontSize: () => {},
  pip: false,
  setPip: () => {},
  mount: true,
  setMount: () => {},
  lyrics: [],
  setLyrics: () => {},
});
