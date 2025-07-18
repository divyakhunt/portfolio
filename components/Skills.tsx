import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  FaPython, FaJava, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt,
  FaBolt, FaChartBar, FaChartPie, FaFileAlt, FaMusic, FaFileAudio,
  FaWaveSquare, FaVolumeUp, FaCommentDots, FaHandSparkles, FaCog,
  FaChevronDown,
} from 'react-icons/fa';
import {
  SiScikitlearn, SiTensorflow, SiKeras, SiPytorch, SiOpencv, SiPandas,
  SiNumpy, SiStreamlit, SiFlask, SiJupyter, SiGooglecolab, SiKaggle,
  SiMysql, SiSpacy,
} from 'react-icons/si';

// Data and components (Unchanged)
const ICON_SIZE = 'w-10 h-10 md:w-11 md:h-11';
const skills = [
  { name: 'Python', icon: <FaPython className={`${ICON_SIZE} text-blue-400`} /> },
  { name: 'C', icon: <FaCuttlefish className={`${ICON_SIZE} text-blue-500`} /> },
  { name: 'C++', icon: <SiCplusplus className={`${ICON_SIZE} text-blue-600`} /> },
  { name: 'Java', icon: <FaJava className={`${ICON_SIZE} text-orange-400`} /> },
  { name: 'HTML', icon: <FaHtml5 className={`${ICON_SIZE} text-orange-500`} /> },
  { name: 'CSS', icon: <FaCss3Alt className={`${ICON_SIZE} text-blue-500`} /> },
  { name: 'JavaScript', icon: <FaJsSquare className={`${ICON_SIZE} text-yellow-400`} /> },
  { name: 'Scikit-learn', icon: <SiScikitlearn className={`${ICON_SIZE} text-sky-500`} /> },
  { name: 'NumPy', icon: <SiNumpy className={`${ICON_SIZE} text-sky-600`} /> },
  { name: 'Pandas', icon: <SiPandas className={`${ICON_SIZE} text-purple-400`} /> },
  { name: 'Matplotlib', icon: <FaChartBar className={`${ICON_SIZE} text-red-400`} /> },
  { name: 'Seaborn', icon: <FaChartPie className={`${ICON_SIZE} text-indigo-400`} /> },
  { name: 'TensorFlow', icon: <SiTensorflow className={`${ICON_SIZE} text-orange-500`} /> },
  { name: 'Keras', icon: <SiKeras className={`${ICON_SIZE} text-red-600`} /> },
  { name: 'PyTorch', icon: <SiPytorch className={`${ICON_SIZE} text-red-500`} /> },
  { name: 'OpenCV', icon: <SiOpencv className={`${ICON_SIZE} text-green-400`} /> },
  { name: 'MediaPipe', icon: <FaHandSparkles className={`${ICON_SIZE} text-orange-300`} /> },
  { name: 'NLTK', icon: <FaFileAlt className={`${ICON_SIZE} text-teal-400`} /> },
  { name: 'spaCy', icon: <SiSpacy className={`${ICON_SIZE} text-sky-400`} /> },
  { name: 'Word2Vec', icon: <FaCommentDots className={`${ICON_SIZE} text-lime-400`} /> },
  { name: 'Librosa', icon: <FaMusic className={`${ICON_SIZE} text-pink-400`} /> },
  { name: 'SoundFile', icon: <FaFileAudio className={`${ICON_SIZE} text-cyan-400`} /> },
  { name: 'PyAudio', icon: <FaWaveSquare className={`${ICON_SIZE} text-fuchsia-400`} /> },
  { name: 'pyttsx3', icon: <FaVolumeUp className={`${ICON_SIZE} text-amber-400`} /> },
  { name: 'Jupyter', icon: <SiJupyter className={`${ICON_SIZE} text-orange-500`} /> },
  { name: 'Colab', icon: <SiGooglecolab className={`${ICON_SIZE} text-yellow-600`} /> },
  { name: 'Git', icon: <FaGitAlt className={`${ICON_SIZE} text-orange-600`} /> },
  { name: 'Streamlit', icon: <SiStreamlit className={`${ICON_SIZE} text-red-400`} /> },
  { name: 'Flask', icon: <SiFlask className={`${ICON_SIZE} text-neutral-300`} /> },
  { name: 'Kaggle', icon: <SiKaggle className={`${ICON_SIZE} text-sky-400`} /> },
];

const SkillCard = ({ item, large = true }) => {
  const sizeClass = large ? "min-w-[140px] h-[140px]" : "w-full h-full";
  const textSize = large ? 'text-base' : 'text-xs text-neutral-100';
  return (
    <div className={`${sizeClass} flex-shrink-0 bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white glow-hover`}>
      {item.icon}
      <span className={`mt-2 text-center ${textSize}`}>{item.name}</span>
    </div>
  );
};

export default function SkillsComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const raf1 = useRef<number>();
  const raf2 = useRef<number>();
  const [pausedRow1, setPausedRow1] = useState(false);
  const [pausedRow2, setPausedRow2] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const scrollRow1 = () => { if (!pausedRow1 && row1Ref.current) { row1Ref.current.scrollLeft += 0.5; if (row1Ref.current.scrollLeft >= row1Ref.current.scrollWidth / 2) row1Ref.current.scrollLeft = 0; } raf1.current = requestAnimationFrame(scrollRow1); };
    const scrollRow2 = () => { if (!pausedRow2 && row2Ref.current) { row2Ref.current.scrollLeft -= 0.5; if (row2Ref.current.scrollLeft <= 0) row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 2; } raf2.current = requestAnimationFrame(scrollRow2); };
    if (!expanded) { raf1.current = requestAnimationFrame(scrollRow1); raf2.current = requestAnimationFrame(scrollRow2); }
    return () => { cancelAnimationFrame(raf1.current!); cancelAnimationFrame(raf2.current!); };
  }, [pausedRow1, pausedRow2, expanded]);

  const row1 = skills.slice(0, 15);
  const row2 = skills.slice(15);
  
  // --- NEW: Variants for the content flip animation ---
  const flipVariants = {
    initial: {
      rotateY: -90,
      opacity: 0,
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 150, damping: 25, delay: 0.1 }
    },
    exit: {
      rotateY: 90,
      opacity: 0,
      transition: { type: 'spring', stiffness: 150, damping: 25 }
    },
  };

  const gridContainerVariants = {
    initial: {}, // The parent `flipVariants` handles the main animation
    animate: { transition: { staggerChildren: 0.015, delayChildren: 0.2 } },
  };
  
  const gridItemVariants = {
    initial: { y: 20, opacity: 0, scale: 0.8 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  return (
    <div className="bg-neutral-900 py-16 flex flex-col items-center justify-center overflow-hidden" style={{perspective: '1000px'}}>
      {/* CSS is unchanged from your original working version, no 3D flip styles needed here */}
      <style>{`
        .animate-gear { animation: rotateScaleGlow 6s ease-in-out infinite; }
        @keyframes rotateScaleGlow {
          0% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2)); }
          25% { transform: rotate(90deg) scale(1.05); filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.25)); }
          50% { transform: rotate(180deg) scale(1.1); filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)); }
          75% { transform: rotate(270deg) scale(1.05); filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.25)); }
          100% { transform: rotate(180deg) scale(1); filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2)); }
        }
        .glow-hover { position: relative; transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.1s ease; will-change: transform, box-shadow; background-color: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.015), transparent); overflow: hidden; z-index: 10; }
        .glow-hover::before { content: ''; position: absolute; inset: 0; border-radius: 0.75rem; background: radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 70%); opacity: 0; transition: opacity 0.1s ease-in-out; pointer-events: none; z-index: 0; }
        .glow-hover:hover { transform: translateY(-6px) scale(1.06); box-shadow: 0 8px 24px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 255, 255, 0.08), 0 0 10px rgba(255, 255, 255, 0.04); background: radial-gradient(circle at center, rgba(23, 8, 61, 0.68), rgba(15, 23, 42, 0.7) 70%); }
        .glow-hover:hover::before { opacity: 1; }
        .skills-container-breathing { position: relative; will-change: box-shadow; animation: breathing-glow 6s ease-in-out infinite; }
        @keyframes breathing-glow { 0%, 100% { box-shadow: 0 0 20px -5px rgba(168, 85, 247, 0.2); } 50% { box-shadow: 0 0 35px -5px rgba(168, 85, 247, 0.4); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .particle-field { position: relative; overflow: hidden; }
        .particle-field::before, .particle-field::after { content: ''; position: absolute; top: 0; left: 0; width: 200%; height: 100%; background-repeat: repeat; animation: animate-particles 25s linear infinite; z-index: 0; pointer-events: none; }
        .particle-field::before { background-image: radial-gradient(circle, #67e8f9 0.5px, transparent 1px); background-size: 30px 30px; }
        .particle-field::after { background-image: radial-gradient(circle,rgb(157, 73, 236) 0.6px, transparent 1px); background-size: 50px 50px; animation-duration: 40s; animation-direction: reverse; }
        @keyframes animate-particles { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
      
      <h2 className="text-center text-5xl md:text-6xl font-extrabold text-white mb-10 flex justify-center items-center gap-4">
        <FaCog className="animate-gear text-[3rem] md:text-[3.5rem] text-neutral-400 drop-shadow-[0_2px_6px_rgba(255,255,255,0.25)]" />
        <span className="bg-gradient-to-r from-gray-200 to-white text-transparent bg-clip-text">My Stack</span>
      </h2>
      
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        layout
        transition={{ type: 'spring', stiffness: 150, damping: 25, mass: 0.8 }}
        style={{
          width: expanded ? '100%' : '90%',
          maxWidth: expanded ? '1400px' : '1100px',
        }}
        className="skills-container-breathing mx-auto rounded-2xl p-[2px] bg-gradient-to-br from-purple-500/30 via-sky-400/20 to-transparent"
      >
        {/* --- MODIFIED: This is now a motion.div with the layout prop to animate height --- */}
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="relative w-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-[1rem] border border-neutral-700 overflow-hidden flex flex-col justify-center particle-field"
          style={{ height: expanded ? 'auto' : '350px' }}
        >
          <motion.div
            className="absolute -z-0 pointer-events-none"
            style={{
              x: mouseX, y: mouseY,
              width: 400, height: 400,
              translateX: '-50%', translateY: '-50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          {/* --- MODIFIED: AnimatePresence now uses mode="wait" --- */}
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.div
                key="scrolling"
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="p-4 space-y-4">
                  <div ref={row1Ref} onMouseEnter={() => setPausedRow1(true)} onMouseLeave={() => setPausedRow1(false)} className="flex gap-4 overflow-x-scroll no-scrollbar">
                    {[...row1, ...row1].map((item, i) => <SkillCard key={`${item.name}-${i}-scroll`} item={item} large={true}/>)}
                  </div>
                  <div ref={row2Ref} onMouseEnter={() => setPausedRow2(true)} onMouseLeave={() => setPausedRow2(false)} className="flex gap-4 overflow-x-scroll no-scrollbar">
                    {[...row2, ...row2].map((item, i) => <SkillCard key={`${item.name}-${i}-scroll`} item={item} large={true}/>)}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                  <motion.div
                    variants={gridContainerVariants}
                    className="grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-2 justify-items-center p-4"
                  >
                    {skills.map((item) => (
                      <motion.div variants={gridItemVariants} key={item.name} className="w-[120px] h-[120px]">
                        <SkillCard item={item} large={false} />
                      </motion.div>
                    ))}
                  </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <div className="mt-6">
        <motion.button
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white hover:text-sky-400 transition-colors"
        >
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }}>
            <FaChevronDown className="text-xl" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}