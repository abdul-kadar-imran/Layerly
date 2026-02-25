import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grid, Info, Code } from "lucide-react";

export default function GridLab() {
  const [state, setState] = useState({
    cols: 3,
    rows: 2,
    colGap: 16,
    rowGap: 16,
    showOverlay: true,
  });

  const [showCode, setShowCode] = useState(false);

  const cssCode = `.container {
  display: grid;
  grid-template-columns: repeat(${state.cols}, 1fr);
  grid-template-rows: repeat(${state.rows}, 1fr);
  column-gap: ${state.colGap}px;
  row-gap: ${state.rowGap}px;
}`;

  return (
    <section id="grid" className="py-24 container mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
          <Grid className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold">GridLab</h2>
          <p className="text-slate-400">Master 2D layouts with CSS Grid</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Grid Config</h3>
            
            <div className="space-y-6">
              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Columns</span>
                  <span className="text-xs font-mono text-indigo-400">{state.cols}</span>
                </div>
                <input 
                  type="range" min="1" max="6" step="1"
                  value={state.cols}
                  onChange={(e) => setState({ ...state, cols: parseInt(e.target.value) })}
                  className="w-full accent-indigo-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Rows</span>
                  <span className="text-xs font-mono text-indigo-400">{state.rows}</span>
                </div>
                <input 
                  type="range" min="1" max="6" step="1"
                  value={state.rows}
                  onChange={(e) => setState({ ...state, rows: parseInt(e.target.value) })}
                  className="w-full accent-indigo-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Column Gap</span>
                  <span className="text-xs font-mono text-indigo-400">{state.colGap}px</span>
                </div>
                <input 
                  type="range" min="0" max="64" step="4"
                  value={state.colGap}
                  onChange={(e) => setState({ ...state, colGap: parseInt(e.target.value) })}
                  className="w-full accent-indigo-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Row Gap</span>
                  <span className="text-xs font-mono text-indigo-400">{state.rowGap}px</span>
                </div>
                <input 
                  type="range" min="0" max="64" step="4"
                  value={state.rowGap}
                  onChange={(e) => setState({ ...state, rowGap: parseInt(e.target.value) })}
                  className="w-full accent-indigo-400"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={state.showOverlay}
                  onChange={(e) => setState({ ...state, showOverlay: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 bg-slate-800 text-indigo-400 focus:ring-indigo-400"
                />
                <span className="text-sm font-medium">Show Grid Overlay</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="glass rounded-2xl p-8 min-h-[500px] relative flex flex-col">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              <div className="w-2 h-2 rounded-full bg-indigo-400" />
              Grid Preview
            </div>

            <div 
              className="flex-1 border-2 border-dashed border-white/5 rounded-xl transition-all duration-500 relative"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${state.cols}, 1fr)`,
                gridTemplateRows: `repeat(${state.rows}, 1fr)`,
                columnGap: `${state.colGap}px`,
                rowGap: `${state.rowGap}px`,
              }}
            >
              {/* Grid Overlay Lines */}
              {state.showOverlay && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Column Lines */}
                  {Array.from({ length: state.cols - 1 }).map((_, i) => (
                    <div 
                      key={`col-${i}`}
                      className="absolute top-0 bottom-0 w-px bg-indigo-400/30 border-l border-dashed border-indigo-400/50"
                      style={{ left: `${(100 / state.cols) * (i + 1)}%` }}
                    />
                  ))}
                  {/* Row Lines */}
                  {Array.from({ length: state.rows - 1 }).map((_, i) => (
                    <div 
                      key={`row-${i}`}
                      className="absolute left-0 right-0 h-px bg-indigo-400/30 border-t border-dashed border-indigo-400/50"
                      style={{ top: `${(100 / state.rows) * (i + 1)}%` }}
                    />
                  ))}
                </div>
              )}

              {Array.from({ length: state.cols * state.rows }).map((_, i) => (
                <motion.div
                  layout
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 rounded-lg flex items-center justify-center text-sm font-mono text-indigo-200"
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm font-medium hover:text-indigo-400 transition-colors"
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
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Info className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Grid Concepts</h3>
            </div>
            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <p className="text-white font-medium mb-1">grid-template-columns</p>
                <p>Defines the column structure. Using `fr` units allows columns to take up proportional space.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Gap (Gutters)</p>
                <p>Controls the spacing between grid items without affecting the outer edges.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">2D Control</p>
                <p>Unlike Flexbox, Grid allows you to control both rows and columns simultaneously.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
