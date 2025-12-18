import { getMe } from "@/services/auth";
import { CommonPageData } from "@/types/common.types";

export async function getCommonPageData(
  activeRoute?: string
): Promise<CommonPageData> {

  // Simula llamada HTTP real (luego lo cambias por fetch / Strapi)
  await new Promise(resolve => setTimeout(resolve, 300));

  const user = await getMe();
  const canSeeAdmin = user?.role?.name === "UserValidation";

  const isRouteActive = (activeRoute?: string, href?: string) => {
  if (!activeRoute || !href) return false;
  return activeRoute === href || activeRoute.startsWith(`${href}/`);
};

  const menu = [
    {
      label: "Home",
      href: "/portal",
      active: isRouteActive(activeRoute, "/portal"),
    },

    {
      label: "Gobernance",
      href: "/gobernance",
      active: isRouteActive(activeRoute, "/gobernance"),
      submenu: [
        { label: "Board", href: "/gobernance/board" },
        { label: "Management", href: "/gobernance/management" },
        { label: "Policies", href: "/gobernance/policies" },
      ],
    },

    {
      label: "Financials",
      href: "/financials",
      active: isRouteActive(activeRoute, "/financials"),
      submenu: [
        { label: "Financials Reports", href: "/financials/reports" },
        { label: "Events & Presentations", href: "/financials/eventsPresentations" },
      ],
    },

    {
      label: "News",
      href: "/news",
      active: isRouteActive(activeRoute, "/news"),
    },

    {
      label: "Contact Us",
      href: "/contactUs",
      active: isRouteActive(activeRoute, "/contactUs"),
    },
  ];

  if (canSeeAdmin) {
    menu.push({
      label: "Admin",
      href: "/admin",
      active: isRouteActive(activeRoute, "/admin"),
    });
  }




  return {
    menu,

    user: {
      avatar: "/assets/avatar.png",
      name: `${user.name} ${user.lastName}`,
      role: `${ user.role?.name === "UserValidation" ? "Admin": "Investor"}`,
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
