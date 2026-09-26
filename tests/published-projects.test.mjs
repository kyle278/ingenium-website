import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
const filename = fileURLToPath(new URL('../lib/portalIntegration/projects.ts', import.meta.url));
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const siteId = 'test-site';
function record(overrides = {}) {
  return { id: 'example', slug: 'approved-example', published: true, updatedAt: '2026-09-26', websiteDataMap: {}, websiteData: [{ key: 'project_name', label: 'Project name', value: 'Approved example', sourceKind: 'default' }, { key: 'summary', label: 'Summary', value: 'A described scope of work.', sourceKind: 'default' }], ...overrides };
}
function load(payload, status = 200) {
  const compiledModule = { exports: {} };
  vm.runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports, URLSearchParams, URL, console: { error() {} }, fetch: async () => ({ ok: status === 200, status, json: async () => payload }), require: (name) => name === 'react' ? { cache: (fn) => fn } : { PORTAL_SITE_ID: siteId, PORTAL_PROJECTS_ENDPOINT: 'https://example.test/projects' } }, { filename });
  return compiledModule.exports;
}
function ready(projects) { return { ok: true, site_id: siteId, projects }; }
test('only explicit published editorial records are linked; duplicate slugs are suppressed', async () => {
  const api = load(ready([record(), record({ id: 'duplicate' }), record({ published: false, slug: 'private-project' }), record({ slug: '../private' }), record({ websiteData: [] }), record({ websiteData: [{ key: 'x', value: 'malformed' }] })]));
  const result = await api.getPublishedProjects();
  assert.equal(result.status, 'ready');
  assert.equal(result.projects.length, 1);
  assert.equal(result.projects[0].slug, 'approved-example');
});
test('a legitimate empty selection is distinct from dependency failure', async () => {
  assert.equal((await load(ready([])).getPublishedProjects()).status, 'ready');
  assert.equal((await load(null, 503).getPublishedProjects()).status, 'unavailable');
  assert.equal((await load(null, 404).getPublishedProjects()).status, 'unavailable');
});
test('foreign-site or malformed payload is not published', async () => {
  for (const payload of [{ ...ready([record()]), site_id: 'another-site' }, { ok: false, site_id: siteId, projects: [record()] }, null]) {
    assert.equal((await load(payload).getPublishedProjects()).status, 'unavailable');
  }
});
test('detail lookup uses the same publication selection and distinguishes unknown from outage', async () => {
  const api = load(ready([record()]));
  assert.equal((await api.getPortalProjectBySlug('approved-example')).id, 'example');
  assert.equal(await api.getPortalProjectBySlug('unknown-project'), null);
  await assert.rejects(load(null, 503).getPortalProjectBySlug('approved-example'), /temporarily unavailable/);
});
test('summary never falls back to unrelated long fields', () => {
  const api = load(ready([]));
  assert.equal(api.getPortalProjectSummary(record({ websiteData: [{ key: 'private_notes', label: 'Notes', value: 'Unrelated text '.repeat(20) }] })), null);
});
