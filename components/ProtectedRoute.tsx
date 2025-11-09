'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If user is not logged in, redirect to signin
      if (!user) {
        router.push('/auth/signin');
        return;
      }

      // If adminOnly is true and user is not admin, redirect to home
      if (adminOnly && !user.isAdmin) {
        router.push('/');
        return;
      }
    }
  }, [user, loading, adminOnly, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If user doesn't meet criteria, don't render children
  if (!user || (adminOnly && !user.isAdmin)) {
    return null;
  }

  return <>{children}</>;
}