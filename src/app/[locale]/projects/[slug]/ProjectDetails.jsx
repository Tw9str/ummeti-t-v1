import Image from 'next/image';
import ProgressBar from '@/components/widgets/ProgressBar';
import Carousel from '@/components/widgets/carousel/Carousel';
import { getLocale } from 'next-intl/server';

export default async function ProjectDetails({
  project: { title, description, raised, goal, images },
}) {
  const locale = await getLocale();
  return (
    <div className="bg-white md:col-span-3 p-4 sm:p-6 md:p-12">
      <div className="relative aspect-video rounded-lg overflow-hidden mt-4">
        <Image
          src={images[0] || '/placeholder.svg'}
          alt={title?.[locale] || title?.en || 'Project image'}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-12 mt-4">
        <ProgressBar raised={raised} goal={goal} />
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {title?.[locale] || title?.en}
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap pb-8 font-medium">
            {description?.[locale]?.trim() || description?.en?.trim()}
          </p>
        </div>
      </div>
      <Carousel>
        {images.map((image) => (
          <div key={image} className=" embla__slide !flex-[0_0_25%]">
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={title?.[locale] || title?.en || 'Project slide'}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
