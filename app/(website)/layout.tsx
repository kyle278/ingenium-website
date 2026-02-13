import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f2eb]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-4rem] h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-1/3 left-[-6rem] h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-1/3 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
      </div>
      <div className="relative">
        <SiteNav />
        <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
