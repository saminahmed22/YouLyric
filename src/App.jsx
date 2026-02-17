import { useState } from "react";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import Lyric from "./Components/Lyric/Lyric";

function App() {
  const [loaded, setLoaded] = useState(true);
  return <div className="appDiv">{loaded ? <Lyric /> : <LoadingScreen />}</div>;
}

export default App;
