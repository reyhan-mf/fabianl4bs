/* Projects, taglines, tech lists and images all come from the previous portfolio.
   The Eunoia case study is the full content of its old pages/eunoia.html. */

export const CATEGORIES = ['AI/ML', 'Web', 'Mobile', 'Data', 'IoT', 'Desktop'];

export const projects = [
  {
    slug: 'clipd',
    title: 'Clipd',
    category: 'Web',
    placeholder: 'app',
    wip: true,
    tagline: 'Keeping research bookmarks in order.',
    description:
      'A browser extension for collecting and organising research bookmarks, so a literature trail stays navigable instead of drowning in open tabs.',
    tags: ['Next.js', 'JavaScript', 'Supabase'],
    role: 'Personal project',
    timeline: 'Jan 2026 — ongoing',
    context: 'In active development',
    overview:
      'A browser extension for organising research bookmarks, built with Next.js, JavaScript and Supabase. Still in active development.',
  },

  {
    slug: 'eirene',
    title: 'Eirene',
    category: 'Mobile',
    featured: true,
    placeholder: 'mobile',
    award: 'Bronze Medal — PIMNAS 2025',
    tagline: 'Helping people spend less of their life on TikTok.',
    description:
      'A mental-health app that pairs the DASS-21 assessment with real usage monitoring, then answers questions about your state through a retrieval-augmented chatbot.',
    tags: ['Flutter', 'Flask', 'Firebase', 'Python'],
    role: 'AI & Mobile Developer and Researcher',
    timeline: 'Aug 2025 — Nov 2025',
    context: 'PIMNAS 2025 national finals',
    overview:
      'An AI-powered mental-health mobile app that helps users reduce TikTok addiction, pairing the DASS-21 psychological assessment with usage monitoring for data collection.',
    features: [
      'DASS-21 psychological assessment paired with real usage monitoring for data collection.',
      'A Retrieval-Augmented Generation chatbot that answers users’ questions about their mental state.',
      'Built with Flutter, Flask and Firebase.',
    ],
    results: [
      'Awarded a Bronze Medal at PIMNAS 2025 — Indonesia’s largest national student research competition, from a field of more than 40,000 teams.',
    ],
    resultStats: [
      { value: 'Bronze', label: 'PIMNAS 2025' },
      { value: '40k', sup: '+', label: 'teams nationwide' },
    ],
  },
  {
    slug: 'eunoia',
    title: 'Eunoia',
    category: 'AI/ML',
    featured: true,
    award: '2nd Place — IT Convert 2024, among 20+ teams',
    tagline: 'A mental-health app that reads how you feel.',
    description:
      'A progressive web app that detects mood and crisis signals from diary entries with NLP, then answers with exercises, articles and a Gemini-backed chat.',
    tags: ['Laravel', 'Python', 'TensorFlow', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    thumb: '/img/brand/eunoia-cover.png',
    shot: 'phone',
    repoUrl: 'https://github.com/reyhan-mf/eunoia-app',
    role: 'AI/ML engineer & backend',
    timeline: '2024',
    context: 'ITConvert competition, team of 3',
    hero: '/img/brand/eunoia-cover.png',
    overview:
      'Eunoia is a comprehensive mental health application that leverages artificial intelligence to provide personalized support and resources for users struggling with mental health challenges. The app uses advanced NLP techniques to understand user emotions and provide appropriate interventions.',
    features: [
      'AI-powered mood tracking from diary input and analysis',
      'Personalized mental health recommendations using the Depression Anxiety Stress Scale test',
      'Chat-based therapy support using the Gemini API',
      'Progress tracking and analytics dashboard',
      'Crisis intervention detection and alerts',
      'Community support features and forums',
      'Meditation and mindfulness exercises',
      'Professional therapist booking system',
    ],
    challenges: [
      'Implementing accurate sentiment analysis for mood detection',
      'Creating an intuitive and calming user interface design',
      'Training AI models with diverse mental health datasets',
    ],
    results: [
      'Achieved 85% accuracy in mood prediction algorithms',
      'Winner of 2nd place in the ITConvert Software Development Competition',
    ],
    resultStats: [
      { value: '85', sup: '%', label: 'mood prediction accuracy' },
      { value: '2nd', label: 'ITConvert, national' },
      { value: '3', label: 'people on the team' },
    ],
    architecture: {
      src: '/img/projects/eunoia/eunoia-web-architecture.png',
      caption: 'Application architecture',
    },
    charts: [
      { src: '/img/projects/eunoia/mood-accuracy.png', caption: 'Mood model — accuracy' },
      { src: '/img/projects/eunoia/mood-loss-chart.png', caption: 'Mood model — loss' },
      { src: '/img/projects/eunoia/suicide-accuracy.png', caption: 'Crisis model — accuracy' },
      { src: '/img/projects/eunoia/loss-chart-suicide.png', caption: 'Crisis model — loss' },
      {
        src: '/img/projects/eunoia/mood-detection-confusionmatrix.png',
        caption: 'Mood model — confusion matrix',
      },
      {
        src: '/img/projects/eunoia/suicide-detection-confusion-matrix.png',
        caption: 'Crisis model — confusion matrix',
      },
    ],
    gallery: [
      { src: '/img/projects/eunoia/default.png', caption: 'Default screen' },
      { src: '/img/projects/eunoia/registrasi.png', caption: 'Registration' },
      { src: '/img/projects/eunoia/eu-login.png', caption: 'Login' },
      { src: '/img/projects/eunoia/home-screen.png', caption: 'Home' },
      { src: '/img/projects/eunoia/explore-and-care.png', caption: 'Explore and care' },
      { src: '/img/projects/eunoia/explore-and-care-2.png', caption: 'Explore and care' },
      { src: '/img/projects/eunoia/discussion-forum.png', caption: 'Discussion forum' },
      { src: '/img/projects/eunoia/chatbot.png', caption: 'Chatbot' },
      { src: '/img/projects/eunoia/chat-history.png', caption: 'Chat history' },
      { src: '/img/projects/eunoia/article.png', caption: 'Article' },
      { src: '/img/projects/eunoia/breath.png', caption: 'Breathing exercise' },
      { src: '/img/projects/eunoia/relaxing-music.png', caption: 'Relaxing music' },
      { src: '/img/projects/eunoia/diary.png', caption: 'Diary' },
      { src: '/img/projects/eunoia/diary-detail.png', caption: 'Diary detail' },
    ],
    contributors: [
      { name: 'Reyhan Mochamad Fabian', role: 'AI/ML Engineer & Backend', photo: '/img/people/reyhan.png' },
      { name: 'Fahmi Nursafaat', role: 'Fullstack Web Engineer', photo: '/img/people/fahmi.jpg' },
      { name: 'Firda Rosela Sundari', role: 'UI/UX Designer', photo: '/img/people/firda.jpg' },
    ],
  },

  {
    slug: 'skinsense',
    title: 'SkinSenseAI',
    category: 'AI/ML',
    featured: true,
    tagline: 'Spotting skin conditions from a photo.',
    description:
      'A deep-learning detector that reads a photo of a skin condition, returns the likely diagnosis, and keeps a history of every scan behind a login.',
    award: '3rd Place — AI-NOVAC 2024, among 20+ teams',
    tags: ['Python', 'Flask', 'Flutter'],
    thumb: '/img/projects/skinsense/homepage.png',
    thumbFit: 'contain',
    shot: 'phone',
    role: 'AI Engineer',
    timeline: 'Aug 2024 — Sep 2024',
    context: 'AI-NOVAC national competition',
    hero: '/img/projects/skinsense/hasil-deteksi.png',
    overview:
      'A YOLO model trained to detect skin conditions from user-uploaded images, serving as the AI backend for a healthcare diagnostic mobile app. A Flask REST API handles the image uploads and returns diagnosis results to a Flutter client.',
    features: [
      'Trained a YOLO model to detect skin conditions from user-uploaded images.',
      'Built a Flask REST API handling image uploads and returning diagnosis results to a Flutter client.',
    ],
    results: ['Awarded 3rd place nationally at AI-NOVAC, among more than 20 teams.'],
    charts: [
      { src: '/img/projects/skinsense/model-result.png', caption: 'Model results' },
      { src: '/img/projects/skinsense/models-chart.png', caption: 'Model comparison' },
    ],
    gallery: [
      { src: '/img/projects/skinsense/homepage.png', caption: 'Home page' },
      { src: '/img/projects/skinsense/login.png', caption: 'Login' },
      { src: '/img/projects/skinsense/register.png', caption: 'Register' },
      { src: '/img/projects/skinsense/hasil-deteksi.png', caption: 'Detection result' },
      { src: '/img/projects/skinsense/history.png', caption: 'Scan history' },
      { src: '/img/projects/skinsense/chatbot.png', caption: 'Chatbot' },
      { src: '/img/projects/skinsense/chatbot-default.png', caption: 'Chatbot — empty state' },
      { src: '/img/projects/skinsense/profile.png', caption: 'Profile' },
    ],
  },

  {
    slug: 'velora',
    title: 'Velora',
    category: 'Web',
    featured: true,
    tagline: 'Face scanning and an LLM that knows skincare.',
    description:
      'A healthcare web app that scans a face for skin concerns and answers questions from a retrieval-augmented product catalogue, with a full admin side for the shop.',
    featured: true,
    award: '1st Place — Best Project in Software Engineering, UPI TEKKOM Dies Natalis 2025',
    tags: ['Laravel', 'MySQL', 'PHP', 'Python'],
    thumb: '/img/projects/velora/face-scanning.png',
    role: 'Team Lead & Full-Stack Developer',
    timeline: 'Sep 2024 — Oct 2024',
    context: 'Team of 4, UPI TEKKOM Dies Natalis 2025',
    hero: '/img/projects/velora/face-scanning.png',
    overview:
      'A full-stack skincare-analysis web app. A face-scanning model reads skin concerns and a retrieval-augmented assistant recommends products from a catalogue the admin side maintains; every scan is kept in the user’s history.',
    features: [
      'Built a Laravel REST API — routing, controllers, authentication middleware — over a normalised MySQL schema for users, skin-analysis results and product recommendations.',
      'Integrated a machine-learning model through API endpoints handling image uploads and JSON responses, with end-to-end file validation and error handling.',
    ],
    results: [
      'Led the team to a 1st-place win for Software Engineering excellence at UPI TEKKOM Dies Natalis 2025, among more than 10 projects.',
    ],
    charts: [{ src: '/img/projects/velora/rag-architecture.png', caption: 'RAG architecture' }],
    gallery: [
      { src: '/img/projects/velora/face-scanning.png', caption: 'Face scanning' },
      { src: '/img/projects/velora/history-scanning.png', caption: 'Scan history' },
      { src: '/img/projects/velora/login.png', caption: 'Login' },
      { src: '/img/projects/velora/register.png', caption: 'Register' },
      { src: '/img/projects/velora/edit-profile.png', caption: 'Edit profile' },
      { src: '/img/projects/velora/produk-skincare-admin.png', caption: 'Admin — product list' },
      { src: '/img/projects/velora/admin-add-produk.png', caption: 'Admin — add product' },
      { src: '/img/projects/velora/edit-produk-admin.png', caption: 'Admin — edit product' },
    ],
  },

  {
    slug: 'motor-dc-speed-trainer',
    title: 'Motor DC Speed Trainer',
    category: 'IoT',
    tagline: 'A teaching rig for DC motor speed control.',
    description:
      'A mechatronics trainer built end to end — schematic, panel layout, 3D-printed housing and wiring — for demonstrating DC motor speed control with an Arduino and a motor driver.',
    tags: ['Arduino'],
    thumb: '/img/projects/mechatronics/13-foto-hasil-akhir-projek.png',
    context: 'Mechatronics coursework',
    hero: '/img/projects/mechatronics/13-foto-hasil-akhir-projek.png',
    overview:
      'A complete build of a DC motor speed-control trainer: circuit schematic, panel layout, 3D-printed parts, wiring diagram and the assembled rig, finished with a demonstration video.',
    gallery: [
      { src: '/img/projects/mechatronics/10-capture-gambar-skematik.jpg', caption: 'Circuit schematic' },
      {
        src: '/img/projects/mechatronics/2-capture-gambar-desain-layout-panel.jpg',
        caption: 'Panel layout design',
      },
      { src: '/img/projects/mechatronics/3-hasil-cetak-layout-panel.jpg', caption: 'Printed panel layout' },
      { src: '/img/projects/mechatronics/5-3d-printing-screenshot.png', caption: '3D printing setup' },
      { src: '/img/projects/mechatronics/6-foto-hasil-cetak-3d-printing.jpg', caption: '3D printed parts' },
      { src: '/img/projects/mechatronics/7-desain-wiring-skematik.png', caption: 'Wiring schematic' },
      { src: '/img/projects/mechatronics/8-hasil-rangkaian.jpg', caption: 'Assembled circuit' },
      { src: '/img/projects/mechatronics/13-foto-hasil-akhir-projek.png', caption: 'Finished trainer' },
    ],
    video: { src: '/img/projects/mechatronics/14-video-demonstrasi.mp4', caption: 'Demonstration' },
  },

  {
    slug: 'smart-package-box',
    title: 'Smart Package Box',
    category: 'IoT',
    tagline: 'A parcel box that tells you it has a parcel.',
    description:
      'An IoT delivery box wired to a web dashboard and a mobile app, so a courier drop is logged and the owner notified the moment the lid closes.',
    tags: ['C++', 'PHP', 'Flutter', 'Firebase'],
    thumb: '/img/projects/smartbox/img-20241215-wa0027.jpg',
    context: 'IoT coursework',
    hero: '/img/projects/smartbox/img-20241215-wa0027.jpg',
    overview:
      'A smart package box integrating hardware, a web dashboard and a mobile app: the enclosure, block diagram, schematic and system architecture were designed together so a delivery registers end to end.',
    charts: [
      { src: '/img/projects/smartbox/arsitektur.png', caption: 'System architecture' },
      { src: '/img/projects/smartbox/diagram-blok.png', caption: 'Block diagram' },
      { src: '/img/projects/smartbox/alur.png', caption: 'Process flow' },
      { src: '/img/projects/smartbox/skematik.png', caption: 'Schematic' },
    ],
    gallery: [
      { src: '/img/projects/smartbox/page1.png', caption: 'App — screen 1' },
      { src: '/img/projects/smartbox/page2.png', caption: 'App — screen 2' },
      { src: '/img/projects/smartbox/page3.png', caption: 'App — screen 3' },
      { src: '/img/projects/smartbox/img-20241215-wa0014.jpg', caption: 'Build' },
      { src: '/img/projects/smartbox/img-20241215-wa0020.jpg', caption: 'Build' },
      { src: '/img/projects/smartbox/img-20241215-wa0022.jpg', caption: 'Build' },
      { src: '/img/projects/smartbox/img-20241215-wa0027.jpg', caption: 'Assembled box' },
      { src: '/img/projects/smartbox/img-20241215-wa0049.jpg', caption: 'Assembled box' },
      { src: '/img/projects/smartbox/img-20241228-wa0025.jpg', caption: 'Testing' },
      { src: '/img/projects/smartbox/img-20241228-wa0026.jpg', caption: 'Testing' },
      { src: '/img/projects/smartbox/img-20241228-wa0027.jpg', caption: 'Testing' },
    ],
  },

  {
    slug: 'student-dropout-analytics',
    title: 'Student Dropout Analytics',
    category: 'Data',
    tagline: 'Finding the students about to drop out.',
    description:
      'A dashboard over student records that flags dropout risk with a machine-learning model, so the institution can reach the right people early.',
    tags: ['Python', 'Tableau'],
    thumb: '/img/projects/student_dropout/mochaf-dashboard.png',
    context: 'Dicoding data science submission',
    hero: '/img/projects/student_dropout/mochaf-dashboard.png',
    overview:
      'An analytics dashboard built on student data: the model scores dropout risk and the dashboard breaks the population down so the pattern behind each cohort is visible.',
    gallery: [{ src: '/img/projects/student_dropout/mochaf-dashboard.png', caption: 'Dashboard' }],
  },

  {
    slug: 'employee-attrition-analytics',
    title: 'Employee Attrition',
    category: 'Data',
    tagline: 'Why people leave, in one dashboard.',
    description:
      'An HR analytics dashboard that models employee attrition and lays out the factors behind it — tenure, role and satisfaction — for the people who act on them.',
    tags: ['Python', 'Tableau'],
    thumb: '/img/projects/employee_attrition/mochaf-dashboard.png',
    context: 'Dicoding data science submission',
    hero: '/img/projects/employee_attrition/mochaf-dashboard.png',
    overview:
      'An attrition dashboard built from HR records: a model estimates who is likely to leave, and the dashboard shows which factors move that number.',
    gallery: [{ src: '/img/projects/employee_attrition/mochaf-dashboard.png', caption: 'Dashboard' }],
  },

  {
    slug: 'ecommerce-dashboard',
    title: 'E-Commerce Dashboard',
    category: 'Data',
    tagline: 'Public e-commerce data, explorable.',
    description:
      'A Streamlit dashboard over a public e-commerce dataset — orders, customers, categories and delivery times — with filters that answer a question per view.',
    tags: ['Python', 'Streamlit', 'pandas'],
    thumb: '/img/projects/public_ecommerce_streamlit/st1.png',
    context: 'Dicoding data analysis submission',
    hero: '/img/projects/public_ecommerce_streamlit/st1.png',
    overview:
      'An exploratory dashboard built with Streamlit over a public e-commerce dataset, one view per question: order volume, customer spread, category performance and delivery time.',
    gallery: [
      { src: '/img/projects/public_ecommerce_streamlit/st1.png', caption: 'Overview' },
      { src: '/img/projects/public_ecommerce_streamlit/st2.png', caption: 'Orders' },
      { src: '/img/projects/public_ecommerce_streamlit/st3.png', caption: 'Customers' },
      { src: '/img/projects/public_ecommerce_streamlit/st4.png', caption: 'Categories' },
      { src: '/img/projects/public_ecommerce_streamlit/st5.png', caption: 'Delivery' },
      { src: '/img/projects/public_ecommerce_streamlit/st6.png', caption: 'Breakdown' },
      { src: '/img/projects/public_ecommerce_streamlit/st7.png', caption: 'Summary' },
    ],
  },

  {
    slug: 'fruit-classification',
    title: 'Fruit Classification',
    category: 'AI/ML',
    tagline: 'Telling fruit apart with a CNN.',
    description:
      'An image classifier trained in TensorFlow to sort photographs of fruit into their varieties, from dataset preparation through to prediction.',
    tags: ['TensorFlow'],
    thumb: '/img/projects/image_classification/fruit3.jpg',
    thumbFit: 'contain',
    context: 'Dicoding machine learning submission',
    hero: '/img/projects/image_classification/fruit3.jpg',
    overview:
      'A convolutional image classifier built with TensorFlow and Keras: the dataset is augmented, the model trained to convergence, and predictions checked against held-out photographs.',
    gallery: [
      { src: '/img/projects/image_classification/fruit1.jpg', caption: 'Sample' },
      { src: '/img/projects/image_classification/fruit2.jpg', caption: 'Sample' },
      { src: '/img/projects/image_classification/fruit3.jpg', caption: 'Sample' },
      { src: '/img/projects/image_classification/fruit4.jpg', caption: 'Sample' },
    ],
  },

  {
    slug: 'lung-disease-classification',
    title: 'Lung Disease Detection',
    category: 'AI/ML',
    tagline: 'Reading lung scans with TensorFlow.',
    description:
      'A deep-learning classifier for lung disease from medical imagery, trained in TensorFlow and checked against its loss curve and per-case predictions.',
    tags: ['TensorFlow'],
    thumb: '/img/projects/lungs_classification/prediction.png',
    thumbFit: 'contain',
    context: 'Machine learning coursework',
    hero: '/img/projects/lungs_classification/prediction.png',
    overview:
      'A classifier trained on lung imagery with TensorFlow, evaluated on the training loss curve and on individual predictions.',
    charts: [{ src: '/img/projects/lungs_classification/loss-curve.png', caption: 'Loss curve' }],
    gallery: [{ src: '/img/projects/lungs_classification/prediction.png', caption: 'Prediction' }],
  },

  {
    slug: 'sales-forecasting-lstm',
    title: 'Sales Forecasting (LSTM)',
    category: 'AI/ML',
    tagline: 'Forecasting a sales series with an LSTM.',
    description:
      'A time-series forecaster built on an LSTM network — windowed data splitting, a callback-driven training loop and MAE tracked against a threshold.',
    tags: ['TensorFlow'],
    thumb: '/img/projects/time_series_dicoding/plot-accuracy.jpg',
    context: 'Dicoding machine learning submission',
    hero: '/img/projects/time_series_dicoding/plot-accuracy.jpg',
    overview:
      'A recurrent forecaster for a sales time series: the data is windowed and split, a sequential LSTM is trained with callbacks against an MAE threshold, and the result is plotted against the actual series.',
    charts: [
      { src: '/img/projects/time_series_dicoding/dataset-info.jpg', caption: 'Dataset' },
      { src: '/img/projects/time_series_dicoding/data-splitting.jpg', caption: 'Data splitting' },
      { src: '/img/projects/time_series_dicoding/sequential-model.jpg', caption: 'Model' },
      { src: '/img/projects/time_series_dicoding/optimizer.jpg', caption: 'Optimizer' },
      { src: '/img/projects/time_series_dicoding/callback.jpg', caption: 'Callback' },
      { src: '/img/projects/time_series_dicoding/threshold.jpg', caption: 'MAE threshold' },
      { src: '/img/projects/time_series_dicoding/mae-training-result.jpg', caption: 'MAE result' },
      { src: '/img/projects/time_series_dicoding/plot-accuracy.jpg', caption: 'Accuracy' },
      { src: '/img/projects/time_series_dicoding/plot-loss.jpg', caption: 'Loss' },
    ],
  },

  {
    slug: 'nlp-text-classification',
    title: 'NLP Text Classification',
    category: 'AI/ML',
    tagline: 'Sorting text into classes.',
    description:
      'A natural-language classifier trained end to end — tokenising and embedding the corpus, then training until accuracy and loss settle.',
    tags: ['TensorFlow'],
    thumb: '/img/projects/nlp_dicoding/nlp-accuracy.png',
    context: 'Dicoding machine learning submission',
    hero: '/img/projects/nlp_dicoding/nlp-accuracy.png',
    overview:
      'A text classifier built with TensorFlow: the corpus is tokenised and embedded, and training is tracked on accuracy and loss until both settle.',
    charts: [
      { src: '/img/projects/nlp_dicoding/nlp-accuracy.png', caption: 'Accuracy' },
      { src: '/img/projects/nlp_dicoding/nlp-loss.png', caption: 'Loss' },
    ],
  },

  {
    slug: 'd-days-reminder',
    title: 'D-Days Reminder',
    category: 'Desktop',
    tagline: 'A desktop countdown to the dates that matter.',
    description:
      'A Java Swing desktop application that counts the days to saved events and reminds you before each one arrives.',
    tags: ['Java'],
    thumb: '/img/projects/java_swing_proj/2025-06-24-20-44.png',
    context: 'Object-oriented programming coursework',
    hero: '/img/projects/java_swing_proj/2025-06-24-20-44.png',
    overview:
      'A desktop reminder built with Java Swing: events are stored with their target date, and the application counts down to each one.',
    gallery: [
      { src: '/img/projects/java_swing_proj/2025-06-24-20-44.png', caption: 'Application window' },
      { src: '/img/projects/java_swing_proj/simulation.gif', caption: 'Walkthrough' },
    ],
  },
];

export const bySlug = (slug) => projects.find((p) => p.slug === slug);

export const featured = projects.filter((p) => p.featured);

export const countByCategory = () => {
  const counts = { All: projects.length };
  for (const c of CATEGORIES) counts[c] = projects.filter((p) => p.category === c).length;
  return counts;
};
