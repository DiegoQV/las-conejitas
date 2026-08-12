export type ConfigStatus = "confirmed" | "pending";

export interface ConfiguredValue<T> {
  status: ConfigStatus;
  value: T | null;
}

export interface NavigationItem {
  label: string;
  href: `#${string}`;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface AgeGateContent {
  storageKey: string;
  title: string;
  description: string;
  confirmLabel: string;
  exitLabel: string;
  exitUrl: string;
  privacyHref: string;
  responsibilityNotice: string;
}
