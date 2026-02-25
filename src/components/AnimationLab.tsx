import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Info, Code, Play } from "lucide-react";

export default function AnimationLab() {
  const [state, setState] = useState({
    duration: 0.5,
    timing: "ease-in-out",
    rotate: 0,
    scale: 1,
    x: 0,
    skew: 0,
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const cssCode = `.element {
  transition: all ${state.duration}s ${state.timing};
  transform: rotate(${state.rotate}deg) 
             scale(${state.scale}) 
             translateX(${state.x}px) 
             skew(${state.skew}deg);
}`;

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), state.duration * 1000);
  };

  return (
    <section id="animation" className="py-24 container mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold">Transitions & Transforms</h2>
          <p className="text-slate-400">Bring your UI to life with smooth motion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Animation Config</h3>
            
            <div className="space-y-4">
              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Duration</span>
                  <span className="text-xs font-mono text-yellow-400">{state.duration}s</span>
                </div>
                <input 
                  type="range" min="0.1" max="2" step="0.1"
                  value={state.duration}
                  onChange={(e) => setState({ ...state, duration: parseFloat(e.target.value) })}
                  className="w-full accent-yellow-400"
                />
              </div>

              <label className="block">
                <span className="text-sm font-medium mb-2 block">Timing Function</span>
                <select 
                  value={state.timing}
                  onChange={(e) => setState({ ...state, timing: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="linear">linear</option>
                  <option value="ease">ease</option>
                  <option value="ease-in">ease-in</option>
                  <option value="ease-out">ease-out</option>
                  <option value="ease-in-out">ease-in-out</option>
                  <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">back (bounce)</option>
                </select>
              </label>

              <div className="h-px bg-white/5 my-4" />

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Rotate</span>
                  <span className="text-xs font-mono text-yellow-400">{state.rotate}°</span>
                </div>
                <input 
                  type="range" min="-180" max="180" step="15"
                  value={state.rotate}
                  onChange={(e) => setState({ ...state, rotate: parseInt(e.target.value) })}
                  className="w-full accent-yellow-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Scale</span>
                  <span className="text-xs font-mono text-yellow-400">{state.scale}x</span>
                </div>
                <input 
                  type="range" min="0.5" max="2" step="0.1"
                  value={state.scale}
                  onChange={(e) => setState({ ...state, scale: parseFloat(e.target.value) })}
                  className="w-full accent-yellow-400"
                />
              </div>

              <div className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Translate X</span>
                  <span className="text-xs font-mono text-yellow-400">{state.x}px</span>
                </div>
                <input 
                  type="range" min="-100" max="100" step="10"
                  value={state.x}
                  onChange={(e) => setState({ ...state, x: parseInt(e.target.value) })}
                  className="w-full accent-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="glass rounded-2xl p-8 min-h-[500px] relative flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              Animation Preview
            </div>

            <motion.div
              animate={{
                rotate: state.rotate,
                scale: state.scale,
                x: state.x,
                skew: state.skew,
              }}
              transition={{
                duration: state.duration,
                ease: state.timing.includes('cubic') 
                  ? [0.68, -0.55, 0.265, 1.55] 
                  : state.timing === "ease-in-out" ? "easeInOut"
                  : state.timing === "ease-in" ? "easeIn"
                  : state.timing === "ease-out" ? "easeOut"
                  : state.timing === "ease" ? "easeInOut"
                  : state.timing as any,
              }}
              className="w-40 h-40 bg-gradient-to-br from-yellow-500/40 to-orange-500/40 border border-white/20 rounded-3xl flex items-center justify-center text-sm font-bold shadow-2xl relative group"
            >
              <Zap className={`w-8 h-8 text-yellow-400 transition-transform duration-500 ${isAnimating ? 'scale-125 rotate-12' : ''}`} />
              
              {/* Ghost trail simulation */}
              <div className="absolute inset-0 border border-yellow-400/20 rounded-3xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <button
              onClick={triggerAnimation}
              className="absolute bottom-8 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20"
            >
              <Play className="w-4 h-4 fill-current" />
              Trigger Change
            </button>
          </div>

          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm font-medium hover:text-yellow-400 transition-colors"
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
                className="glass rounded-2xl p-6 font-mono text-sm text-yellow-300 overflow-hidden"
              >
                <pre className="custom-scrollbar overflow-x-auto">{cssCode}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explanation Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              <Info className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Motion Guide</h3>
            </div>
            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <p className="text-white font-medium mb-1">transition</p>
                <p>Defines how properties change over time. Duration, property, and timing function.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">transform</p>
                <p>Modifies the visual appearance without affecting layout flow. rotate, scale, translate.</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">keyframes</p>
                <p>Used for complex, multi-step animations that can loop or run once.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
