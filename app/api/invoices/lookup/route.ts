import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const invoiceId = searchParams.get("id");

  if (!invoiceId) {
    return NextResponse.json(
      { error: "Invoice ID is required" },
      { status: 400 }
    );
  }

  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      amount_due: invoice.amount_due,
      amount_paid: invoice.amount_paid,
      currency: invoice.currency,
      customer_name:
        typeof invoice.customer === "string"
          ? null
          : null,
      customer_email: invoice.customer_email,
      description: invoice.description,
      due_date: invoice.due_date,
      created: invoice.created,
      hosted_invoice_url: invoice.hosted_invoice_url,
      lines: invoice.lines.data.map((line) => ({
        description: line.description,
        amount: line.amount,
        quantity: line.quantity,
      })),
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to retrieve invoice";
    const status =
      err instanceof Error && "statusCode" in err
        ? (err as { statusCode: number }).statusCode
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
