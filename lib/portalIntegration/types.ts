export type PortalPublicConfig = {
  portalAppUrl: string;
  siteId: string;
};

export type PortalServerConfig = PortalPublicConfig & {
  supabaseUrl: string;
  serviceRoleKey: string;
  organisationId: string;
  defaultFormSlug: string | null;
};

export type PortalFormRecord = {
  id: string;
  slug: string;
  name: string;
};

export type PortalTrackingSnapshot = {
  site_id: string | null;
  visitor_id: string | null;
  session_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  cid: string | null;
  submission_url: string | null;
  landing_url: string | null;
  referrer: string | null;
};

export type PortalTrackingEvent = {
  client_event_id: string;
  event_type: string;
  occurred_at: string;
  page_url: string;
  page_path: string;
  page_title: string;
  referrer: string | null;
  properties: Record<string, unknown>;
};

export type PortalTrackingEnvelope = {
  site_id: string;
  visitor_id: string;
  session_id: string;
  events: PortalTrackingEvent[];
};

export type PortalFormSubmitRequest = {
  formId?: string | null;
  formSlug?: string | null;
  formName?: string | null;
  fields: Record<string, unknown>;
  tracking?: Record<string, unknown>;
  idempotencyKey?: string | null;
};
