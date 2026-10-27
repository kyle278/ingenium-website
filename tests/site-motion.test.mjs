import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// The current SiteMotion uses a native scroll indicator and IntersectionObserver.
// Keep this harness aligned with the browser APIs it actually owns.
function mount(reduced = false) {
  const effects = [], listeners = new Map(), frames = new Map();
  let disconnected = 0, frameId = 0, changed;
  const progress = { style: {} };
  const process = { classList: { add() {} } };
  const media = { matches: reduced, addEventListener: (_, callback) => { changed = callback; }, removeEventListener: () => { changed = undefined; } };
  const root = { querySelector: () => process };
  const compiledModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL('../components/rebuild/SiteMotion.tsx', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const window = {
    matchMedia: () => media, innerHeight: 1000, scrollY: 500,
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: name => listeners.delete(name),
    requestAnimationFrame: callback => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
  };
  vm.runInNewContext(code, {
    exports: compiledModule.exports, module: compiledModule, window,
    document: { documentElement: { scrollHeight: 2000 }, getElementById: () => root, querySelector: () => progress },
    IntersectionObserver: class { observe() {} disconnect() { disconnected++; } },
    require(name) {
      if (name === 'react') return { useEffect: effect => effects.push(effect) };
      if (name === 'next/navigation') return { usePathname: () => '/' };
      throw new Error(name);
    },
  });
  compiledModule.exports.default();
  const cleanup = effects[0]();
  function flush() { for (const [id, callback] of frames) { frames.delete(id); callback(); } }
  return { progress, cleanup, listeners, frames, disconnected: () => disconnected, flush,
    reduce() { media.matches = true; changed(); flush(); } };
}

test('reduced motion keeps the scroll indicator at zero', () => {
  const view = mount(true); assert.equal(view.progress.style.transform, 'scaleX(0)'); view.cleanup();
});
test('route cleanup cancels pending frames and disconnects native observers', () => {
  const view = mount(); assert.equal(view.progress.style.transform, 'scaleX(0.5)');
  view.listeners.get('scroll')(); assert.equal(view.frames.size, 1);
  view.cleanup(); assert.equal(view.frames.size, 0); assert.equal(view.listeners.size, 0); assert.ok(view.disconnected() > 0);
});
test('enabling reduced motion resets the running indicator', () => {
  const view = mount(); view.reduce(); assert.equal(view.progress.style.transform, 'scaleX(0)'); view.cleanup();
});
