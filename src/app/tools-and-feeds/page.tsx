import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toolsAndFeeds } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function ToolsAndFeedsPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Tools, Feeds & Equipment
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Essential products for successful fish harvesting and farming in ponds
          and rivers. Find everything you need to maintain a healthy and
          productive aquaculture environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toolsAndFeeds.map((item) => {
          const itemImage = PlaceHolderImages.find(
            (img) => img.id === item.imageId
          );
          return (
            <Card
              key={item.id}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  {itemImage && (
                    <Image
                      src={itemImage.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      data-ai-hint={itemImage.imageHint}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2">
                  {item.name}
                </CardTitle>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
