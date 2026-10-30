import type { SVGProps } from 'react';

/** Solar-flavoured linear icon set — 1.5px stroke, 24px grid. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 18, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Base>
);

export const IconTable = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="16" />
    <path d="M3 10h18M9 10v10" />
  </Base>
);

export const IconGrid = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </Base>
);

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconRetry = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </Base>
);

export const IconAlert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 9v5M12 17.5v.01" />
  </Base>
);

export const IconUsers = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 5.5a3.2 3.2 0 0 1 0 6.2M17.5 20a6.6 6.6 0 0 0-1.6-4.3" />
  </Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="5" width="19" height="14" />
    <path d="m3 6 9 7 9-7" />
  </Base>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L16 12l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3h2Z" />
  </Base>
);

export const IconGlobe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </Base>
);

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const IconBuilding = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 21V6l8-3 8 3v15" />
    <path d="M9 21v-5h6v5M8 9h.01M12 9h.01M16 9h.01M8 12.5h.01M12 12.5h.01M16 12.5h.01" />
  </Base>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Base>
);

export const IconChevron = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 5 7 7-7 7" />
  </Base>
);

export const IconLeaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 4c0 8-5.5 13-13 13H4c0-8 5.5-13 13-13h3Z" />
    <path d="M4 21 15 10" />
  </Base>
);
