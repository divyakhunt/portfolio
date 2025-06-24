import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

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
    transition: { delay, type: 'spring', stiffness: 120 },
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
      ease: 'easeOut',
      type: 'spring',
      stiffness: 150,
    },
  }),
};

const Hero: React.FC<HeroProps> = ({ firstName, lastName, tagline, onContactClick }) => {
  const [width, height] = useWindowSize();
  const [confettiKey, setConfettiKey] = useState(0);

  const handleWishClick = () => {
    setConfettiKey((prev) => prev + 1); // force remount Confetti
    if (window.umami) {
    window.umami.track('wish-dhruv-clicked');
  }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-neutral-900 overflow-hidden text-center"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      aria-labelledby="hero-main-title"
    >
      {/* 🎉 Confetti: remounts every time by changing key */}
      {confettiKey > 0 && (
        <Confetti
          key={confettiKey}
          width={width}
          height={height}
          numberOfPieces={500}
          gravity={0.4}
          recycle={false}
          run={true}
        />
      )}


      <motion.div className="flex flex-col items-center max-w-4xl">
        <motion.p className="text-xl md:text-2xl text-neutral-300 mb-2" variants={textVariant(0.1)}>
          Hi,
        </motion.p>
        <motion.p className="text-lg md:text-xl text-neutral-400 mb-3" variants={textVariant(0.15)}>
          My name is
        </motion.p>

        <motion.h1
          id="hero-main-title"
          className="text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold mb-6 tracking-tight"
          aria-label={`${firstName} ${lastName}`}
          variants={textVariant(0.2)}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 inline-block">
            {firstName.split('').map((char, index) => (
              <motion.span key={`fn-${index}`} custom={index} variants={nameLetterVariant} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
          {lastName && (
            <span className="text-indigo-400 ml-2 sm:ml-4 inline-block">
              {lastName.split('').map((char, index) => (
                <motion.span
                  key={`ln-${index}`}
                  custom={firstName.length + index}
                  variants={nameLetterVariant}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          )}
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-neutral-200 opacity-85 mb-10 font-medium leading-tight max-w-3xl"
          variants={textVariant(0.3)}
        >
          {tagline}
        </motion.p>

        <motion.a
          href="#contact"
          onClick={(e) => onContactClick(e, 'contact')}
          className="px-8 py-3 bg-blue-600 hover:bg-indigo-600 text-white text-base font-medium rounded-lg shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          variants={textVariant(0.4)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        >
          Contact Me
        </motion.a>

        {/* 🎂 Birthday Section */}
        <motion.div
  className="mt-10 px-8 py-2 rounded-xl max-w-2xl w-full text-neutral-100 text-center transition-all duration-500 bg-gradient-to-r from-indigo-800 via-purple-800 to-fuchsia-800 shadow-lg"
  variants={textVariant(0.5)}
>

          <motion.p className="text-2xl font-semibold mb-1">🎉 Today is my friend Dhruv's birthday!</motion.p>

          <motion.p className="text-xl mb-1">
            Happy Birthday <span className="font-bold text-pink-300">Dhruv Savani</span>! 🥳
          </motion.p>

          <p className="text-lg mb-3">
            Follow him on Instagram:&nbsp;
            <a
              href="https://www.instagram.com/dhruv.savanii?igsh=aGZ3YXY3cWpraG5s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              @dhruv.savanii
            </a>
          </p>

          <button
            onClick={handleWishClick}
            className="mt-1 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg shadow-md relative overflow-hidden transition-transform duration-200 transform hover:scale-105"
          >
            <span className="relative z-10">Wish Dhruv 🎈</span>
            <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(Hero);
