import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './navigation';
import TemplateProvider from './providers/TemplateProvider';
import { AuthProvider } from './providers/AuthProvider';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const App = () => (
  <Router>
    <AuthProvider>
      <TemplateProvider>
        <Navigation />
      </TemplateProvider>
    </AuthProvider>
  </Router>
);

export default App;
