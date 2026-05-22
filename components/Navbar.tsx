import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/actions/logout.action";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constants";

async function NavbarAuthSection() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <>
        <span className="hidden sm:block text-sm text-slate-500 dark:text-zinc-400 mr-1">
          Hi,{" "}
          <span className="font-semibold text-slate-700 dark:text-zinc-200">
            {user.name}
          </span>
        </span>
        <Link href={ROUTES.NEW_POST}>
          <Button
            size="sm"
            className="rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-sm"
          >
            + New Post
          </Button>
        </Link>
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="rounded-full text-slate-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400"
          >
            Logout
          </Button>
        </form>
      </>
    );
  }

  return (
    <>
      <Link href={ROUTES.LOGIN}>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-slate-600 dark:text-zinc-300"
        >
          Login
        </Button>
      </Link>
      <Link href={ROUTES.SIGNUP}>
        <Button
          size="sm"
          className="rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-sm"
        >
          Sign Up
        </Button>
      </Link>
    </>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <span className="text-2xl">✍️</span>
          <span>Blogify</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href={ROUTES.HOME}
            className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Posts
          </Link>
        </nav>

        {/* Auth actions — wrapped in Suspense to avoid blocking render */}
        <div className="flex items-center gap-2">
          <Suspense fallback={<div className="w-24 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 animate-pulse" />}>
            <NavbarAuthSection />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
