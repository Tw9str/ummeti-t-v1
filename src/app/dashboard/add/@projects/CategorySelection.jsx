import { useState } from 'react';
import { routing } from '@/i18n/routing';

export default function CategorySelection({ categories, state, isPending }) {
  const [showNewCategory, setShowNewCategory] = useState(false);
  return (
    <div className="space-y-2">
      {showNewCategory ? (
        <div className="space-y-2">
          {routing.locales.map((locale) => {
            return (
              <input
                key={locale}
                type="text"
                name={`category_${locale}`}
                placeholder={locale.toUpperCase()}
                className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
                disabled={isPending}
                defaultValue={state?.formObject?.category?.[locale]}
                maxLength={100}
              />
            );
          })}
          <button
            type="button"
            onClick={() => setShowNewCategory(false)}
            className="text-main text-sm mt-2"
            disabled={isPending}
          >
            Choose an existing category
          </button>
        </div>
      ) : (
        <div>
          <select
            name="category"
            className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            onChange={(e) => setShowNewCategory(e.target.value === 'new')}
            defaultValue={state?.formObject?.category?.en ?? ''}
            disabled={isPending}
          >
            <option value="">Select a category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={JSON.stringify(cat.title)}>
                {cat.title?.en} - {cat.title?.ar} - {cat.title?.tr}
              </option>
            ))}
            <option value="new">Add new category</option>
          </select>
        </div>
      )}

      {state.errors?.category && (
        <p className="text-red-500 text-sm">{state.errors.category[0]}</p>
      )}
    </div>
  );
}
