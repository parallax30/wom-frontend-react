import { Navbar } from '@/components/Home/Navbar'
import { Footer } from '@/components/Home/Footer'
import { FinancialReports } from './FinancialReports'
import { OtherSegments } from './OtherSegments'
import { getCommonPageData } from '@/lib/common/getCommonPageData'
import {
  getFinancialCollectionOtherDocuments,
  getFinancialCollectionQDocument,
} from '@/services/apiService'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investors Portal',
  description: 'WOM',
}

// --------------------
// Financial Reports
// --------------------
const buildFinancialReports = (qDocs?: any[]) => {
  const result: Record<string, any> = {}

  if (!Array.isArray(qDocs)) return result

  qDocs.forEach((doc) => {
    const year = doc.financialCollectionQDocumentYear
    const quarter = doc.financialCollectionQDocumentQ

    if (!result[year]) {
      result[year] = { Q1: [], Q2: [], Q3: [], Q4: [] }
    }

    result[year][quarter].push({
      title: doc.financialCollectionQDocumentName,
      url: doc.financialCollectionQDocumentFile?.url,
    })
  })

  return result
}

// --------------------
// Other Segments
// --------------------
const buildOtherSegments = (items?: any[]) => {
  if (!Array.isArray(items)) return []

  return items.map((item) => ({
    id: item.id,
    title: item.financialCollectionOtherDocumentName,
    description: item.financialCollectionOtherDocumentSummaryList,
    fileUrl: item.financialCollectionOtherDocumentLinkUrl,
    linkText: item.financialCollectionOtherDocumentLinkText,
    iconUrl: item.financialCollectionOtherDocumentLinkIcon?.url,
  }))
}

// --------------------
// PAGE
// --------------------
const Page = async () => {
  const common = await getCommonPageData('/financials')

  // Financial Reports
  const qDocsResponse = await getFinancialCollectionQDocument()
  const qDocuments = qDocsResponse?.data?.data ?? []
  const financialReportsData = qDocuments

  // Other Segments
  const otherDocsResponse = await getFinancialCollectionOtherDocuments()
  const otherDocs = otherDocsResponse?.data?.data ?? []
  const otherSegmentsData = buildOtherSegments(otherDocs)

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
      <Navbar
        menuItems={common.menu}
        user={common.user}
        urlLogo={common.logoHeader}
      />

      <main className="flex-grow">
        <FinancialReports data={financialReportsData} />
        <OtherSegments segments={otherSegmentsData} />
      </main>

      <Footer contact={common.contact} />
    </div>
  )
}

export default Page
