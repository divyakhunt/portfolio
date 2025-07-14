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

const buttonVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -1, transition: { duration: 0.05 } },
  tap: { scale: 0.95, y: 1, transition: { duration: 0.08 } },
};

const iconVariants: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: -20,
    scale: 1.25,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 6,
      mass: 0.6,
      duration: 0.2 
    }
  },
};

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
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md 
                          bg-neutral-700 hover:bg-neutral-600 text-neutral-200 hover:text-white
                          transition duration-150 shadow-sm hover:shadow-md"
                aria-label={`GitHub Repo: ${project.title}`}
              >
                <motion.span
                  variants={iconVariants}
                  className="flex items-center justify-center"
                >
                  <GitHubIcon className="w-4 h-4 text-neutral-300" />
                </motion.span>

                GitHub
              </motion.a>
            )}
            {project.liveDemoUrl && (
              <motion.a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium
                          text-neutral-200 bg-[#111827] border border-[#3d3d3d] overflow-hidden
                          rounded-md transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.06, 
                  y: -1, 
                  transition: { duration: 0.08, ease: 'easeOut' } 
                }}

                whileTap={{
                  scale: 0.95,
                  y: 1,
                  transition: { duration: 0.05, ease: 'linear' }
                }}

              >
                {/* Sliding background layer */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#d4d4d4] to-[#e2e8f0]
                 translate-x-full group-hover:translate-x-0 transition-transform duration-300
                 z-0" />
                <ExternalLinkIcon className="w-4 h-4 text-neutral-200 z-10 group-hover:text-[#1f2937]" />
                <span className="z-10 group-hover:text-[#1f2937]">Live WebApp</span>
              </motion.a>

            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
