
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
import UserAdmin from './UserAdmin'
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
  const common = await getCommonPageData("/admin");

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
      <Navbar menuItems={common.menu} user={common.user} urlLogo={common.logoHeader} />
      <main className="flex-grow">
        <UserAdmin />
      </main>
      <Footer contact={common.contact} />
    </div>
  )
}

export default Page
