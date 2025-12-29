"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

// SVG for WhatsApp icon as lucide-react does not have one
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M 59.371 13.407 C 86.586 13.407 108.664 35.12 108.664 61.918 C 108.664 88.716 86.743 110.943 59.371 110.428 C 49.306 110.241 42.427 109.524 34.931 104.049 C 29.209 99.853 6.607 119.944 17.781 87.046 C 13.011 79.591 10.173 71.027 10.062 61.918 C 9.761 35.245 32.141 13.407 59.371 13.407 Z"
      fill="#25d366"
    ></path>

    <g
      fill="#fefefe"
      transform="matrix(1.544021, 0, 0, 1.510208, 5.852032, 6.702332)"
    >
      <path
        d="M60.18 10.58C53.61 4.02 44.89.4 35.6.39 16.45.39.86 15.98.85 35.13c0 6.12 1.6 12.09 4.64 17.36l-4.93 18 18.42-4.83a34.657 34.657 0 0 0 16.6 4.23h.02c19.15 0 34.73-15.58 34.74-34.74.01-9.28-3.6-18-10.16-24.57zM23.95 51.95c.24.15.74.15 1.9.15 4.89-.01 9.11-.02 12.11-.02 14.02 0 13.65-14.76 7.1-16.6.96-1.7 5.33-4.9 2.63-11.5-2.68-6.53-14.18-5.05-22.05-5.05-2.91 0-2.48 2.16-2.46 5.5.02 5.3 0 19.64 0 25.84 0 1.25.38 1.45.77 1.68zm6.06-5.41h7.13c3.03-.01 5.73-1.42 5.66-4.44-.05-2.84-1.94-3.78-4.57-4.04-2.5.03-5.36.03-8.22.03zm0-14.16c5.28-.07 7.31.21 10.19-.51 1.98-1.12 2.84-5.29.01-6.7-1.97-.98-7.78-.65-10.2-.55zm5.59 31.64h-.02c-5.18 0-10.26-1.39-14.69-4.02l-1.06-.63L8.9 62.24l2.92-10.65-.69-1.1a28.798 28.798 0 0 1-4.41-15.36c0-15.92 12.96-28.87 28.89-28.87 7.71 0 14.96 3.01 20.41 8.47 5.46 5.45 8.46 12.71 8.46 20.42-.01 15.92-12.97 28.87-28.88 28.87z"
        stroke="#25d366"
        strokeMiterlimit="22.926"
        strokeWidth=".79"
      ></path>
      <path d="M23.81 51.92c.24.15.75.15 1.9.15 4.89-.01 9.11-.02 12.11-.02 14.02 0 13.66-14.76 7.1-16.6.96-1.7 5.33-4.9 2.63-11.5-2.68-6.53-14.18-5.05-22.05-5.05-2.91 0-2.47 2.16-2.46 5.5.02 5.3.01 19.64 0 25.84 0 1.25.38 1.45.77 1.68zm6.07-5.41H37c3.03-.01 5.73-1.42 5.66-4.44-.05-2.84-1.94-3.78-4.57-4.04-2.49.03-5.35.03-8.21.03zm0-14.16c5.27-.07 7.3.21 10.18-.51 1.98-1.12 2.84-5.29.01-6.7-1.96-.98-7.78-.65-10.19-.55z"></path>
    </g>
  </svg>
);

export function WhatsAppButton() {
  // Replace with your actual phone number (including country code, without + or spaces)
  const phoneNumber = "919625628393";
  const message = "Welcome to Blue Hatch! How can we assist you today?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <img
          src="/images/whatsapp-icon.svg"
          alt="WhatsApp"
          className="h-8 w-8"
        />
      </Link>
    </Button>
  );
}
