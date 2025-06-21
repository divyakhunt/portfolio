import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCategory } from '../types';

interface FilterControlsProps {
  categories: ProjectCategory[];
  activeCategory: ProjectCategory | 'All';
  onFilterChange: (category: ProjectCategory | 'All') => void;
}

const filterButtonVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -2,
    transition: { duration: 0.15 }
  },
  tap: { scale: 0.95 },
};

const FilterControls: React.FC<FilterControlsProps> = ({ categories, activeCategory, onFilterChange }) => {
  const displayCategories: (ProjectCategory | 'All')[] = ['All', ...categories];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12"
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.07 } } }}
      aria-label="Filter projects by category"
    >
      {displayCategories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <motion.button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-150 ease-out shadow-md
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${isActive 
                ? 'bg-indigo-600 text-white ring-indigo-400'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-white ring-neutral-600'
              }`}
            variants={filterButtonVariants}
            whileHover={!isActive ? 'hover' : undefined}
            whileTap="tap"
            aria-pressed={isActive}
          >
            {category === 'ML' ? 'Machine Learning' : category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default React.memo(FilterControls);
