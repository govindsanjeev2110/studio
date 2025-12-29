import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from './contact-form';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We'd love to hear from you. Whether you have a question about our features, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="font-headline text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <span>hello@aquabloom.connect</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span>123 Green Way, Flora City, 54321</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-headline text-2xl font-bold mb-4">Send us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
