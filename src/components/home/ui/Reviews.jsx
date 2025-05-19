import ReviewsMotion from './ReviewsMotion';
import NoItemsFallback from './NoItemsFallback';
import Carousel from '@/components/widgets/carousel/Carousel';
import Review from './Review';

export default function Reviews({ reviews }) {
  return (
    <ReviewsMotion>
      {reviews.length < 1 ? (
        <NoItemsFallback />
      ) : (
        <div className="mt-8">
          <Carousel>
            {reviews?.map((review, i) => (
              <div key={review.id} className="embla__slide">
                <Review review={review} i={i} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </ReviewsMotion>
  );
}
