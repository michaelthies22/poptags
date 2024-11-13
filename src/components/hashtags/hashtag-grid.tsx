import { Hashtag } from '@/types/hashtag';
import { HashtagCard } from './hashtag-card';

interface HashtagGridProps {
  hashtags: Hashtag[];
  isLoading: boolean;
  query: string;
  selectedHashtags: Hashtag[];
  onSelect: (hashtag: Hashtag) => void;
}

export function HashtagGrid({
  hashtags,
  isLoading,
  query,
  selectedHashtags,
  onSelect,
}: HashtagGridProps) {
  // Find the hashtag with the highest engagement rate
  const highestEngagement = hashtags.length > 0 
    ? Math.max(...hashtags.map(h => h.engagementRate))
    : 0;

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="animate-pulse rounded-lg border bg-card p-6"
          >
            <div className="h-8 w-3/4 rounded bg-muted" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hashtags.length === 0 && query) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No hashtags found for "{query}"
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hashtags.map((hashtag) => (
        <HashtagCard
          key={hashtag.tag}
          hashtag={hashtag}
          isSelected={selectedHashtags.some((h) => h.tag === hashtag.tag)}
          onSelect={() => onSelect(hashtag)}
          isHighestEngagement={hashtag.engagementRate === highestEngagement}
        />
      ))}
    </div>
  );
}