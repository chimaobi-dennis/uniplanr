// Pages not yet ported point at the live (legacy) site. Swap to local routes as each phase ships.
const LEGACY = "https://uniplanr.com";

export const links = {
  programs: "/programs",
  community: `${LEGACY}/forum/home`,
  partners: `${LEGACY}/pages/university/partnerships`,
  blog: `${LEGACY}/blog/home`,
  getStarted: `${LEGACY}/register`,
  privacy: `${LEGACY}/pages/legal/privacy-policy`,
  terms: `${LEGACY}/pages/legal/terms-conditions`,
  studyDestinations: `${LEGACY}/pages/study-destinations`,
  contactEmail: "mailto:info@uniplanr.com",
} as const;

export const nav = [
  { label: "Programs", href: links.programs },
  { label: "Community", href: links.community },
  { label: "Partners", href: links.partners },
  { label: "Blog", href: links.blog },
] as const;
