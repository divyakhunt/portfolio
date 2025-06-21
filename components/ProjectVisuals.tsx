import React from 'react';
import { FaWaveSquare, FaHandPaper, FaKeyboard, FaImage, FaProjectDiagram, FaBrain, FaEye } from 'react-icons/fa';
import { RiRobot2Line } from "react-icons/ri";


interface ProjectVisualProps {
  imageIdentifier?: string;
  title: string;
  iconClassName?: string; // ClassName for the icon element itself
}

const DefaultVisual: React.FC<{iconClassName?: string}> = ({ iconClassName = "w-20 h-20 text-neutral-500" }) => (
  <FaProjectDiagram className={iconClassName} />
);

export const GetProjectVisual: React.FC<ProjectVisualProps> = ({ imageIdentifier, title, iconClassName = "w-20 h-20 text-accent-secondary" }) => {
  // Basic fallback based on keywords if no specific identifier
  const lowerTitle = title.toLowerCase();
  let identifiedKey = imageIdentifier;

  if (!identifiedKey) {
    if (lowerTitle.includes("speech") || lowerTitle.includes("audio") || lowerTitle.includes("emotion recognition")) identifiedKey = "speech_emotion";
    else if (lowerTitle.includes("sign language") || lowerTitle.includes("gesture")) identifiedKey = "sign_language";
    else if (lowerTitle.includes("word prediction") || lowerTitle.includes("text")) identifiedKey = "next_word";
    else if (lowerTitle.includes("image captioning") || lowerTitle.includes("image")) identifiedKey = "image_captioning";
    else if (lowerTitle.includes("facial") || lowerTitle.includes("face")) identifiedKey = "facial_emotion";
    else if (lowerTitle.includes("ml") || lowerTitle.includes("machine learning")) identifiedKey = "ml_general";
    else if (lowerTitle.includes("vision") || lowerTitle.includes("computer vision")) identifiedKey = "vision_general";
  }

  // The component now returns the icon directly. The container is handled by ProjectCard.
  switch (identifiedKey) {
    case "speech_emotion":
      return <FaWaveSquare className={iconClassName} aria-label={`Visual for ${title}: Speech/Audio`} />;
    case "sign_language":
      return <FaHandPaper className={iconClassName} aria-label={`Visual for ${title}: Sign Language/Gesture`} />;
    case "next_word":
      return <FaKeyboard className={iconClassName} aria-label={`Visual for ${title}: Text/Word Prediction`} />;
    case "image_captioning":
      return <FaImage className={iconClassName} aria-label={`Visual for ${title}: Image Processing`} />;
    case "facial_emotion":
      return <RiRobot2Line className={iconClassName} aria-label={`Visual for ${title}: Facial Recognition/AI Face`} />;
    case "ml_general":
      return <FaBrain className={iconClassName} aria-label={`Visual for ${title}: Machine Learning`} />;
    case "vision_general":
      return <FaEye className={iconClassName} aria-label={`Visual for ${title}: Computer Vision`} />;
    default:
      return <DefaultVisual iconClassName={iconClassName} />;
  }
};