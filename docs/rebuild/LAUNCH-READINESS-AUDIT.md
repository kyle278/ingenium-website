# Ingenium: what must be done before the launch

Audit date: 26 September 2026. Read-only public website/browser and source review. No application changes, deployments, final form submissions, emails, charges or customer-record changes were made. Normal audit page visits may appear in existing analytics.

## Recommendation

**Prepare and sell through direct conversations now; release paid traffic only after the proof, enquiry handling and measurement gates below pass.** You do not need to finish every automation feature to launch a useful website or CRM service. You do need the advertised workflow to work, someone to receive every enquiry, and a way to distinguish real leads from clicks and failed attempts.

The empty Projects page is one problem. The more important technical discovery is that the contact form currently depends on the analytics script for delivery, and a successful submission response does not establish that its CRM sync or notification succeeded. Fixing consent by simply blocking that script could break enquiries. Treat essential form delivery and optional analytics as separate systems.

Status labels used below:

- **Live confirmed:** observed directly on the public site or through browser interaction.
- **Source confirmed:** present in inspected code; relevant hosted tracker statements were also checked publicly. Production configuration and end-to-end results may differ.
- **Documented:** latest inspected operational records report the condition; recheck current deployment before treating it as present fact.
- **Not verified:** an acceptance requirement, not an assertion that something is broken.

## 1. The launch checklist, in priority order

| Priority | Action | Evidence / status | Owner | Done when |
|---|---|---|---|---|
| Before paid traffic | Restore project proof and links | Live confirmed: empty project feed and three homepage case-study links returning 404 | Website/content | Every promoted case opens, has permissioned content, and supports the capability being sold |
| Before paid traffic | Give enquiry forms an independent delivery path | Source confirmed: the tracker intercepts the form; no independent transport demonstrated | Web/Portal developer | A legitimate enquiry succeeds with analytics blocked or consent rejected, or shows a clear recoverable error |
| Before paid traffic | Make validation authoritative across all submission handlers | Source confirmed risk: React can cancel submission for missing acknowledgement, but the tracker does not check the cancelled event before sending; no live bypass attempted | Web/Portal developer | A cancelled or invalid request cannot be sent by another listener; server validation enforces the agreed required fields |
| Before paid traffic | Verify consent behaviour for analytics and identifiers | Source confirmed: immediate tracker storage/initialisation, no consent lifecycle in inspected path; live tags present. Clean-profile behaviour not verified | Web/analytics owner | Fresh accept/reject/withdraw tests match the adopted policy and do not disable enquiries |
| Before paid traffic | Prove capture → CRM → responsible person | Source confirmed: HTTP 201 can coexist with CRM sync or staff-email errors | Delivery + sales owner | Controlled lead is stored once, visible to the correct client role, assigned, received by the responsible person, and followed up |
| Before paid traffic | Define and verify a real lead conversion | Source confirmed: browser `form_submit` records an attempt before persistence; private GA/GTM goals not inspected | Analytics owner | Exactly one accepted enquiry produces one intended lead conversion; failed attempts and confirmation-page refreshes produce none |
| Before paid attribution decisions | Preserve campaign context across navigation | Source confirmed: form context reads UTMs from current URL. Actual submitted payload not tested | Tracking developer | A tagged landing → internal navigation → submitted lead retains agreed campaign and landing context in reporting |
| Before publishing the three offers | Match claims and package scope to accepted functionality | Documented: latest automation notes distinguish management from live execution | Founder + technical owner | Every advertised automated action has a working deployed example; unsupported actions are omitted or sold explicitly as manual |
| Before campaign pages go live | Replace enterprise budget bands and simplify qualification | Live confirmed: Under 25k / 25k–50k / 50k–100k / 100k+, without currency | Marketing + web | Form offers relevant EUR bands and website/CRM/both intent without implying a €25k starting point |
| Before campaign pages go live | Validate email before leaving step one | Live confirmed: `not-an-email` advances to step two | Web developer | Invalid input stays visible with a clear message; valid users can complete keyboard/mobile flow |
| Before campaign pages go live | Remove internal editorial copy; clarify booking | Live confirmed on homepage/implementation/security; booking outcome not tested | Content owner | Buyer-facing copy explains the offer and whether the next action requests a demo or books an actual slot |
| Before first deposit | Finalise scope, payment, support and exit terms | Not verified; launch plan is a proposal, not implemented commercial terms | Founder | Quote, invoice/product configuration and terms describe the same deliverables and charges |
| Before increasing volume | Make retries safe and failures visible | Source confirmed: no form-request idempotency; downstream failures stored without end-to-end success guarantee | Portal developer | Lost-response retry cannot create duplicate leads/notifications; failures have an owner and recovery route |

These are practical launch gates, not a demand to build enterprise infrastructure before speaking to prospects. Where engineering takes time, reduce the advertised scope and keep a tested manual operational fallback. A direct-sales website offer can precede the full Connected automation launch.

## 2. Specific website changes

### Restore trustworthy proof

The [Projects page](https://www.ingeniumconsulting.net/projects) returns a normal page but displays an empty library and an internal portal-feed explanation. The homepage's Carlow Hearing, Kenny Construction and Holland Pianos detail links returned 404 during the checks. If restoring the feed takes longer, publish a small honest proof page with approved screenshots, scope and links. Do not send paid traffic to empty proof while waiting for the full feature.

A website case supports website work. It does not automatically prove CRM adoption, automated follow-up, ecommerce checkout or a revenue increase. Use a clearly labelled working demonstration for capabilities without a customer case yet.

### Rewrite the editorial leftovers

The [implementation page](https://www.ingeniumconsulting.net/implementation) has the heading “The page has to earn the scroll with a believable rollout.” The [homepage](https://www.ingeniumconsulting.net/) also exposes editorial language around proof and a “FINAL CTA” label. The [security page](https://www.ingeniumconsulting.net/security) speaks about what technical buyers need rather than leading with the actual controls a buyer can assess.

Suggested implementation replacement: **“A clear plan from discovery to launch.”** Explain scoping, build/configuration, testing, training and support in ordinary language, with real client dependencies and achievable dates. Review security claims against evidence rather than adding broad compliance badges.

### Make the forms fit your offers

The [demo form](https://www.ingeniumconsulting.net/demo) takes three steps. Its optional budget field currently makes a €1,500 website and a €4,500 connected build disappear into one broad “Under 25k” band.

Suggested **implementation budget** choices: “Under €2,000”; “€2,000–€5,000”; “€5,000–€10,000”; “€10,000+”; “Need guidance”. Label recurring service separately. Add an explicit need selector: Website / CRM / Website + CRM / Ecommerce / Not sure. Keep budget optional or collect it in the review if it hurts useful enquiries.

I entered a synthetic name and malformed email, then clicked Continue: the form advanced. The final submit was not attempted, so a final validation failure is not confirmed. Validate email at the visible step and return focus to the relevant error instead of allowing a hidden invalid field to cause trouble later.

Privacy acknowledgement and marketing opt-in are separate, and marketing is unchecked: keep that. Make “Privacy Policy” an actual link beside the acknowledgement, and store the precise text/version displayed. A source/public-page comparison found the hidden consent snapshot does not exactly match the visible acknowledgement; reconcile those rather than maintaining two copies.

The fallback email and phone should be tappable `mailto:` and `tel:` links. In the inspected demo DOM there was no mailto link despite the displayed fallback address. This is a quick mobile improvement, not an independent launch blocker.

### Be accurate about booking

“Book Demo” currently leads to a request form, with copy mentioning scheduler confirmation. No appointment selector appeared in the inspected pre-submit journey. That is not proof a post-submit scheduler is absent.

Choose the actual experience: either “Request a demo — we reply within one business day” or a working booking flow with timezone, available slots, confirmation and rescheduling. Test the final outcome before claiming an appointment is booked. Do not count a request and a scheduled meeting as the same conversion.

### Create the three campaign destinations

Each lane needs matching ad/email copy, a dedicated landing destination, appropriate proof, clear inclusions/exclusions, price presentation and one main CTA. Website-only buyers should not have to decode the whole platform or buy CRM. CRM buyers should know their current website can stay. Connected buyers should see exactly which connection is included.

The proposed prices in the launch plan are not automatically your live offer. Approve them against actual costs and capacity, then use the same figures in pages, proposals and billing. Explicitly distinguish build cost, recurring service, VAT, third-party licences, usage and cancellation.

## 3. Tracking: what is present and what needs work

The browser loaded **GTM-KWCQSXC7**, **GA4 G-NQ1RH94GDN**, and the Portal tracker. This proves tag presence, not correctly configured conversions, consent or reporting. No authenticated GA4, GTM or advertising account was inspected.

### Separate transport from tracking

The current marketing form relies on the hosted tracker to intercept and post it to the Portal. Build a form submission path that works independently, then attach tracking context only when available and appropriate. Avoid two handlers accidentally posting the same enquiry.

The source review also found a validation coordination risk: the form's capture handler calls `preventDefault` for a missing acknowledgement, while the tracker listener does not check `event.defaultPrevented` before sending. The checkbox's “required” presentation is not native checkbox validation. This is a source-confirmed risk, not an executed production bypass. Make one handler responsible for validation and transport, enforce the agreed rules on the server, and test unchecked acknowledgement before release.

Consent handling must cover the Portal's identifiers as well as Google tags. The tracker uses localStorage/sessionStorage and starts tracking on initialisation in the inspected source. No cookie interface appeared in the browser session, but that session was not established as a clean first-time profile. Test fresh profiles and actual network/storage behaviour before making a definitive production conclusion. Irish DPC guidance generally requires consent for nonessential cookies or similar technologies and identifies a strictly necessary exception. [DPC guidance](https://www.dataprotection.ie/en/dpc-guidance/guidance-cookies-and-other-tracking-technologies)

### Preserve attribution deliberately

The inspected tracker gets UTMs from the current URL at submission. Clicking from a tagged landing page to an untagged demo page can therefore leave the submission without the original campaign fields. Event/session history may preserve some context, so this is not a claim that all analytics attribution is lost.

Browser inspection of hidden fields was inconclusive: they appeared blank both after internal navigation and on a directly tagged demo URL, and submit refreshes the fields. No payload was sent. The source-level dependency is the reason for the required end-to-end test.

Define first-touch and latest-touch handling, retention period, permitted click IDs and consent-denied behaviour. Store landing page separately from submission page. Keep direct visits from overwriting an established campaign except under a documented rule. Never solve this by retaining arbitrary query strings indefinitely.

Use a simple campaign convention such as `utm_source=linkedin`, `utm_medium=organic_social`, `utm_campaign=ie_connected_launch`, `utm_content=demo_walkthrough_01`. No customer names, emails or other personal information in campaign parameters.

### Count what actually happened

| Event / record | Trigger | Use |
|---|---|---|
| `cta_clicked` | A relevant CTA is clicked | Journey diagnosis; not a lead |
| `form_submit_attempt` | User attempts submission | Friction/failure diagnosis; not a successful conversion |
| Internal `lead_received`, mapped to GA4 `generate_lead` where appropriate | Server confirms a genuine persisted enquiry | Initial lead conversion, once per submission |
| `meeting_booked` | Scheduling is actually confirmed | Separate appointment metric |
| CRM `qualify_lead` | Sales records an agreed qualification decision | Lead quality and campaign comparison |
| CRM won/paid record | Deal is won/payment collected under a defined rule | Revenue and acquisition economics |

Use a non-personal submission identifier internally for reconciliation and explicit deduplication; merely adding an ID to a GA4 custom event does not automatically deduplicate it. Do not send contact names, email addresses, telephone numbers or free-text enquiry bodies to GA4. [Google event guidance](https://support.google.com/analytics/answer/9267735?hl=en), [PII guidance](https://support.google.com/analytics/answer/6366371?hl=en)

Portal reports already count stored submissions, which is a useful distinction. The browser's existing `form_submit` event is earlier than that. Check GTM/GA4/Ads configuration rather than assuming those attempts are currently being used as conversions. A honeypot response can also follow the generic browser success path despite `accepted:false`; require a genuine accepted record before counting a lead.

For paid search, choose one intended primary lead conversion for the campaign. Do not double-count both an imported GA4 conversion and a separate ad tag for the same enquiry. Treat clicks and intermediate form steps as secondary diagnostics. Verify received events in GA4 Realtime/DebugView, then reconcile to the Portal record and the advertising platform. [Google verification guidance](https://support.google.com/analytics/answer/9322688?hl=en)

## 4. Enquiry operations: a green tick is not enough

The Portal saves the enquiry before some downstream work. That is sensible because an email outage should not discard the enquiry. However, code can return HTTP 201 even when CRM sync fails, and staff notification is only attempted if a form recipient is configured. Provider acceptance does not prove inbox delivery. A staff notification also does not prove a prospect acknowledgement was sent.

For every promoted form, nominate a primary owner and backup, confirm their access, and agree the one-business-day response promise already advertised. Prove these separately:

1. Submission stored against the correct organisation, site and form.
2. Correct CRM person/opportunity and promised fields visible to an ordinary authorised user.
3. An owner and next action recorded.
4. Staff notification arrives where promised, with a working record link.
5. The prospect receives the promised next step, manually if necessary.
6. Source/lane and the accepted-lead conversion reconcile once.

Create a daily exception view for captured-but-unmapped submissions, notification errors and enquiries without a next action. The operator should repair the original record, not ask the prospect to submit again. Retrying a lost response must eventually be idempotent so it cannot duplicate records and notifications.

Before selling live automation, check current Worker/gateway/database/source-capture settings, sender verification and delivery evidence. The latest inspected delivery notes say execution remains disabled and record sender verification problems; these are documented conditions requiring a fresh operational check, not a new live infrastructure test performed in this audit. Until accepted, sell the working manual process honestly or defer the automated part.

## 5. Exact go-live rehearsal

Run failure tests on an isolated staging tenant with customer sends disabled. Then have the owner perform one labelled production smoke test per promoted route using an agreed internal mailbox and normal user account. Record test IDs and exclude these from campaign reporting. This audit did not perform those submissions.

| Test | Pass condition |
|---|---|
| Normal mobile enquiry | Clear validation, one saved enquiry, expected CRM fields, owner, notification and usable next step |
| Tagged landing → two internal pages → enquiry | Agreed campaign/landing values survive into submission, CRM attribution and reporting |
| Analytics rejected or script blocked | Enquiry still works; optional tracking follows the adopted policy |
| Accept → withdraw → reload | Tracking lifecycle and storage respect each choice; form remains usable |
| Invalid email / missing required fields | Error appears at the visible field; no saved enquiry or accepted-lead event |
| Double-click / timeout after committed write / retry | One logical submission and one notification; replay returns the original accepted result |
| CRM mapping failure / email failure | Original enquiry remains saved; named operator sees the exception and can recover it safely |
| Honeypot / spam test | No real lead record, notification or successful-lead conversion |
| Confirmation page refresh/direct visit | No additional lead conversion |
| Marketing unchecked | Requested reply allowed; marketing-only follow-up excluded |
| Ordinary client login | Client can find and progress the enquiry using sold products/permissions, not administrator bypass |
| Billing preview and exit walkthrough | Correct setup/recurring/seat amounts; cancellation and data export responsibilities are explicit |

Record deployed version, route, test identifier, expected result, actual result, evidence and owner/date. Evidence should include the saved record and received notification, not just a front-end toast. A single screenshot of an automation builder is not execution evidence.

## 6. Commercial and delivery preparation

Before the first deposit, finish one scope sheet per lane, with client dependencies, acceptance, revision limits, included support, licence/usage charges, payment schedule, cancellation and data/export/ownership arrangements. Internal repository or hosting ownership does not itself establish what the client is contractually entitled to receive.

Prepare a standard proposal, discovery agenda, onboarding checklist and handover checklist. Reserve real delivery hours, not just a generic number of projects. Confirm the actual user/seat and billing catalogue setup in the Portal; a product being visible to your admin account is not proof a client can access it or be billed correctly.

Nominate the person reviewing enquiries daily, the person delivering, the backup for each, and the person reviewing weekly campaign economics. Record lane, source, qualified status, proposal, win/loss reason, cash collected and real delivery/support time. A basic weekly report is enough; an elaborate dashboard is optional.

The existing onboarding checklist and newer form guide contain differing instructions about website-side versus portal-managed submission. Align the checklist with the selected architecture so future client builds reproduce the same accepted behaviour.

## 7. Improvements that should not delay a small controlled launch

- Review robots/sitemap rules and Search Console, then refresh stale review dates only after actual content review. Crawl directives are not access controls.
- Improve tappable contact details, form autocomplete, headline wording and navigation jargon.
- Check Core Web Vitals and a real iPhone/Android journey; no Lighthouse score, field performance benchmark or complete accessibility audit is claimed here.
- Add stronger case studies and a public ownership/support explanation as evidence develops.
- Address mixed-session event batching, URL/query allowlists and deployment-level spam/rate settings before measurement becomes a larger operational dependency. Do not interpret origin filtering as authentication.
- Add richer offline revenue attribution, creative variants and weekly-price experiments after reliable basic capture. They are not prerequisites for the first referral-led projects.

Observed positives: the inspected desktop/mobile demo journey renders; the 390px mobile check showed no horizontal overflow; mobile menu and service submenu opened; all three demo-form steps were reachable; optional marketing was unchecked; no browser warning/error was captured in the inspected session. These are bounded checks, not end-to-end production certification.

## 8. Suggested order of work

**First:** restore proof, remove internal copy, fix form email validation and budget bands, and agree exact offer/booking wording.

**Next engineering pass:** separate form transport, implement/verify consent, preserve attribution and define accepted-lead measurement. Add failure visibility and request idempotency in the same form-delivery work where practical.

**Then:** run the controlled rehearsal, verify analytics/ads account mappings, nominate response owners, approve scope/terms and reserve delivery capacity.

**Launch:** start with a small warm/referral cohort and one paid tranche only after its gates pass. The website lane can go first. Launch CRM/Connected with the exact capabilities accepted, without waiting for unrelated AI or advanced automation work.

### Supporting technical reports

- [Public-site audit](audit-public-site.md): HTTP, content, SEO and form presentation evidence.
- [Tracking audit](audit-tracking.md): exact source references, attribution, consent, form delivery, retries and event semantics.
- [Delivery-readiness audit](audit-delivery-readiness.md): CRM handoff, notifications, execution, membership, billing and commercial acceptance.

Scope limits: no private GA4/GTM/Ads settings, live database, sender console, billing account or production delivery receipt was inspected. No final form was submitted. Findings above deliberately separate observed/source defects from readiness tests that remain to be performed.
