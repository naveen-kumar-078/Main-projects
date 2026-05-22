import { Project, Skill } from './types';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Learning Platform',
    description: 'A comprehensive online learning system with course management, student progress tracking, and interactive quizzes.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    imageUrl: 'https://picsum.photos/seed/learning/800/600',
  },
  {
    id: '2',
    title: 'Smart Portfolio Builder',
    description: 'An automated tool for students to generate professional portfolios based on their academic achievements and skills.',
    technologies: ['TypeScript', 'Next.js', 'Firebase', 'Motion'],
    imageUrl: 'https://picsum.photos/seed/portfolio/800/600',
  },
  {
    id: '3',
    title: 'Campus Event Manager',
    description: 'A real-time event management system for university campuses, allowing students to discover and register for events.',
    technologies: ['React Native', 'GraphQL', 'PostgreSQL'],
    imageUrl: 'https://picsum.photos/seed/events/800/600',
  }
];

export const DEFAULT_SKILLS: Skill[] = [
  { name: 'Web Development', level: 90 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Data Analysis', level: 75 },
  { name: 'Project Management', level: 80 },
  { name: 'Technical Writing', level: 70 },
];
