import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Blue Hatch",
  description:
    "Get in touch with Blue Hatch. We'd love to hear from you whether you have a question, feedback, or a collaboration idea.",
  openGraph: {
    title: "Contact Blue Hatch",
    description:
      "Reach out to our team for support, inquiries, or to learn more about our platform.",
  },
};

import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-32 flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl md:text-5xl font-bold">
            Get In Touch
          </CardTitle>
          <CardDescription className="mt-4 max-w-2xl mx-auto text-lg">
            We'd love to hear from you. Whether you have a question about our
            features, pricing, or anything else, we are always ready to answer
            all your questions as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
