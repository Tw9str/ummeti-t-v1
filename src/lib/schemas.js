import { z } from 'zod';

export const categoryTitle = z
  .string()
  .min(2, 'Category must be at least 2 characters')
  .max(100, 'Category title must not exceed 100 characters');

export const CategorySchema = z.object({
  ar: categoryTitle,
  en: categoryTitle,
  tr: categoryTitle,
  id: categoryTitle,
  ru: categoryTitle,
});

const title = z
  .string()
  .min(1, 'Title is required')
  .max(100, 'Title must not exceed 100 characters');

const description = z
  .string()
  .min(1, 'Description is required')
  .max(6000, 'Description must not exceed 6000 characters');

const TitleSchema = z.object({
  ar: title,
  en: title,
  tr: title,
  id: title,
  ru: title,
});

const DescriptionSchema = z.object({
  ar: description,
  en: description,
  tr: description,
  id: description,
  ru: description,
});

export const ProjectSchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  isMain: z.boolean(),
  category: CategorySchema,
  raised: z.number().min(0, 'Raised amount must be 0 or greater'),
  goal: z.number().min(1, 'Goal must be greater than 0'),
  images: z
    .array(
      z
        .custom((val) => val instanceof File, 'Must be a valid File object')
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          'Image must be less than 5MB'
        )
        .refine(
          (file) =>
            ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(
              file.type
            ),
          'Only JPEG, PNG, and WebP images are allowed'
        )
    )
    .optional(),
});

export const ToggleItemMainSchema = z.object({
  id: z.string().min(1, 'Project ID is required'),
  isMain: z.boolean(),
});

export const ProjectIdSchema = z.string().min(1, 'Project ID is required');

export const PostSchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  isMain: z.boolean(),
  images: z
    .array(
      z
        .custom((val) => val instanceof File, 'Must be a valid File object')
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          'Image must be less than 5MB'
        )
        .refine(
          (file) =>
            ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(
              file.type
            ),
          'Only JPEG, PNG, and WebP images are allowed'
        )
    )
    .optional(),
});

export const PostIdSchema = z.string().min(1, 'Post ID is required');

export const EmailSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  message: z
    .string()
    .min(10, 'Message must contain at least 10 characters')
    .max(500, 'Message can contain a maximum of 500 characters'),
});

const url = z.string().url('Invalid URL').optional().or(z.literal(''));
const urlSchema = z.object({
  ar: url,
  en: url,
  tr: url,
  id: url,
  ru: url,
});

export const ContactUpdateSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20, 'Phone number too long'),
  address: z.string().max(255, 'Address too long'),
  location: z.string().url('Invalid URL').optional().or(z.literal('')),
  youtube: urlSchema,
  twitter: urlSchema,
  instagram: urlSchema,
  facebook: urlSchema,
});
