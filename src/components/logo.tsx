import { cn } from "@/lib/utils";
import { Leaf, Fish } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/logo.png"
        width={100}
        height={100}
        alt="Blue Hatch"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={75}
        loading="lazy"
      />
    </Link>
  );
}
