'use client';
import { useState } from 'react';

export default function LocaleTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.key);

  return (
    <div>
      {/* Mobile Dropdown */}
      <div className="sm:hidden p-2">
        <label htmlFor="tabSelect" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabSelect"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full rounded-md border-gray-200"
        >
          {tabs?.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block border-b border-gray-200">
        <nav
          className="-mb-px flex items-center justify-center gap-6"
          aria-label="Tabs"
        >
          {tabs?.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === key
                  ? 'border-gray-500 text-gray-700'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {tabs?.map(({ key, content }) => (
          <div key={key} className={activeTab === key ? 'block' : 'hidden'}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
