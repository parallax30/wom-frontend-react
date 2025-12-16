// ---------------------
// Navbar
// ---------------------
export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  href: string;
  active?: boolean;
  submenu?: SubMenuItem[];
}

export interface UserInfo {
  avatar: string;
  name?: string;
  role?: string;
}

// ---------------------
// Hero
// ---------------------
export interface HeroProps {
  image: string;
}

// ---------------------
// DateBar
// ---------------------
export interface DateBarProps {
  date: string; // Ej: Monday, November 17th, 2025
}

// ---------------------
// Quarterly Results
// ---------------------
export interface ReportItem {
  id: string;
  homeFinancialCardTitle: string;
  icon: string;         // ruta al icono de assets
  homeFinancialCardLinkText: string;
  homeFinancialCardLinkUrl: string;
}

export interface QuarterlyResultsProps {
  quarter: string;      // Ej: Q3-2025
  reports: ReportItem[];
}

// ---------------------
// Latest News
// ---------------------
export interface NewsItem {
  id: string;
  title: string;
  icon: string;
  summary: string;
  url: string;
}

export interface LatestNewsProps {
  news: NewsItem[];
}

// ---------------------
// Upcoming Events
// ---------------------
export interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
  summary: string;
  linkText: string;
  url: string;
}

export interface UpcomingEventsProps {
  events: EventItem[];
}

export interface OtherSegmentsItem {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
}

export interface OtherSegmentsProps {
  segments: OtherSegmentsItem[];
}



// ---------------------
// Bond Information
// ---------------------
export interface BondDocument {
  id: string;
  date: string;
  title: string;
  summary: string;
  fileUrl?: string;
}

export interface BondInformationProps {
  documents: BondDocument[];
}

// ---------------------
// Policies
// ---------------------
export interface PolicyDocument {
  id: string;
  title: string;
  summary: string;
  fileUrl?: string;
}

export interface PolicyInformationProps {
  policies: PolicyDocument[];
}

// ---------------------
// Footer
// ---------------------
export interface ContactInfo {
  email: string;
  phone: string;
}

export interface FooterProps {
  contact: ContactInfo;
}

// ---------------------
// HomePage Props
// ---------------------
export interface HomePageData {
  menu: MenuItem[];
  homeTitle1: string;
  homeTitle2: string;
  homeTitle3: string;
  homeTitle4: string;
  homeTItle1TextButton: string;
  homeTItle1LinkUrlButton: string;
  homeTItle2TextlButton: string;
  homeTItle2LinkUrlButton: string;
  homeTItle3TextlButton: string;
  homeTItle3LinkUrlButton: string;
  user: UserInfo;
  homePrincipalImage: string;
  today: string;
  quarter: string; // es home_financial_cards en la API
  reports?: ReportItem[];
  news?: NewsItem[];
  events?: EventItem[];
  documents?: BondDocument[];
  contact?: ContactInfo;
}


export interface CommonPageData {
  menu: MenuItem[];
  user: UserInfo;
  today: string;
  contact: ContactInfo;
}

export interface HomePageProps {
  data: HomePageData;
}
