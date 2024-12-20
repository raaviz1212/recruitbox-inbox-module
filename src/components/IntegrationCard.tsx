import React from 'react';
import { Check, X } from 'lucide-react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  title,
  description,
  icon,
  isConnected,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="ml-4">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center text-sm text-green-600 font-medium">
                <Check className="w-4 h-4 mr-1" />
                Connected
              </span>
              <button
                onClick={onDisconnect}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};