import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';
import MyForms from './pages/MyForms';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateForm />} />
        <Route path="/preview" element={<PreviewForm />} />
        <Route path="/myforms" element={<MyForms />} />
      </Routes>
    </Router>
  );
};

export default App;
