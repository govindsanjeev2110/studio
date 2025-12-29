'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, ShoppingBasket, Bot, Info, Mail, Fish } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/resources', label: 'Resources', icon: <BookOpen className="h-5 w-5" /> },
  { href: '/fish-seeds', label: 'Fish Seeds', icon: <Fish className="h-5 w-5" /> },
  { href: '/marketplace', label: 'Marketplace', icon: <ShoppingBasket className="h-5 w-5" /> },
  { href: '/marketing-suite', label: 'AI Suite', icon: <Bot className="h-5 w-5" /> },
  { href: '/about', label: 'About Us', icon: <Info className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({
    href,
    label,
    icon,
    className,
    onClick,
  }: {
    href: string;
    label: string;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent/50',
          isActive ? 'bg-accent font-semibold' : 'text-muted-foreground',
          className
        )}
      >
        {icon}
        {label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              className="text-sm font-medium"
            />
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <SheetClose asChild>
                   <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="grid gap-2 text-lg font-medium">
                <SheetClose asChild>
                    <NavLink href="/" label="Home" icon={<div className='w-5'></div>}/>
                </SheetClose>
                {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                        <NavLink {...link} />
                    </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
