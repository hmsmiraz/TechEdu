import Link from "next/link";

export default function PendingApprovalPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)]">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 justify-center">
          <img src="/favicon.svg" alt="TechEdu" className="w-7 h-7" />
          <span className="text-lg font-mono font-bold grad-text tracking-wide">
            TechEdu
          </span>
        </Link>

        <div className="mt-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
          <div className="w-14 h-14 rounded-full bg-grad mx-auto flex items-center justify-center text-2xl mb-4">
            ⏳
          </div>
          <h1 className="text-xl font-bold text-white mb-2">
            Your account is pending approval
          </h1>
          <p className="text-[var(--muted)] text-sm leading-relaxed">
            Thanks for signing up! An admin needs to review and approve your
            account before you can access the learning portal. We&apos;ll
            notify you by email once that happens — you can also try logging
            in again later.
          </p>
          <Link
            href="/login"
            className="inline-flex mt-6 items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold bg-grad hover:opacity-85 transition-opacity"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
