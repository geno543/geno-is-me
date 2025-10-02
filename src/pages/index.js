import React, { useContext } from 'react';
import Head from 'next/head';
import { Box, Typography, Container } from '@mui/material';
import {
  Code as CodeIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { ThemeContext } from './_app';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import PageTransition from '../components/PageTransition';

export default function Home() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <PageTransition>
      <Head>
        <title>Geno's Portfolio - AI Developer & Algorithm Enthusiast</title>
        <meta name="description" content="Welcome to Geno&apos;s portfolio - Building tomorrow&apos;s AI, one algorithm at a time. Explore innovative projects and cutting-edge solutions." />
        <meta name="keywords" content="AI, Machine Learning, Algorithms, Portfolio, Developer, Geno" />
        <meta name="author" content="Geno" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header 
        name="<Geno />"
        navItems={['About', 'Projects', 'Activities & Honors', 'Contact']}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <Hero 
        name="Mohamed^2 Ramadan"
      tagline="Hey! I'm Mohamed^2 Ramadan, an 18-year-old who fell in love with code at an internet café and now builds AI solutions that actually help people. From malaria detection to hackathon organizing — I'm here to make tech more human."
        ctaButtons={[
          { text: 'View Projects', href: '/projects', variant: 'contained' },
          { text: 'Download Resume', href: '/resume.pdf', variant: 'outlined' },
          { text: 'Get In Touch', href: '/contact', variant: 'text' }
        ]}
        avatar="/hero-avatar.svg"
        backgroundImage="/hero-bg.svg"
      />

      <Container maxWidth="lg" id="main-content">
        <About 
          bio="That bright screen at the internet café when I was little? It started everything. Four years without a laptop didn't stop me from learning Python on my phone. Now at Egypt's STEM High School, I've built 40+ projects and lead 300+ students in our CS club. Currently exploring LLMs and dreaming of AGI breakthroughs."
          achievements={[
            { icon: <CodeIcon />, title: "40+ Projects Built", description: "From mobile apps to AI models" },
            { icon: <GroupIcon />, title: "300+ Students Led", description: "CS Club Leadership" },
            { icon: <SchoolIcon />, title: "STEM High School", description: "Egypt's Premier Institution" },
            { icon: <PsychologyIcon />, title: "AI Research", description: "LLMs & AGI Exploration" }
          ]}
          interests={['AI', 'Robotics', 'Teaching', 'Python', 'Machine Learning', 'Computer Vision']}
          timeline={[
            { year: "Early Years", title: "Internet Café Discovery", description: "First encounter with programming sparked a lifelong passion" },
            { year: "Learning Phase", title: "Mobile Python Learning", description: "4 years of dedicated phone-based coding and learning" },
            { year: "Present", title: "STEM Leadership", description: "Leading CS club and building innovative projects" },
            { year: "Future", title: "AGI Dreams", description: "Exploring the frontiers of artificial intelligence" }
          ]}
        />

        <Skills 
          skills={[
            // AI/ML Skills
            { name: "Python", level: 5, category: "AI/ML", projects: ["Malaria Detection AI", "LLM Fine-tuning", "Computer Vision Models"] },
            { name: "TensorFlow", level: 4, category: "AI/ML", projects: ["Neural Network Training", "Image Classification"] },
            { name: "PyTorch", level: 4, category: "AI/ML", projects: ["Deep Learning Research", "NLP Models"] },
            { name: "Scikit-learn", level: 5, category: "AI/ML", projects: ["Data Analysis", "ML Algorithms"] },
            { name: "OpenCV", level: 4, category: "AI/ML", projects: ["Computer Vision", "Image Processing"] },
            { name: "Pandas", level: 5, category: "AI/ML", projects: ["Data Manipulation", "Statistical Analysis"] },
            { name: "NumPy", level: 5, category: "AI/ML", projects: ["Mathematical Computing", "Array Operations"] },
            { name: "Matplotlib", level: 4, category: "AI/ML", projects: ["Data Visualization", "Research Plots"] },
            
            // Web Development Skills
            { name: "JavaScript", level: 4, category: "Web Dev", projects: ["Interactive Websites", "Full-stack Applications"] },
            { name: "React", level: 4, category: "Web Dev", projects: ["Portfolio Website", "Dashboard Applications"] },
            { name: "Next.js", level: 3, category: "Web Dev", projects: ["Static Site Generation", "Server-side Rendering"] },
            { name: "Node.js", level: 3, category: "Web Dev", projects: ["Backend APIs", "Server Applications"] },
            { name: "HTML/CSS", level: 5, category: "Web Dev", projects: ["Responsive Design", "UI Components"] },
            { name: "Material-UI", level: 4, category: "Web Dev", projects: ["Component Libraries", "Design Systems"] },
            { name: "MongoDB", level: 3, category: "Web Dev", projects: ["Database Design", "Data Storage"] },
            { name: "Express.js", level: 3, category: "Web Dev", projects: ["REST APIs", "Web Services"] },
            
            // Leadership Skills
            { name: "Team Leadership", level: 5, category: "Leadership", projects: ["CS Club Management", "Project Coordination"] },
            { name: "Public Speaking", level: 4, category: "Leadership", projects: ["AI Workshops", "Technical Presentations"] },
            { name: "Mentoring", level: 5, category: "Leadership", projects: ["Student Guidance", "Code Reviews"] },
            { name: "Project Management", level: 4, category: "Leadership", projects: ["Hackathon Organization", "Team Coordination"] },
            { name: "Workshop Facilitation", level: 4, category: "Leadership", projects: ["AI Training Sessions", "Coding Bootcamps"] },
            { name: "Community Building", level: 5, category: "Leadership", projects: ["CS Club Growth", "Student Engagement"] },
            
            // Robotics Skills
            { name: "Arduino", level: 4, category: "Robotics", projects: ["Sensor Integration", "Automation Systems"] },
            { name: "Raspberry Pi", level: 3, category: "Robotics", projects: ["IoT Projects", "Edge Computing"] },
            { name: "C++", level: 3, category: "Robotics", projects: ["Embedded Systems", "Performance Optimization"] },
            { name: "Sensor Integration", level: 4, category: "Robotics", projects: ["Environmental Monitoring", "Data Collection"] },
            { name: "3D Printing", level: 3, category: "Robotics", projects: ["Prototype Development", "Custom Parts"] },
            { name: "Circuit Design", level: 3, category: "Robotics", projects: ["PCB Layout", "Electronic Prototypes"] }
          ]}
          categories={['All', 'AI/ML', 'Web Dev', 'Leadership', 'Robotics']}
        />
      </Container>
    </PageTransition>
  );
}