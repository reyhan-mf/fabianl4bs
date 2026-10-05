import { Navigate, Route, Routes } from 'react-router-dom';
import TopNav from './components/TopNav.jsx';
import Footer from './components/Footer.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div className="fl-root">
      <ScrollManager />
      <a className="fl-skip" href="#main">
        Skip to content
      </a>
      <TopNav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* About, projects, experience, awards and contact were once pages of their own. They
              are sections of the home page now, so the old links land on the section instead of
              a dead end — anyone's bookmark still works. */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/experience" element={<Navigate to="/#experience" replace />} />
          <Route path="/education" element={<Navigate to="/#experience" replace />} />
          <Route path="/awards" element={<Navigate to="/#awards" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Reads `?project=<slug>` from the URL, so a card anywhere can open it. */}
      <ProjectModal />
      <Footer />
    </div>
  );
}
