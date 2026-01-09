
import { Navbar } from '@/components/Home/Navbar'
import { Metadata } from 'next'
import { Footer } from '@/components/Home/Footer'
import Management from './Management'
import { getCommonPageData } from '@/lib/common/getCommonPageData'
import { getGobernanceCollectionCardManagement } from '@/services/apiService'
import { richTextToPlainText } from '@/utils/richText'

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

  console.log("managementData", managementData);

  const managementMembers = managementData
    ? managementData.map((item: any) => ({
        id: item.id,
        name: item.governanceManagementName,
        role: item.governanceManagementPosition,
        description:
          richTextToPlainText(item.governanceManagementBiography) || "",
        image: item.governanceManagementImage?.url
          ? `${item.governanceManagementImage.url}`
          : null,
      }))
    : [];

    //console.log("managementMembers", managementMembers);


  return (
      <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
        <Navbar menuItems={common.menu} user={common.user} urlLogo={common.logoHeader}/>
        <main className="flex-grow">
          <Management members={managementMembers} />
        </main>
        <Footer contact={common.contact} />
      </div>
    
    )
}

export default Page
