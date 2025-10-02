import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Chip,
  TextField,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  InputAdornment,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Code as CodeIcon,
  Psychology as AIIcon,
  Web as WebIcon,
  Engineering as RoboticsIcon,
  Groups as LeadershipIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';

// Type definitions
interface Skill {
  name: string;
  category: string;
  level: number; // 1-5 star rating
  projects?: string[];
}

type CategoryType = 'All' | 'AI/ML' | 'Web Dev' | 'Leadership' | 'Robotics';

interface SkillsProps {
  skills?: Skill[];
  categories?: CategoryType[];
  showSearch?: boolean;
  maxSkillsPerCategory?: number;
}

interface CategoryColors {
  [key: string]: string;
}

interface CategoryIcons {
  [key: string]: React.ComponentType<any>;
}

const Skills: React.FC<SkillsProps> = ({
  skills = [],
  categories = ['All', 'AI/ML', 'Web Dev', 'Leadership', 'Robotics'],
  showSearch = true,
  maxSkillsPerCategory = 20
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Category colors
  const categoryColors: CategoryColors = {
    'AI/ML': theme.palette.primary.main,
    'Web Dev': theme.palette.secondary.main,
    'Leadership': theme.palette.success.main,
    'Robotics': theme.palette.warning.main,
    'All': theme.palette.info.main
  };

  // Category icons
  const categoryIcons: CategoryIcons = {
    'AI/ML': AIIcon,
    'Web Dev': WebIcon,
    'Leadership': LeadershipIcon,
    'Robotics': RoboticsIcon,
    'All': CodeIcon
  };

  // Filter skills based on category and search term
  const filteredSkills = useMemo(() => {
    let filtered = skills;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(skill => skill.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(searchLower) ||
        skill.category.toLowerCase().includes(searchLower) ||
        (skill.projects && skill.projects.some(project => 
          project.toLowerCase().includes(searchLower)
        ))
      );
    }
    
    // Limit skills per category for performance
    return filtered.slice(0, maxSkillsPerCategory);
  }, [skills, selectedCategory, searchTerm, maxSkillsPerCategory]);

  // Render skill level stars
  const renderStars = (level: number): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      const StarComponent = i <= level ? StarIcon : StarBorderIcon;
      stars.push(
        <StarComponent
          key={i}
          sx={{
            fontSize: '1rem',
            color: i <= level ? theme.palette.warning.main : theme.palette.action.disabled,
            transition: 'color 0.2s ease'
          }}
        />
      );
    }
    
    return stars;
  };

  // Clear search
  const clearSearch = (): void => {
    setSearchTerm('');
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          My Arsenal
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          From phone coding to AI agents – every skill earned through real projects, not just tutorials
        </Typography>
      </Box>

      {/* Search Bar */}
      {showSearch && (
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills..."
            variant="outlined"
            sx={{
              width: { xs: '100%', md: '400px' },
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                color: theme.palette.text.primary,
                '& fieldset': {
                  borderColor: theme.palette.divider
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.text.secondary
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main
                }
              },
              '& .MuiInputBase-input::placeholder': {
                color: theme.palette.text.disabled
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.text.disabled }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <ClearIcon
                    sx={{
                      color: theme.palette.text.disabled,
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.text.primary
                      }
                    }}
                    onClick={clearSearch}
                  />
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}

      {/* Category Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
        {categories.map((category) => {
          const IconComponent = categoryIcons[category] || CodeIcon;
          return (
            <Chip
              key={category}
              label={category}
              icon={<IconComponent />}
              onClick={() => setSelectedCategory(category)}
              sx={{
                backgroundColor: selectedCategory === category 
                  ? categoryColors[category] 
                  : theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.08)',
                color: selectedCategory === category 
                  ? theme.palette.primary.contrastText 
                  : theme.palette.text.primary,
                fontWeight: selectedCategory === category ? 'bold' : 'normal',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${selectedCategory === category 
                  ? categoryColors[category] 
                  : theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: categoryColors[category],
                  color: theme.palette.primary.contrastText,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${categoryColors[category]}40`
                }
              }}
            />
          );
        })}
      </Box>

      {/* Skills Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${skill.name}-${index}`}>
              <Card
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                sx={{
                  height: '100%',
                  background: theme.palette.mode === 'dark' 
                    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: hoveredSkill === skill.name ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredSkill === skill.name 
                    ? `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`
                    : theme.shadows[2],
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip
                      label={skill.category}
                      size="small"
                      sx={{
                        backgroundColor: categoryColors[skill.category],
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    {skill.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, mr: 1 }}
                    >
                      Level:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {renderStars(skill.level)}
                    </Box>
                  </Box>
                  
                  {skill.projects && skill.projects.length > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.85rem'
                      }}
                    >
                      Projects: {skill.projects.join(', ')}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 2
                }}
              >
                No skills found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.disabled
                }}
              >
                Try adjusting your search or category filter
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Skills Summary */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '1.1rem'
          }}
        >
          Showing {filteredSkills.length} of {skills.length} skills
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Skills;