import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GsuiteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const GsuiteForm: React.FC<GsuiteFormProps> = ({ onSuccess, onCancel }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleAuth = async () => {
    setIsAuthenticating(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsAuthenticating(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Connect Google Workspace
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Connect your Google Workspace account to enable email synchronization and access to Google services.
        </p>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">Features included:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Gmail integration for email sync</li>
            <li>• Google Calendar access for scheduling</li>
            <li>• Google Contacts synchronization</li>
            <li>• Send emails via Gmail</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={handleGoogleAuth}
            disabled={isAuthenticating}
            className="px-4 py-2 text-sm text-white bg-[#4285f4] hover:bg-[#3367d6] rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isAuthenticating ? 'Connecting...' : 'Connect with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};