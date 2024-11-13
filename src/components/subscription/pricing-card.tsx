import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SubscriptionPlan } from '@/types/subscription';

interface PricingCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  onSubscribe: (planId: string) => void;
}

export function PricingCard({ plan, isCurrentPlan, onSubscribe }: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col",
      plan.highlighted && "border-primary shadow-lg scale-105"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {plan.name}
          {plan.highlighted && (
            <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-4xl font-bold">${plan.price}</span>
          {plan.price > 0 && (
            <span className="text-muted-foreground ml-2">/month</span>
          )}
        </div>
        <ul className="space-y-3 text-sm">
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
          size="lg"
          variant={plan.highlighted ? "default" : "outline"}
          disabled={isCurrentPlan}
          onClick={() => onSubscribe(plan.id)}
        >
          {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
        </Button>
      </CardFooter>
    </Card>
  );
}