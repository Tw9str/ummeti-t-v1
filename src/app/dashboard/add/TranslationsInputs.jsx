'use client';

export default function TranslationsInputs({ lang, state, isPending }) {
  return (
    <div className="mt-4 space-y-4">
      <div>
        <input
          type="text"
          name={`title_${lang}`}
          placeholder="Title"
          className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
          disabled={isPending}
          defaultValue={state?.formObject?.title?.[lang] ?? ''}
          maxLength={100}
        />
        {state?.errors?.title && (
          <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <textarea
          name={`description_${lang}`}
          placeholder="Description"
          rows="8"
          className="w-full rounded-lg px-4 py-3 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
          disabled={isPending}
          defaultValue={state?.formObject?.description?.[lang] ?? ''}
          maxLength={6000}
        />
        {state?.errors?.description && (
          <p className="text-red-500 text-sm">{state.errors.description[0]}</p>
        )}
      </div>
    </div>
  );
}
