import { routing } from '@/i18n/routing';

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^a-zA-Z0-9\u0600-\u06FF-]+/g, '') // Allow Arabic (Unicode range: \u0600-\u06FF)
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function getLocalizedField(
  formData,
  field,
  languages = routing.locales
) {
  return languages.reduce(
    (obj, lang) => ({
      ...obj,
      [lang]: String(formData.get(`${field}_${lang}`) || ''),
    }),
    {}
  );
}

export async function generateUniqueSlug(title) {
  const enSlug = slugify(title.en);
  const arSlug = slugify(title.ar);
  const baseSlug = `${enSlug}-${arSlug}`;
  let finalSlug = baseSlug;
  let count = 0;

  while (await prisma.project.findUnique({ where: { slug: finalSlug } })) {
    count++;
    finalSlug = `${baseSlug}-${count}`;
  }

  return finalSlug;
}
