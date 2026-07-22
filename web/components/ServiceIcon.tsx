import {
  Scissors,
  Sparkles,
  Waves,
  Award,
  Gem,
  Sofa,
  MapPin,
  Palette,
  Baby,
  Droplets,
  Combine,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  scissors: Scissors,
  sparkles: Sparkles,
  beard: Waves,
  razor: Droplets,
  combo: Combine,
  styling: Sparkles,
  color: Palette,
  kids: Baby,
  award: Award,
  gem: Gem,
  sofa: Sofa,
  map: MapPin,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Scissors;
  return <Icon className={cn("h-6 w-6", className)} strokeWidth={1.5} />;
}
