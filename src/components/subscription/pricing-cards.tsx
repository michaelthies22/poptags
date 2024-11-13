import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SUBSCRIPTION_PLANS } from '@/types/subscription';
import { useAuth } from '@/contexts/auth-context';
import { useSubscription } from '@/hooks/use-subscription';
import { createCheckoutSession } from '@/lib/stripe';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export function PricingCards() {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(planId);

    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) throw new Error('Invalid plan selected');

      await createCheckoutSession(
        user.uid,
        plan,
        `${window.location.origin}/subscription`
      );
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to process subscription',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {SUBSCRIPTION_PLANS.map((plan) => (
        <Card key={plan.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-4">
              <span className="text-3xl font-bold">
                ${plan.price}
              </span>
              {plan.price > 0 && (
                <span className="text-muted-foreground">/month</span>
              )}
            </div>
            <ul className="space-y-2 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={plan.highlighted ? "default" : "outline"}
              disabled={plan.tier === subscription?.tier || loading === plan.id}
              onClick={() => handleSubscribe(plan.id)}
            >
              {loading === plan.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : plan.tier === subscription?.tier ? (
                'Current Plan'
              ) : (
                'Subscribe'
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}