import { useState, useContext } from "react";
import { AppContext } from "../../context";

import getLyrics from "../../getLyrics";

import searchIcon from "../../../icons/search.png";
import closeIcon from "../../../icons/close.png";

import styles from "./ManualSearchForm.module.css";

export default function ManualSearchForm() {
  const { setMount, setLyrics, fetched, setFetched } = useContext(AppContext);

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

    getLyrics(setLyrics, setFetched, formData);
  };

  const getMessage = (fetchResponse) => {
    if (fetchResponse === "No_metadata") {
      return (
        <>
          <p>Can't find metadata for this video.</p>
          <p>please search for the lyrics manually.</p>
        </>
      );
    } else {
      return (
        <>
          <p>{`Unable to find the lyrics :(`}</p>
          <p>please search for the lyrics manually.</p>
        </>
      );
    }
  };

  return (
    <div className={styles.ManualSearchFormDiv}>
      <form className={styles.ManualSearchForm} onSubmit={handleSubmit}>
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
        <button
          className={`${styles.submitBtn} extensionBtn`}
          type="submit"
          title="Search"
        >
          <img src={searchIcon} alt="Search icon" />
        </button>
      </form>

      <div className={styles.cantFindDiv}>
        <button
          className={`${styles.closeBtn} extensionBtn`}
          title="Close"
          onClick={() => {
            setMount(false);
          }}
        >
          <img src={closeIcon} alt="Close icon" />
        </button>

        <div className={styles.cantFindMessage}>{getMessage(fetched)}</div>
      </div>
    </div>
  );
}
