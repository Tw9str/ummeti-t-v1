'use server';
import { z } from 'zod';
import prisma from '@/lib/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { ContactUpdateSchema } from '@/lib/schemas';
import { getLocalizedField } from '@/lib/utils';

export async function updateContactAction(prevState, formData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message:
        'Unauthorized: You must be logged in to update contact information',
    };
  }

  const formObject = {
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    location: formData.get('location'),
    youtube: getLocalizedField(formData, 'youtube'),
    twitter: getLocalizedField(formData, 'twitter'),
    instagram: getLocalizedField(formData, 'instagram'),
    facebook: getLocalizedField(formData, 'facebook'),
  };

  const parsed = ContactUpdateSchema.safeParse(formObject);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.format(),
      formObject,
      message: 'Validation failed',
    };
  }

  try {
    const validatedData = parsed.data;

    const existingContact = await prisma.contact.findFirst();

    if (existingContact) {
      await prisma.contact.update({
        where: { id: existingContact.id },
        data: {
          email: validatedData.email,
          phone: validatedData.phone,
          address: validatedData.address,
          location: validatedData.location,
          youtube: validatedData.youtube,
          twitter: validatedData.twitter,
          instagram: validatedData.instagram,
          facebook: validatedData.facebook,
        },
      });
    } else {
      await prisma.contact.create({
        data: {
          email: validatedData.email,
          phone: validatedData.phone,
          address: validatedData.address,
          location: validatedData.location,
          youtube: validatedData.youtube,
          twitter: validatedData.twitter,
          instagram: validatedData.instagram,
          facebook: validatedData.facebook,
        },
      });
    }

    revalidatePath('/');
    return {
      success: true,
      message: 'Contact information updated successfully!',
      formObject,
    };
  } catch (error) {
    console.error('Error updating contact:', error);
    return {
      success: false,
      message: 'Failed to update contact information. Please try again.',
      formObject,
    };
  }
}
