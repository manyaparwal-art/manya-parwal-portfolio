const fs=require('fs');
const path=require('path');
const root=path.join(__dirname,'..');
const dir=path.join(root,'.next','static','webpack');
const targets=['components/sections/AboutSection.tsx','components/sections/DesignBrain.tsx'];
const files=[];
function walk(d){
  for(const n of fs.readdirSync(d)){
    const p=path.join(d,n);
    const s=fs.statSync(p);
    if(s.isDirectory()) walk(p); else if(p.endsWith('.js')) files.push(p);
  }
}
walk(dir);
let restored=[];
for(const f of files){
  const text=fs.readFileSync(f,'utf8');
  for(const t of targets){
    if(restored.includes(t)) continue;
    const header = `./${t}`; // pattern like ./components/sections/AboutSection.tsx
    const idx = text.indexOf(header);
    if(idx===-1) continue;
    // find module start near idx: search back for '/***/' before idx
    const modStart = text.lastIndexOf('/***', idx);
    const evalIdx = text.indexOf('eval(', modStart);
    if(evalIdx===-1) continue;
    // find the first occurrence of '(__webpack_require__.ts("' after evalIdx
    const tsStart = text.indexOf('__webpack_require__.ts("', evalIdx);
    if(tsStart===-1) continue;
    const strStart = tsStart + '__webpack_require__.ts("'.length;
    const endMarker = '");';
    const strEnd = text.indexOf(endMarker, strStart);
    if(strEnd===-1) continue;
    let raw = text.slice(strStart, strEnd);
    // unescape common sequences
    raw = raw.replace(/\\n/g,'\n').replace(/\\r/g,'\r').replace(/\\t/g,'\t').replace(/\\"/g,'"').replace(/\\'/g,"'").replace(/\\\\/g,'\\');
    // raw may still contain leading wrapper like '\n...'
    // write out
    const outPath = path.join(root, t);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, raw, 'utf8');
    console.log('Restored', t, 'from', f);
    restored.push(t);
  }
}
for(const t of targets){ if(!restored.includes(t)) console.error('Failed to restore', t); }
if(restored.length===0) process.exit(2); else process.exit(0);
