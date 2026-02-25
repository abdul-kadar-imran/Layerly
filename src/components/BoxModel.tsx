import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Box, Info, AlertTriangle, Code } from "lucide-react";

export default function BoxModel() {
  const [state, setState] = useState({
    margin: 24,
    padding: 24,
    border: 4,
    width: 200,
    height: 200,
  });

  const [showCode, setShowCode] = useState(false);

  const cssCode = `.element {
  width: ${state.width}px;
  height: ${state.height}px;
  padding: ${state.padding}px;
  border: ${state.border}px solid #10b981;
  margin: ${state.margin}px;
  box-sizing: border-box;
}`;

  const isOverflowing = state.width < 50 || state.height < 50;

  return (
    <section id="box-model" className="py-24 container mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
          <Box className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold">Box Model Visualizer</h2>
          <p className="text-slate-400">Understand the layers of every element</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Box Properties</h3>
            
            <div className="space-y-6">
              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Margin</span>
                  <span className="text-xs font-mono text-emerald-400">{state.margin}px</span>
                </div>
                <input 
                  type="range" min="0" max="80" step="4"
                  value={state.margin}
                  onChange={(e) => setState({ ...state, margin: parseInt(e.target.value) })}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Border Width</span>
                  <span className="text-xs font-mono text-emerald-400">{state.border}px</span>
                </div>
                <input 
                  type="range" min="0" max="20" step="1"
                  value={state.border}
                  onChange={(e) => setState({ ...state, border: parseInt(e.target.value) })}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Padding</span>
                  <span className="text-xs font-mono text-emerald-400">{state.padding}px</span>
                </div>
                <input 
                  type="range" min="0" max="80" step="4"
                  value={state.padding}
                  onChange={(e) => setState({ ...state, padding: parseInt(e.target.value) })}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Width</span>
                  <span className="text-xs font-mono text-emerald-400">{state.width}px</span>
                </div>
                <input 
                  type="range" min="40" max="400" step="10"
                  value={state.width}
                  onChange={(e) => setState({ ...state, width: parseInt(e.target.value) })}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Height</span>
                  <span className="text-xs font-mono text-emerald-400">{state.height}px</span>
                </div>
                <input 
                  type="range" min="40" max="400" step="10"
                  value={state.height}
                  onChange={(e) => setState({ ...state, height: parseInt(e.target.value) })}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>
          </div>

          {isOverflowing && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200 leading-relaxed">
                The content area is becoming very small. This might cause text overflow in real applications.
              </p>
            </motion.div>
          )}
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-8">
          <div className="glass rounded-2xl p-12 min-h-[600px] flex items-center justify-center overflow-hidden">
            <div className="relative flex items-center justify-center">
              
              {/* Margin Layer */}
              <div 
                className="bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  padding: `${state.margin}px`,
                }}
              >
                <div className="absolute top-2 left-2 text-[10px] font-mono text-orange-400 uppercase tracking-widest">Margin</div>
                
                {/* Border Layer */}
                <div 
                  className="bg-amber-500/20 border-amber-500 transition-all duration-300"
                  style={{
                    borderWidth: `${state.border}px`,
                    borderStyle: 'solid',
                  }}
                >
                  <div className="absolute -top-6 left-0 text-[10px] font-mono text-amber-400 uppercase tracking-widest">Border</div>

                  {/* Padding Layer */}
                  <div 
                    className="bg-emerald-500/20 border border-emerald-500/30 transition-all duration-300 relative"
                    style={{
                      padding: `${state.padding}px`,
                    }}
                  >
                    <div className="absolute top-2 left-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Padding</div>

                    {/* Content Layer */}
                    <motion.div 
                      layout
                      className="bg-accent/40 border border-white/20 rounded flex items-center justify-center transition-all duration-300"
                      style={{
                        width: `${state.width}px`,
                        height: `${state.height}px`,
                      }}
                    >
                      <span className="text-xs font-mono text-white">
                        {state.width} × {state.height}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 flex items-center justify-between mt-8">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors"
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
                className="glass rounded-2xl p-6 font-mono text-sm text-emerald-300 overflow-hidden mt-4"
              >
                <pre className="custom-scrollbar overflow-x-auto">{cssCode}</pre>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-orange-400">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Margin</span>
              </div>
              <p className="text-xs text-slate-400">Space outside the border. Doesn't affect element size calculation in standard box-sizing.</p>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Border</span>
              </div>
              <p className="text-xs text-slate-400">The edge of the element. Can be styled with different widths, colors, and patterns.</p>
            </div>
            <div className="glass p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Padding</span>
              </div>
              <p className="text-xs text-slate-400">Space between the content and the border. Increases the clickable area of the element.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
