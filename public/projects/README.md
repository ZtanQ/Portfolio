Project screenshots and generated charts go here.

Reference them from `src/data/projects.ts`:

```ts
image: {
  src: "/projects/aldimi-shap.png",
  alt: "SHAP summary plot for the clinical-risk model, with adherence and nutrition at the top",
},
```

Specs:

- **4:3, at least 1280×960.** The project page renders it 640 CSS px wide, so
  1280 covers a retina screen. The card renders it **256 px wide**.
- **PNG** for interface captures.
- **Light theme.** The site is light by default and a dark screenshot sits on
  the cream page like a hole. Switch Streamlit and Tableau to a light theme
  before capturing.
- **No window chrome**: no title bar, no browser tabs or bookmarks bar, no
  desktop behind it.

The 256 px card width is the constraint that decides everything else. A full
dashboard shrunk to 256 px is grey mush. **Capture the one panel that carries
the claim**, not the whole screen — cropped tight, with the largest type in the
frame. If you can't read the labels at thumbnail size, the image is doing
nothing on the home page.

Alt text describes what the image shows and what it demonstrates, not
"screenshot of X".

A project without an image renders in typographic mode, with its metrics set
large in mono. That is a finished state, not a hole: don't add a weak
screenshot just to fill the slot.
