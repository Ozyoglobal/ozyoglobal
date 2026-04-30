import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-8xl font-bold opacity-20 mb-4">404</div>
        <h1 className="text-2xl font-semibold mb-4">Sayfa bulunamadı</h1>
        <p className="text-white/60 mb-8">Aradığınız sayfa mevcut değil.</p>
        <Link
          href="/tr"
          className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-6 py-3 rounded-xl hover:bg-zinc-100 transition-all text-sm"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
