export type StudyAbroadCategory =
  | "Scholarships & Funding"
  | "University Portals"
  | "Tests"
  | "Application Systems"
  | "Visa & Documents"
  | "Country Guides";

export interface StudyAbroadResource {
  id: string;
  title: string;
  description: string;
  category: StudyAbroadCategory;
  url: string;
  region: string;
  tags: string[];
}

export interface RoadmapStep {
  id: string;
  label: string;
  title: string;
  description: string;
  checklist: string[];
}

export interface Destination {
  id: string;
  country: string;
  flag: string;
  intakes: string;
  language: string;
  guideUrl: string;
  guideLabel: string;
  note: string;
}

export interface StudyAbroadFaq {
  question: string;
  answer: string;
}

export const studyAbroadLastReviewed = "2026-10-21";

export const studyAbroadResources: StudyAbroadResource[] = [
  {
    id: "chevening",
    title: "Chevening Scholarships",
    description:
      "Fully funded one-year master's study in the UK for emerging leaders. The award typically covers tuition, a living stipend, and travel.",
    category: "Scholarships & Funding",
    url: "https://www.chevening.org/scholarships/",
    region: "United Kingdom",
    tags: ["UK", "Master's", "Fully funded"],
  },
  {
    id: "fulbright",
    title: "Fulbright Foreign Student Program",
    description:
      "US government exchange program supporting graduate study, research, and professional development for international students.",
    category: "Scholarships & Funding",
    url: "https://foreign.fulbrightonline.org/",
    region: "United States",
    tags: ["USA", "Graduate", "Exchange"],
  },
  {
    id: "erasmus-mundus",
    title: "Erasmus Mundus Joint Masters",
    description:
      "EU-funded joint master's degrees delivered by university consortia across Europe, with scholarship opportunities for international students.",
    category: "Scholarships & Funding",
    url: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters",
    region: "European Union",
    tags: ["EU", "Master's", "Scholarship"],
  },
  {
    id: "educationusa",
    title: "EducationUSA Advising Centers",
    description:
      "Official US Department of State network offering free guidance on choosing universities, preparing applications, and understanding student visas.",
    category: "University Portals",
    url: "https://educationusa.state.gov/",
    region: "United States",
    tags: ["USA", "Advising", "Official"],
  },
  {
    id: "study-uk",
    title: "Study UK — British Council",
    description:
      "Official UK guide to courses, universities, application steps, scholarships, and student life for international applicants.",
    category: "University Portals",
    url: "https://study-uk.britishcouncil.org/",
    region: "United Kingdom",
    tags: ["UK", "Courses", "Guide"],
  },
  {
    id: "daad",
    title: "DAAD — Study in Germany",
    description:
      "German Academic Exchange Service portal for degree programs, funding, language requirements, and practical information about studying in Germany.",
    category: "University Portals",
    url: "https://www.daad.de/en/studying-in-germany/",
    region: "Germany",
    tags: ["Germany", "Funding", "Programs"],
  },
  {
    id: "ielts",
    title: "IELTS",
    description:
      "Official IELTS information covering test formats, preparation materials, test dates, and score reporting for university admissions.",
    category: "Tests",
    url: "https://www.ielts.org/",
    region: "Global",
    tags: ["English test", "Admissions", "Preparation"],
  },
  {
    id: "toefl",
    title: "TOEFL iBT",
    description:
      "ETS portal for TOEFL registration, test preparation, score requirements, and sending official scores to universities.",
    category: "Tests",
    url: "https://www.ets.org/toefl.html",
    region: "Global",
    tags: ["English test", "ETS", "Admissions"],
  },
  {
    id: "duolingo-english-test",
    title: "Duolingo English Test",
    description:
      "Online English proficiency test accepted by many universities. Check each program's policy before registering or sending scores.",
    category: "Tests",
    url: "https://englishtest.duolingo.com/",
    region: "Global",
    tags: ["English test", "Online", "Admissions"],
  },
  {
    id: "ucas",
    title: "UCAS",
    description:
      "Central application service for undergraduate courses at UK universities and colleges, including key deadlines and personal statement guidance.",
    category: "Application Systems",
    url: "https://www.ucas.com/",
    region: "United Kingdom",
    tags: ["UK", "Undergraduate", "Applications"],
  },
  {
    id: "common-app",
    title: "Common App",
    description:
      "Shared application platform for first-year and transfer applicants to hundreds of US colleges and universities.",
    category: "Application Systems",
    url: "https://www.commonapp.org/",
    region: "United States",
    tags: ["USA", "Undergraduate", "Applications"],
  },
  {
    id: "uni-assist",
    title: "uni-assist",
    description:
      "Central service that reviews international academic credentials for many German universities and reduces duplicate paperwork.",
    category: "Application Systems",
    url: "https://www.uni-assist.de/en/",
    region: "Germany",
    tags: ["Germany", "Credentials", "Applications"],
  },
  {
    id: "uk-student-visa",
    title: "UK Student Visa",
    description:
      "Official GOV.UK guidance on the Student route, required documents, application fees, and when to apply before your course starts.",
    category: "Visa & Documents",
    url: "https://www.gov.uk/student-visa",
    region: "United Kingdom",
    tags: ["UK", "Visa", "Official"],
  },
  {
    id: "canada-study-permit",
    title: "Canada Study Permit",
    description:
      "IRCC official guide to study permits, eligibility, supporting documents, biometrics, and current processing times.",
    category: "Visa & Documents",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    region: "Canada",
    tags: ["Canada", "Permit", "Official"],
  },
  {
    id: "us-student-visa",
    title: "US Student Visa",
    description:
      "US Department of State overview of F-1 and M-1 visas, SEVIS, interview preparation, and the documents you need to bring.",
    category: "Visa & Documents",
    url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
    region: "United States",
    tags: ["USA", "Visa", "Official"],
  },
  {
    id: "educanada",
    title: "EduCanada",
    description:
      "Official Canadian government resource for choosing programs, understanding costs, and planning your studies in Canada.",
    category: "Country Guides",
    url: "https://www.educanada.ca/index.aspx?lang=eng",
    region: "Canada",
    tags: ["Canada", "Programs", "Costs"],
  },
  {
    id: "study-australia",
    title: "Study Australia",
    description:
      "Australian government guide to institutions, courses, visas, scholarships, and living costs for international students.",
    category: "Country Guides",
    url: "https://www.studyaustralia.gov.au/",
    region: "Australia",
    tags: ["Australia", "Courses", "Visa"],
  },
  {
    id: "study-in-nl",
    title: "Study in NL",
    description:
      "Nuffic's official guide to English-taught programs, tuition, scholarships, and practical matters for studying in the Netherlands.",
    category: "Country Guides",
    url: "https://www.studyinnl.org/",
    region: "Netherlands",
    tags: ["Netherlands", "Programs", "Scholarships"],
  },
];

export const applicationRoadmap: RoadmapStep[] = [
  {
    id: "shortlist",
    label: "Stage 01",
    title: "Explore & shortlist",
    description:
      "Define your goal, budget, and timeline before comparing programs.",
    checklist: [
      "Choose 2–3 countries and 6–10 programs",
      "Compare tuition, living costs, and funding",
      "Check entry requirements for each program",
    ],
  },
  {
    id: "tests",
    label: "Stage 02",
    title: "Prepare tests",
    description:
      "Book required language or admission tests early enough to retake them if needed.",
    checklist: [
      "Confirm IELTS, TOEFL, or waiver policies",
      "Register 3–6 months before deadlines",
      "Keep official score reports ready",
    ],
  },
  {
    id: "documents",
    label: "Stage 03",
    title: "Build documents",
    description:
      "Prepare academic and personal documents once, then tailor them for each application.",
    checklist: [
      "Transcripts, certificates, and passport",
      "Statement of purpose, CV, and references",
      "Portfolio or writing samples if required",
    ],
  },
  {
    id: "apply",
    label: "Stage 04",
    title: "Apply & fund",
    description:
      "Track deadlines and submit complete applications alongside scholarship applications.",
    checklist: [
      "Create a deadline and document tracker",
      "Apply for scholarships and assistantships",
      "Keep proof of funding ready",
    ],
  },
  {
    id: "depart",
    label: "Stage 05",
    title: "Visa & depart",
    description:
      "Compare offers, accept the best fit, and plan your visa and arrival.",
    checklist: [
      "Compare total cost and offer conditions",
      "Apply for the visa after receiving required documents",
      "Arrange housing, insurance, and travel",
    ],
  },
];

export const destinations: Destination[] = [
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    intakes: "Fall • Spring",
    language: "IELTS / TOEFL / Duolingo",
    guideUrl: "https://educationusa.state.gov/",
    guideLabel: "EducationUSA",
    note: "A large range of programs and funding options, with significant variation in costs and visa timelines between institutions.",
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    intakes: "September • January",
    language: "IELTS (check waivers)",
    guideUrl: "https://study-uk.britishcouncil.org/",
    guideLabel: "Study UK",
    note: "One-year master's degrees are common. Scholarship deadlines often close well before the course start date.",
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    intakes: "Fall • Winter • Summer",
    language: "IELTS / TOEFL / PTE",
    guideUrl: "https://www.educanada.ca/index.aspx?lang=eng",
    guideLabel: "EduCanada",
    note: "Study permit and proof-of-funds planning are critical. Requirements can differ by province and institution.",
  },
  {
    id: "germany",
    country: "Germany",
    flag: "🇩🇪",
    intakes: "Winter • Summer",
    language: "English / German",
    guideUrl: "https://www.daad.de/en/studying-in-germany/",
    guideLabel: "DAAD",
    note: "Many public universities charge low or no tuition, but entry requirements and language expectations vary by program.",
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    intakes: "February • July",
    language: "IELTS / TOEFL / PTE",
    guideUrl: "https://www.studyaustralia.gov.au/",
    guideLabel: "Study Australia",
    note: "Confirm course accreditation, living costs, and visa conditions before accepting an offer.",
  },
  {
    id: "netherlands",
    country: "Netherlands",
    flag: "🇳🇱",
    intakes: "September • February",
    language: "English-taught programs",
    guideUrl: "https://www.studyinnl.org/",
    guideLabel: "Study in NL",
    note: "Many programs are taught in English, but subject prerequisites and application deadlines can be specific.",
  },
];

export const studyAbroadFaqs: StudyAbroadFaq[] = [
  {
    question: "When should I start planning?",
    answer:
      "Most students begin 12–18 months before their target intake. Scholarship deadlines often close 6–12 months before the course starts, so work backwards from your earliest deadline.",
  },
  {
    question: "Do I need IELTS or TOEFL?",
    answer:
      "Not always. Many universities accept multiple tests or waive the requirement for certain applicants. Check the specific program's admission page before booking a test.",
  },
  {
    question: "How many universities should I apply to?",
    answer:
      "A balanced shortlist usually includes 6–10 programs across reach, match, and safer options. Confirm each program's entry requirements and funding options first.",
  },
  {
    question: "Can I work while studying abroad?",
    answer:
      "Work rights depend on the country, visa type, and course. Check the official immigration guidance for your destination rather than relying on agent promises or social media posts.",
  },
  {
    question: "How do I verify a scholarship or agent?",
    answer:
      "Use the scholarship provider's official website and the university's own domain. Be cautious of paid 'guaranteed' scholarships or visas, and confirm every fee on an official page.",
  },
];
