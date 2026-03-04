import loadingIcon from "../../../icons/loading.png";

import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  const loadingScreenContent = () => {
    return (
      <div className={styles.LoadingScreenDiv}>
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
