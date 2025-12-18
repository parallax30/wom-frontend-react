// ---------------------
// Upcoming Events
// ---------------------
export interface PastEventItem {
  id: number;
  title: string;
  date: string;
  url: string;
}

export interface PastEventsProps {
  events: PastEventItem[];
}