import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, CheckCircle2, Timer, RefreshCcw, ArrowRight } from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  target: string; // CSS description of what they need to achieve
  initialState: any;
  validator: (state: any) => boolean;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "The Perfect Center",
    description: "Center the square both vertically and horizontally within the container.",
    target: "justify-content: center; align-items: center;",
    initialState: { justifyContent: "flex-start", alignItems: "flex-start" },
    validator: (s) => s.justifyContent === "center" && s.alignItems === "center",
  },
  {
    id: 2,
    title: "Space Between",
    description: "Distribute 3 items so they take up the full width with equal space between them.",
    target: "justify-content: space-between;",
    initialState: { justifyContent: "flex-start" },
    validator: (s) => s.justifyContent === "space-between",
  },
  {
    id: 3,
    title: "Vertical Stack",
    description: "Change the layout to a column and align items to the end of the cross axis.",
    target: "flex-direction: column; align-items: flex-end;",
    initialState: { flexDirection: "row", alignItems: "flex-start" },
    validator: (s) => s.flexDirection === "column" && s.alignItems === "flex-end",
  }
];

export default function ChallengeArena() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [state, setState] = useState(CHALLENGES[0].initialState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const challenge = CHALLENGES[currentIdx];

  useEffect(() => {
    let interval: any;
    if (isActive && !isSuccess) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isSuccess]);

  const handleControlChange = (key: string, value: string) => {
    if (!isActive) setIsActive(true);
    const newState = { ...state, [key]: value };
    setState(newState);
    setAttempts((a) => a + 1);
    
    if (challenge.validator(newState)) {
      setIsSuccess(true);
    }
  };

  const nextChallenge = () => {
    const next = (currentIdx + 1) % CHALLENGES.length;
    setCurrentIdx(next);
    setState(CHALLENGES[next].initialState);
    setIsSuccess(false);
    setAttempts(0);
    setTime(0);
    setIsActive(false);
  };

  const resetChallenge = () => {
    setState(challenge.initialState);
    setIsSuccess(false);
    setAttempts(0);
    setTime(0);
    setIsActive(false);
  };

  return (
    <section id="challenges" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold">Challenge Arena</h2>
              <p className="text-slate-400">Test your layout mastery</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
              <Timer className="w-4 h-4" />
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-mono text-slate-400">
              Attempts: <span className="text-white">{attempts}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Challenge Info & Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass p-8 rounded-3xl border-l-4 border-l-amber-500">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-2 block">Challenge {challenge.id} of {CHALLENGES.length}</span>
              <h3 className="text-2xl font-display font-bold mb-4">{challenge.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {challenge.description}
              </p>

              <div className="space-y-4">
                {Object.keys(challenge.initialState).map((key) => (
                  <div key={key} className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex flex-wrap gap-2">
                      {(key === 'justifyContent' ? ["flex-start", "center", "flex-end", "space-between"] : 
                        key === 'alignItems' ? ["flex-start", "center", "flex-end"] : 
                        ["row", "column"]).map((val) => (
                        <button
                          key={val}
                          onClick={() => handleControlChange(key, val)}
                          disabled={isSuccess}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            state[key] === val 
                              ? "bg-accent text-white shadow-lg shadow-accent/20" 
                              : "bg-white/5 hover:bg-white/10 text-slate-400"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={resetChallenge}
              className="w-full py-4 glass hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset Challenge
            </button>
          </div>

          {/* Live Preview Arena */}
          <div className="lg:col-span-8">
            <div className="glass rounded-3xl p-8 min-h-[500px] relative flex flex-col overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                Arena Preview
              </div>

              <div 
                className="flex-1 border-2 border-dashed border-white/5 rounded-2xl transition-all duration-500 flex"
                style={{
                  justifyContent: state.justifyContent || "flex-start",
                  alignItems: state.alignItems || "flex-start",
                  flexDirection: state.flexDirection || "row",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    layout
                    key={i}
                    className="w-24 h-24 bg-gradient-to-br from-amber-500/40 to-orange-500/40 border border-white/20 rounded-2xl shadow-xl m-2"
                  />
                ))}
              </div>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-20"
                  >
                    <div className="text-center p-8 glass rounded-3xl max-w-sm border-emerald-500/30">
                      <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                      <h4 className="text-2xl font-display font-bold mb-2">Challenge Complete!</h4>
                      <p className="text-slate-400 text-sm mb-8">
                        Great job! You mastered this layout in {attempts} attempts and {time} seconds.
                      </p>
                      <button
                        onClick={nextChallenge}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 group"
                      >
                        Next Challenge
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
