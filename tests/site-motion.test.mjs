import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function mount(reduced = false) {
  const effects = [];
  let animations = 0, cancelled = 0, disconnected = 0, changed;
  const media = { matches: reduced, addEventListener: (_, callback) => { changed = callback; }, removeEventListener: () => { changed = undefined; } };
  const element = { children: [{}, {}] };
  const root = { querySelector: () => element, querySelectorAll: () => [element] };
  const compiledModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL('../components/rebuild/SiteMotion.tsx', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { exports: compiledModule.exports, module: compiledModule, window: {matchMedia: () => media}, document: {getElementById: () => root, querySelector: () => element}, require(name) {
    if (name === 'react') return {useEffect: effect => effects.push(effect)};
    if (name === 'next/navigation') return {usePathname: () => '/'};
    if (name === 'motion/mini') return {animate: () => { animations++; return {cancel: () => cancelled++}; }};
    if (name === 'motion') return {inView: (target, enter) => {enter(target); return () => disconnected++;}, scroll: () => () => disconnected++};
    throw new Error(name);
  }});
  compiledModule.exports.default();
  const cleanup = effects[0]();
  return {stats: () => ({animations, cancelled, disconnected}), cleanup, reduce: () => {media.matches = true; changed();}};
}
test('reduced motion skips all entrance and scroll animations', () => {
  const view = mount(true); assert.equal(view.stats().animations, 0); view.cleanup();
});
test('route cleanup cancels animations and disconnects observers', () => {
  const view = mount(); assert.ok(view.stats().animations > 0); view.cleanup();
  assert.equal(view.stats().cancelled, view.stats().animations); assert.ok(view.stats().disconnected > 0);
});
test('enabling reduced motion immediately cancels running effects', () => {
  const view = mount(); view.reduce(); assert.equal(view.stats().cancelled, view.stats().animations); assert.ok(view.stats().disconnected > 0);
});
