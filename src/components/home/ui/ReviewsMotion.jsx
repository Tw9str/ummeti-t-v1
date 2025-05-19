'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ReviewsMotion({ children }) {
  const t = useTranslations('ReviewsSection');

  return (
    <motion.section
      className="bg-white mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('title')}
        </h2>
        {children}
      </div>
    </motion.section>
  );
}
