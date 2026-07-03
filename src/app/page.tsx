import { Header }       from "@/components/layout/Header";
import { Footer }       from "@/components/layout/Footer";
import { Hero }         from "@/components/sections/Hero";
import { About }        from "@/components/sections/About";
import { Services }     from "@/components/sections/Services";
import { Skills }       from "@/components/sections/Skills";
import { Projects }     from "@/components/sections/Projects";
import { Experience }   from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats }        from "@/components/sections/Stats";
import { Contact }      from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
