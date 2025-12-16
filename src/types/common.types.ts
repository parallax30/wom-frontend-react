export interface CommonPageData {
  menu: {
    label: string;
    href: string;
    active?: boolean;
    submenu?: {
      label: string;
      href: string;
    }[];
  }[];

  user: {
    avatar: string;
    name: string;
    role: string;
  };

  today: string;

  contact: {
    email: string;
    phone: string;
  };
}
