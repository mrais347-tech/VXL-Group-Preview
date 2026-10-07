import {cp,mkdir,rm,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(project,'dist');
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
for(const name of ['index.html','style.css','app.js','founder.html','founder.css','founder.js','contact.html','secret-garden.html','pages.css','secret-garden.css'])await copyFile(path.join(project,name),path.join(output,name));
await cp(path.join(project,'assets'),path.join(output,'assets'),{recursive:true});
console.log('VXL static preview built in dist.');
