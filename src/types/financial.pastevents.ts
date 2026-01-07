// ---------------------
// Upcoming Events
// ---------------------
export interface PastEventItem {
  id: number;
  title: string;
  date: string;
  url: string;
  icon?: string | null;
}

export interface PastEventsProps {
  events: PastEventItem[];
}