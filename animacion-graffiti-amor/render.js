// render.js — usa puppeteer para tomar capturas de la demo y guardar frames
// node render.js --outdir ./frames --width 800 --height 600 --duration 6 --fps 15

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

(async ()=>{
  const outdir = argv.outdir || './frames';
  const width = parseInt(argv.width || 800, 10);
  const height = parseInt(argv.height || 600, 10);
  const duration = parseFloat(argv.duration || 6);
  const fps = parseInt(argv.fps || 15, 10);

  if(!fs.existsSync(outdir)) fs.mkdirSync(outdir, {recursive:true});

  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({width, height, deviceScaleFactor:1});

  // abrir el archivo local index.html
  const indexPath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(indexPath);

  const totalFrames = Math.ceil(duration * fps);
  for(let i=0;i<totalFrames;i++){
    // avanzar animación: la demo usa animación CSS (floaty 6s)
    // calculamos tiempo por frame y ejecutamos una small script to force animation progress
    const t = (i/totalFrames) * duration;
    await page.evaluate((t)=>{
      // If needed, we could set CSS variables to offset animation. For now just snapshot.
      // No-op
    }, t);

    const filename = path.join(outdir, `frame-${String(i).padStart(4,'0')}.png`);
    await page.screenshot({path:filename});
    console.log('Wrote', filename);
  }

  await browser.close();
})();
