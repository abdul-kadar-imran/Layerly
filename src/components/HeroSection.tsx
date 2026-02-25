import { motion } from "motion/react";
import { ArrowRight, Layout, Grid, Box, Trophy } from "lucide-react";

export default function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-12 h-12 border border-accent/30 rounded-lg hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-indigo-500/20 rounded-full hidden lg:block"
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Master CSS <span className="gradient-text">Layout</span> Visually
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop guessing and start crafting. Layerly provides an interactive playground 
            to master Flexbox, Grid, and the Box Model through visual experimentation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-medium transition-all flex items-center gap-2 group shadow-lg shadow-accent/20"
            >
              Start Experimenting
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#flexbox"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-medium transition-all border border-white/10"
            >
              View Modules
            </a>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24">
          {[
            { icon: Layout, title: "FlexForge", desc: "Master alignment and distribution" },
            { icon: Grid, title: "GridLab", desc: "Build complex 2D layouts easily" },
            { icon: Box, title: "Box Model", desc: "Visualize spacing and sizing" },
            { icon: Trophy, title: "Challenges", desc: "Test your skills in the arena" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass p-6 rounded-2xl text-left hover:border-accent/50 transition-colors group"
            >
              <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
