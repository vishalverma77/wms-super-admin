import type { ReactNode } from "react";

export type NavSectionItem = {
  section: string;
  path?: undefined;
  label?: undefined;
  icon?: undefined;
};

export type NavLinkItem = {
  section?: undefined;
  path: string;
  label: string;
  icon: ReactNode;
};

export type NavItem = NavSectionItem | NavLinkItem;
