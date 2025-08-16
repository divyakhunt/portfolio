import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <motion.footer
      className="bg-neutral-900 mt-20 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <motion.p
              className="text-sm text-neutral-400"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} {name}. All rights reserved.
            </motion.p>
            <motion.p
              className="text-xs text-neutral-500 mt-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* can be used later for more info */}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default React.memo(Footer);
