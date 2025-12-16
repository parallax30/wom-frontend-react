import { CommonPageData } from "@/types/common.types";

export async function getCommonPageData(
  activeRoute?: string
): Promise<CommonPageData> {

  // Simula llamada HTTP real (luego lo cambias por fetch / Strapi)
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    menu: [
      { label: "Home", href: "/portal", active: activeRoute === "/portal" },

      {
        label: "Gobernance",
        href: "#",
        submenu: [
          { label: "Board", href: "/gobernance/board" },
          { label: "Management", href: "/gobernance/management" },
          { label: "Policies", href: "/gobernance/policies" },
        ],
      },

      {
        label: "Financials",
        href: "#",
        submenu: [
          { label: "Financials Reports", href: "/financials/reports" },
          { label: "Events & Presentations", href: "/financials/eventsPresentations" },
        ],
      },

      { label: "News", href: "/news", active: activeRoute === "/news" },
      { label: "Contact Us", href: "/contactUs", active: activeRoute === "/contactUs" },
      { label: "Admin", href: "/admin" },
    ],

    user: {
      avatar: "/assets/avatar.png",
      name: "John Doe",
      role: "Investor",
    },

    today: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),

    contact: {
      email: "investors@wom.cl",
      phone: "+56 2 2753 1234",
    },
  };
}
