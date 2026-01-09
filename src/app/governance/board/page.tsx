
import { Navbar } from '@/components/Home/Navbar'
import { Metadata } from 'next'
import { Footer } from '@/components/Home/Footer'
import { Board } from './Board'
import { getCommonPageData } from "@/lib/common/getCommonPageData";
import { getGobernanceCollectionCardBoard } from "@/services/apiService";
import { richTextToPlainText } from '@/utils/richText';

export const metadata: Metadata = {
  title: 'Inversors Portal',
  description: 'Wom',
}
;



// -----------------------------------------------------------
const Page = async () => {
  // Llamada simulada a API
  const common = await getCommonPageData("/governance");

  const boardDataResponse = await getGobernanceCollectionCardBoard();
  const boardData = boardDataResponse?.data?.data;
  
  const members = boardData.map((item: any) => ({
      id: item.id,
      name: item.governanceTeamName,
      position: item.governanceTeamPosition,
      description: richTextToPlainText(item.governanceTeamBiography),
      order: item.governanceTeamOrder,
  }));

  //acá hacer el map de boardDataResponse a BoardMember[]
  return (
    <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
      <Navbar menuItems={common.menu} user={common.user} urlLogo={common.logoHeader}/>
      <main className="flex-grow">
        <Board members={members} />
      </main>
      <Footer contact={common.contact} />
    </div>
  
  )
}

export default Page
