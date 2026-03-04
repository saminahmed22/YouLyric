import { useContext } from "react";
import { AppContext } from "../../context";
import { ColorPicker } from "antd";

import description from "../../../icons/description.png";
import sidebar from "../../../icons/sidebar.png";

import styles from "./OptionsPage.module.css";

export default function OptionsPage() {
  const { settings, setSettings } = useContext(AppContext);
  const prevSelected = settings.startWith;

  const getColorOption = (className, title) => {
    return (
      <div className={`${styles.option} ${styles.popOverDiv}`}>
        <label htmlFor={className}>{title}:</label>
        <ColorPicker
          styles={{
            popup: {
              root: {
                zIndex: 5000,
              },
            },
          }}
          className={styles.colorPicker}
          id={className}
          name={className}
          value={settings[className]}
          onChange={(color, cssString) =>
            setSettings((prev) => ({
              ...prev,
              [className]: cssString,
            }))
          }
        />
      </div>
    );
  };

  // There are 2 grouping for the options, options section, option group and then options.
  return (
    <div className={styles.OptionsPageDiv}>
      <div className={`${styles.generalSection} ${styles.optionSection}`}>
        <h3 className={styles.optionsGroupTitle}>General options:</h3>
        <div className={` ${styles.optionsGroup} ${styles.option}`}>
          <input
            type="checkbox"
            id="autoStart"
            name="autoStart"
            checked={settings.autoStart}
            onChange={(e) => {
              setSettings((prev) => ({
                ...prev,
                autoStart: e.target.checked,
              }));
            }}
          />
          <label for="autoStart">Auto start?</label>
        </div>
        <div className={`${styles.startWithSection} ${styles.optionsGroup} `}>
          <h4>Start with:</h4>
          <div className={styles.startWithBtns}>
            <button
              className={`${styles.startWithBtn} extensionBtn ${prevSelected === "description" && styles.selectedStartWith}`}
              title="Start with description"
              onClick={() => {
                if (prevSelected === "description") {
                  return;
                }

                setSettings((prev) => ({
                  ...prev,
                  startWith: "description",
                }));
              }}
              draggable={false}
            >
              <div className={styles.buttonIcon}>
                <img
                  src={description}
                  alt="description icon"
                  draggable={false}
                />
                Description
              </div>
            </button>

            <button
              className={`${styles.startWithBtn} extensionBtn ${prevSelected === "sidebar" && styles.selectedStartWith}`}
              title="Start with sidebar"
              onClick={() => {
                if (prevSelected === "sidebar") {
                  return;
                }

                setSettings((prev) => ({
                  ...prev,
                  startWith: "sidebar",
                }));
              }}
              draggable={false}
            >
              <div className={styles.buttonIcon}>
                <img src={sidebar} alt="sidebar icon" draggable={false} />
                Sidebar
              </div>
            </button>
          </div>
          <div />
        </div>
        <div
          className={`${styles.pipCheckboxGroup} ${styles.optionsGroup} ${styles.option}`}
        >
          <input
            type="checkbox"
            id="autoPIPOnStart"
            name="autoPIPOnStart"
            checked={settings.startWithPip}
            onChange={(e) => {
              setSettings((prev) => ({
                ...prev,
                startWithPip: e.target.checked,
              }));
            }}
          />
          <label for="autoPIPOnStart">Auto PIP on start?</label>
        </div>
        <div
          className={`${styles.pipCheckboxGroup} ${styles.optionsGroup} ${styles.option}`}
        >
          <input
            type="checkbox"
            id="autoPIP"
            name="autoPIP"
            checked={settings.autoPip}
            onChange={(e) => {
              setSettings((prev) => ({
                ...prev,
                autoPip: e.target.checked,
              }));
            }}
          />
          <label for="autoPIP">Auto PIP when scrolling to the comments?</label>
        </div>
      </div>
      <div className={`${styles.customizationSection} ${styles.optionSection}`}>
        <h3 className={styles.optionsGroupTitle}>Customization options:</h3>
        <div className={styles.optionsGroup}>
          <h4>Background:</h4>
          {getColorOption("backgroundColor", "Background color")}
          {getColorOption("borderColor", "Border color")}
        </div>

        <div className={styles.optionsGroup}>
          <h4>Font:</h4>
          {getColorOption("fontColor", "Font color")}
        </div>

        <div className={styles.optionsGroup}>
          <h4>PIP:</h4>
          {getColorOption("pipBackground", "PIP background color")}
          {getColorOption("pipFontColor", "PIP font color")}
          {getColorOption("pipBorderColor", "PIP border color")}
        </div>
      </div>
    </div>
  );
}
