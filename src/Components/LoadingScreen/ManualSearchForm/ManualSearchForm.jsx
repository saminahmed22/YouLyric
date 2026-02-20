import styles from "./ManualSearchForm.module.css";
import searchIcon from "../../../../icons/search.png";
import { main } from "../../../main";
import { useState, useContext } from "react";
import { AppContext } from "../../../context";

export default function ManualSearchForm() {
  const { setLoaded } = useContext(AppContext);

  const [formData, setFormData] = useState({
    song_name: null,
    author_name: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaded(false);
    main(formData.song_name, formData.author_name, "manual");
  };

  return (
    <div className={styles.ManualSearchFormDiv}>
      <form className={styles.ManualSearchForm} onSubmit={handleSubmit}>
        <input
          className={styles.songNameField}
          id="songName"
          name="song_name"
          type="text"
          placeholder="Song name"
          onChange={handleChange}
          required
        />
        <input
          className={styles.authorNameField}
          id="authorName"
          name="author_name"
          type="text"
          placeholder="Author name"
          onChange={handleChange}
          required
        />
        <button className={styles.submitBtn} type="submit" title="Search">
          <img src={searchIcon} alt="Search icon" />
        </button>
      </form>
    </div>
  );
}
