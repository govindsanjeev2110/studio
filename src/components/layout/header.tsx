"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  BookOpen,
  ShoppingBasket,
  Bot,
  Info,
  Mail,
  Fish,
  Phone,
  Twitter,
  Facebook,
  Instagram,
  Wrench,
  Home,
  EllipsisVertical,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navLinks = [
  // {
  //   href: "/resources",
  //   label: "Resources",
  //   icon: <BookOpen className="h-5 w-5" />,
  // },
  {
    href: "/fish-seeds",
    label: "Fish Seeds",
    icon: <Fish className="h-5 w-5" />,
  },
  {
    href: "/tools-and-feeds",
    label: "Tools & Feeds",
    icon: <Wrench className="h-5 w-5" />,
  },
  // { href: '/marketplace', label: 'Marketplace', icon: <ShoppingBasket className="h-5 w-5" /> },
  // { href: '/marketing-suite', label: 'AI Suite', icon: <Bot className="h-5 w-5" /> },
  { href: "/about", label: "About Us", icon: <Info className="h-5 w-5" /> },
  { href: "/contact", label: "Contact", icon: <Mail className="h-5 w-5" /> },
];

function TopBar({ isTransparent }: { isTransparent: boolean }) {
  return (
    <div
      className={cn(
        "py-1 transition-colors duration-300",
        isTransparent ? "bg-transparent text-white" : " text-muted-foreground "
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 ">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <a
            href="tel:+919625628393"
            className="flex items-center gap-1 hover:underline"
          >
            <div className="bg-primary/10 p-2 rounded-full">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[16px]">+91 9625628393</span>
          </a>
          <a
            href="mailto:bluehatch04052023@gmail.com"
            className="flex items-center gap-1 hover:underline"
          >
            <div className="bg-primary/10 p-2 rounded-full">
              <Mail className="h-4 w-4 text-primary" />
            </div>

            <span className="text-[16px]">bluehatch04052023@gmail.com</span>
          </a>
        </div>
        {/* <div className="flex items-center gap-3">
          <a
            href="#"
            className={cn("hover:opacity-80", isTransparent && "text-white")}
          >
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="#"
            className={cn("hover:opacity-80", isTransparent && "text-white")}
          >
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </a>
          <a
            href="#"
            className={cn("hover:opacity-80", isTransparent && "text-white")}
          >
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </a>
        </div> */}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true); // Always non-transparent on other pages
    }
  }, [isHomePage]);

  const isTransparent = isHomePage && !isScrolled;

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
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
          isTransparent
            ? "text-white hover:bg-white/10"
            : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
          isActive &&
            (isTransparent
              ? "bg-white/10 font-semibold"
              : "bg-accent text-accent-foreground font-semibold"),
          className
        )}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isTransparent ? "bg-transparent" : "bg-card shadow-sm"
      )}
    >
      {/* <TopBar isTransparent={isTransparent} /> */}
      <div
        className={cn(
          "container mx-auto flex h-30 items-center justify-between px-2 md:px-4 transition-colors duration-300",
          isTransparent ? "border-transparent" : "border-t"
        )}
      >
        <Logo className={cn(isTransparent && "text-white")} />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <TopBar isTransparent={isTransparent} />
        <Sheet>
          <SheetTrigger asChild>
            {/* <Button
              variant="link"
              size="icon"
              className={cn("md:hidden", isTransparent ? " text-white " : "")}
            > */}
            <EllipsisVertical
              className={cn(
                "md:hidden",
                isTransparent ? " text-white " : "text-blue-500"
              )}
            />
            {/* <Menu className=" text-blue-500 h-11" /> */}
            {/* <span className="sr-only">Toggle navigation menu</span>
            </Button> */}
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                {/* <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose> */}
              </div>
              <nav className="grid gap-2 text-lg font-medium">
                <SheetClose asChild>
                  <Link
                    href="/"
                    onClick={() => {}}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent/50"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>
                </SheetClose>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <NavLink
                      {...link}
                      className="text-muted-foreground hover:text-accent-foreground"
                    />
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
