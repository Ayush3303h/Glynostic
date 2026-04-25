import { lazy, Suspense } from "react";

const Navbar = lazy(() => import("../components/Navbar"));
const Hero = lazy(() => import("../components/Hero"));
const Symptoms = lazy(() => import("../components/Symptoms"));
const Report = lazy(() => import("../components/Report"));
const Comparison = lazy(() => import("../components/Comparison"));
const Program = lazy(() => import("../components/Program"));
const FAQ = lazy(() => import("../components/FAQ"));
const Steps = lazy(() => import("../components/Steps"));
const Footer = lazy(() => import("../components/Footer"));

export default function Home({ openFaq, setOpenFaq, menuOpen, setMenuOpen }) {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Symptoms />
      <Report />
      <Comparison />
      <Program />
      <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <Steps />
      <Footer />
    </Suspense>
  );
}