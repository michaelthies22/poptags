import { useCallback, useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HashtagGrid } from '@/components/hashtags/hashtag-grid';
import { SelectedHashtags } from '@/components/hashtags/selected-hashtags';
import { useToast } from '@/components/ui/use-toast';
import { getHashtagSuggestions } from '@/lib/openai';
import { useSubscription } from '@/hooks/use-subscription';
import { SearchLimitAlert } from '@/components/subscription/search-limit-alert';
import type { Hashtag } from '@/types/hashtag';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function Hashtags() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<Hashtag[]>([]);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const { subscription, incrementUsage, resetUsage } = useSubscription();
  const { toast } = useToast();

  const searchHashtags = useCallback(async () => {
    if (!query.trim()) {
      toast({
        description: 'Please enter a search term',
      });
      return;
    }

    if (subscription && subscription.searchesUsed >= subscription.searchLimit) {
      setShowLimitAlert(true);
      return;
    }

    setIsLoading(true);
    try {
      const result = await getHashtagSuggestions(query);
      setHashtags(result.hashtags);
      incrementUsage();
    } catch (error) {
      console.error('Search error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch hashtag suggestions';
      
      if (errorMessage.includes('API key is not configured')) {
        toast({
          title: 'Configuration Required',
          description: 'OpenAI API key is not configured. Please contact support.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
      setHashtags([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, subscription, incrementUsage, toast]);

  const handleSelect = (hashtag: Hashtag) => {
    if (!selectedHashtags.find(h => h.tag === hashtag.tag)) {
      setSelectedHashtags(prev => [...prev, hashtag]);
      toast({
        description: `Added #${hashtag.tag} to selection`,
      });
    }
  };

  const handleRemove = (tag: string) => {
    setSelectedHashtags(prev => prev.filter(h => h.tag !== tag));
    toast({
      description: `Removed #${tag} from selection`,
    });
  };

  const handleReset = () => {
    resetUsage();
    toast({
      description: 'Search counter has been reset',
    });
  };

  const isApiConfigured = import.meta.env.VITE_OPENAI_API_KEY;

  return (
    <div className="container mx-auto p-6">
      {!isApiConfigured && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            OpenAI API key is not configured. Some features may be limited.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Hashtag Generator</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Searches used: {subscription?.searchesUsed || 0} / {subscription?.searchLimit || 3}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Counter
            </Button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hashtags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchHashtags();
                }
              }}
              className="pl-9"
            />
          </div>
          <Button onClick={searchHashtags} disabled={isLoading || !isApiConfigured}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      <HashtagGrid
        hashtags={hashtags}
        isLoading={isLoading}
        query={query}
        selectedHashtags={selectedHashtags}
        onSelect={handleSelect}
      />

      <SelectedHashtags
        selectedHashtags={selectedHashtags}
        onRemove={handleRemove}
      />

      <SearchLimitAlert
        isOpen={showLimitAlert}
        onClose={() => setShowLimitAlert(false)}
        searchesUsed={subscription?.searchesUsed || 0}
        searchLimit={subscription?.searchLimit || 3}
      />
    </div>
  );
}