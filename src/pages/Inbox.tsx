import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Mail, Send, FileEdit, Settings, Plus } from 'lucide-react';
import { EmailSearch } from '../components/EmailSearch';
import { EmailCompose } from '../components/EmailCompose';
import { EmailPreview } from '../components/EmailPreview';
import { EmailSettings } from './EmailSettings';
import { dummyAccounts } from '../data/dummyData';
import { Email, EmailAccount } from '../types/email';

const EmailList: React.FC<{ 
  emails: Email[];
  onEmailSelect: (email: Email) => void;
}> = ({ emails, onEmailSelect }) => {
  return (
    <div className="divide-y">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onEmailSelect(email)}
          className={`p-4 hover:bg-gray-50 cursor-pointer ${
            !email.read ? 'font-semibold bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm">{email.sender}</span>
            <span className="text-xs text-gray-500">{email.date}</span>
          </div>
          <div className="text-sm font-medium mt-1">{email.subject}</div>
          <div className="text-sm text-gray-600 truncate mt-1">
            {email.preview}
          </div>
        </div>
      ))}
    </div>
  );
};

interface FolderButtonProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

const FolderButton: React.FC<FolderButtonProps> = ({ to, icon, children, isActive }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
        isActive
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

export const Inbox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accountId } = useParams();
  const [isComposing, setIsComposing] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  
  // Find the current account based on URL parameter
  const currentAccount = dummyAccounts.find(acc => acc.id === accountId) || dummyAccounts[0];
  const [selectedAccount, setSelectedAccount] = useState<EmailAccount>(currentAccount);

  // Get the current folder from the URL path
  const currentFolder = location.pathname.split('/').pop() || 'inbox';

  // Handle account selection
  const handleAccountSelect = (account: EmailAccount) => {
    setSelectedAccount(account);
    navigate(`/inbox/${account.id}/inbox`);
  };

  const handleSearch = (filters: any) => {
    console.log('Applying filters:', filters);
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleReply = (type: 'reply' | 'replyAll' | 'forward') => {
    if (!selectedEmail) return;

    setIsComposing(true);
    // You can handle pre-filling the compose form based on the reply type here
  };

  // Ensure we have a valid account selected
  React.useEffect(() => {
    if (!accountId) {
      navigate(`/inbox/${selectedAccount.id}/inbox`);
    } else if (accountId !== selectedAccount.id) {
      const account = dummyAccounts.find(acc => acc.id === accountId);
      if (account) {
        setSelectedAccount(account);
      }
    }
  }, [accountId, selectedAccount.id, navigate]);

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white rounded-lg shadow-sm">
      <div className="w-1/4 border-r">
        {dummyAccounts.map((account) => (
          <div key={account.id} className="p-4">
            <button
              onClick={() => handleAccountSelect(account)}
              className={`w-full text-left p-2 rounded-lg ${
                selectedAccount.id === account.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{account.name}</div>
              <div className="text-sm text-gray-600">{account.email}</div>
            </button>
            
            <div className="mt-2 space-y-1">
              <FolderButton
                to={`/inbox/${account.id}/inbox`}
                icon={<Mail className="w-4 h-4" />}
                isActive={currentFolder === 'inbox' && selectedAccount.id === account.id}
              >
                Inbox
              </FolderButton>
              <FolderButton
                to={`/inbox/${account.id}/sent`}
                icon={<Send className="w-4 h-4" />}
                isActive={currentFolder === 'sent' && selectedAccount.id === account.id}
              >
                Sent
              </FolderButton>
              <FolderButton
                to={`/inbox/${account.id}/drafts`}
                icon={<FileEdit className="w-4 h-4" />}
                isActive={currentFolder === 'drafts' && selectedAccount.id === account.id}
              >
                Drafts
              </FolderButton>
              <FolderButton
                to={`/inbox/${account.id}/settings`}
                icon={<Settings className="w-4 h-4" />}
                isActive={currentFolder === 'settings' && selectedAccount.id === account.id}
              >
                Settings
              </FolderButton>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center gap-4">
          <button
            onClick={() => setIsComposing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Compose
          </button>
          <EmailSearch onSearch={handleSearch} />
        </div>

        <div className="flex-1 overflow-auto">
          {isComposing ? (
            <EmailCompose
              onClose={() => setIsComposing(false)}
              selectedAccount={selectedAccount}
            />
          ) : selectedEmail ? (
            <EmailPreview
              email={selectedEmail}
              onClose={() => setSelectedEmail(null)}
              onReply={handleReply}
            />
          ) : (
            <Routes>
              <Route
                path="inbox"
                element={<EmailList emails={selectedAccount.folders.inbox} onEmailSelect={handleEmailSelect} />}
              />
              <Route
                path="sent"
                element={<EmailList emails={selectedAccount.folders.sent} onEmailSelect={handleEmailSelect} />}
              />
              <Route
                path="drafts"
                element={<EmailList emails={selectedAccount.folders.drafts} onEmailSelect={handleEmailSelect} />}
              />
              <Route
                path="settings"
                element={<EmailSettings account={selectedAccount} />}
              />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};