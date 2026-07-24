export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  growth: string;
  isPositive: boolean;
  sparkline: { v: number }[];
  description: string;
}

export const kpiData: Record<string, KpiMetric> = {
  totalVisitors: {
    id: "totalVisitors",
    label: "Total Visitors",
    value: "142,850",
    growth: "+14.2%",
    isPositive: true,
    sparkline: [{ v: 12 }, { v: 15 }, { v: 14 }, { v: 18 }, { v: 22 }, { v: 21 }, { v: 28 }],
    description: "vs. previous 30 days"
  },
  uniqueVisitors: {
    id: "uniqueVisitors",
    label: "Unique Visitors",
    value: "98,420",
    growth: "+11.8%",
    isPositive: true,
    sparkline: [{ v: 8 }, { v: 10 }, { v: 12 }, { v: 15 }, { v: 16 }, { v: 19 }, { v: 23 }],
    description: "first-time distinct users"
  },
  pageViews: {
    id: "pageViews",
    label: "Page Views",
    value: "428,190",
    growth: "+18.5%",
    isPositive: true,
    sparkline: [{ v: 30 }, { v: 35 }, { v: 32 }, { v: 48 }, { v: 52 }, { v: 61 }, { v: 72 }],
    description: "total page renders"
  },
  activeUsers: {
    id: "activeUsers",
    label: "Active Users",
    value: "1,428",
    growth: "+8.4%",
    isPositive: true,
    sparkline: [{ v: 110 }, { v: 125 }, { v: 118 }, { v: 132 }, { v: 140 }, { v: 138 }, { v: 150 }],
    description: "currently online users"
  },
  avgSessionDuration: {
    id: "avgSessionDuration",
    label: "Avg Session Duration",
    value: "3m 42s",
    growth: "+5.2%",
    isPositive: true,
    sparkline: [{ v: 180 }, { v: 195 }, { v: 190 }, { v: 205 }, { v: 210 }, { v: 215 }, { v: 222 }],
    description: "time spent per session"
  },
  bounceRate: {
    id: "bounceRate",
    label: "Bounce Rate",
    value: "34.2%",
    growth: "-2.1%",
    isPositive: true, // drop in bounce rate is positive
    sparkline: [{ v: 40 }, { v: 38 }, { v: 37 }, { v: 36 }, { v: 35 }, { v: 34.5 }, { v: 34.2 }],
    description: "single page sessions"
  },
  conversionRate: {
    id: "conversionRate",
    label: "Conversion Rate",
    value: "4.85%",
    growth: "+0.8%",
    isPositive: true,
    sparkline: [{ v: 3.8 }, { v: 4.0 }, { v: 4.1 }, { v: 4.3 }, { v: 4.5 }, { v: 4.7 }, { v: 4.85 }],
    description: "leads generated / visitors"
  },
  ctaClickRate: {
    id: "ctaClickRate",
    label: "CTA Click Rate",
    value: "12.4%",
    growth: "+1.5%",
    isPositive: true,
    sparkline: [{ v: 9.8 }, { v: 10.2 }, { v: 10.8 }, { v: 11.4 }, { v: 11.9 }, { v: 12.1 }, { v: 12.4 }],
    description: "clicks on primary CTAs"
  }
};

export const visitorAnalyticsTrend = {
  "24H": [
    { time: "00:00", visitors: 1200, sessions: 1450, pageViews: 3800, conversions: 42 },
    { time: "04:00", visitors: 850, sessions: 980, pageViews: 2400, conversions: 28 },
    { time: "08:00", visitors: 3400, sessions: 4100, pageViews: 11200, conversions: 145 },
    { time: "12:00", visitors: 5800, sessions: 6900, pageViews: 19400, conversions: 280 },
    { time: "16:00", visitors: 6200, sessions: 7400, pageViews: 21000, conversions: 310 },
    { time: "20:00", visitors: 4100, sessions: 4900, pageViews: 13500, conversions: 185 }
  ],
  "7D": [
    { time: "Mon", visitors: 18400, sessions: 22100, pageViews: 58900, conversions: 890 },
    { time: "Tue", visitors: 21200, sessions: 25400, pageViews: 68100, conversions: 1050 },
    { time: "Wed", visitors: 22800, sessions: 27200, pageViews: 74200, conversions: 1180 },
    { time: "Thu", visitors: 20900, sessions: 24800, pageViews: 67300, conversions: 1020 },
    { time: "Fri", visitors: 19500, sessions: 23100, pageViews: 62400, conversions: 940 },
    { time: "Sat", visitors: 14200, sessions: 16800, pageViews: 44100, conversions: 620 },
    { time: "Sun", visitors: 15850, sessions: 18600, pageViews: 49200, conversions: 710 }
  ],
  "30D": [
    { time: "Week 1", visitors: 32100, sessions: 38400, pageViews: 98200, conversions: 1520 },
    { time: "Week 2", visitors: 34800, sessions: 41200, pageViews: 106400, conversions: 1680 },
    { time: "Week 3", visitors: 37200, sessions: 44100, pageViews: 114800, conversions: 1810 },
    { time: "Week 4", visitors: 38750, sessions: 45900, pageViews: 121000, conversions: 1918 }
  ],
  "90D": [
    { time: "May", visitors: 115000, sessions: 138000, pageViews: 352000, conversions: 5420 },
    { time: "Jun", visitors: 128000, sessions: 154000, pageViews: 395000, conversions: 6180 },
    { time: "Jul", visitors: 142850, sessions: 169600, pageViews: 428190, conversions: 6928 }
  ]
};

export const trafficSources = [
  { name: "Google Search", visitors: 48200, conversions: 2892, percentage: 33.7, color: "#3ac1ef" },
  { name: "Direct", visitors: 28400, conversions: 1704, percentage: 19.8, color: "#288f87" },
  { name: "LinkedIn", visitors: 22100, conversions: 1547, percentage: 15.5, color: "#0077b5" },
  { name: "Facebook", visitors: 14800, conversions: 592, percentage: 10.3, color: "#1877f2" },
  { name: "Instagram", visitors: 11200, conversions: 392, percentage: 7.8, color: "#e4405f" },
  { name: "Referral", visitors: 10650, conversions: 585, percentage: 7.5, color: "#b45309" },
  { name: "Email Campaign", visitors: 7500, conversions: 525, percentage: 5.4, color: "#be123c" }
];

export const deviceAnalytics = [
  { device: "Desktop", visitors: "85,710", avgSession: "4m 12s", bounceRate: "31.4%", conversionRate: "5.82%", percentage: 60, icon: "Laptop" },
  { device: "Mobile", visitors: "49,997", avgSession: "2m 54s", bounceRate: "38.6%", conversionRate: "3.64%", percentage: 35, icon: "Smartphone" },
  { device: "Tablet", visitors: "7,143", avgSession: "3m 28s", bounceRate: "33.1%", conversionRate: "4.12%", percentage: 5, icon: "Tablet" }
];

export const countryAnalytics = [
  { country: "India", visitors: "42,850", conversions: "2,356", avgSession: "3m 50s", trafficPct: "30.0%", code: "IN", flag: "🇮🇳" },
  { country: "USA", visitors: "38,560", conversions: "2,120", avgSession: "4m 05s", trafficPct: "27.0%", code: "US", flag: "🇺🇸" },
  { country: "Canada", visitors: "17,140", conversions: "942", avgSession: "3m 35s", trafficPct: "12.0%", code: "CA", flag: "🇨🇦" },
  { country: "Germany", visitors: "14,280", conversions: "785", avgSession: "3m 48s", trafficPct: "10.0%", code: "DE", flag: "🇩🇪" },
  { country: "Australia", visitors: "11,430", conversions: "628", avgSession: "3m 22s", trafficPct: "8.0%", code: "AU", flag: "🇦🇺" },
  { country: "United Kingdom", visitors: "9,990", conversions: "549", avgSession: "3m 40s", trafficPct: "7.0%", code: "GB", flag: "🇬🇧" },
  { country: "Others", visitors: "8,600", conversions: "370", avgSession: "3m 10s", trafficPct: "6.0%", code: "GL", flag: "🌐" }
];

export const landingPageFunnel = [
  { stage: "Landing Page Viewed", visitors: 142850, percentage: "100%", dropOff: "0%" },
  { stage: "Scrolled 25%", visitors: 118565, percentage: "83.0%", dropOff: "17.0%" },
  { stage: "Scrolled 50%", visitors: 94280, percentage: "66.0%", dropOff: "20.5%" },
  { stage: "Scrolled 75%", visitors: 71425, percentage: "50.0%", dropOff: "24.2%" },
  { stage: "Reached Contact Section", visitors: 42855, percentage: "30.0%", dropOff: "40.0%" },
  { stage: "CTA Clicked", visitors: 17713, percentage: "12.4%", dropOff: "58.7%" },
  { stage: "Contact Form Started", visitors: 11428, percentage: "8.0%", dropOff: "35.5%" },
  { stage: "Form Submitted", visitors: 6928, percentage: "4.85%", dropOff: "39.4%" }
];

export const scrollAnalytics = [
  { level: "25% Scroll", count: "118,565", percentage: 83, color: "#3ac1ef" },
  { level: "50% Scroll", count: "94,280", percentage: 66, color: "#288f87" },
  { level: "75% Scroll", count: "71,425", percentage: 50, color: "#15803d" },
  { level: "100% Scroll", count: "42,855", percentage: 30, color: "#b45309" }
];

export const sectionAnalytics = [
  { section: "Hero", views: "142,850", avgTime: "45s", ctaClicks: "12,450", conversion: "8.7%" },
  { section: "Services", views: "104,280", avgTime: "1m 15s", mostClicked: "Artificial Intelligence", conversion: "6.4%" },
  { section: "Technology Stack", views: "82,100", avgTime: "58s", interactions: "18,400", conversion: "4.8%" },
  { section: "Testimonials", views: "68,400", avgTime: "34s", carouselClicks: "8,920", conversion: "3.9%" },
  { section: "Contact", views: "42,855", avgTime: "2m 10s", formsStarted: "11,428", formsSubmitted: "6,928" },
  { section: "Footer", views: "35,200", avgTime: "18s", socialClicks: "3,410", conversion: "1.2%" }
];

export const serviceInterest = [
  { service: "Artificial Intelligence", views: 45200, clicks: 8140, ctr: "18.0%" },
  { service: "Web Development", views: 38400, clicks: 6144, ctr: "16.0%" },
  { service: "Mobile Development", views: 29100, clicks: 4074, ctr: "14.0%" },
  { service: "Cloud Solutions", views: 24800, clicks: 3224, ctr: "13.0%" },
  { service: "UI/UX Design", views: 21500, clicks: 2580, ctr: "12.0%" },
  { service: "DevOps & Security", views: 18600, clicks: 2046, ctr: "11.0%" }
];

export const ctaPerformance = [
  { cta: "Get Started", views: "52,100", clicks: "7,294", ctr: "14.0%", conversion: "6.8%" },
  { cta: "Book Consultation", views: "38,400", clicks: "4,992", ctr: "13.0%", conversion: "8.2%" },
  { cta: "Contact Us", views: "31,200", clicks: "3,432", ctr: "11.0%", conversion: "7.1%" },
  { cta: "Know More", views: "24,500", clicks: "2,205", ctr: "9.0%", conversion: "3.4%" },
  { cta: "Schedule Meeting", views: "18,900", clicks: "1,890", ctr: "10.0%", conversion: "9.5%" }
];

export const contactFormAnalytics = {
  formsStarted: "11,428",
  formsSubmitted: "6,928",
  abandonmentRate: "39.4%",
  avgCompletionTime: "1m 45s",
  validationErrors: "4.2%",
  fieldDropOff: "Project Budget (14.4%) & Phone Number (14.1%)",
  fieldFunnel: [
    { field: "Full Name", completed: 11428, dropOffPct: "0.0%", dropOffCount: 0 },
    { field: "Work Email", completed: 10850, dropOffPct: "5.1%", dropOffCount: 578 },
    { field: "Service Selected", completed: 9800, dropOffPct: "9.7%", dropOffCount: 1050 },
    { field: "Phone Number", completed: 8420, dropOffPct: "14.1%", dropOffCount: 1380 },
    { field: "Project Budget", completed: 7210, dropOffPct: "14.4%", dropOffCount: 1210 },
    { field: "Project Brief / Message", completed: 6980, dropOffPct: "3.2%", dropOffCount: 230 },
    { field: "Form Submitted", completed: 6928, dropOffPct: "0.7%", dropOffCount: 52 }
  ]
};

export const userJourneys = [
  {
    id: 1,
    steps: ["Landing Page", "Services Overview", "AI Service", "Contact Page", "Form Submitted"],
    count: "2,450",
    percentage: "35.4%",
    trend: "+4.2%"
  },
  {
    id: 2,
    steps: ["Landing Page", "Contact Section", "Form Submitted"],
    count: "1,820",
    percentage: "26.3%",
    trend: "+2.1%"
  },
  {
    id: 3,
    steps: ["Landing Page", "Services Overview", "Web Dev Service", "Contact Page", "Form Submitted"],
    count: "1,410",
    percentage: "20.4%",
    trend: "+1.5%"
  },
  {
    id: 4,
    steps: ["Direct / AI Service", "Pricing", "Contact Page", "Form Submitted"],
    count: "720",
    percentage: "10.4%",
    trend: "+0.8%"
  },
  {
    id: 5,
    steps: ["Landing Page", "Tech Stack", "Contact Page", "Form Submitted"],
    count: "528",
    percentage: "7.5%",
    trend: "-0.4%"
  }
];

export const recentEvents = [
  { id: "EVT-9021", time: "Just now", sessionId: "SES-88219", event: "Contact Form Submitted", section: "Contact", device: "Desktop", browser: "Chrome", country: "India", status: "success" },
  { id: "EVT-9020", time: "2 mins ago", sessionId: "SES-88218", event: "Hero CTA Click", section: "Hero", device: "Mobile", browser: "Safari", country: "USA", status: "info" },
  { id: "EVT-9019", time: "4 mins ago", sessionId: "SES-88217", event: "Contact Form Started", section: "Contact", device: "Desktop", browser: "Edge", country: "Canada", status: "warning" },
  { id: "EVT-9018", time: "7 mins ago", sessionId: "SES-88216", event: "Service Clicked (AI Solutions)", section: "Services", device: "Desktop", browser: "Chrome", country: "Germany", status: "info" },
  { id: "EVT-9017", time: "11 mins ago", sessionId: "SES-88215", event: "Pricing Viewed", section: "Pricing", device: "Tablet", browser: "Safari", country: "Australia", status: "info" },
  { id: "EVT-9016", time: "15 mins ago", sessionId: "SES-88214", event: "Footer Social Click (LinkedIn)", section: "Footer", device: "Mobile", browser: "Chrome", country: "United Kingdom", status: "info" },
  { id: "EVT-9015", time: "18 mins ago", sessionId: "SES-88213", event: "Service Viewed (Cloud)", section: "Services", device: "Desktop", browser: "Firefox", country: "India", status: "info" },
  { id: "EVT-9014", time: "22 mins ago", sessionId: "SES-88212", event: "Navigation Click (Services)", section: "Header", device: "Desktop", browser: "Chrome", country: "USA", status: "info" }
];

export const sessionRecordings = [
  { id: "REC-4091", session: "SES-88219", duration: "4m 15s", country: "India", pages: 5, device: "Desktop", browser: "Chrome 124", status: "Completed", score: "9.8" },
  { id: "REC-4090", session: "SES-88218", duration: "2m 30s", country: "USA", pages: 3, device: "Mobile", browser: "Safari 17", status: "Active", score: "8.5" },
  { id: "REC-4089", session: "SES-88217", duration: "6m 48s", country: "Canada", pages: 7, device: "Desktop", browser: "Edge 123", status: "Completed", score: "9.4" },
  { id: "REC-4088", session: "SES-88216", duration: "1m 12s", country: "Germany", pages: 2, device: "Desktop", browser: "Chrome 124", status: "Abandoned", score: "6.2" },
  { id: "REC-4087", session: "SES-88215", duration: "3m 50s", country: "Australia", pages: 4, device: "Tablet", browser: "Safari 17", status: "Completed", score: "8.9" },
  { id: "REC-4086", session: "SES-88214", duration: "5m 04s", country: "UK", pages: 6, device: "Mobile", browser: "Chrome 124", status: "Completed", score: "9.1" },
  { id: "REC-4085", session: "SES-88213", duration: "0m 45s", country: "India", pages: 1, device: "Desktop", browser: "Firefox 125", status: "Abandoned", score: "4.5" }
];

export const topPerformingServices = [
  { rank: 1, name: "Artificial Intelligence", category: "Core Suite", views: "45,200", clicks: "8,140", leads: "1,465", conversion: "18.0%", trend: "+15.4%" },
  { rank: 2, name: "Web Development", category: "Engineering", views: "38,400", clicks: "6,144", leads: "983", conversion: "16.0%", trend: "+12.1%" },
  { rank: 3, name: "Mobile Development", category: "Apps", views: "29,100", clicks: "4,074", leads: "570", conversion: "14.0%", trend: "+8.6%" },
  { rank: 4, name: "Cloud Solutions", category: "Infrastructure", views: "24,800", clicks: "3,224", leads: "419", conversion: "13.0%", trend: "+6.4%" },
  { rank: 5, name: "UI/UX Design", category: "Creative", views: "21,500", clicks: "2,580", leads: "310", conversion: "12.0%", trend: "+5.1%" },
  { rank: 6, name: "DevOps & Security", category: "Operations", views: "18,600", clicks: "2,046", leads: "225", conversion: "11.0%", trend: "+3.8%" }
];

export const browserAnalytics = [
  { browser: "Google Chrome", version: "v124+", usage: "64.2%", visitors: "91,700", icon: "Chrome" },
  { browser: "Microsoft Edge", version: "v123+", usage: "14.8%", visitors: "21,140", icon: "Edge" },
  { browser: "Apple Safari", version: "v17+", usage: "12.5%", visitors: "17,850", icon: "Safari" },
  { browser: "Mozilla Firefox", version: "v125+", usage: "6.1%", visitors: "8,710", icon: "Firefox" },
  { browser: "Opera & Others", version: "v105+", usage: "2.4%", visitors: "3,420", icon: "Globe" }
];

export const websitePerformance = [
  { metric: "Largest Contentful Paint (LCP)", value: "1.2s", status: "good", target: "< 2.5s", description: "Main content load speed" },
  { metric: "First Contentful Paint (FCP)", value: "0.8s", status: "good", target: "< 1.8s", description: "First visual DOM element" },
  { metric: "Interaction to Next Paint (INP)", value: "85ms", status: "good", target: "< 200ms", description: "Responsiveness to clicks/taps" },
  { metric: "Cumulative Layout Shift (CLS)", value: "0.02", status: "good", target: "< 0.1", description: "Visual stability of page elements" },
  { metric: "Time to First Byte (TTFB)", value: "140ms", status: "good", target: "< 800ms", description: "Server response latency" }
];

export const realTimeVisitors = {
  activeCount: 284,
  activePages: [
    { path: "/", title: "Homepage / Landing", active: 112, pct: "39%" },
    { path: "/services/ai-solutions", title: "AI & Machine Learning", active: 64, pct: "23%" },
    { path: "/contact-us", title: "Contact & Consultation", active: 48, pct: "17%" },
    { path: "/services/web-development", title: "Web Development", active: 38, pct: "13%" },
    { path: "/pricing", title: "Pricing & Enterprise Plans", active: 22, pct: "8%" }
  ],
  devices: { desktop: 62, mobile: 32, tablet: 6 },
  countries: [
    { name: "India", count: 85, flag: "🇮🇳" },
    { name: "United States", count: 72, flag: "🇺🇸" },
    { name: "United Kingdom", count: 34, flag: "🇬🇧" },
    { name: "Germany", count: 28, flag: "🇩🇪" },
    { name: "Canada", count: 24, flag: "🇨🇦" }
  ]
};
