

import { BondInformation } from '@/components/Home/BondInformation'
import { DateBar } from '@/components/Home/DateBar'
import { Hero } from '@/components/Home/Hero'
import { LatestNews } from '@/components/Home/LatestNews'
import { Navbar } from '@/components/Home/Navbar'
import { EventItem, HomePageData } from '@/types/home.types'
import { Footer } from '@/components/Home/Footer'
import { PastEvents } from './PastEvents'
import { UpcomingEvents } from './UpcomingEvents'
import { getCommonPageData } from '@/lib/common/getCommonPageData'
import { getCalendarCollectionPastEvent, getCalendarCollectionUpcomingEvent } from '@/services/apiService'
import { richTextToReact } from '@/utils/richText'
import { PastEventItem } from '@/types/financial.pastevents'



// -----------------------------------------------------------
// Página principal
// -----------------------------------------------------------
const Page = async () => {

  const mapUpcomingEvents = (items?: any[]): EventItem[] => {
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    id: item.id,
    title: item.calendarUpcomingEventName ?? "",
    date: item.calendarUpcomingEventDate ?? "",
    description: "",
    summary: item.calendarUpcomingEventSummary
      ? richTextToReact(item.calendarUpcomingEventSummary)
      : null,
    linkText: item.calendarUpcomingEventLinkText ?? "",
    url: item.calendarUpcomingEventLinkUrl ?? "",
    iconUrl: item.calendarUpcomingEventIcon?.url ?? null,
  }));
};


  const mapPastEvents = (items?: any[]): PastEventItem[] => {
    if (!Array.isArray(items)) return [];

    return items.map((item) => ({
      id: item.id,
      title: item.calendarPastEventName ?? "",
      date: item.calendarPastEventDate ?? "",
      url: item.calendarPastEventLinkUrl ?? "",
    }));
  };

  const common = await getCommonPageData()
  
  const upcomingEventsResponse = await getCalendarCollectionUpcomingEvent();
  console.log("Upcoming Events Response:", upcomingEventsResponse?.data?.data);
  const upcomingEventsData = mapUpcomingEvents(upcomingEventsResponse?.data?.data);
  
  const pastEventsResponse = await getCalendarCollectionPastEvent();
  const pastEventsData = mapPastEvents(pastEventsResponse?.data?.data);

  return (
      <div className="min-h-screen flex flex-col font-sans text-[#2D1540]">
        <Navbar menuItems={common.menu} user={common.user} urlLogo={common.logoHeader}/>
        <main className="flex-grow">
          <UpcomingEvents events={upcomingEventsData}/>
          <PastEvents events={pastEventsData} />
        </main>
        <Footer contact={common.contact} />
      </div>
  )
}

export default Page;