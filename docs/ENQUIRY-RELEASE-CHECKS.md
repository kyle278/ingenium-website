# Enquiry and measurement release checks

Implemented in the website rebuild: independent same-origin enquiry submission; schema/notice validation; explicit accepted Portal receipt; stable request reference; bounded same-process replay/rate controls; independent legacy website-brief transport; consent-gated attribution and optional GTM; no hosted Portal tracker interception.

## Intentional release gates

- Durable cross-instance idempotency is NOT fixed. Portal currently inserts without a unique website request key. The website passes `metadata.website_request_id` and keeps a bounded process-local replay cache, but server restart/multiple instances can still duplicate a request. Add Portal DB uniqueness and transactional replay before paid scaling. No automatic retry is made after uncertain receipt; the user is directed to contact email.
- Portal CRM mapping and notification may fail after a submission is saved. Website receipt means saved enquiry only. Verify ordinary client role, owner, exception monitoring and actual delivery before selling automatic handoff as accepted.
- `NEXT_PUBLIC_ENABLE_ANALYTICS` is false by default. Enable only after the account owner verifies GTM-KWCQSXC7/GA4 G-NQ1RH94GDN consent rules, query/PII exclusions, conversion mapping, tag inventory and duplicates. This is a build-time public toggle and requires redeploying.
- Internal `ingenium_lead_received` is pushed only following an accepted receipt and analytics opt-in. Configure one eligible destination mapping to GA4 `generate_lead`, then verify real receipt. A custom event parameter is not automatic GA4 deduplication. Browser dedup is only per-session receipt dispatch; no analytics event fires from confirmation-page visits.
- The old Portal page/event tracker is intentionally not loaded. Therefore this rebuild does not populate Portal anonymous session/event analytics. Its previous mixed-session batching bug is not fixed upstream. Lead tracking continues via the submission endpoint; approved first/latest touch data are carried in metadata, with current approved campaign columns populated.
- Attribution is consented session storage with a 30-minute inactivity window, not cross-device identity. Denied consent yields clean contextual page URLs without campaign history. Raw queries/fragments and unapproved fields are stripped. Values resembling email addresses in UTM fields are discarded.
- Rate controls are process-local protection, not a distributed abuse service. Validate hosting origin/proxy behavior and deploy suitable platform-level limits before scaling.
- Existing private website brief keeps its legacy consent wording/version and entered field contract; its existing validation capture is respected. The new public enquiry has a single canonical approved notice text/version.

## Verification performed

`node --test tests/enquiry-contract.test.mjs tests/enquiry-route.test.mjs`: 20 passing tests. Contract tests cover validation, privacy/marketing split, notice match, accepted-receipt semantics and URL/campaign sanitisation. Route tests transpile the real handler into a VM with an injected fetch mock; no network can be used. They cover origin/schema rejection, genuine 201, rejected 202, upstream failure, concurrent replay, changed-payload conflict, honeypot/size rejection and the existing private brief field contract. Targeted ESLint run on changed enquiry/consent sources. No production form submissions or private account changes.

The optional public marketing checkbox records a request for updates only. No new campaign or automatic subscription email is sent by this implementation. Confirm consent-ledger mapping, suppression and unsubscribe handling before using these preferences for any marketing send.

## Required staging checks before rollout

1. Tracker and analytics blocked/rejected: enquiry still reaches approved test destination once.
2. Invalid email and required acknowledgement absent: visible error and no fetch; bypassed payload receives 422.
3. Accepted receipt -> one truthful receipt UI; honeypot, failed upstream and timeout -> no success conversion.
4. Tagged entry, two internal navigations, accepted test enquiry: expected campaign/source and first/latest metadata in stored record.
5. Concurrent replay/lost response: verify current process behavior; separately prove durable Portal fix across instances before calling idempotency complete.
6. Reject/accept/withdraw/reload, including another-tab withdrawal: optional network/storage follows choice; enquiries continue working. Footer Privacy settings opens the same panel.
7. Private brief validates all existing steps, sends independently and receives its existing success/error DOM events.
8. Client role can view/progress enquiry; staff receipt and promised follow-up actually arrive; marketing opt-out excludes marketing-only sequences.
9. GTM/GA account preview, DebugView and Ads reconciliation after analytics is intentionally enabled. Avoid counting both imported GA4 and independent Ads tags as separate primary leads.
