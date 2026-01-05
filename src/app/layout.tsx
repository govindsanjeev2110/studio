"use client";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { GoogleAnalytics } from "@/components/google-analytics";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// export const metadata: Metadata = {
//   title: "Blue Hatch",
//   description: "Connecting fishery and horticulture for a sustainable future.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {isHomePage && (
          <>
            <title>Blue Hatch | Sustainable Fishery Solutions</title>
            <meta
              name="description"
              content="Sustainably cultivating the future of fish and shrimp farming"
            />
            <meta
              property="og:title"
              content="Blue Hatch | Sustainable Fishery Solutions"
            />
            <meta
              property="og:description"
              content="Sustainably cultivating the future of fish and shrimp farming "
            />

            <meta
              property="og:image"
              content="https://www.bluehatch.in/images/og.png"
            />

            <meta property="og:url" content="https://bluehatch.in" />
            <meta property="og:type" content="website" />
          </>
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col")}>
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
