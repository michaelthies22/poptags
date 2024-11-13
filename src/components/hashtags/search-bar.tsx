import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface SearchBarProps {
  query: string;
  mode: 'relevant' | 'trending';
  onQueryChange: (query: string) => void;
  onModeChange: (mode: 'relevant' | 'trending') => void;
}

export function SearchBar({ query, mode, onQueryChange, onModeChange }: SearchBarProps) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search hashtags..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(value) => value && onModeChange(value as 'relevant' | 'trending')}
      >
        <ToggleGroupItem value="relevant">Relevant</ToggleGroupItem>
        <ToggleGroupItem value="trending">Trending</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}