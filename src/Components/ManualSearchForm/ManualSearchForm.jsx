import { useState, useContext } from "react";
import { AppContext } from "../../context";

import searchIcon from "../../../icons/search.png";

import styles from "./ManualSearchForm.module.css";

export default function ManualSearchForm() {
  const { videoInfo, setVideoInfo, setStatus } = useContext(AppContext);

  const [formData, setFormData] = useState({
    songTitle: null,
    artistName: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setVideoInfo((prev) => ({
      ...prev,
      manuallyTyped: true,
      songTitle: formData.songTitle,
      artistName: formData.artistName,
    }));

    setStatus("fetching");
  };

  const getMessage = () => {
    if (videoInfo.attributed) {
      return (
        <>
          <p>{`Unable to find the lyrics :(`}</p>
          <p>please search for the lyrics manually.</p>
        </>
      );
    } else {
      return (
        <>
          <p>Can't find metadata for this video.</p>
          <p>please search for the lyrics manually.</p>
        </>
      );
    }
  };

  return (
    <div className={styles.ManualSearchFormDiv}>
      <form className={styles.ManualSearchForm} onSubmit={handleSubmit}>
        <div className={styles.inputsDiv}>
          <input
            className={styles.songNameField}
            id="songName"
            name="songTitle"
            type="text"
            placeholder="Song title"
            onChange={handleChange}
            required
          />
          <input
            className={styles.artistNameField}
            id="artistName"
            name="artistName"
            type="text"
            placeholder="Artist name"
            onChange={handleChange}
            required
          />
        </div>
        <button
          className={`${styles.submitBtn} extensionBtn`}
          type="submit"
          title="Search"
        >
          <img src={searchIcon} alt="Search icon" />
        </button>
      </form>
      <div className={styles.cantFindMessage}>{getMessage()}</div>
    </div>
  );
}
