import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

interface SearchLimitAlertProps {
  isOpen: boolean;
  onClose: () => void;
  searchesUsed: number;
  searchLimit: number;
}

export function SearchLimitAlert({
  isOpen,
  onClose,
  searchesUsed,
  searchLimit,
}: SearchLimitAlertProps) {
  const navigate = useNavigate();

  const handleViewPlans = () => {
    onClose();
    navigate('/subscription');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Search Limit Reached</AlertDialogTitle>
          <AlertDialogDescription>
            You've used {searchesUsed} out of {searchLimit} searches. Upgrade your plan to continue searching for trending hashtags.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleViewPlans}>
            View Plans
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}