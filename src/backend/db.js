import certGNA from '../assets/hackthon and trainning certificates/WhatsApp Image 2026-07-14 at 7.08.48 PM.jpeg';
import certQuantum from '../assets/hackthon and trainning certificates/WhatsApp Image 2026-07-14 at 6.55.58 PM.jpeg';
import certSummer from '../assets/hackthon and trainning certificates/WhatsApp Image 2024-12-11 at 12.53.56_058acddc.jpg';
import certHarsh from '../assets/hackthon and trainning certificates/harsh.pdf';
import certDecision from '../assets/online certificates/decision_making.pdf';
import certDigital from '../assets/online certificates/digital_intelligence.pdf';
import certInnovation from '../assets/online certificates/innovation_and_creativity.pdf';
import certPresentation from '../assets/online certificates/presentation_skills.pdf';
import certStrategy from '../assets/online certificates/strategy_planning_and_execution.pdf';
import certExtra1 from '../assets/online certificates/WhatsApp Image 2026-07-14 at 7.09.48 PM.jpeg';
import certExtra2 from '../assets/online certificates/WhatsApp Image 2026-07-14 at 7.09.49 PM.jpeg';

export const DEFAULT_EXPERIENCE = [
  {
    id: 'exp1',
    role: 'MERN Full Stack Developer Intern',
    company: 'Digiverse Technologies',
    points: [
      'Built a MERN-based voter management platform for Punjab government records.',
      'Implemented Admin/Verifier roles with bulk excel data import and verification workflows.',
      'Developed T-Shirt E-Commerce admin dashboard and storefront.',
      'Built "FlowerNGift" full-stack MERN e-commerce application.'
    ],
    fromDate: '2023-01',
    toDate: '2023-06',
    isCurrent: false,
    isLeft: true
  },
  {
    id: 'exp2',
    role: 'Hybrid App & Web Developer',
    company: 'GGI Connect ERP System 💎',
    link: 'https://ggierp.in/',
    appLink: 'https://play.google.com/store/apps/details?id=in.ggi.erp&pcampaignid=web_share',
    points: [
      'Built "GGI Connect" Flutter mobile app mirroring web ERP functionality.',
      'Developed HR/Hiring module (Manpower Requests, Interview Panels, Onboarding).',
      'Built Admin, Teacher, and Executive dashboards with role-based access.',
      'Integrated push notifications and complex verification workflows.'
    ],
    fromDate: '2023-07',
    toDate: '',
    isCurrent: true,
    isLeft: false
  }
];

export const DEFAULT_COMPANY_PROJECTS = [
  {
    id: 'cp1',
    title: 'Oscorp Security System',
    companyName: 'Oscorp Industries',
    icon: '🔒',
    tech: 'C++, Python, React',
    desc: 'Architected biometric security protocols for the main laboratory. Full-stack integration with real-time threat detection dashboards.',
    workflow: 'Data capture from biometric scanners -> Processing via Python backend -> Display on React dashboard.',
    whatIDid: 'Implemented real-time websockets for threat detection\nOptimized facial recognition processing times',
    projectLink: 'https://github.com/example/oscorp',
    appLink: '',
    liveLink: 'https://oscorp.example.com',
    status: 'Completed'
  },
  {
    id: 'cp2',
    title: 'Daily Bugle Web Portal',
    companyName: 'The Daily Bugle',
    icon: '🌐',
    tech: 'Next.js, Node.js, MongoDB',
    desc: 'Developed a high-traffic news portal with real-time article updates, role-based access, and SSR optimisation.',
    workflow: 'Journalists submit articles -> Editors approve -> Published to static CDN via Next.js ISR.',
    whatIDid: 'Setup Next.js ISR for fast load times\nBuilt custom CMS for editors',
    projectLink: '',
    appLink: '',
    liveLink: 'https://dailybugle.example.com',
    status: 'Maintained'
  },
  {
    id: 'cp3',
    title: 'Stark Industries API',
    companyName: 'Stark Industries',
    icon: '⚙️',
    tech: 'Java, Spring Boot, AWS',
    desc: 'Built scalable REST APIs for inventory management, handling thousands of concurrent requests with CI/CD pipelines.',
    workflow: 'AWS API Gateway routing -> Spring Boot Microservices -> DynamoDB',
    whatIDid: 'Configured AWS CI/CD pipelines\nCreated automated testing suite',
    projectLink: '',
    appLink: '',
    liveLink: '',
    status: 'Handed over to company'
  },
];

export const DEFAULT_PERSONAL_PROJECTS = [
  {
    id: 'pp1',
    title: 'Plant Disease Detection',
    companyName: 'Personal',
    icon: '🌿',
    tech: 'Python, TensorFlow, OpenCV',
    desc: 'End-to-end ML pipeline for identifying crop diseases from leaf images — data collection, augmentation, model training and evaluation.',
    workflow: 'Image preprocessing -> CNN model prediction -> Output classification',
    whatIDid: 'Collected and augmented dataset\nTrained CNN model\nBuilt inference script',
    projectLink: 'https://github.com/example/plant-disease',
    appLink: '',
    liveLink: '',
    status: 'Completed'
  },
  {
    id: 'pp2',
    title: 'Subject Manager App',
    companyName: 'Personal',
    icon: '📱',
    tech: 'Android, Java, SQLite',
    desc: 'Native Android app with full CRUD operations, offline-first architecture, and a clean Material Design UI for academic management.',
    workflow: 'Local SQLite storage -> Native UI components -> Sync manager',
    whatIDid: 'Designed Material UI\nImplemented SQLite database',
    projectLink: 'https://github.com/example/subject-manager',
    appLink: 'https://play.google.com/store/apps/details?id=example',
    liveLink: '',
    status: 'Maintained'
  },
  {
    id: 'pp3',
    title: 'Spotify Clone',
    companyName: 'Personal',
    icon: '🎵',
    tech: 'HTML, CSS, JavaScript',
    desc: "Pixel-perfect frontend recreation of Spotify's 2025 web interface, complete with music playback controls and playlist management.",
    workflow: 'Static HTML/CSS -> JS DOM manipulation -> HTML5 Audio API',
    whatIDid: 'Created pixel-perfect UI\nImplemented audio playback',
    projectLink: 'https://github.com/example/spotify-clone',
    appLink: '',
    liveLink: 'https://spotify-clone.example.com',
    status: 'Completed'
  },
  {
    id: 'pp4',
    title: 'Netflix Clone',
    companyName: 'Personal',
    icon: '🎬',
    tech: 'HTML, CSS, JavaScript',
    desc: 'Responsive Netflix landing page clone with dynamic hero banners, category carousels, and smooth hover animations.',
    workflow: 'TMDB API fetching -> Vanilla JS rendering -> CSS Grid/Flexbox layouts',
    whatIDid: 'Integrated TMDB API\nBuilt responsive carousels',
    projectLink: 'https://github.com/example/netflix-clone',
    appLink: '',
    liveLink: 'https://netflix-clone.example.com',
    status: 'Completed'
  },
];

export const DEFAULT_CASUAL_PROJECTS = [
  {
    id: 'cas1',
    title: 'Discord Bot',
    companyName: 'Casual',
    icon: '🤖',
    tech: 'Node.js, Discord.js',
    desc: 'A fun discord bot for my private server that plays music and tells jokes.',
    workflow: 'Discord API events -> Command parser -> Audio streaming',
    whatIDid: 'Built music queue system\nIntegrated joke API',
    projectLink: 'https://github.com/example/discord-bot',
    appLink: '',
    liveLink: '',
    status: 'Currently working on it'
  }
];

export const DEFAULT_CERTIFICATES = [
  { id: 'cert1', title: 'GNA Hackathon 3.0', month: 'March', year: '2025', icon: 'GiTrophyCup', desc: 'Secured first place in the regional hackathon.', type: 'jpg', fileUrl: certGNA, memoryPhotoUrls: [] },
  { id: 'cert2', title: 'Next Quantum 2.0 Hackathon', month: 'April', year: '2025', icon: 'GiStarMedal', desc: 'Participated in a 48-hour coding sprint.', type: 'jpg', fileUrl: certQuantum, memoryPhotoUrls: [] },
  { id: 'cert3', title: 'Summer Training in Web Development', month: 'July', year: '2024', icon: 'GiDiploma', desc: 'Completed intensive full-stack training.', type: 'jpg', fileUrl: certSummer, memoryPhotoUrls: [] },
  { id: 'cert4', title: 'Training / Internship', month: 'August', year: '2024', icon: 'GiSpiderWeb', desc: 'Completed internship program.', type: 'pdf', fileUrl: certHarsh, memoryPhotoUrls: [] },
  { id: 'cert5', title: 'Decision Making', month: 'Unknown', year: '2023', icon: 'GiRibbonMedal', desc: 'Online certification course.', type: 'pdf', fileUrl: certDecision, memoryPhotoUrls: [] },
  { id: 'cert6', title: 'Digital Intelligence', month: 'Unknown', year: '2023', icon: 'GiRibbonMedal', desc: 'Online certification course.', type: 'pdf', fileUrl: certDigital, memoryPhotoUrls: [] },
  { id: 'cert7', title: 'Innovation & Creativity', month: 'Unknown', year: '2023', icon: 'GiRibbonMedal', desc: 'Online certification course.', type: 'pdf', fileUrl: certInnovation, memoryPhotoUrls: [] },
  { id: 'cert8', title: 'Presentation Skills', month: 'Unknown', year: '2023', icon: 'GiRibbonMedal', desc: 'Online certification course.', type: 'pdf', fileUrl: certPresentation, memoryPhotoUrls: [] },
  { id: 'cert9', title: 'Strategy Planning & Execution', month: 'Unknown', year: '2023', icon: 'GiRibbonMedal', desc: 'Online certification course.', type: 'pdf', fileUrl: certStrategy, memoryPhotoUrls: [] },
  { id: 'cert10', title: 'Online Certification 1', month: 'Unknown', year: '2023', icon: 'GiRibbonMedal', desc: 'Online certification course.', type: 'jpg', fileUrl: certExtra1, memoryPhotoUrls: [] },
  { id: 'cert11', title: 'Online Certification 2', month: 'Unknown', year: '2023', icon: 'GiRibbonMedal', desc: 'Online certification course.', type: 'jpg', fileUrl: certExtra2, memoryPhotoUrls: [] }
];

export const DEFAULT_EDUCATION = [
  {
    id: 'edu1',
    degreeLevel: 'Masters',
    degreeName: 'Master of Computer Applications',
    fieldOfStudy: 'Computer Science',
    institution: 'Chandigarh University',
    board: '',
    fromTo: '2023 - 2025',
    pursuing: true,
    yearOfPassing: '',
    percentage: '',
    description: 'Specializing in full-stack development and software architecture.',
  },
  {
    id: 'edu2',
    degreeLevel: 'Bachelors',
    degreeName: 'Bachelor of Computer Applications',
    fieldOfStudy: 'Computer Applications',
    institution: 'Gulzar Group of Institutes',
    board: '',
    fromTo: '2020 - 2023',
    pursuing: false,
    yearOfPassing: '2023',
    percentage: '8.0 CGPA',
    description: 'Focus on core programming and application development.',
  },
  {
    id: 'edu3',
    degreeLevel: '12th',
    institution: 'Green Land Convent School',
    board: 'CBSE',
    fromTo: '2019 - 2020',
    pursuing: false,
    yearOfPassing: '2020',
    percentage: '54%',
    description: 'Senior secondary education.',
  },
  {
    id: 'edu4',
    degreeLevel: '10th',
    institution: 'Green Land Convent School',
    board: 'CBSE',
    fromTo: '2017 - 2018',
    pursuing: false,
    yearOfPassing: '2018',
    percentage: '70%',
    description: 'Secondary education.',
  }
];

export const DEFAULT_EDUCATION_SKILLS = [
  { id: 'es1', name: 'JavaScript' }, { id: 'es2', name: 'React.js' }, { id: 'es3', name: 'Node.js' }, { id: 'es4', name: 'Express.js' },
  { id: 'es5', name: 'MongoDB' }, { id: 'es6', name: 'Flutter' }, { id: 'es7', name: 'Dart' }, { id: 'es8', name: 'Java' },
  { id: 'es9', name: 'Python' }, { id: 'es10', name: 'Firebase' }, { id: 'es11', name: 'REST_APIs' }, { id: 'es12', name: 'MySQL' },
  { id: 'es13', name: 'HTML5' }, { id: 'es14', name: 'CSS3' }, { id: 'es15', name: 'Git' }, { id: 'es16', name: 'Postman' }
];

export const DEFAULT_EDUCATION_IMAGE = null; // null means fallback to /image.png

export const DEFAULT_INTRO = {
  title: 'HARSH',
  subtitle: 'Full Stack (MERN) & Flutter Developer',
  bio: '🕷️ With great code comes great responsibility. 👽 Full Stack (MERN) & Flutter Developer building production-ready web and mobile applications that solve real-world problems. 🕷️ Experienced in developing enterprise ERP systems, government platforms, and e-commerce solutions, 👽 with expertise in database architecture, REST APIs, role-based access control, workflow automation, and Google Play Store deployment. 🕷️',
  bgImage: null,
  buttons: [
    { id: 'btn1', label: 'View Projects', link: '/projects', isExternal: false },
    { id: 'btn2', label: 'Contact Me', link: '/contact', isExternal: false }
  ]
};

export const DEFAULT_QUICK_LINKS = [
  { id: 'ql1', title: 'Resume PDF', url: '#', type: 'external', highlight: true },
  { id: 'ql2', title: 'My Projects', url: '/projects', type: 'internal', highlight: false },
  { id: 'ql3', title: 'My Experience', url: '/experience', type: 'internal', highlight: false },
  { id: 'ql4', title: 'Connect with me', url: '/contact', type: 'internal', highlight: false },
];

export const DEFAULT_CONTACT = [
  { id: 'c1', name: 'Email', value: 'harsh31tkd@gmail.com', link: 'mailto:harsh31tkd@gmail.com', iconType: 'FaEnvelope', color: 'var(--accent-red)' },
  { id: 'c2', name: 'GitHub', value: 'github.com/harsh31tkd', link: 'https://github.com/harsh31tkd', iconType: 'FaGithub', color: 'white' },
  { id: 'c3', name: 'LinkedIn', value: 'Connect with me', link: 'https://linkedin.com', iconType: 'FaLinkedin', color: '#0077b5' },
  { id: 'c4', name: 'Instagram', value: 'Follow me', link: 'https://instagram.com', iconType: 'FaInstagram', color: '#e1306c' },
  { id: 'c5', name: 'Snapchat', value: 'Add me', link: 'https://snapchat.com', iconType: 'FaSnapchat', color: '#fffc00' }
];

export const DEFAULT_ABOUT_ME = {
  title: 'About Me',
  content: 'I am a passionate developer who loves building things for the web and mobile. Always learning new technologies and seeking out new challenges.',
  image: null
};

// Helper to get/set
const getLocal = (key, defaultData) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultData;
};
const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Getters & Setters
export const getExperience = () => getLocal('venom_experience', DEFAULT_EXPERIENCE);
export const saveExperience = (data) => setLocal('venom_experience', data);

export const getCompanyProjects = () => getLocal('venom_company_projects', DEFAULT_COMPANY_PROJECTS);
export const saveCompanyProjects = (data) => setLocal('venom_company_projects', data);

export const getPersonalProjects = () => getLocal('venom_personal_projects', DEFAULT_PERSONAL_PROJECTS);
export const savePersonalProjects = (data) => setLocal('venom_personal_projects', data);

export const getCasualProjects = () => getLocal('venom_casual_projects', DEFAULT_CASUAL_PROJECTS);
export const saveCasualProjects = (data) => setLocal('venom_casual_projects', data);

export const getCertificates = () => getLocal('venom_certificates', DEFAULT_CERTIFICATES);
export const saveCertificates = (data) => setLocal('venom_certificates', data);

export const getEducation = () => {
  const data = getLocal('venom_education', DEFAULT_EDUCATION);
  return data.map(edu => {
    if (edu.degreeLevel) return edu;
    // Migrate old data
    return {
      id: edu.id,
      degreeLevel: 'Other',
      degreeName: edu.title,
      institution: edu.dir,
      description: Array.isArray(edu.status) ? edu.status.join('\n') : edu.status
    };
  });
};
export const saveEducation = (data) => setLocal('venom_education', data);

export const getIntro = () => {
  const data = getLocal('venom_intro', null);
  if (!data) return DEFAULT_INTRO;
  return { ...DEFAULT_INTRO, ...data, buttons: data.buttons || DEFAULT_INTRO.buttons };
};
export const saveIntro = (data) => setLocal('venom_intro', data);

export const getQuickLinks = () => getLocal('venom_quick_links', DEFAULT_QUICK_LINKS);
export const saveQuickLinks = (data) => setLocal('venom_quick_links', data);

export const getContact = () => getLocal('venom_contact', DEFAULT_CONTACT);
export const saveContact = (data) => setLocal('venom_contact', data);

export const getAboutMe = () => {
  const data = getLocal('venom_about_me', null);
  if (!data) return DEFAULT_ABOUT_ME;
  return { ...DEFAULT_ABOUT_ME, ...data };
};
export const saveAboutMe = (data) => setLocal('venom_about_me', data);

export const getEducationSkills = () => getLocal('venom_education_skills', DEFAULT_EDUCATION_SKILLS);
export const saveEducationSkills = (data) => setLocal('venom_education_skills', data);

export const getEducationImage = () => getLocal('venom_education_image', DEFAULT_EDUCATION_IMAGE);
export const saveEducationImage = (data) => setLocal('venom_education_image', data);

export const getResume = () => getLocal('venom_resume', certHarsh);
export const saveResume = (data) => setLocal('venom_resume', data);

export const openPdfInNewTab = (base64Data) => {
  if (!base64Data) return;
  if (!base64Data.startsWith('data:')) {
    window.open(base64Data, '_blank');
    return;
  }
  try {
    const base64Parts = base64Data.split(',');
    const mimeType = base64Parts[0].match(/:(.*?);/)[1];
    const raw = window.atob(base64Parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    const blob = new Blob([uInt8Array], { type: mimeType });
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL, '_blank');
  } catch (e) {
    console.error("Failed to open PDF in new tab", e);
    window.open(base64Data, '_blank');
  }
};

