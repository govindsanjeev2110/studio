'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateMarketingContent } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Lightbulb, ListChecks, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

const initialState = {
  message: '',
  data: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Content
        </>
      )}
    </Button>
  );
}

export function MarketingForm() {
  const [state, formAction] = useFormState(generateMarketingContent, initialState);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.data) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.data]);

  return (
    <div className="space-y-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Product Details
          </CardTitle>
          <CardDescription>
            Provide information about your product, and our AI will do the rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" name="productName" placeholder="e.g., Organic Rainbow Trout" required />
                {state.errors?.productName && <p className="text-sm font-medium text-destructive">{state.errors.productName[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="productType">Product Type</Label>
                <Select name="productType" required defaultValue="fish">
                  <SelectTrigger id="productType">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fish">Fish</SelectItem>
                    <SelectItem value="horticulture">Horticulture</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.productType && <p className="text-sm font-medium text-destructive">{state.errors.productType[0]}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productDetails">Product Details</Label>
              <Textarea id="productDetails" name="productDetails" placeholder="Describe your product's features, benefits, and unique selling points." required />
              {state.errors?.productDetails && <p className="text-sm font-medium text-destructive">{state.errors.productDetails[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input id="targetAudience" name="targetAudience" placeholder="e.g., Health-conscious families, local restaurants" required />
              {state.errors?.targetAudience && <p className="text-sm font-medium text-destructive">{state.errors.targetAudience[0]}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords (Optional)</Label>
                    <Input id="keywords" name="keywords" placeholder="e.g., sustainable, fresh, local" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="marketingGoals">Marketing Goals (Optional)</Label>
                    <Input id="marketingGoals" name="marketingGoals" placeholder="e.g., Increase online sales by 20%" />
                </div>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.data && (
        <div ref={resultsRef} className="space-y-8 animate-in fade-in duration-500">
          <h2 className="font-headline text-3xl text-center font-bold">Your Generated Marketing Assets</h2>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent" />
                Generated Product Description
              </CardTitle>
            </CardHeader>
            <CardContent className="prose">
              <p>{state.data.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                Suggested Marketing Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {state.data.strategies.map((strategy: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <ListChecks className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold mb-2">Rationale</h4>
                  <p className="text-sm text-muted-foreground">{state.data.rationale}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
       {state.message && !state.data && (
         <div ref={resultsRef} className="text-center text-destructive">
            <p>{state.message}</p>
         </div>
       )}
    </div>
  );
}
