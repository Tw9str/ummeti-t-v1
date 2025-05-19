'use client';
import { motion } from 'framer-motion';

export default function Review({ review, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="h-full"
    >
      <blockquote className="rounded-lg bg-second-lightest p-6 h-full shadow-sm sm:p-8">
        <p className="mt-0.5 text-lg font-medium text-gray-900 capitalize">
          {review.firstName} {review.lastName}
        </p>
        <p className="mt-4 text-gray-700 line-clamp-4 first-letter:capitalize">
          {review.text}
        </p>
      </blockquote>
    </motion.div>
  );
}
