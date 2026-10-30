import {mkdir,rm,cp,writeFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import site from '../content/site.mjs';
import projects from '../content/projects.mjs';
import {home,project,page,esc} from '../src/templates.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
await mkdir(dist,{recursive:true});
// Preserve the output directory itself so a running static server keeps its cwd.
for(const entry of await readdir(dist)) await rm(path.join(dist,entry),{recursive:true,force:true});
await cp(path.join(root,'public'),dist,{recursive:true});
await writeFile(path.join(dist,'index.html'),page(site,home(site,projects),{title:'Sarp Aygen — Software Developer',description:site.description}));
for(const p of projects){
  const folder=path.join(dist,'projects',p.slug);
  await mkdir(folder,{recursive:true});
  await writeFile(path.join(folder,'index.html'),page(site,project(site,p,projects.find(q=>q!==p)),{title:`${p.name} — Sarp Aygen`,description:p.summary,base:'../../',path:`projects/${p.slug}/`}));
}
await writeFile(path.join(dist,'.nojekyll'),'');
if(site.siteUrl){
  const url=site.siteUrl.replace(/\/$/,'');
  await writeFile(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...projects.map(p=>`projects/${p.slug}/`)].map(p=>`<url><loc>${esc(url+'/'+p)}</loc></url>`).join('')}</urlset>`);
  await writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${url}/sitemap.xml\n`);
}
console.log('Built homepage and 2 case studies in dist/.');
console.log(site.siteUrl?'Canonical URLs and sitemap generated.':'Public URL not configured; canonical URLs and sitemap intentionally omitted.');
