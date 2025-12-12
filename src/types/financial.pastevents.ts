// ---------------------
// Upcoming Events
// ---------------------
export interface EventItem {
  id: number;
  title: string;
  date: string;
  url: string;
}

export interface PastEventsProps {
  events: EventItem[];
}