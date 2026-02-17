import styles from "./Lyric.module.css";

export default function Lyric() {
  return (
    <div className={styles.contentDiv}>
      <div className={styles.lyricDivHeader}>Lyrics</div>
      <pre className={styles.lyricText}>
        [Verse 1]
        {`Remember that night
White steps in the moonlight
They walked here too
Through empty playground, this ghost's town
Children again
On rusting swings getting higher
Sharing a dream
On an island, it felt right

[Pre-Chorus]
We lay side by side
Between the moon and the tide
Mapping the stars for a while

[Chorus]
Let the night surround you
We're halfway to the stars
Ebb and flow, let it go
Feel her warmth beside you

[Verse 2]
Remember that night
The warmth and the laughter
Candles burned
Though the church was deserted
At dawn we went down
Through empty streets to the harbour
Dreamers may leave
But they're here ever after
(Da, da, da, da, da)
(Da, da, da, da, da)
(Da, da, da, da, da)
(Da)
You might also like
Where We Start
David Gilmour
This Heaven
David Gilmour
Smile
David Gilmour
[Chorus]
Let the night surround you
We're halfway to the stars
Ebb and flow, let it go
Feel her warmth beside you`}
      </pre>
    </div>
  );
}
