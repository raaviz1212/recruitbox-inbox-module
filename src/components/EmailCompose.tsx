import React, { useState, useRef, useEffect } from 'react';
import { X, Bold, Italic, List, Link, Paperclip, Search } from 'lucide-react';
import { emailTemplates } from '../data/dummyData';
import { EmailTemplate, EmailSignature } from '../types/email';
import { SignatureSelector } from './SignatureSelector';
import { SignatureEditor } from './SignatureEditor';

interface EmailComposeProps {
  onClose: () => void;
  selectedAccount: {
    email: string;
    signatures: EmailSignature[];
  };
}

export const EmailCompose: React.FC<EmailComposeProps> = ({
  onClose,
  selectedAccount,
}) => {
  const [useTemplate, setUseTemplate] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [showSignatureSelector, setShowSignatureSelector] = useState(false);
  const [showSignatureEditor, setShowSignatureEditor] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState<EmailSignature | null>(
    selectedAccount.signatures.find((sig) => sig.isDefault) || null
  );
  const [emailData, setEmailData] = useState({
    to: '',
    cc: '',
    subject: '',
    body: ''
  });

  const signatureBtnRef = useRef<HTMLButtonElement>(null);

  // Close signature selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSignatureSelector) {
        const selector = document.querySelector('[data-signature-selector]');
        if (selector && !selector.contains(event.target as Node) && 
            signatureBtnRef.current && !signatureBtnRef.current.contains(event.target as Node)) {
          setShowSignatureSelector(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSignatureSelector]);

  const filteredTemplates = emailTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEmailData(prev => ({
      ...prev,
      subject: template.subject,
      body: template.body
    }));
    setUseTemplate(false);
  };

  const handleSignatureSelect = (signature: EmailSignature | null) => {
    setSelectedSignature(signature);
    setShowSignatureSelector(false);
  };

  const handleSignatureSave = (newSignature: Omit<EmailSignature, 'id'>) => {
    // In a real app, this would make an API call to save the signature
    const signature: EmailSignature = {
      ...newSignature,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    // Update signatures list
    selectedAccount.signatures.push(signature);
    
    // Select the new signature
    setSelectedSignature(signature);
    setShowSignatureEditor(false);
  };

  const getEmailBody = () => {
    if (!selectedSignature) return emailData.body;
    return `${emailData.body}\n\n${selectedSignature.content}`;
  };

  if (useTemplate === null) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Choose Template Option</h2>
        <div className="space-y-4">
          <button
            onClick={() => setUseTemplate(true)}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium">Use Template</h3>
            <p className="text-sm text-gray-600">Start with a pre-defined email template</p>
          </button>
          <button
            onClick={() => setUseTemplate(false)}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium">No Template</h3>
            <p className="text-sm text-gray-600">Start with a blank email</p>
          </button>
        </div>
      </div>
    );
  }

  if (useTemplate) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Select Template</h2>
          <button
            onClick={() => setUseTemplate(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">New Message</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseTemplate(true)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Choose Template
          </button>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="text"
            value={selectedAccount.email}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            value={emailData.to}
            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CC</label>
          <input
            type="text"
            value={emailData.cc}
            onChange={(e) => setEmailData({ ...emailData, cc: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="cc@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={emailData.subject}
            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Email subject"
          />
        </div>

        <div className="border rounded-lg">
          <div className="flex items-center gap-2 p-2 border-b">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Bold className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Italic className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <List className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Link className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Paperclip className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={emailData.body}
            onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
            className="w-full p-4 h-64 focus:outline-none resize-none"
            placeholder="Write your message here..."
          />
        </div>

        <div className="flex justify-between">
          <div className="relative">
            <button
              ref={signatureBtnRef}
              onClick={() => setShowSignatureSelector(!showSignatureSelector)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {selectedSignature ? 'Change signature' : 'Add signature'}
            </button>
            {showSignatureSelector && (
              <div data-signature-selector>
                <SignatureSelector
                  signatures={selectedAccount.signatures}
                  selectedSignature={selectedSignature}
                  onSelect={handleSignatureSelect}
                  onClose={() => setShowSignatureSelector(false)}
                  onAdd={() => {
                    setShowSignatureSelector(false);
                    setShowSignatureEditor(true);
                  }}
                />
              </div>
            )}
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Send
          </button>
        </div>

        {selectedSignature && (
          <div className="pt-4 border-t mt-4">
            <div className="text-sm text-gray-500 mb-2">Signature:</div>
            <div className="text-sm text-gray-700 whitespace-pre-line">
              {selectedSignature.content}
            </div>
          </div>
        )}
      </div>

      {showSignatureEditor && (
        <SignatureEditor
          onSave={handleSignatureSave}
          onClose={() => setShowSignatureEditor(false)}
        />
      )}
    </div>
  );
};