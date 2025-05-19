import React from 'react';

export default function SocialInputs({ lang, state, isPending }) {
  console.log(state);
  return (
    <div className="mt-4 space-y-4">
      <div>
        <input
          type="url"
          name={`youtube_${lang}`}
          placeholder="YouTube URL"
          defaultValue={state.formObject?.youtube?.[lang] ?? ''}
          className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
          disabled={isPending}
        />
        {state.errors?.youtube?.[lang] && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.youtube[lang]._errors[0]}
          </p>
        )}
      </div>
      <div>
        <input
          type="url"
          name={`twitter_${lang}`}
          placeholder="Twitter URL"
          defaultValue={state.formObject?.twitter?.[lang] ?? ''}
          className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
          disabled={isPending}
        />
        {state.errors?.twitter?.[lang] && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.twitter[lang]._errors[0]}
          </p>
        )}
      </div>
      <div>
        <input
          type="url"
          name={`instagram_${lang}`}
          placeholder="Instagram URL"
          defaultValue={state.formObject?.instagram?.[lang] ?? ''}
          className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
          disabled={isPending}
        />
        {state.errors?.instagram?.[lang] && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.instagram[lang]._errors[0]}
          </p>
        )}
      </div>
      <div>
        <input
          type="url"
          name={`facebook_${lang}`}
          placeholder="Facebook URL"
          defaultValue={state.formObject?.facebook?.[lang] ?? ''}
          className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
          disabled={isPending}
        />
        {state.errors?.facebook?.[lang] && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.facebook[lang]._errors[0]}
          </p>
        )}
      </div>
    </div>
  );
}
