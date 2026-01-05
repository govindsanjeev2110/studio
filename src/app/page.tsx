"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { recognitions } from "@/lib/placeholder-data";
import {
  BookOpen,
  Bot,
  ShoppingBasket,
  ArrowRight,
  Fish,
  GalleryHorizontal,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

// Since this is a client component, we can't export metadata directly.
// SEO metadata for this page is managed in `src/app/layout.tsx`.

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Fish and Shrimp Production & Supply",
    description:
      "Access detailed articles and guides on fish farming and horticulture best practices.",
    link: "/resources",
  },
  {
    icon: <ShoppingBasket className="h-8 w-8 text-primary" />,
    title: "Seeds, Feed & Equipment Supply",
    description:
      "A platform connecting farmers directly with buyers to sell fish and horticulture products.",
    link: "/marketplace",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Contract Farming & Marketing Consultancy",
    description:
      "Utilize our AI-powered tool to generate marketing content and sales strategies.",
    link: "/marketing-suite",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Fish & Shrimp Value Added Products Supply",
    description:
      "Utilize our AI-powered tool to generate marketing content and sales strategies.",
    link: "/marketing-suite",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Fish & Shrimp farming Consultancy Services",
    description:
      "Utilize our AI-powered tool to generate marketing content and sales strategies.",
    link: "/marketing-suite",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Training & Capacity Building Programs",
    description:
      "Utilize our AI-powered tool to generate marketing content and sales strategies.",
    link: "/marketing-suite",
  },
];

const carouselSlidesData = [
  {
    id: "slide-1",
    imageId: "article-farming-techniques",
    title: "Turn Your Water into Wealth",
    subtitle:
      "From digging your first pond to your first harvest—get expert guides, proven strategies, and daily insights for aquaculture success",
    buttonText: "View Resources",
    buttonLink: "/resources",
  },
  {
    id: "slide-2",
    imageId: "hero-background",
    title: "Pure Water. Healthy Fish. Honest Farming.",
    subtitle:
      "Comprehensive strategies to maximize yield and minimize mortality in commercial fish farming",
    buttonText: "Learn More",
    buttonLink: "/about",
  },

  {
    id: "slide-3",
    imageId: "product-lettuce",
    title: "Premium Supplies for a Healthy Harvest",
    subtitle:
      "Top-quality feed, medicine, and equipment trusted by India’s leading fish farmers",
    buttonText: "Shop Now",
    buttonLink: "/marketplace",
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
      x: 0,
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
      x: 0,
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
      selected ? "bg-primary" : "bg-white/50"
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

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // This will apply a 0.2s delay between each child animation
      },
    },
  };

  const cardVariants = {
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
    <section id="features" className="py-16 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Our Core Services
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Empowering our members with tools and knowledge for growth and
            success in fish and shrimp farming. Let's explore what we offer.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline mt-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  {/* <Button
                    variant="link"
                    asChild
                    className="text-primary font-bold mt-auto"
                  >
                    <Link href={feature.link}>
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const galleryImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith("gallery-image-")
  ).slice(0, 8); // Limit to 8 images for the homepage
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // This will apply a 0.2s delay between each child animation
      },
    },
  };

  const cardVariants = {
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
    <section id="gallery" className="py-8 md:py-16 bg-blue-200/10" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            From Our Farms
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            A visual journey of our fish & shrimp farm and products.
          </p>
        </div>

        <motion.div
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={cardVariants}
              className="overflow-hidden rounded-lg shadow-lg break-inside-avoid transform hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={500}
                height={500}
                className="h-auto w-full object-cover"
                data-ai-hint={image.imageHint}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/gallery">
              View Full Gallery <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

const RecognitionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="recognitions" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Training & Recognitions
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence is recognized by industry leaders.
          </p>
        </div>
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {recognitions.map((recognition) => {
            const certImage = PlaceHolderImages.find(
              (img) => img.id === recognition.imageId
            );
            return (
              <motion.div key={recognition.id} variants={itemVariants}>
                <Card className="overflow-hidden text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[4/3] bg-muted">
                      {certImage && (
                        <Image
                          src={certImage.imageUrl}
                          alt={recognition.title}
                          fill
                          className="object-contain p-2"
                          data-ai-hint={certImage.imageHint}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col justify-center">
                    <h3 className="font-headline text-lg font-bold flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-accent" />{" "}
                      {recognition.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Issued by {recognition.issuer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const videoSlidesData = [
  {
    title: "Traditional Farming with Modern technology",
    description:
      "At Bluehatch, we merge technology with tradition, creating sustainable cycles where fish and ponds thrive together.",
  },
  {
    title: "Healthy Harvesting",
    description:
      "We try to reduce water usage, eliminate chemical fertilizers, and produce healthier, organic products.",
  },
  {
    title: "Value Added Products",
    description:
      "We are committed to advancing fish and shrimp production with value added products",
  },
];

const VideoPresentationSection = () => {
  const videoData = PlaceHolderImages.find(
    (p) => p.id === "presentation-video"
  );
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = page % videoSlidesData.length;
  const activeSlide =
    videoSlidesData[
      slideIndex >= 0 ? slideIndex : slideIndex + videoSlidesData.length
    ];

  const paginate = useCallback(() => {
    setPage((prev) => [prev[0] + 1, 1]);
  }, []);

  useEffect(() => {
    const interval = setInterval(paginate, 5000);
    return () => clearInterval(interval);
  }, [paginate]);

  if (!videoData) return null;

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 h-[80vh] min-h-[600px] overflow-hidden text-white flex items-end"
    >
      <video
        key={videoData.imageUrl}
        src={videoData.imageUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        data-ai-hint={videoData.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

      <div className="container mx-auto px-4 relative z-20 w-full">
        <div className="max-w-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-left"
            >
              <h2 className="font-headline text-3xl md:text-5xl font-bold">
                {activeSlide.title}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
          {/* <Button
            asChild
            size="lg"
            className="mt-8 bg-primary hover:bg-primary/90"
          >
            <Link href="/about">
              Learn About Our Mission <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [[page, direction], setPage] = useState([0, 0]);

  // useEffect(() => {
  //   document.title = "Blue Hatch | Sustainable Fishery Solutions";
  // }, []);

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
    }, 8000);
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
              opacity: { duration: 0.5 },
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md"
              >
                {slide.subtitle}
              </motion.p>
              {/* <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg"
                      >
                        <Link href={slide.buttonLink}>
                          {slide.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div> */}
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
      {/* 
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Core Services
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering our members with tools and knowledge for growth and
              success in fish and shrimp farming. Let's explore what we offer.
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
      </section> */}

      <FeaturesSection />
      <VideoPresentationSection />

      <GallerySection />
      <RecognitionsSection />

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Join Our Community
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Become a part of a growing network of fishery professionals
            dedicated to sustainable practices and market success.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg"
          >
            <Link href="/contact">Call Us Or Send Us Message </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
