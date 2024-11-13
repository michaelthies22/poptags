import { useState } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { HeroSection } from '@/components/auth/hero-section';
import { ThemeToggle } from '@/components/theme-toggle';

export function AuthLayout() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <ThemeToggle />
      <div className="relative flex-col hidden h-full p-10 text-white dark:border-r lg:flex bg-muted">
        <HeroSection />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? 'Enter your email below to create your account'
                : 'Enter your email to sign in to your account'}
            </p>
          </div>
          <AuthForm isSignUp={isSignUp} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="underline underline-offset-4 hover:text-primary"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}