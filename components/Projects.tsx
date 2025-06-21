import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProjectItem, ProjectCategory } from '../types';
import ProjectCard from './ProjectCard';
import FilterControls from './FilterControls';
import { FaLightbulb } from 'react-icons/fa';

interface ProjectsProps {
  projectItems: ProjectItem[];
}

const uniqueCategories = (projects: ProjectItem[]): ProjectCategory[] => {
  const allCategories = projects.flatMap(p => p.categories);
  const primaryCategories: ProjectCategory[] = ['ML', 'Vision', 'NLP', 'Audio', 'Web'];
  const presentCategories = Array.from(
    new Set(allCategories.filter(cat => primaryCategories.includes(cat) || cat === 'NLP'))
  );

  return presentCategories.sort((a, b) => {
    const indexA = primaryCategories.includes(a) ? primaryCategories.indexOf(a) : primaryCategories.length;
    const indexB = primaryCategories.includes(b) ? primaryCategories.indexOf(b) : primaryCategories.length;
    return indexA - indexB;
  });
};

const ProjectsComponent: React.FC<ProjectsProps> = ({ projectItems }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All');

  const availableCategories = useMemo(() => uniqueCategories(projectItems), [projectItems]);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'All'
      ? projectItems
      : projectItems.filter(project => project.categories.includes(activeFilter));
  }, [projectItems, activeFilter]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="projects-main-title">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      > 
        <h2
          id="projects-main-title"
          className="text-4xl sm:text-5xl font-extrabold text-neutral-100 mb-3 flex items-center justify-center gap-x-2"
        > 
          <FaLightbulb className="text-accent-default w-7 h-7 sm:w-9 sm:h-9" />
          <span>My Projects</span>
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
          A selection of my work, from ML models to web apps. Explore what I've built.
        </p>
      </motion.div>

      <FilterControls
        categories={availableCategories}
        activeCategory={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredProjects.length > 0 ? (
        <motion.div
          className="flex flex-col gap-6 md:gap-6 lg:gap-6"
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
            hidden: {},
          }} 
          aria-live="polite"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title + index} project={project} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        > 
          <p className="text-lg text-neutral-400">No projects found for the selected filter.</p>
          <p className="text-neutral-500 mt-1">Try selecting a different category or 'All'.</p>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(ProjectsComponent);
