import { Layout, Code, Palette, Plug, Smartphone, Rocket, GitBranch } from 'lucide-react'

export const userData = {
  name: 'MD Delowar Hossain',
  title: 'Junior Web Developer',
  location: 'Bangladesh',
  email: 'mdhossain2437@gmail.com',
  phone: '+8801315123134',
  bio: `I am a passionate Junior Web Developer with a strong foundation in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript (ES6), React, and API integration. I am eager to expand my skills, particularly in React.js, and gain hands-on experience in real-world projects. I thrive in problem-solving environments, enjoy working both independently and collaboratively, and am always keen to learn new technologies.`,
  education: [
    {
      degree: 'Higher Secondary Certificate (HSC)',
      field: 'Humanities',
      year: '2024'
    }
  ],
  languages: [
    { name: 'Bengali', level: 'Native' },
    { name: 'English', level: 'Proficient in written and basic spoken communication' }
  ],
  socialLinks: {
    github: '#',
    linkedin: '#',
    twitter: '#'
  }
}

export const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A fully responsive and modern portfolio website to showcase my skills and projects. Features clean design, smooth animations, and mobile-friendly layout.',
    image: 'https://source.unsplash.com/user/erondu/800x600?tech,web',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    features: ['Responsive Design', 'Modern UI', 'Bootstrap'],
    liveLink: '#',
    githubLink: '#',
    completed: true
  },
  {
    id: 2,
    title: 'Product Landing Page',
    description: 'A visually appealing product landing page with smooth animations and a mobile-friendly design. Focuses on conversion optimization and user experience.',
    image: 'https://source.unsplash.com/user/erondu/800x600?product,web',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
    features: ['Tailwind CSS', 'Animations', 'Mobile-friendly'],
    liveLink: '#',
    githubLink: '#',
    completed: true
  },
  {
    id: 3,
    title: 'Blog Website UI',
    description: 'Developed a responsive and user-friendly blog interface with a clean and intuitive design.',
    image: 'https://source.unsplash.com/user/erondu/800x600?blog,web',
    technologies: ['HTML', 'CSS', 'Tailwind CSS'],
    features: ['Clean UI', 'Responsive Design', 'Blog Layout'],
    liveLink: '#',
    githubLink: '#',
    completed: true
  },
  {
    id: 4,
    title: 'Weather Application',
    description: 'A weather application that fetches real-time weather data using an API and displays it in an interactive UI. Features location-based weather and forecasts.',
    image: 'https://source.unsplash.com/user/erondu/800x600?weather,app',
    technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    features: ['REST API', 'JavaScript', 'Dynamic UI'],
    liveLink: '#',
    githubLink: '#',
    completed: true
  },
  {
    id: 5,
    title: 'E-commerce Homepage Clone',
    description: 'Designed a replica of an e-commerce homepage, implementing modern UI elements and responsiveness.',
    image: 'https://source.unsplash.com/user/erondu/800x600?ecommerce,shop',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
    features: ['E-commerce UI', 'Product Cards', 'Shopping Cart'],
    liveLink: '#',
    githubLink: '#',
    completed: true
  }
]

export const services = [
  {
    id: 1,
    title: 'Custom UI Design',
    description: 'Create visually appealing and intuitive user interfaces that engage visitors and improve usability.',
    icon: 'Layout',
    tools: ['Figma', 'Adobe XD', 'Prototyping']
  },
  {
    id: 2,
    title: 'Frontend Development',
    description: 'Build responsive, interactive, and high-performance websites and web applications with modern technologies.',
    icon: 'Code',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'React']
  },
  {
    id: 3,
    title: 'REST API Integration',
    description: 'Connect your frontend to backend services by implementing seamless API integrations for data exchange.',
    icon: 'Plug',
    tools: ['REST API', 'JSON', 'Fetch', 'Axios']
  },
  {
    id: 4,
    title: 'Responsive Layout',
    description: 'Ensure your website looks and functions perfectly across all devices and screen sizes.',
    icon: 'Smartphone',
    tools: ['Mobile-first', 'Tailwind CSS', 'Bootstrap', 'Flexbox']
  },
  {
    id: 5,
    title: 'Modern UI Styling',
    description: 'Implement sleek, modern aesthetics with CSS frameworks for visually stunning, maintainable designs.',
    icon: 'Palette',
    tools: ['Tailwind CSS', 'CSS3', 'Animations']
  },
  {
    id: 6,
    title: 'Version Control',
    description: 'Manage code changes efficiently and collaborate effectively with Git and GitHub.',
    icon: 'GitBranch',
    tools: ['Git', 'GitHub', 'Branching']
  }
]

export const timeline = [
  {
    year: '2022',
    title: 'Started Learning Web Development',
    description: 'Began self-learning HTML, CSS, and JavaScript',
    status: 'past'
  },
  {
    year: '2023',
    title: 'First Portfolio Projects',
    description: 'Created my first portfolio website and started working with Bootstrap',
    status: 'past'
  },
  {
    year: '2024',
    title: 'Advanced Frontend Development',
    description: 'Learned Tailwind CSS and started exploring React.js',
    status: 'past'
  },
  {
    year: 'Now',
    title: 'Currently Learning',
    description: 'Deepening React knowledge and API integration skills',
    status: 'current'
  },
  {
    year: 'Next',
    title: 'Future Goals',
    description: 'Becoming a full-stack developer with extensive React experience',
    status: 'future'
  }
]

export const tasks = [
  {
    title: 'Planning UI/UX',
    description: 'Analyze requirements, create wireframes, and design a user-friendly interface.',
    status: 'Completed',
    progress: 100,
    icon: 'Layout'
  },
  {
    title: 'Writing React Code',
    description: 'Build reusable components, implement state management, and ensure performance.',
    status: 'Completed',
    progress: 100,
    icon: 'Code'
  },
  {
    title: 'Styling with Tailwind',
    description: 'Apply modern CSS with utility classes for responsive, clean interfaces.',
    status: 'Completed',
    progress: 100,
    icon: 'Palette'
  },
  {
    title: 'API Integration',
    description: 'Connect to APIs, handle data fetching, and implement error handling.',
    status: 'In Progress',
    progress: 75,
    icon: 'Plug'
  },
  {
    title: 'Responsive Testing',
    description: 'Test across devices to ensure a seamless experience on all screen sizes.',
    status: 'In Progress',
    progress: 60,
    icon: 'Smartphone'
  },
  {
    title: 'Deployment',
    description: 'Optimize for production and deploy to hosting platforms with CI/CD.',
    status: 'Planned',
    progress: 25,
    icon: 'Rocket'
  }
]

export const skills = {
  frontend: {
    languages: ['HTML', 'CSS', 'JavaScript (ES6)'],
    frameworks: ['React.js'],
    styling: ['Tailwind CSS', 'Bootstrap']
  },
  developerTools: {
    versionControl: ['Git', 'GitHub'],
    editors: ['VS Code'],
    debugging: ['Chrome DevTools']
  },
  integration: {
    api: ['REST API']
  },
  other: [
    'Responsive Design',
    'Cross-Browser Compatibility',
    'Problem-Solving',
    'Debugging'
  ]
}
