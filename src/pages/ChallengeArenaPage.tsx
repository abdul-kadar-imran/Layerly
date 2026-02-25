import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, CheckCircle2, Timer, RefreshCcw, ArrowRight, ChevronRight, Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";

type Category = "Layout" | "Space & Position" | "Motion" | "UI Patterns";

interface Challenge {
  id: number;
  category: Category;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  description: string;
  target: string;
  initialState: any;
  validator: (state: any) => boolean;
  type: "flex" | "grid" | "box" | "position" | "animation" | "pattern";
}

const CHALLENGES: Challenge[] = [
  // Layout Category
  {
    id: 1,
    category: "Layout",
    difficulty: "Beginner",
    type: "flex",
    title: "Perfect Centering",
    description: "Use Flexbox to center the items both horizontally and vertically.",
    target: "justify-content: center; align-items: center;",
    initialState: { justifyContent: "flex-start", alignItems: "flex-start" },
    validator: (s) => s.justifyContent === "center" && s.alignItems === "center",
  },
  {
    id: 2,
    category: "Layout",
    difficulty: "Intermediate",
    type: "grid",
    title: "Three Column Grid",
    description: "Create a grid with 3 equal columns using grid-template-columns.",
    target: "grid-template-columns: repeat(3, 1fr);",
    initialState: { columns: 1 },
    validator: (s) => s.columns === 3,
  },
  {
    id: 3,
    category: "Layout",
    difficulty: "Advanced",
    type: "flex",
    title: "The Holy Grail Sidebar",
    description: "Create a layout where the first item is a fixed-width sidebar (200px) and the second item grows to fill the rest.",
    target: "flex: 0 0 200px; flex: 1;",
    initialState: { sidebarWidth: 100, mainGrow: 0 },
    validator: (s) => s.sidebarWidth === 200 && s.mainGrow === 1,
  },

  // Space & Position Category
  {
    id: 4,
    category: "Space & Position",
    difficulty: "Beginner",
    type: "box",
    title: "Box Breathing",
    description: "Add 30px of padding and 20px of margin to the element.",
    target: "padding: 30px; margin: 20px;",
    initialState: { padding: 0, margin: 0 },
    validator: (s) => s.padding === 30 && s.margin === 20,
  },
  {
    id: 5,
    category: "Space & Position",
    difficulty: "Intermediate",
    type: "position",
    title: "Absolute Overlay",
    description: "Position the element absolutely at the top-right corner (top: 0, right: 0).",
    target: "position: absolute; top: 0; right: 0;",
    initialState: { position: "absolute", top: 50, right: 50 },
    validator: (s) => s.position === "absolute" && s.top === 0 && s.right === 0,
  },
  {
    id: 6,
    category: "Space & Position",
    difficulty: "Advanced",
    type: "position",
    title: "Sticky Navigation",
    description: "Make the element stick to the top of the viewport when scrolling.",
    target: "position: sticky; top: 0;",
    initialState: { position: "relative", top: 0 },
    validator: (s) => s.position === "sticky" && s.top === 0,
  },

  // Motion Category
  {
    id: 7,
    category: "Motion",
    difficulty: "Beginner",
    type: "animation",
    title: "Smooth Scale",
    description: "Set the scale to 1.2x with a 0.5s duration.",
    target: "transform: scale(1.2); transition: 0.5s;",
    initialState: { scale: 1, duration: 0.2 },
    validator: (s) => s.scale === 1.2 && s.duration === 0.5,
  },
  {
    id: 8,
    category: "Motion",
    difficulty: "Intermediate",
    type: "animation",
    title: "Rotating Entrance",
    description: "Rotate the element by 45 degrees and set the easing to ease-in-out.",
    target: "transform: rotate(45deg); transition-timing: ease-in-out;",
    initialState: { rotate: 0, timing: "linear" },
    validator: (s) => s.rotate === 45 && s.timing === "ease-in-out",
  },
  {
    id: 9,
    category: "Motion",
    difficulty: "Advanced",
    type: "animation",
    title: "Complex Transform",
    description: "Combine a 180deg rotation with a 1.5x scale.",
    target: "transform: rotate(180deg) scale(1.5);",
    initialState: { rotate: 0, scale: 1 },
    validator: (s) => s.rotate === 180 && s.scale === 1.5,
  },

  // UI Patterns Category
  {
    id: 10,
    category: "UI Patterns",
    difficulty: "Beginner",
    type: "flex",
    title: "Navbar Structure",
    description: "Create a standard navbar layout with items spaced evenly using space-between.",
    target: "display: flex; justify-content: space-between;",
    initialState: { justifyContent: "flex-start" },
    validator: (s) => s.justifyContent === "space-between",
  },
  {
    id: 11,
    category: "UI Patterns",
    difficulty: "Intermediate",
    type: "grid",
    title: "Card Grid Layout",
    description: "Build a responsive card grid with a 20px gap between items.",
    target: "display: grid; gap: 20px;",
    initialState: { gap: 0 },
    validator: (s) => s.gap === 20,
  },
  {
    id: 12,
    category: "UI Patterns",
    difficulty: "Advanced",
    type: "position",
    title: "Modal Backdrop",
    description: "Create a full-screen fixed backdrop for a modal (top: 0, left: 0, width: 100%, height: 100%).",
    target: "position: fixed; top: 0; left: 0;",
    initialState: { position: "absolute", top: 20, left: 20 },
    validator: (s) => s.position === "fixed" && s.top === 0 && s.left === 0,
  },
];

export default function ChallengeArenaPage() {
  const [currentCategory, setCurrentCategory] = useState<Category>("Layout");
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [state, setState] = useState(CHALLENGES.find(c => c.category === "Layout")!.initialState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const filteredChallenges = CHALLENGES.filter(c => c.category === currentCategory);
  const challenge = filteredChallenges[currentChallengeIdx] || filteredChallenges[0];

  useEffect(() => {
    let interval: any;
    if (isActive && !isSuccess) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isSuccess]);

  const handleControlChange = (key: string, value: any) => {
    if (!isActive) setIsActive(true);
    const newState = { ...state, [key]: value };
    setState(newState);
    setAttempts((a) => a + 1);
    
    if (challenge.validator(newState)) {
      setIsSuccess(true);
    }
  };

  const nextChallenge = () => {
    if (currentChallengeIdx < filteredChallenges.length - 1) {
      const nextIdx = currentChallengeIdx + 1;
      setCurrentChallengeIdx(nextIdx);
      setState(filteredChallenges[nextIdx].initialState);
    } else {
      const categories: Category[] = ["Layout", "Space & Position", "Motion", "UI Patterns"];
      const currentCatIdx = categories.indexOf(currentCategory);
      if (currentCatIdx < categories.length - 1) {
        const nextCat = categories[currentCatIdx + 1];
        setCurrentCategory(nextCat);
        setCurrentChallengeIdx(0);
        setState(CHALLENGES.find(c => c.category === nextCat)!.initialState);
      }
    }
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
    <div className="min-h-screen bg-bg text-slate-200 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white/5 rounded-xl transition-colors">
              <ArrowRight className="w-6 h-6 rotate-180" />
            </Link>
            <div>
              <h1 className="text-4xl font-display font-bold">Challenge Arena</h1>
              <p className="text-slate-400">Master all CSS modules</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
            {(["Layout", "Space & Position", "Motion", "UI Patterns"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCurrentCategory(cat);
                  setCurrentChallengeIdx(0);
                  const firstOfCat = CHALLENGES.find(c => c.category === cat)!;
                  setState(firstOfCat.initialState);
                  setIsSuccess(false);
                  setAttempts(0);
                  setTime(0);
                  setIsActive(false);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  currentCategory === cat 
                    ? "bg-accent text-white shadow-lg" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Challenge Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass p-8 rounded-3xl border-l-4 border-l-accent relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="w-24 h-24" />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  challenge.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                  challenge.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {challenge.difficulty}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Challenge {currentChallengeIdx + 1} of {filteredChallenges.length}
                </span>
              </div>

              <h2 className="text-2xl font-display font-bold mb-4">{challenge.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {challenge.description}
              </p>

              {/* Dynamic Controls */}
              <div className="space-y-6">
                {Object.keys(challenge.initialState).map((key) => (
                  <div key={key} className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    
                    {['marginLeft', 'padding', 'border', 'top', 'right', 'left', 'rotate', 'scale', 'duration', 'gap', 'sidebarWidth', 'mainGrow', 'columns'].includes(key) ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span>Value</span>
                          <span className="text-accent">
                            {state[key]}{key === 'rotate' ? '°' : key === 'scale' ? 'x' : key === 'duration' ? 's' : key === 'mainGrow' ? '' : 'px'}
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min={key === 'rotate' ? -180 : key === 'scale' ? 0.5 : key === 'duration' ? 0.1 : key === 'columns' ? 1 : 0} 
                          max={key === 'rotate' ? 180 : key === 'scale' ? 2 : key === 'duration' ? 2 : key === 'columns' ? 4 : key === 'sidebarWidth' ? 300 : 100} 
                          step={key === 'scale' || key === 'duration' ? 0.1 : key === 'rotate' ? 15 : key === 'mainGrow' || key === 'columns' ? 1 : 5}
                          value={state[key]}
                          onChange={(e) => handleControlChange(key, parseFloat(e.target.value))}
                          className="w-full accent-accent"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(key === 'justifyContent' ? ["flex-start", "center", "flex-end", "space-between", "space-around"] : 
                          key === 'alignItems' ? ["flex-start", "center", "flex-end", "stretch"] : 
                          key === 'flexDirection' ? ["row", "column", "row-reverse"] :
                          key === 'gridColumn' ? ["span 1", "span 2", "span 3"] :
                          key === 'position' ? ["static", "relative", "absolute", "fixed", "sticky"] :
                          key === 'timing' ? ["linear", "ease", "ease-in-out"] :
                          []).map((val) => (
                          <button
                            key={val}
                            onClick={() => handleControlChange(key, val)}
                            disabled={isSuccess}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              state[key] === val 
                                ? "bg-accent text-white shadow-lg shadow-accent/20" 
                                : "bg-white/5 hover:bg-white/10 text-slate-400"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl text-center">
                <Timer className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                <div className="text-lg font-mono font-bold">
                  {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Time</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <Star className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                <div className="text-lg font-mono font-bold">{attempts}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Attempts</div>
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

          {/* Right: Preview */}
          <div className="lg:col-span-8">
            <div className="glass rounded-3xl p-8 min-h-[600px] relative flex flex-col overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Arena Preview: {challenge.category}
              </div>

              <div 
                className={`flex-1 border-2 border-dashed border-white/5 rounded-2xl transition-all duration-500 relative ${
                  challenge.type === 'grid' ? 'grid' : 'flex'
                }`}
                style={{
                  justifyContent: state.justifyContent,
                  alignItems: state.alignItems,
                  flexDirection: state.flexDirection,
                  display: challenge.type === 'grid' ? 'grid' : 'flex',
                  gridTemplateColumns: challenge.type === 'grid' 
                    ? `repeat(${state.columns || 3}, 1fr)` 
                    : challenge.id === 3 ? `${state.sidebarWidth}px 1fr` : undefined,
                  gap: `${state.gap || 16}px`,
                  padding: '1rem',
                  overflow: 'auto'
                }}
              >
                {challenge.type === 'grid' ? (
                   Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      layout
                      key={i}
                      className="rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-xs font-mono text-slate-500"
                    >
                      {i + 1}
                    </motion.div>
                  ))
                ) : challenge.type === 'box' ? (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-2xl">
                    <motion.div
                      layout
                      style={{ 
                        marginLeft: `${state.margin}px`,
                        padding: `${state.padding}px`,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '#6366f1'
                      }}
                      className="w-40 h-40 bg-gradient-to-br from-accent to-indigo-600 border-white/20 rounded-2xl shadow-xl flex items-center justify-center font-bold"
                    >
                      BOX
                    </motion.div>
                  </div>
                ) : challenge.type === 'position' ? (
                  <div className="w-full h-full bg-white/5 rounded-2xl p-8 relative overflow-y-auto custom-scrollbar">
                    <div className="space-y-4 opacity-10">
                      <div className="h-4 bg-white rounded w-3/4" />
                      <div className="h-4 bg-white rounded w-full" />
                    </div>
                    
                    <motion.div
                      layout
                      style={{ 
                        position: state.position,
                        top: state.position !== 'static' ? `${state.top}px` : undefined,
                        right: state.position !== 'static' ? `${state.right}px` : undefined,
                        left: state.position !== 'static' ? `${state.left}px` : undefined,
                        zIndex: 10
                      }}
                      className="w-32 h-32 bg-gradient-to-br from-accent to-indigo-600 border-2 border-white/20 rounded-2xl shadow-xl flex items-center justify-center font-bold"
                    >
                      TARGET
                    </motion.div>

                    <div className="space-y-4 mt-4 opacity-10">
                      <div className="h-4 bg-white rounded w-full" />
                      <div className="h-4 bg-white rounded w-2/3" />
                      <div className="h-4 bg-white rounded w-full" />
                      <div className="h-4 bg-white rounded w-full" />
                      <div className="h-4 bg-white rounded w-full" />
                    </div>
                  </div>
                ) : challenge.type === 'animation' ? (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-2xl">
                    <motion.div
                      animate={{
                        rotate: state.rotate,
                        scale: state.scale,
                      }}
                      transition={{
                        duration: state.duration,
                        ease: state.timing === "ease-in-out" ? "easeInOut" : state.timing as any,
                      }}
                      className="w-40 h-40 bg-gradient-to-br from-accent to-indigo-600 border-2 border-white/20 rounded-2xl shadow-xl flex items-center justify-center font-bold"
                    >
                      MOTION
                    </motion.div>
                  </div>
                ) : (
                  [1, 2, 3].map((i) => (
                    <motion.div
                      layout
                      key={i}
                      style={{
                        flex: i === 1 && challenge.id === 3 ? `0 0 ${state.sidebarWidth}px` : 
                              i === 2 && challenge.id === 3 ? state.mainGrow : undefined
                      }}
                      className="w-24 h-24 bg-gradient-to-br from-accent to-indigo-600 border-2 border-white/20 rounded-2xl shadow-xl flex items-center justify-center font-bold text-[10px]"
                    >
                      {challenge.id === 3 ? (i === 1 ? 'SIDEBAR' : 'MAIN') : `ITEM ${i}`}
                    </motion.div>
                  ))
                )}
              </div>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-20"
                  >
                    <div className="text-center p-12 glass rounded-3xl max-w-md border-emerald-500/30">
                      <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h4 className="text-3xl font-display font-bold mb-2">Mastered!</h4>
                      <p className="text-slate-400 text-sm mb-8">
                        You've successfully completed this challenge. Ready for the next one?
                      </p>
                      <button
                        onClick={nextChallenge}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 group"
                      >
                        Next Challenge
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
