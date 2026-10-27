import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(blog) {
  const compiledModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module: compiledModule, exports: compiledModule.exports, console: { warn() {} }, require(name) {
    if (name === '@/lib/seo') return { PUBLIC_DISCOVERY_PATHS: ['/', '/packages', '/book-a-call', '/visibility-check'], SITE_URL: 'https://example.test' };
    if (name === '@/lib/portalIntegration/projects') return { getPublishedProjects: async () => ({ projects: [{ slug: 'real-project', updatedAt: '2026-10-24' }] }) };
    if (name === '@/lib/blog/client') return blog;
    throw new Error(name);
  } });
  return compiledModule.exports.default;
}
test('an unconfigured or failing blog cannot break main page and project discovery', async () => {
  const sitemap = load({ getBlogManifest: async () => { throw new Error('Not configured'); } });
  const routes = await sitemap();
  assert.ok(routes.some(r => r.url === 'https://example.test/packages'));
  assert.ok(routes.some(r => r.url === 'https://example.test/visibility-check'));
  assert.ok(routes.some(r => r.url === 'https://example.test/projects/real-project'));
});
test('enabled blog includes only indexable articles with their own canonical', async () => {
  const article = { url: 'https://example.test/blog/local-search', modified_at: '2026-10-24', seo: {} };
  const sitemap = load({ getBlogManifest: async () => ({ enabled: true }), allBlogPosts: async () => [article, { ...article, url: 'https://example.test/blog/private', seo: { noindex: true } }, { ...article, url: 'https://example.test/blog/duplicate', seo: { canonical: 'https://elsewhere.test/original' } }] });
  const routes = await sitemap();
  assert.equal(routes.filter(r => r.url.includes('/blog')).length, 2);
  assert.ok(routes.some(r => r.url === article.url));
});
