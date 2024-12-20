export interface Email {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
}

export interface EmailFolder {
  inbox: Email[];
  sent: Email[];
  drafts: Email[];
}

export interface EmailAccount {
  id: string;
  name: string;
  email: string;
  folders: EmailFolder;
  signatures: EmailSignature[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  tags: string[];
}

export interface EmailSignature {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
}