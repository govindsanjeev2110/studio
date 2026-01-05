import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { teamMembers } from "@/lib/placeholder-data";
import Image from "next/image";

export default function AboutPage() {
  const missionImage = PlaceHolderImages.find(
    (img) => img.id === "about-us-mission"
  );

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          About Blue Hatch
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Fostering innovation and collaboration in fishery and shrimp farming
          for a sustainable future.
        </p>
      </div>

      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-headline text-3xl font-bold">
              Our Mission & Vision
            </h2>
            <p>
              Our mission is to empower fishery and shrimp farmers by providing
              a connected ecosystem for knowledge sharing, trade, and growth. We
              believe in the power of technology to bridge gaps, foster
              sustainable practices, and create a prosperous future for our
              members and the planet.
            </p>
            <p>
              We envision a world where food production is both abundant and in
              harmony with nature. Blue Hatch aims to be the leading digital
              platform that drives this change, connecting producers to markets
              and innovators to a community that values sustainability and
              quality above all.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            {missionImage && (
              <Image
                src={missionImage.imageUrl}
                alt={missionImage.description}
                data-ai-hint={missionImage.imageHint}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Meet Our Team
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            The passionate individuals driving our mission forward.
          </p>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find(
              (img) => img.id === member.imageId
            );
            return (
              <Card
                key={member.name}
                className="text-center border-0 shadow-none bg-transparent"
              >
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 border-4 border-primary/20">
                    {memberImage && (
                      <AvatarImage
                        src={memberImage.imageUrl}
                        alt={member.name}
                        data-ai-hint={memberImage.imageHint}
                      />
                    )}
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-headline text-xl font-bold">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            );
          })}
        </div> */}
      </section>
    </div>
  );
}
