
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
import { FinancialReports } from './FinancialReports'
import { OtherSegments } from './OtherSegments'
import { getCommonPageData } from '@/lib/common/getCommonPageData'
import { getFinancialCollectionOtherDocuments, getFinancials } from '@/services/apiService'

export const metadata: Metadata = {
  title: 'Inversors Portal',
  description: 'Wom',
}

  const buildFinancialReports = (qDocs?: any[]) => {
    const result: Record<string, any> = {};

    if (!Array.isArray(qDocs)) {
      return result;
    }

    qDocs.forEach((doc) => {
      const year = doc.financialCollectionQDocumentYear;
      const quarter = doc.financialCollectionQDocumentQ;

      if (!result[year]) {
        result[year] = { Q1: [], Q2: [], Q3: [], Q4: [] };
      }

      result[year][quarter].push({
        title: doc.financialCollectionQDocumentName,
        url: doc.financialCollectionQDocumentLinkUrl,
      });
    });

    return result;
  };


  const buildOtherSegments = (items?: any[]) => {
    if (!Array.isArray(items)) return [];

    return items.map((item) => ({
      id: item.id,
      title: item.financialCollectionOtherDocumentName,
      description: item.financialCollectionOtherDocumentSummary,
      fileUrl: item.financialCollectionOtherDocumentLinkUrl,
      linkText: item.financialCollectionOtherDocumentLinkText,
      iconUrl: item.financialCollectionOtherDocumentLinkIcon?.url,
    }));
  };

  




// -----------------------------------------------------------
// Página principal
// -----------------------------------------------------------
const Page = async () => {
  const common = await getCommonPageData("/financials");

  //datos para FinancialReports
  const financialsDataResponse = await getFinancials();
  const financialData = financialsDataResponse?.data?.data?.[0];

  const financialReportsData = financialData
    ? buildFinancialReports(financialData.financial_collection_q_documents)
    : {};

  const financialsOtherDataResponse = await getFinancialCollectionOtherDocuments();

  const financialOtherData = financialsOtherDataResponse?.data?.data;

  const otherSegmentsData = financialData
    ? buildOtherSegments(financialOtherData)
    : [];


const segmentsData = [
  {
    id: 1, 
    title: "Other Report 1", 
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit facilisi venenatis praesent, a dapibus justo pharetra nullam risus ultricies phasellus gravida egestas natoque, laoreet enim lobortis cum facilisis nunc placerat dui mattis.",
    fileUrl: "/reporte1.pdf"
  },
  {
    id: 2, 
    title: "Other Report 2", 
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit facilisi venenatis praesent, a dapibus justo pharetra nullam risus ultricies phasellus gravida egestas natoque, laoreet enim lobortis cum facilisis nunc placerat dui mattis.",
    fileUrl: "/reporte2.pdf"
  },
  {
    id: 3, 
    title: "Other Report 3", 
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit facilisi venenatis praesent, a dapibus justo pharetra nullam risus ultricies phasellus gravida egestas natoque, laoreet enim lobortis cum facilisis nunc placerat dui mattis.",
    fileUrl: "/reporte3.pdf"
  },
  
];

  


  return (
      <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
        <Navbar menuItems={common.menu} user={common.user} />
        <main className="flex-grow">
          <FinancialReports data={financialReportsData} />
          <OtherSegments segments={otherSegmentsData} />
        </main>
        <Footer contact={common.contact} />
      </div>
  )
}

export default Page
