'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CautionIcon, RemoveIcon, UploadIcon } from '../../ui/Icons';
import { addPostAction } from '@/app/actions/postActions';
import { useActionState } from 'react';
import Toggle from '../../ui/Toggle';
import { useNotification } from '../../context/NotificationContext';
import { useRouter } from 'next/navigation';
import TranslationsInputs from '../TranslationsInputs';
import LocaleTabs from '../../ui/LocaleTabs';
import { tabsConfig } from '../tabsConfig';

export default function AddPostForm() {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: undefined,
  };

  const [state, formAction, isPending] = useActionState(
    addPostAction,
    initialState
  );

  const [images, setImages] = useState([]);
  const [isMain, setIsMain] = useState(false);
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

  const handleFileChange = (e) => {
    const newImages = Array.from(e.target.files || []).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="py-8">
      <h2 className="text-center text-gray-900 text-3xl font-bold font-manrope">
        Add Post
      </h2>
      <form
        action={(formData) => {
          images.forEach((image) => formData.append('images', image.file));
          formData.set('isMain', isMain);
          formAction(formData);
        }}
        className="mt-8 space-y-4 max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
        noValidate
      >
        <LocaleTabs
          tabs={tabsConfig.locales.map((locale) => ({
            key: locale,
            label: locale.toUpperCase(),
            icon: tabsConfig.icons[locale],
            content: (
              <TranslationsInputs
                key={locale}
                lang={locale}
                state={state}
                isPending={isPending}
              />
            ),
          }))}
        />

        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="projects"
            className="block text-sm font-medium text-gray-700"
          >
            Show on Homepage
          </label>
          <Toggle
            isChecked={isMain}
            onChange={() => setIsMain((prevState) => !prevState)}
            isPending={isPending}
          />
        </div>

        {isMain && (
          <div className="flex items-center gap-2 mb-2 text-xs text-main bg-gray-50 p-2 rounded-md">
            <CautionIcon />
            <span>Post will be visible on the homepage</span>
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-100">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            disabled={isPending}
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer flex flex-col items-center text-gray-600 text-sm font-medium ${
              isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <UploadIcon />
            <span className="text-main font-semibold">Browse</span>
          </label>
        </div>
        {state.errors?.images && (
          <p className="text-red-500 text-sm">{state.errors.images}</p>
        )}
        {images.length > 0 && (
          <div className="grid gap-2 grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative border rounded-lg p-2 h-28 overflow-hidden"
              >
                <Image
                  src={image.preview}
                  alt="preview"
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  disabled={isPending}
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg text-sm px-4 py-3 disabled:bg-gray-400"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </motion.button>
        {state.message && (
          <p
            className={`text-sm text-center ${
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
