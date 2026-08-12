import { siteIdentity } from "@/data/site";
import { cn } from "@/lib/utils";

interface BrandProps {
  compact?: boolean;
  className?: string;
}

export function Brand({ compact = false, className }: BrandProps) {
  return (
    <span className={cn("brand", className)} aria-label={siteIdentity.name}>
      <span className="brand__name">{siteIdentity.name}</span>
      {!compact && (
        <span className="brand__descriptor">{siteIdentity.descriptor}</span>
      )}
    </span>
  );
}
