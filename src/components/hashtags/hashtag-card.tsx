import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Hashtag } from '@/types/hashtag';

interface HashtagCardProps {
  hashtag: Hashtag;
  isSelected: boolean;
  onSelect: () => void;
  isHighestEngagement?: boolean;
}

export function HashtagCard({ 
  hashtag, 
  isSelected, 
  onSelect,
  isHighestEngagement 
}: HashtagCardProps) {
  if (!hashtag?.tag) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{hashtag.tag ? `#${hashtag.tag}` : ''}</span>
          {isHighestEngagement && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Highest Engagement</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Engagement: {hashtag.engagementRate}/10</span>
          <span>{hashtag.dailyUsage.toLocaleString()} posts/day</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {hashtag.relatedTopics.map((topic, i) => (
            <Badge key={`${topic}-${i}`} variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Best times: {hashtag.bestPostingTimes.join(', ')}
        </div>
        <Button
          className="w-full"
          variant={isSelected ? "secondary" : "default"}
          onClick={onSelect}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
}