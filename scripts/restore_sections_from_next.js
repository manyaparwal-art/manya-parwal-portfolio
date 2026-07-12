const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const webpackDir = path.join(root, '.next', 'static', 'webpack');
const targets = [
  'components/sections/AboutSection.tsx',
  'components/sections/DesignBrain.tsx'
];
const files = [];
function walk(dir){
  for(const name of fs.readdirSync(dir)){
    const p = path.join(dir,name);
    const stat = fs.statSync(p);
    if(stat.isDirectory()) walk(p);
    else if(stat.isFile() && p.endsWith('.js')) files.push(p);
  }
}
if(!fs.existsSync(webpackDir)){
  console.error('webpack dir not found:', webpackDir);
  process.exit(1);
}
walk(webpackDir);
let restored = [];
for(const file of files){
  const data = fs.readFileSync(file,'utf8');
  const re = /sourceMappingURL=data:application\/json;charset=utf-8;base64,([A-Za-z0-9+/=]+)/g;
  let m;
  while((m=re.exec(data))!==null){
    try{
      const json = Buffer.from(m[1],'base64').toString('utf8');
      const map = JSON.parse(json);
      if(!map.sources || !map.sourcesContent) continue;
      for(let i=0;i<map.sources.length;i++){
        const src = map.sources[i].replace(/\\\\/g,'/');
        const idx = targets.findIndex(t=> src.endsWith(t));
        if(idx!==-1){
          const content = map.sourcesContent[i];
          if(content){
            const outPath = path.join(root, targets[idx]);
            const dirPath = path.dirname(outPath);
            if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
            fs.writeFileSync(outPath, content, 'utf8');
            console.log('Restored', targets[idx], 'from', file);
            restored.push(targets[idx]);
          }
        }
      }
    }catch(e){ /* ignore */ }
  }
}
for(const t of targets){
  if(!restored.includes(t)) console.error('Did not restore', t);
}
if(restored.length===0) process.exit(2);
else process.exit(0);
