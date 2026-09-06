import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — GymSetu owner console" },
      {
        name: "description",
        content: "Sign in to your GymSetu owner console to manage members, payments and attendance.",
      },
      { property: "og:title", content: "Sign in — GymSetu owner console" },
      {
        property: "og:description",
        content: "Access your gym's members, payments and attendance in one place.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("arjun@ironyard.in");
  const [password, setPassword] = useState("");

  return (
    <div className="grid min-h-screen bg-ink text-foreground lg:grid-cols-2">
      <section className="glass relative hidden flex-col justify-between overflow-hidden border-r border-edge px-10 py-10 lg:flex">
        <div className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 rotate-12 rounded-full bg-lime/10 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-md bg-lime font-display text-xl leading-none text-lime-foreground">
            G
          </div>
          <span className="font-display text-lg tracking-wide">GymSetu</span>
        </Link>
        <div className="relative max-w-[26ch]">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime">
            Owner console
          </div>
          <h2 className="mt-3 text-balance font-display text-5xl leading-[0.9] tracking-tight">
            Run Your Gym Smarter
          </h2>
          <p className="mt-4 text-sm text-fog">
            One login for memberships, attendance and rupee collections.
          </p>
        </div>
        <p className="relative font-mono text-[10px] uppercase tracking-wider text-fog">
          Hyderabad · Telangana
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-md bg-lime font-display text-xl leading-none text-lime-foreground">
                G
              </div>
              <span className="font-display text-lg tracking-wide">GymSetu</span>
            </Link>
          </div>

          <h1 className="mt-6 font-display text-3xl tracking-wide lg:mt-0">Sign in</h1>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-fog">
            Gym owner access
          </p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-fog">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border border-edge bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog/60 focus:border-lime/60 focus:ring-1 focus:ring-lime/30"
                placeholder="you@gym.in"
                required
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-fog">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-edge bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-fog/60 focus:border-lime/60 focus:ring-1 focus:ring-lime/30"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              className="mt-2 rounded-md bg-lime px-5 py-2.5 text-sm font-bold text-lime-foreground ring-1 ring-lime/40 transition-transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </form>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-fog">
            Demo preview · no account needed yet
          </p>
        </div>
      </section>
    </div>
  );
}
