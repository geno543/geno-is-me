import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, Typography, Container, alpha, useTheme, Chip, Stack, Button, Card } from '@mui/material';
import ParticleField from '../components/ParticleField';
import AnimatedSection from '../components/AnimatedSection';
import MorphingShape from '../components/MorphingShape';
import {
  Code as CodeIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  TrendingUp,
  Rocket,
  AutoAwesome,
  EmojiEvents,
  PhoneAndroid,
  Lightbulb,
} from '@mui/icons-material';
import { ThemeContext } from '../App';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

// Neural Network Visualization - Geno → Very Cool Person transformation
const NeuralNetworkVisualization: React.FC<{ theme: any }> = ({ theme }) => {
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animate nodes appearing with stagger
    nodesRef.current.forEach((node, i) => {
      if (!node) return;

      gsap.fromTo(node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'back.out(1.7)',
        }
      );

      // Continuous pulsing
      gsap.to(node, {
        scale: 1.4,
        duration: 0.8,
        delay: i * 0.08 + 1.5,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    });

    // Animate connection lines with data flow
    linesRef.current.forEach((line, i) => {
      if (!line) return;

      gsap.fromTo(line,
        { strokeDashoffset: 1000, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 1.5,
          delay: i * 0.05,
          ease: 'power2.inOut',
        }
      );

      // Pulsing effect
      gsap.to(line, {
        opacity: 1,
        strokeWidth: 4,
        duration: 0.4,
        delay: i * 0.05 + 2,
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
      });
    });

    // Animate data particles flowing through network
    particlesRef.current.forEach((particle, i) => {
      if (!particle) return;

      gsap.fromTo(particle,
        { x: 0, opacity: 0, scale: 0 },
        {
          x: '100%',
          opacity: 1,
          scale: 1,
          duration: 2,
          delay: i * 0.5 + 1,
          repeat: -1,
          repeatDelay: 1,
          ease: 'power1.inOut',
          onRepeat: () => {
            gsap.set(particle, { x: 0, opacity: 0, scale: 0 });
          }
        }
      );
    });
  }, [isVisible]);

  // Network structure: Input (Geno) -> Hidden layers -> Output (Very Cool Person)
  const layers = [
    { count: 4, x: 50, label: 'Input\n"Geno"' },
    { count: 8, x: 250, label: 'Processing' },
    { count: 6, x: 450, label: 'Learning' },
    { count: 4, x: 650, label: 'Output\n"Cool!"' },
  ];

  const connections: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  
  // Generate connections between layers
  layers.forEach((layer, layerIndex) => {
    if (layerIndex < layers.length - 1) {
      const nextLayer = layers[layerIndex + 1];
      for (let i = 0; i < layer.count; i++) {
        for (let j = 0; j < nextLayer.count; j++) {
          connections.push({
            x1: layer.x,
            y1: (i + 1) * (500 / (layer.count + 1)),
            x2: nextLayer.x,
            y2: (j + 1) * (500 / (nextLayer.count + 1)),
          });
        }
      }
    }
  });

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        minHeight: { xs: 500, md: 600 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        opacity: 0,
        animation: isVisible ? 'fadeInScale 0.8s ease-out forwards' : 'none',
        '@keyframes fadeInScale': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        }
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          mb: 2,
          fontWeight: 800,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
        }}
      >
        The Geno Transformation
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          opacity: 0.7,
          textAlign: 'center',
        }}
      >
        Watch AI turn raw talent into something extraordinary
      </Typography>

      {/* Network Container */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: '800px', height: '500px' }}>
        {/* Background glow */}
        <Box
          sx={{
            position: 'absolute',
            inset: -50,
            background: `radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.08)}, transparent 70%)`,
            filter: 'blur(60px)',
            zIndex: -1,
          }}
        />

        {/* SVG for connections */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        >
          {connections.map((conn, i) => (
            <line
              key={i}
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              x1={`${(conn.x1 / 700) * 100}%`}
              y1={conn.y1}
              x2={`${(conn.x2 / 700) * 100}%`}
              y2={conn.y2}
              stroke={`url(#gradient-${i % 3})`}
              strokeWidth="2"
              strokeDasharray="1000"
            />
          ))}
          {/* Gradients for lines */}
          <defs>
            <linearGradient id="gradient-0" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={alpha(theme.palette.primary.main, 0.3)} />
              <stop offset="100%" stopColor={alpha(theme.palette.secondary.main, 0.5)} />
            </linearGradient>
            <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={alpha(theme.palette.secondary.main, 0.3)} />
              <stop offset="100%" stopColor={alpha(theme.palette.primary.main, 0.5)} />
            </linearGradient>
            <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={alpha(theme.palette.primary.main, 0.4)} />
              <stop offset="100%" stopColor={alpha(theme.palette.secondary.main, 0.4)} />
            </linearGradient>
          </defs>
        </svg>

        {/* Data particles flowing */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            ref={(el: HTMLDivElement | null) => {
              if (el) particlesRef.current[i] = el;
            }}
            sx={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: theme.palette.primary.main,
              boxShadow: `0 0 15px ${theme.palette.primary.main}`,
              top: `${20 + i * 15}%`,
              left: '5%',
            }}
          />
        ))}

        {/* Input Label - GENO */}
        <Box
          sx={{
            position: 'absolute',
            left: '5%',
            top: '-30px',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: theme.palette.primary.main,
              textShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
            }}
          >
            GENO
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            Input
          </Typography>
        </Box>

        {/* Output Label - VERY COOL PERSON */}
        <Box
          sx={{
            position: 'absolute',
            right: '5%',
            top: '-30px',
            transform: 'translateX(50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 0 30px ${alpha(theme.palette.secondary.main, 0.5)}`,
            }}
          >
            VERY COOL
            <br />
            PERSON ✨
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            Output
          </Typography>
        </Box>

        {/* Nodes */}
        {layers.map((layer, layerIndex) => (
          <Box key={layerIndex}>
            {[...Array(layer.count)].map((_, nodeIndex) => {
              const index = layers.slice(0, layerIndex).reduce((sum, l) => sum + l.count, 0) + nodeIndex;
              return (
                <Box
                  key={nodeIndex}
                  ref={(el: HTMLDivElement | null) => {
                    if (el) nodesRef.current[index] = el;
                  }}
                  sx={{
                    position: 'absolute',
                    left: `${(layer.x / 700) * 100}%`,
                    top: `${(nodeIndex + 1) * (500 / (layer.count + 1))}px`,
                    width: { xs: '20px', md: '28px' },
                    height: { xs: '20px', md: '28px' },
                    borderRadius: '50%',
                    background: layerIndex === 0 
                      ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                      : layerIndex === layers.length - 1
                      ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
                      : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.8)})`,
                    boxShadow: layerIndex === 0 || layerIndex === layers.length - 1
                      ? `0 0 30px ${layerIndex === 0 ? theme.palette.primary.main : theme.palette.secondary.main}`
                      : `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                />
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Type definitions
interface CTAButton {
  text: string;
  href: string;
  variant: 'contained' | 'outlined' | 'text';
}

interface Achievement {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
  projects: string[];
}

const Home: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations - disabled for immediate visibility
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { initGSAP } = await import('../lib/gsap.js');
        const modules = await initGSAP();
        
        if (!modules) return;
        
        const { gsap } = modules;

        // Rotating background gradient only
        gsap.to('.gradient-orb', {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none'
        });

      } catch (error) {
        console.log('GSAP not loaded:', error);
      }
    };

    loadGSAP();
  }, []);

  // Set document title and meta tags
  useEffect(() => {
    document.title = "Geno's Portfolio - AI Developer & Algorithm Enthusiast";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Welcome to Geno's portfolio - Building tomorrow's AI, one algorithm at a time. Explore innovative projects and cutting-edge solutions.");

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'AI, Machine Learning, Algorithms, Portfolio, Developer, Geno');

    // Set meta author
    let metaAuthor = document.querySelector('meta[name="author"]') as HTMLMetaElement;
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', 'Geno');
  }, []);

  const ctaButtons: CTAButton[] = [
    { text: 'See My Work', href: '/projects', variant: 'contained' },
    { text: 'My Story', href: '/about', variant: 'outlined' },
    { text: "Let's Talk", href: '/contact', variant: 'text' }
  ];

  const achievements: Achievement[] = [
    { icon: <CodeIcon />, title: "50+ Projects Created", description: "Built on a phone for 4 years, now changing lives" },
    { icon: <GroupIcon />, title: "300+ Lives Impacted", description: "CS Club President + Hackathon Organizer" },
    { icon: <SchoolIcon />, title: "Self-Taught Innovator", description: "From internet café kid to STEM leader" },
    { icon: <PsychologyIcon />, title: "AI Agent Builder", description: "Malaria detection → AGI dreams at MBZUAI" }
  ];

  const timeline: TimelineItem[] = [
    { year: "2016", title: "Internet Café Spark", description: "Age 6: Fell in love with that bright screen. Everything started here" },
    { year: "2018-2022", title: "The Phone Years", description: "Laptop broken? No problem. Learned Python on my phone for 4 years" },
    { year: "2023-Present", title: "STEM Revolution", description: "CS Club President, 200+ hackathon attendees, malaria AI detection" },
    { year: "2026+", title: "MBZUAI → AGI", description: "Leading AI innovation, building Oppy, making Middle East tech proud" }
  ];

  const interests: string[] = ['AI Agents', 'Malaria Detection', 'Hackathon Organizing', 'Egyptian Rap', 'Wolf of Wall Street', 'Green Everything', 'PUBG Conqueror', 'Physics with CS'];

  const skills: Skill[] = [
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
  ];

  type CategoryType = 'All' | 'AI/ML' | 'Web Dev' | 'Leadership' | 'Robotics';
  const categories: CategoryType[] = ['All', 'AI/ML', 'Web Dev', 'Leadership', 'Robotics'];

  return (
    <PageTransition>
      {/* Advanced Visual Background */}
      <ParticleField />
      <MorphingShape />
      
      {/* Scroll Progress Indicator */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'transparent',
          zIndex: 9999,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <Box
          sx={{
            width: `${scrollProgress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            transition: 'width 0.1s ease',
            boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.8)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.4)}`,
            willChange: 'width',
          }}
        />
      </Box>

      <Header 
        name="<Geno />"
        navItems={['About', 'Projects', 'Activities & Honors', 'Contact']}
        darkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Advanced Visual Background */}
      <ParticleField />
      <MorphingShape />

      <Box className="hero-section">
        <Hero 
          name="Mohamed^2 Ramadan"
          tagline="Hey! I'm Mohamed^2 Ramadan, an 18-year-old who fell in love with code at an internet café and now builds AI solutions that actually help people. From malaria detection to hackathon organizing — I'm here to make tech more human."
          ctaButtons={ctaButtons}
          avatar="/hero-avatar.svg"
          backgroundImage="/hero-bg.svg"
        />
      </Box>

      <Container maxWidth="lg" id="main-content">
        {/* Dynamic Stats Section with Scroll Animation */}
        <Box
          className="stats-section"
          sx={{
            py: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 900,
              textAlign: 'center',
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              animation: 'fadeIn 0.8s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Impact in Numbers
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 8,
              opacity: 0.9,
              maxWidth: '650px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              fontWeight: 500,
              animation: 'fadeIn 0.8s ease-out 0.2s both',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 0.9, transform: 'translateY(0)' }
              }
            }}
          >
            Real projects. Real impact. Built from scratch with determination.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)'
              },
              gap: 3
            }}
          >
            {[
              { 
                icon: <PhoneAndroid sx={{ fontSize: 40 }} />, 
                number: '4', 
                label: 'Years Coding on Phone',
                suffix: 'years',
                color: theme.palette.primary.main
              },
              { 
                icon: <CodeIcon sx={{ fontSize: 40 }} />, 
                number: '50', 
                label: 'Projects Created',
                suffix: '+',
                color: theme.palette.primary.main
              },
              { 
                icon: <GroupIcon sx={{ fontSize: 40 }} />, 
                number: '300', 
                label: 'Students Impacted',
                suffix: '+',
                color: theme.palette.primary.main
              },
              { 
                icon: <EmojiEvents sx={{ fontSize: 40 }} />, 
                number: '6', 
                label: 'Sports Mastered',
                suffix: '',
                color: theme.palette.primary.main
              },
            ].map((stat, index) => (
              <Box key={index}>
                <Card
                  className="stat-card"
                  sx={{
                    height: '100%',
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(145deg, rgba(40, 40, 45, 0.95), rgba(50, 50, 55, 0.95))`
                      : `linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))`,
                    backdropFilter: 'blur(20px)',
                    border: theme.palette.mode === 'dark'
                      ? `2px solid ${alpha(stat.color, 0.2)}`
                      : `2px solid ${alpha(stat.color, 0.15)}`,
                    borderRadius: '24px',
                    p: 4,
                    textAlign: 'center',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 10px 40px ${alpha('#000', 0.5)}, 0 0 0 1px ${alpha(stat.color, 0.1)}`
                      : `0 8px 30px ${alpha('#000', 0.08)}, 0 0 0 1px ${alpha(stat.color, 0.1)}`,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(30px)'
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${stat.color}, ${alpha(stat.color, 0.5)})`,
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle, ${alpha(stat.color, 0.15)}, transparent 70%)`,
                      transform: 'translate(-50%, -50%) scale(0)',
                      transition: 'transform 0.5s ease',
                      pointerEvents: 'none'
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.03)',
                      borderColor: stat.color,
                      boxShadow: theme.palette.mode === 'dark'
                        ? `0 20px 60px ${alpha(stat.color, 0.3)}, 0 0 0 2px ${alpha(stat.color, 0.2)}`
                        : `0 20px 50px ${alpha(stat.color, 0.2)}, 0 0 0 2px ${alpha(stat.color, 0.15)}`,
                      '&::before': {
                        transform: 'translateX(0)',
                      },
                      '&::after': {
                        transform: 'translate(-50%, -50%) scale(1)',
                      }
                    }
                  }}
                >
                  <Box sx={{ color: stat.color, mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      fontWeight: 900,
                      color: stat.color,
                      mb: 1,
                      fontFamily: 'monospace'
                    }}
                  >
                    {stat.number}{stat.suffix}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.8,
                      fontWeight: 600
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Visual Gallery Section */}
        <AnimatedSection animation="fadeIn">
          <Box
            sx={{
              py: { xs: 6, md: 10 },
              position: 'relative'
            }}
          >
            {/* Neural Network - Geno transformation */}
            <NeuralNetworkVisualization theme={theme} />
          </Box>
        </AnimatedSection>

        {/* Journey Timeline with Parallax */}
        <Box
          className="journey-section"
          sx={{
            py: { xs: 8, md: 12 },
            position: 'relative'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 900,
              textAlign: 'center',
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              animation: 'fadeIn 0.8s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            The Journey
          </Typography>
          <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                mb: 10,
                opacity: 0.9,
                maxWidth: '650px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
                fontWeight: 500,
              }}
          >
            From internet café dreams to AI innovation
          </Typography>

          <Stack spacing={4}>
            {[
              { 
                icon: <Lightbulb />,
                year: '2016',
                title: 'The Spark',
                description: 'Age 6 at the internet café. That glowing screen changed everything.',
                color: theme.palette.primary.main
              },
              { 
                icon: <PhoneAndroid />,
                year: '2018-2022',
                title: 'Phone Warrior',
                description: 'Brother broke my laptop. Learned Python on my phone for 4 years straight.',
                color: theme.palette.primary.main
              },
              { 
                icon: <TrendingUp />,
                year: '2023-Present',
                title: 'Leading Innovation',
                description: 'CS Club President, 300+ students, malaria AI detection, hackathons.',
                color: theme.palette.primary.main
              },
              { 
                icon: <Rocket />,
                year: '2026+',
                title: 'AGI Dreams',
                description: 'MBZUAI bound. Building Oppy. Creating the future of AI in MENA.',
                color: theme.palette.primary.main
              },
            ].map((item, index) => (
              <Box
                key={index}
                className="journey-item"
                sx={{
                  display: 'flex',
                  gap: 3,
                  animation: `slideInLeft 0.7s ease-out ${index * 0.15}s both`,
                  '@keyframes slideInLeft': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateX(-50px)'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateX(0)'
                    }
                  },
                }}
              >
                <Box
                  sx={{
                    minWidth: { xs: '60px', md: '80px' },
                    height: { xs: '60px', md: '80px' },
                    borderRadius: '50%',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(50, 50, 50, 1)'
                      : `linear-gradient(135deg, ${alpha(item.color, 0.2)}, ${alpha(item.color, 0.05)})`,
                    border: `2px solid ${alpha(item.color, 0.5)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    color: item.color,
                    flexShrink: 0,
                    transition: 'all 0.4s ease',
                    animation: `iconPulse 2s ease-in-out ${index * 0.15 + 0.3}s infinite`,
                    '@keyframes iconPulse': {
                      '0%, 100%': {
                        transform: 'scale(1)'
                      },
                      '50%': {
                        transform: 'scale(1.05)'
                      }
                    },
                    '&:hover': {
                      transform: 'scale(1.1) rotate(10deg)',
                      boxShadow: `0 10px 30px ${alpha(item.color, 0.3)}`,
                      animation: 'none'
                    }
                  }}
                >
                  {item.icon}
                </Box>
                <Card
                  sx={{
                    flex: 1,
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(145deg, rgba(40, 40, 45, 0.95), rgba(50, 50, 55, 0.95))`
                      : `linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))`,
                    backdropFilter: 'blur(10px)',
                    border: theme.palette.mode === 'dark'
                      ? `2px solid ${alpha(item.color, 0.2)}`
                      : `2px solid ${alpha(item.color, 0.15)}`,
                    borderRadius: '20px',
                    p: 4,
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 10px 40px ${alpha('#000', 0.5)}`
                      : `0 8px 30px ${alpha('#000', 0.08)}`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: `linear-gradient(180deg, ${item.color}, ${alpha(item.color, 0.3)})`,
                      transform: 'translateY(-100%)',
                      transition: 'transform 0.5s ease'
                    },
                    '&:hover': {
                      transform: 'translateX(15px)',
                      borderColor: item.color,
                      boxShadow: theme.palette.mode === 'dark'
                        ? `0 15px 50px ${alpha(item.color, 0.25)}`
                        : `0 12px 40px ${alpha(item.color, 0.15)}`,
                      '&::before': {
                        transform: 'translateY(0)'
                      }
                    }
                  }}
                >
                  <Chip
                    label={item.year}
                    size="small"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      background: alpha(item.color, 0.1),
                      color: item.color,
                      border: `1px solid ${alpha(item.color, 0.2)}`
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: item.color
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.8,
                      lineHeight: 1.7
                    }}
                  >
                    {item.description}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Stack>

        </Box>

        {/* Tech Stack Showcase with Floating Animation */}
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 900,
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              animation: 'fadeIn 0.8s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Built with Modern Tech
          </Typography>
          <Typography
            variant="body1"
            sx={{ 
              mb: 6, 
              opacity: 0.9, 
              maxWidth: '550px', 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              fontWeight: 500,
              animation: 'fadeIn 0.8s ease-out 0.2s both',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 0.9, transform: 'translateY(0)' }
              }
            }}
          >
            From AI models to full-stack apps, powered by cutting-edge tools
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            {['Python', 'TensorFlow', 'React', 'Next.js', 'PyTorch', 'Node.js', 'MongoDB', 'OpenCV'].map((tech, index) => (
              <Chip
                key={tech}
                label={tech}
                sx={{
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  fontWeight: 700,
                  px: 3,
                  py: 3,
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.05)})`
                    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, rgba(255,255,255,0.9))`,
                  backdropFilter: 'blur(20px)',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                  borderRadius: '16px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.1)}`,
                  animation: `chipFadeIn 0.5s ease-out ${index * 0.1}s both, float 3s ease-in-out ${index * 0.1 + 0.5}s infinite`,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease'
                  },
                  '& .MuiChip-label': {
                    position: 'relative',
                    zIndex: 1
                  },
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.08)',
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
                    animationPlayState: 'paused',
                    '&::before': {
                      opacity: 1
                    }
                  },
                  '@keyframes chipFadeIn': {
                    '0%': {
                      opacity: 0,
                      transform: 'scale(0.8) translateY(20px)'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'scale(1) translateY(0)'
                    }
                  },
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  }
                }}
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Button
              component={Link}
              to="/projects"
              variant="contained"
              size="large"
              endIcon={<Rocket />}
              sx={{
                px: 5,
                py: 2,
                borderRadius: '16px',
                fontWeight: 700,
                fontSize: '1.05rem',
                textTransform: 'none',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 8px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: 'buttonFadeIn 0.6s ease-out 0.8s both',
                '@keyframes buttonFadeIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(20px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.3)}, transparent)`,
                  transition: 'left 0.5s ease'
                },
                '&:hover': {
                  transform: 'translateY(-5px) scale(1.03)',
                  boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.6)}`,
                  '&::before': {
                    left: '100%'
                  }
                }
              }}
            >
              View All Projects
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              endIcon={<AutoAwesome />}
              sx={{
                px: 5,
                py: 2,
                borderRadius: '16px',
                fontWeight: 700,
                fontSize: '1.05rem',
                textTransform: 'none',
                borderWidth: '2px',
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: 'buttonFadeIn 0.6s ease-out 0.9s both',
                '@keyframes buttonFadeIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(20px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '0',
                  height: '0',
                  borderRadius: '50%',
                  background: alpha(theme.palette.primary.main, 0.1),
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.5s ease, height 0.5s ease'
                },
                '&:hover': {
                  borderWidth: '2px',
                  transform: 'translateY(-5px) scale(1.03)',
                  background: alpha(theme.palette.primary.main, 0.08),
                  boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&::before': {
                    width: '400px',
                    height: '400px'
                  }
                }
              }}
            >
              Let's Connect
            </Button>
          </Stack>
        </Box>

        <About 
          bio="That bright screen at the internet café when I was little? It started everything. Four years without a laptop didn't stop me from learning Python on my phone. Now at Egypt's STEM High School, I've built 40+ projects and lead 300+ students in our CS club. Currently exploring LLMs and dreaming of AGI breakthroughs."
          achievements={achievements}
          interests={interests}
          timeline={timeline}
        />

        <Skills 
          skills={skills}
          categories={categories}
        />
      </Container>
    </PageTransition>
  );
};

export default Home;