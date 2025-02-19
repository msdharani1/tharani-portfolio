// Install react-icons before using
// npm install react-icons

import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaMobile, 
  FaBootstrap, 
  FaFireAlt 
} from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';

export const getLanguageIcon = (language) => {
  switch (language) {
    case 'html': return FaHtml5;
    case 'css': return FaCss3Alt;
    case 'js': return FaJs;
    case 'react': return FaReact;
    case 'reactNative': return FaMobile;
    case 'bootstrap': return FaBootstrap;
    case 'tailwindCss': return SiTailwindcss;
    case 'firebase': return FaFireAlt;
    case 'nextjs' : return FaReact;
    default: return null;
  }
};
