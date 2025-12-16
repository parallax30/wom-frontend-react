
import { Navbar } from '@/components/Home/Navbar'
import { Metadata } from 'next'
import { Footer } from '@/components/Home/Footer'
import Management from './Management'
import { getCommonPageData } from '@/lib/common/getCommonPageData'
import { getGobernanceCollectionCardManagement } from '@/services/apiService'

export const metadata: Metadata = {
  title: 'Inversors Portal',
  description: 'Wom',
}


// -----------------------------------------------------------
// Página principal
// -----------------------------------------------------------
const Page = async () => {
  // Llamada simulada a API
  const common = await getCommonPageData("/gobernance");
  
  const managementDataResponse = await getGobernanceCollectionCardManagement();
  const managementData = managementDataResponse?.data?.data;

  const managementMembers = managementData
    ? managementData.map((item: any) => ({
        id: item.id,
        name: item.gobernanceManagmentName,
        role: item.gobernanceManagmentPosition,
        description:
          item.gobernanceManagmentBiography?.[0]?.children
            ?.map((c: any) => c.text)
            .join("") || "",
        image: item.gobernanceManagmentImage?.url
          ? `${process.env.NEXT_PUBLIC_API_URL}${item.gobernanceManagmentImage.url}`
          : null,
      }))
    : [];

    console.log('managementMembers:', managementMembers);


  return (
      <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
        <Navbar menuItems={common.menu} user={common.user} />
        <main className="flex-grow">
          <Management members={managementMembers} />
        </main>
        <Footer contact={common.contact} />
      </div>
    
    )
}

export default Page
