import { fetchApprovedReviews } from '@/lib/fetchData';
import Reviews from '../ui/Reviews';

export default async function ReviewsSection() {
  const reviews = await fetchApprovedReviews();
  return <Reviews reviews={reviews} />;
}
