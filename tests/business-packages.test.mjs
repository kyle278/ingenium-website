import test from 'node:test';
import assert from 'node:assert/strict';
import { businessPackages, hasFixedPricing, packageCosts, packagePriceLabel, packageBookingUrl, packageSavings } from '../lib/business-packages.ts';

test('individually quoted work has no numeric price or fabricated cost total', () => {
  for (const item of businessPackages.filter(item => item.route === 'follow-up')) {
    assert.equal(hasFixedPricing(item), false);
    assert.equal(item.price, null);
    assert.equal(item.monthly, null);
    assert.equal(packageCosts(item), null);
    assert.match(packagePriceLabel(item), /Quoted individually/);
    assert.ok(!packagePriceLabel(item).includes('€'));
  }
});

test('website comparisons include care from launch, without a free first year', () => {
  const [starter, website] = businessPackages;
  assert.equal(hasFixedPricing(starter), true);
  assert.equal(hasFixedPricing(website), true);
  assert.deepEqual(packageCosts(starter), { firstYear: 1083, annualAfter: 588 });
  assert.deepEqual(packageCosts(website), { firstYear: 2683, annualAfter: 1188 });
  assert.match(packagePriceLabel(website), /€1,495 one-off \+ €99\/month care from launch/);
});

test('Starter promotion discounts the build only and keeps its regular price distinct', () => {
  const [starter, website] = businessPackages;
  assert.equal(starter.regularPrice, 795);
  assert.equal(starter.price, 495);
  assert.equal(starter.monthly, 49);
  assert.equal(packageSavings(starter), 300);
  assert.match(packagePriceLabel(starter), /Normally €795/);
  assert.match(packagePriceLabel(starter), /current offer €495/);
  assert.match(packagePriceLabel(starter), /monthly care stays €49/);
  assert.equal(packageSavings(website), 0);
  for (const item of businessPackages.filter(item => item.route === 'follow-up')) assert.equal(packageSavings(item), 0);
});

test('fixed and quoted options both retain their own context in the call journey', () => {
  for (const item of businessPackages) {
    const url = new URL(packageBookingUrl(item), 'https://example.test');
    assert.equal(url.searchParams.get('service'), item.service);
    assert.equal(url.searchParams.get('package'), item.id);
  }
});
