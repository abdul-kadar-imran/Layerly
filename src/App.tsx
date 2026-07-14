/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import FlexForge from "./components/FlexForge";
import GridLab from "./components/GridLab";
import BoxModel from "./components/BoxModel";
import PositioningLab from "./components/PositioningLab";
import DisplayLab from "./components/DisplayLab";
import AnimationLab from "./components/AnimationLab";
import PatternsLab from "./components/PatternsLab";
import ChallengeArenaPage from "./pages/ChallengeArenaPage";
import { Trophy, ArrowRight } from "lucide-react";
import Footer from "./footer";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Flexbox", href: "#flexbox" },
    { name: "Grid", href: "#grid" },
    { name: "Box", href: "#box-model" },
    { name: "Position", href: "#positioning" },
    { name: "Display", href: "#display" },
    { name: "Motion", href: "#animation" },
    { name: "Patterns", href: "#patterns" },
    { name: "Arena", href: "#challenges" },
  ];

  const scrollToStart = () => {
    document.getElementById("flexbox")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-center relative">
          <Link to="/" className="absolute left-6 flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-indigo-600 flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg italic">L</span>
            </div>
            <span className="text-xl font-display font-bold tracking-tight">Layerly</span>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.name === "Arena" ? (
                <Link
                  key={link.name}
                  to="/challenges"
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden absolute right-6 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                link.name === "Arena" ? (
                  <Link
                    key={link.name}
                    to="/challenges"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display font-bold text-slate-200"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display font-bold text-slate-200"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSection onStart={scrollToStart} />

              <div className="relative">
                {/* Section Dividers */}
                <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

                <FlexForge />
                <GridLab />
                <BoxModel />
                <PositioningLab />
                <DisplayLab />
                <AnimationLab />
                <PatternsLab />

                {/* Challenges CTA Section at the bottom */}
                <section id="challenges" className="py-32 container mx-auto px-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-12 rounded-[3rem] border-accent/20 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

                    <Trophy className="w-16 h-16 text-accent mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready for the Arena?</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                      Put your skills to the test in our gamified challenge arena.
                      From beginner basics to pro-level layouts, see if you can master them all.
                    </p>

                    <Link
                      to="/challenges"
                      className="inline-flex items-center gap-2 px-10 py-5 bg-accent hover:bg-accent-hover text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-accent/20 group"
                    >
                      Enter Challenge Arena
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </section>
              </div>
            </main>
          } />
          <Route path="/challenges" element={<ChallengeArenaPage />} />
        </Routes>
      </div>
      
      {/* Global Footer */}
      <Footer />
    </div>
  );
}
