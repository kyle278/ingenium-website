# Ingenium campaign launch: delivery readiness audit

Read-only audit, 26 September 2026. Scope: local application source, integration guides, onboarding procedures and latest automation delivery log. No environment secrets read, database calls made, emails sent, customer records changed, deployments run or fixes applied. Line references identify inspected repository evidence; they are not proof of current deployed configuration. Parent workstream separately verified public website issues.

## Launch decision

Proceed with offer preparation and buyer discovery. Do not yet promise autonomous follow-up, automatic customer emails, or fully running multi-step campaigns as standard features of the combined package. The repository supports a concrete form-to-CRM architecture, but a successful form response does not prove CRM mapping, notification delivery, ownership or client access succeeded. Require a recorded end-to-end acceptance journey before directing paid campaign traffic to each offer.

The website-only lane can be launched independently once its enquiry recipient, proof, support and scope are validated. CRM-only and Connected require ordinary client-user acceptance, billing/licence readiness and an agreed manual follow-up fallback. A manually assigned owner and next action are acceptable for a clearly sold manual workflow; they are not evidence that automation is live.

Status definitions:

- **Confirmed source behaviour:** directly visible in current inspected code; production outcome still depends on deployed version/configuration.
- **Documented blocker:** latest relevant delivery record explicitly identifies an outstanding condition; fresh operational verification is needed before stating it remains live today.
- **Unverified/proposed gate:** business readiness or deployed behaviour not established by this audit; absence of proof is not a confirmed product defect.

## Evidence and acceptance conditions

| Priority / status | Finding and local evidence | Consequence | Acceptance condition and accountable role |
|---|---|---|---|
| P0, confirmed source behaviour | [Form submit route](../../app/api/websites/forms/submit/route.ts#L384), lines 384–409 inserts the submission; lines 445–465 catch CRM sync failure and attempt to store `crm_mapping_sync_error`; lines 496–509 still return HTTP 201. | A success toast establishes capture, not complete CRM handoff. | Delivery owner submits an identifiable synthetic lead and verifies exact tenant/site/form, mapped CRM fields and client-visible record. Also demonstrate how an operator notices and resolves a captured submission whose CRM sync failed. |
| P0, confirmed source behaviour | [Form submit route](../../app/api/websites/forms/submit/route.ts#L413), lines 413–442 only sends a staff notification when `form.notification_email` exists; stores error or provider ID; notification failure does not reject captured submission. | A blank recipient silently means no staff email is attempted. An absent email is not proof the lead was lost. | Sales owner names primary and backup recipient for every public form. Delivery owner proves arrival in their real agreed mailbox using a controlled test, records provider result, and verifies daily portal review fallback. |
| P0, confirmed source behaviour | [Email sender](../../lib/email.ts#L810), lines 810–872 sends to configured staff recipient and returns success from provider response. [Configuration health](../../lib/server/portal-email.ts#L85), lines 85–129 checks configuration presence/syntax, not domain verification or inbox arrival. | Neither configuration health nor provider acceptance proves delivery; this route is a staff notification, not an automatic prospect acknowledgement. | Separate acceptance: sender verified; controlled mailbox receipt; working portal link; failure monitoring. Do not advertise auto-acknowledgement on the strength of this function. |
| P0, documented blocker | [Automation delivery log](../../docs/automation-studio-delivery.md#L117), lines 117–129 records disabled production Worker/runtime/capture and failed/partially failed sender-domain verification. Latest additions, lines 131–146, add management/basic/scheduled capability but explicitly do not enable execution. | Production builder availability is not execution readiness. | Technical release owner supplies current deployment/version and controlled acceptance evidence for Worker, gateway, database, source capture and verified sender before enabling an automation claim. |
| P0, confirmed source behaviour | [Worker gateway](../../app/api/automation-studio/worker/route.ts#L17) checks explicit enablement; [Worker](../../workers/automation-studio/src/index.ts#L20) pauses publishing by default and line 113 retries queue messages while disabled; [Studio email](../../lib/server/automation-studio/email.ts#L6) rejects when disabled. | Multiple independent controls must be ready. Changing only a UI workflow to active is insufficient. | Technical owner follows reviewed rollout sequence in the Worker runbook, validates chosen workflow under duplicate delivery/failure, and records rollback and alert recipient. This audit does not authorise switching these controls. |
| P0, confirmed source contract | [Integration guide](../../website-setup/website-forms-portal-integration.md#L7), lines 7–26 describes server-resolved tenant identity and public site/form inputs; line 88 excludes standard file uploads. | “Native connection included” can be precise; “all integrations included” cannot. | Commercial scope names website + portal components, forms and mapped fields, explicitly excludes file uploads/custom third-party systems unless separately scoped. |
| P1, confirmed source behaviour | [CRM sync](../../lib/server/website-form-crm-sync.ts#L412), lines 425–448 reads mapping and existing references; no mappings returns zero mapping changes. Lines 465–495 sync lead/contact/account targets. | A created submission may exist with zero additional field mappings; service-interest/source/ownership claims need their own check. | Delivery owner demonstrates each promised field and the intended owner/next action. Record expected mapping and actual client-user view. No blanket assertion that owner assignment is absent elsewhere in the product is made. |
| P0, documented onboarding requirement | [Onboarding guide](../../docs/organiser-onboarding-operations.md#L35), lines 35–58 distinguishes owner, product, seats and paid prices. Lines 144–152 requires active owner membership and explains Analytics alone is not CRM access. | An internal administrator's successful demo is not client onboarding acceptance. | Client owner accepts invitation, signs in as ordinary account, opens the sold product and completes intended workflow. Verify each user's actual seat, not only reserved invitation. |
| P0, documented configuration risk | [Onboarding guide](../../docs/organiser-onboarding-operations.md#L256), lines 256–270 records a dated September 22 client snapshot with incomplete membership/licences and missing catalogue prices. | Historical evidence of setup pitfalls, not a current universal product limitation. | Operations owner rechecks the catalogue and target client arrangement; records active products, recurring and seat prices, paid/complimentary basis and settled operation before handover. Do not treat the snapshot as current customer status. |
| P1, documented requirement | [Onboarding guide](../../docs/organiser-onboarding-operations.md#L215), lines 215–224 separates access from billing and says CRON/reminder readiness is distinct. | Removing a user does not stop charges; connected provider does not mean scheduled work runs. | Billing owner tests agreed cancellation/seat-change procedure in a safe test arrangement and documents effective date, reconciliation owner and scheduler dependencies. |
| P1, documentation inconsistency | [Execution checklist](../../website-setup/client-onboarding/CLIENT_EXECUTION_CHECKLIST.md#L35), line 39 calls for a website server-side route, while the newer [integration guide](../../website-setup/website-forms-portal-integration.md#L7), lines 7–26 makes portal-managed submission preferred and website-side privileged routes exceptional. | Delivery teams could implement two different standard architectures. | Delivery owner resolves the checklist against the latest contract and writes the selected model in each handover. No code change made here. |
| P1, ownership policy unverified | [Execution checklist](../../website-setup/client-onboarding/CLIENT_EXECUTION_CHECKLIST.md#L53), lines 53–64 defaults repository and hosting ownership to an internal account absent an approved destination. | Hosting implementation choice does not settle contractual ownership, transfer rights or client exit. | Commercial owner provides signed terms for domain, source, assets, data export, subscriptions and transfer/exit before accepting deposit. |

## Automation claim boundary

The latest delivery log is the chronology to use when older runbook text differs. The Worker README still describes some items as pending that newer log sections report as implemented locally or hosted; do not use an older pending list as proof those features are absent. Equally, newer management capability does not override explicit runtime-off statements.

The [email log](../../docs/automation-studio-delivery.md#L103), lines 103–109 distinguishes provider acceptance, delivery, bounces and unknown outcomes; plain-text transactional email is the implemented adapter, while mutable marketing templates are rejected. [Worker runbook](../../workers/automation-studio/README.md#L45), lines 45–49 requires separate provider/webhook configuration and a verified sender per organisation. Unknown send outcomes must be investigated, not resent using a fresh effect identity.

Allowed campaign wording after capture acceptance: “Your website sends the agreed enquiry details into your CRM.” After owner acceptance: “Your team can see the enquiry, its owner and the next step.” Only after execution acceptance: “This specific follow-up step runs automatically.” Avoid “every campaign launches automatically”, “all leads always sync in real time”, or “AI handles your follow-up” until supported by precise release and customer evidence.

## Three-lane launch checklist

### Gate A: commercial offer and scope — founder/commercial owner

- [ ] Websites: page count, copy responsibility, forms, revisions, SEO baseline, hosting/care limits and client content deadline are explicit. Existing CRM optional.
- [ ] CRM: discovery deliverable, platform choice, data migration allowance, user/seat allowance, supported objects, training and adoption review are explicit.
- [ ] Connected: exact included form-to-record flow, mapped fields, manual versus automated steps and agreed response owner are written; file upload and external system exclusions visible.
- [ ] Ecommerce is a separate scoped extension covering catalogue, payment, tax/shipping, inventory and licence fees. A catalogue website is not represented as an ecommerce case study.
- [ ] Prices distinguish setup, recurring fee, VAT, licence/seat charges, payment cadence, minimum term and exit amount. Weekly display must match billing terms and annual total.
- [ ] Weekly collection is not promised until billing supports and reconciles it. The inspected [billing model](../../lib/billing.ts#L9) contains monthly price fields (also lines 25, 98); this alone does not prove weekly Stripe collection is impossible, but makes it a separate acceptance requirement.
- [ ] Deposits and signature trigger reserved delivery dates; discovery completion and assets trigger implementation start. Maximum three concurrent projects is a planning cap pending actual capacity review.

### Gate B: proof and public pages — marketing owner

- [ ] Parent-confirmed empty project feed/internal portal explanation and draft implementation heading are repaired and reviewed live.
- [ ] All promoted case links load; client permission recorded; case capability matches the lane being sold.
- [ ] Any result has baseline, period, denominator and approved wording. Otherwise use demonstrable delivery changes, not revenue uplifts.
- [ ] One synthetic demonstration uses the released product and a normal client role. Clearly label simulations and planned functions.
- [ ] CTA and form route for each lane captured in the campaign record. Website, CRM and Connected messages are distinct and prices consistent.

### Gate C: enquiry handling — sales owner plus backup

- [ ] Each lane has primary/backup commercial owner, checked inbox and portal access.
- [ ] Proposed internal response target: within one working day, with timezone and business hours recorded. This is a proposed operating target, not a verified existing SLA.
- [ ] For each public form, capture test submission identifier, CRM record identifier, source/lane/interest fields, recipient delivery evidence, owner, next action and first human response timestamp.
- [ ] Repeat test with existing email, tracker unavailable, malformed/empty required input and controlled delivery/sync failure in an appropriate test environment. Record expected outcomes; do not generate unsolicited customer tests.
- [ ] Daily exception review identifies submission capture without email, capture without mapped record, and enquiry without next action. Assign an owner and recovery deadline.
- [ ] Prospect email reply/acknowledgement is verified separately from staff notification. Use manual acknowledgement if automation is not accepted.

### Gate D: delivery and customer handover — delivery/operations owner

- [ ] Completed intake includes client approver, data/content owner, users/roles, system dependencies and success criteria.
- [ ] Provisioning follows [onboarding handover checklist](../../docs/organiser-onboarding-operations.md#L241), lines 241–254: correct identity, published model, licences, resolved paid operations, capacity, active membership, real user workflow and provider/scheduler verification.
- [ ] Demonstration acceptance includes a trained client user independently finding and progressing an enquiry.
- [ ] Document support contact, supported hours, incident route, response target, change request allowance and chargeable work. Their existence as agreed service terms is unverified here.
- [ ] Document backup/restore responsibility, data export path, domain/repository/hosting ownership and cancellation/handover responsibility. Validate the chosen client's export/transfer process rather than promising a generic guarantee.
- [ ] Any automation release has deployed evidence, monitored alerts and manual fallback; publishing a workflow is not the acceptance step.
- [ ] Book 30-day review with named owner and measures agreed before launch.

### Gate E: billing and learning — commercial/billing owner

- [ ] Match proposal to actual product, included seats, extra-seat prices and subscription cadence; obtain a safe preview before a real charge.
- [ ] Define refund/cancellation/renewal treatment and stop-billing procedure separately from disabling access.
- [ ] Record signed date, lane, source, contracted setup and recurring amounts, actual collected cash, delivery hours, support time and lost reason.
- [ ] Create measurement baseline: enquiry volume/quality for Websites; record ownership and next-action completeness for CRM; capture-to-human-action time for Connected.
- [ ] Weekly founder review reconciles campaign leads to paid wins and gross contribution; capacity limits constrain spend before delivery becomes overloaded.

## Minimum evidence packet for the first launch decision

Keep one short record per lane: approved scope/pricing version; current working landing URL; approved proof URL; named response owner and backup; synthetic submission + resulting CRM evidence; mailbox receipt where promised; ordinary user access evidence; billing preview/seat check; signed support/ownership terms; available delivery slot; open exceptions with owners; launch decision/date.

Readiness is passed when the evidence packet demonstrates the exact advertised workflow. A partial Connected launch can exclude automation honestly and still sell website-to-CRM delivery plus a trained manual follow-up process. If automated steps are central to the advertised package, the runtime/provider blockers must be closed before taking orders on that promise.
