const fs=require('fs');
const path=require('path');
const hotPath = path.join(__dirname, '..', '.next', 'static', 'webpack');
const files = fs.readdirSync(hotPath).filter(f=>f.includes('app/page') && f.endsWith('.hot-update.js'));
if(files.length===0){ console.error('no hot-update files found'); process.exit(1); }
let found=false;
for(const file of files){
  const p = path.join(hotPath, file);
  const d = fs.readFileSync(p,'utf8');
  const re = /sourceMappingURL=data:application\/json;charset=utf-8;base64,([A-Za-z0-9+/=]+)/g;
  let m;
  while((m=re.exec(d))!==null){
    try{
      const json = Buffer.from(m[1],'base64').toString('utf8');
      const obj = JSON.parse(json);
      for(let i=0;i<obj.sources.length;i++){
        const src = obj.sources[i];
        if(src.endsWith('components/sections/AboutSection.tsx')){
          const content = obj.sourcesContent && obj.sourcesContent[i];
          if(content){
            const outPath = path.join(__dirname, '..', 'components', 'sections', 'AboutSection.tsx');
            fs.writeFileSync(outPath, content, 'utf8');
            console.log('Restored', outPath, 'from', file);
            found=true;
            break;
          }
        }
      }
      if(found) break;
    }catch(e){/* ignore parse errors */}
  }
  if(found) break;
}
if(!found){ console.error('Could not find AboutSection in hot-update source maps'); process.exit(1); }