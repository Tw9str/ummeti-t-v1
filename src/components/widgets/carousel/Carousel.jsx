import { getLocale } from 'next-intl/server';
import EmblaCarousel from './EmblaCarousel';
import { getLangDir } from 'rtl-detect';

export default async function Carousel({ children }) {
  const locale = await getLocale();
  const direction = getLangDir(locale);
  return <EmblaCarousel direction={direction}>{children}</EmblaCarousel>;
}
