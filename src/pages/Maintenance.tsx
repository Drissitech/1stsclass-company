import React from 'react';
import { ShieldAlert } from 'lucide-react';

export function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldAlert className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Under Maintenance</h1>
        <p className="text-lg text-gray-600 mb-8">
          We are currently performing scheduled maintenance to improve our website. 
          We apologize for the inconvenience and appreciate your patience.
        </p>
      </div>
    </div>
  );
}
