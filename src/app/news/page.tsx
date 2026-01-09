
import { Navbar } from '@/components/Home/Navbar'
import { Metadata } from 'next'
import { CommonPageData, HomePageData } from '@/types/home.types'
import { Footer } from '@/components/Home/Footer'
import { LatestNewsList } from './LatestNewsList'
import { OldNewsTable } from './OldNewsTable'
import { getNewsPage } from "@/services/apiService";
import { richTextToPlainText } from '@/utils/richText'
import { getCommonPageData } from "@/lib/common/getCommonPageData";

export const metadata: Metadata = {
  title: 'Inversors Portal',
  description: 'Wom',
}

const Page = async () => {
  // Llamada simulada a API
  const common = await getCommonPageData("/news");
  const newsData = await getNewsPage();
  const news = newsData?.data?.data; 

  const featuredNews = news.news_collection_cards.map((card: { id: any; newsCollectionCardTitle: any; newsCollectionCardSummary: any; newsCollectionCardLinkText: any; newsCollectionCardLinkUrl: any }) => ({
    id: String(card.id),
    title: card.newsCollectionCardTitle,
    summary: richTextToPlainText(card.newsCollectionCardSummary ?? []),
    linkText: card.newsCollectionCardLinkText,
    url: `${process.env.NEXT_PUBLIC_STRAPI_MEDIA}${card.newsCollectionCardLinkUrl}`,
    icon: "/assets/icons/news-icon.png", // fijo, como en Home
  }));

  const archivedNews = news.news_collection_data_grids.map((row: { id: any; newsCollectionDataGridDocumentName: any; newsCollectionDataGridDocumentDate: string | number | Date; newsCollectionDataGridLinkViewUrl: any; newsCollectionDataGridLinkDownloadUrl: any; newsCollectionDataGridCheckOne: any }) => ({
    id: String(row.id),
    title: row.newsCollectionDataGridDocumentName,
    date: new Date(
      row.newsCollectionDataGridDocumentDate
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    viewUrl: row.newsCollectionDataGridLinkViewUrl,
    downloadUrl: `${process.env.NEXT_PUBLIC_STRAPI_MEDIA}${row.newsCollectionDataGridLinkDownloadUrl}`,
    checked: row.newsCollectionDataGridCheckOne,
  }));

  return (
      <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
        <Navbar menuItems={common.menu} user={common.user} urlLogo={common.logoHeader}/>
        <main className="flex-grow">
          <LatestNewsList news={featuredNews} titleLatest={news.newsTitle1} />
          <OldNewsTable items={archivedNews}  titleArchive={news.newsTitle2}  />
        </main>
        <Footer contact={common.contact} />
      </div>
  )
}

export default Page
