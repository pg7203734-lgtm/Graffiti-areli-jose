#!/usr/bin/env bash
# generate_gif.sh — captura la demo local y genera un GIF usando puppeteer + ffmpeg
# Requisitos: node, npm, ffmpeg
# Uso:
#   chmod +x generate_gif.sh
#   ./generate_gif.sh

set -e
OUTDIR=render_frames
GIFNAME=graffiti-amor-parallax.gif
WIDTH=800
HEIGHT=600
DURATION=6   # segundos
FPS=15

rm -rf "$OUTDIR"
mkdir -p "$OUTDIR"

# instalar dependencias si no existen
if [ ! -d node_modules ]; then
  echo "Instalando dependencias de Node (puppeteer)..."
  npm install puppeteer@20 --no-audit --no-fund
fi

node render.js --outdir "$OUTDIR" --width $WIDTH --height $HEIGHT --duration $DURATION --fps $FPS

# convertir PNGs a GIF con ffmpeg (usa palette para mejor color)
ffmpeg -y -framerate $FPS -i "$OUTDIR/frame-%04d.png" -vf "palettegen" palette.png
ffmpeg -y -framerate $FPS -i "$OUTDIR/frame-%04d.png" -i palette.png -lavfi "paletteuse" $GIFNAME

echo "GIF listo: $GIFNAME"
