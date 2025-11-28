export default function Home() {
  const env = process.env.NEXT_PUBLIC_ENV || "development";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-16 text-center">
        {/* Environment Badge (visible in non-production) */}
        {env !== "production" && (
          <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold uppercase text-black">
            {env}
          </span>
        )}

        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            BLACK FRIDAY
          </h1>
          <p className="text-xl font-medium text-red-500 sm:text-2xl">
            EXCLUSIVE DEALS
          </p>
        </div>

        {/* Countdown/Promo Section */}
        <div className="mt-8 flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-8 shadow-2xl">
          <p className="text-3xl font-bold text-white sm:text-4xl">
            UP TO <span className="text-yellow-300">70% OFF</span>
          </p>
          <p className="max-w-md text-lg text-red-100">
            Don&apos;t miss out on our biggest sale of the year. Limited time offers on all products.
          </p>
          <button
            type="button"
            className="mt-4 rounded-full bg-white px-8 py-4 text-lg font-bold text-red-600 transition-transform hover:scale-105 hover:bg-yellow-300"
          >
            Shop Now
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-zinc-900 p-6">
            <span className="text-3xl">🚚</span>
            <h3 className="font-semibold text-white">Free Shipping</h3>
            <p className="text-sm text-zinc-400">On orders over $50</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-zinc-900 p-6">
            <span className="text-3xl">🔒</span>
            <h3 className="font-semibold text-white">Secure Checkout</h3>
            <p className="text-sm text-zinc-400">100% protected payments</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-zinc-900 p-6">
            <span className="text-3xl">↩️</span>
            <h3 className="font-semibold text-white">Easy Returns</h3>
            <p className="text-sm text-zinc-400">30-day return policy</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} LAF Black Friday. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
