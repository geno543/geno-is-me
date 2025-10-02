import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Fade,
  Zoom,
  Button,
  Stack,
  alpha,
  Chip
} from '@mui/material';
import { 
  KeyboardArrowDown, 
  MusicNote, 
  Code, 
  Psychology, 
  Rocket,
  AutoAwesome,
  PlayArrow
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface CTAButton {
  text: string;
  href: string;
  variant: 'contained' | 'outlined' | 'text';
}

interface HeroProps {
  name: string;
  tagline: string;
  ctaButtons: CTAButton[];
  avatar: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ name, tagline, ctaButtons, avatar, backgroundImage }) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  // const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Typing animation state
  const [displayedName, setDisplayedName] = useState<string>('');
  const [displayedTagline, setDisplayedTagline] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [taglineTyping, setTaglineTyping] = useState<boolean>(false);
  
  // Animation states
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showFloatingElements, setShowFloatingElements] = useState<boolean>(false);
  
  const typewriterRef = useRef<HTMLSpanElement>(null);
  
  // Typing animation effect for name
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeNextCharacter = (): void => {
      if (currentIndex < name.length) {
        setDisplayedName(name.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, 100);
      } else {
        setIsTypingComplete(true);
        setTimeout(() => setTaglineTyping(true), 500);
      }
    };
    
    const startDelay = setTimeout(() => {
      typeNextCharacter();
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startDelay);
    };
  }, [name]);

  // Typing animation effect for tagline
  useEffect(() => {
    if (!taglineTyping) return;
    
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeNextCharacter = (): void => {
      if (currentIndex < tagline.length) {
        setDisplayedTagline(tagline.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, 30);
      } else {
        setTimeout(() => setShowCursor(false), 1500);
      }
    };
    
    typeNextCharacter();
    
    return () => clearTimeout(timeoutId);
  }, [taglineTyping, tagline]);
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Initial fade-in animation
  useEffect(() => {
    setIsVisible(true);
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    const floatingTimer = setTimeout(() => {
      setShowFloatingElements(true);
    }, 2000);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(floatingTimer);
    };
  }, []);
  
  // Scroll to next section
  const scrollToNext = (): void => {
    const nextSection = document.getElementById('about') || document.getElementById('main-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Floating icons data - removed for modern design
  /*const floatingIcons = [
    { icon: <Code />, delay: 0, position: { top: '15%', right: '10%' } },
    { icon: <Psychology />, delay: 200, position: { top: '25%', left: '8%' } },
    { icon: <Rocket />, delay: 400, position: { bottom: '30%', right: '15%' } },
    { icon: <AutoAwesome />, delay: 800, position: { top: '50%', right: '5%' } },
  ];*/
  
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%), 
            radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 40%)
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Floating icons removed for modern clean design */}

        <Fade in={isVisible} timeout={1000}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 6, sm: 8, md: 12 },
              textAlign: { xs: 'center', md: 'left' },
              py: { xs: 8, sm: 10, md: 12 },
              px: { xs: 3, sm: 4, md: 2 },
              minHeight: { xs: 'calc(100vh - 100px)', md: '80vh' },
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Avatar Section */}
            <Zoom in={showContent} timeout={800}>
              <Box
                sx={{
                  position: 'relative',
                  order: { xs: 1, md: 2 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 280, sm: 320, md: 380, lg: 420 },
                    height: { xs: 280, sm: 320, md: 380, lg: 420 },
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, 
                      ${alpha(theme.palette.primary.main, 0.1)}, 
                      ${alpha(theme.palette.secondary.main, 0.08)})`,
                    backdropFilter: 'blur(30px)',
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: `conic-gradient(from 0deg, 
                        transparent, 
                        ${alpha(theme.palette.primary.main, 0.1)}, 
                        transparent, 
                        ${alpha(theme.palette.secondary.main, 0.1)}, 
                        transparent)`,
                      animation: 'rotate 20s linear infinite',
                      '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: '4px',
                      borderRadius: '50%',
                      background: theme.palette.background.default,
                      zIndex: 1,
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={avatar}
                    alt="Profile Avatar"
                    sx={{
                      width: '85%',
                      height: '85%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      position: 'relative',
                      zIndex: 2,
                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.1))',
                    }}
                  />
                </Box>
              </Box>
            </Zoom>

            {/* Content Section */}
            <Box
              sx={{
                flex: 1,
                order: { xs: 2, md: 1 },
                maxWidth: { xs: '100%', md: '600px' },
              }}
            >
              <Fade in={showContent} timeout={1200}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}
                  >
                    From Phone Coding to AI Innovation
                  </Typography>
                  
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      mb: 3,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.text.primary}, 
                        ${theme.palette.primary.main})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {displayedName}
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: '3px',
                        height: '1em',
                        backgroundColor: theme.palette.primary.main,
                        ml: 0.5,
                        verticalAlign: 'middle',
                        opacity: showCursor ? 1 : 0,
                        transition: 'opacity 0.1s ease',
                        animation: showCursor ? 'blink 1s infinite' : 'none',
                        '@keyframes blink': {
                          '0%, 50%': { opacity: 1 },
                          '51%, 100%': { opacity: 0 },
                        },
                      }}
                    />
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: theme.palette.text.secondary,
                      mb: 4,
                      maxWidth: '90%',
                    }}
                  >
                    {displayedTagline}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
                    {['AI Developer', 'Algorithm Enthusiast', 'CS Club Leader'].map((tag, index) => (
                      <Fade key={tag} in={taglineTyping} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                        <Chip
                          label={tag}
                          sx={{
                            background: `linear-gradient(135deg, 
                              ${alpha(theme.palette.primary.main, 0.1)}, 
                              ${alpha(theme.palette.secondary.main, 0.08)})`,
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                            },
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </Fade>
                    ))}
                  </Stack>
                </Box>
              </Fade>

              <Zoom in={taglineTyping} timeout={1000}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ 
                    alignItems: { xs: 'stretch', sm: 'center' },
                    '& > *': { minWidth: { xs: 'auto', sm: '140px' } }
                  }}
                >
                  {ctaButtons.map((button, index) => (
                    <Button
                      key={button.text}
                      component={Link}
                      to={button.href}
                      variant={button.variant}
                      size="large"
                      startIcon={index === 0 ? <PlayArrow /> : undefined}
                      sx={{
                        py: 1.5,
                        px: 3,
                        borderRadius: 3,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        ...(button.variant === 'contained' && {
                          background: `linear-gradient(135deg, 
                            ${theme.palette.primary.main}, 
                            ${theme.palette.primary.dark})`,
                          boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                          },
                        }),
                        ...(button.variant === 'outlined' && {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          backdropFilter: 'blur(10px)',
                          background: alpha(theme.palette.primary.main, 0.05),
                          '&:hover': {
                            background: alpha(theme.palette.primary.main, 0.1),
                            transform: 'translateY(-2px)',
                          },
                        }),
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {button.text}
                    </Button>
                  ))}
                </Stack>
              </Zoom>
            </Box>
          </Box>
        </Fade>

        {/* Scroll Indicator */}
        <Fade in={taglineTyping} timeout={1500}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 30,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <IconButton
              onClick={scrollToNext}
              sx={{
                color: theme.palette.primary.main,
                background: alpha(theme.palette.primary.main, 0.1),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-10px)' },
                  '60%': { transform: 'translateY(-5px)' },
                },
              }}
            >
              <KeyboardArrowDown />
            </IconButton>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Hero;