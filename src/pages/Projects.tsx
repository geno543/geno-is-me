import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  IconButton,
  Fade,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
  Zoom,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Close as CloseIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
  Web as WebIcon,
  SmartToy as RobotIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../App';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition';
import ParticleField from '../components/ParticleField';
import AnimatedSection from '../components/AnimatedSection';

// Type definitions
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: 'AI/ML' | 'Web Dev' | 'Robotics';
  github: string;
  demo: string | null;
  featured: boolean;
  status: 'Completed' | 'In Development';
  impact: string;
}

type CategoryType = 'All' | 'AI/ML' | 'Web Dev' | 'Robotics';

const projects: Project[] = [
  {
    id: 1,
    title: "TELQAI AI Education Platform",
    description: "Egypt's first free comprehensive program dedicated to AI, automation, and autonomous agent education.",
    longDescription: "TELQAI is a groundbreaking educational initiative providing free access to cutting-edge AI education. The platform covers modern AI topics including autonomous agents, automation systems, and practical AI applications. Built to democratize AI education and make advanced concepts accessible to all Egyptian students.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    technologies: ["Python", "AI Agents", "LangChain", "React", "FastAPI", "Docker"],
    category: "AI/ML",
    github: "https://github.com/geno543/telqai",
    demo: "https://telqai.vercel.app",
    featured: true,
    status: "In Development",
    impact: "Empowering 500+ students with free AI education"
  },
  {
    id: 2,
    title: "Quanstra Physics Platform",
    description: "Social media platform making complex physics concepts accessible and engaging for students through interactive content.",
    longDescription: "Co-founded social platform that revolutionizes physics education by combining social media engagement with educational content. Features interactive simulations, community discussions, and gamified learning experiences that make physics fun and accessible.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Three.js"],
    category: "Web Dev",
    github: "https://github.com/geno543/quanstra",
    demo: "https://quanstra.com",
    featured: true,
    status: "Completed",
    impact: "Building active community of 1000+ physics enthusiasts"
  },
  {
    id: 3,
    title: "EOCS Platform",
    description: "Egyptian Olympiad in Computational Science - Egypt's first computational science olympiad platform.",
    longDescription: "Founded and developed the platform for Egypt's first computational science olympiad at EUI University. Features automated problem evaluation, real-time leaderboards, contest management, and educational resources for competitive programming and computational thinking.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    category: "Web Dev",
    github: "https://github.com/geno543/eocs-platform",
    demo: "https://eocs.eg",
    featured: true,
    status: "Completed",
    impact: "Pioneering competitive programming culture in Egypt"
  },
  {
    id: 4,
    title: "CS Club Management System",
    description: "Comprehensive platform managing 300+ members, 30 mentors, and organizing online camps and learning tracks.",
    longDescription: "Full-stack management platform for STEM Computer Science Club. Features member registration, attendance tracking, event management, learning track progress monitoring, mentor coordination, and analytics dashboard. Supports both online and offline activities with integrated video conferencing.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    technologies: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "WebRTC"],
    category: "Web Dev",
    github: "https://github.com/geno543/cs-club-platform",
    demo: "https://stem-cs-club.vercel.app",
    featured: true,
    status: "Completed",
    impact: "Managing 300+ members and organizing 50+ events annually"
  },
  {
    id: 5,
    title: "Robotics Competition System",
    description: "Competition management and robot control system developed for EISTF robotics competition (Gold Medal winner).",
    longDescription: "Comprehensive robotics competition platform including real-time scoring, team management, and robot telemetry monitoring. Built custom robot control systems using ROS and developed autonomous navigation algorithms. System successfully deployed at national competition.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80",
    technologies: ["ROS", "Python", "C++", "Arduino", "React", "WebSocket"],
    category: "Robotics",
    github: "https://github.com/geno543/robotics-competition",
    demo: null,
    featured: false,
    status: "Completed",
    impact: "Won Gold Medal at EISTF National Competition"
  },
  {
    id: 6,
    title: "AI Biology Research Tool",
    description: "AI application for biological sciences - achieved 5th place in national ASRT competition.",
    longDescription: "Developed AI-powered tool for biological data analysis and visualization. Uses machine learning for pattern recognition in biological datasets, automated classification of biological specimens, and predictive modeling for biological research. Recognized at national level by Academy of Scientific Research and Technology.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "Matplotlib"],
    category: "AI/ML",
    github: "https://github.com/geno543/bio-ai-research",
    demo: "https://bio-ai-tool.vercel.app",
    featured: false,
    status: "Completed",
    impact: "5th Place - National AI in Biological Sciences Competition"
  },
  {
    id: 7,
    title: "IoT & AI Smart System",
    description: "IoT and AI challenge project - Top 10 finalist with innovative smart automation system.",
    longDescription: "Integrated IoT sensors with AI decision-making for smart environment automation. System monitors environmental conditions, predicts user needs, and autonomously adjusts settings for optimal comfort and efficiency. Features edge computing for real-time processing and cloud integration for analytics.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    technologies: ["Raspberry Pi", "Arduino", "Python", "TensorFlow Lite", "MQTT", "React"],
    category: "Robotics",
    github: "https://github.com/geno543/iot-ai-system",
    demo: null,
    featured: false,
    status: "In Development",
    impact: "Top 10 Finalist in IoT & AI Challenge 2024"
  },
  {
    id: 8,
    title: "Phiga Competition Platform",
    description: "Innovative physics competition structured as problem-solving game with gamification elements.",
    longDescription: "Co-founded and developed web platform for physics competition with game-like structure. Features progressive difficulty levels, real-time scoring, interactive problem visualization, team collaboration tools, and leaderboards. Makes physics problem-solving engaging through gamification.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    category: "Web Dev",
    github: "https://github.com/geno543/phiga",
    demo: "https://phiga.vercel.app",
    featured: false,
    status: "Completed",
    impact: "Engaging 200+ students in physics problem-solving"
  }
];

const categories: CategoryType[] = ['All', 'AI/ML', 'Web Dev', 'Robotics'];

const categoryIcons: Record<CategoryType, React.ComponentType> = {
  'All': FilterIcon,
  'AI/ML': PsychologyIcon,
  'Web Dev': WebIcon,
  'Robotics': RobotIcon,
};

const Projects: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const [showFloatingElements, setShowFloatingElements] = useState<boolean>(false);

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Projects - Mohamed^2 Ramadan Portfolio';
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore my portfolio of AI, web development, and robotics projects. From malaria detection AI to IoT systems.');
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Projects, AI, Machine Learning, Web Development, Robotics, Portfolio');
    }
  }, []);

  // Animation effects
  useEffect(() => {
    setIsVisible(true);
    // const floatingTimer = setTimeout(() => {
    //   setShowFloatingElements(true);
    // }, 1000);
    
    // return () => clearTimeout(floatingTimer);
  }, []);

  // Floating icons data - removed for modern design
  /*const floatingIcons = [
    { icon: <CodeIcon />, delay: 0, position: { top: '10%', right: '8%' } },
    { icon: <PsychologyIcon />, delay: 200, position: { top: '20%', left: '5%' } },
    { icon: <WebIcon />, delay: 400, position: { bottom: '25%', right: '12%' } },
    { icon: <RobotIcon />, delay: 600, position: { bottom: '15%', left: '8%' } },
    { icon: <AutoAwesome />, delay: 800, position: { top: '35%', right: '20%' } },
    { icon: <Rocket />, delay: 1000, position: { bottom: '40%', left: '15%' } },
  ];*/

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (project: Project): void => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  const getCategoryIcon = (category: CategoryType): React.ReactElement => {
    switch (category) {
      case 'AI/ML': return <PsychologyIcon />;
      case 'Web Dev': return <WebIcon />;
      case 'Robotics': return <RobotIcon />;
      default: return <CodeIcon />;
    }
  };

  return (
    <PageTransition>
      <Header 
        name="<Geno />"
        navItems={['About', 'Projects', 'Activities & Honors', 'Contact']}
        darkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      {/* Particle Network Background */}
      <ParticleField />

      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          position: 'relative',
          background: 'transparent',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 25% 25%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 50%), 
              radial-gradient(circle at 75% 75%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%),
              radial-gradient(circle at 50% 10%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 40%)
            `,
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(alpha(theme.palette.primary.main, 0.03))}' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            zIndex: 0,
          }
        }}
      >
        {/* Floating icons removed for modern clean design */}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 12 } }}>
          {/* Header Section with Puzzle Theme */}
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                My Work & Innovations
              </Typography>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 900,
                  lineHeight: 1.1,
                  mb: 3,
                  background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                Projects Portfolio
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary,
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                8 real projects. 0 tutorials. Built to solve actual problems and create impact
              </Typography>
            </Box>
          </Fade>

          {/* Creative Category Filter */}
          <Zoom in={isVisible} timeout={1200}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 1.5, sm: 2 },
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: '24px',
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.85)})`,
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 8px 32px ${alpha('#000', 0.4)}`
                    : `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
                }}
              >
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  const IconComponent = categoryIcons[category];
                  
                  return (
                    <Chip
                      key={category}
                      label={category}
                      icon={<IconComponent />}
                      onClick={() => setSelectedCategory(category)}
                      sx={{
                        px: { xs: 2, sm: 2.5 },
                        py: 1.2,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        fontWeight: 700,
                        height: 'auto',
                        borderRadius: '16px',
                        background: isSelected 
                          ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                          : theme.palette.mode === 'dark'
                            ? alpha(theme.palette.background.default, 0.5)
                            : alpha(theme.palette.background.paper, 0.6),
                        color: isSelected 
                          ? 'white'
                          : theme.palette.text.primary,
                        border: `2px solid ${isSelected 
                          ? 'transparent' 
                          : alpha(theme.palette.divider, 0.2)}`,
                        backdropFilter: 'blur(10px)',
                        boxShadow: isSelected 
                          ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.35)}`
                          : 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '& .MuiChip-icon': {
                          color: 'inherit',
                          fontSize: '1.2rem',
                        },
                        '&:hover': {
                          background: isSelected
                            ? `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
                          color: isSelected ? 'white' : theme.palette.primary.main,
                          transform: 'translateY(-3px) scale(1.05)',
                          boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.25)}`,
                          border: `2px solid ${alpha(theme.palette.primary.main, isSelected ? 0 : 0.4)}`,
                        }
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Zoom>

          {/* Project Count Badge */}
          <Fade in={isVisible} timeout={1400}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {filteredProjects.length}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {selectedCategory === 'All' ? 'Total Projects' : `${selectedCategory} Projects`}
                </Typography>
              </Box>
            </Box>
          </Fade>

          {/* Creative Projects Grid - Staggered Layout */}
          <AnimatedSection animation="fadeIn">
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: '1fr', 
                md: 'repeat(2, 1fr)', 
                lg: 'repeat(12, 1fr)' 
              }, 
              gap: 3,
              mb: 8,
            }}>
            {filteredProjects.map((project, index) => {
              // Creative grid positioning: featured projects take more space
              const gridColumn = project.featured 
                ? { xs: '1 / -1', md: index === 0 ? '1 / 7' : '7 / 13', lg: index === 0 ? '1 / 7' : index === 2 ? '7 / 13' : '1 / 7' }
                : { xs: '1 / -1', md: '1 / -1', lg: 'span 4' };
              
              const gridRow = project.featured && index === 0 ? { lg: 'span 2' } : {};
              
              return (
              <Box 
                key={project.id}
                sx={{
                  gridColumn,
                  gridRow,
                }}
              >
                <Fade in timeout={1000 + index * 150}>
                  <Card
                     sx={{
                       height: '100%',
                       minHeight: project.featured ? { xs: 420, md: 460 } : { xs: 380, md: 400 },
                       display: 'flex',
                       flexDirection: 'column',
                       cursor: 'pointer',
                       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                       background: theme.palette.mode === 'dark' 
                         ? alpha(theme.palette.background.paper, 0.6)
                         : alpha(theme.palette.background.paper, 0.8),
                       backdropFilter: 'blur(20px) saturate(120%)',
                       WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                       border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                       borderRadius: '20px',
                       position: 'relative',
                       overflow: 'hidden',
                       boxShadow: theme.palette.mode === 'dark'
                         ? `0 4px 20px ${alpha('#000', 0.4)}`
                         : `0 4px 20px ${alpha('#000', 0.08)}`,
                       '&:hover': {
                         transform: 'translateY(-8px)',
                         boxShadow: theme.palette.mode === 'dark'
                           ? `0 12px 40px ${alpha('#000', 0.6)}`
                           : `0 12px 40px ${alpha('#000', 0.12)}`,
                         border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                       }
                     }}
                     onClick={() => handleProjectClick(project)}
                   >
                    <CardMedia
                      component="div"
                      sx={{
                        height: project.featured ? 240 : 200,
                        background: theme.palette.mode === 'dark'
                          ? alpha(theme.palette.background.default, 0.4)
                          : alpha(theme.palette.background.default, 0.6),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '& > svg': {
                          fontSize: '4rem',
                          color: theme.palette.primary.main,
                          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
                          transition: 'transform 0.4s ease',
                          zIndex: 1,
                        },
                        '&:hover > svg': {
                          transform: 'scale(1.2) rotate(10deg)',
                        },
                      }}
                    >
                      {getCategoryIcon(project.category)}
                    </CardMedia>
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, lineHeight: 1.6 }}
                      >
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        ))}
                        {project.technologies.length > 3 && (
                          <Chip
                            label={`+${project.technologies.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                      
                      <Chip
                        label={project.status}
                        size="small"
                        color={project.status === 'Completed' ? 'success' : 'warning'}
                        sx={{ fontWeight: 500 }}
                      />
                    </CardContent>
                    
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        size="small"
                        startIcon={<GitHubIcon />}
                        href={project.github}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code
                      </Button>
                      {project.demo && (
                        <Button
                          size="small"
                          startIcon={<LaunchIcon />}
                          href={project.demo}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Demo
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Fade>
              </Box>
            );
            })}
            </Box>
          </AnimatedSection>
        </Container>

        {/* Project Detail Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              maxHeight: '90vh',
              background: `linear-gradient(135deg, 
                ${alpha(theme.palette.background.paper, 0.95)}, 
                ${alpha(theme.palette.background.paper, 0.8)})`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }
          }}
        >
          {selectedProject && (
            <>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {selectedProject.title}
                </Typography>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                    {selectedProject.longDescription}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Technologies Used:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {selectedProject.technologies.map((tech) => (
                      <Chip key={tech} label={tech} variant="outlined" />
                    ))}
                  </Box>
                  
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Impact:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {selectedProject.impact}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={selectedProject.category}
                      color="primary"
                      icon={getCategoryIcon(selectedProject.category)}
                    />
                    <Chip
                      label={selectedProject.status}
                      color={selectedProject.status === 'Completed' ? 'success' : 'warning'}
                    />
                  </Box>
                </Box>
              </DialogContent>
              
              <DialogActions sx={{ p: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href={selectedProject.github}
                  target="_blank"
                >
                  View Code
                </Button>
                {selectedProject.demo && (
                  <Button
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={selectedProject.demo}
                    target="_blank"
                  >
                    Live Demo
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </PageTransition>
  );
};

export default Projects;