import React from 'react';
import { Box, Typography, Container, useTheme, alpha } from '@mui/material';
import ScrollReveal from './ScrollReveal';

interface StorySectionProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  children?: React.ReactNode;
}

const StorySection: React.FC<StorySectionProps> = ({
  title,
  subtitle,
  description,
  image,
  imagePosition = 'right',
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 15 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at ${
            imagePosition === 'left' ? '20%' : '80%'
          } 50%, ${alpha(theme.palette.primary.main, 0.05)}, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: imagePosition === 'left' ? 'row' : 'row-reverse',
            },
            alignItems: 'center',
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* Content Side */}
          <Box sx={{ flex: 1 }}>
            <ScrollReveal direction="left" delay={100}>
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  mb: 2,
                  display: 'block',
                }}
              >
                {subtitle}
              </Typography>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 900,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={300}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                  mb: 4,
                }}
              >
                {description}
              </Typography>
            </ScrollReveal>

            {children}
          </Box>

          {/* Image Side */}
          {image && (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <ScrollReveal direction={imagePosition === 'left' ? 'right' : 'left'} delay={200}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 500,
                    aspectRatio: '1',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}, transparent)`,
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Box>
              </ScrollReveal>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default StorySection;
