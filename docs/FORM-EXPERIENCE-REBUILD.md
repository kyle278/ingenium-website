# Site-wide form experience rebuild

All first-party lead and project-intake forms use the installed form-experience skill. The existing callback already follows it; its phone-first contract remains intact. Shared email-delivered journeys now use `components/forms/GuidedEnquiry.tsx` and the assessed question map in `lib/form-journeys.ts`.

## Inventory and field assessment

| Surface | Outcome and route | Decision |
| --- | --- | --- |
| Call request / all package CTAs | Telephone callback | Existing need → optional timing → separate names/required phone → consent. Optional service email; marketing email conditional on a separately chosen opt-in. |
| Visibility check | Human-reviewed report by email | Business/service → town/optional profile link → separate names/required email → consent. No phone: report delivery does not need it. |
| General, technical-review and teardown enquiries | Emailed reply and next steps | Service cards → actual request/optional business → separate names/required email → consent. Remove budget: no evidence it changes the response or routing for these enquiries. |
| Template gallery gate | Accepted access request opens the gallery; interest retained for a future website enquiry | Keep two short screens: separate names/required email → consent. The prior template exploration already supplies relevant context; do not add qualification questions or pretend access arrives by email. No marketing is required. |
| Private website brief | Enough information to scope an approved project conversation, followed up by email | Starting status → conditional current URL → business → primary goal → pages/audience → features → timeline → separate names/email → consent/accuracy. Keep scoped needs, defer reference sites, branding/copy readiness and extra notes to the actual scoping conversation. Remove optional phone: fulfilment uses email. |
| Retired Starter qualification dialog | Existing enquiry/routing contract, should this component be reused | Need cards → conditional Other text → team size → business type → names/email → consent. Preserve routing inputs and server routing; remove optional referral-name and phone questions. No eligibility guarantee, old price, calendar or new marketing claim is added. The public legacy offer URL still redirects. |

The public forms are `/book-a-call`, `/visibility-check`, `/technical-review`, `/revenue-systems-teardown` and the gate on `/results`. `/contact` and `/demo` retain public redirects but their underlying components also use the new journey. `/website-brief` retains its existing access protection and noindex behaviour. Forms inside linked client websites and third-party iframes remain owned by those websites.

Blog search is a native GET search utility, without lead creation or personal details. It remains one labelled search field and an explicit Search action; privacy/marketing gates would collect irrelevant consent for a content lookup. The internal calculator and interactive example illustrations do not submit enquiries. Visitor consent settings retain their existing independent purpose.

## Question map

| id / fields | Purpose / action enabled | Change and required state | Input / shown when / advance | Validation / destination |
| --- | --- | --- | --- | --- |
| service | Route a real enquiry | Keep; required for general enquiries | Five icon buttons; intentional click advances | Existing service allowlist; Portal service plus intent |
| message, company | Explain issue and identify business | Keep request required; company optional | Textarea/input before identity; Continue | 10–5,000 characters for request; company ≤160; readable CRM message |
| visibility company, trade | Identify business and search service | Keep required | Two labelled inputs; Continue | 2–160 characters each; contact form with visibility-check intent |
| visibility town, website | Local search context; find correct profile | Town required; link optional | Inputs; Continue | Town 2–160; link ≤500; readable report-request message |
| current_website_status | Decide whether an existing-site question is relevant | Keep required | Four icon buttons | Required; website-project-brief field |
| website_url | Let team inspect existing site | Keep optional; show only refresh/rebuild | Text input; Continue | ≤500; cleared and excluded when changing to new site/one-page start |
| business_summary, company | Plan website content and scope | Keep required for brief | Business input + short textarea; Continue | Trimmed non-empty, bounded; brief business fields |
| primary_goal | Focus the scoping conversation | Keep required | Five icon cards | Required; brief goal |
| required_pages, target_audience | Bound pages and write for the intended audience | Pages required (can explicitly ask for advice); audience optional | Textarea + input; Continue | Bounded, required trim check; original pages_summary alias retained |
| requested_features | Scope supported features | Keep optional; no assumed selections | Native checkbox icon cards; explicit Continue | Multi-select; original labels joined into string, feature_count derived |
| timeline | Plan dependencies without promising launch | Keep required | Five icon cards including Just exploring | Required; brief timeline |
| main_need, team_size, business_type | Preserve existing Starter classification inputs | Keep required in reusable retired dialog | Icon buttons; deliberate advance | Existing allowlists; route recomputed server-side |
| details | Explain Something else | Conditional and required only for that choice | Textarea + Continue | ≤300; cleared/excluded when switching away |
| first_name, last_name | Identify the person without guessing a split | Replace every full-name field; required | Separate inputs near end with given-name/family-name autocomplete | 1–80 characters each, Unicode accepted; independent CRM fields; legacy name joined |
| email / phone | Fulfil the promised response | Email required for email journeys; phone required for callback | Native email/tel, explicit Continue | UI/server aligned; optional supplied methods validated; no fabricated contact |
| privacy_consent | Acknowledge the existing policy and service-related use | Required, unchecked | Final full-surface native-checkbox card; no progression | Must be true; existing notice/version/evidence |
| marketing_consent | Purpose-specific occasional email updates | Optional, unchecked, independent | Separate final card; no progression | Explicit true/false; declining never blocks the request |
| accuracy_confirmation | Retain private brief scoping declaration | Required only for brief | Labelled checkbox on final page | Existing server requirement; no separate review/answer summary |

## Interaction and operational rules

One active screen is mounted, with heading focus and document-title changes after navigation, no text-field autofocus, Back correction, single activation guards, held-key protection and reduced-motion CSS. Branch changes invalidate dependent answers before submission. Exact progress counts are used for fixed paths; private brief/Starter use stable stage labels because paths branch. Multi-select and consent always need explicit action. No review page or repeated answer summary is inserted.

Answers remain in memory during the journey; refresh clears them. Personal information is not added to storage, analytics or URLs. Existing safe attribution, receipt checking and replay protection remain. Errors retain answers and the request reference. Success/access unlock/redirect occurs only after an accepted receipt. Website brief now uses the same server-owned `/api/enquiry` boundary as the other forms, preserving its original form slug and essential mappings, instead of relying on document-level submit interception.

The twelve-feature brief question intentionally allows natural scrolling on short phones rather than splitting one selection list or clipping its options. Larger text, errors and the brief accuracy declaration may also require scrolling. Normal short steps aim to fit the mobile viewport below the header. Browser Back follows page history; the clearly labelled in-form Back edits answers without creating history loops.

Page forms expose the existing privacy-settings action as an inline link while active, keeping the floating settings button clear of Back/Continue. Opening and closing settings preserves answers. Modal forms retain the site's surrounding settings behaviour. Form controls remain separate from optional analytics.
