import { useContext } from "react";
import { AppContext } from "../../context";

import styles from "./ActDiv.module.css";

import closeIcon from "../../../icons/close.png";
import zoomInIcon from "../../../icons/zoomIn.png";
import zoomOutIcon from "../../../icons/zoomOut.png";
import optionsIcon from "../../../icons/options.png";
import lyricsIcon from "../../../icons/lyricsIcon.png";
import pipInIcon from "../../../icons/pipIn.png";
import pipOutIcon from "../../../icons/pipOut.png";

export default function ActDiv() {
  const {
    status,
    setStatus,
    fontSize,
    setFontSize,
    settings,
    setSettings,
    pip,
    setPip,
  } = useContext(AppContext);

  const increaseFontSize = () => {
    setFontSize(Number((fontSize + 0.2).toFixed(2)));
    setSettings((prev) => ({
      ...prev,
      fontSize: Number((prev.fontSize + 0.2).toFixed(2)),
    }));
  };

  const decreaseFontSize = () => {
    setFontSize(Number((fontSize - 0.2).toFixed(2)));
    setSettings((prev) => ({
      ...prev,
      fontSize: Number((prev.fontSize - 0.2).toFixed(2)),
    }));
  };

  return (
    <div className={styles.ActDiv}>
      <>
        {status === "mount" && (
          <div className={styles.zoomBtns}>
            <button
              className={`${styles.actBtn} extensionBtn`}
              title="Zoom in"
              onClick={increaseFontSize}
              disabled={fontSize >= 4}
              draggable={false}
            >
              <img src={zoomInIcon} alt="Zoom in icon" draggable={false} />
            </button>

            <button
              className={`${styles.actBtn} extensionBtn`}
              title="Zoom out"
              onClick={decreaseFontSize}
              disabled={fontSize <= 1}
              draggable={false}
            >
              <img src={zoomOutIcon} alt="Zoom out icon" draggable={false} />
            </button>
          </div>
        )}

        {(status === "mount" || status === "options") && (
          <>
            {window.innerWidth >= 650 && (
              <button
                className={`${styles.actBtn} extensionBtn`}
                title={pip ? "PIP out" : "PIP out"}
                onClick={() => {
                  setSettings((prev) => ({
                    ...prev,
                    currentDock: pip ? prev.startWith : "PIP",
                  }));
                  setPip((prev) => !prev);
                }}
                draggable={false}
              >
                <img
                  src={pip ? pipInIcon : pipOutIcon}
                  alt={pip ? "PIP out icon" : "PIP out icon"}
                  draggable={false}
                />
              </button>
            )}

            <button
              className={`${styles.actBtn} extensionBtn`}
              title={status === "options" ? "Lyrics" : "Options"}
              onClick={() => {
                setStatus(status === "options" ? "mount" : "options");
              }}
              draggable={false}
            >
              <img
                src={status === "options" ? lyricsIcon : optionsIcon}
                alt={status === "options" ? "Lyrics icon" : "Options icon"}
                draggable={false}
              />
            </button>
          </>
        )}

        <button
          style={{
            color: settings.fontColor,
            borderColor: settings.fontColor,
          }}
          className={`${styles.actBtn} extensionBtn`}
          title="Close"
          onClick={() => {
            setStatus("unmount");
          }}
          draggable={false}
        >
          <img src={closeIcon} alt="Close icon" draggable={false} />
        </button>
      </>
    </div>
  );
}
