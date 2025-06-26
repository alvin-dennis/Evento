import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const Navbar = lazy(() => import('./modules/Navbar/Navbar'));
const HomePage = lazy(() => import('./modules/Home/Base/HomePage'));
const LoginPage = lazy(() => import('./modules/Auth/Login/Login'));
const SignupPage = lazy(() => import('./modules/Auth/Signup/Signup'));
const DashboardPage = lazy(() => import('./modules/Dashboard/Dashboard'));
const EventsPage = lazy(() => import('./modules/Events/Base/Events'));
const CreateEventPage = lazy(() => import('./modules/Events/Create/CreateEvent'));
const EditEventPage = lazy(() => import('./modules/Events/Edit/EditEvent'));

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/events", element: <EventsPage /> },
    { path: "/dashboard", element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
    { path: "/create-event", element: <ProtectedRoute><CreateEventPage /></ProtectedRoute> },
    { path: "/edit-event/:id", element: <ProtectedRoute><EditEventPage /></ProtectedRoute> }
  ]);

  return (
    <AuthProvider>
      <EventProvider>
        <div className="App">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Navbar />
            <main>
              <RouterProvider router={router} />
            </main>
          </Suspense>
        </div>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;