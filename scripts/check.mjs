import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p);else files.push(p);}}
await walk(root);
const pages=files.filter(p=>p.endsWith('.html'));
assert.equal(pages.length,3,'Expected homepage and exactly two case studies.');
let links=0;
for(const file of pages){
  const html=await readFile(file,'utf8');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: one h1 required`);
  assert.match(html,/<html lang="en">/);
  assert.match(html,/<title>[^<]+<\/title>/);
  assert.match(html,/<meta name="description" content="[^"]+">/);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(ids.length,new Set(ids).size,`${file}: duplicate id`);
  for(const image of html.matchAll(/<img\b[^>]*>/g)){assert.match(image[0],/\balt="[^"]+"/);assert.match(image[0],/\bwidth="\d+"/);assert.match(image[0],/\bheight="\d+"/);}
  for(const match of html.matchAll(/\b(?:href|src)="([^"]*)"/g)){
    const target=match[1];
    assert(target && target!=='#',`${file}: empty link`);
    if(/^(https?:|mailto:)/.test(target))continue;
    const [pathname,hash]=target.split('#');
    let resolved=pathname?path.resolve(path.dirname(file),decodeURIComponent(pathname)):file;
    assert(resolved.startsWith(root),`${file}: link escapes dist`);
    const info=await stat(resolved).catch(()=>null);
    assert(info,`${file}: missing target ${target}`);
    if(info.isDirectory())resolved=path.join(resolved,'index.html');
    const body=await readFile(resolved);
    if(hash)assert(body.toString().includes(`id="${hash}"`),`${file}: missing anchor ${target}`);
    links++;
  }
}
const pdf=await readFile(path.join(root,'resume/Sarp_Aygen_Resume.pdf'));
assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
assert(!files.some(f=>/\.(env|java|py)$/.test(f)),'Unrelated source or environment file in output');
const size=(await Promise.all(files.map(async f=>(await stat(f)).size))).reduce((a,b)=>a+b,0);
console.log(`PASS: ${pages.length} pages; ${links} internal links/assets/anchors; image alt text and dimensions; PDF signature; page metadata; unique IDs.`);
console.log(`Static output: ${files.length} files, ${(size/1024).toFixed(0)} KiB. External network links require separate verification.`);
