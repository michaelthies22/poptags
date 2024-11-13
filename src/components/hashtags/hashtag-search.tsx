import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HashtagSearchProps {
  query: string;
  onChange: (value: string) => void;
}

export function HashtagSearch({ query, onChange }: HashtagSearchProps) {
  return (
    <div className="relative flex-1 max-w-xl">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search hashtags..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}