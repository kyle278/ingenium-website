import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';

const base = process.argv[2] || 'http://localhost:3013';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Use a local production server for this smoke test.');
const routes = ['/', '/websites', '/crm', '/connected', '/ecommerce', '/pricing', '/services', '/how-we-work', '/projects', '/about', '/contact', '/demo', '/technical-review', '/revenue-systems-teardown', '/support', '/security', '/privacy', '/data-handling', '/security-review', '/automations', '/ai-agents'];
const html = new Map();
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const body = await response.text();
  html.set(route, body);
  assert.equal((body.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one H1`);
  assert.ok(body.includes(`href="https://www.ingeniumconsulting.net${route === '/' ? '' : route}"`), `${route}: canonical`);
  for (const phrase of ['FINAL CTA', 'earn the scroll', 'Three proof blocks']) assert.ok(!body.includes(phrase), `${route}: editorial text`);
}
for (const [oldRoute, target] of Object.entries({'/platform':'/connected', '/team':'/about#team', '/implementation':'/how-we-work', '/implementation-methodology':'/how-we-work', '/departments':'/services', '/agents':'/ai-agents'})) {
  const response = await fetch(base + oldRoute, {redirect:'manual'});
  assert.equal(response.status, 308, oldRoute);
  assert.ok(response.headers.get('location')?.endsWith(target), oldRoute + ' target');
}
for (const id of ['websites', 'crm', 'connected']) assert.ok(html.get('/pricing').includes(`id="${id}"`), 'Pricing anchor ' + id);
for (const [route, body] of html) {
  const hrefs = [...body.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)].map(match => match[1]);
  for (const href of new Set(hrefs)) {
    if (href.startsWith('/_next/') || /\.[a-z]+$/i.test(href) || href.startsWith('/projects/')) continue;
    assert.ok(routes.includes(href) || ['/platform','/team','/implementation','/implementation-methodology','/agents','/departments'].includes(href), `${route}: unexpected internal path ${href}`);
  }
}
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
assert.ok(!sitemap.includes('/confirmed') && !sitemap.includes('/website-brief'), 'Private routes excluded');
assert.equal((await fetch(base + '/does-not-exist')).status, 404, 'Unknown route');
const scripts = [...new Set([...html.get('/').matchAll(/<script[^>]+src="([^"]+)"/g)].map(match=>match[1]))];
let compressed = 0;
for (const source of scripts) {
  assert.ok(source.startsWith('/_next/'), 'No unconditional third-party script');
  compressed += gzipSync(Buffer.from(await (await fetch(base + source)).arrayBuffer())).length;
}
console.log(JSON.stringify({pages:routes.length, redirects:6, firstPartyHomeScriptCount:scripts.length, firstPartyHomeGzipBytes:compressed, javascriptBudgetBytes:250*1024, javascriptBudgetMet:compressed<=250*1024}, null, 2));
