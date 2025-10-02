import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  IconButton,
  Link as MuiLink,
  Snackbar,
  Alert,
  useTheme,
  alpha,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  GitHub,
  LinkedIn,
  Twitter,
  Send,
  CheckCircle,
} from '@mui/icons-material';
import { ThemeContext } from '../App';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition';
import ParticleField from '../components/ParticleField';
import MorphingShape from '../components/MorphingShape';

// Type definitions
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface ContactInfo {
  icon: React.ComponentType;
  title: string;
  value: string;
  href?: string;
}

interface SocialLink {
  icon: React.ComponentType;
  name: string;
  url: string;
  color: string;
}

const Contact: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  // Animation states
  // const [showFloatingElements, setShowFloatingElements] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Contact - Mohamed^2 Ramadan | Get In Touch';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with Mohamed Ramadan - AI Developer and Software Engineer. Let\'s discuss your next project or collaboration opportunity.');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Contact, Mohamed Ramadan, AI Developer, Software Engineer, Collaboration, Projects');
    }
  }, []);

  // Floating animation keyframes - removed for modern design
  // const floatAnimation = keyframes`
  //   0%, 100% { transform: translateY(0px) rotate(0deg); }
  //   25% { transform: translateY(-10px) rotate(2deg); }
  //   50% { transform: translateY(-5px) rotate(-1deg); }
  //   75% { transform: translateY(-15px) rotate(1deg); }
  // `;

  // const pulseAnimation = keyframes`
  //   0%, 100% { opacity: 0.6; transform: scale(1); }
  //   50% { opacity: 1; transform: scale(1.1); }
  // `;

  // Floating icons data - removed for modern design
  /*const floatingIcons = [
    { icon: ConnectWithoutContact, top: '15%', left: '10%', delay: '0s', color: theme.palette.primary.main },
    { icon: Message, top: '25%', right: '15%', delay: '1s', color: theme.palette.secondary.main },
    { icon: ContactMail, top: '45%', left: '8%', delay: '2s', color: theme.palette.primary.main },
    { icon: Forum, top: '65%', right: '12%', delay: '3s', color: theme.palette.secondary.main },
    { icon: Chat, top: '80%', left: '15%', delay: '4s', color: theme.palette.primary.main },
    { icon: QuestionAnswer, top: '35%', right: '8%', delay: '5s', color: theme.palette.secondary.main },
  ];*/

  // Contact information
  const contactInfo: ContactInfo[] = [
    {
      icon: Email,
      title: 'Email',
      value: 'mohamed.ramadan@example.com',
      href: 'mailto:mohamed.ramadan@example.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+20 123 456 7890',
      href: 'tel:+201234567890',
    },
    {
      icon: LocationOn,
      title: 'Location',
      value: 'Cairo, Egypt',
    },
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      icon: GitHub,
      name: 'GitHub',
      url: 'https://github.com/mohamedramadan',
      color: '#333',
    },
    {
      icon: LinkedIn,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mohamedramadan',
      color: '#0077B5',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: 'https://twitter.com/mohamedramadan',
      color: '#1DA1F2',
    },
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'error',
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address.',
        severity: 'error',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: 'Message received! I\'ll hit you back soon – probably after my PUBG match 🎮',
        severity: 'success',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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
        sx={{
          minHeight: '100vh',
          pt: { xs: 10, sm: 12 },
          pb: 6,
          position: 'relative',
          overflow: 'hidden',
          background: isDarkMode
            ? `
              radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
              linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)
            `
            : `
              radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 50%),
              linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)
            `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <g fill="${alpha(theme.palette.primary.main, 0.03)}" fill-opacity="0.4">
                    <circle cx="30" cy="30" r="2"/>
                    <path d="M30 0v60M0 30h60" stroke="${alpha(theme.palette.primary.main, 0.05)}" stroke-width="0.5"/>
                  </g>
                </g>
              </svg>
            `,
            backgroundSize: '60px 60px',
            opacity: isDarkMode ? 0.4 : 0.2,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Floating icons removed for modern clean design */}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Header Section */}
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}
              >
                Let's Connect
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  lineHeight: 1.1,
                }}
              >
                Get In Touch
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                  maxWidth: '650px',
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                Want to build the next big thing? From malaria AI to AGI dreams – let's create impact together!
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
            {/* Contact Form */}
            <Box>
              <Zoom in timeout={1000}>
                <Card
                  sx={{
                    background: isDarkMode
                      ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                      : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                    backdropFilter: 'blur(30px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderRadius: 4,
                    p: 4,
                    boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.08)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: 'text.primary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                        }}
                      >
                        <Send sx={{ color: theme.palette.primary.main }} />
                        Send Message
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                        Drop me a message! Whether it's a project idea, collaboration, or just want to talk AI and tech
                      </Typography>
                    </Box>
                    
                    <Box component="form" onSubmit={handleSubmit}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                        <Box>
                          <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                            }}
                          />
                        </Box>
                        <Box>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ mt: 3 }}>
                          <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                            }}
                          />
                      </Box>
                      <Box sx={{ mt: 3 }}>
                          <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            multiline
                            rows={6}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                              },
                            }}
                          />
                      </Box>
                      <Box sx={{ mt: 3 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CheckCircle /> : <Send />}
                            sx={{
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              color: 'white',
                              px: 4,
                              py: 1.5,
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              borderRadius: 2,
                              textTransform: 'none',
                              '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                              },
                              '&:disabled': {
                                background: alpha(theme.palette.primary.main, 0.5),
                                color: 'white',
                              },
                            }}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Box>

            {/* Contact Information */}
            <Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Contact Info Cards */}
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Zoom in timeout={1200 + index * 200} key={info.title}>
                      <Card
                        sx={{
                          background: isDarkMode
                            ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                            : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                          backdropFilter: 'blur(30px)',
                          border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                          borderRadius: 3,
                          p: 3,
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
                            transform: 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 0.3s ease',
                          },
                          '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            '&::before': {
                              transform: 'scaleX(1)',
                            },
                          },
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              color: 'white',
                            }}
                          >
                            <IconComponent />
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {info.title}
                            </Typography>
                            {info.href ? (
                              <MuiLink
                                href={info.href}
                                sx={{
                                  color: 'text.secondary',
                                  textDecoration: 'none',
                                  '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                  },
                                }}
                              >
                                {info.value}
                              </MuiLink>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                {info.value}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Card>
                    </Zoom>
                  );
                })}

                {/* Social Media Links */}
                <Zoom in timeout={1800}>
                  <Card
                    sx={{
                      background: isDarkMode
                        ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
                        : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                      backdropFilter: 'blur(30px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                      borderRadius: 3,
                      p: 3,
                      boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.08)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 15px 50px ${alpha(theme.palette.primary.main, 0.12)}`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Find Me Online
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                          <IconButton
                            key={social.name}
                            component="a"
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: 'text.secondary',
                              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                              borderRadius: 2,
                              '&:hover': {
                                color: social.color,
                                borderColor: social.color,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 15px ${alpha(social.color, 0.3)}`,
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <IconComponent />
                          </IconButton>
                        );
                      })}
                    </Box>
                  </Card>
                </Zoom>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageTransition>
  );
};

export default Contact;