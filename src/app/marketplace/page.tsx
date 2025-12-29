'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('all');
  const fisheryProducts = products.filter((p) => p.category === 'Fishery');
  const horticultureProducts = products.filter((p) => p.category === 'Horticulture');

  const ProductCard = ({ product }: { product: typeof products[0] }) => {
    const productImage = PlaceHolderImages.find(img => img.id === product.imageId);
    return (
      <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3]">
            {productImage ? (
                <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={productImage.imageHint}
                />
            ) : (
                <div className="bg-muted w-full h-full flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground"/>
                </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-lg mb-2">{product.name}</CardTitle>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">{product.unit}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const ProductGrid = ({ productList }: { productList: typeof products }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Product Marketplace</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover fresh, high-quality products directly from our network of trusted farmers.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="fishery">Fishery</TabsTrigger>
          <TabsTrigger value="horticulture">Horticulture</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
            <ProductGrid productList={products} />
        </TabsContent>
        <TabsContent value="fishery">
            <ProductGrid productList={fisheryProducts} />
        </TabsContent>
        <TabsContent value="horticulture">
            <ProductGrid productList={horticultureProducts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
