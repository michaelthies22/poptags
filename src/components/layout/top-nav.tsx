import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function TopNav({ mobileOpen, setMobileOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Hashtag Generator</span>
        </div>
      </div>
    </header>
  );
}