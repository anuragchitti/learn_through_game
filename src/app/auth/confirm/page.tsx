import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; type?: string; next?: string }>;
}) {
  const { token_hash, type, next } = await searchParams;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (token_hash && type && url && key) {
    const supabase = createClient(url, key);
    const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as "email" });

    if (!error) {
      redirect(next ?? "/dashboard");
    }
  }

  // Fallback: send to sign-in with a message
  redirect("/auth?message=confirmation-failed");
}
