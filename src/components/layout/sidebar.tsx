import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Hash, ChevronLeft, ChevronRight, X, CreditCard, User, Settings } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/user-nav';
import { Separator } from '@/components/ui/separator';

const navigation = [
  { name: 'Hashtags', href: '/', icon: Hash },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Subscription', href: '/subscription', icon: CreditCard },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mobile: boolean;
}

export function Sidebar({ open, setOpen, mobile }: SidebarProps) {
  return (
    <>
      {mobile && open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 z-50 flex flex-col bg-background border-r',
          mobile ? 'left-0 w-64' : 'w-64',
          mobile && !open && 'translate-x-[-100%]',
          !mobile && !open && 'w-20',
          'transition-all duration-300'
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-4">
          <span className={cn('font-semibold', !open && !mobile && 'hidden')}>
            Hashtag Generator
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className={cn(mobile ? 'block' : 'hidden')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => mobile && setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
                  !open && !mobile && 'justify-center'
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className={cn('truncate', !open && !mobile && 'hidden')}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 space-y-4">
          <Separator />
          <div className={cn(
            'flex items-center gap-4',
            !open && !mobile && 'flex-col'
          )}>
            <ModeToggle />
            <UserNav />
          </div>
          {!mobile && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}