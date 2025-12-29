import { cn } from '@/lib/utils';
import { Leaf, Fish } from 'lucide-react';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center bg-primary/10 p-2 rounded-full">
         <Fish className="h-6 w-6 text-primary" />
      </div>
      <span className="font-headline text-xl font-bold text-foreground hidden sm:inline-block">
        AquaBloom Connect
      </span>
    </Link>
  );
}
