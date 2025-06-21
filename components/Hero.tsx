import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Lottie from 'lottie-react';

interface HeroProps {
  firstName: string;
  lastName: string;
  tagline: string;
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

const textVariant = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, type: 'spring', stiffness: 120 }
  },
});

const nameLetterVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.045,
      duration: 0.45,
      ease: "easeOut",
      type: 'spring',
      stiffness: 150,
    },
  }),
};

const Hero: React.FC<HeroProps> = ({ firstName, lastName, tagline, onContactClick }) => {
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch('/assets/animation.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch animation: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
        setLoadingError("Could not load animation. Please ensure /assets/animation.json is available.");
      }
    };

    fetchAnimation();
  }, []);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-neutral-900 overflow-hidden will-change-transform backface-hidden"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      aria-labelledby="hero-main-title"
    >
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* Left Column */}
        <motion.div
          className="flex-1 flex flex-col justify-center text-center md:text-left md:max-w-xl lg:max-w-2xl"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.p className="text-xl md:text-2xl text-neutral-300 mb-1" variants={textVariant(0.1)}>
            Hi,
          </motion.p>
          <motion.p className="text-lg md:text-xl text-neutral-400 mb-2" variants={textVariant(0.15)}>
            My name is
          </motion.p>

          <motion.h1
            id="hero-main-title"
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 tracking-tight"
            aria-label={`${firstName} ${lastName}`}
            variants={textVariant(0.2)}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 inline-block">
              {firstName.split("").map((char, index) => (
                <motion.span key={`fn-${index}`} custom={index} variants={nameLetterVariant} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
            {lastName && (
              <span className="text-indigo-400 ml-2 sm:ml-3 inline-block">
                {lastName.split("").map((char, index) => (
                  <motion.span key={`ln-${index}`} custom={firstName.length + index} variants={nameLetterVariant} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>
            )}
          </motion.h1>

          <motion.p
            className="text-2xl sm:text-3xl text-neutral-200 opacity-85 mb-8 font-medium leading-tight"
            variants={textVariant(0.3)}
          >
            {tagline}
          </motion.p>

          <motion.a
            href="#contact"
            onClick={(e) => onContactClick(e, 'contact')}
            className="self-center md:self-start px-7 py-3 bg-blue-600 hover:bg-indigo-600 text-white text-base font-medium rounded-lg shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            variants={textVariant(0.4)}
            whileHover={{ scale: 1.08, y: -2, rotate: 0.4 }}
            whileTap={{ scale: 0.95, rotate: -1 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
          >
            Contact Me
          </motion.a>

        </motion.div>

        {/* Right Column */}
        <motion.div
          className="flex-1 w-full md:w-auto flex items-center justify-center mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-72 sm:h-80 md:h-96 lg:h-[480px] flex items-center justify-center">
            {loadingError && (
              <p className="text-red-400 text-center p-4 text-sm">{loadingError}</p>
            )}
            {!animationData && !loadingError && (
              <motion.div
                className="flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin" />

                <p className="mt-4 text-sm text-indigo-200 animate-pulse">Loading animation...</p>
              </motion.div>
            )}
            {animationData && (
            <motion.div
              initial={{ scale: 0.6, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 12,
                duration: 0.8,
                delay: 0.4,
              }}
            >
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                className="w-72 h-72 lg:w-96 lg:h-96"
                rendererSettings={{
                preserveAspectRatio: "xMidYMid slice", // optimizes rendering
              }}
              />
            </motion.div>
          )}

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(Hero);
