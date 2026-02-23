import { useContext, useEffect } from "react";
import styles from "./LoadingScreen.module.css";

import { AppContext } from "../../context";
import fetchLyrics from "../../api";

import loadingIcon from "../../../icons/loading.png";
import closeIcon from "../../../icons/close.png";

import ManualSearchForm from "./ManualSearchForm/ManualSearchForm";

export default function LoadingScreen({ title, author }) {
  const { loaded, setLoaded, setLyrics, setMount } = useContext(AppContext);

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
          <button
            className={styles.closeBtn}
            title="Close"
            onClick={() => {
              setMount(false);
            }}
          >
            <img src={closeIcon} alt="Close icon" />
          </button>
          <ManualSearchForm />
          <div className={styles.cantFindMessage}>
            <p>
              {`Unable to find the lyrics :(`}, please search for the lyrics
              manually.
            </p>
            <p>
              This mainly happens because of the 'junks' in the name of the song
              or the artist.
            </p>
            <p>
              Just type the title and name of the artist, don't use any
              punctuation marks for best results.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.LoadingScreenDiv}>
          <button
            className={styles.closeBtn}
            title="Close"
            onClick={() => {
              setMount(false);
            }}
          >
            <img src={closeIcon} alt="Close icon" />
          </button>
          <div className={styles.loadingMessage}>
            <img
              className={styles.loadingIcon}
              src={loadingIcon}
              alt="Loading icon"
            />
            <p>Fetching the lyrics</p>
          </div>
        </div>
      );
    }
  };

  return loadingScreenContent();
}
