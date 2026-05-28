import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { SurveyForm } from './components/SurveyForm';
import { AdminDashboard } from './components/AdminDashboard';

// Types
export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'Likert' | 'Radio' | 'Text';
  required: boolean;
  category: 'CC' | 'SQD';
  choices?: string[];
}

export interface SurveyResponse {
  id: number;
  refId: string;
  date: string;
  clientType: string;
  sex: string;
  age: string;
  region: string;
  service: string;
  serviceOther?: string;
  cc1: string;
  cc2: string;
  cc3: string;
  sqd0: string;
  sqd1: string;
  sqd2: string;
  sqd3: string;
  sqd4: string;
  sqd5: string;
  sqd6: string;
  sqd7: string;
  sqd8: string;
  sqdAvg: number;
  suggestions: string;
  email: string;
  timestamp: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function App() {
  const [view, setView] = useState<'landing' | 'survey' | 'admin'>('landing');
  
  // Survey Questions State
  const [questions, setQuestions] = useState<SurveyQuestion[]>([
    { id: 'sqd0', text: 'I am satisfied with the service that I availed.', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd1', text: 'I spent a reasonable amount of time for my transaction.', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd2', text: 'The office followed the transaction\'s requirements and steps based on the information provided.', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd3', text: 'The steps (including payment) I needed to do for my transaction were easy and simple.', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd4', text: 'I easily found information about my transaction from the office or its website.', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd5', text: 'I paid a reasonable amount of fees for my transaction. (If service was free, mark the \'N/A\' column.)', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd6', text: 'I feel the office was fair to everyone, or "walang palakasan", during my transaction.', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd7', text: 'I was treated courteously by the staff, and (if asked for help) the staff was helpful.', type: 'Likert', required: true, category: 'SQD' },
    { id: 'sqd8', text: 'I got what I needed from the government office, or (if denied) denial of request was sufficiently explained to me.', type: 'Likert', required: true, category: 'SQD' },
    { 
      id: 'cc1', 
      text: 'Which of the following best describes your awareness of a Citizen\'s Charter?', 
      type: 'Radio', 
      required: true, 
      category: 'CC',
      choices: [
        '1. I know what a CC is and I saw this office\'s CC.',
        '2. I know what a CC is but I did NOT see this office\'s CC.',
        '3. I learned of the CC only when I saw this office\'s CC.',
        '4. I do not know what a CC is and I did not see one in this office.'
      ]
    },
    { 
      id: 'cc2', 
      text: 'If aware of CC, would you say that the CC of this office was...?', 
      type: 'Radio', 
      required: true, 
      category: 'CC',
      choices: [
        '1. Easy to see',
        '2. Somewhat easy to see',
        '3. Difficult to see',
        '4. Not visible at all',
        '5. N/A'
      ]
    },
    { 
      id: 'cc3', 
      text: 'If aware of CC (answered 1-3 in CC1), how much did the CC help you in your transaction?', 
      type: 'Radio', 
      required: true, 
      category: 'CC',
      choices: [
        '1. Helped very much',
        '2. Somewhat helped',
        '3. Did not help',
        '4. N/A'
      ]
    },
  ]);

  // Survey Responses State
  const [responses, setResponses] = useState<SurveyResponse[]>([
    { id: 1, refId: 'VZM-CSM-1759662846524-3555', date: '2025-10-05', service: 'Business Permit', sqdAvg: 4.8, clientType: 'Business', suggestions: 'Very efficient service!', email: 'test@example.com', sex: 'male', age: '35', region: 'ncr', serviceOther: '', cc1: '1', cc2: '1', cc3: '1', sqd0: '5', sqd1: '5', sqd2: '5', sqd3: '4', sqd4: '5', sqd5: '5', sqd6: '5', sqd7: '5', sqd8: '4', timestamp: 1759662846524 },
    { id: 2, refId: 'VZM-CSM-1759662846524-3556', date: '2025-10-05', service: 'Civil Registry Services', sqdAvg: 4.5, clientType: 'Citizen', suggestions: 'Good but can improve waiting time', email: '', sex: 'female', age: '28', region: 'ncr', serviceOther: '', cc1: '2', cc2: '2', cc3: '2', sqd0: '5', sqd1: '4', sqd2: '5', sqd3: '4', sqd4: '4', sqd5: 'na', sqd6: '5', sqd7: '5', sqd8: '4', timestamp: 1759662846524 },
    { id: 3, refId: 'VZM-CSM-1759662846524-3557', date: '2025-10-05', service: 'Building Permit', sqdAvg: 4.7, clientType: 'Business', suggestions: 'Staff very helpful', email: 'builder@test.com', sex: 'male', age: '42', region: 'region3', serviceOther: '', cc1: '1', cc2: '1', cc3: '1', sqd0: '5', sqd1: '5', sqd2: '5', sqd3: '4', sqd4: '5', sqd5: '4', sqd6: '5', sqd7: '5', sqd8: '5', timestamp: 1759662846524 },
  ]);

  // Users State
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Admin User', email: 'admin@valenzuela.gov.ph', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Staff Member', email: 'staff@valenzuela.gov.ph', role: 'Staff', status: 'Active' },
    { id: 3, name: 'Enumerator', email: 'enumerator@valenzuela.gov.ph', role: 'Enumerator', status: 'Active' },
  ]);

  // Handlers for Admin Dashboard
  const handleAddQuestion = (question: SurveyQuestion) => {
    setQuestions([...questions, question]);
  };

  const handleUpdateQuestion = (id: string, updates: Partial<SurveyQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleAddUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Math.max(...users.map(u => u.id)) + 1 };
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = (id: number, updates: Partial<User>) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleSubmitResponse = (response: Omit<SurveyResponse, 'id' | 'timestamp'>) => {
    const newResponse = {
      ...response,
      id: responses.length > 0 ? Math.max(...responses.map(r => r.id)) + 1 : 1,
      timestamp: Date.now()
    };
    setResponses([newResponse, ...responses]);
  };

  return (
    <div className="min-h-screen">
      {view === 'landing' && (
        <LandingPage 
          onTakeSurvey={() => setView('survey')} 
          onAdminLogin={() => setView('admin')}
          responses={responses}
        />
      )}
      {view === 'survey' && (
        <SurveyForm 
          onBackToLanding={() => setView('landing')}
          questions={questions}
          onSubmitResponse={handleSubmitResponse}
        />
      )}
      {view === 'admin' && (
        <AdminDashboard 
          responses={responses}
          questions={questions}
          users={users}
          onAddQuestion={handleAddQuestion}
          onUpdateQuestion={handleUpdateQuestion}
          onDeleteQuestion={handleDeleteQuestion}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          onLogout={() => setView('landing')}
        />
      )}
    </div>
  );
}