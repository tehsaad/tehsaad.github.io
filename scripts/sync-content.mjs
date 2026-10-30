// Pulls the published portfolio content from www.tehsaad.site into data/portfolio.json.
//   node scripts/sync-content.mjs
import { writeFileSync } from 'node:fs';

const res = await fetch('https://www.tehsaad.site/api/public/content');
if (!res.ok) throw new Error(`content API returned ${res.status}`);
const { publicationId, document: doc } = await res.json();
const { projects, profile, skills, principles, journey } = doc;
writeFileSync(
  new URL('../data/portfolio.json', import.meta.url),
  JSON.stringify({ publicationId, projects, profile, skills, principles, journey }, null, 2) + '\n'
);
console.log(`data/portfolio.json written (publication #${publicationId}, ${projects.length} projects)`);
