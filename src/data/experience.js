/* Roles, education, papers and skills, taken from Fabian's CV. Bullets are his own wording,
   trimmed only for length. */

export const experience = [
  {
    id: 'crescentrating',
    logo: 'CR',
    role: 'Web Programmer',
    org: 'CrescentRating',
    kind: 'Full-time',
    badge: 'fulltime',
    date: 'Oct 2026 — Present',
    current: true,
    location: 'Remote — 80 Changi Road, Singapore',
    bullets: [
      'Revamped the company website with the team using Next.js, modernizing its interface and user experience.',
      'Built an OCR + LLM pipeline that extracts contact details from business-card images and writes structured records to Google Sheets via the Google API.',
      'Developed “Gastronomy Awards”, a Progressive Web App for a restaurant competition serving event organizers, evaluators and admins, using Next.js and Firebase.',
    ],
  },
  {
    id: 'brin',
    logo: 'BRIN',
    role: 'Researcher',
    org: 'National Research and Innovation Agency (BRIN)',
    kind: 'Part-time',
    badge: 'parttime',
    date: 'Feb 2026 — Jul 2026',
    location: 'Bandung, Indonesia',
    note: 'part-time, concurrent with studies',
    bullets: [
      'Researching NLP methods to semantically match academic curriculum text with job-market requirements (project CareerSync), under faculty research supervision.',
      'Built the data pipeline end to end — web-scraped JobStreet postings into a custom dataset, preprocessed curricular and job-requirement text, and annotated data pairs using the Gemini API.',
      'Reviewed state-of-the-art NLP literature and fine-tuned transformer models on the paired dataset, then deployed the trained model as a REST API.',
      'Developed a web application to serve the model, and reported progress to the research team weekly.',
    ],
  },
];

export const education = [
  {
    id: 'upi',
    logo: 'UPI',
    logoSrc: '/img/brand/upi.png',
    degree: 'B.S. in Computer Engineering',
    school: 'Indonesian University of Education (UPI)',
    date: 'Sep 2022 — Jul 2026',
    location: 'Bandung, Indonesia',
    gpa: 'GPA 3.90 / 4.00',
    current: true,
    subjects: [
      'Artificial Intelligence',
      'Intelligent Systems & Automation',
      'Probabilistic Robotics',
      'Data Structures & Algorithms',
      'Software Engineering',
      'Mobile Programming',
      'Web Programming',
      'Object-Oriented Programming',
      'Database Systems',
      'Operating Systems',
      'Linear Algebra',
      'Probability & Statistics',
    ],
  },
];

export const papers = [
  {
    id: 'itij-2024',
    title: 'The Possibility Prediction of Inheriting Blood Types in Parents Based on The Child’s Allele Combination',
    venue: 'ITIJ',
    year: '2024',
    authors:
      'Reyhan Mochamad Fabian, Afrizal Adi Nugroho, Aidha Salsa Billa, Munawir Munawir, Muhammad Taufik Dwi Putra',
    url: 'https://itijournal.org/index.php/ITIJ/article/view/14',
  },
  {
    id: 'jddat-2025',
    title: 'Locker Rental Pricing System Using Mamdani Fuzzy Logic',
    venue: 'JDDAT',
    year: '2025',
    authors: 'Reyhan Mochamad Fabian, Firda Rosela Sundari, Anugrah Adiwilaga',
    url: 'https://journal.aptikomkepri.org/index.php/JDDAT/article/view/79',
  },
  {
    id: 'processor-2026',
    title:
      'Implementation of Steganography Encryption and Decryption Methods on Digital Images in Web-Based Applications',
    venue: 'Processor',
    year: '2026',
    authors:
      'Reyhan Mochamad Fabian, Yosua Adriel Tamba, Muhammad Rifki Lathif, Muhammad Rafi Pasya Martadisastra, Salsabila Nida Azzahra, Deden Pradeka, Zahra Khaerunnisa',
    url: 'https://ejournal.unama.ac.id/index.php/processor/article/view/2054',
  },
  {
    id: 'widina-2025',
    title: 'Operating System and Its Implementation',
    venue: 'Widina Media Utama',
    year: '2025',
    kind: 'Book chapter',
    authors:
      'Muhammad Taufik Dwi Putra, Munawir Munawir, Zahra Khaerunnisa, Reyhan Mochamad Fabian',
    url: 'https://repository.penerbitwidina.com/publications/638189/sistem-operasi-dan-implementasinya',
  },
];

export const courses = [
  {
    id: 'alibaba-genai',
    title: 'Alibaba Cloud Certified Developer — Generative AI',
    issuer: 'Alibaba Cloud',
    date: '2025',
    badge: 'certificate',
  },
  {
    id: 'cs50x',
    title: 'CS50x: Introduction to Computer Science',
    issuer: 'Harvard University',
    date: '2024',
    note: 'Open courseware from Harvard University.',
    certificate: '/img/certs/cs50x.png',
    badge: 'certificate',
  },
  {
    id: 'idcamp',
    title: 'Data Scientist Expert Awardee',
    issuer: 'Dicoding Indonesia — IDCamp',
    date: '2024',
    note: 'Scholarship from Dicoding Indonesia by IDCamp.',
    certificate: '/img/certs/idcamp-dicoding.png',
    badge: 'certificate',
  },
  {
    id: 'ml-dev',
    title: 'Machine Learning Development',
    issuer: 'Dicoding Indonesia',
    date: '2024',
    badge: 'certificate',
  },
  {
    id: 'rest-api',
    title: 'REST API (Intermediate)',
    issuer: 'HackerRank',
    date: '2025',
    badge: 'certificate',
  },
  {
    id: 'bisa-ai',
    title: 'Masterclass On Job Training: Data Science',
    issuer: 'Bisa AI',
    date: '2024',
    note: 'Scholarship from Dicoding Indonesia by IDCamp.',
    certificate: '/img/certs/bisa-ai-ojt-data-science.png',
    badge: 'certificate',
  },
  {
    id: 'certnexus',
    title: 'Artificial Intelligence for Business (AIBIZ)',
    issuer: 'CertNexus',
    date: '2025',
    note: 'International certification from CertNexus.',
    certificate: '/img/certs/certnexus-aibiz.png',
    badge: 'certificate',
  },
];

/* `logo` keys into src/design/tech-logos.js where a brand mark exists; the rest show as tags. */
export const skillGroups = [
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      { name: 'Python', logo: 'python' },
      { name: 'JavaScript', logo: 'javascript' },
      { name: 'PHP', logo: 'php' },
      { name: 'Java', logo: 'java' },
      { name: 'C++', logo: 'cplusplus' },
      { name: 'Dart', logo: 'dart' },
      { name: 'SQL', logo: 'mysql' },
    ],
  },
  {
    id: 'web',
    title: 'Web',
    skills: [
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'React', logo: 'react' },
      { name: 'Laravel', logo: 'laravel' },
      { name: 'Django', logo: 'django' },
      { name: 'Flask', logo: 'flask' },
      { name: 'HTML5', logo: 'html5' },
      { name: 'CSS3', logo: 'css3' },
    ],
  },
  {
    id: 'ai',
    title: 'AI / ML',
    skills: [
      { name: 'TensorFlow', logo: 'tensorflow' },
      { name: 'Keras', logo: 'keras' },
      { name: 'Claude Code', logo: 'claude' },
      { name: 'Gemini API', logo: 'gemini' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile & data',
    skills: [
      { name: 'Flutter', logo: 'flutter' },
      { name: 'Firebase', logo: 'firebase' },
      { name: 'Supabase', logo: 'supabase' },
    ],
  },
  {
    id: 'tools',
    title: 'Tooling',
    skills: [
      { name: 'Git', logo: 'git' },
      { name: 'Docker', logo: 'docker' },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);

export const languages = [
  { name: 'Indonesian', level: 'Native' },
  { name: 'English', level: 'Fluent' },
];
