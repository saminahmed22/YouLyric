import { useContext, useEffect } from "react";
import { AppContext } from "../../context";

import Header from "../../Components/Header/Header";
import Lyric from "../../Components/Lyric/Lyric";
import getLyrics from "../../getLyrics";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ManualSearchForm from "../../Components/ManualSearchForm/ManualSearchForm";

import styles from "./AppContent.module.css";

export default function AppContent() {
  const { status, setStatus, setLyrics } = useContext(AppContext);

  useEffect(() => {
    getLyrics(setLyrics, setStatus);
  }, [setStatus, setLyrics]);

  const getContent = () => {
    if (status === "fetched_successfully") {
      return (
        <>
          <Header />
          <Lyric />
        </>
      );
    } else if (status === "couldn't_fetch" || status === "No_metadata") {
      return <ManualSearchForm />;
    } else {
      return <LoadingScreen />;
    }
  };

  return <div className={styles.appContent}>{getContent()}</div>;
}
