/**
 * Published statistics, each with its source. Nothing here is estimated or rounded up.
 * Re-check the figure against the source before changing a year.
 */
export interface Stat {
  value: number;
  suffix: string;
  /** What the number counts. */
  claim: string;
  /** What a small business should take from it. */
  meaning: string;
  source: string;
  sourceUrl: string;
  /** Optional year-over-year series for a small trend chart. */
  trend?: { label: string; value: number }[];
}

export const stats: Stat[] = [
  {
    value: 58,
    suffix: "%",
    claim: "of U.S. small businesses now use generative AI.",
    meaning: "Your competitors are already trying it. Most have no rules for it.",
    source: "U.S. Chamber of Commerce, 2025",
    sourceUrl: "https://www.uschamber.com/technology/empowering-small-business-the-impact-of-technology-on-u-s-small-business",
    trend: [
      { label: "2023", value: 23 },
      { label: "2024", value: 40 },
      { label: "2025", value: 58 },
    ],
  },
  {
    value: 60,
    suffix: "%",
    claim: "of data breaches involve a person: a click, a reused password, a mistake.",
    meaning: "Habits fix more than software does. That part is teachable.",
    source: "Verizon DBIR, 2025",
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
  },
  {
    value: 88,
    suffix: "%",
    claim: "of breaches at small and midsize businesses involved ransomware.",
    meaning: "Backups and sign-in codes decide whether it is a bad day or a closed business.",
    source: "Verizon DBIR SMB snapshot, 2025",
    sourceUrl: "https://www.verizon.com/business/resources/infographics/2025-dbir-smb-snapshot.pdf",
  },
  {
    value: 53,
    suffix: "%",
    claim: "of mobile visits are abandoned when a page takes over 3 seconds to load.",
    meaning: "A slow site loses the customer before they read a word.",
    source: "Google, 2016",
    sourceUrl: "https://blog.amp.dev/2016/09/08/new-study-speedmatters-for-mobile-user-engagement-and-revenue/",
  },
];
