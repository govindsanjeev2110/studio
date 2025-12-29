import { cn } from "@/lib/utils";
import { Leaf, Fish } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/logo.png"
        width={64}
        height={64}
        alt="Blue Hatch"
        quality={75}
        loading="lazy"
      />
    </Link>
  );
}
