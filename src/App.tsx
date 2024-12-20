import React from 'react';
import { Layout } from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Inbox } from './pages/Inbox';
import { ComingSoon } from './pages/ComingSoon';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recruitment/clients" element={<ComingSoon title="Clients" />} />
        <Route path="/recruitment/placements" element={<ComingSoon title="Placements" />} />
        <Route path="/recruitment/career-page" element={<ComingSoon title="Career Page" />} />
        <Route path="/inbox" element={<Navigate to="/inbox/1/inbox" replace />} />
        <Route path="/inbox/:accountId/*" element={<Inbox />} />
        <Route path="/templates" element={<ComingSoon title="Templates" />} />
      </Routes>
    </Layout>
  );
}

export default App;