import { Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import Backdrop from "@/components/layout/Backdrop";
import Logo from "@/components/layout/Logo";
import NavItems from "@/components/layout/NavItems";

export default function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <Backdrop />
      <aside className="glass fixed left-4 top-4 bottom-4 z-30 hidden w-60 flex-col rounded-[28px] p-5 md:flex">
        <Logo />
        <p className="mt-1 text-xs text-rose-950/45">plan smart, feel great</p>
        <div className="mt-8">
          <NavItems id="side" vertical />
        </div>
        <div className="mt-auto space-y-2">
          <p className="truncate px-2 text-xs text-rose-950/50">{user?.full_name || user?.email}</p>
          <button onClick={() => logout()} className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-rose-950/55 transition hover:bg-rose-100/70 hover:text-primary">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <header className="flex items-center justify-between px-5 pt-5 md:hidden">
        <Logo />
        <button onClick={() => logout()} aria-label="Sign out" className="rounded-full p-2 text-rose-950/50 hover:bg-white/60">
          <LogOut className="h-5 w-5" />
        </button>
      </header>
      <main className="px-4 pb-28 pt-5 md:ml-64 md:px-8 md:pb-10 md:pt-8">
        <motion.div key={path} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="mx-auto max-w-3xl">
          <Outlet />
        </motion.div>
      </main>
      <div className="glass fixed inset-x-3 bottom-3 z-30 rounded-[26px] px-2 py-2 md:hidden">
        <NavItems id="bottom" />
      </div>
    </div>
  );
}