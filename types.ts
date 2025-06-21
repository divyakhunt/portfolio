

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  score: string;
  dates: string;
  location: string;
}

export type ProjectCategory = 'ML' | 'Web' | 'Audio' | 'Vision' | 'NLP' | 'Other';

export interface ProjectItem {
  title: string;
  technologies: string[];
  description: string[]; // Full description for modal/details page later
  shortDescription: string; // For the project card
  repoUrl?: string;
  liveDemoUrl?: string; // Optional link to live demo
  categories: ProjectCategory[]; // For filtering
  imageIdentifier?: string; // Hint for selecting a visual/image
}

export interface ResumeData {
  name: string;
  contact: ContactInfo;
  summary: string;
  technicalSkills: SkillCategory[];
  education: EducationItem[];
  projects: ProjectItem[];
}

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
};
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#cdd6f4',
        },
        accent: {
          light: '#a6e3a1',
          secondary: '#89dceb',
        },
        secondary: '#45475a',
      },
    },
  },
};



