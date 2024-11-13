import { Copy, ListChecks, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import type { Hashtag } from "@/types/hashtag";

interface SelectedHashtagsSheetProps {
  selectedHashtags: Hashtag[];
  onRemove: (tag: string) => void;
  onClear: () => void;
}

export function SelectedHashtagsSheet({
  selectedHashtags,
  onRemove,
  onClear,
}: SelectedHashtagsSheetProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    const tags = selectedHashtags.map((h) => `#${h.tag}`).join(" ");
    navigator.clipboard.writeText(tags).then(
      () => {
        toast({
          description: "Copied hashtags to clipboard!",
        });
      },
      () => {
        toast({
          title: "Error",
          description: "Failed to copy hashtags",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <ListChecks className="h-6 w-6" />
          {selectedHashtags.length > 0 && (
            <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#98f6e4] text-black text-sm font-medium flex items-center justify-center shadow-sm">
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
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                disabled={selectedHashtags.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button
                size="sm"
                onClick={copyToClipboard}
                disabled={selectedHashtags.length === 0}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            <div className="space-y-2">
              {selectedHashtags.map((hashtag) => (
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
