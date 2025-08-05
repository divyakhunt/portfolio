import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { ContactInfo } from '../types';

interface HeaderProps {
  isScrolled: boolean;
  activeSection: string;
  onNavLinkClick: (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  headerRef: React.RefObject<HTMLElement>;
  contactInfo: ContactInfo;
}

// Animation Variants - NEW reveal animation
const headerVariants: Variants = {
  hidden: { 
    clipPath: 'inset(0% 0% 100% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.2, duration: 0.8 },
  },
};

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5, // Start after header reveal begins
    },
  },
};

const navLinkVariants: Variants = {
  hidden: { y: 20, opacity: 0 }, // Animates from below
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const Header: React.FC<HeaderProps> = ({ isScrolled, activeSection, onNavLinkClick, headerRef, contactInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mouseX = useMotionValue(0);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: contactInfo.github, label: "GitHub", Icon: FaGithub, target: "_blank", hoverColor: "#6e5494" },
    { href: contactInfo.linkedin, label: "LinkedIn", Icon: FaLinkedin, target: "_blank", hoverColor: "#0A66C2" },
    { href: `mailto:${contactInfo.email}`, label: "Email", Icon: FaEnvelope, target: "_self", hoverColor: "#EA4335" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    onNavLinkClick(e, sectionId);
    setIsMenuOpen(false);
  };
  
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX } = event;
    const { left } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const mobileNavItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.08, duration: 0.4, ease: 'easeOut' },
    }),
  };

  const socialIconItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        id="home-header"
        className={`fixed top-0 left-0 right-0 z-50 text-neutral-100 will-change-transform transition-all duration-300 ease-in-out ${
          isScrolled || isMenuOpen ? 'py-3 sm:py-4' : 'bg-transparent py-4 sm:py-5'
        }`}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0 bg-neutral-900/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled || isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 w-full relative">
          <motion.a
            href="#home"
            onClick={(e) => onNavLinkClick(e, 'home')}
            className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.4 } }}
            whileHover={{ color: '#60A5FA' }} // only color change on hover
            whileTap={{ scale: 0.98 }}
          >
            Divya Khunt
          </motion.a>


          {/* Center: Desktop Nav with Render Animation */}
          <motion.nav 
            onMouseMove={handleMouseMove}
            className="hidden md:flex items-center gap-x-1 p-1 bg-neutral-800/70 border border-neutral-700/60 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm group"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
                className="absolute inset-0 rounded-full -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            180px circle at ${mouseX}px,
                            rgba(96, 165, 250, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => onNavLinkClick(e, link.id)}
                className={`relative px-4 py-1.5 text-sm lg:text-base font-medium transition-colors duration-300 rounded-full
                  text-neutral-300 hover:text-blue-400 dark:hover:text-primary-light
                `}
                
                variants={navLinkVariants}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute inset-0 bg-primary-default -z-10"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </motion.a>
            ))}
          </motion.nav>
          
          <div className="flex items-center z-10">
            {/* Desktop: Socials (Animation preserved as requested) */}
            <div className="hidden md:flex items-center gap-x-3 sm:gap-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.target}
                  rel={social.target === "_blank" ? "noopener noreferrer" : ""}
                  aria-label={social.label}
                  className="text-neutral-300"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.3 } }}
                  whileHover={{ y: -2, scale: 1.1, color: social.hoverColor, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
            
            {/* Mobile: Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-50 w-8 h-8 flex flex-col justify-around items-center"
                aria-label="Toggle menu"
              >
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full origin-center"
                  animate={{
                    y: isMenuOpen ? '7px' : '0px',
                    rotate: isMenuOpen ? 45 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scale: isMenuOpen ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full origin-center"
                  animate={{
                    y: isMenuOpen ? '-7px' : '0px',
                    rotate: isMenuOpen ? -45 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-darker/60 backdrop-blur-xl flex flex-col items-center justify-center text-white"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col items-center gap-y-6 text-center">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-3xl font-semibold tracking-wide"
                  custom={index}
                  variants={mobileNavItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    scale: 1.1, 
                    color: '#8B5CF6',
                    transition: { type: 'spring', stiffness: 250, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="flex items-center gap-x-8 mt-16"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.target}
                  rel={social.target === "_blank" ? "noopener noreferrer" : ""}
                  aria-label={social.label}
                  variants={socialIconItemVariants}
                  whileHover={{ scale: 1.15, color: social.hoverColor }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.Icon className="w-8 h-8" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Header);