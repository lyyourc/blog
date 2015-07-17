# ====== Before ===== #
# Install purifycss: npm install purify-css -g

# ===== Usage ======= #
# in the root directory, run: sh purifycss.sh

# ===== Instrcution ======= #
# purifycss anything relate to css(css, html, js files) --out out.css 

purifycss public/styles/app.css public/index.html public/scripts/app.js --out public/styles/app.css --min --info
