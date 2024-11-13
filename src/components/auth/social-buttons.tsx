import { Button } from '@/components/ui/button';
import { Github, Twitter } from 'lucide-react';

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full">
        <Github className="mr-2 h-4 w-4" />
        Github
      </Button>
      <Button variant="outline" className="w-full">
        <Twitter className="mr-2 h-4 w-4" />
        Twitter
      </Button>
    </div>
  );
}