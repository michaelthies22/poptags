import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/dashboard-layout';
import { AuthLayout } from './components/layout/auth-layout';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { PrivateRoute } from './components/auth/private-route';
import { useAuth } from './contexts/auth-context';

function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/auth/*" element={
            user ? <Navigate to="/" /> : <AuthLayout />
          } />
          <Route path="/*" element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          } />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;