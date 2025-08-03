import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ContactInfo } from '../types';
import { EmailIcon, LinkedInIcon, GitHubIcon, ExternalLinkIcon } from './IconComponents';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from 'emailjs-com';

interface ContactProps {
  contactInfo: ContactInfo;
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const rightColumnVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const formItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const buttonContentVariants: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 200 } },
  exit: { opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.15, ease: 'easeIn' } },
};

const shakeVariants: Variants = {
  shake: {
    transform: [
      'translateX(0px)', 'translateX(-6px)', 'translateX(6px)',
      'translateX(-4px)', 'translateX(4px)', 'translateX(0px)',
    ],
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  rest: { transform: 'translateX(0px)' }
};

const ContactComponent: React.FC<ContactProps> = ({ contactInfo }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'success' | 'error' | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const socialLinks = [
    { name: 'GitHub', Icon: GitHubIcon, href: contactInfo.github, hoverColor: '#6e5494' },
    { name: 'LinkedIn', Icon: LinkedInIcon, href: contactInfo.linkedin, hoverColor: '#0A66C2' },
    { name: 'Email', Icon: EmailIcon, href: `mailto:${contactInfo.email}`, hoverColor: '#EA4335' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
     if(sendStatus === 'error') {
      setSendStatus(null);
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email.';
    }
    if (!formData.message.trim()) errors.message = 'Message is required.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending || sendStatus === 'success') return;
    if (!validateForm()) return;

    setIsSending(true);
    setSendStatus(null);
    setFormErrors({});

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS environment variables not set.");
      setSendStatus('error');
      setFormErrors({ general: 'Email service is not configured.' });
      setIsSending(false);
      setTimeout(() => setSendStatus(null), 5000);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSendStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send email:', err);
      setSendStatus('error');
      setFormErrors({ general: 'Failed to send. Please try again.' });
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setSendStatus(null);
      }, 5000);
    }
  };
  
  const getButtonState = () => {
    if (isSending) return 'sending';
    if (sendStatus === 'success') return 'success';
    if (sendStatus === 'error') return 'error';
    return 'idle';
  };
  
  const buttonState = getButtonState();

  const buttonClass = {
    idle: 'bg-primary hover:bg-primary-dark shadow-lg hover:shadow-primary/40',
    sending: 'bg-primary/70 cursor-wait',
    success: 'bg-secondary/90',
    error: 'bg-accent-dark',
  }[buttonState];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 relative">
       <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px] opacity-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
       </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Left Column: Info for Desktop, Title for Mobile */}
        <motion.div variants={leftColumnVariants} className="flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight">
                Get in Touch
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-300 leading-relaxed mx-auto lg:mx-0">
                I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out. I'll do my best to get back to you!
            </p>

            {/* Desktop-only detailed social links */}
            <div className="mt-10 space-y-6 hidden lg:block">

                {/* GitHub */}
                <motion.a
                  href={contactInfo.github} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1, ease: 'easeOut' } }}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-transparent transition-colors duration-200 ease-out hover:border-[#6e5494] hover:bg-neutral-800/60 hover:shadow-[#6e5494]/20"
                >
                    <div className="flex-shrink-0 bg-neutral-700/80 group-hover:bg-[#6e5494]/20 p-3 rounded-lg transition-colors duration-300">
                        <GitHubIcon className="w-6 h-6 text-neutral-300 transition-colors duration-300 group-hover:text-[#6e5494]" />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-neutral-100 text-lg">GitHub</p>
                        <p className="text-neutral-400 group-hover:text-neutral-200 transition-colors">divyakhunt</p>
                    </div>
                    <ExternalLinkIcon className="w-5 h-5 text-neutral-500 group-hover:text-[#6e5494] transition-colors ml-auto flex-shrink-0" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1, ease: 'easeOut' } }}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-transparent transition-colors duration-200 ease-out hover:border-[#0A66C2] hover:bg-neutral-800/60 hover:shadow-[#0A66C2]/20"
                >
                    <div className="flex-shrink-0 bg-neutral-700/80 group-hover:bg-[#0A66C2]/20 p-3 rounded-lg transition-colors duration-300">
                        <LinkedInIcon className="w-6 h-6 text-neutral-300 transition-colors duration-300 group-hover:text-[#0A66C2]" />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-neutral-100 text-lg">LinkedIn</p>
                        <p className="text-neutral-400 group-hover:text-neutral-200 transition-colors">divya-khunt-142a61273</p>
                    </div>
                    <ExternalLinkIcon className="w-5 h-5 text-neutral-500 group-hover:text-[#0A66C2] transition-colors ml-auto flex-shrink-0" />
                </motion.a>

                {/* Email */}
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1, ease: 'easeOut' } }}
                  className="group flex items-center gap-4 p-4 rounded-lg border border-transparent transition-colors duration-200 ease-out hover:border-[#EA4335] hover:bg-neutral-800/60 hover:shadow-[#EA4335]/20"
                >
                    <div className="flex-shrink-0 bg-neutral-700/80 group-hover:bg-[#EA4335]/20 p-3 rounded-lg transition-colors duration-300">
                        <EmailIcon className="w-6 h-6 text-neutral-300 transition-colors duration-300 group-hover:text-[#EA4335]" />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-neutral-100 text-lg">Email</p>
                        <p className="text-neutral-400 group-hover:text-neutral-200 transition-colors">{contactInfo.email}</p>
                    </div>
                    <ExternalLinkIcon className="w-5 h-5 text-neutral-500 group-hover:text-[#EA4335] transition-colors ml-auto flex-shrink-0" />
                </motion.a>        
            </div>
        </motion.div>

        {/* Right Column: Form and Mobile Socials */}
        <div className="flex flex-col">
            <motion.div 
                variants={rightColumnVariants}
                className="w-full bg-neutral-900/50 backdrop-blur-sm border border-neutral-700/60 rounded-2xl shadow-2xl shadow-primary-darker/10 p-6 sm:p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <motion.h3 variants={formItemVariants} className="text-2xl font-semibold mb-6 text-primary-light text-center lg:text-left">Send a Message</motion.h3>
                    {['name', 'email'].map((field) => (
                    <motion.div key={field} variants={formItemVariants}>
                        <div className="relative">
                        <input
                            name={field} id={`contact-${field}`} type={field === 'email' ? 'email' : 'text'}
                            value={(formData as any)[field]} onChange={handleChange} placeholder=" "
                            className={`peer w-full px-4 pt-6 pb-2 bg-neutral-800 border-2 rounded-lg text-neutral-100 placeholder-transparent transition-colors
                            ${formErrors[field] ? 'border-accent-dark' : 'border-neutral-700'}
                            focus:outline-none focus:ring-0 focus:border-primary
                            `}
                            aria-invalid={!!formErrors[field]} aria-describedby={`${field}-error`}
                        />
                        <label htmlFor={`contact-${field}`} className="absolute text-sm text-neutral-400 duration-150 transform -translate-y-3 scale-75 top-4 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3 capitalize">
                            Your {field}
                        </label>
                        </div>
                        <AnimatePresence>
                        {formErrors[field] && (
                            <motion.p id={`${field}-error`} className="mt-1 text-xs text-accent-light" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {formErrors[field]}
                            </motion.p>
                        )}
                        </AnimatePresence>
                    </motion.div>
                    ))}
                    <motion.div variants={formItemVariants}>
                        <div className="relative">
                            <textarea
                            name="message" id="contact-message" rows={5} value={formData.message} onChange={handleChange} placeholder=" "
                            className={`peer w-full px-4 pt-6 pb-2 bg-neutral-800 border-2 rounded-lg text-neutral-100 placeholder-transparent transition-colors resize-none
                                ${formErrors.message ? 'border-accent-dark' : 'border-neutral-700'}
                                focus:outline-none focus:ring-0 focus:border-primary
                            `}
                            aria-invalid={!!formErrors.message} aria-describedby="message-error"
                            ></textarea>
                            <label htmlFor="contact-message" className="absolute text-sm text-neutral-400 duration-150 transform -translate-y-3 scale-75 top-4 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3 capitalize">
                            Your Message
                            </label>
                        </div>
                        <AnimatePresence>
                            {formErrors.message && (
                            <motion.p id="message-error" className="mt-1 text-xs text-accent-light" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                {formErrors.message}
                            </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <motion.div variants={formItemVariants} className="pt-2">
                        <motion.button
                            type="submit"
                            disabled={isSending || sendStatus === 'success'}
                            className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 text-white font-semibold rounded-lg text-base transition-all duration-300 ease-out transform disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden ${buttonClass}`}
                            whileHover={buttonState === 'idle' ? { scale: 1.03, y: -2 } : {}}
                            whileTap={buttonState === 'idle' ? { scale: 0.98 } : {}}
                            variants={shakeVariants}
                            animate={buttonState === 'error' ? 'shake' : 'rest'}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                {buttonState === 'idle' && ( <motion.span key="idle" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit" className="flex items-center gap-2.5"><FaPaperPlane className="w-5 h-5" /> Send Message</motion.span> )}
                                {buttonState === 'sending' && ( <motion.span key="sending" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit" className="flex items-center gap-2.5"><FaSpinner className="animate-spin w-5 h-5" /> Sending...</motion.span> )}
                                {buttonState === 'success' && ( <motion.span key="success" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit" className="flex items-center gap-2.5"><FaCheckCircle className="w-5 h-5" /> Message Sent!</motion.span> )}
                                {buttonState === 'error' && ( <motion.span key="error" variants={buttonContentVariants} initial="initial" animate="animate" exit="exit" className="flex items-center gap-2.5"><FaExclamationCircle className="w-5 h-5" /> {formErrors.general || 'Try Again'}</motion.span> )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>

            {/* Mobile-only social icons */}
            <div className="lg:hidden mt-5 text-center">
              <motion.div 
                className="flex items-center gap-x-4 my-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <hr className="flex-1 border-neutral-700/70" />
                <span className="text-sm text-neutral-400 shrink-0">or connect with me directly</span>
                <hr className="flex-1 border-neutral-700/70" />
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-x-6 sm:gap-x-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.name === 'Email' ? '_self' : '_blank'}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : ''}
                    aria-label={`My ${social.name}`}
                    className="group relative w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center border-2 border-neutral-700 transition-all duration-200 ease-out"
                    whileHover={{
                      borderColor: social.hoverColor,
                      y: -4,
                      scale: 1.1,
                      boxShadow: `0 8px 20px ${social.hoverColor}20`
                    }}
                    whileTap={{ scale: 0.90 }}
                    transition={{ duration: 0.001, ease: 'linear' }} 
                    variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
                  >
                    <social.Icon
                      className={`
                        w-8 h-8 text-neutral-300 transition-colors duration-300
                        ${social.name === 'GitHub' ? 'group-hover:text-[#6e5494]' : ''}
                        ${social.name === 'LinkedIn' ? 'group-hover:text-[#0A66C2]' : ''}
                        ${social.name === 'Email' ? 'group-hover:text-[#EA4335]' : ''}
                      `}
                    />

                     {/* The icon itself won't animate color this way, but the border will. For icons, group-hover is needed which is not simple with Framer's style prop. This is a good visual compromise. */}
                  </motion.a>
                ))}
              </motion.div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(ContactComponent);