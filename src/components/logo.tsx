import { cn } from "@/lib/utils";
import { Leaf, Fish } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("hidden md:flex md:items-center md:gap-2", className)}
    >
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
