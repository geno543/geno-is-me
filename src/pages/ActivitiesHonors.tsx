import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Chip,
  Fade,
  useTheme,
  alpha,
  Zoom,
  Tabs,
  Tab,
  Stack,
  Avatar,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
  Rocket as RocketIcon,
  AutoAwesome,
  Star,
  LocalFireDepartment as FireIcon,
  Lightbulb,
  EmojiObjects,
  CardGiftcard,
  Celebration,
  WorkspacePremium,
  MilitaryTech,
} from '@mui/icons-material';
import { ThemeContext } from '../App';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition';
import ParticleField from '../components/ParticleField';
import MorphingShape from '../components/MorphingShape';

// Type definitions
interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: 'Competition' | 'Leadership' | 'Academic' | 'Community';
  impact: string;
  skills: string[];
  icon: React.ReactElement;
  featured: boolean;
}

interface Activity {
  id: number;
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
  category: 'Leadership' | 'Research' | 'Teaching' | 'Development';
  icon: React.ReactElement;
  ongoing: boolean;
}

type TabValue = 'all' | 'activities' | 'honors' | 'timeline';

const activities: Activity[] = [
  {
    id: 1,
    title: "STEM Computer Science Club",
    role: "President",
    organization: "STEM High School Egypt",
    period: "2023 - Present",
    description: "Leading 300+ members and 30 mentors, organizing online camps and comprehensive learning tracks covering AI, web development, and competitive programming.",
    achievements: [
      "Managing 300+ active members and coordinating 30 mentors",
      "Organized multiple online camps and learning tracks",
      "Established offline and online educational programs",
      "Delivered 30+ sessions on advanced AI topics (GANs, transformers, LLMs)",
      "Created comprehensive curriculum for all skill levels"
    ],
    category: "Leadership",
    icon: <GroupIcon />,
    ongoing: true
  },
  {
    id: 2,
    title: "STEM Egypt Business Club",
    role: "President",
    organization: "STEM High School Egypt",
    period: "2023 - Present",
    description: "Teaching key concepts in finance, entrepreneurship, and business leadership to empower student entrepreneurs.",
    achievements: [
      "Led tutorials and workshops on finance and entrepreneurship",
      "Taught business strategy and leadership principles",
      "Mentored students in business planning and execution",
      "Organized entrepreneurship competitions and events",
      "Built strong business community within STEM school"
    ],
    category: "Leadership",
    icon: <GroupIcon />,
    ongoing: true
  },
  {
    id: 3,
    title: "Ebhath Research",
    role: "Chief Technology Officer (CTO)",
    organization: "Ebhath Research",
    period: "2023 - Present",
    description: "Directing technical development and innovation initiatives across multiple interdisciplinary research projects.",
    achievements: [
      "Overseeing technical strategy for all research projects",
      "Managing technology infrastructure and development teams",
      "Implementing innovative solutions for research challenges",
      "Coordinating cross-functional research initiatives",
      "Driving technological advancement in research methodologies"
    ],
    category: "Leadership",
    icon: <PsychologyIcon />,
    ongoing: true
  },
  {
    id: 4,
    title: "STEM Model United Nations (MUN)",
    role: "Chief Technology Officer (CTO)",
    organization: "STEM Egypt MUN",
    period: "2023 - Present",
    description: "Managing technical operations, IT infrastructure, digital platforms, and all technology systems for MUN conferences and events.",
    achievements: [
      "Built and maintained conference management platforms",
      "Managed IT operations for multiple conferences",
      "Developed digital solutions for delegate engagement",
      "Coordinated technical support teams",
      "Ensured seamless technology integration for events"
    ],
    category: "Leadership",
    icon: <CodeIcon />,
    ongoing: true
  },
  {
    id: 5,
    title: "Egyptian Olympiad in Computational Science (EOCS)",
    role: "Founder & Organizer",
    organization: "EUI University Partnership",
    period: "2024",
    description: "Established Egypt's first computational science olympiad for high school students at EUI University, partnering with academic institutions.",
    achievements: [
      "Created first-of-its-kind computational science olympiad in Egypt",
      "Partnered with EUI University for academic credibility",
      "Designed comprehensive competition structure and problems",
      "Attracted participants from across Egypt",
      "Established model for future computational olympiads"
    ],
    category: "Leadership",
    icon: <RocketIcon />,
    ongoing: false
  },
  {
    id: 6,
    title: "Scrapyard Hackcation",
    role: "Founder & Organizer",
    organization: "Independent Initiative",
    period: "2024",
    description: "Created and managed Egypt's largest high school computer science hackathon with 200+ participants, focusing on innovation and problem-solving.",
    achievements: [
      "Organized hackathon with 200+ high school participants",
      "Secured sponsorships and partnerships",
      "Coordinated mentors and judges",
      "Managed technical infrastructure and platforms",
      "Set new standard for high school hackathons in Egypt"
    ],
    category: "Leadership",
    icon: <RocketIcon />,
    ongoing: false
  },
  {
    id: 7,
    title: "Daydream Giza Hackathon",
    role: "Founder & Organizer",
    organization: "Independent Initiative",
    period: "2024",
    description: "Organized Egypt's largest high school game development hackathon with 150+ participants, focusing on creative game design and development.",
    achievements: [
      "Managed 150+ participants in game development competition",
      "Created specialized tracks for different skill levels",
      "Coordinated game development mentors and industry experts",
      "Showcased student talent in game development",
      "Built thriving game development community"
    ],
    category: "Leadership",
    icon: <RocketIcon />,
    ongoing: false
  },
  {
    id: 8,
    title: "TELQAI Program",
    role: "Founder",
    organization: "Independent Initiative",
    period: "2024 - Present",
    description: "Launched Egypt's first free program dedicated to AI, automation, and autonomous agent education, making advanced AI accessible to all students.",
    achievements: [
      "Created comprehensive AI curriculum covering modern topics",
      "Provided free education in AI and autonomous agents",
      "Taught automation and AI agent development",
      "Made cutting-edge AI education accessible",
      "Built community of AI learners and practitioners"
    ],
    category: "Teaching",
    icon: <PsychologyIcon />,
    ongoing: true
  },
  {
    id: 9,
    title: "Quanstra Social Platform",
    role: "Co-founder",
    organization: "Quanstra",
    period: "2023 - Present",
    description: "Built and managed social media platform making physics concepts accessible and engaging for students through interactive content.",
    achievements: [
      "Developed full-stack social media platform",
      "Created engaging physics content for students",
      "Built active community of physics enthusiasts",
      "Managed platform growth and user engagement",
      "Made complex physics concepts accessible and fun"
    ],
    category: "Development",
    icon: <CodeIcon />,
    ongoing: true
  },
  {
    id: 10,
    title: "Phiga Competition",
    role: "Webmaster & Co-founder",
    organization: "Phiga",
    period: "2023 - Present",
    description: "Designed innovative physics competition structured as engaging problem-solving game, combining education with gamification.",
    achievements: [
      "Built competition website and platform",
      "Designed gamified physics problem-solving format",
      "Managed technical infrastructure",
      "Created engaging user experience",
      "Attracted physics students nationwide"
    ],
    category: "Development",
    icon: <CodeIcon />,
    ongoing: true
  },
  {
    id: 11,
    title: "MORSE Program",
    role: "Co-founder",
    organization: "Student Research Initiative",
    period: "2023 - Present",
    description: "Developed student-led research program focused on ROS (Robot Operating System) and robotics technologies, advancing robotics education.",
    achievements: [
      "Created comprehensive ROS curriculum",
      "Led hands-on robotics workshops",
      "Directed ROS track as Head of ROS Track in STEM Robotics Club",
      "Mentored students in robotics projects",
      "Advanced robotics education in Egyptian schools"
    ],
    category: "Research",
    icon: <PsychologyIcon />,
    ongoing: true
  },
  {
    id: 12,
    title: "STEM Egypt Hack Club",
    role: "App Development Mentor",
    organization: "STEM High School Egypt",
    period: "2023 - Present",
    description: "Conducting 20+ hands-on workshops teaching Flutter app development, helping students build real-world mobile applications.",
    achievements: [
      "Delivered 20+ Flutter development workshops",
      "Taught mobile app development fundamentals",
      "Guided students through building complete apps",
      "Created practical hands-on learning experiences",
      "Built strong mobile development community"
    ],
    category: "Teaching",
    icon: <CodeIcon />,
    ongoing: true
  },
  {
    id: 13,
    title: "STEM Biology Club",
    role: "Web Developer & Webmaster",
    organization: "STEM High School Egypt",
    period: "2023 - Present",
    description: "Designed and maintained digital platforms; co-organized BioLeague, one of Egypt's largest online biology competitions for high school students.",
    achievements: [
      "Developed and maintained club website",
      "Co-organized BioLeague competition",
      "Managed online competition platform",
      "Supported Egypt's largest high school biology competition",
      "Integrated technology with biology education"
    ],
    category: "Development",
    icon: <CodeIcon />,
    ongoing: true
  },
  {
    id: 14,
    title: "Resala-Abuhammad NGO",
    role: "Web Developer & Webmaster",
    organization: "Resala Charity",
    period: "2023 - Present",
    description: "Developed and maintained NGO's digital presence to support community initiatives and charitable work.",
    achievements: [
      "Built and maintained NGO website",
      "Improved digital outreach and engagement",
      "Supported community service initiatives",
      "Enhanced online donation and volunteer systems",
      "Strengthened NGO's digital presence"
    ],
    category: "Development",
    icon: <CodeIcon />,
    ongoing: true
  },
  {
    id: 15,
    title: "Software Engineering Intern",
    role: "Paid Intern",
    organization: "Novomind",
    period: "2024",
    description: "Completed paid software engineering internship, contributing to real-world projects and gaining industry experience.",
    achievements: [
      "Contributed to production software projects",
      "Gained hands-on industry experience",
      "Worked with professional development teams",
      "Applied software engineering best practices",
      "Delivered quality code for client projects"
    ],
    category: "Development",
    icon: <CodeIcon />,
    ongoing: false
  },
  {
    id: 16,
    title: "AI Agent Developer",
    role: "Developer",
    organization: "DamaCreativ",
    period: "2024 - Present",
    description: "Currently building AI-powered autonomous agent solutions, working on cutting-edge AI agent technology.",
    achievements: [
      "Developing autonomous AI agent systems",
      "Implementing advanced AI architectures",
      "Building production-ready AI solutions",
      "Working with latest AI agent frameworks",
      "Contributing to AI agent innovation"
    ],
    category: "Development",
    icon: <PsychologyIcon />,
    ongoing: true
  },
  {
    id: 17,
    title: "Portfolio Development",
    role: "Independent Developer",
    organization: "Personal Projects",
    period: "2020 - Present",
    description: "Developed 50+ projects in AI, web, and app development. Active on GitHub with diverse project portfolio showcasing technical versatility.",
    achievements: [
      "Built 50+ projects across multiple domains",
      "Active GitHub presence: github.com/geno543",
      "Expertise in AI, web, and mobile development",
      "Open-source contributions and collaborations",
      "Continuous learning and skill development"
    ],
    category: "Development",
    icon: <CodeIcon />,
    ongoing: true
  }
];

const honors: Achievement[] = [
  {
    id: 1,
    title: "Gold Medal in Robotics",
    organization: "EISTF Competition",
    date: "2024",
    description: "Achieved gold medal in national robotics competition, demonstrating excellence in robotics engineering and innovation.",
    category: "Competition",
    impact: "National recognition in robotics excellence",
    skills: ["Robotics", "Engineering", "Innovation"],
    icon: <MilitaryTech />,
    featured: true
  },
  {
    id: 2,
    title: "Top 50 Finalist & 12th in Qualifications",
    organization: "ECPC Teens Division",
    date: "2024",
    description: "Ranked 12th in online qualifications out of 700+ competitors and advanced to Top 50 out of 350 finalists in competitive programming.",
    category: "Competition",
    impact: "Elite performance in Egypt's premier programming competition",
    skills: ["Algorithms", "Problem Solving", "Competitive Programming"],
    icon: <TrophyIcon />,
    featured: true
  },
  {
    id: 3,
    title: "Gabarti Scholar",
    organization: "Gabarti Scholarship Program",
    date: "2024",
    description: "Accepted as Gabarti Scholar for talented tech students with only 2% acceptance rate, recognizing exceptional potential in technology.",
    category: "Academic",
    impact: "Elite scholarship for Egypt's top tech talent",
    skills: ["Academic Excellence", "Technology", "Leadership"],
    icon: <WorkspacePremium />,
    featured: true
  },
  {
    id: 4,
    title: "7th Place - Meta Hack Hackathon",
    organization: "Meta Hack",
    date: "2024",
    description: "Placed 7th out of 100 teams in intensive hackathon, developing innovative solutions under time constraints.",
    category: "Competition",
    impact: "Top 10% performance in major hackathon",
    skills: ["Hackathon", "Innovation", "Team Collaboration"],
    icon: <Star />,
    featured: false
  },
  {
    id: 5,
    title: "1st Place - Build in a Box Camp",
    organization: "Build in a Box (ALA)",
    date: "2024",
    description: "First place winner in intensive entrepreneurship and leadership camp, showcasing business acumen and innovation.",
    category: "Competition",
    impact: "Top performer in entrepreneurship competition",
    skills: ["Entrepreneurship", "Leadership", "Business Strategy"],
    icon: <Celebration />,
    featured: false
  },
  {
    id: 6,
    title: "4th Place - Zpreneurs Competition",
    organization: "Zpreneurs",
    date: "2024",
    description: "Secured 4th place in entrepreneurship competition, demonstrating strong business and innovation skills.",
    category: "Competition",
    impact: "Top tier performance in entrepreneurship",
    skills: ["Entrepreneurship", "Innovation", "Pitching"],
    icon: <EmojiObjects />,
    featured: false
  },
  {
    id: 7,
    title: "IEEE IC-SIT Finalist",
    organization: "IEEE International Conference",
    date: "2024",
    description: "Selected as finalist among 300+ teams in IEEE International Conference on Smart and Innovative Technologies.",
    category: "Competition",
    impact: "International recognition in technology innovation",
    skills: ["Research", "Innovation", "Technology"],
    icon: <Star />,
    featured: false
  },
  {
    id: 8,
    title: "IoT & AI Challenge - Top 10 Finalist",
    organization: "17 September Competition",
    date: "2024",
    description: "Achieved top 10 finalist position in IoT and AI challenge, still competing for final placement.",
    category: "Competition",
    impact: "Elite performance in IoT and AI innovation",
    skills: ["IoT", "AI/ML", "Innovation"],
    icon: <CardGiftcard />,
    featured: false
  },
  {
    id: 9,
    title: "5th Place - AI in Biological Sciences",
    organization: "ASRT Egypt",
    date: "2024",
    description: "5th place in National Competition for AI Applications in Biological Sciences, organized by Academy of Scientific Research and Technology under National Committee for Biological Sciences patronage.",
    category: "Academic",
    impact: "National recognition in interdisciplinary AI research",
    skills: ["AI/ML", "Biological Sciences", "Research"],
    icon: <SchoolIcon />,
    featured: false
  },
  {
    id: 10,
    title: "Bertelsmann Scholarship",
    organization: "Bertelsmann Foundation",
    date: "2024",
    description: "Awarded prestigious Bertelsmann Scholarship in Generative AI, recognizing potential in cutting-edge AI technologies.",
    category: "Academic",
    impact: "International scholarship in Generative AI",
    skills: ["Generative AI", "Machine Learning", "Research"],
    icon: <WorkspacePremium />,
    featured: false
  }
];

// Combined timeline data
const timelineData = [
  ...activities.map(a => ({ ...a, type: 'activity' as const })),
  ...honors.map(h => ({ ...h, type: 'honor' as const }))
].sort((a, b) => {
  const dateA = a.type === 'activity' ? a.period.split(' - ')[0] : a.date;
  const dateB = b.type === 'activity' ? b.period.split(' - ')[0] : b.date;
  return new Date(dateB).getTime() - new Date(dateA).getTime();
});

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ActivitiesHonors: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext) as ThemeContextType;
  const theme = useTheme();
  
  const [selectedTab, setSelectedTab] = useState<TabValue>('all');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Activities & Honors - Mohamed^2 Ramadan Portfolio';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore my achievements, leadership roles, and community impact. From CS Club leadership to AI research and hackathon victories.');
    }
  }, []);

  // Animation effects
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Floating icons removed for modern clean design
  // const floatingIcons = [];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue): void => {
    setSelectedTab(newValue);
  };

  const getCategoryColor = (category: string): 'primary' | 'secondary' | 'success' | 'warning' => {
    switch (category) {
      case 'Leadership': return 'primary';
      case 'Research': return 'secondary';
      case 'Teaching': return 'success';
      case 'Development': return 'warning';
      case 'Competition': return 'primary';
      case 'Academic': return 'secondary';
      case 'Community': return 'success';
      default: return 'primary';
    }
  };

  const filteredActivities = activities;
  const filteredHonors = honors;

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
              radial-gradient(circle at 30% 20%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 50%), 
              radial-gradient(circle at 70% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 40%)
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
          {/* Header Section */}
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                Journey & Achievements
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
                Activities & Honors
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary,
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                From sports fields to tech stages — a journey of endless exploration
              </Typography>
            </Box>
          </Fade>

          {/* New Section: The Explorer Mindset */}
          <Fade in={isVisible} timeout={1200}>
            <Box sx={{ mb: 8 }}>
              <Card
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.85)})`
                    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                  backdropFilter: 'blur(40px)',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  borderRadius: 5,
                  p: { xs: 3, md: 5 },
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    backgroundSize: '200% auto',
                    animation: 'gradient-flow 3s linear infinite',
                    '@keyframes gradient-flow': {
                      '0%': { backgroundPosition: '0% center' },
                      '100%': { backgroundPosition: '200% center' },
                    },
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }}
                  >
                    <Lightbulb sx={{ fontSize: '2.5rem' }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                      The Explorer Mindset
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                      Always trying, always learning, always growing
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.9, mb: 3 }}>
                  <strong style={{ color: theme.palette.primary.main, fontSize: '1.2rem' }}>I love trying new things.</strong> It's in my DNA. From childhood, I've never been afraid to explore different worlds, challenge myself, and extract valuable lessons from every experience.
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: alpha(theme.palette.primary.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    mb: 3,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FireIcon sx={{ color: theme.palette.primary.main }} />
                    My Sports Journey: 6 Disciplines, Endless Lessons
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                    During my childhood, I threw myself into <strong style={{ color: theme.palette.primary.main }}>six different sports</strong>: Football, Swimming, Basketball, Karate, Calisthenics, and Running. Each one taught me something unique:
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2, mt: 3 }}>
                    {[
                      { sport: 'Football', skill: 'Teamwork & Strategy', IconComponent: GroupIcon, color: theme.palette.primary.main },
                      { sport: 'Swimming', skill: 'Discipline & Breathing', IconComponent: AutoAwesome, color: theme.palette.secondary.main },
                      { sport: 'Basketball', skill: 'Coordination & Timing', IconComponent: Star, color: theme.palette.primary.main },
                      { sport: 'Karate', skill: 'Focus & Self-Defense', IconComponent: MilitaryTech, color: '#d84315' },
                      { sport: 'Calisthenics', skill: 'Body Control & Strength', IconComponent: FireIcon, color: theme.palette.secondary.main },
                      { sport: 'Running', skill: 'Endurance & Mental Toughness', IconComponent: RocketIcon, color: theme.palette.primary.main },
                    ].map((item, index) => (
                      <Zoom key={item.sport} in timeout={1400 + index * 100}>
                        <Card
                          sx={{
                            p: 2.5,
                            background: theme.palette.mode === 'dark'
                              ? alpha(theme.palette.background.paper, 0.6)
                              : alpha(theme.palette.background.paper, 0.9),
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            borderRadius: 3,
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: '3px',
                              background: `linear-gradient(90deg, ${item.color}, ${alpha(item.color, 0.5)})`,
                              transform: 'scaleX(0)',
                              transformOrigin: 'left',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover': {
                              transform: 'translateY(-5px) scale(1.05)',
                              boxShadow: `0 12px 30px ${alpha(item.color, 0.25)}`,
                              border: `1px solid ${alpha(item.color, 0.4)}`,
                              '&::before': {
                                transform: 'scaleX(1)',
                              },
                            },
                          }}
                        >
                          <Box sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${item.color}, ${alpha(item.color, 0.7)})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            mb: 2,
                            boxShadow: `0 8px 20px ${alpha(item.color, 0.3)}`,
                          }}>
                            <item.IconComponent sx={{ fontSize: '2rem', color: 'white' }} />
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center' }}>
                            {item.sport}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.6 }}>
                            {item.skill}
                          </Typography>
                        </Card>
                      </Zoom>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrophyIcon sx={{ color: theme.palette.secondary.main }} />
                    Karate Achievement: Earning My Stripes
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    Among all these sports, <strong style={{ color: theme.palette.secondary.main }}>Karate stood out</strong>. I didn't just practice — I competed and <strong>won prizes</strong>. Those medals taught me that dedication and hard work always pay off. This competitive spirit and hunger for excellence carried into everything I do today.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 3,
                    background: alpha(theme.palette.primary.main, 0.05),
                    borderLeft: `5px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.primary.main }}>
                    Why This Matters for My Tech Journey
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    This love for exploring new domains is <em>exactly why</em> I thrive in technology and leadership. Whether it's learning a new programming language, organizing a 200-person hackathon, mastering AI agents, or leading 300+ students in CS Club — <strong style={{ color: theme.palette.primary.main }}>I approach every challenge like a new sport to master</strong>. Extract the skills, compete fiercely, and never stop growing.
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Fade>

          {/* Tab Navigation */}
          <Zoom in={isVisible} timeout={1200}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.background.paper, 0.8)}, 
                    ${alpha(theme.palette.background.paper, 0.6)})`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  borderRadius: 3,
                  p: 1,
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: 1.5,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  },
                }}
              >
                <Tab label="All" value="all" />
                <Tab label="Activities" value="activities" />
                <Tab label="Honors & Awards" value="honors" />
                <Tab label="Timeline" value="timeline" />
              </Tabs>
            </Box>
          </Zoom>

          {/* Content Sections */}
          <Box sx={{ minHeight: '60vh' }}>
            {/* All Section */}
            {selectedTab === 'all' && (
              <>
                {/* Featured Honors */}
                <Fade in timeout={1000}>
                  <Box sx={{ mb: 8 }}>
                    <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrophyIcon sx={{ color: theme.palette.primary.main }} />
                      Featured Achievements
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                      {honors.filter(h => h.featured).map((honor, index) => (
                        <Box key={honor.id}>
                          <Fade in timeout={1200 + index * 200}>
                            <Card
                              sx={{
                                height: '100%',
                                background: `linear-gradient(135deg, 
                                  ${alpha(theme.palette.primary.main, 0.1)}, 
                                  ${alpha(theme.palette.secondary.main, 0.05)})`,
                                backdropFilter: 'blur(20px)',
                                border: `2px solid ${theme.palette.primary.main}`,
                                borderRadius: 3,
                                position: 'relative',
                                overflow: 'visible',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-8px)',
                                  boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: -20,
                                  left: 20,
                                  width: 60,
                                  height: 60,
                                  borderRadius: '50%',
                                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                }}
                              >
                                {honor.icon}
                              </Box>
                              <CardContent sx={{ pt: 6, pb: 3 }}>
                                <Chip
                                  label={honor.category}
                                  size="small"
                                  color={getCategoryColor(honor.category)}
                                  sx={{ mb: 2 }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                  {honor.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  {honor.organization} • {honor.date}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                                  {honor.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {honor.skills.slice(0, 3).map((skill) => (
                                    <Chip
                                      key={skill}
                                      label={skill}
                                      size="small"
                                      variant="outlined"
                                      sx={{ fontSize: '0.7rem' }}
                                    />
                                  ))}
                                </Box>
                              </CardContent>
                            </Card>
                          </Fade>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>

                {/* Current Activities */}
                <Fade in timeout={1400}>
                  <Box>
                    <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RocketIcon sx={{ color: theme.palette.primary.main }} />
                      Current Activities
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                      {activities.filter(a => a.ongoing).map((activity, index) => (
                        <Box key={activity.id}>
                          <Fade in timeout={1600 + index * 200}>
                            <Card
                              sx={{
                                height: '100%',
                                background: theme.palette.mode === 'dark'
                                  ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                                  : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                borderRadius: 3,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
                                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                },
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                  <Avatar
                                    sx={{
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                      color: theme.palette.primary.main,
                                      width: 50,
                                      height: 50,
                                    }}
                                  >
                                    {activity.icon}
                                  </Avatar>
                                  <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                      {activity.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {activity.role} • {activity.organization}
                                    </Typography>
                                  </Box>
                                  <Chip
                                    label="Ongoing"
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                  />
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  {activity.period}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                                  {activity.description}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                  Key Achievements:
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                  {activity.achievements.slice(0, 3).map((achievement, idx) => (
                                    <Typography
                                      key={idx}
                                      component="li"
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ mb: 0.5 }}
                                    >
                                      {achievement}
                                    </Typography>
                                  ))}
                                </Box>
                              </CardContent>
                            </Card>
                          </Fade>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>
              </>
            )}

            {/* Activities Section */}
            {selectedTab === 'activities' && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                {filteredActivities.map((activity, index) => (
                  <Box key={activity.id}>
                    <Fade in timeout={800 + index * 150}>
                      <Card
                        sx={{
                          height: '100%',
                          background: theme.palette.mode === 'dark'
                            ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                            : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                          backdropFilter: 'blur(20px)',
                          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                          borderRadius: 3,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                width: 50,
                                height: 50,
                              }}
                            >
                              {activity.icon}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {activity.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {activity.role} • {activity.organization}
                              </Typography>
                            </Box>
                            {activity.ongoing && (
                              <Chip
                                label="Ongoing"
                                color="success"
                                size="small"
                                sx={{ fontWeight: 600 }}
                              />
                            )}
                          </Stack>
                          <Chip
                            label={activity.category}
                            size="small"
                            color={getCategoryColor(activity.category)}
                            sx={{ mb: 2 }}
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {activity.period}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                            {activity.description}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Key Achievements:
                          </Typography>
                          <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                            {activity.achievements.map((achievement, idx) => (
                              <Typography
                                key={idx}
                                component="li"
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 0.5 }}
                              >
                                {achievement}
                              </Typography>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Box>
                ))}
              </Box>
            )}

            {/* Honors Section */}
            {selectedTab === 'honors' && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
                {filteredHonors.map((honor, index) => (
                  <Box key={honor.id}>
                    <Fade in timeout={800 + index * 150}>
                      <Card
                        sx={{
                          height: '100%',
                          background: honor.featured
                            ? `linear-gradient(135deg, 
                                ${alpha(theme.palette.primary.main, 0.1)}, 
                                ${alpha(theme.palette.secondary.main, 0.05)})`
                            : theme.palette.mode === 'dark'
                            ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`
                            : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.8)})`,
                          backdropFilter: 'blur(20px)',
                          border: honor.featured
                            ? `2px solid ${theme.palette.primary.main}`
                            : `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                          borderRadius: 3,
                          position: 'relative',
                          overflow: 'visible',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
                          },
                        }}
                      >
                        {honor.featured && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -20,
                              left: 20,
                              width: 55,
                              height: 55,
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                            }}
                          >
                            {honor.icon}
                          </Box>
                        )}
                        <CardContent sx={{ pt: honor.featured ? 5 : 3, pb: 3 }}>
                          <Chip
                            label={honor.category}
                            size="small"
                            color={getCategoryColor(honor.category)}
                            sx={{ mb: 2 }}
                          />
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {honor.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {honor.organization} • {honor.date}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                            {honor.description}
                          </Typography>
                          <Typography variant="caption" color="primary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                            Impact: {honor.impact}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {honor.skills.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Box>
                ))}
              </Box>
            )}

            {/* Timeline Section */}
            {selectedTab === 'timeline' && (
              <Fade in timeout={1000}>
                <Box
                  sx={{
                    maxWidth: 900,
                    mx: 'auto',
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)}, ${alpha(theme.palette.background.paper, 0.4)})`
                      : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    borderRadius: 3,
                    p: { xs: 2, md: 4 },
                  }}
                >
                  <Timeline position="alternate">
                    {timelineData.slice(0, 10).map((item, index) => (
                      <TimelineItem key={`${item.type}-${item.id}`}>
                        <TimelineOppositeContent color="text.secondary">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.type === 'activity' ? item.period : item.date}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              border: `2px solid ${theme.palette.primary.main}`,
                              p: 1,
                            }}
                          >
                            {item.icon}
                          </TimelineDot>
                          {index < timelineData.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Card
                            sx={{
                              background: `linear-gradient(135deg, 
                                ${alpha(theme.palette.background.paper, 0.9)}, 
                                ${alpha(theme.palette.background.paper, 0.7)})`,
                              backdropFilter: 'blur(10px)',
                              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                              },
                            }}
                          >
                            <CardContent sx={{ p: 2 }}>
                              <Chip
                                label={item.type === 'activity' ? item.category : item.category}
                                size="small"
                                color={getCategoryColor(item.type === 'activity' ? item.category : item.category)}
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {item.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {item.organization}
                              </Typography>
                              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                {item.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Box>
              </Fade>
            )}
          </Box>

          {/* Stats Section */}
          <Fade in={isVisible} timeout={1800}>
            <Box
              sx={{
                mt: 8,
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, 
                  ${alpha(theme.palette.primary.main, 0.1)}, 
                  ${alpha(theme.palette.secondary.main, 0.05)})`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, mb: 4 }}>
                Impact by Numbers
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                {[
                  { label: 'Leadership Roles', value: '10+', icon: <GroupIcon /> },
                  { label: 'Awards & Honors', value: '10+', icon: <TrophyIcon /> },
                  { label: 'Students Impacted', value: '500+', icon: <SchoolIcon /> },
                  { label: 'Projects Built', value: '50+', icon: <FireIcon /> },
                ].map((stat, index) => (
                  <Box key={stat.label}>
                    <Zoom in timeout={2000 + index * 200}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            color: 'white',
                            mb: 2,
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Zoom>
                  </Box>
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default ActivitiesHonors;
