import { useState } from "react";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import Lyric from "./Components/Lyric/Lyric";
import { AppContext } from "./context";

function App({ title, author }) {
  const [loaded, setLoaded] = useState(false);
  const [fontSize, setFontSize] = useState(1.4);
  const [mount, setMount] = useState(true);
  const [lyrics, setLyrics] = useState([]);

  const app = () => {
    return (
      <div className="appDiv">
        <AppContext
          value={{
            loaded,
            setLoaded,
            fontSize,
            setFontSize,
            mount,
            setMount,
            lyrics,
            setLyrics,
          }}
        >
          {loaded === true ? (
            <Lyric />
          ) : (
            <LoadingScreen title={title} author={author} />
          )}
        </AppContext>
      </div>
    );
  };
  return mount ? app() : null;
}

export default App;
