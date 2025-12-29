import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const fishStages = [
    {
        id: 'spawn',
        title: 'Spawn (Fish Eggs)',
        description:
        'The journey begins with spawn, which are the eggs of fish. These delicate eggs are typically laid in large clusters in protected areas of a pond. They require specific water conditions, including temperature and oxygen levels, to develop properly. This is the most vulnerable stage of a fish\'s life.',
        imageId: 'fish-spawn',
    },
    {
        id: 'fry',
        title: 'Fry (Larval Fish)',
        description:
        'Once the eggs hatch, the tiny fish are called fry. At this stage, they have absorbed their yolk sac and are now actively searching for food, usually microscopic organisms like zooplankton. Fry are still very small and vulnerable, often schooling together in shallow, vegetated areas of the pond for protection from predators.',
        imageId: 'fish-fry',
    },
    {
        id: 'fingerling',
        title: 'Fingerling (Juvenile Fish)',
        description:
        'As fry grow and develop scales and working fins, they become fingerlings—so named because they are about the size of a finger. Fingerlings are more resilient than fry and have a more varied diet. They are at the ideal stage for stocking larger ponds or for aquaculture systems, as they have a higher survival rate and are on their way to becoming adult fish.',
        imageId: 'fish-fingerling',
    },
];

export default function FishSeedsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          The Life Cycle of Fish Seeds
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Understanding the different stages of fish development—from spawn to fingerling—is crucial for successful aquaculture and fishery management.
        </p>
      </div>

      <div className="space-y-20">
        {fishStages.map((stage, index) => {
          const stageImage = PlaceHolderImages.find((img) => img.id === stage.imageId);
          const isReversed = index % 2 !== 0;
          return (
            <section key={stage.id}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={`prose prose-lg max-w-none ${isReversed ? 'md:col-start-2' : ''}`}>
                  <h2 className="font-headline text-3xl font-bold">{stage.title}</h2>
                  <p>{stage.description}</p>
                </div>
                <div className={`relative h-80 rounded-lg overflow-hidden shadow-lg ${isReversed ? 'md:col-start-1' : ''}`}>
                  {stageImage && (
                    <Image
                      src={stageImage.imageUrl}
                      alt={stageImage.description}
                      data-ai-hint={stageImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
