import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "../(auth)/actions";
import { Logo } from "../components/Logo";

export default async function DashboardPage() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "48px", fontFamily: "var(--font-manrope), sans-serif" }}>
      <Link href="/" aria-label="DomainLert home">
        <Logo />
      </Link>
      <p style={{ color: "var(--rust)", fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", letterSpacing: ".13em", textTransform: "uppercase" }}>Dashboard / 01</p>
      <h1 style={{ marginTop: "14px", fontSize: "clamp(42px, 6vw, 80px)", letterSpacing: "-.04em" }}>Your portfolio<br />starts here.</h1>
      <p style={{ marginTop: "20px", color: "var(--muted)" }}>{user.email}</p>
      <p style={{ marginTop: "42px" }}>Domain monitoring is ready for the next step: bulk import.</p>
      <form action={signOut} style={{ marginTop: "28px" }}><button type="submit">Log out</button></form>
    </main>
  );
}