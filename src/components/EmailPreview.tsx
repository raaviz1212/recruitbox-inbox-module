import React from 'react';
import { ArrowLeft, Reply, CornerUpRight, Forward, Star, Trash2, Archive } from 'lucide-react';
import { Email } from '../types/email';

interface EmailPreviewProps {
  email: Email;
  onClose: () => void;
  onReply: (type: 'reply' | 'replyAll' | 'forward') => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ email, onClose, onReply }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">{email.subject}</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onReply('reply')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Reply"
          >
            <Reply className="w-5 h-5" />
          </button>
          <button
            onClick={() => onReply('replyAll')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Reply All"
          >
            <CornerUpRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onReply('forward')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Forward"
          >
            <Forward className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Star"
          >
            <Star className="w-5 h-5" />
          </button>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Archive"
          >
            <Archive className="w-5 h-5" />
          </button>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Email Details */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {email.sender[0].toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{email.sender}</div>
                <div className="text-sm text-gray-500">
                  To: {email.recipient}
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">{email.date}</div>
        </div>
      </div>

      {/* Email Body */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="prose max-w-none whitespace-pre-wrap">
          {email.body}
        </div>
      </div>
    </div>
  );
};