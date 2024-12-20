import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MSOfficeFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const MSOfficeForm: React.FC<MSOfficeFormProps> = ({ onSuccess, onCancel }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleMicrosoftAuth = async () => {
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
          Connect Microsoft Office 365
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Click the button below to connect your Microsoft Office 365 account. You'll be redirected to Microsoft's login page to authorize the connection.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">What you'll get:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sync emails from your Office 365 account</li>
            <li>• Access to calendar for scheduling</li>
            <li>• Import contacts and distribution lists</li>
            <li>• Send emails using your Office 365 account</li>
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
            onClick={handleMicrosoftAuth}
            disabled={isAuthenticating}
            className="px-4 py-2 text-sm text-white bg-[#0078d4] hover:bg-[#006abc] rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isAuthenticating ? 'Connecting...' : 'Connect with Microsoft'}
          </button>
        </div>
      </div>
    </div>
  );
};