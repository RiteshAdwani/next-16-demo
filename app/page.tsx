
import HeroSection from "@/components/HeroSection";
import PostsList from "@/components/PostsList";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <HeroSection />
      
      <section className="max-w-6xl mx-auto py-12 px-4">
        <PostsList />
      </section>
    </main>
  );
}

