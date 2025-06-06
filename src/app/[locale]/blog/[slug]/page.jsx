import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchPostBySlug } from '@/lib/fetchData';
import Breadcrumb from '@/components/widgets/Breadcrumb';
import Carousel from '@/components/widgets/carousel/Carousel';
import { getLocale } from 'next-intl/server';

export default async function BlogPost({ params }) {
  const locale = await getLocale();
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await fetchPostBySlug(decodedSlug);

  if (!post) {
    return notFound();
  }

  const { title, description, images, createdAt } = post;

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb />
      <div className="max-w-3xl mx-auto">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-2">
            {title?.[locale] || title?.en}
          </h1>
          <p className="text-gray-500 text-sm">
            Published on{' '}
            <time dateTime="2022-04-05">{createdAt.toLocaleDateString()}</time>
          </p>
        </div>

        <div className="relative w-full aspect-video mb-8">
          <Image
            src={images[0] || '/placeholder.svg'}
            alt={title?.[locale] || title?.en || 'Post image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>

        <p className="mx-auto whitespace-pre-wrap pb-8">
          {description?.[locale].trim() || description?.en.trim()}
        </p>
        <Carousel>
          {images.map((image) => (
            <div key={image} className="embla__slide !flex-[0_0_20%]">
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={title?.[locale] || title?.en || 'Post slide'}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
