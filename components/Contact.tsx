import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import emailjs from 'emailjs-com';
import { ContactInfo } from '../types';
import { SectionTitle, EmailIcon, LinkedInIcon, GitHubIcon, ExternalLinkIcon } from './IconComponents';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface ContactProps {
  contactInfo: ContactInfo;
}

const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const feedbackMessageVariants: Variants = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    scale: 1,
    marginTop: '1rem',
    transition: { type: 'spring', damping: 12, stiffness: 120 },
  },
  exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const contactIconItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const ContactComponent: React.FC<ContactProps> = ({ contactInfo }) => {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setSendStatus('error');
      return;
    }
    setIsSending(true);
    setSendStatus(null);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSendStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setSendStatus('error');
        setErrorMessage('Failed to send message. Please try again later.');
      })
      .finally(() => setIsSending(false));
  };

  const directContactItems = [
    {
      Icon: EmailIcon,
      text: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      label: 'Direct Email',
    },
    {
      Icon: LinkedInIcon,
      text: contactInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: contactInfo.linkedin,
      label: 'LinkedIn',
      external: true,
    },
    {
      Icon: GitHubIcon,
      text: contactInfo.github.replace(/^https?:\/\/(www\.)?/, ''),
      href: contactInfo.github,
      label: 'GitHub',
      external: true,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 md:px-8 bg-white/5 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.25)] rounded-xl border border-white/10">
      <SectionTitle>Get in Touch</SectionTitle>
      <motion.p
        className="text-center text-neutral-300 mb-8 text-lg"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Have a question, a project idea, or just want to connect? Send me a message below or reach out through my socials.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {['name', 'email', 'message'].map((field, idx) => (
          <motion.div variants={formItemVariants} key={field}>
            <div className="relative">
              {field !== 'message' ? (
                <input
                  name={field}
                  id={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2.5 bg-neutral-700/60 border border-neutral-600 rounded-lg text-neutral-100 placeholder-transparent focus:ring-2 focus:ring-primary focus:shadow-[0_0_8px_2px_rgba(34,211,238,0.3)]"
                />
              ) : (
                <textarea
                  name={field}
                  id={field}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2.5 bg-neutral-700/60 border border-neutral-600 rounded-lg text-neutral-100 placeholder-transparent focus:ring-2 focus:ring-primary focus:shadow-[0_0_8px_2px_rgba(34,211,238,0.3)] resize-none"
                ></textarea>
              )}
              <label
                htmlFor={field}
                className="absolute text-sm text-neutral-400 duration-150 transform -translate-y-3 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3 capitalize"
              >
                {field}
              </label>
            </div>
          </motion.div>
        ))}

        <motion.button
          type="submit"
          disabled={isSending}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg text-base shadow-md hover:shadow-primary/40 transition-all duration-150 ease-out transform disabled:opacity-70 disabled:cursor-not-allowed"
          variants={formItemVariants}
          whileHover={!isSending ? { scale: 1.05, y: -2 } : {}}
          whileTap={!isSending ? { scale: 0.98 } : {}}
        >
          {isSending ? (
            <>
              <FaSpinner className="animate-spin w-5 h-5" /> Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="w-5 h-5" /> Send Message
            </>
          )}
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {sendStatus && (
          <motion.div
            variants={feedbackMessageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`mt-4 p-4 rounded-lg text-sm flex items-center gap-3 ${
              sendStatus === 'success'
                ? 'bg-secondary/20 text-secondary-light border border-secondary/50'
                : 'bg-accent/20 text-accent-light border border-accent/50'
            }`}
            role="alert"
          >
            {sendStatus === 'success' ? (
              <FaCheckCircle className="w-5 h-5" />
            ) : (
              <FaExclamationCircle className="w-5 h-5" />
            )}
            <span>
              {sendStatus === 'success'
                ? "Message sent successfully! I'll get back to you soon."
                : errorMessage || 'Oops! Something went wrong. Please try again.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 pt-6 border-t border-neutral-700/70">
        <p className="text-center text-neutral-400 mb-6 text-base">
          Or, connect with me directly:
        </p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {directContactItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : ''}
              className="group flex flex-col items-center text-neutral-300 hover:text-accent-light transition-all duration-150 ease-out p-3 rounded-lg hover:bg-neutral-700/50 w-full sm:w-auto min-w-[160px] relative"
              custom={index}
              variants={contactIconItemVariants}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Contact via ${item.label}`}
            >
              <item.Icon className="w-8 h-8 mb-2 text-accent-secondary group-hover:text-accent-light transition-colors duration-150" />
              <span className="text-xs font-medium">{item.label}</span>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors duration-150 truncate max-w-[140px]">
                {item.text}
              </span>
              {item.external && (
                <ExternalLinkIcon className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-80 absolute top-2 right-2" />
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(ContactComponent);
