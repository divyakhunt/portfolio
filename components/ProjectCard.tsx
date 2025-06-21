import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ProjectItem } from '../types';
import { GitHubIcon, ExternalLinkIcon } from './IconComponents';
import { GetProjectVisual } from './ProjectVisuals';
import { FaTag } from 'react-icons/fa';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.05,
      duration: 0.25,
      ease: 'easeOut',
    },
  }),
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      whileHover={{
        scale: 1.01,
        y: -2,
        transition: { duration: 0.2 },
      }}
      role="article"
      aria-labelledby={`project-title-${project.title.replace(/\s+/g, '-')}`}
      className="w-full"
    >
      <div className="group w-full bg-neutral-800 rounded-xl border border-neutral-700 hover:border-primary/60 
                      shadow-md hover:shadow-2xl hover:shadow-primary/20 overflow-hidden 
                      flex flex-col md:flex-row transition-all duration-200 ease-out max-w-none">

        {/* Left Visual */}
        <div className="flex-shrink-0 w-full h-40 md:h-auto md:w-48 bg-neutral-700/40 group-hover:bg-neutral-600/50 
                        flex items-center justify-center md:self-stretch rounded-t-xl md:rounded-l-xl md:rounded-tr-none 
                        transition-colors duration-200 overflow-hidden">
          <GetProjectVisual
            imageIdentifier={project.imageIdentifier}
            title={project.title}
            iconClassName="w-16 h-16 md:w-20 md:h-20 text-accent-secondary group-hover:text-accent-light transform transition-transform duration-200 group-hover:scale-110"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col p-4 md:p-5 space-y-3 w-full">
          <h3
            id={`project-title-${project.title.replace(/\s+/g, '-')}`}
            className="text-xl font-semibold text-primary-light group-hover:text-accent-light transition-colors duration-150"
          >
            {project.title}
          </h3>

          <p className="text-neutral-300 text-xs md:text-sm leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div>
            <div className="flex items-center text-xs text-neutral-400 mb-1">
              <FaTag className="mr-2 text-neutral-500" />
              <span className="font-medium">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="bg-secondary/80 hover:bg-secondary text-white px-2 py-0.5 text-[11px] rounded-md shadow transition-all duration-150"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 5 && (
                <span className="bg-neutral-600 text-neutral-300 px-2 py-0.5 text-xs rounded-md shadow">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center flex-wrap gap-3 pt-2 border-t border-neutral-700/60 mt-auto">
            {project.repoUrl && (
              <motion.a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md 
                           bg-neutral-700 hover:bg-neutral-600 text-neutral-200 hover:text-white
                           transition duration-150 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`GitHub Repo: ${project.title}`}
              >
                <GitHubIcon className="w-4 h-4" /> GitHub
              </motion.a>
            )}
            {project.liveDemoUrl && (
              <motion.a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md
                           bg-accent-secondary/90 hover:bg-accent-secondary text-white 
                           transition duration-150 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Live Demo: ${project.title}`}
              >
                <ExternalLinkIcon className="w-4 h-4" /> Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
