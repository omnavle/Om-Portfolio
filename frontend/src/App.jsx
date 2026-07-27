import { Routes, Route } from "react-router-dom";
import useLenis from "./hooks/useLenis";
import BackgroundFX from "./components/BackgroundFX";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-bg text-text">
      <BackgroundFX />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
}
