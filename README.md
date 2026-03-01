# YouLyric

YouLyric is a browser extension that injects lyrics under music videos on YouTube.

![Screenshot of the extension showing lyrics under a YouTube video](./public/image.png)

## Features

- Multiple versions of the lyrics, which you can scroll through using the scroll-left and scroll-right buttons
- Zoom in and out
- Manually searching for lyrics if the extension can't find it due to the method it uses to detect songs(more about it later).
- Storing the manually searched song's info in IndexedDB, using dexie.js, so that you don't have to type out the details everytime you run that video.

## How it detects the songs

YouTube itself does half of the job here by providing attributes for most of the songs in the description. This extension then just extracts the title and author name from there as most of the time it's just plain text without any junk in it. Then it fetches the lyrics from [LRCLIB](https://lrclib.net/). Given how it detects the songs, many times it might fail to get the lyrics due to the attributes from YouTube itself might have junk in it. To solve that issue, I've added a feature to manually search for the song by providing title and author name.

**Special thanks to** [LRCLIB](https://lrclib.net/) **for providing this great source for lyrics for free!**

### ToDo

- Adding PIP feature
- Styles customization
- Fix the bug where it switching from a video that has metadata to another video that does not have metadata will render the lyrics of the previous video.

To build this app, simply run:

```
npm install && npm run build
```

**YouLyric is a third-party extension and is not affiliated with YouTube or Google.**
