import test from 'node:test';
import assert from 'node:assert/strict';
import { businessPackages, getBusinessPackage, hasFixedPricing, packageCosts, packagePriceLabel, packageBookingUrl, packageSavings, packageSetup, STARTER_PROMOTION, starterPromotionActive, promotionTimeLeft, packageEnquirySnapshot } from '../lib/business-packages.ts';

const start = Date.parse(STARTER_PROMOTION.startsAt);
const end = Date.parse(STARTER_PROMOTION.endsAt);
const during = start + 1000;

test('three packages preserve different needs, prices and enquiry services', () => {
  assert.deepEqual(businessPackages.map(p => p.id), ['starter-website', 'business-growth', 'crm-automation']);
  assert.deepEqual(businessPackages.map(p => p.service), ['website', 'connected', 'crm']);
  assert.deepEqual(businessPackages.map(p => p.monthly), [50, 99, 199]);
  assert.equal(hasFixedPricing(businessPackages[0]), true);
  assert.equal(hasFixedPricing(businessPackages[1]), false);
  assert.equal(businessPackages[1].pricing, 'indicative-from');
  assert.equal(businessPackages[2].pricing, 'indicative-from');
});

test('one fixed seven-day campaign excludes the deadline itself', () => {
  assert.equal(end - start, 7 * 24 * 60 * 60 * 1000);
  assert.equal(starterPromotionActive(start - 1), false);
  assert.equal(starterPromotionActive(start), true);
  assert.equal(starterPromotionActive(end - 1), true);
  assert.equal(starterPromotionActive(end), false);
  assert.equal(starterPromotionActive(end + 30 * 86400000), false);
});

test('price, savings and annual comparisons all revert when the countdown expires', () => {
  const [starter, growth, crm] = businessPackages;
  assert.equal(packageSetup(starter, during), 495);
  assert.equal(packageSavings(starter, during), 300);
  assert.deepEqual(packageCosts(starter, during), { firstYear: 1095, annualAfter: 600 });
  assert.equal(packageSetup(starter, end), 795);
  assert.equal(packageSavings(starter, end), 0);
  assert.deepEqual(packageCosts(starter, end), { firstYear: 1395, annualAfter: 600 });
  assert.deepEqual(packageCosts(growth, during), { firstYear: 2688, annualAfter: 1188 });
  assert.deepEqual(packageCosts(crm, during), { firstYear: 5388, annualAfter: 2388 });
  assert.match(packagePriceLabel(growth, during), /Indicative: from €1,500/);
  assert.match(packagePriceLabel(growth, during), /from €99\/month/);
  assert.match(packagePriceLabel(starter, during), /€495/);
  assert.doesNotMatch(packagePriceLabel(starter, end), /€495|Save|Offer ends/);
});

test('countdown never becomes negative, and represents the actual deadline', () => {
  assert.deepEqual(promotionTimeLeft(start), { days: 7, hours: 0, minutes: 0, seconds: 0 });
  assert.deepEqual(promotionTimeLeft(end - 1000), { days: 0, hours: 0, minutes: 0, seconds: 1 });
  assert.deepEqual(promotionTimeLeft(end + 1000), { days: 0, hours: 0, minutes: 0, seconds: 0 });
});

test('canonical package context and legacy links preserve intent', () => {
  for (const item of businessPackages) {
    const url = new URL(packageBookingUrl(item), 'https://example.test');
    assert.equal(url.searchParams.get('service'), item.service);
    assert.equal(url.searchParams.get('package'), item.id);
  }
  assert.equal(getBusinessPackage('7-day-starter').id, 'starter-website');
  assert.equal(getBusinessPackage('leads-to-jobs').id, 'business-growth');
  assert.equal(getBusinessPackage('never-miss-a-lead').id, 'crm-automation');
  assert.equal(getBusinessPackage('invalid'), undefined);
});

test('server quote context uses receipt time and validates the package-service pairing', () => {
  const eligible = packageEnquirySnapshot('starter-website', 'website', end - 1);
  assert.equal(eligible.setup_eur, 495);
  assert.equal(eligible.monthly_eur, 50);
  assert.equal(eligible.starter_promotion_eligible, true);
  assert.equal(eligible.requested_at, new Date(end - 1).toISOString());
  const expired = packageEnquirySnapshot('starter-website', 'website', end);
  assert.equal(expired.setup_eur, 795);
  assert.equal(expired.starter_promotion_eligible, false);
  assert.equal(expired.vat_charged, false);
  assert.equal(packageEnquirySnapshot('starter-website', 'crm', during), null);
  assert.equal(packageEnquirySnapshot('invalid', 'website', during), null);
});
