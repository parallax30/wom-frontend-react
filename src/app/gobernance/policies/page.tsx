
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
import { Policies } from './Policies'
import { getCommonPageData } from '@/lib/common/getCommonPageData'

export const metadata: Metadata = {
  title: 'Inversors Portal',
  description: 'Wom',
}


// -----------------------------------------------------------
// Página principal
// -----------------------------------------------------------
const Page = async () => {
  // Llamada simulada a API
  const common = await getCommonPageData("/policies");

  const policies = [
    {
      id: "1",
      title: "John Wick",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit lacus ultricies imperdiet...",
      fileUrl: "/assets/john.png",
    },
    {
      id: "2",
      title: "Finance Director",
      summary:
        "Vivamus nascetur odio rhoncus accumsan magna pretium dolor justo.",
      fileUrl: "/assets/sarah.png",
    },
    {
      id: "3",
      title: "Financial Management",
      summary:
        "Vivamus nascetur odio rhoncus accumsan magna pretium dolor justo.",
      fileUrl: "/assets/vigo.png",
    },
  ];

  return (
      <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
        <Navbar menuItems={common.menu} user={common.user} />
        <main className="flex-grow">
          <Policies policies={policies} />
        </main>
        <Footer contact={common.contact} />
      </div>
    
  )
}

export default Page
