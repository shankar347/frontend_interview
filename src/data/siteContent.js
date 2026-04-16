/** Content aligned with Test Round 1.pdf (ICAEBMS-2026). */
export const conference = {
  shortName: "ICAEBMS-2026",
  fullTitle:
    "International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities",
  theme: "Interdisciplinary Innovations for a Sustainable Future",
  format: "Hybrid Conference: In Person + Online",
  hybridNotice:
    "HYBRID EVENT — You can participate in person in Bangkok, Thailand or virtually from your home or office.",
  dates: "10–11 Aug, 2026",
  location: "Bangkok, Thailand",
  organizer: "Confworld Educational Research and Development Association",
  organizerAddress:
    "No.147/383A, Second Floor, Paper Mills Road, Peravallur, Chennai-600082, Tamil Nadu, India.",
  isbn: "978-95-813001-3-6",
  email: "info@icaebms.com",
  phone: "+91 8072381719",
}

/** Countdown target: conference opens (Bangkok, ICT). */
export const conferenceStartISO = "2026-08-10T09:00:00+07:00"

/** Remote hero background (falls back to local asset in HomePage). */
export const heroVideoMp4Remote =
  "https://videos.pexels.com/video-files/3255215/3255215-hd_1920_1080_25fps.mp4"

export const welcomeParagraphs = [
  `With the theme “${conference.theme}”, ICAEBMS serves as a global platform where researchers, academicians, professionals and students from around the world come together to exchange ideas, present findings and build collaborations across disciplines.`,
  "This conference is not just an academic gathering — it is a space for innovation, interchange and the creation of solutions that address real-world challenges. By bringing together experts in science, engineering, education, business, management, social sciences and humanities, ICAEBMS fosters interdisciplinary connections that pave the way for impactful change.",
  "Join us in shaping the future through knowledge, research and collaboration. Together, we can drive progress for a more sustainable and inclusive world.",
]

export const themeNarrative =
  "The theme reflects the core vision of ICAEBMS: bringing together diverse fields of knowledge to address global challenges. By uniting applied science, engineering, education, business, management, social sciences and humanities, the conference aims to foster creativity, collaboration and sustainable solutions that transcend traditional boundaries."

/**
 * “Through this theme, ICAEBMS seeks” — pillar cards (PDF content; layout matches brochure).
 * `wide` + `accent`: bottom-row featured card spanning two columns.
 */
export const themeSeekPillars = [
  {
    id: "collab",
    title: "Encourage interdisciplinary collaboration",
    description: "among researchers, academicians, industry experts and policymakers.",
    icon: "users",
  },
  {
    id: "bridge",
    title: "Bridge the gap between science, technology, business and society",
    description: "through knowledge-sharing and discourse.",
    icon: "building",
  },
  {
    id: "empower",
    title: "Empower future leaders and young scholars",
    description: "with insights and opportunities for global engagement.",
    icon: "book",
  },
  {
    id: "foster",
    title: "Foster solutions that are practical, inclusive and impactful",
    description: "in addressing real-world challenges.",
    icon: "target",
    wide: true,
    accent: true,
  },
  {
    id: "innovate",
    title: "Promote innovative research and practices",
    description: "that contribute to sustainable development.",
    icon: "bulb",
  },
]

export const highlights = [
  {
    title: "Multidisciplinary Platform",
    body: "A unique forum uniting applied science, engineering, education, business, management, social sciences and humanities.",
    icon: "users",
  },
  {
    title: "Global Participation",
    body: "Engage with renowned scholars, industry leaders and professionals from across the world.",
    icon: "globe",
  },
  {
    title: "Call for Papers & Publications",
    body: "Opportunities to publish in reputed Scopus indexed journals. Selected papers from the conference will be considered for publication in high-impact journals, offering authors the chance to showcase their research on a global platform.",
    icon: "file",
  },
  {
    title: "Expert Keynote Sessions",
    body: "Insights from distinguished speakers on cutting-edge research and global challenges.",
    icon: "mic",
  },
  {
    title: "Interactive Workshops & Panel Discussions",
    body: "Hands-on learning and thought-provoking debates on contemporary issues.",
    icon: "panels",
  },
  {
    title: "Networking Opportunities",
    body: "Build academic, industrial and international collaborations.",
    icon: "network",
  },
  {
    title: "Recognition & Awards",
    body: "Best paper and presentation awards to acknowledge outstanding contributions.",
    icon: "award",
  },
  {
    title: "Student & Young Researcher Engagement",
    body: "Special sessions to inspire and guide the next generation of scholars.",
    icon: "grad",
  },
]

/** PDF session list (titles also used with imagery in sessionTrackMedia.js). */
export const sessionTracks = [
  "Session 1: Applied Science",
  "Session 2: Engineering & Technological Advancements",
  "Session 3: Education & Pedagogical Innovations",
  "Session 4: Business & Management Studies",
  "Session 5: Social Science and Humanities",
  "Session 6: Finance, Accountancy and Marketing",
]

/** PDF submission timeline — icons map to `DeadlineGlyph` in HomePage.jsx */
export const deadlines = [
  { label: "Early Bird registration deadline", date: "31 Dec 2025", icon: "tag" },
  { label: "Abstract submission", date: "31 Jan 2026", icon: "abstract" },
  { label: "Full paper submission", date: "28 Feb 2026", icon: "paper" },
  { label: "Final Registration", date: "31 Mar 2026", icon: "register" },
]

export const whyJoinIntro =
  "The International Conference on Applied Science, Engineering, Education, Business, Management and Social Science & Humanities (ICAEBMS) is more than just an academic event — it is a global platform for innovation, collaboration and growth."

export const whyJoin = [
  "Present Your Research — Share your ideas, findings and innovations with a global audience.",
  "Get Published — Opportunities to publish in reputed journals with high impact factor and indexed conference proceedings.",
  "Learn from Experts — Gain insights from keynote addresses, workshops and panel discussions by leading scholars and professionals.",
  "Expand Your Network — Connect with academicians, industry leaders, policymakers and fellow researchers worldwide.",
  "Interdisciplinary Exposure — Explore diverse perspectives by engaging with multiple fields of study.",
  "Recognition & Awards — Compete for Best Paper and Best Presentation awards.",
  "Global Visibility — Enhance your academic profile and contribute to international collaborations.",
  "Empower the Future — Inspire and be inspired by young researchers, innovators and thought leaders.",
]

export const publicationNote =
  "ICAEBMS-2026 proceedings will be submitted to the Web of Science Book Citation Index (BkCI) and Scopus for evaluation and indexing purposes (T&C apply)."
