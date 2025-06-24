import React from 'react';
import { motion, Variants } from 'framer-motion';

interface HeroProps {
  firstName: string;
  lastName: string;
  tagline: string;
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

// Using the original, more subtle animation variants
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
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-neutral-900 overflow-hidden text-center"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      aria-labelledby="hero-main-title"
    >
      {/* Centered Content Container */}
      <motion.div
        className="flex flex-col items-center max-w-4xl"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.p className="text-xl md:text-2xl text-neutral-300 mb-2" variants={textVariant(0.1)}>
          Hi,
        </motion.p>
        <motion.p className="text-lg md:text-xl text-neutral-400 mb-3" variants={textVariant(0.15)}>
          My name is
        </motion.p>

        <motion.h1
          id="hero-main-title"
          // A modest but noticeable increase from the original 7xl
          className="text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold mb-6 tracking-tight"
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
            <span className="text-indigo-400 ml-2 sm:ml-4 inline-block">
              {lastName.split("").map((char, index) => (
                <motion.span key={`ln-${index}`} custom={firstName.length + index} variants={nameLetterVariant} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          )}
        </motion.h1>

        <motion.p
          // Slightly larger than original, but clearly subordinate to the name
          className="text-2xl md:text-3xl text-neutral-200 opacity-85 mb-10 font-medium leading-tight max-w-3xl"
          variants={textVariant(0.3)}
        >
          {tagline}
        </motion.p>

        <motion.a
          href="#contact"
          onClick={(e) => onContactClick(e, 'contact')}
          // A solid, well-proportioned button
          className="px-8 py-3 bg-blue-600 hover:bg-indigo-600 text-white text-base font-medium rounded-lg shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          variants={textVariant(0.4)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
        >
          Contact Me
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(Hero);4