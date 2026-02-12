"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowUpRight,
  Clock,
  Shield,
} from "lucide-react";

interface InvoiceLine {
  description: string;
  amount: number;
  quantity: number;
}

interface InvoiceData {
  id: string;
  number: string | null;
  status: string;
  amount_due: number;
  amount_paid: number;
  currency: string;
  customer_email: string | null;
  description: string | null;
  due_date: number | null;
  created: number;
  hosted_invoice_url: string | null;
  lines: InvoiceLine[];
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PayInvoicePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" /></div>}>
      <PayInvoiceContent />
    </Suspense>
  );
}

function PayInvoiceContent() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("id");
  const isSuccess = searchParams.get("success") === "true";

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [manualId, setManualId] = useState("");

  const fetchInvoice = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/invoices/lookup?id=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invoice not found");
        setInvoice(null);
      } else {
        setInvoice(data);
      }
    } catch {
      setError("Failed to load invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (invoiceId && !isSuccess) {
      fetchInvoice(invoiceId);
    }
  }, [invoiceId, isSuccess, fetchInvoice]);

  async function handlePay() {
    if (!invoice) return;
    setPaying(true);
    try {
      const res = await fetch("/api/invoices/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Payment failed");
        setPaying(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Payment failed. Please try again.");
      setPaying(false);
    }
  }

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const id = manualId.trim();
    if (id) {
      fetchInvoice(id);
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="space-y-24">
        <section className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[rgba(34,197,94,0.15)] mx-auto">
            <CheckCircle2 className="h-10 w-10 text-[var(--success)]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl">Payment successful</h1>
          <p className="text-lg text-muted">
            Thank you for your payment. A confirmation receipt has been sent to your email.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-secondary h-11 px-6 text-sm">
              Back to Home
            </Link>
            <Link href="/contact" className="btn-primary h-11 px-6 text-sm inline-flex items-center gap-2">
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Invoice loaded — show details + pay button
  if (invoice) {
    const isPaid = invoice.status === "paid";
    const isOverdue =
      invoice.due_date && invoice.due_date * 1000 < Date.now() && !isPaid;

    return (
      <div className="space-y-24">
        <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="space-y-6">
            <div className="site-chip">Invoice Payment</div>
            <h1 className="font-display text-4xl md:text-5xl">
              {isPaid ? "Invoice paid" : "Pay your invoice"}
            </h1>
            <p className="text-lg text-muted">
              {isPaid
                ? "This invoice has already been paid. Thank you!"
                : "Review the details below and click Pay Now to complete your payment securely via Stripe."}
            </p>

            <div className="site-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <FileText className="h-4 w-4 text-[var(--accent)]" />
                  Invoice {invoice.number || invoice.id}
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    isPaid
                      ? "bg-[rgba(34,197,94,0.15)] text-[var(--success)]"
                      : isOverdue
                        ? "bg-[rgba(248,113,113,0.15)] text-[var(--danger)]"
                        : "bg-[var(--accent-soft)] text-[var(--accent)]"
                  }`}
                >
                  {isPaid ? (
                    <><CheckCircle2 className="h-3 w-3" /> Paid</>
                  ) : isOverdue ? (
                    <><AlertTriangle className="h-3 w-3" /> Overdue</>
                  ) : (
                    <><Clock className="h-3 w-3" /> Open</>
                  )}
                </span>
              </div>

              <div className="border-t border-[var(--border)] pt-4 space-y-3">
                {invoice.lines.map((line, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-muted">
                      {line.description || "Item"}
                      {line.quantity > 1 && ` (x${line.quantity})`}
                    </span>
                    <span className="font-display">
                      {formatCurrency(line.amount, invoice.currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border)] pt-4 flex items-center justify-between">
                <span className="font-semibold">Total Due</span>
                <span className="font-display text-xl">
                  {formatCurrency(invoice.amount_due, invoice.currency)}
                </span>
              </div>

              {invoice.customer_email && (
                <div className="text-xs text-muted">
                  Billed to: {invoice.customer_email}
                </div>
              )}
              {invoice.due_date && (
                <div className="text-xs text-muted">
                  Due: {formatDate(invoice.due_date)}
                </div>
              )}
            </div>

            {!isPaid && (
              <button
                onClick={handlePay}
                disabled={paying}
                className="btn-primary h-12 px-8 text-sm w-full inline-flex items-center justify-center gap-2"
              >
                {paying ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Pay Now &mdash; {formatCurrency(invoice.amount_due, invoice.currency)}</>
                )}
              </button>
            )}

            {error && (
              <div className="flex items-center gap-2 text-sm text-[var(--danger)]">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="site-card-bright p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Shield className="h-4 w-4" />
                Secure payment
              </div>
              <div className="text-sm text-muted space-y-3">
                <p>
                  All payments are processed securely through Stripe. Your payment
                  information is never stored on our servers.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="site-badge">256-bit encryption</span>
                  <span className="site-badge">PCI compliant</span>
                </div>
              </div>
            </div>

            <div className="site-card p-6 space-y-3">
              <div className="text-sm font-semibold">Need help?</div>
              <p className="text-sm text-muted">
                If you have questions about this invoice or need to discuss payment
                terms, please reach out.
              </p>
              <Link
                href="/contact"
                className="btn-secondary h-9 px-4 text-xs inline-flex items-center gap-2"
              >
                Contact Us
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default: no invoice loaded — show lookup form
  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div className="space-y-6">
          <div className="site-chip">Invoice Payment</div>
          <h1 className="font-display text-4xl md:text-5xl">
            Pay an invoice
          </h1>
          <p className="text-lg text-muted">
            Enter your invoice ID to view and pay your invoice securely. You can
            find your invoice ID in the email we sent you.
          </p>
          <div className="flex items-center gap-3 text-sm text-muted">
            <Shield className="h-4 w-4 text-[var(--accent)]" />
            Payments processed securely via Stripe
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary h-11 px-6 text-sm">
              Back to Home
            </Link>
            <Link href="/contact" className="btn-primary h-11 px-6 text-sm inline-flex items-center gap-2">
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="site-card-bright p-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <FileText className="h-4 w-4" />
            Look up invoice
          </div>
          <form onSubmit={handleLookup} className="mt-4 space-y-4">
            <input
              className="w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm"
              placeholder="Invoice ID (e.g. in_1abc2def3ghi)"
              type="text"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary h-11 px-6 text-sm w-full inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Looking up...</>
              ) : (
                <><CreditCard className="h-4 w-4" /> Find Invoice</>
              )}
            </button>
            {error && (
              <div className="flex items-center gap-2 text-sm text-[var(--danger)]">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </div>
            )}
            <p className="text-xs text-muted">
              Your invoice ID starts with &ldquo;in_&rdquo; and can be found in your billing email from Ingenium.
            </p>
          </form>
        </div>
      </section>

      <section className="site-card p-8">
        <h2 className="font-display text-3xl">How it works</h2>
        <p className="text-muted mt-2 max-w-2xl">
          Simple, secure invoice payment in three steps.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Find your invoice",
              detail:
                "Enter your invoice ID from the email we sent, or use the direct link provided.",
            },
            {
              step: "2",
              title: "Review details",
              detail:
                "Verify the invoice amount, line items, and due date before proceeding.",
            },
            {
              step: "3",
              title: "Pay securely",
              detail:
                "Complete payment via Stripe with credit card, debit card, or bank transfer.",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-xs font-display shrink-0">
                {item.step}
              </div>
              <div>
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-xs text-muted mt-1">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
