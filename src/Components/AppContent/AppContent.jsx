import { useContext, useEffect } from "react";
import { AppContext } from "../../context";

import Header from "../../Components/Header/Header";
import Lyric from "../../Components/Lyric/Lyric";
import getLyrics from "../../getLyrics";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ManualSearchForm from "../../Components/ManualSearchForm/ManualSearchForm";

import styles from "./AppContent.module.css";

// "fetching", Will trigger loading screen, when:
// 1. If metadata exists
// 2. If metadata does not exists BUT DB entry exists
// 3. After manually searched

// "manual_search", will trigger manual search form, when:
// 1. when metadata exists but failed to fetch
// 2. when the button is clicked but no metadata or db entry was found

// "mount", will trigger rendering the app when:
//  1.  Lyrics has been fetched sucessfully

// "unmount", will trigger when div is not supposed to render:
// 1. No metadata exists
// 2. When the close button was pressed

export default function AppContent() {
  const { status, setStatus, setLyrics, videoInfo } = useContext(AppContext);

  useEffect(() => {
    const runGetLyrics = async () => {
      await getLyrics(setLyrics, status, setStatus, videoInfo);
    };

    runGetLyrics();
  }, [status, setStatus, setLyrics, videoInfo]);

  const getContent = () => {
    switch (status) {
      case "mount":
        return (
          <>
            <Header />
            <Lyric />
          </>
        );
      case "manual_search":
        return <ManualSearchForm />;
      case "fetching":
        return <LoadingScreen />;
      default:
        // use dedicated componet for this
        return (
          <p className={styles.invalidStatus}>{`Invalid status: ${status}`}</p>
        );
    }
  };

  return <div className={styles.appContent}>{getContent()}</div>;
}
