import { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  secondDescription: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
    contact: string;
    blog: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Enzan",
  description: "Colabora con otros developers y crea tu portfolio ideal",
  secondDescription: "Juntamos a personas que quieren crear tech.",
  mainNav: [
    {
      title: "Inicio",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/kaitakami_",
    github: "https://github.com/kaitakami/enzan",
    contact: "https://www.kaitakami.dev#contact",
    blog: "https://www.kaitakami.dev/blog",
  },
};
