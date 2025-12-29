import { MarketingForm } from './marketing-form';

export default function MarketingSuitePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">AI-Powered Marketing Suite</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Generate tailored promotional content and discover effective marketing strategies to maximize sales for your fishery and horticulture products.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <MarketingForm />
      </div>
    </div>
  );
}
