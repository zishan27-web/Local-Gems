
import { Suspense } from 'react';
import GemsClientPage from './GemsClientPage';

// A simple loading component to show as a fallback
function Loading() {
  return <p className="text-lg font-bold text-center text-gray-600 mt-20">Loading page...</p>;
}

export default function GemsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <GemsClientPage />
    </Suspense>
  );
}