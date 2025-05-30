
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from '@/components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Rules from './pages/Rules';
import Certificate from './pages/Certificate';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TestList from './pages/TestList';
import TestPage from './pages/TestPage';
import TestAttemptPage from './pages/TestAttemptPage';
import TestQuestionsPage from './pages/TestQuestionsPage';
import SpecializationsPage from './pages/SpecializationsPage';
import LevelsPage from './pages/LevelsPage';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import SpecializationTestsPage from './pages/SpecializationTestsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

console.log('=== APP INITIALIZATION ===');
console.log('QueryClient created');
console.log('Setting up router...');

function App() {
  console.log('=== APP COMPONENT RENDER ===');
  console.log('App component is rendering');

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider
            router={
              createBrowserRouter([
                {
                  path: '/',
                  element: <Layout />,
                  children: [
                    {
                      path: '/',
                      element: <Home />
                    },
                    {
                      path: '/about',
                      element: <About />
                    },
                    {
                      path: '/faq',
                      element: <FAQ />
                    },
                    {
                      path: '/rules',
                      element: <Rules />
                    },
                    {
                      path: '/certificate',
                      element: <Certificate />
                    },
                    {
                      path: '/dashboard',
                      element: <Dashboard />
                    },
                    {
                      path: '/login',
                      element: <Login />
                    },
                    {
                      path: '/register',
                      element: <Register />
                    },
                    {
                      path: '/tests',
                      element: <TestList />
                    },
                    {
                      path: '/test/:id',
                      element: <TestPage />
                    },
                    {
                      path: '/test/:id/attempt',
                      element: <TestAttemptPage />
                    },
                    {
                      path: '/test/:id/questions',
                      element: <TestQuestionsPage />
                    },
                    {
                      path: '/specializations',
                      element: <SpecializationsPage />
                    },
                    {
                      path: '/specialization/:id',
                      element: <LevelsPage />
                    },
                    {
                      path: '/specialization/:specializationId/level/:levelId',
                      element: <SpecializationTestsPage />
                    },
                    {
                      path: '/admin',
                      element: <AdminPanel />
                    },
                    {
                      path: '*',
                      element: <NotFound />
                    }
                  ]
                }
              ])
            }
          />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

console.log('App module loaded successfully');

export default App;
