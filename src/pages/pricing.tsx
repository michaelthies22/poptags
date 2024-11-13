import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Basic',
    id: 'basic',
    href: '#',
    price: { monthly: '$9', annually: '$90' },
    description: 'Essential features for social media enthusiasts',
    features: [
      '100 searches per month',
      'Basic analytics',
      'Top 10 trending hashtags',
      'Export to clipboard',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    id: 'pro',
    href: '#',
    price: { monthly: '$19', annually: '$190' },
    description: 'Advanced features for content creators',
    features: [
      'Unlimited searches',
      'Advanced analytics',
      'Real-time trending data',
      'Custom categories',
      'Engagement predictions',
      'Priority support',
      'API access',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    href: '#',
    price: { monthly: '$49', annually: '$490' },
    description: 'Custom solutions for large teams',
    features: [
      'Everything in Pro',
      'Custom API limits',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced reporting',
      'SSO authentication',
      '24/7 phone support',
    ],
  },
];

const faqs = [
  {
    question: "What happens when I reach my search limit?",
    answer: "When you reach your monthly search limit, you'll be prompted to upgrade your plan to continue searching. Your selected hashtags and previous searches remain accessible even if you've reached the limit."
  },
  {
    question: "Can I switch plans or cancel anytime?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle. There are no long-term commitments required."
  },
  {
    question: "How accurate are the hashtag suggestions?",
    answer: "Our hashtag suggestions are powered by advanced AI and real-time trend analysis, ensuring high relevancy and engagement potential. We update our data regularly to maintain accuracy."
  },
  {
    question: "Do unused searches roll over to the next month?",
    answer: "No, searches don't roll over. Your search quota resets at the beginning of each billing cycle, giving you a fresh start every month."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via invoice."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! Our Basic plan includes 3 free searches per month, allowing you to test our service before committing to a paid plan."
  }
];

export function Pricing() {
  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the perfect plan for your hashtag needs
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={cn(
              'flex flex-col',
              tier.featured && 'border-primary shadow-lg scale-105'
            )}
          >
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price.monthly}
                </span>
                <span className="text-sm font-semibold leading-6 text-muted-foreground">
                  /month
                </span>
              </div>
              <div className="space-y-2">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-x-2 text-sm">
                    <Check className="h-4 w-4 flex-none text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-6">
              <Button
                className={cn('w-full', tier.featured && 'bg-primary')}
                variant={tier.featured ? 'default' : 'outline'}
              >
                Get started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}