import { useState, useEffect } from "react";
import { CheckoutForm } from "./checkout-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  clientSecret: string;
  onSuccess?: () => void;
}

const stripePromise = loadStripe("your-publishable-key-here");

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  clientSecret,
  onSuccess,
}: PaymentModalProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (clientSecret) {
      setIsReady(true);
    }
  }, [clientSecret]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Enter your card details to complete the purchase
          </DialogDescription>
        </DialogHeader>

        {!isReady ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} onSuccess={onSuccess} />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
