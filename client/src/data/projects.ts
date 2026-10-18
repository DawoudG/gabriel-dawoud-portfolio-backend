// -----------------------------------------------------------------------------
// projects.ts — single source of truth for project data.
// -----------------------------------------------------------------------------
import projectDashboardImage from '../assets/project-dashboard.svg';
import projectMobileImage from '../assets/project-mobile.svg';
import projectApiImage from '../assets/project-api.svg';

export type Project = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  role: string;
  outcome: string;
  description: string[];
  techStack: string[];
  timeline: string;
  liveUrl?: string;
  repoUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'house-price-prediction',
    title: 'House Price Prediction System',
    image: projectDashboardImage,
    imageAlt: 'Placeholder illustration of housing data and a price prediction chart',
    role:
      'I completed the project individually and handled the full development of the system, including organizing the program into modular components and implementing the prediction workflow.',
    outcome:
      'Created a working modular prediction system that can load housing data, process it, train a model, evaluate the results, and make house price predictions.',
    description: [
      'Developed an individual house price prediction system using Python. The project was organized into separate components for data loading, preprocessing, model training, evaluation, and prediction.'
    ],
    techStack: ['Python', 'Data preprocessing', 'Model training', 'Prediction'],
    timeline: 'Academic project'
  },
  {
    id: 'appointment-scheduling',
    title: 'Online Appointment Scheduling & Management System',
    image: projectMobileImage,
    imageAlt: 'Placeholder illustration of an appointment scheduling interface',
    role:
      'I contributed to all major parts of the software requirements and design process, including software requirements, use cases, sequence diagrams, CRC cards, and class diagrams.',
    outcome:
      'Produced a complete software design and requirements package that showed how patients, providers, and administrators could interact with the appointment scheduling system.',
    description: [
      'Worked on a team project to design an online appointment scheduling and management system.'
    ],
    techStack: [
      'Software requirements',
      'Use cases',
      'Sequence diagrams',
      'CRC cards',
      'Class diagrams'
    ],
    timeline: 'Academic team project'
  },
  {
    id: 'watches-database',
    title: 'Watches and Smart Watches Database Project',
    image: projectApiImage,
    imageAlt: 'Placeholder illustration of a connected relational database',
    role:
      'I contributed to all major parts of the database project, including normalization, table design, primary and foreign keys, relationships, and SQL queries.',
    outcome:
      'Created a normalized relational database structure with multiple connected tables and working SQL queries for managing watches, customers, orders, vendors, and related information.',
    description: [
      'Worked on a team project to design a relational database for a watches and smart watches system using Oracle and SQL.'
    ],
    techStack: ['Oracle', 'SQL', 'Relational database design', 'Normalization'],
    timeline: 'Academic team project'
  }
];
