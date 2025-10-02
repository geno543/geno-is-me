import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Avatar,
  useTheme,
  alpha,
  Fade,
  Zoom,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
} from '@mui/material';
import {
  Psychology as AIIcon,
  EmojiNature as NatureIcon,
  Code as CodeIcon,
  Rocket as RocketIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Favorite as HeartIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Lightbulb as LightbulbIcon,
  Star as StarIcon,
  LocalMovies as MovieIcon,
  MusicNote as MusicIcon,
  MenuBook as BookIcon,
  Sports as SportsIcon,
  Whatshot as FireIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../App';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition';
import ParticleField from '../components/ParticleField';
import MorphingShape from '../components/MorphingShape';
import AnimatedSection from '../components/AnimatedSection';
import ImageReveal from '../components/ImageReveal';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const About: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  
  const [isVisible, setIsVisible] = useState(false);
  const [showFloatingElements, setShowFloatingElements] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Hey! I'm Geno's AI assistant. Ask me anything about him!", sender: 'bot', timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'About Me - Geno | Mohamed Ramadan Portfolio';
    setIsVisible(true);
    
    const timer = setTimeout(() => setShowFloatingElements(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Easter egg: Click green text 5 times
  const handleEasterEgg = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 === 5 && !easterEggFound) {
      setEasterEggFound(true);
      setChatMessages(prev => [...prev, {
        text: "Easter egg found! Did you know Geno once debugged code while playing PUBG? Multitasking level: Conqueror!",
        sender: 'bot',
        timestamp: new Date()
      }]);
      setChatOpen(true);
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { text: chatInput, sender: 'user', timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);

    // Simple bot responses
    setTimeout(() => {
      let botResponse = "";
      const lower = chatInput.toLowerCase();
      
      if (lower.includes('malaria') || lower.includes('project')) {
        botResponse = "Geno's malaria AI detection model is his pride! He built a pipeline with YOLO, AAM, and CNN for red blood cell detection - all self-taught in first secondary year!";
      } else if (lower.includes('club') || lower.includes('cs') || lower.includes('president')) {
        botResponse = "As CS Club President, Geno manages 300+ members and even built an AI agent to review applications and detect AI-generated content! Smart, right?";
      } else if (lower.includes('oppy') || lower.includes('startup')) {
        botResponse = "Oppy is Geno's dream non-profit - an AI-powered platform with RAG to match high schoolers with opportunities! He wants to build a community that helps students get accepted.";
      } else if (lower.includes('mbzuai') || lower.includes('future')) {
        botResponse = "Geno dreams of attending MBZUAI to lead AI innovation and help introduce AGI! He wants to shape the Middle East's tech future.";
      } else if (lower.includes('geno') || lower.includes('nickname')) {
        botResponse = "Geno got his nickname from PUBG days when he was 'El General' - Conqueror rank with high KD! The name means 'well-born' or 'noble' in Greek.";
      } else if (lower.includes('music') || lower.includes('rap')) {
        botResponse = "Geno is addicted to music! He loves Egyptian rap, especially Marwan Mousa. Music keeps him in the zone while coding!";
      } else if (lower.includes('movie') || lower.includes('wolf')) {
        botResponse = "Wolf of Wall Street is Geno's favorite movie! He loves that entrepreneurial spirit and ambition.";
      } else if (lower.includes('book') || lower.includes('read')) {
        botResponse = "His favorite book is 'Good to Great' - all about turning companies into unicorns! Perfect for his startup dreams.";
      } else if (lower.includes('physics')) {
        botResponse = "Fun fact: Geno won 1st place in Physics Brawl using his CS skills, not physics! He showed his physics friends how powerful CS can be.";
      } else if (lower.includes('color') || lower.includes('green')) {
        botResponse = "Geno LOVES green! It's his favorite color - notice how it's all over this portfolio? He loves nature and simple things in life.";
      } else {
        botResponse = "Geno is an 18-year-old from Cairo who started coding at age 6! He learned on his phone for 4 years after his brother broke his laptop. Now he's built 50+ projects! What else would you like to know?";
      }
      
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot', timestamp: new Date() }]);
    }, 1000);

    setChatInput('');
  };

  // Floating icons removed for modern clean design
  // const floatingIcons = [];

  return (
    <PageTransition>
      {/* Advanced Visual Background */}
      <ParticleField />
      <MorphingShape />
      
      <Header 
        name="<Geno />"
        navItems={['About', 'Projects', 'Activities & Honors', 'Contact']}
        darkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          position: 'relative',
          background: `linear-gradient(135deg, 
            ${theme.palette.background.default} 0%, 
            ${theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.95)} 100%)`,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 30%, ${alpha('#22c55e', 0.15)} 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%),
              radial-gradient(circle at 50% 10%, ${alpha('#22c55e', 0.06)} 0%, transparent 40%)
            `,
            zIndex: 0,
          },
        }}
      >
        {/* Floating icons removed for modern clean design */}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 12 } }}>
          {/* Hero Header with Story-like Design */}
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 12, position: 'relative' }}>
              {/* Decorative Chapter Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1,
                  mb: 3,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${alpha('#22c55e', 0.1)}, ${alpha('#22c55e', 0.05)})`,
                  border: `1px solid ${alpha('#22c55e', 0.2)}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: `0 0 20px ${alpha('#22c55e', 0.5)}`,
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                      '50%': { transform: 'scale(1.2)', opacity: 0.8 },
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#22c55e',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    cursor: 'pointer',
                  }}
                  onClick={handleEasterEgg}
                >
                  Chapter 01 • The Origin Story
                </Typography>
              </Box>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
                  fontWeight: 900,
                  lineHeight: 1.1,
                  mb: 3,
                  background: `linear-gradient(135deg, 
                    ${theme.palette.text.primary} 0%, 
                    #22c55e 40%,
                    #16a34a 60%,
                    ${theme.palette.text.primary} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 8s ease infinite',
                  '@keyframes gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% center' },
                    '50%': { backgroundPosition: '100% center' },
                  },
                }}
              >
                The Developer Behind
                <br />
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  The Vision
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: { xs: -5, md: -10 },
                      left: 0,
                      right: 0,
                      height: { xs: 8, md: 12 },
                      background: alpha('#22c55e', 0.3),
                      borderRadius: 2,
                      zIndex: -1,
                    }}
                  />
                </span>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                  maxWidth: '850px',
                  mx: 'auto',
                  position: 'relative',
                  px: { xs: 2, md: 0 },
                  '&::before': {
                    content: '"✦"',
                    position: 'absolute',
                    left: { xs: 0, md: -20 },
                    top: -5,
                    fontSize: '1.5rem',
                    color: alpha('#22c55e', 0.4),
                  },
                  '&::after': {
                    content: '"✦"',
                    position: 'absolute',
                    right: { xs: 0, md: -20 },
                    bottom: -5,
                    fontSize: '1.5rem',
                    color: alpha('#22c55e', 0.4),
                  },
                }}
              >
                From a <strong style={{ color: '#22c55e', fontWeight: 600 }}>bright screen at an internet café</strong> to building{' '}
                <strong style={{ color: '#22c55e', fontWeight: 600 }}>AI that saves lives</strong> — this is the story of{' '}
                passion meeting purpose, powered by curiosity and a love for{' '}
                <span style={{
                  background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  borderBottom: `3px solid ${alpha('#22c55e', 0.3)}`,
                }}>everything green</span>
              </Typography>
            </Box>
          </Fade>

          {/* Chapter Section Divider */}
          <AnimatedSection animation="slideUp" sx={{ mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                label="ACT I"
                sx={{
                  background: `linear-gradient(135deg, ${alpha('#22c55e', 0.15)}, ${alpha('#22c55e', 0.05)})`,
                  color: '#22c55e',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: `1px solid ${alpha('#22c55e', 0.3)}`,
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary}, #22c55e)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                The Beginning
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', fontSize: '1.1rem' }}>
                Every great journey starts with a single step. Mine started with a curious mind and a glowing screen.
              </Typography>
            </Box>
          </AnimatedSection>

          {/* Main Story Card with Enhanced Design */}
          <Zoom in={isVisible} timeout={1200}>
            <Card
              sx={{
                mb: 8,
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`
                  : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                backdropFilter: 'blur(40px)',
                border: `2px solid ${alpha('#22c55e', 0.2)}`,
                borderRadius: 6,
                boxShadow: `0 25px 70px ${alpha('#22c55e', 0.15)}`,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  background: `linear-gradient(90deg, #22c55e, #16a34a, #10b981, #22c55e)`,
                  backgroundSize: '300% auto',
                  animation: 'shimmer 4s linear infinite',
                },
                '@keyframes shimmer': {
                  '0%': { backgroundPosition: '300% center' },
                  '100%': { backgroundPosition: '-300% center' },
                },
                '&:hover': {
                  boxShadow: `0 35px 90px ${alpha('#22c55e', 0.25)}`,
                  transform: 'translateY(-8px)',
                  border: `2px solid ${alpha('#22c55e', 0.35)}`,
                  '&::before': {
                    height: '8px',
                  },
                },
              }}
            >
              <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 5, flexWrap: 'wrap', gap: 3 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -4,
                        background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                        borderRadius: '50%',
                        opacity: 0.2,
                        filter: 'blur(20px)',
                        zIndex: -1,
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 100, md: 120 },
                        height: { xs: 100, md: 120 },
                        background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        boxShadow: `0 15px 35px ${alpha('#22c55e', 0.4)}`,
                        border: `3px solid ${alpha('#22c55e', 0.3)}`,
                      }}
                    >
                      G
                    </Avatar>
                  </Box>
                  <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}>
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                      Mohamed Mohamed Ramadan
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#22c55e', fontWeight: 700, mb: 2 }}>
                      Geno — The Well-Born AI Enthusiast
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                      <Chip 
                        label="18 years old" 
                        size="medium"
                        sx={{ 
                          bgcolor: alpha(theme.palette.background.default, 0.5),
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          fontWeight: 600,
                        }} 
                      />
                      <Chip 
                        label="Cairo, Egypt" 
                        size="medium"
                        sx={{ 
                          bgcolor: alpha(theme.palette.background.default, 0.5),
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          fontWeight: 600,
                        }} 
                      />
                      <Chip 
                        label="STEM High School" 
                        size="medium"
                        sx={{ 
                          bgcolor: alpha('#22c55e', 0.15),
                          color: '#22c55e',
                          border: `1px solid ${alpha('#22c55e', 0.3)}`,
                          fontWeight: 600,
                        }} 
                      />
                      <Chip 
                        label="Future AGI Pioneer" 
                        size="medium"
                        sx={{ 
                          bgcolor: alpha('#22c55e', 0.15),
                          color: '#22c55e',
                          border: `1px solid ${alpha('#22c55e', 0.3)}`,
                          fontWeight: 600,
                        }} 
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ 
                  position: 'relative', 
                  pl: { xs: 0, md: 3 },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: `linear-gradient(180deg, #22c55e, transparent)`,
                    display: { xs: 'none', md: 'block' },
                  }
                }}>
                  <Typography variant="body1" sx={{ fontSize: '1.15rem', lineHeight: 2, mb: 3.5, color: theme.palette.text.primary, fontWeight: 400 }}>
                    When I was a little kid at the dentist with my mom, I saw a <strong style={{ color: '#22c55e', fontWeight: 700 }}>bright screen</strong> at an internet café that changed everything. Even when someone showed me how to start a game, I kept asking <em style={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>"but how does it work?"</em> That curiosity never stopped.
                  </Typography>

                  <Typography variant="body1" sx={{ fontSize: '1.15rem', lineHeight: 2, mb: 3.5, color: theme.palette.text.primary, fontWeight: 400 }}>
                    In 6th grade, I started teaching myself HTML, CSS, and Python. Then my younger brother accidentally broke my laptop. For the next <strong style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.2rem' }}>4 years</strong>, I had no computer — just my phone. But I didn't stop. I watched videos, listened to podcasts, and kept learning about AI advancement. When I finally got the tools I needed and joined Egypt's STEM High School, I unleashed everything I'd learned.
                  </Typography>

                  <Typography variant="body1" sx={{ fontSize: '1.15rem', lineHeight: 2, mb: 4, color: theme.palette.text.primary, fontWeight: 400 }}>
                    Since then, I've built <strong style={{ 
                      color: '#22c55e', 
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      padding: '2px 8px',
                      background: alpha('#22c55e', 0.1),
                      borderRadius: '4px',
                    }}>50+ projects</strong> spanning robotics, AI, mobile, and web development. I've explored deep learning, computer vision, transformer models, and now I'm diving deep into LLMs and AI agents — the magic of our time.
                  </Typography>
                </Box>

                <Box sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  background: `linear-gradient(135deg, ${alpha('#22c55e', 0.08)}, ${alpha('#22c55e', 0.03)})`,
                  border: `2px solid ${alpha('#22c55e', 0.2)}`,
                  mb: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at top right, ${alpha('#22c55e', 0.1)}, transparent 50%)`,
                    pointerEvents: 'none',
                  }
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, position: 'relative' }}>
                    <LightbulbIcon sx={{ color: '#22c55e', fontSize: '1.8rem' }} />
                    My Philosophy
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 2, position: 'relative', color: theme.palette.text.primary }}>
                    I see AI as <strong style={{ 
                      color: '#22c55e', 
                      fontWeight: 700,
                      padding: '2px 6px',
                      background: alpha('#22c55e', 0.15),
                      borderRadius: '4px',
                    }}>magic without the magic</strong> — a tool to solve real problems around us. Technology isn't just code; it's a way to improve learning and human connection. I'm passionate, funny, smile a lot, and love people. I believe in simple things, nature, and making technology accessible to everyone.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
                  <Chip icon={<AIIcon />} label="AI & ML Enthusiast" color="primary" sx={{ fontWeight: 600 }} />
                  <Chip icon={<NatureIcon />} label="Nature Lover" sx={{ bgcolor: '#22c55e', color: 'white', fontWeight: 600 }} />
                  <Chip icon={<CodeIcon />} label="React & Next.js" color="primary" sx={{ fontWeight: 600 }} />
                  <Chip icon={<HeartIcon />} label="Green Everything" sx={{ bgcolor: '#22c55e', color: 'white', fontWeight: 600 }} />
                  <Chip icon={<GroupIcon />} label="Community Builder" color="primary" sx={{ fontWeight: 600 }} />
                  <Chip icon={<FireIcon />} label="Passionate Learner" color="secondary" sx={{ fontWeight: 600 }} />
                </Box>
              </CardContent>
            </Card>
          </Zoom>

          {/* Projects Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 5, mb: 6 }}>
            {/* Malaria Project */}
            <Fade in={isVisible} timeout={1400}>
              <Card
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                  backdropFilter: 'blur(40px)',
                  border: `2px solid ${alpha('#22c55e', 0.4)}`,
                  borderRadius: 5,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, #22c55e, #16a34a, #22c55e)`,
                    backgroundSize: '200% auto',
                    animation: 'shimmer 3s linear infinite',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: '100px',
                    height: '100px',
                    background: `radial-gradient(circle, ${alpha('#22c55e', 0.3)}, transparent 70%)`,
                    filter: 'blur(30px)',
                    animation: 'pulse 4s ease-in-out infinite',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                    '50%': { opacity: 1, transform: 'scale(1.2)' },
                  },
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: `0 25px 60px ${alpha('#22c55e', 0.25)}`,
                    border: `2px solid ${alpha('#22c55e', 0.6)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 20px ${alpha('#22c55e', 0.3)}`,
                    }}>
                      <StarIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, flex: 1 }}>
                      Malaria AI Detection
                    </Typography>
                  </Box>
                  <Chip 
                    label="MOST PROUD PROJECT" 
                    size="medium" 
                    sx={{ 
                      bgcolor: '#22c55e', 
                      color: 'white', 
                      fontWeight: 700, 
                      mb: 3,
                      fontSize: '0.75rem',
                      letterSpacing: '0.5px',
                    }} 
                  />
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.9, mb: 3, fontWeight: 400 }}>
                    This is THE project I'm incredibly proud of. I solved a major problem in open-source malaria detection by building a <strong style={{ 
                      color: '#22c55e', 
                      fontWeight: 700,
                      background: alpha('#22c55e', 0.1),
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}>pipeline model combining YOLO, AAM, and CNN</strong>.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.8, mb: 3 }}>
                    First, it uses object detection to find red blood cells, then dives inside them to detect if they're infected. I self-learned tons of concepts while building this — and I made it in <strong style={{ color: '#22c55e' }}>first secondary year</strong>.
                  </Typography>
                  <Box sx={{
                    p: 2.5,
                    borderRadius: 3,
                    background: alpha('#22c55e', 0.08),
                    borderLeft: `4px solid #22c55e`,
                  }}>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary, fontSize: '0.95rem', lineHeight: 1.7 }}>
                      It's not just code — it's potentially life-saving technology that could make a real difference in underserved communities.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>

            {/* CS Club AI Agent */}
            <Fade in={isVisible} timeout={1600}>
              <Card
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                  backdropFilter: 'blur(40px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  borderRadius: 5,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: `0 25px 60px ${alpha(theme.palette.primary.main, 0.2)}`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}>
                      <GroupIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, flex: 1 }}>
                      CS Club AI Agent
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.9, mb: 3, fontWeight: 400 }}>
                    As <strong style={{ fontWeight: 700 }}>President of CS Club</strong>, we receive tons of applications with tight deadlines. So I built an <strong style={{ 
                      color: theme.palette.primary.main, 
                      fontWeight: 700,
                      background: alpha(theme.palette.primary.main, 0.1),
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}>AI agent that evaluates applications</strong> and detects if they're AI-generated or genuine.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                    It assesses applications against specific criteria and helps us manage 300+ members efficiently. Smart automation solving real problems.
                  </Typography>
                </CardContent>
              </Card>
            </Fade>

            {/* Oppy Startup */}
            <Fade in={isVisible} timeout={1800}>
              <Card
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                  backdropFilter: 'blur(40px)',
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  borderRadius: 5,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  },
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: `0 25px 60px ${alpha(theme.palette.secondary.main, 0.2)}`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.3)}`,
                    }}>
                      <RocketIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, flex: 1 }}>
                      Oppy Startup
                    </Typography>
                  </Box>
                  <Chip 
                    label="NON-PROFIT DREAM" 
                    size="medium" 
                    sx={{ 
                      bgcolor: alpha(theme.palette.secondary.main, 0.15),
                      color: theme.palette.secondary.main,
                      border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                      fontWeight: 700, 
                      mb: 3,
                      fontSize: '0.75rem',
                      letterSpacing: '0.5px',
                    }} 
                  />
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.9, mb: 3, fontWeight: 400 }}>
                    My dream non-profit startup. <strong style={{ 
                      color: theme.palette.secondary.main, 
                      fontWeight: 700,
                      background: alpha(theme.palette.secondary.main, 0.1),
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}>Oppy</strong> is an AI-integrated platform with RAG that learns about users — specifically high schoolers and undergrads seeking opportunities.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                    Through intelligent registration forms, it understands students and matches them with opportunities, helps them get accepted, and builds a supportive community. Making opportunities accessible for everyone.
                  </Typography>
                </CardContent>
              </Card>
            </Fade>

            {/* Future Goals */}
            <Fade in={isVisible} timeout={2000}>
              <Card
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                  backdropFilter: 'blur(40px)',
                  border: `1px solid ${alpha('#22c55e', 0.2)}`,
                  borderRadius: 5,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, #22c55e, #16a34a)`,
                  },
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: `0 25px 60px ${alpha('#22c55e', 0.2)}`,
                    border: `1px solid ${alpha('#22c55e', 0.4)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 20px ${alpha('#22c55e', 0.3)}`,
                    }}>
                      <SchoolIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, flex: 1 }}>
                      MBZUAI & Beyond
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.9, mb: 3, fontWeight: 400 }}>
                    I want to attend <strong style={{ 
                      color: '#22c55e', 
                      fontWeight: 700,
                      background: alpha('#22c55e', 0.1),
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}>MBZUAI</strong> — a university that empowers people like me to become more effective. I dream of being one of the people <strong style={{ fontWeight: 700 }}>leading AI innovation</strong> and helping introduce Artificial General Intelligence.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.8, mb: 3 }}>
                    MBZUAI offers everything: world-class labs, funding, brilliant professors — everything I need. Plus, I love the Emirates. They support innovators and have a clear vision for the future. I want to help shape the Middle East's tech future because we're late, but we can catch up.
                  </Typography>
                  <Box sx={{
                    p: 2.5,
                    borderRadius: 3,
                    background: alpha('#22c55e', 0.08),
                    borderLeft: `4px solid #22c55e`,
                  }}>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary, fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 600 }}>
                      Ultimate dream: Lead a youth startup from zero to unicorn status
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Box>

          {/* Fun Facts & Interests */}
          <Fade in={isVisible} timeout={2200}>
            <Box sx={{ mt: 10 }}>
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    mb: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    position: 'relative',
                    display: 'inline-block',
                    animation: 'gradient-shift 3s ease infinite',
                    '@keyframes gradient-shift': {
                      '0%, 100%': { filter: 'hue-rotate(0deg)' },
                      '50%': { filter: 'hue-rotate(20deg)' },
                    },
                  }}
                >
                  Beyond The Code
                </Typography>
                <Box sx={{
                  width: 120,
                  height: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  margin: '0 auto',
                  borderRadius: 2,
                }} />
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4, mb: 6 }}>
                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}>
                  <MovieIcon sx={{ fontSize: '3.5rem', color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Favorite Movie</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>Wolf of Wall Street</Typography>
                </Card>

                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${alpha('#22c55e', 0.15)}`,
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 40px ${alpha('#22c55e', 0.15)}`,
                    border: `1px solid ${alpha('#22c55e', 0.3)}`,
                  },
                }}>
                  <MusicIcon sx={{ fontSize: '3.5rem', color: '#22c55e', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Music</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>Egyptian Rap (Marwan Mousa)</Typography>
                </Card>

                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 40px ${alpha(theme.palette.secondary.main, 0.15)}`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                  },
                }}>
                  <BookIcon sx={{ fontSize: '3.5rem', color: theme.palette.secondary.main, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Favorite Book</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>Good to Great</Typography>
                </Card>

                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${alpha('#22c55e', 0.15)}`,
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 40px ${alpha('#22c55e', 0.15)}`,
                    border: `1px solid ${alpha('#22c55e', 0.3)}`,
                  },
                }}>
                  <SportsIcon sx={{ fontSize: '3.5rem', color: '#22c55e', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Physics Brawl</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>1st Place with CS skills</Typography>
                </Card>

                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}>
                  <StarIcon sx={{ fontSize: '3.5rem', color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>PUBG Legend</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>"El General" Conqueror</Typography>
                </Card>

                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 40px ${alpha(theme.palette.secondary.main, 0.15)}`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                  },
                }}>
                  <FireIcon sx={{ fontSize: '3.5rem', color: theme.palette.secondary.main, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Business Mind</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>Trading since 6th grade</Typography>
                </Card>
              </Box>

              <Card sx={{ 
                mb: 4, 
                p: 4, 
                borderRadius: 4, 
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                  : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                backdropFilter: 'blur(30px)',
                border: `2px solid ${alpha('#22c55e', 0.2)}`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, #22c55e, #16a34a)`,
                },
              }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: 'center' }}>
                  The Origin of "Geno"
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.9, textAlign: 'center', fontSize: '1.05rem' }}>
                  In 1st prep, I spent hours playing PUBG and reached <strong style={{ 
                    color: '#22c55e',
                    background: alpha('#22c55e', 0.1),
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 700,
                  }}>Conqueror rank</strong> with a high KD score. My nickname was "El General" — friends shortened it to <strong style={{ fontWeight: 700 }}>"Geno"</strong>, which means <em>"well-born"</em> or <em>"noble"</em> in Greek. Now everyone calls me that.
                </Typography>
              </Card>

              <Card sx={{ 
                p: 3.5, 
                borderRadius: 4, 
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.05)})`
                  : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: 'italic', textAlign: 'center', fontSize: '0.95rem' }}>
                  <strong style={{ fontWeight: 700 }}>Personal Quirk:</strong> I don't like anyone watching me code — I <em>can</em> code, but I don't feel comfortable. It's my focused zone.
                </Typography>
              </Card>
            </Box>
          </Fade>

          {/* Visual Story Section - Chapter II */}
          <AnimatedSection animation="fadeIn" sx={{ mt: 16, mb: 12 }}>
            {/* Chapter Divider */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Chip
                label="ACT II"
                sx={{
                  background: `linear-gradient(135deg, ${alpha('#22c55e', 0.15)}, ${alpha('#22c55e', 0.05)})`,
                  color: '#22c55e',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: `1px solid ${alpha('#22c55e', 0.3)}`,
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary}, #22c55e, #16a34a)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '4px',
                    background: `linear-gradient(90deg, transparent, #22c55e, transparent)`,
                    borderRadius: 2,
                  },
                }}
              >
                The Journey in Frames
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mt: 3,
                  maxWidth: '700px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontStyle: 'italic',
                }}
              >
                "Every line of code, every project, every late night — captured in moments that shaped the developer I am today"
              </Typography>
            </Box>

            {/* Modern Split View */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: { xs: 3, md: 4 },
                minHeight: '500px',
              }}
            >
              {/* Left - Community Building */}
              <Box
                sx={{
                  position: 'relative',
                  background: alpha('#22c55e', 0.03),
                  borderRadius: 3,
                  p: { xs: 4, md: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: alpha('#22c55e', 0.05),
                    transform: 'translateY(-4px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#22c55e',
                  },
                }}
              >
                <GroupIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: '#22c55e', 
                    mb: 3,
                    opacity: 0.9,
                  }} 
                />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    color: '#22c55e',
                  }}
                >
                  Building Together
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                  }}
                >
                  Leading CS Club, organizing hackathons with 200+ attendees, and creating a community where passionate developers learn and grow together.
                </Typography>
              </Box>

              {/* Right - The Craft */}
              <Box
                sx={{
                  position: 'relative',
                  background: alpha('#22c55e', 0.03),
                  borderRadius: 3,
                  p: { xs: 4, md: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: alpha('#22c55e', 0.05),
                    transform: 'translateY(-4px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#22c55e',
                  },
                }}
              >
                <CodeIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: '#22c55e', 
                    mb: 3,
                    opacity: 0.9,
                  }} 
                />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    color: '#22c55e',
                  }}
                >
                  The Craft
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                  }}
                >
                  Late nights debugging, building AI malaria detection, crafting solutions that matter. Where pure satisfaction meets making something work.
                </Typography>
              </Box>
            </Box>
          </AnimatedSection>

          <Fade in={isVisible} timeout={2400}>
            <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Want to know more? Let's chat.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<ChatIcon />}
                onClick={() => setChatOpen(true)}
                sx={{
                  background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                  color: 'white',
                  px: 6,
                  py: 2.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 4,
                  boxShadow: `0 10px 30px ${alpha('#22c55e', 0.35)}`,
                  textTransform: 'none',
                  '&:hover': {
                    background: `linear-gradient(135deg, #16a34a, #15803d)`,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 15px 45px ${alpha('#22c55e', 0.45)}`,
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Ask Geno's AI Anything
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Chatbot Dialog */}
      <Dialog
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.85)})`
              : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
            backdropFilter: 'blur(30px)',
            border: `1px solid ${alpha('#22c55e', 0.2)}`,
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ChatIcon sx={{ color: '#22c55e' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Chat with Geno's AI
            </Typography>
          </Box>
          <IconButton onClick={() => setChatOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ height: 400, overflowY: 'auto', p: 3 }}>
            {chatMessages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '75%',
                    p: 2,
                    borderRadius: 3,
                    background: msg.sender === 'user'
                      ? `linear-gradient(135deg, #22c55e, #16a34a)`
                      : alpha(theme.palette.background.default, 0.5),
                    color: msg.sender === 'user' ? 'white' : theme.palette.text.primary,
                    boxShadow: `0 4px 15px ${alpha(msg.sender === 'user' ? '#22c55e' : theme.palette.background.default, 0.2)}`,
                  }}
                >
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Box>
          
          <Box sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                placeholder="Ask me anything about Geno..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '&:hover fieldset': {
                      borderColor: '#22c55e',
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleChatSend}
                disabled={!chatInput.trim()}
                sx={{
                  background: `linear-gradient(135deg, #22c55e, #16a34a)`,
                  color: 'white',
                  '&:hover': {
                    background: `linear-gradient(135deg, #16a34a, #15803d)`,
                  },
                  '&:disabled': {
                    background: alpha(theme.palette.action.disabled, 0.1),
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default About;
