import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Projects from '../sections/Projects.jsx';
import Experience from '../sections/Experience.jsx';
import Awards from '../sections/Awards.jsx';
import Contact from '../sections/Contact.jsx';

/**
 * The whole portfolio, in one scroll.
 *
 * It used to be five routes, and the nav moved you between them — so every nav click was a
 * page load, a loss of place, and a second hierarchy to hold in your head on top of the
 * sections the home page already had. There is now one page: the nav scrolls, the sections are
 * the destinations, and the section you are in lights up on its own as you read.
 *
 * The one route that remains is a project's case study, because that is a detour you choose
 * from a card rather than a stop on the way through.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Awards />
      <Contact />
    </>
  );
}
