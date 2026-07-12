import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#f2efe8] px-6 text-[#171914]">
      <div className="mx-auto w-full max-w-4xl border-y border-black/15 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a6b3f]">404 / Page not found</p>
        <h1 className="mt-6 text-5xl font-medium leading-none tracking-[-0.055em] md:text-8xl">This page has moved.</h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-black/55">
          The Onboard website is changing direction. Explore the domain portfolio or return to one of our retained resources.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center bg-[#171914] px-6 text-sm font-medium text-white">View the portfolio</Link>
          <Link href="/blog" className="inline-flex min-h-12 items-center justify-center border border-black/20 px-6 text-sm font-medium">Browse articles</Link>
        </div>
      </div>
    </main>
  )
}
