import {
  Search,
  Share2,
  Camera,
  ArrowUpRight,
  Compass,
  Mail,
  Zap,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const formatChannelName = (key: string): string => {
  const special: Record<string, string> = {
    linkedin: "LinkedIn",
    facebook: "Facebook",
    youtube: "YouTube",
    github: "GitHub",
    twitter: "Twitter / X",
    organicsearch: "Organic Search",
    google: "Google",
    direct: "Direct",
    referral: "Referral",
    email: "Email",
    instagram: "Instagram",
    social: "Social",
    paid: "Paid Ads",
  };
  const normalized = key.toLowerCase().replace(/[\s_-]/g, "");
  if (special[normalized]) return special[normalized];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export const getChannelColor = (key: string, idx: number): string => {
  const normalized = key.toLowerCase().replace(/[\s_-]/g, "");
  const map: Record<string, string> = {
    direct: "#4857D2", // Master Primary Brand Color
    referral: "#98A9F9", // Master Secondary Brand Color
    google: "#0284c7", // Sky Blue
    search: "#0284c7",
    organicsearch: "#0ea5e9",
    linkedin: "#6366f1", // Indigo
    facebook: "#3b82f6", // Blue
    instagram: "#ec4899", // Rose / Pink
    email: "#0d9488", // Teal
    mail: "#0d9488",
    social: "#8b5cf6", // Purple
    paid: "#f59e0b", // Amber
  };
  if (map[normalized]) return map[normalized];

  const fallbacks = [
    "#4857D2",
    "#98A9F9",
    "#6366f1",
    "#0284c7",
    "#0d9488",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
  ];
  return fallbacks[idx % fallbacks.length];
};

export const getChannelIcon = (name: string): LucideIcon => {
  const n = name.toLowerCase();
  if (n.includes("google") || n.includes("search")) return Search;
  if (n.includes("linkedin") || n.includes("facebook") || n.includes("social")) return Share2;
  if (n.includes("instagram")) return Camera;
  if (n.includes("referral")) return ArrowUpRight;
  if (n.includes("direct")) return Compass;
  if (n.includes("email") || n.includes("mail")) return Mail;
  if (n.includes("paid")) return Zap;
  return Globe;
};
