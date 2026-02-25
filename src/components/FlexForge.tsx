import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Code, Layout } from "lucide-react";

const FLEX_DIRECTIONS = ["row", "row-reverse", "column", "column-reverse"];
const JUSTIFY_CONTENT = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"];
const ALIGN_ITEMS = ["flex-start", "flex-end", "center", "baseline", "stretch"];
const WRAP_OPTIONS = ["nowrap", "wrap", "wrap-reverse"];

export default function FlexForge() {
  const [state, setState] = useState({
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 16,
    itemCount: 3,
  });

  const [showCode, setShowCode] = useState(false);

  const cssCode = `.container {
  display: flex;
  flex-direction: ${state.flexDirection};
  justify-content: ${state.justifyContent};
  align-items: ${state.alignItems};
  flex-wrap: ${state.flexWrap};
  gap: ${state.gap}px;
}`;

  return (
    <section id="flexbox" className="py-24 container mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
          <Layout className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold">FlexForge</h2>
          <p className="text-slate-400">Master 1D layouts with Flexbox</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Controls</h3>
            
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium mb-2 block">Flex Direction</span>
                <select 
                  value={state.flexDirection}
                  onChange={(e) => setState({ ...state, flexDirection: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  {FLEX_DIRECTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Justify Content</span>
                <select 
                  value={state.justifyContent}
                  onChange={(e) => setState({ ...state, justifyContent: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  {JUSTIFY_CONTENT.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Align Items</span>
                <select 
                  value={state.alignItems}
                  onChange={(e) => setState({ ...state, alignItems: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  {ALIGN_ITEMS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Flex Wrap</span>
                <select 
                  value={state.flexWrap}
                  onChange={(e) => setState({ ...state, flexWrap: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  {WRAP_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Gap</span>
                  <span className="text-xs font-mono text-accent">{state.gap}px</span>
                </div>
                <input 
                  type="range" min="0" max="64" step="4"
                  value={state.gap}
                  onChange={(e) => setState({ ...state, gap: parseInt(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Items</span>
                  <span className="text-xs font-mono text-accent">{state.itemCount}</span>
                </div>
                <input 
                  type="range" min="1" max="12" step="1"
                  value={state.itemCount}
                  onChange={(e) => setState({ ...state, itemCount: parseInt(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="glass rounded-2xl p-8 min-h-[500px] relative flex flex-col">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              <div className="w-2 h-2 rounded-full bg-accent" />
              Live Preview
            </div>

            {/* Axis Indicators */}
            <div className="absolute inset-0 pointer-events-none p-8">
              {/* Main Axis */}
              <div className={`axis-line bg-accent/20 ${state.flexDirection.includes('column') ? 'w-px h-full left-1/2 -translate-x-1/2' : 'h-px w-full top-1/2 -translate-y-1/2'}`} />
              <div className={`axis-label ${state.flexDirection.includes('column') ? 'left-1/2 -translate-x-1/2 top-4' : 'top-1/2 -translate-y-1/2 left-4'}`}>
                Main Axis
              </div>
            </div>

            <div 
              className="flex-1 border-2 border-dashed border-white/5 rounded-xl transition-all duration-500 overflow-hidden"
              style={{
                display: "flex",
                flexDirection: state.flexDirection as any,
                justifyContent: state.justifyContent,
                alignItems: state.alignItems,
                flexWrap: state.flexWrap as any,
                gap: `${state.gap}px`,
              }}
            >
              {Array.from({ length: state.itemCount }).map((_, i) => (
                <motion.div
                  layout
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-gradient-to-br from-accent/40 to-indigo-500/40 border border-white/20 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg"
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              <Code className="w-4 h-4" />
              {showCode ? "Hide Code" : "Show CSS Code"}
            </button>
          </div>

          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass rounded-2xl p-6 font-mono text-sm text-indigo-300 overflow-hidden"
              >
                <pre className="custom-scrollbar overflow-x-auto">{cssCode}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explanation Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-accent">
              <Info className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Property Info</h3>
            </div>
            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <p className="text-white font-medium mb-1">flex-direction</p>
                <p>Defines the main axis of the container. Row is horizontal, column is vertical.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">justify-content</p>
                <p>Aligns items along the main axis. Controls horizontal spacing in rows.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">align-items</p>
                <p>Aligns items along the cross axis. Controls vertical alignment in rows.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
