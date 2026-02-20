import { useContext } from "react";
import { AppContext } from "../../context";

import styles from "./ActDiv.module.css";

import closeIcon from "../../../icons/close.png";
import pipInIcon from "../../../icons/pipIn.png";
import pipOutIcon from "../../../icons/pipOut.png";
import zoomInIcon from "../../../icons/zoomIn.png";
import zoomOutIcon from "../../../icons/zoomOut.png";

export default function ActDiv() {
  const { fontSize, setFontSize, pip, setPip, setMount } =
    useContext(AppContext);

  const increaseFontSize = () => {
    setFontSize(fontSize + 0.2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 0.2);
  };

  return (
    <div className={styles.ActDiv}>
      <div className={styles.actBtnContainer}>
        <button
          className={styles.actBtn}
          title="Zoom in"
          onClick={increaseFontSize}
          disabled={fontSize >= 3}
        >
          <img src={zoomInIcon} alt="Zoom in icon" />
        </button>
        <button
          className={styles.actBtn}
          title="Zoom out"
          onClick={decreaseFontSize}
          disabled={fontSize <= 1}
        >
          <img src={zoomOutIcon} alt="Zoom out icon" />
        </button>
        <button
          className={styles.actBtn}
          title={`PIP ${pip ? "in" : "out"}`}
          onClick={() => {
            setPip(pip ? false : true);
          }}
        >
          <img
            src={pip ? pipInIcon : pipOutIcon}
            alt={`PIP ${pip ? "in" : "out"} icon`}
          />
        </button>
        <button
          className={styles.actBtn}
          title="Close"
          onClick={() => {
            setMount(false);
          }}
        >
          <img src={closeIcon} alt="Close icon" />
        </button>
      </div>
    </div>
  );
}
