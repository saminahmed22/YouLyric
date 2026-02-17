import styles from "./LoadingScreen.module.css";

import loadingIcon from "../../../icons/loading.png";

export default function LoadingScreen() {
  return (
    <div className={styles.LoadingScreenDiv}>
      <img className={styles.loadingIcon} src={loadingIcon} alt="" />
      <p>Loading</p>
    </div>
  );
}
