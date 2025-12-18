
import { Navbar } from '@/components/Home/Navbar'
import { Metadata } from 'next'
import { HomePageData } from '@/types/home.types'
import { Footer } from '@/components/Home/Footer'
import ContactForm from './ContactForm'
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
  const common = await getCommonPageData()

  const user=  {
      avatar: "/assets/avatar.png",
      name: "John Doe",
      email: "johndoe@email.com",
  }

  return (
      <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
        <Navbar menuItems={common.menu} user={common.user} />
        <main className="flex-grow">
          <ContactForm user={user} />
        </main>
        <Footer contact={common.contact} />
      </div>
  )
}

export default Page
