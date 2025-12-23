
import { BondInformation } from '@/components/Home/BondInformation'
import { DateBar } from '@/components/Home/DateBar'
import { Hero } from '@/components/Home/Hero'
import { LatestNews } from '@/components/Home/LatestNews'
import { Navbar } from '@/components/Home/Navbar'
import { QuarterlyResults } from '@/components/Home/QuarterlyResults'
import { UpcomingEvents } from '@/components/Home/UpcomingEvents'
import { Metadata } from 'next'
import { HomePageData, ReportItem } from '@/types/home.types'
import { Footer } from '@/components/Home/Footer'

import { getHome, getHomeCollectionFinacnialCard } from "@/services/apiService";

import { RichTextBlock, richTextToPlainText } from "@/utils/richText";
import { getCommonPageData } from '@/lib/common/getCommonPageData'

export const metadata: Metadata = {
  title: 'Inversors Portal',
  description: 'Wom',
}

async function getHomeData(): Promise<HomePageData> {

  const response = await getHome({});
  const cmsHomeData = response?.data?.data; 

  const homeTitle1 = cmsHomeData.homeTitle1;
  const homeTitle2 = cmsHomeData.homeTitle2;
  const homeTitle3 = cmsHomeData.homeTitle3;
  const homeTitle4 = cmsHomeData.homeTitle4;
  const homeTItle1TextButton = cmsHomeData.homeTItle1TextButton;
  const homeTItle1LinkUrlButton = cmsHomeData.homeTItle1LinkUrlButton;
  const homeTItle2TextlButton = cmsHomeData.homeTItle2TextlButton;
  const homeTItle2LinkUrlButton = cmsHomeData.homeTItle2LinkUrlButton;
  const homeTItle3TextlButton = cmsHomeData.homeTItle3TextlButton
  const homeTItle3LinkUrlButton = cmsHomeData.homeTItle3LinkUrlButton;


  const reports = cmsHomeData.home_financial_cards.map(
    (card: { homeFinancialCardTitle: any; homeFinancialCardLinkUrl: any; homeFinancialCardLinkText: any }, index: number) => ({
      id: String(index + 1), // o card.id si quieres el de Strapi
      homeFinancialCardTitle: card.homeFinancialCardTitle,
      icon: "/assets/icons/money-icon.png",
      homeFinancialCardLinkUrl: card.homeFinancialCardLinkUrl,
      homeFinancialCardLinkText: card.homeFinancialCardLinkText,
    })
  );



  const news = cmsHomeData.home_news_cards.map((card: { id: any; homeNewsCardTitle: any; omeNewsCardSummary: { children?: { text: string }[] }[] | undefined }) => ({
    id: String(card.id),
    title: card.homeNewsCardTitle,
    icon: "/assets/icons/news-icon.png",
    summary: richTextToPlainText(card.omeNewsCardSummary),
    url: "card.homeNewsCardUrl",
  }));

  const homePrincipalImage = process.env.NEXT_PUBLIC_API_URL + cmsHomeData.homePrincipalImage.url;

  const events = cmsHomeData.home_event_infos.map((event: { id: any; homeEventInfoTitle: any; homeEventInfoDate: string | number | Date; homeEventInfoSummary: RichTextBlock[] | undefined; homeEventInfoLinkText: any; homeEventInfoLinkUrl: any }) => ({
    id: String(event.id),
    title: event.homeEventInfoTitle,
    date: new Date(event.homeEventInfoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    summary: richTextToPlainText(event.homeEventInfoSummary),
    linkText: event.homeEventInfoLinkText,
    url: event.homeEventInfoLinkUrl,
  }));

  const documents = cmsHomeData.home_bond_documents.map((doc: { id: any; homeBondDocumentDate: string | number | Date; homeBondDocumentName: any; homeBondDocumentSummary: any; homeBondDocumentLinkUrl: any }) => ({
    id: String(doc.id),
    date: new Date(doc.homeBondDocumentDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    title: doc.homeBondDocumentName,
    summary: richTextToPlainText(doc.homeBondDocumentSummary ?? []),
    fileUrl: doc.homeBondDocumentLinkUrl,
  }));

  // Calcular el trimestre actual (p. ej. "Q3 - 2025") si la API no lo provee
  const quarter = `Q${Math.floor(new Date().getMonth() / 3) + 1} - ${new Date().getFullYear()}`;

  return {

    homeTitle1,
    homeTitle2,
    homeTitle3,
    homeTitle4,
    homeTItle1TextButton,
    homeTItle1LinkUrlButton,
    homeTItle2TextlButton,
    homeTItle2LinkUrlButton,
    homeTItle3TextlButton,
    homeTItle3LinkUrlButton,

    // ---------------------
    // HERO
    // ---------------------
    homePrincipalImage,

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
    quarter,
    reports,

    // ---------------------
    // LATEST NEWS
    // ---------------------
    news,

    // ---------------------
    // UPCOMING EVENTS
    // ---------------------
    events,

    // ---------------------
    // BOND INFORMATION LIST
    // ---------------------
    documents,
  };
}

// -----------------------------------------------------------
// Página principal
// -----------------------------------------------------------
const Page = async () => {
  // Llamada simulada a API
  const data = await getHomeData()
  const common = await getCommonPageData("/portal");
  const financialCrdsResponse = await getHomeCollectionFinacnialCard({});
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

const financialCrds: ReportItem[] = (financialCrdsResponse?.data?.data ?? []).map((card: any) => ({
  id: String(card.id),
  homeFinancialCardTitle: card.homeFinancialCardTitle,
  icon: card.homeFinancialCardIcon?.url ? apiUrl + card.homeFinancialCardIcon.url : "/assets/icons/money-icon.png",
  homeFinancialCardLinkText: card.homeFinancialCardLinkText,
  homeFinancialCardLinkUrl: card.homeFinancialCardFile?.url ? apiUrl + card.homeFinancialCardFile.url : "#",
}));

  console.log("Financial Cards from API:", financialCrds);

  return (
    <div className="w-full font-sans text-[#2D1540]">
      <Navbar menuItems={common.menu} user={common.user} urlLogo={common.logoHeader}/>
      <Hero image={data.homePrincipalImage} />
      <DateBar date={data.today} />
      <QuarterlyResults quarter={data.quarter} reports={financialCrds || []} />
      <LatestNews news={data.news || []} />
      <UpcomingEvents events={data.events || []} />
      <BondInformation documents={data.documents || []} />
      <Footer contact={common.contact || { email: "investors@wom.cl", phone: "+56 2 2753 1234" }} />
    </div>
  )
}

export default Page
