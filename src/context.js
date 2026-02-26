import { createContext } from "react";

export const AppContext = createContext({
  mount: false,
  setMount: () => {},

  fetched: "fetching",
  setFetched: () => {},

  lyrics: {},
  setLyrics: () => {},

  fontSize: 1.4,
  setFontSize: () => {},
});
