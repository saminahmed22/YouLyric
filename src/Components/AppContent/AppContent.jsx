import { useContext, useEffect } from "react";
import { AppContext } from "../../context";

import Header from "../../Components/Header/Header";
import Lyric from "../../Components/Lyric/Lyric";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ManualSearchForm from "../../Components/ManualSearchForm/ManualSearchForm";
import OptionsPage from "../OptionsPage/OptionsPage";

import getLyrics from "../../getLyrics";

import styles from "./AppContent.module.css";

// "fetching", Will trigger loading screen, when:
// 1. If metadata exists
// 2. If metadata does not exists BUT DB entry exists
// 3. After manually searched

// "manual_search", will trigger manual search form, when:
// 1. when metadata exists but failed to fetch
// 2. when the button is clicked but no metadata or db entry was found

// "mount", will trigger rendering the app, when:
//  1. Lyrics has been fetched sucessfully

// "options" will trigger options pages, when:
//  1. the option button gets clicked

// "unmount", will trigger when div is not supposed to render, usually when:
// 1. No metadata exists
// 2. When the close button was pressed

export default function AppContent() {
  const { status, setStatus, setLyrics, videoInfo, settings, pip } =
    useContext(AppContext);

  useEffect(() => {
    const runGetLyrics = async () => {
      await getLyrics(setLyrics, setStatus, videoInfo);
    };

    runGetLyrics();
  }, []);

  const getContent = () => {
    switch (status) {
      case "mount":
        return <Lyric />;
      case "manual_search":
        return <ManualSearchForm />;
      case "fetching":
        return <LoadingScreen />;
      case "options":
        return <OptionsPage />;
      default:
        return (
          <p className={styles.invalidStatus}>{`Invalid status: ${status}`}</p>
        );
    }
  };

  return (
    <div className={`${styles.appContent} appContentDiv`}>
      <Header />
      {getContent()}
    </div>
  );
}
