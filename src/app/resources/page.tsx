import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Resources & Guides</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your knowledge hub for the latest in fishery and horticulture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
            const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
            return (
                <Card key={article.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                        <div className="relative aspect-video">
                            {articleImage && (
                                <Image
                                src={articleImage.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                                data-ai-hint={articleImage.imageHint}
                                />
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                        <div className="mb-4 flex gap-2">
                        {article.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                        <CardTitle className="font-headline text-xl mb-2">{article.title}</CardTitle>
                        <p className="text-muted-foreground">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                        <Button asChild variant="outline">
                            <Link href="#">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
