import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const invoice = await stripe.invoices.retrieve(invoiceId);

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    if (invoice.status === "paid") {
      return NextResponse.json(
        { error: "This invoice has already been paid" },
        { status: 400 }
      );
    }

    // If the invoice already has a hosted payment URL from Stripe, redirect there
    if (invoice.hosted_invoice_url) {
      return NextResponse.json({ url: invoice.hosted_invoice_url });
    }

    // Fallback: create a checkout session for the invoice
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://ingeniumportal.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: invoice.lines.data.map((line) => ({
        price_data: {
          currency: invoice.currency,
          product_data: {
            name: line.description || "Invoice item",
          },
          unit_amount: line.amount,
        },
        quantity: line.quantity || 1,
      })),
      metadata: {
        invoice_id: invoice.id,
      },
      customer_email: invoice.customer_email || undefined,
      success_url: `${baseUrl}/pay?success=true&invoice=${invoice.id}`,
      cancel_url: `${baseUrl}/pay?id=${invoice.id}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to process payment";
    const status =
      err instanceof Error && "statusCode" in err
        ? (err as { statusCode: number }).statusCode
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
