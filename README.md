# Lifeng Wang

My personal site covers radar and antenna-array research, travel photography, value investing and education at XJTLU.

## Run locally

Run from this directory and open http://127.0.0.1:8000/.

~~~sh
python -m http.server 8000 --bind 127.0.0.1
~~~

The files follow the Week 6 lab layout for a GitHub Pages user site.

~~~text
index.html
css/style.css
js/main.js
assets/
README.md
~~~

The HTML defines the chapters, images and links. The CSS defines the responsive card layout, typography and CSS illustrations. The script controls the narrow-screen menu, the photo dialog and the antenna-array simulation. With JavaScript disabled, chapter navigation and direct photo links remain available.

The simulation displays normalised power for an ideal eight-element uniform linear array with half-wavelength spacing. The source angle is adjustable. The plot displays values down to −30 dB.

For GitHub Pages, place the files at the root of the user-site repository and configure Pages to deploy from the main branch and repository root.

## Credits

- The cover and grouped project cards are inspired by [Nicky Case's site](https://ncase.me/).
- The whiteboard and travel photographs are by Lifeng Wang. The WebP copies contain no camera metadata.
- The Sigmoid label plot is from the public [Sigmoid DOA repository](https://github.com/LIfengWang666/sigmoid-doa/blob/main/figures/fig1_label.png).
- The personal holdings poster uses an English localisation of the poster provided by Lifeng Wang.
- Bricolage Grotesque and Instrument Sans are distributed under their bundled SIL Open Font Licenses.
