
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookOpen, Bot, ShoppingBasket, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Autoplay from "embla-carousel-autoplay"
import { cn } from '@/lib/utils';


const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Informational Hub',
    description:
      'Access detailed articles and guides on fish farming and horticulture best practices.',
    link: '/resources',
  },
  {
    icon: <ShoppingBasket className="h-8 w-8 text-primary" />,
    title: 'Product Marketplace',
    description:
      'A platform connecting farmers directly with buyers to sell fish and horticulture products.',
    link: '/marketplace',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Marketing & Sales Support',
    description:
      'Utilize our AI-powered tool to generate marketing content and sales strategies.',
    link: '/marketing-suite',
  },
];

const carouselSlidesData = [
  {
    id: 'slide-1',
    imageId: 'hero-background',
    title: 'AquaBloom Connect',
    subtitle: 'Sustainably Cultivating the Future of Fishery and Horticulture',
    buttonText: 'Learn More',
    buttonLink: '/about',
  },
  {
    id: 'slide-2',
    imageId: 'article-farming-techniques',
    title: 'Explore Our Resources',
    subtitle: 'Access expert articles, guides, and best practices.',
    buttonText: 'View Resources',
    buttonLink: '/resources',
  },
  {
    id: 'slide-3',
    imageId: 'product-lettuce',
    title: 'Fresh from Farm to Table',
    subtitle: 'Discover high-quality products in our marketplace.',
    buttonText: 'Shop Now',
    buttonLink: '/marketplace',
  },
  {
    id: 'slide-4',
    imageId: 'product-trout',
    title: 'Grow Your Business',
    subtitle: 'Leverage our AI tools to boost your marketing and sales.',
    buttonText: 'Try AI Suite',
    buttonLink: '/marketing-suite',
  },
];


type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <button
    className={cn(
      'h-3 w-3 rounded-full transition-colors',
      selected ? 'bg-primary' : 'bg-primary/40'
    )}
    type="button"
    onClick={onClick}
  />
);

export default function Home() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const carouselSlides = carouselSlidesData.map(slide => {
    const image = PlaceHolderImages.find(img => img.id === slide.imageId);
    return { ...slide, image };
  }).filter(slide => slide.image);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );
  
  useEffect(() => {
    if (!api) {
      return
    }
    setScrollSnaps(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap())

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }
    api.on('select', onSelect)
    
    return () => {
      api.off('select', onSelect)
    }
  }, [api]);


  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
        <Carousel 
            setApi={setApi}
            className="w-full h-full" opts={{ loop: true }}
            plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: true,
                }),
            ]}
            >
          <CarouselContent>
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={slide.id} className="h-full">
                <div className="w-full h-full relative">
                  {slide.image && (
                     <Image
                        src={slide.image.imageUrl}
                        alt={slide.image.description}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        data-ai-hint={slide.image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg"
                    >
                      <Link href={slide.buttonLink}>
                        {slide.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {scrollSnaps.map((_, index) => (
            <DotButton
                key={index}
                selected={index === current}
                onClick={() => onDotButtonClick(index)}
            />
            ))}
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Core Features
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering our members with tools and knowledge for growth and
              success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline mt-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button
                    variant="link"
                    asChild
                    className="text-primary font-bold"
                  >
                    <Link href={feature.link}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Join Our Community
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Become a part of a growing network of fishery and horticulture
            professionals dedicated to sustainable practices and market success.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
