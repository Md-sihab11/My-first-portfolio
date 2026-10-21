import type {
  City,
  Country,
  CountryInfoItem,
  CountryInfoKey,
  SourceLink,
  StudyAbroadData,
  University,
} from "@/lib/study-abroad/types";

const SEED_DATE = "2026-10-21T00:00:00.000Z";

function source(label: string, url: string): SourceLink {
  return { label, url };
}

function info(
  key: CountryInfoKey,
  summary: string,
  label: string,
  url: string
): CountryInfoItem {
  return {
    key,
    summary,
    verified: false,
    source: source(label, url),
  };
}

function country(
  input: Omit<Country, "sample" | "createdAt" | "updatedAt">
): Country {
  return {
    ...input,
    sample: true,
    createdAt: SEED_DATE,
    updatedAt: SEED_DATE,
  };
}

function city(
  input: Omit<City, "sample" | "createdAt" | "updatedAt">
): City {
  return {
    ...input,
    sample: true,
    createdAt: SEED_DATE,
    updatedAt: SEED_DATE,
  };
}

type UniversitySeed = Partial<University> &
  Pick<
    University,
    | "id"
    | "countryId"
    | "cityId"
    | "slug"
    | "name"
    | "shortName"
    | "summary"
    | "website"
    | "address"
    | "region"
    | "campusName"
    | "campusSetting"
    | "cityClassification"
    | "courses"
    | "intakes"
    | "sources"
  >;

function university(input: UniversitySeed): University {
  return {
    logoUrl: "",
    degreeLevels: ["Bachelor's", "Master's", "Doctoral"],
    admissionRequirements:
      "Programme-specific. Check the official admissions page for academic requirements and any subject prerequisites.",
    gpaRequirements: "Check official website.",
    englishRequirements:
      "IELTS, TOEFL, PTE or another accepted test may be accepted. Check the programme page for exact scores and waivers.",
    studyGapPolicy:
      "Programme-specific. Check the official admissions page and ask the admissions office about any study gap.",
    applicationDeadlines: "Check official website.",
    applicationFee: "Check official website.",
    tuitionFees: "Check official website.",
    courseDuration: "Varies by programme. Check official website.",
    requiredDocuments: [
      "Academic transcripts and certificates",
      "Passport",
      "English language test evidence (if required)",
      "Statement of purpose / CV (if required)",
    ],
    scholarships:
      "Check the university scholarship page and the official country funding routes listed for this destination.",
    applicationPortal: input.website,
    admissionsContact: input.website,
    dormitories: "Check the official accommodation page.",
    privateAccommodation:
      "Check the university housing advice and current local listings.",
    estimatedRent: "Check official cost guidance.",
    monthlyLivingCost: "Check official cost guidance.",
    foodCost: "Check official cost guidance.",
    transportCost: "Check the city transit fares.",
    essentialFacilities:
      "Hospitals, grocery stores, pharmacies and banks are available around the city. Check the university's local area guide.",
    publicTransportAccess:
      "Check the city transit website and the university's travel guide.",
    partTimeWork:
      "Check the student visa work rules for this country before accepting a job.",
    studentLife:
      "Clubs, societies and student support services are available. Check the university's student life pages.",
    safety:
      "Check the university's safety, emergency and incident information.",
    climate: "Check a reliable local climate source before you pack.",
    nearbyCities: "Check official website.",
    nearestAirport: "Check official website.",
    publicTransport: "Check official website.",
    lastVerifiedAt: undefined,
    sample: true,
    createdAt: SEED_DATE,
    updatedAt: SEED_DATE,
    ...input,
  };
}

export const initialStudyAbroadData: StudyAbroadData = {
  version: 1,
  countries: [
    country({
      id: "country-usa",
      slug: "united-states",
      name: "United States",
      flag: "🇺🇸",
      region: "North America",
      overview:
        "A large and varied system with strong research funding, flexible course structures and many funding routes. Costs, deadlines and visa timelines vary widely by state and institution.",
      locationSummary:
        "Student hubs span the East Coast, Midwest and West Coast. Boston and Austin show how different campus settings and living costs can be within one country.",
      info: [
        info(
          "embassy",
          "The U.S. Embassy in Dhaka handles visa interviews. EducationUSA Bangladesh provides free, official advising. Most student-visa steps begin with the university's I-20 and the DS-160 form.",
          "U.S. Embassy Dhaka",
          "https://bd.usembassy.gov/"
        ),
        info(
          "intakes",
          "Fall (August/September) is the main intake; spring (January) is also common. Each university sets its own deadlines, often 6–12 months before the intake.",
          "EducationUSA",
          "https://educationusa.state.gov/"
        ),
        info(
          "visa-process",
          "Receive the I-20, pay the SEVIS I-901 fee, complete the DS-160, pay the visa fee, then schedule the interview at the U.S. Embassy in Dhaka. Processing time varies by case and season.",
          "U.S. student visa",
          "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
        ),
        info(
          "documents",
          "Passport, I-20, DS-160 confirmation, visa fee receipt, SEVIS fee receipt, admission letter, financial evidence, academic documents and a compliant photo. Check the official checklist before the interview.",
          "Student visa checklist",
          "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
        ),
        info(
          "fees",
          "A visa application fee and the SEVIS I-901 fee apply. Amounts change, so confirm both on the official fee pages before paying.",
          "Visa fees",
          "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees.html"
        ),
        info(
          "funds",
          "Show funds to cover tuition and living costs for the period stated on the I-20. Each university provides its own cost estimate and financial-evidence instructions.",
          "Financial ability",
          "https://studyinthestates.dhs.gov/students/prepare/financial-ability"
        ),
        info(
          "insurance",
          "Most universities require international students to have health insurance; some offer a school plan and a waiver process. Confirm the requirement with the university's international office.",
          "Study in the States",
          "https://studyinthestates.dhs.gov/"
        ),
        info(
          "living-costs",
          "Housing is usually the largest cost. Major cities are significantly more expensive than smaller university towns. Use the university's official cost of attendance and current housing listings.",
          "EducationUSA",
          "https://educationusa.state.gov/"
        ),
        info(
          "scholarships",
          "Fulbright, university merit awards, assistantships and departmental funding are common routes. Many awards require a separate application and an early deadline.",
          "Fulbright Foreign Student Program",
          "https://foreign.fulbrightonline.org/"
        ),
        info(
          "work",
          "F-1 students may work on campus under certain conditions; off-campus work needs authorisation. Optional Practical Training (OPT) is available after study, with a STEM extension for eligible degrees.",
          "Working in the United States",
          "https://studyinthestates.dhs.gov/students/working-in-the-united-states"
        ),
      ],
      sources: [
        source("U.S. Embassy Dhaka", "https://bd.usembassy.gov/"),
        source("EducationUSA", "https://educationusa.state.gov/"),
        source(
          "Student visa",
          "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
        ),
        source("Study in the States", "https://studyinthestates.dhs.gov/"),
        source(
          "SEVIS I-901 fee",
          "https://www.ice.gov/sevis/i901"
        ),
        source(
          "OPT for F-1 students",
          "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students"
        ),
      ],
    }),
    country({
      id: "country-uk",
      slug: "united-kingdom",
      name: "United Kingdom",
      flag: "🇬🇧",
      region: "Europe",
      overview:
        "One-year master's degrees are common, undergraduate applications are centralised through UCAS, and the Student route is points-based. Scholarship deadlines often close well before the course starts.",
      locationSummary:
        "London is the largest student hub; Manchester and other regional cities offer lower living costs and distinct campus cultures.",
      info: [
        info(
          "embassy",
          "The British High Commission in Dhaka and VFS Global's Bangladesh visa application centres support UK visa applications. Apply online before attending the visa centre.",
          "British High Commission Dhaka",
          "https://www.gov.uk/world/organisations/british-high-commission-dhaka"
        ),
        info(
          "intakes",
          "September is the main intake; January starts are available for some master's and foundation courses. UCAS sets separate undergraduate deadlines.",
          "Study UK",
          "https://study-uk.britishcouncil.org/"
        ),
        info(
          "visa-process",
          "Apply online for the Student route, pay the visa fee and Immigration Health Surcharge, provide biometrics at a VFS centre, and wait for a decision. Apply within the window allowed before your course starts.",
          "Student visa",
          "https://www.gov.uk/student-visa"
        ),
        info(
          "documents",
          "CAS, passport, financial evidence, English language evidence, ATAS certificate if required, TB test certificate if required, and academic documents. Confirm the exact list on GOV.UK.",
          "Student visa documents",
          "https://www.gov.uk/student-visa"
        ),
        info(
          "fees",
          "The visa application fee and Immigration Health Surcharge apply. Check GOV.UK for current amounts and any optional VFS service fees.",
          "Student visa",
          "https://www.gov.uk/student-visa"
        ),
        info(
          "funds",
          "Show tuition plus living costs for the required period. The amount depends on course length and whether you study in London; check the current GOV.UK evidence rules.",
          "Money required",
          "https://www.gov.uk/student-visa/money"
        ),
        info(
          "insurance",
          "The Immigration Health Surcharge gives access to NHS services. Some students may still want additional travel or specialist cover.",
          "Immigration Health Surcharge",
          "https://www.gov.uk/healthcare-immigration-application"
        ),
        info(
          "living-costs",
          "London is significantly more expensive than most other UK cities. Budget for rent, food, transport, bills and course materials; check Study UK and the university's cost pages.",
          "Study UK",
          "https://study-uk.britishcouncil.org/"
        ),
        info(
          "scholarships",
          "Chevening, Commonwealth, GREAT scholarships and university awards are the main routes. Deadlines are often 6–12 months before the course begins.",
          "Chevening Scholarships",
          "https://www.chevening.org/scholarships/"
        ),
        info(
          "work",
          "Student visa work rights depend on the course and sponsor. The Graduate route may allow post-study work for eligible students; check GOV.UK for current conditions.",
          "Student visa work rules",
          "https://www.gov.uk/student-visa/work"
        ),
      ],
      sources: [
        source(
          "British High Commission Dhaka",
          "https://www.gov.uk/world/organisations/british-high-commission-dhaka"
        ),
        source("VFS Global UK — Bangladesh", "https://visa.vfsglobal.com/bgd/en/gbr/"),
        source("Student visa", "https://www.gov.uk/student-visa"),
        source("Study UK", "https://study-uk.britishcouncil.org/"),
        source("UCAS", "https://www.ucas.com/"),
        source("Graduate visa", "https://www.gov.uk/graduate-visa"),
      ],
    }),
    country({
      id: "country-canada",
      slug: "canada",
      name: "Canada",
      flag: "🇨🇦",
      region: "North America",
      overview:
        "Public colleges and universities operate across provinces, and study permits are managed by IRCC. Proof of funds and provincial attestation requirements are important parts of planning.",
      locationSummary:
        "Toronto is the largest student hub; Waterloo is a smaller university city with a strong technology and co-op focus.",
      info: [
        info(
          "embassy",
          "The High Commission of Canada in Bangladesh and VFS Global collect biometrics. Most study-permit applications are submitted online through IRCC.",
          "High Commission of Canada in Bangladesh",
          "https://www.canadainternational.gc.ca/bangladesh/"
        ),
        info(
          "intakes",
          "Fall (September) is the main intake; winter (January) and summer (May) starts vary by programme. Confirm the programme's own deadline.",
          "EduCanada",
          "https://www.educanada.ca/index.aspx?lang=eng"
        ),
        info(
          "visa-process",
          "Get an acceptance letter and any required provincial attestation, apply through IRCC, upload documents, pay fees, give biometrics, complete a medical exam if requested, and wait for the study-permit decision.",
          "Study permit",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
        ),
        info(
          "documents",
          "Acceptance letter, provincial attestation where required, passport, proof of funds, tuition payment evidence, academic documents, language test results, and medical/biometric documents if requested.",
          "Apply for a study permit",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html"
        ),
        info(
          "fees",
          "The study-permit fee and biometrics fee apply. Check IRCC for current amounts before submitting.",
          "Study permit",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
        ),
        info(
          "funds",
          "Show funds for tuition and living costs, plus travel. IRCC publishes current proof-of-funds requirements and acceptable documents.",
          "Financial support",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html"
        ),
        info(
          "insurance",
          "Health coverage depends on the province. Some provinces include international students in provincial plans; others require private insurance. Check the university and provincial guidance.",
          "Health insurance for students",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/health-insurance.html"
        ),
        info(
          "living-costs",
          "Toronto and Vancouver are the most expensive cities; smaller university towns can be cheaper. Budget for rent, food, transport, utilities and winter clothing.",
          "EduCanada",
          "https://www.educanada.ca/index.aspx?lang=eng"
        ),
        info(
          "scholarships",
          "Vanier Canada Graduate Scholarships, university entrance awards and departmental funding are common routes. Most are competitive and have early deadlines.",
          "EduCanada",
          "https://www.educanada.ca/index.aspx?lang=eng"
        ),
        info(
          "work",
          "Eligible students may work off campus under IRCC rules; hours and conditions can change. Post-graduation work permits are available for eligible programmes.",
          "Work off campus",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html"
        ),
      ],
      sources: [
        source(
          "High Commission of Canada in Bangladesh",
          "https://www.canadainternational.gc.ca/bangladesh/"
        ),
        source("VFS Global Canada — Bangladesh", "https://visa.vfsglobal.com/bgd/en/can/"),
        source(
          "Study permit",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
        ),
        source("EduCanada", "https://www.educanada.ca/index.aspx?lang=eng"),
        source(
          "Post-graduation work permit",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html"
        ),
      ],
    }),
    country({
      id: "country-germany",
      slug: "germany",
      name: "Germany",
      flag: "🇩🇪",
      region: "Europe",
      overview:
        "Many public universities charge low or no tuition, but admission is programme-specific and proof of funds is required for the national visa. English-taught programmes are growing.",
      locationSummary:
        "Berlin is the largest student hub; Aachen is a smaller, engineering-focused university city with a distinct campus culture.",
      info: [
        info(
          "embassy",
          "The German Embassy in Dhaka and VFS Global handle national visa applications. Start with the university's admission letter, blocked account and health-insurance requirements.",
          "German Embassy Dhaka",
          "https://dhaka.diplo.de/"
        ),
        info(
          "intakes",
          "Winter semester (October) is the main intake; summer semester (April) is available for some programmes. Deadlines are set by each university and uni-assist.",
          "DAAD — Study in Germany",
          "https://www.daad.de/en/studying-in-germany/"
        ),
        info(
          "visa-process",
          "Get admission, set up the required blocked account and health insurance, book a national-visa appointment, submit documents, and wait for the visa. Processing can take several weeks.",
          "German missions — visa service",
          "https://www.auswaertiges-amt.de/en/visa-service"
        ),
        info(
          "documents",
          "Admission letter, proof of funds/blocked account, health insurance, passport, academic documents, language evidence, and motivation letter/CV if required. Confirm the embassy checklist.",
          "German Embassy Dhaka",
          "https://dhaka.diplo.de/"
        ),
        info(
          "fees",
          "A national visa fee applies. Public university tuition is often low, but semester contributions and programme fees vary; check the university and embassy.",
          "DAAD — Study in Germany",
          "https://www.daad.de/en/studying-in-germany/"
        ),
        info(
          "funds",
          "A blocked account or equivalent proof of funds is normally required. The required amount is updated periodically; check the embassy's current guidance before transferring money.",
          "German missions — visa service",
          "https://www.auswaertiges-amt.de/en/visa-service"
        ),
        info(
          "insurance",
          "Proof of German statutory or equivalent health insurance is required for enrolment and the visa. Compare public and private options before arrival.",
          "DAAD — Insurance",
          "https://www.daad.de/en/studying-in-germany/living-in-germany/insurance/"
        ),
        info(
          "living-costs",
          "Rent is the largest cost; Munich and Berlin are more expensive than smaller cities. Budget for the semester contribution, insurance, food, transport and a deposit.",
          "DAAD — Living in Germany",
          "https://www.daad.de/en/studying-in-germany/living-in-germany/"
        ),
        info(
          "scholarships",
          "DAAD scholarships, Deutschlandstipendium and university funding are the main routes. Many programmes also offer part-time jobs or research assistantships.",
          "DAAD — Scholarships",
          "https://www.daad.de/en/studying-in-germany/scholarships/"
        ),
        info(
          "work",
          "Students from non-EU countries may work a limited number of days per year. Eligible graduates can apply for a post-study job-seeking residence permit; check the current rules.",
          "DAAD — Working part-time",
          "https://www.daad.de/en/studying-in-germany/living-in-germany/working-part-time/"
        ),
      ],
      sources: [
        source("German Embassy Dhaka", "https://dhaka.diplo.de/"),
        source("VFS Global Germany — Bangladesh", "https://visa.vfsglobal.com/bgd/en/deu/"),
        source(
          "DAAD — Study in Germany",
          "https://www.daad.de/en/studying-in-germany/"
        ),
        source(
          "German missions — visa service",
          "https://www.auswaertiges-amt.de/en/visa-service"
        ),
        source("uni-assist", "https://www.uni-assist.de/en/"),
        source("Make it in Germany", "https://www.make-it-in-germany.com/en/study-training/"),
      ],
    }),
    country({
      id: "country-australia",
      slug: "australia",
      name: "Australia",
      flag: "🇦🇺",
      region: "Oceania",
      overview:
        "Australia offers strong research universities, clear student-visa rules and mandatory overseas student health cover. Living costs vary significantly by city.",
      locationSummary:
        "Melbourne and Brisbane are major student hubs with different climates and living costs; both have extensive public transport networks.",
      info: [
        info(
          "embassy",
          "The Australian High Commission in Dhaka and VFS Global provide visa support. Most student-visa applications are lodged online with the Department of Home Affairs.",
          "Australian High Commission Bangladesh",
          "https://bangladesh.embassy.gov.au/"
        ),
        info(
          "intakes",
          "February and July are the main intakes; some universities offer additional starts. Application deadlines vary by course.",
          "Study Australia",
          "https://www.studyaustralia.gov.au/"
        ),
        info(
          "visa-process",
          "Receive a Confirmation of Enrolment, prepare Genuine Student evidence, apply for the Student visa (subclass 500) online, complete biometrics and a medical exam if requested, then wait for the decision.",
          "Student visa (subclass 500)",
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
        ),
        info(
          "documents",
          "CoE, passport, Genuine Student evidence, financial capacity evidence, English test results, OSHC, academic documents, and health/biometric documents if requested.",
          "Student visa (subclass 500)",
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
        ),
        info(
          "fees",
          "The visa application fee applies and changes periodically. OSHC is an additional cost. Check Home Affairs before applying.",
          "Student visa (subclass 500)",
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
        ),
        info(
          "funds",
          "Show funds for tuition, living costs and travel, or provide the evidence required under the Genuine Student framework. Check current Home Affairs requirements.",
          "Student visa (subclass 500)",
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
        ),
        info(
          "insurance",
          "Overseas Student Health Cover (OSHC) is generally required for the duration of the student visa. Compare approved providers and confirm the university's preferred arrangement.",
          "OSHC — Study Australia",
          "https://www.studyaustralia.gov.au/en/plan-your-studies/overseas-student-health-cover"
        ),
        info(
          "living-costs",
          "Sydney and Melbourne are generally more expensive than smaller cities. Rent, food and transport are the main costs; check Study Australia's official cost guidance.",
          "Study Australia",
          "https://www.studyaustralia.gov.au/"
        ),
        info(
          "scholarships",
          "Australia Awards, Destination Australia and university scholarships are the main routes. Deadlines are usually well before the intake.",
          "Study Australia — Scholarships",
          "https://www.studyaustralia.gov.au/en/plan-your-studies/scholarships"
        ),
        info(
          "work",
          "Student-visa work limits apply during study periods. Temporary Graduate visas are available for eligible graduates; check Home Affairs for current conditions.",
          "Study Australia — Work",
          "https://www.studyaustralia.gov.au/en/plan-your-studies/work"
        ),
      ],
      sources: [
        source(
          "Australian High Commission Bangladesh",
          "https://bangladesh.embassy.gov.au/"
        ),
        source("VFS Global Australia — Bangladesh", "https://visa.vfsglobal.com/bgd/en/aus/"),
        source(
          "Student visa (subclass 500)",
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
        ),
        source("Study Australia", "https://www.studyaustralia.gov.au/"),
        source(
          "Temporary Graduate visa (subclass 485)",
          "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485"
        ),
      ],
    }),
    country({
      id: "country-netherlands",
      slug: "netherlands",
      name: "Netherlands",
      flag: "🇳🇱",
      region: "Europe",
      overview:
        "A compact system with many English-taught programmes and a university-led visa process. Housing is scarce in Amsterdam and other major cities, so start early.",
      locationSummary:
        "Amsterdam is the largest student hub; Eindhoven is a smaller, technology-focused city with a different pace and lower housing pressure.",
      info: [
        info(
          "embassy",
          "The Embassy of the Netherlands in Bangladesh and VFS Global handle MVV applications. The university usually acts as the recognised sponsor and starts the procedure after admission.",
          "Netherlands Embassy in Bangladesh",
          "https://www.netherlandsandyou.nl/your-country-and-the-netherlands/bangladesh"
        ),
        info(
          "intakes",
          "September is the main intake; February starts are available for some programmes. Deadlines are set by each institution and can be early for non-EU applicants.",
          "Study in NL",
          "https://www.studyinnl.org/"
        ),
        info(
          "visa-process",
          "The university applies for the MVV/residence permit after admission and payment. You then complete biometrics and collect the visa/residence permit. Processing times vary.",
          "IND — Study",
          "https://ind.nl/en/study"
        ),
        info(
          "documents",
          "Admission letter, passport, proof of funds, health insurance, academic documents, language evidence, and any legalised documents requested by the university.",
          "IND — Study",
          "https://ind.nl/en/study"
        ),
        info(
          "fees",
          "A visa/residence-permit fee applies and tuition varies widely. Check IND and the university for current amounts.",
          "IND — Study",
          "https://ind.nl/en/study"
        ),
        info(
          "funds",
          "Show proof of funds for tuition and living costs. The university may require the amount to be transferred in advance; confirm its exact instructions.",
          "IND — Study",
          "https://ind.nl/en/study"
        ),
        info(
          "insurance",
          "Students need adequate health insurance while in the Netherlands. Ask the university which policy is accepted before buying cover.",
          "Study in NL",
          "https://www.studyinnl.org/"
        ),
        info(
          "living-costs",
          "Housing is the biggest challenge, especially in Amsterdam. Budget for rent, food, transport, insurance, study materials and a housing deposit.",
          "Study in NL",
          "https://www.studyinnl.org/"
        ),
        info(
          "scholarships",
          "The Holland Scholarship, Orange Tulip Scholarship and university awards are common routes. Deadlines are usually early in the year.",
          "Study in NL — Scholarships",
          "https://www.studyinnl.org/finances/scholarships"
        ),
        info(
          "work",
          "Non-EU students may work under limited hours, with additional rules for full-time work in summer. Eligible graduates can apply for an orientation year.",
          "IND — Study",
          "https://ind.nl/en/study"
        ),
      ],
      sources: [
        source(
          "Netherlands Embassy in Bangladesh",
          "https://www.netherlandsandyou.nl/your-country-and-the-netherlands/bangladesh"
        ),
        source("VFS Global Netherlands — Bangladesh", "https://visa.vfsglobal.com/bgd/en/nld/"),
        source("IND — Study", "https://ind.nl/en/study"),
        source("Study in NL", "https://www.studyinnl.org/"),
        source("Nuffic", "https://www.nuffic.nl/"),
      ],
    }),
  ],
  cities: [
    city({
      id: "city-boston",
      countryId: "country-usa",
      name: "Boston",
      locationType: "Major city",
      summary:
        "A compact, walkable and student-heavy city with universities clustered around Fenway, Cambridge and the Longwood medical area.",
      campusAreas:
        "Boston University's Charles River Campus runs along Commonwealth Avenue. Other institutions cluster in Cambridge and the Longwood medical area.",
      nearbyCities: "Providence, Rhode Island (~80 km); New York City (~350 km).",
      nearestAirport: "Boston Logan International Airport (BOS).",
      publicTransport:
        "MBTA subway (the 'T'), buses, commuter rail and ferries connect the city and surrounding universities.",
      busTrainMetro:
        "Subway lines: Red, Orange, Blue, Green and Silver. Commuter rail from North, South and Back Bay stations.",
      nearestStation:
        "Park Street, Harvard, Kenmore and Back Bay are useful interchange stations.",
      monthlyRent:
        "Check current listings and the university's cost of attendance. Rent is highest near campus and in central neighborhoods.",
      foodCost:
        "Check the university's official cost estimate; cooking at home is usually cheaper than a meal plan.",
      transportCost:
        "Check MBTA fare options and the university's discounted transit passes.",
      facilities:
        "Hospitals, grocery stores, pharmacies, banks and libraries are concentrated around the university areas.",
      studentLifestyle:
        "Student neighborhoods, museums, sports, live music and a large international community. Winters are cold and snowy.",
      sources: [
        source("MBTA", "https://www.mbta.com/"),
        source("Boston Logan Airport", "https://www.massport.com/logan-airport/"),
        source("Boston University cost & aid", "https://www.bu.edu/finaid/"),
      ],
    }),
    city({
      id: "city-austin",
      countryId: "country-usa",
      name: "Austin",
      locationType: "Medium-sized city",
      summary:
        "A fast-growing tech and music city with a large university presence and a more spread-out feel than Boston or New York.",
      campusAreas:
        "The University of Texas at Austin's main campus sits just north of downtown, with satellite research and medical facilities nearby.",
      nearbyCities: "San Antonio (~130 km); Houston (~260 km).",
      nearestAirport: "Austin-Bergstrom International Airport (AUS).",
      publicTransport:
        "CapMetro buses and the MetroRail connect the university area, downtown and nearby suburbs.",
      busTrainMetro:
        "CapMetro bus routes and the Red Line MetroRail. Check current routes and fares.",
      nearestStation: "Downtown Station and Plaza Saltillo are central rail stops.",
      monthlyRent:
        "Check current listings and the university's cost of attendance. Prices rise quickly near campus.",
      foodCost:
        "Check the university's official cost estimate and local grocery options.",
      transportCost:
        "Check CapMetro fares and any student discount programme.",
      facilities:
        "Hospitals, grocery stores, pharmacies, banks and co-working spaces are available across central Austin.",
      studentLifestyle:
        "Live music, outdoor activities, food trucks and a large student community. Summers are hot and long.",
      sources: [
        source("CapMetro", "https://www.capmetro.org/"),
        source("Austin-Bergstrom Airport", "https://www.austintexas.gov/airport"),
        source("UT Austin cost & aid", "https://onestop.utexas.edu/"),
      ],
    }),
    city({
      id: "city-london",
      countryId: "country-uk",
      name: "London",
      locationType: "Major city",
      summary:
        "A dense, highly connected capital with dozens of universities and a very broad range of student neighborhoods and costs.",
      campusAreas:
        "UCL's main campus is in Bloomsbury, within walking distance of the West End and several other universities.",
      nearbyCities: "Oxford (~90 km); Cambridge (~95 km); Brighton (~85 km).",
      nearestAirport:
        "Heathrow (LHR), Gatwick (LGW), Stansted (STN), Luton (LTN) and London City (LCY).",
      publicTransport:
        "London Underground, Overground, buses, trams, DLR and National Rail services. A contactless card or phone is the standard way to pay.",
      busTrainMetro:
        "The Tube and Elizabeth line connect major stations; buses fill gaps and are often cheaper than rail.",
      nearestStation:
        "Euston, King's Cross St Pancras, Warren Street and Tottenham Court Road are useful for the Bloomsbury campus.",
      monthlyRent:
        "Check current listings and UCL's cost guidance. London rents are among the highest in the UK.",
      foodCost:
        "Check the university's cost estimate; supermarkets and student meal deals can reduce the monthly total.",
      transportCost:
        "Check TfL fares and student travel discounts before choosing where to live.",
      facilities:
        "Hospitals, pharmacies, supermarkets, banks and libraries are available throughout London.",
      studentLifestyle:
        "Museums, theatre, music, societies and a very large international student community. Expect a fast pace and high costs.",
      sources: [
        source("Transport for London", "https://tfl.gov.uk/"),
        source("Heathrow Airport", "https://www.heathrow.com/"),
        source("UCL cost of study", "https://www.ucl.ac.uk/prospective-students"),
      ],
    }),
    city({
      id: "city-manchester",
      countryId: "country-uk",
      name: "Manchester",
      locationType: "Medium-sized city",
      summary:
        "A large regional student city with a compact centre, strong music and culture scene, and lower living costs than London.",
      campusAreas:
        "The University of Manchester's main campus is along Oxford Road, south of the city centre, close to student neighborhoods.",
      nearbyCities: "Liverpool (~55 km); Leeds (~70 km); Sheffield (~65 km).",
      nearestAirport: "Manchester Airport (MAN).",
      publicTransport:
        "Metrolink trams, buses, National Rail and a large regional rail network.",
      busTrainMetro:
        "Metrolink connects the centre with suburbs and the airport; frequent buses run along Oxford Road.",
      nearestStation:
        "Manchester Piccadilly and Oxford Road are the main stations for the university area.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Rents are generally lower than London.",
      foodCost:
        "Check the university's cost estimate and local supermarket prices.",
      transportCost:
        "Check Metrolink and bus fares; student passes can reduce the monthly cost.",
      facilities:
        "Hospitals, supermarkets, pharmacies, banks and cultural venues are concentrated around the centre and Oxford Road.",
      studentLifestyle:
        "Music, football, museums and a large student population. The city is walkable and more affordable than London.",
      sources: [
        source("Transport for Greater Manchester", "https://tfgm.com/"),
        source("Manchester Airport", "https://www.manchesterairport.co.uk/"),
        source(
          "University of Manchester cost of study",
          "https://www.manchester.ac.uk/study/international/"
        ),
      ],
    }),
    city({
      id: "city-toronto",
      countryId: "country-canada",
      name: "Toronto",
      locationType: "Major city",
      summary:
        "Canada's largest city and a major student hub, with a dense downtown campus, extensive transit and very competitive housing.",
      campusAreas:
        "The University of Toronto's St. George campus is in downtown Toronto, close to Queen's Park and several subway stations.",
      nearbyCities: "Hamilton (~70 km); Ottawa (~450 km); Niagara Falls (~130 km).",
      nearestAirport:
        "Toronto Pearson International Airport (YYZ) and Billy Bishop Toronto City Airport (YTZ).",
      publicTransport:
        "TTC subway, streetcars and buses, plus GO Transit for the wider region.",
      busTrainMetro:
        "TTC Line 1 and Line 2 serve the downtown campus; streetcars connect many neighborhoods.",
      nearestStation:
        "Queen's Park, St. George and Museum are useful stations for the St. George campus.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Toronto has some of Canada's highest rents.",
      foodCost:
        "Check the university's cost estimate and local grocery options.",
      transportCost:
        "Check TTC fares and the university's transit discount if available.",
      facilities:
        "Hospitals, grocery stores, pharmacies, banks and libraries are available across downtown Toronto.",
      studentLifestyle:
        "A large, diverse city with museums, sports, music, food and many student societies. Winters are cold.",
      sources: [
        source("TTC", "https://www.ttc.ca/"),
        source("Toronto Pearson Airport", "https://www.torontopearson.com/"),
        source(
          "University of Toronto cost of attendance",
          "https://futurestudents.utoronto.ca/"
        ),
      ],
    }),
    city({
      id: "city-waterloo",
      countryId: "country-canada",
      name: "Waterloo",
      locationType: "Small town",
      summary:
        "A smaller university city in Ontario with a strong technology and co-op culture, close to Kitchener and within reach of Toronto.",
      campusAreas:
        "The University of Waterloo's main campus is in the city, with most facilities within walking distance of student housing.",
      nearbyCities: "Kitchener (~10 km); Guelph (~30 km); Toronto (~110 km).",
      nearestAirport:
        "Region of Waterloo International Airport (YKF) for regional flights; Toronto Pearson (YYZ) for long-haul routes.",
      publicTransport:
        "Grand River Transit buses and the ION light rail connect Waterloo, Kitchener and Cambridge.",
      busTrainMetro:
        "ION light rail and GRT buses; GO Transit trains and buses connect to Toronto.",
      nearestStation:
        "ION stops around the university and Uptown Waterloo are the most useful for students.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Demand is high around campus.",
      foodCost:
        "Check the university's cost estimate and local grocery options.",
      transportCost:
        "Check GRT fares and the UPass arrangement for eligible students.",
      facilities:
        "Hospitals, grocery stores, pharmacies, banks and technology employers are available in Waterloo and nearby Kitchener.",
      studentLifestyle:
        "A compact student-focused city with co-op culture, cafes and nearby outdoor spaces. Winters are cold and snowy.",
      sources: [
        source("Grand River Transit", "https://www.grt.ca/"),
        source("Region of Waterloo Airport", "https://www.waterlooairport.ca/"),
        source(
          "University of Waterloo cost of attendance",
          "https://uwaterloo.ca/future-students"
        ),
      ],
    }),
    city({
      id: "city-berlin",
      countryId: "country-germany",
      name: "Berlin",
      locationType: "Major city",
      summary:
        "Germany's capital and a large, international student city with a famously varied cultural scene and a competitive rental market.",
      campusAreas:
        "TU Berlin's main campus is in Charlottenburg, west of the centre, with good U-Bahn and S-Bahn connections.",
      nearbyCities: "Potsdam (~35 km); Hamburg (~290 km); Leipzig (~190 km).",
      nearestAirport: "Berlin Brandenburg Airport (BER).",
      publicTransport:
        "U-Bahn, S-Bahn, trams, buses and regional trains. A semester ticket is often included in the university contribution.",
      busTrainMetro:
        "U-Bahn and S-Bahn cover the city; trams are useful in the eastern districts.",
      nearestStation:
        "Ernst-Reuter-Platz and Zoologischer Garten are close to the TU Berlin campus.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Berlin rents have risen sharply and demand is high.",
      foodCost:
        "Check the university's cost estimate and local supermarket prices.",
      transportCost:
        "Check the semester ticket included with enrolment and current BVG fares.",
      facilities:
        "Hospitals, supermarkets, pharmacies, banks and libraries are available across the city.",
      studentLifestyle:
        "A large international community, museums, music, nightlife and many student initiatives. Winters are cold and dark.",
      sources: [
        source("BVG", "https://www.bvg.de/en"),
        source("Berlin Brandenburg Airport", "https://ber.berlin-airport.de/en.html"),
        source("TU Berlin cost & funding", "https://www.tu.berlin/en/studying"),
      ],
    }),
    city({
      id: "city-aachen",
      countryId: "country-germany",
      name: "Aachen",
      locationType: "Medium-sized city",
      summary:
        "A compact western German city known for engineering, with a large student population and easy access to Cologne, Düsseldorf and the Belgian/Dutch border.",
      campusAreas:
        "RWTH Aachen's main campus is integrated into the city centre, so many students walk or cycle between lectures and housing.",
      nearbyCities:
        "Cologne (~70 km); Düsseldorf (~90 km); Maastricht, Netherlands (~40 km).",
      nearestAirport:
        "Düsseldorf (DUS) and Cologne/Bonn (CGN) are the main international airports.",
      publicTransport:
        "ASEAG buses, regional trains and a compact city centre that is easy to explore on foot or by bicycle.",
      busTrainMetro:
        "Bus routes connect the campus and student districts; Aachen Hauptbahnhof has regional and intercity trains.",
      nearestStation:
        "Aachen Hauptbahnhof and Aachen West are the main rail stations for the university area.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Student housing is in high demand.",
      foodCost:
        "Check the university's cost estimate and local supermarket prices.",
      transportCost:
        "Check the semester ticket and ASEAG fares; many students cycle instead.",
      facilities:
        "Hospitals, supermarkets, pharmacies, banks and libraries are available around the city centre.",
      studentLifestyle:
        "A student-focused city with engineering societies, sports and a walkable old town. Winters are cool and damp.",
      sources: [
        source("ASEAG", "https://www.aseag.de/"),
        source("Düsseldorf Airport", "https://www.dus.com/en"),
        source("RWTH Aachen studying", "https://www.rwth-aachen.de/go/id/bqzx/?lidx=1"),
      ],
    }),
    city({
      id: "city-melbourne",
      countryId: "country-australia",
      name: "Melbourne",
      locationType: "Major city",
      summary:
        "A large, liveable city with a strong university sector, tram-heavy transport and a reputation for food, arts and sport.",
      campusAreas:
        "The University of Melbourne's Parkville campus is just north of the central business district, with trams and trains nearby.",
      nearbyCities: "Geelong (~75 km); Ballarat (~115 km); Sydney (~880 km).",
      nearestAirport: "Melbourne Airport (MEL).",
      publicTransport:
        "Trains, trams, buses and regional V/Line services. Myki is the standard ticketing system.",
      busTrainMetro:
        "Trams serve the central city and inner suburbs; trains connect the suburbs and regional towns.",
      nearestStation:
        "Melbourne Central and Parliament are useful for the Parkville and city campuses.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Inner-city rents are higher than outer suburbs.",
      foodCost:
        "Check the university's cost estimate and local grocery options.",
      transportCost:
        "Check Myki fares and the student concession rules for international students.",
      facilities:
        "Hospitals, supermarkets, pharmacies, banks and libraries are available across the inner city.",
      studentLifestyle:
        "Food, music, sport, museums and a large international student community. The climate is changeable.",
      sources: [
        source("Public Transport Victoria", "https://www.ptv.vic.gov.au/"),
        source("Melbourne Airport", "https://www.melbourneairport.com.au/"),
        source(
          "University of Melbourne cost of study",
          "https://study.unimelb.edu.au/"
        ),
      ],
    }),
    city({
      id: "city-brisbane",
      countryId: "country-australia",
      name: "Brisbane",
      locationType: "Medium-sized city",
      summary:
        "A warm, subtropical city with a growing university sector and a more relaxed pace than Melbourne or Sydney.",
      campusAreas:
        "The University of Queensland's St Lucia campus sits in a bend of the Brisbane River, a short bus or ferry ride from the centre.",
      nearbyCities:
        "Gold Coast (~80 km); Sunshine Coast (~100 km); Toowoomba (~125 km).",
      nearestAirport: "Brisbane Airport (BNE).",
      publicTransport:
        "Buses, trains, ferries and the CityCat. Translink's go card or contactless payment is used across the network.",
      busTrainMetro:
        "Buses and trains connect the suburbs; CityCat ferries are useful for riverside locations.",
      nearestStation:
        "Park Road and South Bank are useful for the St Lucia and city campuses.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Rents have risen in recent years.",
      foodCost:
        "Check the university's cost estimate and local grocery options.",
      transportCost:
        "Check Translink fares and student concession eligibility.",
      facilities:
        "Hospitals, supermarkets, pharmacies, banks and libraries are available around the city and university precincts.",
      studentLifestyle:
        "Outdoor lifestyle, sports, cafes and a growing international community. Summers are hot and humid.",
      sources: [
        source("Translink", "https://translink.com.au/"),
        source("Brisbane Airport", "https://www.bne.com.au/"),
        source(
          "University of Queensland cost of study",
          "https://study.uq.edu.au/"
        ),
      ],
    }),
    city({
      id: "city-amsterdam",
      countryId: "country-netherlands",
      name: "Amsterdam",
      locationType: "Major city",
      summary:
        "A compact, international capital with many English-taught programmes, heavy demand for housing and excellent public transport.",
      campusAreas:
        "The University of Amsterdam has several city-centre locations, including Roeterseiland and the Science Park campus.",
      nearbyCities: "Utrecht (~45 km); The Hague (~60 km); Rotterdam (~75 km).",
      nearestAirport: "Amsterdam Airport Schiphol (AMS).",
      publicTransport:
        "Trams, metro, buses, ferries and frequent trains. A public transport chip card or contactless payment is standard.",
      busTrainMetro:
        "Trams serve the historic centre; metro lines connect the centre, east and south; trains serve the wider region.",
      nearestStation:
        "Weesperplein, Waterlooplein and Amsterdam Science Park are useful for UvA locations.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Housing is scarce and expensive; start early.",
      foodCost:
        "Check the university's cost estimate and local supermarket prices.",
      transportCost:
        "Check GVB fares and any student travel product you may be eligible for.",
      facilities:
        "Hospitals, supermarkets, pharmacies, banks and libraries are available throughout the city.",
      studentLifestyle:
        "A highly international city with museums, music, cycling and a large student community. Winters are cool and windy.",
      sources: [
        source("GVB", "https://www.gvb.nl/en"),
        source("Amsterdam Airport Schiphol", "https://www.schiphol.nl/en/"),
        source(
          "University of Amsterdam cost of study",
          "https://www.uva.nl/en/education"
        ),
      ],
    }),
    city({
      id: "city-eindhoven",
      countryId: "country-netherlands",
      name: "Eindhoven",
      locationType: "Medium-sized city",
      summary:
        "A technology-focused city in the south of the Netherlands, home to a compact technical university and a growing international community.",
      campusAreas:
        "Eindhoven University of Technology's campus is a short walk from the central station and is integrated with research and industry facilities.",
      nearbyCities: "Tilburg (~35 km); 's-Hertogenbosch (~35 km); Amsterdam (~125 km).",
      nearestAirport:
        "Eindhoven Airport (EIN) for European routes; Schiphol (AMS) for long-haul flights.",
      publicTransport:
        "Buses and trains connect the city and region; the campus is walkable from the central station.",
      busTrainMetro:
        "Hermes buses serve the city; NS trains connect Eindhoven to Amsterdam, Utrecht and other cities.",
      nearestStation:
        "Eindhoven Centraal is the main station and is close to the TU/e campus.",
      monthlyRent:
        "Check current listings and the university's cost guidance. Student housing demand is high.",
      foodCost:
        "Check the university's cost estimate and local supermarket prices.",
      transportCost:
        "Check Hermes and NS fares, and any student travel product you may be eligible for.",
      facilities:
        "Hospitals, supermarkets, pharmacies, banks and libraries are available around the centre and campus.",
      studentLifestyle:
        "A technology and design-oriented city with a compact centre, student teams and a growing international community.",
      sources: [
        source("Hermes", "https://www.hermes.nl/"),
        source("Eindhoven Airport", "https://www.eindhovenairport.nl/en"),
        source(
          "TU/e cost of study",
          "https://www.tue.nl/en/education"
        ),
      ],
    }),
  ],
  universities: [
    university({
      id: "uni-boston-university",
      countryId: "country-usa",
      cityId: "city-boston",
      slug: "boston-university",
      name: "Boston University",
      shortName: "BU",
      summary:
        "A large private research university spread along Commonwealth Avenue, with strong programmes in business, engineering, communication and health sciences.",
      website: "https://www.bu.edu/",
      address: "1 Silber Way, Boston, MA 02215, United States",
      region: "Massachusetts",
      campusName: "Charles River Campus",
      campusSetting: "City centre",
      cityClassification: "Major city",
      nearbyCities: "Providence (~80 km); New York City (~350 km).",
      nearestAirport: "Boston Logan International Airport (BOS).",
      publicTransport:
        "MBTA Green Line stops along Commonwealth Avenue; buses and commuter rail connect the wider region.",
      courses: [
        "Business",
        "Engineering",
        "Arts & Sciences",
        "Communication",
        "Health & Rehabilitation Sciences",
      ],
      intakes: "Fall and spring; check the programme page.",
      applicationPortal: "https://www.bu.edu/admissions/",
      admissionsContact: "https://www.bu.edu/admissions/",
      scholarships:
        "BU merit awards, need-based aid for eligible applicants, and external funding. Check the financial aid page for international student options.",
      sources: [
        source("Boston University", "https://www.bu.edu/"),
        source("Admissions", "https://www.bu.edu/admissions/"),
        source("International Students & Scholars Office", "https://www.bu.edu/isso/"),
        source("Housing", "https://www.bu.edu/housing/"),
        source("Financial aid", "https://www.bu.edu/finaid/"),
      ],
      climate: "Four distinct seasons, with cold and snowy winters.",
    }),
    university({
      id: "uni-ut-austin",
      countryId: "country-usa",
      cityId: "city-austin",
      slug: "university-of-texas-at-austin",
      name: "The University of Texas at Austin",
      shortName: "UT Austin",
      summary:
        "A large public research university in central Austin, known for engineering, computer science, business and a wide range of liberal arts programmes.",
      website: "https://www.utexas.edu/",
      address: "110 Inner Campus Drive, Austin, TX 78705, United States",
      region: "Texas",
      campusName: "Main Campus",
      campusSetting: "City centre",
      cityClassification: "Medium-sized city",
      nearbyCities: "San Antonio (~130 km); Houston (~260 km).",
      nearestAirport: "Austin-Bergstrom International Airport (AUS).",
      publicTransport:
        "CapMetro buses and the MetroRail connect the campus, downtown and nearby suburbs.",
      courses: [
        "Business",
        "Engineering",
        "Computer Science",
        "Liberal Arts",
        "Natural Sciences",
      ],
      intakes: "Fall and spring; check the programme page.",
      applicationPortal: "https://admissions.utexas.edu/",
      admissionsContact: "https://admissions.utexas.edu/",
      scholarships:
        "University merit and need-based awards, departmental funding and external scholarships. Check the financial aid and international office pages.",
      sources: [
        source("The University of Texas at Austin", "https://www.utexas.edu/"),
        source("Admissions", "https://admissions.utexas.edu/"),
        source("International Student & Scholar Services", "https://global.utexas.edu/isss/"),
        source("Housing", "https://housing.utexas.edu/"),
        source("Cost & aid", "https://onestop.utexas.edu/"),
      ],
      climate: "Hot summers and mild winters; plan for extreme heat in late summer.",
    }),
    university({
      id: "uni-ucl",
      countryId: "country-uk",
      cityId: "city-london",
      slug: "university-college-london",
      name: "University College London",
      shortName: "UCL",
      summary:
        "A large, research-intensive university in Bloomsbury, central London, with strengths across architecture, engineering, social sciences, arts and medical sciences.",
      website: "https://www.ucl.ac.uk/",
      address: "Gower Street, London WC1E 6BT, United Kingdom",
      region: "Greater London",
      campusName: "Bloomsbury Campus",
      campusSetting: "City centre",
      cityClassification: "Major city",
      nearbyCities: "Oxford (~90 km); Cambridge (~95 km).",
      nearestAirport:
        "Heathrow (LHR), Gatwick (LGW), Stansted (STN) and London City (LCY).",
      publicTransport:
        "Euston, King's Cross St Pancras, Warren Street and Tottenham Court Road stations are within walking distance.",
      courses: [
        "Architecture",
        "Engineering",
        "Social Sciences",
        "Arts & Humanities",
        "Medical Sciences",
      ],
      intakes: "September and January; check the programme page.",
      applicationPortal: "https://www.ucl.ac.uk/prospective-students",
      admissionsContact: "https://www.ucl.ac.uk/prospective-students",
      scholarships:
        "UCL global scholarships, departmental awards and external funding such as Chevening. Check the scholarships page for eligibility.",
      sources: [
        source("UCL", "https://www.ucl.ac.uk/"),
        source("Prospective students", "https://www.ucl.ac.uk/prospective-students"),
        source(
          "International students",
          "https://www.ucl.ac.uk/students/support-and-wellbeing/international-students"
        ),
        source("Accommodation", "https://www.ucl.ac.uk/students/accommodation"),
      ],
      climate: "Temperate and often cloudy; winters are cool but rarely severe.",
    }),
    university({
      id: "uni-manchester",
      countryId: "country-uk",
      cityId: "city-manchester",
      slug: "university-of-manchester",
      name: "The University of Manchester",
      shortName: "Manchester",
      summary:
        "A large public research university along Oxford Road, with a broad portfolio spanning business, engineering, humanities, life sciences and social sciences.",
      website: "https://www.manchester.ac.uk/",
      address: "Oxford Road, Manchester M13 9PL, United Kingdom",
      region: "Greater Manchester",
      campusName: "Oxford Road Campus",
      campusSetting: "City centre",
      cityClassification: "Medium-sized city",
      nearbyCities: "Liverpool (~55 km); Leeds (~70 km).",
      nearestAirport: "Manchester Airport (MAN).",
      publicTransport:
        "Frequent buses along Oxford Road, Metrolink trams and Manchester Piccadilly rail station.",
      courses: [
        "Business",
        "Engineering",
        "Humanities",
        "Life Sciences",
        "Social Sciences",
      ],
      intakes: "September and January; check the programme page.",
      applicationPortal: "https://www.manchester.ac.uk/study/",
      admissionsContact: "https://www.manchester.ac.uk/study/",
      scholarships:
        "University merit awards, country-specific scholarships and external funding. Check the international scholarships page for deadlines.",
      sources: [
        source("The University of Manchester", "https://www.manchester.ac.uk/"),
        source("Study", "https://www.manchester.ac.uk/study/"),
        source("International students", "https://www.manchester.ac.uk/study/international/"),
        source("Accommodation", "https://www.manchester.ac.uk/study/accommodation/"),
      ],
      climate: "Cool and often rainy; pack layers and waterproof clothing.",
    }),
    university({
      id: "uni-toronto",
      countryId: "country-canada",
      cityId: "city-toronto",
      slug: "university-of-toronto",
      name: "University of Toronto",
      shortName: "U of T",
      summary:
        "Canada's largest research university, with a downtown St. George campus and strengths across arts and science, engineering, commerce, computer science and life sciences.",
      website: "https://www.utoronto.ca/",
      address: "27 King's College Circle, Toronto, ON M5S 1A1, Canada",
      region: "Ontario",
      campusName: "St. George Campus",
      campusSetting: "City centre",
      cityClassification: "Major city",
      nearbyCities: "Hamilton (~70 km); Ottawa (~450 km).",
      nearestAirport:
        "Toronto Pearson International Airport (YYZ) and Billy Bishop Toronto City Airport (YTZ).",
      publicTransport:
        "TTC subway, streetcars and buses; GO Transit connects the wider region.",
      courses: [
        "Arts & Science",
        "Engineering",
        "Commerce",
        "Computer Science",
        "Life Sciences",
      ],
      intakes: "Fall, winter and summer; check the programme page.",
      applicationPortal: "https://futurestudents.utoronto.ca/",
      admissionsContact: "https://futurestudents.utoronto.ca/",
      scholarships:
        "U of T entrance awards, faculty-specific scholarships and external funding. Check the future students page for international eligibility.",
      sources: [
        source("University of Toronto", "https://www.utoronto.ca/"),
        source("Future students", "https://futurestudents.utoronto.ca/"),
        source(
          "International students",
          "https://futurestudents.utoronto.ca/international-students"
        ),
        source("Housing", "https://studentlife.utoronto.ca/service/housing/"),
      ],
      climate: "Cold, snowy winters and warm summers.",
    }),
    university({
      id: "uni-waterloo",
      countryId: "country-canada",
      cityId: "city-waterloo",
      slug: "university-of-waterloo",
      name: "University of Waterloo",
      shortName: "Waterloo",
      summary:
        "A research university known for engineering, computer science, mathematics and co-operative education, with a compact campus in Waterloo, Ontario.",
      website: "https://uwaterloo.ca/",
      address: "200 University Avenue West, Waterloo, ON N2L 3G1, Canada",
      region: "Ontario",
      campusName: "Main Campus",
      campusSetting: "City centre",
      cityClassification: "Small town",
      nearbyCities: "Kitchener (~10 km); Guelph (~30 km); Toronto (~110 km).",
      nearestAirport:
        "Region of Waterloo International Airport (YKF) for regional flights; Toronto Pearson (YYZ) for long-haul routes.",
      publicTransport:
        "Grand River Transit buses and the ION light rail connect Waterloo, Kitchener and Cambridge.",
      courses: [
        "Engineering",
        "Computer Science",
        "Mathematics",
        "Environment",
        "Health",
      ],
      intakes: "Fall, winter and spring; check the programme page.",
      applicationPortal: "https://uwaterloo.ca/future-students",
      admissionsContact: "https://uwaterloo.ca/future-students",
      scholarships:
        "Entrance scholarships, co-op earnings and external awards. Check the future students page for international student funding.",
      sources: [
        source("University of Waterloo", "https://uwaterloo.ca/"),
        source("Future students", "https://uwaterloo.ca/future-students"),
        source("International students", "https://uwaterloo.ca/international-students"),
        source("Housing", "https://uwaterloo.ca/housing/"),
      ],
      climate: "Cold, snowy winters and warm summers.",
    }),
    university({
      id: "uni-tu-berlin",
      countryId: "country-germany",
      cityId: "city-berlin",
      slug: "technical-university-of-berlin",
      name: "Technische Universität Berlin",
      shortName: "TU Berlin",
      summary:
        "A large technical university in Charlottenburg with strengths in engineering, computer science, mathematics, economics and natural sciences.",
      website: "https://www.tu.berlin/en/",
      address: "Straße des 17. Juni 135, 10623 Berlin, Germany",
      region: "Berlin",
      campusName: "Charlottenburg Campus",
      campusSetting: "City centre",
      cityClassification: "Major city",
      nearbyCities: "Potsdam (~35 km); Hamburg (~290 km).",
      nearestAirport: "Berlin Brandenburg Airport (BER).",
      publicTransport:
        "U-Bahn, S-Bahn, buses and trams; Ernst-Reuter-Platz and Zoologischer Garten are close to the main campus.",
      courses: [
        "Engineering",
        "Computer Science",
        "Economics",
        "Mathematics",
        "Natural Sciences",
      ],
      intakes: "Winter and summer semesters; check the programme page.",
      applicationPortal: "https://www.tu.berlin/en/studying",
      admissionsContact: "https://www.tu.berlin/en/studying",
      scholarships:
        "DAAD, Deutschlandstipendium and university funding. Check the international office for programme-specific options.",
      sources: [
        source("TU Berlin", "https://www.tu.berlin/en/"),
        source("Studying", "https://www.tu.berlin/en/studying"),
        source(
          "International students",
          "https://www.tu.berlin/en/studying/international-students"
        ),
        source("Student housing (Studierendenwerk)", "https://www.stw.berlin/en/housing/"),
      ],
      climate: "Temperate with cold winters and warm summers.",
    }),
    university({
      id: "uni-rwth-aachen",
      countryId: "country-germany",
      cityId: "city-aachen",
      slug: "rwth-aachen-university",
      name: "RWTH Aachen University",
      shortName: "RWTH",
      summary:
        "A leading German technical university with a strong engineering identity, integrated into the city of Aachen and closely linked to regional industry.",
      website: "https://www.rwth-aachen.de/",
      address: "Templergraben 55, 52062 Aachen, Germany",
      region: "North Rhine-Westphalia",
      campusName: "Aachen City Campus",
      campusSetting: "City centre",
      cityClassification: "Medium-sized city",
      nearbyCities:
        "Cologne (~70 km); Düsseldorf (~90 km); Maastricht, Netherlands (~40 km).",
      nearestAirport:
        "Düsseldorf (DUS) and Cologne/Bonn (CGN) are the main international airports.",
      publicTransport:
        "ASEAG buses, regional trains and a compact city centre that is easy to explore by bicycle.",
      courses: [
        "Engineering",
        "Computer Science",
        "Mathematics",
        "Natural Sciences",
        "Business & Economics",
      ],
      intakes: "Winter and summer semesters; check the programme page.",
      applicationPortal: "https://www.rwth-aachen.de/go/id/bqzx/?lidx=1",
      admissionsContact: "https://www.rwth-aachen.de/go/id/bqzx/?lidx=1",
      scholarships:
        "DAAD, Deutschlandstipendium and RWTH funding. Check the international office for programme-specific options.",
      sources: [
        source("RWTH Aachen University", "https://www.rwth-aachen.de/"),
        source("Studying", "https://www.rwth-aachen.de/go/id/bqzx/?lidx=1"),
        source("International Office", "https://www.rwth-aachen.de/go/id/bqzx/?lidx=1"),
      ],
      climate: "Temperate with cool, damp winters.",
    }),
    university({
      id: "uni-melbourne",
      countryId: "country-australia",
      cityId: "city-melbourne",
      slug: "university-of-melbourne",
      name: "The University of Melbourne",
      shortName: "Melbourne",
      summary:
        "A research-intensive university with a Parkville campus near the centre of Melbourne and strengths across arts, engineering, business, science and health.",
      website: "https://www.unimelb.edu.au/",
      address: "Parkville, Victoria 3010, Australia",
      region: "Victoria",
      campusName: "Parkville Campus",
      campusSetting: "City centre",
      cityClassification: "Major city",
      nearbyCities: "Geelong (~75 km); Ballarat (~115 km).",
      nearestAirport: "Melbourne Airport (MEL).",
      publicTransport:
        "Trams, trains and buses; Melbourne Central and Parliament stations are close to the Parkville campus.",
      courses: [
        "Arts",
        "Engineering",
        "Business",
        "Science",
        "Medicine & Health",
      ],
      intakes: "February and July; check the programme page.",
      applicationPortal: "https://study.unimelb.edu.au/",
      admissionsContact: "https://study.unimelb.edu.au/",
      scholarships:
        "Melbourne scholarships, faculty awards and external funding. Check the study page for international student deadlines.",
      sources: [
        source("The University of Melbourne", "https://www.unimelb.edu.au/"),
        source("Study", "https://study.unimelb.edu.au/"),
        source(
          "International students",
          "https://study.unimelb.edu.au/international-students"
        ),
        source("Accommodation", "https://students.unimelb.edu.au/accommodation"),
      ],
      climate: "Temperate and changeable; pack layers for all seasons.",
    }),
    university({
      id: "uni-uq",
      countryId: "country-australia",
      cityId: "city-brisbane",
      slug: "university-of-queensland",
      name: "The University of Queensland",
      shortName: "UQ",
      summary:
        "A large research university with a riverside St Lucia campus in Brisbane, known for business, engineering, science, humanities and health sciences.",
      website: "https://www.uq.edu.au/",
      address: "St Lucia, Queensland 4072, Australia",
      region: "Queensland",
      campusName: "St Lucia Campus",
      campusSetting: "Suburb",
      cityClassification: "Medium-sized city",
      nearbyCities: "Gold Coast (~80 km); Sunshine Coast (~100 km).",
      nearestAirport: "Brisbane Airport (BNE).",
      publicTransport:
        "Buses, trains and CityCat ferries; the St Lucia campus is served by frequent bus routes.",
      courses: [
        "Business",
        "Engineering",
        "Science",
        "Humanities",
        "Health Sciences",
      ],
      intakes: "February and July; check the programme page.",
      applicationPortal: "https://study.uq.edu.au/",
      admissionsContact: "https://study.uq.edu.au/",
      scholarships:
        "UQ scholarships, faculty awards and external funding. Check the study page for international student eligibility.",
      sources: [
        source("The University of Queensland", "https://www.uq.edu.au/"),
        source("Study", "https://study.uq.edu.au/"),
        source(
          "International students",
          "https://study.uq.edu.au/international-students"
        ),
        source("Accommodation", "https://my.uq.edu.au/student-support/accommodation"),
      ],
      climate: "Subtropical with hot, humid summers and mild winters.",
    }),
    university({
      id: "uni-uva",
      countryId: "country-netherlands",
      cityId: "city-amsterdam",
      slug: "university-of-amsterdam",
      name: "University of Amsterdam",
      shortName: "UvA",
      summary:
        "A large public research university with city-centre locations in Amsterdam, offering a broad range of English-taught programmes in economics, social sciences, humanities, science and law.",
      website: "https://www.uva.nl/en",
      address: "Spui 21, 1012 WX Amsterdam, Netherlands",
      region: "North Holland",
      campusName: "Roeterseiland Campus",
      campusSetting: "City centre",
      cityClassification: "Major city",
      nearbyCities: "Utrecht (~45 km); The Hague (~60 km).",
      nearestAirport: "Amsterdam Airport Schiphol (AMS).",
      publicTransport:
        "Trams, metro, buses and ferries; Weesperplein and Waterlooplein are close to several UvA locations.",
      courses: [
        "Economics & Business",
        "Social Sciences",
        "Humanities",
        "Science",
        "Law",
      ],
      intakes: "September and February; check the programme page.",
      applicationPortal: "https://www.uva.nl/en/education",
      admissionsContact: "https://www.uva.nl/en/education",
      scholarships:
        "Amsterdam Merit Scholarship, Holland Scholarship and faculty awards. Check the UvA scholarships page for deadlines.",
      sources: [
        source("University of Amsterdam", "https://www.uva.nl/en"),
        source("Education", "https://www.uva.nl/en/education"),
        source(
          "International students",
          "https://www.uva.nl/en/education/international-students/international-students.html"
        ),
        source(
          "Housing",
          "https://www.uva.nl/en/education/international-students/housing/housing.html"
        ),
      ],
      climate: "Maritime, cool and windy with frequent rain.",
    }),
    university({
      id: "uni-tue",
      countryId: "country-netherlands",
      cityId: "city-eindhoven",
      slug: "eindhoven-university-of-technology",
      name: "Eindhoven University of Technology",
      shortName: "TU/e",
      summary:
        "A technology-focused university with a compact campus next to Eindhoven Centraal, known for engineering, computer science, mathematics, industrial design and biomedical technology.",
      website: "https://www.tue.nl/en/",
      address: "De Zaale, 5612 AZ Eindhoven, Netherlands",
      region: "North Brabant",
      campusName: "TU/e Campus",
      campusSetting: "City centre",
      cityClassification: "Medium-sized city",
      nearbyCities: "Tilburg (~35 km); 's-Hertogenbosch (~35 km).",
      nearestAirport:
        "Eindhoven Airport (EIN) for European routes; Schiphol (AMS) for long-haul flights.",
      publicTransport:
        "Eindhoven Centraal is a short walk from campus; Hermes buses and NS trains connect the city and region.",
      courses: [
        "Engineering",
        "Computer Science",
        "Mathematics",
        "Industrial Design",
        "Biomedical Technology",
      ],
      intakes: "September and February; check the programme page.",
      applicationPortal: "https://www.tue.nl/en/education",
      admissionsContact: "https://www.tue.nl/en/education",
      scholarships:
        "TU/e scholarships, Holland Scholarship and external funding. Check the education page for international student options.",
      sources: [
        source("Eindhoven University of Technology", "https://www.tue.nl/en/"),
        source("Education", "https://www.tue.nl/en/education"),
        source(
          "International students",
          "https://www.tue.nl/en/education/international-students"
        ),
        source(
          "Housing",
          "https://www.tue.nl/en/education/international-students/housing"
        ),
      ],
      climate: "Temperate, similar to Amsterdam, with cool winters and mild summers.",
    }),
  ],
};
