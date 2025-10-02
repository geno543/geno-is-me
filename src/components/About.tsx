import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Button,
  Chip,
  useTheme,
  alpha,
  Collapse,
} from '@mui/material';
import {
  School as SchoolIcon,
  Code as CodeIcon,
  Group as GroupIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

// Type definitions
interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AboutProps {
  bio?: string;
  achievements?: Achievement[];
  interests?: string[];
  timeline?: TimelineItem[];
}

const About: React.FC<AboutProps> = ({ 
  bio = "I'm the kid who learned to code on a phone for 4 years because my brother broke my laptop. Started at age 6 in an internet café, mesmerized by that bright screen. Now I'm building AI that detects malaria, organizing Egypt's largest hackathons (200+ attendees!), and leading 300+ students as CS Club President. My dream? MBZUAI → AGI leadership → making the Middle East proud in tech.",
  achievements = [
    { icon: <CodeIcon />, title: "6 Sports Mastered", description: "Football, Swimming, Basketball, Karate (won prizes!), Calisthenics, Running" },
    { icon: <GroupIcon />, title: "Egyptian Rap Fan", description: "Marwan Pablo, Afroto, Mousv - music = focus" },
    { icon: <SchoolIcon />, title: "Physics Brawl Winner", description: "1st place using CS skills, not physics!" },
    { icon: <PsychologyIcon />, title: "'Geno' Origin", description: "PUBG Conqueror (Top 500) - 'El General' nickname" }
  ],
  interests = ['Malaria AI Pipeline', 'CS Club AI Agent', 'Oppy Non-Profit Dream', 'Green Color Obsession', 'Trading Since 6th Grade', 'Good to Great Book'],
  timeline = [
    { year: 'Childhood', title: 'Sports Explorer', description: 'Tried 6 sports, learned from each - Karate prizes!' },
    { year: 'Phone Era', title: 'Mobile Coder', description: '4 years coding on phone after laptop broke' },
    { year: 'Now', title: 'Impact Maker', description: '50+ projects, 300+ students, 200+ hackathon attendees' },
    { year: 'Next', title: 'MBZUAI Bound', description: 'AGI research, Oppy startup, unicorn dreams' }
  ]
}) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showMore, setShowMore] = useState<boolean>(false);
  // const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const bioCardRef = useRef<HTMLDivElement>(null);
  // const timelineRef = useRef<HTMLDivElement>(null);

  // GSAP Dynamic Import and Animations
  useEffect(() => {
    const loadGSAP = async (): Promise<void> => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Bio card animation
        if (bioCardRef.current) {
          gsap.fromTo('.bio-card', 
            { scale: 0.8, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 1,
              scrollTrigger: {
                trigger: '.bio-card',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Timeline animations
        gsap.fromTo('.timeline-item',
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: '.timeline-container',
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Achievement cards animation
        gsap.fromTo('.achievement-card',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.achievements-container',
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );

      } catch (error) {
        console.warn('GSAP not available:', error);
      }
    };

    loadGSAP();
  }, []);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (target.id) {
              // setVisibleItems(prev => new Set([...prev, target.id]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-observe]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // const handleBioToggle = (): void => {
  //   setExpandedBio(!expandedBio);
  // };

  // const shortBio = bio.length > 150 ? bio.substring(0, 150) + '...' : bio;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Meet Geno
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Phone coder → Sports explorer → CS leader → AGI dreamer
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 4 }}>
        {/* Bio Section */}
        <Box>
          <Card
            ref={bioCardRef}
            className="bio-card"
            data-observe
            id="bio-card"
            sx={{
              height: '100%',
              background: theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  G
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                    Mohamed² Ramadan
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    The kid who coded on a phone → Now building the future
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  color: theme.palette.text.primary,
                  mb: 3
                }}
              >
                {bio}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {interests.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
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
                ))}
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Show Less' : 'Learn More'}
              </Button>

              <Collapse in={showMore}>
                <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: theme.palette.text.secondary, mb: 2 }}>
                    <strong>Why I love trying new things:</strong> From childhood, I explored 6 different sports - each taught me something unique. Football = teamwork. Swimming = discipline. Karate = focus (and prizes!). This "try everything" mindset is why I organize hackathons, build AI agents, teach 300+ students, and dream of unicorn startups.
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: theme.palette.text.secondary }}>
                    <strong>My quirk?</strong> I don't like people watching me code - it's my focused zone. Also, I'm obsessed with green (notice the theme?), love Egyptian rap while coding, and believe Wolf of Wall Street perfectly captures entrepreneurial spirit. Currently reading Marcus Aurelius' Meditations for that stoic grounding.
                  </Typography>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Box>

        {/* Achievements Section */}
        <Box>
          <Box className="achievements-container">
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              Beyond the Code
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {achievements.map((achievement, index) => (
                <Box key={index}>
                  <Card
                    className="achievement-card"
                    data-observe
                    id={`achievement-${index}`}
                    sx={{
                      background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                        : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        borderColor: alpha(theme.palette.primary.main, 0.4),
                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box
                          sx={{
                            color: theme.palette.primary.main,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {achievement.icon}
                        </Box>
                        <Typography variant="h6" component="h3" fontSize="1rem">
                          {achievement.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 4 }}
                      >
                        {achievement.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Timeline Section */}
        <Box>
          <Box className="timeline-container" sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}
            >
              <TimelineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              My Journey
            </Typography>
            
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 3 }}>
              {timeline.map((item, index) => (
                <Box key={index}>
                  <Card
                    className="timeline-item"
                    data-observe
                    id={`timeline-${index}`}
                    sx={{
                      height: '100%',
                      background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                        : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: alpha(theme.palette.primary.main, 0.4),
                        boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                        '&::before': {
                          transform: 'scale(1.1)',
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        transition: 'transform 0.3s ease',
                        zIndex: 1,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          letterSpacing: 1
                        }}
                      >
                        {item.year}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ my: 1, fontWeight: 600 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
