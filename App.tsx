import React, { useState, useEffect, useRef, lazy, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import Header from './components/Header';
import { ResumeData } from './types';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];

const resumeData: ResumeData = {
  name: "DIVYA KHUNT",
  contact: {
    phone: "8320909334",
    email: "divyakhunt3325@gmail.com",
    linkedin: "https://www.linkedin.com/in/divya-khunt-142a61273/",
    github: "https://github.com/divyakhunt",
  },
  summary: "Machine Learning Engineer with strong foundations in deep learning, computer vision, NLP, and audio processing.",
  technicalSkills: [
    {
      category: "Languages",
      skills: ["Python", "Java", "HTML", "CSS", "JavaScript"]
    }
  ],
  education: [
    {
      institution: "SCET Surat",
      degree: "B.Tech in Computer Engineering",
      score: "CGPA: 9.35 / 10",
      dates: "Aug 2022 – May 2026",
      location: "Surat, Gujarat",
    }
  ],
  projects: [
    {
      title: "Speech Emotion Recognition",
      technologies: ["TensorFlow", "Keras", "Librosa", "CNN-BiLSTM"],
      description: [
        "Designed a CNN-BiLSTM model for speech emotion recognition using MFCC, Chroma, ZCR, and RMS features.",
        "Balanced class distribution with data augmentation and trained on RAVDESS, TESS, CREMA-D, and SAVEE datasets.",
        "Optimized with early stopping, ReduceLROnPlateau, and batch normalization to prevent overfitting."
      ],
      shortDescription: "CNN-BiLSTM model identifying emotions from speech using audio features. Trained on RAVDESS, TESS, CREMA-D & SAVEE datasets.",
      repoUrl: "https://github.com/divyakhunt/speech_emotion_recognition",
      categories: ['ML', 'Audio'],
      imageIdentifier: "speech_emotion",
    },
    {
      title: "Sign Language to Speech Translator",
      technologies: ["TensorFlow", "MediaPipe", "OpenCV", "pyttsx3"],
      description: [
        "Built a DNN system to recognize both-hand gestures using MediaPipe and convert them to speech via pyttsx3.",
        "Wrote modular scripts for data capture, model training, and OpenCV-based inference with sub-2s response.",
        "Enabled gesture updates via CSV and retraining; visualized training metrics for performance tracking."
      ],
      shortDescription: "DNN system recognizing hand gestures via MediaPipe and converting them to speech with pyttsx3.",
      repoUrl: "https://github.com/divyakhunt/sign_language_to_speech",
      categories: ['ML', 'Vision', 'Audio'],
      imageIdentifier: "sign_language",
    },
    {
      title: "Next Word Prediction Web App",
      technologies: ["TensorFlow", "Flask", "Bi-LSTM", "NLP"],
      description: [
        "Built a Flask app that predicts the next word in real-time using a Bi-LSTM model trained on Sherlock Holmes text.",
        "Processed and tokenized text data; trained the model for next-word prediction with smooth frontend integration.",
        "Enabled keyboard interaction for fast word insertion by pressing Tab; deployed the app live using Render.",
        "Optimized model and code for real-time inference with low latency."
      ],
      shortDescription: "Flask app predicting next words in real-time using a Bi-LSTM model. Trained on The Adventures of Sherlock Holmes. Deployed on Hugging Face.",
      repoUrl: "https://github.com/divyakhunt/next_word_pred-webapp",
      liveDemoUrl: "https://divyakhunt-next-word-predictor.hf.space/",
      categories: ['ML', 'Web', 'NLP'],
      imageIdentifier: "next_word",
    },
    {
      title: "Image Captioning",
      technologies: ["TensorFlow", "Keras", "OpenCV",  "DenseNet201", "LSTM"],
      description: [
        "Generated image descriptions using DenseNet201 as encoder and LSTM as decoder.",
        "Preprocessed captions, extracted features, and trained on Flickr8k with 5 captions per image.",
        "Built a custom data generator and used greedy search to generate coherent captions.",
        "Serialized features and tokenizer for efficient inference and deployment."
      ],
      shortDescription: "DenseNet201 + LSTM model generating descriptive captions for images from the Flickr8k dataset.",
      repoUrl: "https://github.com/divyakhunt/image-captioning",
      categories: ['ML', 'Vision', 'NLP'],
      imageIdentifier: "image_captioning",
    },
    {
      title: "Facial Emotion Recognition",
      technologies: ["TensorFlow", "Keras", "OpenCV", "ResNet50"],
      description: [
        "Built a facial emotion classifier using ResNet50 trained on the FER dataset.",
        "Converted grayscale to RGB, normalized inputs, and applied real-time augmentation.",
        "Added GAP, Dense, and Softmax layers for multi-class emotion prediction.",
        "Used early stopping; visualized confusion matrix and accuracy/loss plots."
      ],
      shortDescription: "ResNet50-based classifier for identifying facial emotions, trained on the FER dataset.",
      repoUrl: "https://github.com/divyakhunt/facial_emotion_recognition",
      categories: ['ML', 'Vision'],
      imageIdentifier: "facial_emotion",
    }
  ]
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement>(null);

  const nameParts = useMemo(() => resumeData.name.split(" "), [resumeData.name]);
  const heroTagline = "I’m a ML/DL Engineer turning complex data into intelligent, real-world systems.";

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const target = document.getElementById(sectionId);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.pushState(null, '', `#${sectionId}`);
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const debouncedUpdate = debounce((id: string) => {
      setActiveSection(id);
      history.pushState(null, '', `#${id}`);
    }, 100);
    
    const findMostVisibleSection = (entries: IntersectionObserverEntry[]) => {
      let maxVisibility = -1;
      let mostVisibleEntry: IntersectionObserverEntry | null = null;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
          maxVisibility = entry.intersectionRatio;
          mostVisibleEntry = entry;
        }
      });

      return mostVisibleEntry || entries.find(entry => entry.isIntersecting) || null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = findMostVisibleSection(entries);
        if (mostVisible) {
          debouncedUpdate(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const checkAndObserve = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };
    
    const timeout = setTimeout(checkAndObserve, 500);

    return () => {
      clearTimeout(timeout);
      debouncedUpdate.cancel(); 
      observer.disconnect();
    };
  }, []);

  // Scroll to section after refresh with hash
  useEffect(() => {
    const scrollToHashSection = () => {
      const sectionId = window.location.hash.substring(1);
      if (!sectionId) return;

      const interval = setInterval(() => {
        const target = document.getElementById(sectionId);
        const headerHeight = headerRef.current?.offsetHeight || 0;

        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: y, behavior: 'auto' });
          setActiveSection(sectionId);
          clearInterval(interval);
        }
      }, 50); // retry every 50ms

      setTimeout(() => clearInterval(interval), 2000); // stop after 2s max
    };

    if (window.location.hash) {
        // We delay this to ensure lazy-loaded components are mounted
        setTimeout(scrollToHashSection, 100);
    }
  }, []);


  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header
        headerRef={headerRef}
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavLinkClick={handleNavLinkClick}
        contactInfo={resumeData.contact}
      />

      <Suspense
        fallback={
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#1a1a40_0%,_#0e0e30_40%,_#000000_100%)] backdrop-blur-xl before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1%,_transparent_40%)] before:opacity-40 before:animate-pulse"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >

            <div className="flex flex-col items-center space-y-10">
              {/* Enhanced 3D-like glowing ring */}
              <div className="relative w-20 h-20">
                {/* Outer glowing pulse ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping" />

                {/* Rotating dual-border ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-400/70 border-t-transparent animate-spin [animation-duration:1.2s]" />

                {/* Inner glow center (glass effect) */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-300/20 backdrop-blur-md shadow-inner shadow-blue-500/20" />
              </div>

              {/* Pulse-glow animated text */}
              <motion.p
                className="text-xl font-light tracking-wide text-neutral-300 animate-pulse glow-text"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Crafting your experience...
              </motion.p>
            </div>
          </motion.div>
        }

>
        <section id="home">
          <Hero firstName={nameParts[0]} lastName={nameParts[1] || ""} tagline={heroTagline} onContactClick={handleNavLinkClick} />
        </section>
        
        {/* About section uses an inner wrapper div for its content, so it also needs the fix */}
        <section className="py-1">
          <div id="about" className="scroll-mt-24">
            <About
              name={resumeData.name}
              educationInstitution={resumeData.education[0].institution}
              summaryParagraphs={[
                `Hi, I'm <highlight>DIVYA KHUNT</highlight> — a passionate <highlight>Machine Learning Engineer</highlight> with strong foundations in <highlight>deep learning</highlight>, <highlight>computer vision</highlight>, <highlight>natural language processing</highlight>, and <highlight>audio signal processing</highlight>.`,
                `I specialize in building scalable, intelligent systems using <highlight>Python</highlight>, <highlight>TensorFlow</highlight>, and research-driven best practices. My work revolves around applying data-driven innovation to develop AI solutions that are not just technically sound but also <highlight>ethical</highlight> and <highlight>impactful</highlight>.`,
                `I'm deeply curious, highly collaborative, and thrive in dynamic learning environments. Whether it's building real-time <highlight>emotion recognition systems</highlight> or designing intelligent models for <highlight>accessibility</highlight>, I strive to contribute to projects that drive meaningful change through <highlight>AI</highlight>.`
              ]}
              onContactClick={handleNavLinkClick}
            />
          </div>
        </section>

        <section className="py-12">
          <div id="skills" className="scroll-mt-24">
            <Skills />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div id="projects" className="scroll-mt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <Projects projectItems={resumeData.projects} />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div id="contact" className="scroll-mt-24">
            <Contact contactInfo={resumeData.contact} />
          </div>
        </section>
      </Suspense>

      <motion.footer
        className="text-center py-10 text-neutral-400 text-sm bg-neutral-800 border-t border-neutral-700 mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <p>© {new Date().getFullYear()} {resumeData.name}. All rights reserved.</p>
        <p className="mt-1">Crafted with React, Tailwind CSS & Framer Motion.</p>
      </motion.footer>
    </div>
  );
};

export default App;