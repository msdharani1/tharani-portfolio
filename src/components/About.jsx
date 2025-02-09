import React, { forwardRef } from 'react';
import { 
  Code2, 
  Terminal, 
  Globe, 
  Settings, 
  Server,
  GraduationCap,
  ExternalLink,
  Briefcase
} from 'lucide-react';

// Existing SkillCard component remains the same...
const SkillCard = ({ icon: Icon, title, skills }) => (
  <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-cyan-500/50 shadow-lg">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span 
          key={index}
          className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 border border-white/10"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const EducationCard = ({ degree, year, college, link }) => (
  <div className="relative pl-4 pb-8 last:pb-0">
    <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-transparent" />
    <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-cyan-500" />
    <div className="group">
      <h4 className="text-lg font-semibold text-white mb-1">{degree}</h4>
      <p className="text-gray-400 mb-1">{year}</p>
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        {college}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
);

// Updated ExperienceCard component with company link
const ExperienceCard = ({ role, company, companyLink, period, location, description }) => (
  <div className="relative pl-4 pb-8 last:pb-0">
    <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-transparent" />
    <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-cyan-500" />
    <div className="group">
      <h4 className="text-lg font-semibold text-white mb-1">{role}</h4>
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <a 
          href={companyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {company}
          <ExternalLink className="w-4 h-4" />
        </a>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400">{period}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400">{location}</span>
      </div>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

const About = forwardRef(({ scrollPosition }, ref) => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Electron.js"]
    },
    {
      icon: Settings,
      title: "Frameworks & Libraries",
      skills: ["Tailwind CSS", "Firebase", "Material UI", "Redux"]
    },
    {
      icon: Terminal,
      title: "Programming & Systems",
      skills: ["C, Python", "Linux Commands", "Git", "Version Control"]
    },
    {
      icon: Globe,
      title: "Web Infrastructure",
      skills: ["Domain Management", "DNS Configuration", "Web Hosting"]
    },
    {
      icon: Server,
      title: "Cloud & DevOps",
      skills: ["Google Search Console", "Cloudinary", "Cloud Hosting (cPanel, Vercel, Netlify)"]
    }
  ];

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      year: "Currently Enrolled",
      college: "Rathinam College",
      link: "https://rathinamtechnicalcampus.com/"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      year: "Graduated 2024",
      college: "SKC",
      link: "https://kaliswaricollege.edu.in/"
    }
  ];

  const experience = [
    {
      role: "Freelancing Front-End Developer",
      company: "Nextriad Solutions",
      companyLink: "https://www.nextriadsolutions.com",
      period: "08/2024 – present",
      location: "Coimbatore, India",
      description: "Leading front-end development for desktop and web applications using React.js and Electron.js. Delivered Crackers Shop Management System and Tube Work Management Software with focus on responsive design and performance optimization."
    },
    {
      role: "Freelancing Front-End Developer",
      company: "Slice Carving Technologies",
      companyLink: "https://www.slicecarving.com",
      period: "05/2024 – 07/2024",
      location: "Srivilliputtur, India",
      description: "Developed responsive web solutions using modern technologies. Successfully delivered Matrimony site, Influencer Profile Management system, and dashboard applications with emphasis on user experience."
    }
  ];

  const opacity = Math.max(0, Math.min((scrollPosition - window.innerHeight / 2) / 300, 1));
  const translateY = Math.max(0, 100 - scrollPosition / 5);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-20 px-4 md:px-8 overflow-hidden"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.5s ease, transform 0.5s ease'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="inline-block text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-6">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I am a passionate front-end developer with expertise in creating engaging web experiences. 
            My unique background in both development and music allows me to bring creativity and 
            technical precision to every project.
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Professional Experience</h3>
          </div>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <ExperienceCard 
                key={index}
                role={exp.role}
                company={exp.company}
                companyLink={exp.companyLink}
                period={exp.period}
                location={exp.location}
                description={exp.description}
              />
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillCategories.map((category, index) => (
            <SkillCard 
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Education</h3>
          </div>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <EducationCard 
                key={index}
                degree={edu.degree}
                year={edu.year}
                college={edu.college}
                link={edu.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;