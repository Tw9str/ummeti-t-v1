'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { updateCategoryAction } from '@/app/actions/categoryActions';
import { useActionState } from 'react';
import { useNotification } from '@/app/dashboard/context/NotificationContext';
import { useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function UpdateCategoryForm({ categoryId, initialTitle }) {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: { category: initialTitle },
  };

  const [state, formAction, isPending] = useActionState(
    updateCategoryAction,
    initialState
  );

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      showNotification({
        message: state.message,
        type: state.success ? 'success' : 'error',
      });
    }
    if (state.success) {
      router.push('/dashboard');
    }
  }, [state.message, router]);

  const handleSubmit = async (formData) => {
    formData.set('id', categoryId);
    formAction(formData);
  };

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold font-manrope leading-normal">
        Update Category
      </h2>
      <form
        action={handleSubmit}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-lg"
        noValidate
      >
        {routing.locales.map((locale) => {
          return (
            <div key={locale}>
              <input
                type="text"
                name={`category_${locale}`}
                placeholder={locale.toUpperCase()}
                className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
                disabled={isPending}
                defaultValue={
                  state.formObject?.category?.[locale] ??
                  initialTitle?.[locale] ??
                  ''
                }
                maxLength={100}
              />
              {state.errors?.title && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.title?.[locale]?._errors[0]}
                </p>
              )}
            </div>
          );
        })}
        <motion.button
          type="submit"
          className="text-white bg-main hover:bg-main-lighter tracking-wide rounded-lg text-sm px-4 py-3 flex items-center justify-center w-full !mt-6 disabled:bg-gray-400"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Category'}
        </motion.button>

        {state.message && (
          <p
            className={`text-sm mt-4 text-center ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
