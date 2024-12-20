import React, { useState } from 'react';
import { X } from 'lucide-react';
import { EmailSignature } from '../types/email';

interface SignatureEditorProps {
  signature?: EmailSignature;
  onSave: (signature: Omit<EmailSignature, 'id'>) => void;
  onClose: () => void;
}

export const SignatureEditor: React.FC<SignatureEditorProps> = ({
  signature,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(signature?.name || '');
  const [content, setContent] = useState(signature?.content || '');
  const [isDefault, setIsDefault] = useState(signature?.isDefault || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, content, isDefault });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {signature ? 'Edit Signature' : 'Create New Signature'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Signature Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Professional Signature"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Signature Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
              placeholder="Enter your signature content..."
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
              Set as default signature
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Save Signature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};