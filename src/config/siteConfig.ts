import { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Enzan",
  description: "Colabora con otros developers y crea tu portfolio ideal",
  mainNav: [
    {
      title: "Inicio",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/kaitakami",
    github: "https://github.com/kaitakami/enzan",
  },
};
