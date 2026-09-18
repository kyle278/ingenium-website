import { handleStoreRevalidation } from "@/lib/commerce/storefront";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleStoreRevalidation(request);
}
