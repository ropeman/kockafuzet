#!/bin/sh
# Build a test copy of the site into /tmp/kfsite/kockafuzet (served at http://localhost:PORT/kockafuzet/)
set -e
ROOT=$(cd "$(dirname "$0")/../.." && pwd)
rm -rf /tmp/kfsite && mkdir -p /tmp/kfsite/kockafuzet/assets
cp -r "$ROOT/assets/fonts" /tmp/kfsite/kockafuzet/assets/
[ -f "$ROOT/assets/icon-192.png" ] && cp "$ROOT"/assets/icon-*.png /tmp/kfsite/kockafuzet/assets/ || true
python3 "$ROOT/dev/build.py" --base /kockafuzet/ --goatcounter "" --out /tmp/kfsite/kockafuzet
