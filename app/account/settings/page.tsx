"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Heart, Package, MapPin, User, LogOut } from "lucide-react";

// If you have these, great; if not, the page still renders fine.
let useSession: any = () => ({ data: null });
let signOut: any = () => {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const auth = require("@/lib/auth-client");
  useSession = auth.useSession ?? useSession;
  signOut = auth.signOut ?? signOut;
} catch {}

import { useFavorites } from "@/components/favorites/FavoritesProvider";

export default function AccountSettingsPage() {
  const { data: session } = useSession();
  const { favorites } = useFavorites(); // [{ id, name, image, price }]
  const favCount = favorites?.length ?? 0;

  const favPreview = useMemo(() => favorites?.slice(0, 5) ?? [], [favorites]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
        Account Settings
      </h1>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <CardLink
          href="/favorites"
          icon={<Heart className="w-5 h-5" />}
          label="Favorites"
          badge={favCount > 0 ? String(favCount) : undefined}
          desc="See all items you’ve favorited."
        />

        <CardLink
          href="/account/orders"
          icon={<Package className="w-5 h-5" />}
          label="Orders"
          desc="Track and view your past orders."
        />



        <CardLink
          href="/account"
          icon={<User className="w-5 h-5" />}
          label="Profile"
          desc="View or edit your profile info."
        />

        {session?.user ? (
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-2xl border border-slate-200/70 hover:border-slate-300 bg-white p-4 text-left transition shadow-sm hover:shadow md:col-span-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
                  <LogOut className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-semibold">Sign Out</div>
                  <div className="text-sm text-slate-500">
                    You’re signed in as {session.user.email ?? "your account"}.
                  </div>
                </div>
              </div>
            </div>
          </button>
        ) : null}
      </div>

      {/* Favorites preview */}
      <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Favorites</h2>
          <Link
            href="/favorites"
            className="rounded-full border border-[#266ae8]/30 px-3 py-1.5 text-sm font-medium text-[#266ae8] hover:bg-[#266ae8]/5"
          >
            View all
          </Link>
        </div>

        {favCount === 0 ? (
          <div className="text-sm text-slate-500">
            You haven’t favorited anything yet. Browse{" "}
            <Link href="/products" className="text-[#266ae8] underline">
              products
            </Link>{" "}
            and tap the ★ Favorite button to add items here.
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-1">
            {favPreview.map((p: any) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="min-w-[150px] max-w-[150px] shrink-0"
              >
                <div className="aspect-square overflow-hidden rounded-xl border border-slate-200/70 bg-white">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name ?? "Favorite item"}
                      width={300}
                      height={300}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="mt-2 truncate text-sm font-medium">{p.name}</div>
                {typeof p.price === "number" ? (
                  <div className="text-sm text-slate-500">${p.price.toFixed(2)}</div>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function CardLink({
  href,
  icon,
  label,
  desc,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  desc?: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200/70 hover:border-slate-300 bg-white p-4 transition shadow-sm hover:shadow"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
          {icon}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{label}</div>
            {badge ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                {badge}
              </span>
            ) : null}
          </div>
          {desc ? <div className="text-sm text-slate-500">{desc}</div> : null}
        </div>
      </div>
    </Link>
  );
}
