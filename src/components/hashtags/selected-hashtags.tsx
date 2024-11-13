import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Copy, Hash, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Hashtag } from '@/types/hashtag';

interface SelectedHashtagsProps {
  selectedHashtags: Hashtag[];
  onRemove: (tag: string) => void;
}

export function SelectedHashtags({
  selectedHashtags,
  onRemove,
}: SelectedHashtagsProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    const tags = selectedHashtags
      .filter(h => h?.tag)
      .map(h => `#${h.tag}`)
      .join(' ');
    navigator.clipboard.writeText(tags);
    toast({
      description: 'Copied hashtags to clipboard!',
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Hash className="h-6 w-6" />
          {selectedHashtags.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              {selectedHashtags.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Selected Hashtags</SheetTitle>
          <SheetDescription>
            Manage your selected hashtags collection
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {selectedHashtags.length} hashtags selected
            </span>
            <Button
              onClick={copyToClipboard}
              disabled={selectedHashtags.length === 0}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy All
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            <div className="space-y-2">
              {selectedHashtags.map((hashtag) => (
                hashtag?.tag && (
                  <div
                    key={hashtag.tag}
                    className="flex items-center justify-between p-2 rounded-lg border bg-card"
                  >
                    <span>#{hashtag.tag}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(hashtag.tag)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )
              ))}
              {selectedHashtags.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No hashtags selected yet
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}