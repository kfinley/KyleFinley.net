# KyleFinley.net


### Getting images to work in local dev

To get images to work running local web server (`npm run dev:client`) inside a DevContainer create a symbolic link to the media
folder inside `packages/vue2-client/public/img` with the following command:

```
ln -s /workspaces/ACarNamedSu/media/ media
```
### Emojis

[Full list of emojis](https://github.com/markdown-it/markdown-it-emoji/blob/339abf72f84a02e66fe9a4d682a7217d1f660e6a/lib/data/full.json)
