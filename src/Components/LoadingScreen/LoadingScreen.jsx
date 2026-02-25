import { useContext } from "react";
import { AppContext } from "../../context";

import loadingIcon from "../../../icons/loading.png";
import closeIcon from "../../../icons/close.png";

import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  const { setMount } = useContext(AppContext);

  const loadingScreenContent = () => {
    return (
      <div className={styles.LoadingScreenDiv}>
        <button
          className={`${styles.closeBtn} extensionBtn`}
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
  };

  return loadingScreenContent();
}
