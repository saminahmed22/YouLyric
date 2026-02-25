import { useState } from "react";
import { AppContext } from "./context";

import AppContent from "./Components/AppContent/AppContent";

function App() {
  const [mount, setMount] = useState(true);
  const [fetched, setFetched] = useState("fetching");

  const [lyrics, setLyrics] = useState({
    fetchedLyrics: [],
    currentlySelectedLyrics: 0,
    lyricsCount: 0,
  });
  const [fontSize, setFontSize] = useState(1.4);

  const app = () => {
    return (
      <div className="appDiv">
        <AppContext.Provider
          value={{
            mount,
            setMount,
            fetched,
            setFetched,
            lyrics,
            setLyrics,
            fontSize,
            setFontSize,
          }}
        >
          <AppContent />
        </AppContext.Provider>
      </div>
    );
  };

  return mount ? app() : null;
}

export default App;
