import { PricingCards } from '@/components/subscription/pricing-cards';

export function Subscription() {
  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the perfect plan for your hashtag needs
        </p>
      </div>

      <PricingCards />
    </div>
  );
}