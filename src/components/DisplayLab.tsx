import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Info, Code } from "lucide-react";

const DISPLAYS = ["block", "inline", "inline-block", "flex", "grid"];

export default function DisplayLab() {
  const [state, setState] = useState({
    display: "block",
    width: "auto",
    height: "auto",
  });

  const [showCode, setShowCode] = useState(false);

  const cssCode = `.element {
  display: ${state.display};
  width: ${state.width};
  height: ${state.height};
}`;

  return (
    <section id="display" className="py-24 container mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
          <Monitor className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold">Display Types</h2>
          <p className="text-slate-400">Control how elements interact with their neighbors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Display Config</h3>
            
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium mb-2 block">Display Type</span>
                <select 
                  value={state.display}
                  onChange={(e) => setState({ ...state, display: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  {DISPLAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Width</span>
                <select 
                  value={state.width}
                  onChange={(e) => setState({ ...state, width: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="auto">auto</option>
                  <option value="100px">100px</option>
                  <option value="50%">50%</option>
                  <option value="100%">100%</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Height</span>
                <select 
                  value={state.height}
                  onChange={(e) => setState({ ...state, height: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="auto">auto</option>
                  <option value="100px">100px</option>
                  <option value="200px">200px</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="glass rounded-2xl p-8 min-h-[500px] relative flex flex-col">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              Flow Preview
            </div>

            <div className="flex-1 border-2 border-dashed border-white/5 rounded-xl p-8 overflow-hidden">
              <div className="text-xs text-slate-500 mb-4 font-mono">{"<div class='container'>"}</div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="inline-block px-2 py-1 bg-white/10 rounded text-[10px] mr-2 mb-2">Neighbor 1</span>
                
                <motion.div
                  layout
                  className="bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border border-white/20 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg p-4"
                  style={{
                    display: state.display as any,
                    width: state.width,
                    height: state.height,
                  }}
                >
                  Target Element
                </motion.div>

                <span className="inline-block px-2 py-1 bg-white/10 rounded text-[10px] ml-2 mt-2">Neighbor 2</span>
              </div>

              <div className="text-xs text-slate-500 mt-4 font-mono">{"</div>"}</div>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm font-medium hover:text-cyan-400 transition-colors"
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
                className="glass rounded-2xl p-6 font-mono text-sm text-cyan-300 overflow-hidden"
              >
                <pre className="custom-scrollbar overflow-x-auto">{cssCode}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explanation Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <Info className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Display Guide</h3>
            </div>
            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <p className="text-white font-medium mb-1">block</p>
                <p>Takes full width. Starts on a new line. Respects width/height.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">inline</p>
                <p>Takes only necessary width. Doesn't start on a new line. Ignores width/height.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">inline-block</p>
                <p>Like inline, but respects width/height and padding/margins.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">flex / grid</p>
                <p>Turns the element into a container for its children, enabling advanced layouts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
