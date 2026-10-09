import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { TeamProvider } from './context/TeamContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './styles/global.css';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
import { TestimonialsProvider } from './context/TestimonialsContext';

export default function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <TeamProvider>
          <TestimonialsProvider>
            <BrowserRouter>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:id" element={<ProjectDetail />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </TestimonialsProvider>
        </TeamProvider>
      </ProjectsProvider>
    </AuthProvider>
  );
}