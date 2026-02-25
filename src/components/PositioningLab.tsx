import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Move, Info, Code, AlertCircle } from "lucide-react";

const POSITIONS = ["static", "relative", "absolute", "fixed", "sticky"];

export default function PositioningLab() {
  const [state, setState] = useState({
    position: "relative",
    top: 0,
    left: 0,
    zIndex: 1,
    parentRelative: true,
  });

  const [showCode, setShowCode] = useState(false);

  const cssCode = `.element {
  position: ${state.position};
  top: ${state.top}px;
  left: ${state.left}px;
  z-index: ${state.zIndex};
}`;

  return (
    <section id="positioning" className="py-24 container mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center">
          <Move className="w-6 h-6 text-pink-400" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold">Positioning System</h2>
          <p className="text-slate-400">Master how elements are placed in the document flow</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Position Config</h3>
            
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium mb-2 block">Position Type</span>
                <select 
                  value={state.position}
                  onChange={(e) => setState({ ...state, position: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                >
                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Top</span>
                  <span className="text-xs font-mono text-pink-400">{state.top}px</span>
                </div>
                <input 
                  type="range" min="-100" max="100" step="5"
                  value={state.top}
                  onChange={(e) => setState({ ...state, top: parseInt(e.target.value) })}
                  className="w-full accent-pink-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Left</span>
                  <span className="text-xs font-mono text-pink-400">{state.left}px</span>
                </div>
                <input 
                  type="range" min="-100" max="100" step="5"
                  value={state.left}
                  onChange={(e) => setState({ ...state, left: parseInt(e.target.value) })}
                  className="w-full accent-pink-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Z-Index</span>
                  <span className="text-xs font-mono text-pink-400">{state.zIndex}</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="1"
                  value={state.zIndex}
                  onChange={(e) => setState({ ...state, zIndex: parseInt(e.target.value) })}
                  className="w-full accent-pink-400"
                />
              </div>

              {state.position === "absolute" && (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={state.parentRelative}
                    onChange={(e) => setState({ ...state, parentRelative: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-slate-800 text-pink-400 focus:ring-pink-400"
                  />
                  <span className="text-sm font-medium">Parent is relative?</span>
                </label>
              )}
            </div>
          </div>

          {state.position === "fixed" && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-200 leading-relaxed">
                Fixed elements are positioned relative to the viewport. In this preview, we simulate it relative to the container for visualization.
              </p>
            </div>
          )}
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className={`glass rounded-2xl p-8 min-h-[500px] relative flex flex-col ${state.parentRelative ? 'relative' : ''}`}>
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              Parent Container
            </div>

            <div className="flex-1 border-2 border-dashed border-white/5 rounded-xl p-12 overflow-y-auto custom-scrollbar">
              <div className="space-y-4 opacity-20">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-5/6" />
              </div>

              <motion.div
                layout
                className="w-32 h-32 bg-gradient-to-br from-pink-500/40 to-rose-500/40 border border-white/20 rounded-2xl flex items-center justify-center text-sm font-bold shadow-xl z-10"
                style={{
                  position: state.position as any,
                  top: state.position !== 'static' ? `${state.top}px` : undefined,
                  left: state.position !== 'static' ? `${state.left}px` : undefined,
                  zIndex: state.zIndex,
                }}
              >
                Target
              </motion.div>

              <div className="space-y-4 mt-4 opacity-20">
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="h-4 bg-white/10 rounded w-4/5" />
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm font-medium hover:text-pink-400 transition-colors"
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
                className="glass rounded-2xl p-6 font-mono text-sm text-pink-300 overflow-hidden"
              >
                <pre className="custom-scrollbar overflow-x-auto">{cssCode}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explanation Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-pink-400">
              <Info className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Positioning Guide</h3>
            </div>
            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <p className="text-white font-medium mb-1">static</p>
                <p>Default. Follows normal document flow. top/left/z-index have no effect.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">relative</p>
                <p>Positioned relative to its normal position. Still occupies its original space in the flow.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">absolute</p>
                <p>Removed from flow. Positioned relative to the nearest positioned ancestor (non-static).</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">fixed</p>
                <p>Removed from flow. Positioned relative to the viewport. Stays in place when scrolling.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">sticky</p>
                <p>Switches between relative and fixed based on the user's scroll position.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
