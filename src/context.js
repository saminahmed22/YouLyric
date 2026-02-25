import { createContext } from "react";

export const AppContext = createContext({
  mount: true,
  setMount: () => {},

  fetched: "fetching",
  setFetched: () => {},

  lyrics: {},
  setLyrics: () => {},

  fontSize: 1.4,
  setFontSize: () => {},
});
