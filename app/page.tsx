import { About } from "@/src/components/sections/About";
import { Contact } from "@/src/components/sections/Contact";
import { Experience } from "@/src/components/sections/Experience";
import { Header } from "@/src/components/sections/Header";
import { Hero } from "@/src/components/sections/Hero";
import { Projects } from "@/src/components/sections/Projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
