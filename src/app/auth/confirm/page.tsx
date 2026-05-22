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
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "email",
    });

    if (!error && data.user) {
      // Create profile now that the session is active and RLS auth.uid() works.
      // Derive username from user metadata (set during signUp) or email prefix.
      const fullName = data.user.user_metadata?.full_name as string | undefined;
      const username = fullName || data.user.email?.split("@")[0] || "player";

      await supabase.from("profiles").upsert(
        { id: data.user.id, username },
        { onConflict: "id" }
      );

      redirect(next ?? "/dashboard");
    }
  }

  redirect("/auth?message=confirmation-failed");
}
