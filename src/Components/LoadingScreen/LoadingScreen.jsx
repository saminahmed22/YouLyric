import { useContext, useEffect } from "react";
import styles from "./LoadingScreen.module.css";

import { AppContext } from "../../context";
import fetchLyrics from "../../api";

import loadingIcon from "../../../icons/loading.png";

import ManualSearchForm from "./ManualSearchForm/ManualSearchForm";

export default function LoadingScreen({ title, author }) {
  const { loaded, setLoaded, setLyrics } = useContext(AppContext);

  useEffect(() => {
    const getLyric = async () => {
      const response = await fetchLyrics(title, author);
      if (response === 404) {
        setLoaded(404);
      } else {
        setLyrics(response);
        setLoaded(true);
      }
    };

    getLyric();
  }, [title, author, setLyrics, setLoaded]);

  const loadingScreenContent = () => {
    if (loaded === 404) {
      return (
        <div className={styles.cantFindDiv}>
          <ManualSearchForm />
          <p>{`Unable to find lyrics :(,
          this mainly happens because of 'junk' in the name of the song or the author.
          Please search for the lyrics manually`}</p>
        </div>
      );
    } else {
      return (
        <div className={styles.LoadingScreenDiv}>
          <img
            className={styles.loadingIcon}
            src={loadingIcon}
            alt="Loading icon"
          />
          <p>Fetching the lyrics</p>
        </div>
      );
    }
  };

  return loadingScreenContent();
}
