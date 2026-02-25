import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutTemplate, Info, Code, ChevronDown, Bell, Search, User, CreditCard, Check, HelpCircle } from "lucide-react";

const PATTERNS = [
  { id: "navbar", name: "Navbar", desc: "Responsive navigation with logo and links" },
  { id: "sidebar", name: "Sidebar Layout", desc: "Classic dashboard sidebar with main content" },
  { id: "pricing", name: "Pricing Table", desc: "Tiered pricing cards with feature lists" },
  { id: "accordion", name: "Accordion", desc: "Collapsible content sections" },
  { id: "modal", name: "Modal", desc: "Overlay dialog for focused interaction" },
];

export default function PatternsLab() {
  const [activePattern, setActivePattern] = useState("navbar");
  const [showModal, setShowModal] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [showCode, setShowCode] = useState(false);

  const PATTERN_CODE: Record<string, string> = {
    navbar: `<nav class="navbar">
  <div class="logo">Brand</div>
  <ul class="nav-links">
    <li>Product</li>
    <li>Features</li>
    <li>Pricing</li>
  </ul>
  <div class="actions">
    <button>Sign Up</button>
  </div>
</nav>

/* CSS */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1e293b;
  border-radius: 1rem;
}`,
    sidebar: `/* Sidebar Layout */
.container {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 250px;
  border-right: 1px solid #334155;
}
.main-content {
  flex: 1;
  padding: 2rem;
}`,
    pricing: `/* Pricing Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.pricing-card {
  padding: 2rem;
  border: 1px solid #334155;
  border-radius: 1rem;
}`,
    accordion: `/* Accordion */
.accordion-item {
  border-bottom: 1px solid #334155;
}
.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}`,
    modal: `/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #1e293b;
  padding: 2rem;
  border-radius: 1.5rem;
}`
  };

  return (
    <section id="patterns" className="py-24 container mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
          <LayoutTemplate className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold">Practical Patterns</h2>
          <p className="text-slate-400">Replicate common UI components used in modern apps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pattern Selector */}
        <div className="lg:col-span-3 space-y-2">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePattern(p.id);
                setShowCode(false);
              }}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                activePattern === p.id 
                  ? "bg-accent/10 border-accent text-white shadow-lg shadow-accent/5" 
                  : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
              }`}
            >
              <div className="font-bold text-sm mb-1">{p.name}</div>
              <div className="text-[10px] opacity-60 uppercase tracking-wider">{p.desc}</div>
            </button>
          ))}
        </div>

        {/* Pattern Preview */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          <div className="glass rounded-3xl p-8 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden bg-slate-900/50">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Pattern Preview: {PATTERNS.find(p => p.id === activePattern)?.name}
            </div>

            <div className="w-full max-w-4xl">
              {activePattern === "navbar" && (
                <div className="w-full bg-slate-800 border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-accent" />
                    <span className="font-bold">Brand</span>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
                    <span className="hover:text-white cursor-pointer">Product</span>
                    <span className="hover:text-white cursor-pointer">Features</span>
                    <span className="hover:text-white cursor-pointer">Pricing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Search className="w-4 h-4 text-slate-400" />
                    <button className="px-4 py-2 bg-accent text-white rounded-xl text-xs font-bold">Sign Up</button>
                  </div>
                </div>
              )}

              {activePattern === "sidebar" && (
                <div className="w-full h-[400px] bg-slate-800 border border-white/10 rounded-2xl flex overflow-hidden shadow-xl">
                  <div className="w-16 md:w-48 border-r border-white/10 p-4 flex flex-col gap-4">
                    {[LayoutTemplate, Bell, User, CreditCard].map((Icon, i) => (
                      <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${i === 0 ? 'bg-accent/20 text-accent' : 'text-slate-500'}`}>
                        <Icon className="w-5 h-5" />
                        <span className="hidden md:block text-sm font-medium">Menu Item</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-6 space-y-6">
                    <div className="h-8 bg-white/5 rounded-lg w-1/3" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white/5 rounded-xl" />
                      <div className="h-24 bg-white/5 rounded-xl" />
                      <div className="h-24 bg-white/5 rounded-xl" />
                    </div>
                    <div className="h-32 bg-white/5 rounded-xl" />
                  </div>
                </div>
              )}

              {activePattern === "pricing" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Basic", price: "$0", accent: false },
                    { name: "Pro", price: "$29", accent: true },
                    { name: "Enterprise", price: "$99", accent: false },
                  ].map((tier) => (
                    <div key={tier.name} className={`p-6 rounded-2xl border ${tier.accent ? 'bg-accent/10 border-accent' : 'bg-slate-800 border-white/10'}`}>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{tier.name}</div>
                      <div className="text-3xl font-bold mb-4">{tier.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                      <div className="space-y-3 mb-6">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                            <Check className="w-3 h-3 text-emerald-400" />
                            Feature point {i}
                          </div>
                        ))}
                      </div>
                      <button className={`w-full py-2 rounded-xl text-xs font-bold ${tier.accent ? 'bg-accent text-white' : 'bg-white/5 text-white border border-white/10'}`}>
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activePattern === "accordion" && (
                <div className="w-full max-w-lg mx-auto space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="bg-slate-800 border border-white/10 rounded-2xl overflow-hidden">
                      <button 
                        onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                        className="w-full p-4 flex items-center justify-between text-left"
                      >
                        <span className="font-bold text-sm">Question {i + 1}?</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeAccordion === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-slate-400 leading-relaxed"
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}

              {activePattern === "modal" && (
                <div className="text-center">
                  <button 
                    onClick={() => setShowModal(true)}
                    className="px-8 py-4 bg-accent text-white rounded-2xl font-bold shadow-xl shadow-accent/20"
                  >
                    Open Modal
                  </button>
                  <AnimatePresence>
                    {showModal && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm"
                      >
                        <motion.div 
                          initial={{ scale: 0.9, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0.9, y: 20 }}
                          className="glass p-8 rounded-3xl max-w-md w-full relative"
                        >
                          <HelpCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                          <h3 className="text-2xl font-display font-bold mb-2">Confirm Action</h3>
                          <p className="text-slate-400 text-sm mb-8">Are you sure you want to proceed with this master-level CSS training?</p>
                          <div className="flex gap-4">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-bold">Cancel</button>
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-accent rounded-xl text-sm font-bold">Confirm</button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors"
            >
              <Code className="w-4 h-4" />
              {showCode ? "Hide Code" : "Show Pattern Code"}
            </button>
          </div>

          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass rounded-2xl p-6 font-mono text-sm text-emerald-300 overflow-hidden"
              >
                <pre className="custom-scrollbar overflow-x-auto whitespace-pre-wrap">{PATTERN_CODE[activePattern]}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
