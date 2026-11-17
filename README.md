# Lifeng Wang

My academic portfolio covers research in antenna arrays and radar, engineering experience, and undergraduate studies at XJTLU.

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

The HTML defines the profile and links. The CSS defines typography and the responsive layout. The script adds the narrow-screen menu and draws the antenna-array simulation using the Canvas 2D API. The profile and its links are available with JavaScript disabled.

The simulation displays normalised power for an ideal eight-element uniform linear array with half-wavelength spacing. The source angle is adjustable. The plot displays values down to −30 dB.

For GitHub Pages, place the files at the root of the user-site repository and configure Pages to deploy from the main branch and repository root.
