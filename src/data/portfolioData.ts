export interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "Game Dev" | "AI & Systems" | "Mobile";
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  location: string;
  highlights: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  badge?: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  about: string[];
  stats: { label: string; value: string }[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: Project[];
  achievements: AchievementItem[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    location: string;
    availability: string;
  };
}

export const portfolioData: PortfolioData = {
  name: "Md Arafat Anowar",
  role: "Full Stack Engineer & Game Developer",
  tagline: "Bridging architectural web systems and interactive game experiences.",
  about: [
    "I'm a passionate Software Engineer and East West University student with a drive for building high-performance web applications, interactive digital worlds, and scalable software architectures.",
    "My focus spans modern web ecosystems (Next.js, React, Node.js, TypeScript), 2D/3D interactive game development (Phaser 3, WebGL, Canvas), and elegant user experiences with pixel-perfect attention to detail.",
    "When I'm not coding, you'll find me exploring computer graphics algorithms, game mechanics, and competitive programming."
  ],
  stats: [
    { label: "University", value: "East West University" },
    { label: "Major", value: "Computer Science & Engineering" },
    { label: "Focus", value: "Full Stack & Interactive Systems" },
    { label: "Location", value: "Dhaka, Bangladesh" },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "East West University (EWU)",
      period: "2022 — Present",
      location: "Aftabnagar, Dhaka",
      highlights: [
        "Focus on Data Structures, Algorithms, Software Engineering, and Database Management.",
        "Active member of EWU Computer Programming Club & Tech Community.",
        "Collaborated on academic team projects and hackathons."
      ],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Science Division",
      period: "2019 — 2021",
      location: "Dhaka, Bangladesh",
      highlights: [
        "Specialized in Physics, Chemistry, and Higher Mathematics.",
        "Graduated with top academic standing."
      ],
    },
  ],
  skills: [
    {
      title: "Frontend & UI/UX",
      skills: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript / JavaScript", level: 92 },
        { name: "Tailwind CSS & PostCSS", level: 90 },
        { name: "HTML5 Canvas & WebGL", level: 85 },
      ],
    },
    {
      title: "Game Engines & Interactive",
      skills: [
        { name: "Phaser 3 Engine", level: 90 },
        { name: "Pixel Art & Sprite Design", level: 85 },
        { name: "Tilemap Architecture", level: 88 },
        { name: "Game State & Physics", level: 86 },
      ],
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: "Node.js / Express", level: 88 },
        { name: "REST APIs & GraphQL", level: 85 },
        { name: "PostgreSQL & MongoDB", level: 82 },
        { name: "Firebase / Supabase", level: 84 },
      ],
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git & GitHub", level: 92 },
        { name: "Vercel & Docker", level: 84 },
        { name: "Webpack & Vite", level: 82 },
        { name: "Figma & UI Design", level: 80 },
      ],
    },
  ],
  projects: [
    {
      id: "ewu-rpg-portfolio",
      title: "Arafat's Dev World — EWU RPG Portfolio",
      category: "Game Dev",
      description: "An authentic top-down 2D pixel-art RPG developer portfolio based on the architectural blueprint of East West University Aftabnagar campus.",
      tags: ["Next.js", "Phaser 3", "TypeScript", "Tailwind CSS", "Canvas API"],
      featured: true,
      githubUrl: "https://github.com/arafat-anowar/Portfolio",
      metrics: "60 FPS Canvas rendering, Custom 16-bit tilesets",
    },
    {
      id: "nexus-dev-ecosystem",
      title: "Nexus Collaborative Developer Platform",
      category: "Full Stack",
      description: "Full-stack real-time collaboration suite with collaborative code editors, live audio rooms, and team project management.",
      tags: ["Next.js 14", "WebSockets", "Node.js", "PostgreSQL", "Tailwind"],
      featured: true,
      githubUrl: "https://github.com/arafat-anowar",
      metrics: "Sub-50ms sync latency, 500+ active sessions",
    },
    {
      id: "ai-code-companion",
      title: "OmniCode AI Workflow Assistant",
      category: "AI & Systems",
      description: "Context-aware AI developer companion that analyzes git diffs, generates smart test suites, and provides interactive architectural reviews.",
      tags: ["TypeScript", "Python", "FastAPI", "Vector DB", "LLM APIs"],
      featured: true,
      githubUrl: "https://github.com/arafat-anowar",
      metrics: "94% test pass accuracy across 50 repos",
    },
    {
      id: "pixel-dungeon-roguelike",
      title: "Chambers of Aftabnagar: Roguelike",
      category: "Game Dev",
      description: "Procedural retro roguelike game featuring tile-based pathfinding, enemy AI state machines, inventory mechanics, and dynamic lighting.",
      tags: ["Phaser 3", "TypeScript", "A* Pathfinding", "Procedural Gen"],
      featured: false,
      githubUrl: "https://github.com/arafat-anowar",
      metrics: "Over 10,000 runs generated",
    },
  ],
  achievements: [
    {
      title: "Best Interactive Web Application",
      organization: "EWU Tech Carnival & Hackathon",
      year: "2024",
      description: "Won 1st prize for building a real-time gamified university campus explorer and student portal.",
      badge: "1st Place 🏆",
    },
    {
      title: "Dean's List of Academic Excellence",
      organization: "East West University",
      year: "2023 - 2024",
      description: "Maintained distinguished academic performance in Computer Science & Engineering coursework.",
      badge: "Honors ⭐",
    },
    {
      title: "Top 5% Competitive Programmer",
      organization: "National Inter-University Contest",
      year: "2023",
      description: "Solved advanced algorithmic challenges involving dynamic programming, graphs, and combinatorics.",
      badge: "Finalist 🎖️",
    },
    {
      title: "Open Source Contributor Award",
      organization: "Global Dev Community",
      year: "2024",
      description: "Contributed multiple bug fixes and enhancements to open source web game and developer tooling repositories.",
      badge: "Contributor 🚀",
    },
  ],
  contact: {
    email: "arafat-anowar@outlook.com",
    github: "https://github.com/arafat-anowar",
    linkedin: "https://linkedin.com/in/arafat-anowar",
    twitter: "https://twitter.com/arafat_anowar",
    location: "Aftabnagar, Dhaka, Bangladesh",
    availability: "Open to Full Stack & Software Engineering opportunities",
  },
};
