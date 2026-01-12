"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchNavigation, triggerScrape } from '@/lib/api';
import NavigationGrid from '@/components/NavigationGrid';
import { useState } from 'react';

export default function Home() {
  const { data: navData, isLoading, refetch } = useQuery({
    queryKey: ['navigation'],
    queryFn: fetchNavigation,
  });

  const [scraping, setScraping] = useState(false);

  const handleScrape = async () => {
    setScraping(true);
    try {
      await triggerScrape();
      alert('Scraping started! Check back in a few seconds.');
    } catch (e) {
      alert('Failed to start scrape.');
    } finally {
      setScraping(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AbleSpace Explorer</h1>
        <button
          onClick={handleScrape}
          disabled={scraping}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {scraping ? 'Starting...' : 'Refresh Data'}
        </button>
      </header>

      <div className="container mx-auto py-8">
        <h2 className="text-xl font-semibold mb-4 px-4">Browse Categories</h2>
        {isLoading ? (
          <div className="p-4">Loading navigation...</div>
        ) : (
          <NavigationGrid data={navData || []} />
        )}
      </div>
    </main>
  );
}
