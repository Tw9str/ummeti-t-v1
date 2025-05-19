import { fetchPosts } from '@/lib/fetchData';
import PostCard from '@/components/home/ui/PostCard';
import { unstable_noStore as noStore } from 'next/cache';
import NoItemsFallback from '../ui/NoItemsFallback';
import Carousel from '@/components/widgets/carousel/Carousel';

export default async function BlogSection() {
  noStore();

  const posts = await fetchPosts();
  const mainposts = posts.filter((post) => post.isMain);

  return (
    <section className="max-w-6xl px-4 md:px-6 lg:px-8 mx-auto mt-20" id="blog">
      {mainposts.length < 1 ? (
        <NoItemsFallback />
      ) : (
        <Carousel>
          {mainposts.map((post) => (
            <div key={post.id} className="embla__slide">
              <PostCard post={post} />
            </div>
          ))}
        </Carousel>
      )}
    </section>
  );
}
