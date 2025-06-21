import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { ContactInfo } from '../types'; // Assuming ContactInfo is in types.ts

interface HeaderProps {
  isScrolled: boolean;
  activeSection: string;
  onNavLinkClick: (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  headerRef: React.RefObject<HTMLElement>;
  contactInfo: ContactInfo; // Added contactInfo prop
}

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.04, duration: 0.3, ease: "easeOut" } // Increased delay and duration
  })
};

const socialIconContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Slower stagger
      delayChildren: 0.1, // Increased delay after nav links
    }
  }
};

const socialIconItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" } // Increased duration
  }
};

const Header: React.FC<HeaderProps> = ({ isScrolled, activeSection, onNavLinkClick, headerRef, contactInfo }) => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    // { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: contactInfo.github, label: "GitHub", Icon: FaGithub, target: "_blank" },
    { href: contactInfo.linkedin, label: "LinkedIn", Icon: FaLinkedin, target: "_blank" },
    { href: `mailto:${contactInfo.email}`, label: "Email", Icon: FaEnvelope, target: "_self" },
  ];

  return (
    <motion.header
      ref={headerRef}
      id="home-header" // Changed id to avoid conflict with #home section if not intended for section marker
      className={`fixed top-0 left-0 right-0 z-50 text-neutral-100 will-change-transform will-change-opacity transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-neutral-800/90 shadow-xl backdrop-blur-md py-3 sm:py-4'
          : 'bg-transparent shadow-none py-4 sm:py-5'
      }`}

      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }} // Increased duration and delay
    >
      <div className="container mx-auto flex items-center justify-between px-4 w-full">
        {/* Left spacer for medium screens and up to help center nav */}
        <div className="flex-1 hidden md:flex"></div>

        {/* Navigation Links (Main) */}
        <motion.nav
          className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 lg:gap-x-6 gap-y-2"
          initial="hidden"
          animate="visible"
          variants={{ visible: {transition: {staggerChildren: 0.06}}}} // Slower stagger
          style={{ willChange: 'transform, opacity' }}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => onNavLinkClick(e, link.id)}
              className={`px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-150 ease-out
                ${activeSection === link.id 
                  ? 'text-accent-default scale-105' // Active link already scaled
                  : 'text-neutral-300 hover:text-white'
                }`}
              custom={index}
              variants={navItemVariants}
              whileHover={{ 
                y: -2, 
                scale: activeSection === link.id ? 1.05 : 1.1, // Slightly larger hover scale for non-active
                color: activeSection === link.id ? '#EC4899' : '#F472B6', 
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.nav>

        {/* Social Media Icons Container (Right side) */}
        <motion.div 
          className="flex-1 flex justify-end items-center"
          variants={socialIconContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex items-center gap-x-3 sm:gap-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.target}
                rel={social.target === "_blank" ? "noopener noreferrer" : ""}
                aria-label={social.label}
                className="text-neutral-300 hover:text-accent-light transition-colors duration-150"
                variants={socialIconItemVariants}
                whileHover={{ y: -2, scale: 1.1, color: '#F472B6', transition: { duration: 0.1 } }} // Scale to 1.1 for icons, faster transition
                whileTap={{ scale: 0.9 }}
                data-interactive="true"
              >
                <social.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default React.memo(Header);