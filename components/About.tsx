import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope } from 'react-icons/fa';

interface AboutProps {
  name: string;
  summaryParagraphs: string[];
  onContactClick: (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

// Highlighted text component — No underline, smooth color change
const HighlightedText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="text-primary-light font-semibold hover:text-primary-dark transition-colors duration-300 cursor-default"
    data-interactive="true"
  >
    {children}
  </span>
);

// Highlight parser — wraps <highlight>...<highlight> content
const parseAndHighlightText = (text: string) => {
  const parts = text.split(/<highlight>(.*?)<\/highlight>/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? <HighlightedText key={index}>{part}</HighlightedText> : part
  );
};

// Entry animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.05 }
  })
};

const About: React.FC<AboutProps> = ({ summaryParagraphs, onContactClick }) => {
  return (
    <section className="w-full bg-neutral-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          custom={0}
          className="text-4xl sm:text-5xl font-extrabold text-neutral-100 mb-6 relative pb-3
            after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
            after:bottom-0 after:w-2/5 sm:after:w-1/3 after:h-[5px] after:bg-accent-default after:rounded-full"
        >
          About Me
        </motion.h2>

        <div className="text-neutral-300 text-lg sm:text-xl leading-relaxed space-y-5">
          {summaryParagraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              custom={i + 1}
            >
              {parseAndHighlightText(paragraph)}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          custom={summaryParagraphs.length + 1}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
  href="/Divya_Khunt_Resume.pdf"
  download="Divya_Khunt_Resume.pdf"
  onClick={() => {
    if (window.umami) {
      window.umami.track('download-resume');
    }
  }}
  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white 
             font-semibold rounded-lg text-base md:text-lg shadow-md hover:shadow-primary/40
             transition-all duration-150 ease-out transform"
  whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 300, duration: 0.15 } }}
  whileTap={{ scale: 0.97 }}
  data-interactive="true"
  aria-label="Download my Resume"
>
  <FaDownload className="w-4 h-4 md:w-5 md:h-5" /> Download Resume
</motion.a>


          <motion.a
              href="#contact"
              onClick={(e) => onContactClick(e, 'contact')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-accent-secondary 
                         text-accent-secondary hover:bg-accent-secondary hover:text-white 
                         font-semibold rounded-lg text-base md:text-lg shadow-md hover:shadow-accent-secondary/30
                         transition-all duration-150 ease-out transform"
              whileHover={{ scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 300, duration: 0.15 } }}
              whileTap={{ scale: 0.97 }}
              data-interactive="true"
              aria-label="Contact Me"
            >
              <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" /> Contact Me
            </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(About);
