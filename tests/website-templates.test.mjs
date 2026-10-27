import test from 'node:test';
import assert from 'node:assert/strict';
import { TEMPLATE_INDUSTRIES, WEBSITE_TEMPLATES, readTemplateAccess, canViewTemplate, templateInterest } from '../lib/website-templates.ts';

test('two distinct previews are free; repeats stay free and a third needs details', () => {
  const access = { viewed: ['first', 'second'], unlocked: false };
  assert.equal(canViewTemplate({ viewed: [], unlocked: false }, 'first'), true);
  assert.equal(canViewTemplate({ viewed: ['first'], unlocked: false }, 'second'), true);
  assert.equal(canViewTemplate(access, 'first'), true);
  assert.equal(canViewTemplate(access, 'third'), false);
  assert.equal(canViewTemplate({ ...access, unlocked: true }, 'third'), true);
});

test('stored access survives reload and handles unavailable or invalid storage', () => {
  assert.deepEqual(readTemplateAccess(null), { viewed: [], unlocked: false });
  assert.deepEqual(readTemplateAccess('invalid'), { viewed: [], unlocked: false });
  assert.deepEqual(readTemplateAccess('{"viewed":["first","first",false],"unlocked":"true"}'), { viewed: ['first'], unlocked: false });
  const state = { viewed: ['first', 'second'], unlocked: true };
  assert.deepEqual(readTemplateAccess(JSON.stringify(state)), state);
});

test('lead interest includes earlier industries and the requested third template without duplicates', () => {
  const templates = [{ id: 'first', title: 'Clean One', industry: 'cleaning' }, { id: 'second', title: 'Garden One', industry: 'landscaping' }, { id: 'third', title: 'Clean Two', industry: 'cleaning' }];
  assert.deepEqual(templateInterest(['first', 'second', 'first'], templates[2], templates), {
    industries: ['Cleaning', 'Landscaping'], titles: ['Clean One', 'Garden One', 'Clean Two'],
  });
});

test('all seven requested industries exist and the three temporary examples are labelled as demos', () => {
  assert.equal(TEMPLATE_INDUSTRIES.length, 7);
  assert.equal(new Set(TEMPLATE_INDUSTRIES.map(item => item.id)).size, 7);
  assert.equal(WEBSITE_TEMPLATES.length, 3);
  for (const template of WEBSITE_TEMPLATES) {
    assert.match(template.title, /\(demo\)/);
    assert.match(template.description, /Fictional business/);
    assert.equal(new URL(template.url).origin, 'https://www.ingeniumconsulting.net');
    assert.ok(TEMPLATE_INDUSTRIES.some(industry => industry.id === template.industry));
  }
});
