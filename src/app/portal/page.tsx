
import { BondInformation } from '@/components/Home/BondInformation'
import { DateBar } from '@/components/Home/DateBar'
import { Hero } from '@/components/Home/Hero'
import { LatestNews } from '@/components/Home/LatestNews'
import { Navbar } from '@/components/Home/Navbar'
import { QuarterlyResults } from '@/components/Home/QuarterlyResults'
import { UpcomingEvents } from '@/components/Home/UpcomingEvents'
import { Metadata } from 'next'
import { HomePageData } from '@/types/home.types'
import { Footer } from '@/components/Home/Footer'

export const metadata: Metadata = {
  title: 'Inversors Portal',
  description: 'Wom',
}

// -----------------------------------------------------------
//  Emulación de llamada a API con submenús
// -----------------------------------------------------------
async function getHomeData(): Promise<HomePageData> {
  // Simula llamada HTTP real
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    // ---------------------
    // MENU SUPERIOR
    // ---------------------
    menu: [
      { label: "Home", href: "/portal", active: true },

      {
        label: "Gobernance",
        href: "#",
        submenu: [
          { label: "Board", href: "/gobernance/board" },
          { label: "Management", href: "/gobernance/management" },
          { label: "Policies", href: "/gobernance/policies" },
        ],
      },
      {
        label: "Financials",
        href: "#",
        submenu: [
          { label: "Financials Reports", href: "/financials/reports" },
          { label: "Events & Presentations", href: "/financials/eventsPresentations" },
        ],
      },

      {
        label: "News",
        href: "/news"
      },
      {
        label: "Contact Us",
        href: "/contactUs", 
      },
      {
        label: "Admin",
        href: "/admin"
      },
    ],

    // ---------------------
    // USUARIO
    // ---------------------
    user: {
      avatar: "/assets/avatar.png",
      name: "John Doe",
      role: "Investor",
    },

    // ---------------------
    // HERO
    // ---------------------
    heroImage: "/assets/hero-image.png",

    // ---------------------
    // DATE BAR
    // ---------------------
    today: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),

    // ---------------------
    // QUARTERLY RESULTS
    // ---------------------
    quarter: "Q3 - 2025",
    reports: [
      {
        id: "1",
        title: "Financial Statements",
        icon: "/assets/icons/money-icon.png",
        downloadUrl: "#",
      },
      {
        id: "2",
        title: "Investor Presentation",
        icon: "/assets/icons/bill-icon.png",
        downloadUrl: "#",
      },
      {
        id: "3",
        title: "Earnings Release",
        icon: "/assets/icons/book-icon.png",
        downloadUrl: "#",
      },
    ],

    // ---------------------
    // LATEST NEWS
    // ---------------------
    news: [
      {
        id: "1",
        title: "WOM reaches new subscriber record",
        icon: "/assets/icons/news-icon.png",
        summary: "The company achieved a new milestone with 7M users...",
      },
      {
        id: "2",
        title: "Expansion of 5G network continues",
        icon: "/assets/icons/news-icon.png",
        summary: "WOM expands their 5G coverage by 32% this quarter...",
      },
       {
        id: "3",
        title: "WOM reaches new subscriber record",
        icon: "/assets/icons/news-icon.png",
        summary: "The company achieved a new milestone with 7M users...",
      },
    ],

    // ---------------------
    // UPCOMING EVENTS
    // ---------------------
    events: [
      {
        id: "1",
        title: "Earnings Call",
        icon: "/assets/icons/calendar-icon.png",
        date: "2025-12-10",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit facilisi venenatis praesent, a dapibus justo pharetra nullam risus ultricies phasellus gravida egestas natoque, laoreet enim lobortis cum facilisis nunc placerat dui mattis.",
      },
      {
        id: "2",
        title: "Annual General Meeting",
        icon: "/assets/icons/calendar-icon.png",
        date: "2026-02-14",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit facilisi venenatis praesent, a dapibus justo pharetra nullam risus ultricies phasellus gravida egestas natoque, laoreet enim lobortis cum facilisis nunc placerat dui mattis.",
      },
    ],

    // ---------------------
    // BOND INFORMATION LIST
    // ---------------------
    documents: [
      {
        id: "1",
        date: "October 31, 2025",
        title: "Bond 2025 Report",
        summary: "Detailed report of bond activity",
        fileUrl: "#",
      },
      {
        id: "2",
        date: "October 31, 2025",
        title: "Bond Issuance Notice",
        summary: "Information on the new bond issuance",
        fileUrl: "#",
      },
    ],

    // ---------------------
    // FOOTER
    // ---------------------
    contact: {
      email: "investors@wom.cl",
      phone: "+56 2 2753 1234",
    },
  };
}

// -----------------------------------------------------------
// Página principal
// -----------------------------------------------------------
const Page = async () => {
  // Llamada simulada a API
  const data = await getHomeData()

  return (
    <div className="w-full font-sans text-[#2D1540]">
      <Navbar menuItems={data.menu} user={data.user} />
      <Hero image={data.heroImage} />
      <DateBar date={data.today} />
      <QuarterlyResults quarter={data.quarter} reports={data.reports} />
      <LatestNews news={data.news} />
      <UpcomingEvents events={data.events} />
      <BondInformation documents={data.documents} />
      <Footer contact={data.contact} />
    </div>
  )
}

export default Page
