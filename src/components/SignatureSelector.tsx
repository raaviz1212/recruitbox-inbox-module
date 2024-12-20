import React from 'react';
import { Check, PlusCircle } from 'lucide-react';
import { EmailSignature } from '../types/email';

interface SignatureSelectorProps {
  signatures: EmailSignature[];
  selectedSignature: EmailSignature | null;
  onSelect: (signature: EmailSignature | null) => void;
  onClose: () => void;
  onAdd: () => void;
}

export const SignatureSelector: React.FC<SignatureSelectorProps> = ({
  signatures,
  selectedSignature,
  onSelect,
  onClose,
  onAdd,
}) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-xl border overflow-hidden z-50">
      <div className="p-3 border-b bg-gray-50">
        <div className="text-sm font-medium text-gray-700">
          Select Signature
        </div>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
        <button
          onClick={() => onSelect(null)}
          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-md flex items-center justify-between transition-colors"
        >
          <span>No signature</span>
          {selectedSignature === null && <Check className="w-4 h-4 text-indigo-600" />}
        </button>

        {signatures.map((signature) => (
          <button
            key={signature.id}
            onClick={() => onSelect(signature)}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-md flex items-center justify-between group transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{signature.name}</div>
              {signature.isDefault && (
                <div className="text-xs text-gray-500">Default</div>
              )}
            </div>
            {selectedSignature?.id === signature.id && (
              <Check className="w-4 h-4 text-indigo-600 flex-shrink-0 ml-2" />
            )}
          </button>
        ))}
      </div>

      <div className="p-2 border-t bg-gray-50">
        <button
          onClick={onAdd}
          className="w-full px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center gap-2 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Create new signature
        </button>
      </div>
    </div>
  );
};