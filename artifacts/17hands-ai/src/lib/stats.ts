/**
 * Published statistics, each with its source. Nothing here is estimated or rounded up.
 * The claim and takeaway text for each lives in the locale files, in this order.
 * Re-check the figure against the source before changing a year.
 */
export interface Stat {
  value: number;
  suffix: string;
  source: string;
  sourceUrl: string;
  /** Optional year-over-year series for a small trend chart. */
  trend?: { label: string; value: number }[];
}

export const stats: Stat[] = [
  {
    value: 58,
    suffix: "%",
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
    source: "Verizon DBIR, 2025",
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
  },
  {
    value: 88,
    suffix: "%",
    source: "Verizon DBIR SMB snapshot, 2025",
    sourceUrl: "https://www.verizon.com/business/resources/infographics/2025-dbir-smb-snapshot.pdf",
  },
  {
    value: 53,
    suffix: "%",
    source: "Google, 2016",
    sourceUrl: "https://blog.amp.dev/2016/09/08/new-study-speedmatters-for-mobile-user-engagement-and-revenue/",
  },
];
