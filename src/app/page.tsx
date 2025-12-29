"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, Bot, ShoppingBasket, ArrowRight, Fish } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Informational Hub",
    description:
      "Access detailed articles and guides on fish farming and horticulture best practices.",
    link: "/resources",
  },
  {
    icon: <ShoppingBasket className="h-8 w-8 text-primary" />,
    title: "Product Marketplace",
    description:
      "A platform connecting farmers directly with buyers to sell fish and horticulture products.",
    link: "/marketplace",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Marketing & Sales Support",
    description:
      "Utilize our AI-powered tool to generate marketing content and sales strategies.",
    link: "/marketing-suite",
  },
];

const carouselSlidesData = [
  {
    id: "slide-1",
    imageId: "hero-background",
    title: "AquaBloom Connect",
    subtitle: "Sustainably Cultivating the Future of Fishery and Horticulture",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
  {
    id: "slide-2",
    imageId: "article-farming-techniques",
    title: "Explore Our Resources",
    subtitle: "Access expert articles, guides, and best practices.",
    buttonText: "View Resources",
    buttonLink: "/resources",
  },
  {
    id: "slide-3",
    imageId: "product-lettuce",
    title: "Fresh from Farm to Table",
    subtitle: "Discover high-quality products in our marketplace.",
    buttonText: "Shop Now",
    buttonLink: "/marketplace",
  },
  {
    id: "slide-4",
    imageId: "product-trout",
    title: "Grow Your Business",
    subtitle: "Leverage our AI tools to boost your marketing and sales.",
    buttonText: "Try AI Suite",
    buttonLink: "/marketing-suite",
  },
];

const fishStages = [
  {
    id: "spawn",
    title: "Spawn (Fish Eggs)",
    description:
      "The journey begins with delicate eggs, which require specific water conditions to develop properly.",
    imageId: "fish-spawn",
  },
  {
    id: "fry",
    title: "Fry (Larval Fish)",
    description:
      "Once hatched, the tiny fry actively search for food, often schooling together for protection.",
    imageId: "fish-fry",
  },
  {
    id: "fingerling",
    title: "Fingerling (Juvenile Fish)",
    description:
      "Now about the size of a finger, they are resilient and ideal for stocking larger ponds or aquaculture systems.",
    imageId: "fish-fingerling",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <button
    className={cn(
      "h-3 w-3 rounded-full transition-colors",
      selected ? "bg-primary" : "bg-primary/40"
    )}
    type="button"
    onClick={onClick}
  />
);

const FishStageSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="fish-seeds" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            The Journey of a Fish Seed
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            From a tiny egg to a resilient fingerling, understand the critical
            stages of fish development.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* The vertical timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block"></div>

          <div className="space-y-16">
            {fishStages.map((stage, index) => {
              const stageImage = PlaceHolderImages.find(
                (img) => img.id === stage.imageId
              );
              const isOdd = index % 2 !== 0;

              return (
                <motion.div
                  key={stage.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <div
                    className={cn(
                      "md:grid md:grid-cols-2 md:gap-12 items-center",
                      isOdd && "md:[direction:rtl]"
                    )}
                  >
                    <div className="relative aspect-video mb-4 md:mb-0">
                      {stageImage && (
                        <Image
                          src={stageImage.imageUrl}
                          alt={stage.title}
                          fill
                          className="object-cover rounded-lg shadow-xl"
                          data-ai-hint={stageImage.imageHint}
                        />
                      )}
                    </div>

                    <div className="md:[direction:ltr] relative">
                      {/* Circle on timeline */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-8 hidden md:block">
                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-card"></div>
                      </div>

                      <Card className="shadow-lg">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="font-headline text-xl flex items-center gap-2">
                              <Fish className="h-6 w-6 text-primary" />{" "}
                              {stage.title}
                            </CardTitle>
                            <div className="bg-primary/80 text-primary-foreground font-bold text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                              Phase {index + 1}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {stage.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/fish-seeds">
              Learn More About Fish Life Cycles{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [[page, direction], setPage] = useState([0, 0]);

  const carouselSlides = carouselSlidesData
    .map((slide) => {
      const image = PlaceHolderImages.find((img) => img.id === slide.imageId);
      return { ...slide, image };
    })
    .filter((slide) => slide.image);

  const imageIndex = page % carouselSlides.length;
  const slide =
    carouselSlides[
      imageIndex >= 0 ? imageIndex : imageIndex + carouselSlides.length
    ];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const onDotButtonClick = (slideIndex: number) => {
    const newDirection = slideIndex > page ? 1 : -1;
    setPage([slideIndex, newDirection]);
  };

  const debouncedPaginate = useCallback(() => {
    paginate(1);
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      debouncedPaginate();
    }, 4000);
    return () => clearInterval(interval);
  }, [debouncedPaginate]);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[90vh] text-white overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="w-full h-full absolute inset-0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {slide.image && (
              <Image
                src={slide.image.imageUrl}
                alt={slide.image.description}
                fill
                className="object-cover"
                priority={carouselSlides.indexOf(slide) === 0}
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
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {carouselSlides.map((_, index) => (
            <DotButton
              key={index}
              selected={
                page % carouselSlides.length === index ||
                page % carouselSlides.length ===
                  -(carouselSlides.length - index)
              }
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

      <FishStageSection />

      <section className="bg-background py-16 md:py-24">
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
