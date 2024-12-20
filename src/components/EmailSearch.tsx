import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface EmailSearchProps {
  onSearch: (filters: any) => void;
}

export const EmailSearch: React.FC<EmailSearchProps> = ({ onSearch }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    keywords: '',
    name: '',
    subject: '',
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative flex-1">
      <div className="flex items-center h-10 border rounded-lg bg-white">
        <div className="flex-1 flex items-center">
          <Search className="w-5 h-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 focus:outline-none"
          />
        </div>
        <div className="border-l h-full flex items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 h-full flex items-center gap-1 text-gray-600 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border z-10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="text"
                value={filters.from}
                onChange={(e) => handleFilterChange('from', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="text"
                value={filters.to}
                onChange={(e) => handleFilterChange('to', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Keywords</label>
              <input
                type="text"
                value={filters.keywords}
                onChange={(e) => handleFilterChange('keywords', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Candidate or Client Name
              </label>
              <input
                type="text"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject Keywords
              </label>
              <input
                type="text"
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFilters({
                  from: '',
                  to: '',
                  keywords: '',
                  name: '',
                  subject: '',
                })}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  onSearch(filters);
                  setShowFilters(false);
                }}
                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};