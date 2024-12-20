import React, { useState } from 'react';
import { Mail, Server, Check, X, Globe } from 'lucide-react';
import { IntegrationCard } from '../components/IntegrationCard';
import { MSOfficeForm } from '../components/integration-forms/MSOfficeForm';
import { GsuiteForm } from '../components/integration-forms/GsuiteForm';
import { SMTPForm } from '../components/integration-forms/SMTPForm';
import { EmailAccount } from '../types/email';

type IntegrationType = 'msoffice' | 'gsuite' | 'smtp' | null;

interface EmailSettingsProps {
  account: EmailAccount;
}

export const EmailSettings: React.FC<EmailSettingsProps> = ({ account }) => {
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType>(null);
  const [integrationStatus, setIntegrationStatus] = useState<{
    msoffice: boolean;
    gsuite: boolean;
    smtp: boolean;
  }>({
    msoffice: false,
    gsuite: false,
    smtp: false,
  });

  const handleIntegrationSuccess = (type: IntegrationType) => {
    if (type) {
      setIntegrationStatus(prev => ({ ...prev, [type]: true }));
      setSelectedIntegration(null);
    }
  };

  const handleDisconnect = (type: IntegrationType) => {
    if (type) {
      setIntegrationStatus(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
          <p className="mt-2 text-gray-600">
            Configure email integration for {account.name} ({account.email})
          </p>
        </div>

        <div className="space-y-6">
          <IntegrationCard
            title="Microsoft Office 365"
            description="Connect your Microsoft Office 365 account to sync emails, calendar, and contacts."
            icon={<Mail className="w-6 h-6" />}
            isConnected={integrationStatus.msoffice}
            onConnect={() => setSelectedIntegration('msoffice')}
            onDisconnect={() => handleDisconnect('msoffice')}
          />

          <IntegrationCard
            title="Google Workspace (G Suite)"
            description="Integrate with Google Workspace to access Gmail, Google Calendar, and contacts."
            icon={<Globe className="w-6 h-6" />}
            isConnected={integrationStatus.gsuite}
            onConnect={() => setSelectedIntegration('gsuite')}
            onDisconnect={() => handleDisconnect('gsuite')}
          />

          <IntegrationCard
            title="Custom SMTP Server"
            description="Configure a custom SMTP server for sending emails through your own email server."
            icon={<Server className="w-6 h-6" />}
            isConnected={integrationStatus.smtp}
            onConnect={() => setSelectedIntegration('smtp')}
            onDisconnect={() => handleDisconnect('smtp')}
          />
        </div>
      </div>

      {/* Integration Forms Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              {selectedIntegration === 'msoffice' && (
                <MSOfficeForm
                  onSuccess={() => handleIntegrationSuccess('msoffice')}
                  onCancel={() => setSelectedIntegration(null)}
                />
              )}
              {selectedIntegration === 'gsuite' && (
                <GsuiteForm
                  onSuccess={() => handleIntegrationSuccess('gsuite')}
                  onCancel={() => setSelectedIntegration(null)}
                />
              )}
              {selectedIntegration === 'smtp' && (
                <SMTPForm
                  onSuccess={() => handleIntegrationSuccess('smtp')}
                  onCancel={() => setSelectedIntegration(null)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};