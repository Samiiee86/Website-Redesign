import type { ReactNode } from "react";

/* Line-drawn certification badges, after the devin.ai security row. Every
   mark is built from one of three frames (seal, shield, tile) with the same
   hairline and type, so the set reads as one family in a single ink. */

const T = {
  fill: "currentColor",
  stroke: "none",
  textAnchor: "middle" as const,
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
};

function Svg({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={label}
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

const Seal = () => (
  <>
    <circle cx="32" cy="32" r="29" />
    <circle cx="32" cy="32" r="25.5" />
  </>
);

const Shield = () => (
  <path d="M32 4.5 54 12v18c0 14.5-9.4 24.8-22 29.5C19.4 54.8 10 44.5 10 30V12z" />
);

const Tile = () => <rect x="5" y="9" width="54" height="46" rx="7" />;

/* a ring of small five-point stars, for the EU marks */
function StarRing({ r, n = 12, size = 2.4 }: { r: number; n?: number; size?: number }) {
  const star = (cx: number, cy: number) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const rr = i % 2 === 0 ? size : size * 0.42;
      return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
    });
    return <polygon key={`${cx}-${cy}`} points={pts.join(" ")} strokeWidth={0.7} />;
  };
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = (2 * Math.PI * i) / n - Math.PI / 2;
        return star(32 + r * Math.cos(a), 32 + r * Math.sin(a));
      })}
    </>
  );
}

function IsoGlobe({ code }: { code: string }) {
  return (
    <Svg label={`ISO ${code}`}>
      <circle cx="32" cy="32" r="27" />
      <ellipse cx="32" cy="32" rx="11" ry="27" />
      <path d="M8 21h48M8 43h48M32 5v54" />
      {/* knock the type out of the globe lines */}
      <rect x="15" y="24" width="34" height="17" rx="2" fill="#fff" stroke="none" />
      <text x="32" y="33" fontSize="10" {...T}>ISO</text>
      <text x="32" y="40.5" fontSize="6.5" {...T}>{code}</text>
    </Svg>
  );
}

const MARKS: Record<string, () => ReactNode> = {
  "SOC 2": () => (
    <Svg label="AICPA SOC 2">
      <Seal />
      <path d="M17 32h30" />
      <text x="32" y="28" fontSize="7" {...T}>AICPA</text>
      <text x="32" y="42" fontSize="9" {...T}>SOC 2</text>
    </Svg>
  ),
  "ISO 27001": () => <IsoGlobe code="27001" />,
  "ISO 27017": () => <IsoGlobe code="27017" />,
  "ISO 27701": () => <IsoGlobe code="27701" />,
  GDPR: () => (
    <Svg label="GDPR">
      <circle cx="32" cy="32" r="29" />
      <StarRing r={21} />
      <path d="M28.5 29.5v-2.5a3.5 3.5 0 0 1 7 0v2.5" />
      <rect x="27" y="29.5" width="10" height="7" rx="1.2" />
      <text x="32" y="44" fontSize="6.5" {...T}>GDPR</text>
    </Svg>
  ),
  HIPAA: () => (
    <Svg label="HIPAA">
      <Shield />
      <path d="M32 15v14M25 22h14" />
      <text x="32" y="42" fontSize="8.5" {...T}>HIPAA</text>
    </Svg>
  ),
  CCPA: () => (
    <Svg label="CCPA">
      <Seal />
      <path d="M27 27v-3.5a5 5 0 0 1 10 0V27" />
      <rect x="25" y="27" width="14" height="10" rx="1.6" />
      <circle cx="32" cy="31.5" r="1.2" />
      <text x="32" y="46" fontSize="7" {...T}>CCPA</text>
    </Svg>
  ),
  "PCI DSS": () => (
    <Svg label="PCI DSS">
      <Tile />
      <text x="29" y="32" fontSize="12" {...T}>PCI</text>
      <path d="M41 25.5l2.5 2.5 5-6" />
      <path d="M14 37h36" />
      <text x="32" y="47" fontSize="7" {...T}>DSS</text>
    </Svg>
  ),
  CSA: () => (
    <Svg label="Cloud Security Alliance">
      <path d="M19 44h27a9 9 0 0 0 .8-18 13 13 0 0 0-25-2.6A10.4 10.4 0 0 0 19 44z" />
      <text x="32" y="38" fontSize="9" {...T}>CSA</text>
      <text x="32" y="54" fontSize="5.5" {...T}>STAR</text>
    </Svg>
  ),
  ADA: () => (
    <Svg label="ADA compliant">
      <Tile />
      <text x="32" y="34" fontSize="13" {...T}>ADA</text>
      <path d="M14 39h36" />
      <text x="32" y="47" fontSize="5.5" {...T}>COMPLIANT</text>
    </Svg>
  ),
  FSQS: () => (
    <Svg label="FSQS registered">
      <circle cx="26" cy="22" r="8" />
      <circle cx="38" cy="22" r="8" />
      <circle cx="32" cy="22" r="8" />
      <text x="32" y="44" fontSize="10" {...T}>FSQS</text>
      <text x="32" y="52" fontSize="5" {...T}>REGISTERED</text>
    </Svg>
  ),
  ESG: () => (
    <Svg label="ESG">
      <Seal />
      <path d="M32 17c7 3 9 10 5.5 15.5S26 36 26 36s-1.5-8 1-12.5S32 17 32 17zM26 36l7-11" />
      <text x="32" y="47" fontSize="7.5" {...T}>ESG</text>
    </Svg>
  ),
  "EU AI Act": () => (
    <Svg label="EU AI Act">
      <Tile />
      <StarRing r={9.5} n={10} size={1.6} />
      <text x="32" y="34.5" fontSize="7" {...T}>EU</text>
      <text x="32" y="50" fontSize="7" {...T}>AI ACT</text>
    </Svg>
  ),
  "Responsible AI": () => (
    <Svg label="Responsible AI">
      <Shield />
      <text x="32" y="33" fontSize="13" {...T}>AI</text>
      <path d="M20 38h24" />
      <text x="32" y="45" fontSize="4.6" {...T}>RESPONSIBLE</text>
    </Svg>
  ),
};

export const CERT_NAMES = Object.keys(MARKS);

export function CertMark({ name }: { name: string }) {
  const Mark = MARKS[name];
  return Mark ? <Mark /> : null;
}
