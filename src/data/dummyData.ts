import { EmailAccount, EmailTemplate } from '../types/email';

export const dummyAccounts: EmailAccount[] = [
  {
    id: '1',
    name: 'Recruitment Team',
    email: 'recruitment@company.com',
    signatures: [
      {
        id: '1',
        name: 'Professional',
        content: `Best regards,
John Smith
Senior Recruiter
Company Name
Phone: (555) 123-4567
Email: recruitment@company.com`,
        isDefault: true
      },
      {
        id: '2',
        name: 'Casual',
        content: `Cheers,
John
Recruitment Team`,
        isDefault: false
      }
    ],
    folders: {
      inbox: [
        {
          id: '1',
          sender: 'john.doe@example.com',
          recipient: 'recruitment@company.com',
          subject: 'Senior Developer Application',
          preview: 'I am writing to express my interest in the Senior Developer position...',
          body: `Dear Recruitment Team,

I am writing to express my interest in the Senior Developer position at your company. With over 8 years of experience in full-stack development and a strong background in React and Node.js, I believe I would be a valuable addition to your team.

Throughout my career, I have:
- Led development teams of 5-7 developers
- Implemented microservices architecture
- Reduced deployment time by 60%
- Mentored junior developers

I would welcome the opportunity to discuss how my skills and experience align with your needs.

Best regards,
John Doe`,
          date: '2024-03-10 14:30',
          read: false
        },
        {
          id: '2',
          sender: 'sarah.smith@techcorp.com',
          recipient: 'recruitment@company.com',
          subject: 'Interview Schedule - Frontend Developer',
          preview: 'Can we schedule the technical interview for next Tuesday?',
          body: `Hi Recruitment Team,

I hope this email finds you well. I'd like to schedule the technical interview for the Frontend Developer position with our engineering team.

Would next Tuesday at 2:00 PM EST work for your candidate? We'll be conducting a 1-hour technical assessment followed by a 30-minute team fit discussion.

Please let me know if this time works, and I'll send out the calendar invites.

Best regards,
Sarah Smith
Engineering Manager`,
          date: '2024-03-10 11:15',
          read: true
        },
        {
          id: '3',
          sender: 'mike.wilson@client.com',
          recipient: 'recruitment@company.com',
          subject: 'New Position Opening',
          preview: 'We have a new urgent requirement for a DevOps Engineer...',
          body: `Hello,

We have an urgent requirement for a Senior DevOps Engineer position. This is a critical role for our cloud infrastructure team.

Key requirements:
- 5+ years of experience with AWS
- Strong knowledge of Kubernetes
- Experience with CI/CD pipelines
- Infrastructure as Code expertise

The salary range is $130,000 - $160,000, depending on experience. We need someone who can start within the next 4-6 weeks.

Can you help us find suitable candidates?

Regards,
Mike Wilson
Technical Director`,
          date: '2024-03-09 16:45',
          read: true
        }
      ],
      sent: [
        {
          id: '4',
          sender: 'recruitment@company.com',
          recipient: 'john.doe@example.com',
          subject: 'Re: Senior Developer Application',
          preview: 'Thank you for your application. We would like to schedule...',
          body: `Dear John,

Thank you for your interest in the Senior Developer position at our company. We were impressed with your background and experience.

We would like to schedule an initial interview to discuss your experience and the role in more detail. Would any of the following times work for you?

- Monday, March 15th at 10:00 AM EST
- Tuesday, March 16th at 2:00 PM EST
- Wednesday, March 17th at 11:00 AM EST

Please let me know your preference, and I'll send a calendar invitation with the meeting details.

Best regards,
Recruitment Team`,
          date: '2024-03-10 15:00',
          read: true
        }
      ],
      drafts: [
        {
          id: '5',
          sender: 'recruitment@company.com',
          recipient: 'candidate@email.com',
          subject: 'Interview Confirmation',
          preview: 'Draft: Thank you for your interest in our company...',
          body: `Dear [Candidate Name],

Thank you for your interest in joining our team. We have reviewed your application and would like to invite you for an interview.

The interview process will consist of:
1. Technical assessment (45 minutes)
2. System design discussion (30 minutes)
3. Team fit conversation (30 minutes)

Please let me know your availability for next week, and I'll arrange the schedule accordingly.

Best regards,
Recruitment Team`,
          date: '2024-03-10 09:20',
          read: true
        }
      ]
    }
  },
  {
    id: '2',
    name: 'HR Department',
    email: 'hr@company.com',
    signatures: [
      {
        id: '3',
        name: 'HR Signature',
        content: `Kind regards,
HR Department
Company Name
hr@company.com`,
        isDefault: true
      }
    ],
    folders: {
      inbox: [
        {
          id: '6',
          sender: 'employee@company.com',
          recipient: 'hr@company.com',
          subject: 'Onboarding Documents',
          preview: 'Please find attached the completed onboarding documents...',
          body: `Hi HR Team,

I have completed all the required onboarding documents as requested. Please find them attached to this email.

Documents included:
- Personal Information Form
- Tax Forms
- Direct Deposit Authorization
- Emergency Contact Information
- Signed Employee Handbook Acknowledgment

Please let me know if you need any additional information from me.

Best regards,
New Employee`,
          date: '2024-03-10 13:45',
          read: false
        }
      ],
      sent: [
        {
          id: '7',
          sender: 'hr@company.com',
          recipient: 'new.hire@email.com',
          subject: 'Welcome to the Team',
          preview: 'We are excited to have you join our team...',
          body: `Dear [New Hire],

Welcome to our team! We are excited to have you join us starting next Monday, March 17th.

Please arrive at our office at 9:00 AM. Our office manager will meet you in the lobby and help you get settled in.

What to bring on your first day:
- Government-issued ID
- Void check for direct deposit
- Signed offer letter

We look forward to working with you!

Best regards,
HR Team`,
          date: '2024-03-09 11:30',
          read: true
        }
      ],
      drafts: []
    }
  }
];

export const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Interview Invitation',
    subject: 'Interview Invitation for [Position] at [Company]',
    body: `Dear [Candidate Name],

We are pleased to invite you for an interview for the [Position] role at [Company]. 

Interview Details:
- Date: [Date]
- Time: [Time]
- Location: [Location/Video Call Link]

Please confirm your availability by responding to this email.

Best regards,
[Your Name]
[Company] Recruitment Team`,
    category: 'Recruitment',
    tags: ['interview', 'candidate', 'scheduling']
  },
  {
    id: '2',
    name: 'Job Offer',
    subject: 'Job Offer - [Position] at [Company]',
    body: `Dear [Candidate Name],

We are delighted to offer you the position of [Position] at [Company].

Key Details:
- Start Date: [Date]
- Salary: [Amount]
- Location: [Office Location]

Please review the attached offer letter for complete details.

We look forward to welcoming you to the team!

Best regards,
[Your Name]
[Company] HR Team`,
    category: 'HR',
    tags: ['offer', 'hiring', 'onboarding']
  },
  {
    id: '3',
    name: 'Application Acknowledgment',
    subject: 'Application Received - [Position]',
    body: `Dear [Candidate Name],

Thank you for applying for the [Position] role at [Company]. We have received your application and are currently reviewing it.

We will contact you within the next 5-7 business days regarding the next steps.

Best regards,
[Company] Recruitment Team`,
    category: 'Recruitment',
    tags: ['application', 'acknowledgment', 'candidate']
  },
  {
    id: '4',
    name: 'Follow-up Interview',
    subject: 'Next Round Interview - [Position]',
    body: `Dear [Candidate Name],

Following your initial interview, we would like to invite you for a follow-up interview with our [Department] team.

Please let us know your availability for the following time slots:
- [Date/Time Option 1]
- [Date/Time Option 2]
- [Date/Time Option 3]

Best regards,
[Your Name]
[Company] Recruitment Team`,
    category: 'Recruitment',
    tags: ['interview', 'follow-up', 'scheduling']
  }
];