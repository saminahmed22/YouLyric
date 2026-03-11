import { useContext } from "react";
import { AppContext } from "../../context";

import ColorPicker from "../ColorPicker/ColorPicker";

import description from "../../../icons/description.png";
import sidebar from "../../../icons/sidebar.png";

import styles from "./OptionsPage.module.css";

export default function OptionsPage() {
  const { settings, setSettings } = useContext(AppContext);

  const getColorOptions = (array) => {
    return array.map((optionInfo) => {
      const optionClassName = optionInfo[0];
      const title = optionInfo[1];

      return (
        <div className={`${styles.option} ${styles.popOverDiv}`}>
          <label htmlFor={optionClassName}>{title}:</label>
          <ColorPicker
            color={settings[optionClassName]}
            className={styles.colorPicker}
            id={optionClassName}
            name={optionClassName}
            onChange={(color) =>
              setSettings((prev) => ({
                ...prev,
                [optionClassName]: color,
              }))
            }
          />
        </div>
      );
    });
  };

  // There are 2 grouping for the options, options section, option group and then options.
  return (
    <div
      className={styles.OptionsPageDiv}
      style={{ fontSize: `${settings.fontSize}rem` }}
    >
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
              className={`${styles.startWithBtn} extensionBtn ${settings.startWith === "description" && styles.selectedStartWith}`}
              title="Start with description"
              onClick={() => {
                if (settings.startWith === "description") {
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
              className={`${styles.startWithBtn} extensionBtn ${settings.startWith === "sidebar" && styles.selectedStartWith}`}
              title="Start with sidebar"
              onClick={() => {
                if (settings.startWith === "sidebar") {
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
      </div>
      <div className={`${styles.customizationSection} ${styles.optionSection}`}>
        <h3 className={styles.optionsGroupTitle}>Customization options:</h3>
        <div className={styles.optionsGroup}>
          {getColorOptions([
            ["fontColor", "Font color"],
            ["backgroundColor", "Background color"],
            ["borderColor", "Border color"],
            ["pipFontColor", "PIP font color"],
            ["pipBackgroundColor", "PIP background color"],
            ["pipBorderColor", "PIP border color"],
          ])}
        </div>
      </div>
    </div>
  );
}
