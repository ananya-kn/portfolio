export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  gradient?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 'project-1',
    title: 'TruthLens',
    description: "An AI-powered deception detection pipeline that transcribes, analyzes, and cross-examines candidate audio testimonies to surface contradictions and identify the most plausible truth.",
    image: '/images/truthlens.png',
    technologies: ['Whisper', 'LangGraph', 'Gemini', 'Pydantic', 'Python'],
    githubUrl: 'https://github.com/ananya-kn/TruthLens',
    gradient: 'from-purple-600 to-indigo-800'
  },
  {
    id: 'project-2',
    title: 'CartPilot',
    description: "A conversational AI checkout concierge built for the Razorpay AI Buildathon 2026, featuring merchant-rule-capped discount logic, a JWT-gated audit trail, and a vanilla JS frontend. Deployed on Render.",
    image: '/images/cartpilot.png',
    technologies: ['Node.js', 'Express.js', 'JWT', 'JavaScript', 'Render'],
    githubUrl: 'https://github.com/ananya-kn/CartPilot',
    gradient: 'from-teal-500 to-emerald-700'
  },
  {
    id: 'project-3',
    title: 'TactiTrack-C2',
    description: "A real-time military command dashboard for unit tracking, with WebSocket-based live GPS updates every 3 seconds. Implements Dijkstra's algorithm for optimal routing with ETA, plus JWT-based Commander/Operator role access control.",
    image: '/images/tactitrack.png',
    technologies: ['Node.js', 'Socket.IO', 'MongoDB', 'Leaflet.js', 'JWT', 'Dijkstra\'s Algorithm'],
    githubUrl: 'https://github.com/ananya-kn/TactiTrack-C2',
    gradient: 'from-lime-600 to-green-800'
  },
  {
    id: 'project-4',
    title: 'DevMind AI',
    description: "A full-stack TypeScript application featuring AI integration, real-time updates, and a REST API backed by PostgreSQL, built with a clean, modular component architecture for long-term maintainability.",
    image: '/images/devmindai.png',
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'REST API'],
    githubUrl: 'https://github.com/ananya-kn/devmind-ai',
    gradient: 'from-red-500 to-orange-700'
  },
  {
    id: 'project-5',
    title: 'Outpro India — Marketing Website',
    description: "A production marketing website with dynamic service pages, a contact form API route, and a Mailchimp-integrated newsletter signup, plus CRM lead-forwarding for HubSpot and Zoho.",
    image: '/images/outproindia.png',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    githubUrl: 'https://github.com/ananya-kn/outproIndia',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'project-6',
    title: 'Survey Response Score Modeling',
    description: "Modeled survey response scores using demographic and psychometric factors, applying data cleaning, feature analysis, and statistical modeling in Python.",
    image: '/images/surveymodel.png',
    technologies: ['Python', 'Jupyter Notebook', 'Data Analysis'],
    githubUrl: 'https://github.com/ananya-kn/Survey-response-score-modeling-using-demographic-and-psychometric-factors',
    gradient: 'from-cyan-600 to-teal-800'
  }
];
