import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';
import { Hashtags } from '@/pages/hashtags';
import { Profile } from '@/pages/profile';
import { Settings } from '@/pages/settings';
import { Subscription } from '@/pages/subscription';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} mobile={false} />
      </div>

      <div className="lg:hidden">
        <Sidebar open={mobileOpen} setOpen={setMobileOpen} mobile={true} />
      </div>

      <div className={`${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'} transition-all duration-300`}>
        <TopNav 
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className="p-4 md:p-8 pt-6">
          <div className="mx-auto max-w-7xl">
            <Routes>
              <Route path="/" element={<Hashtags />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/subscription" element={<Subscription />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}