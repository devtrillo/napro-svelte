<script lang="ts">
  import { CheckCircle2Icon } from 'lucide-svelte';

  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Switch } from '$lib/components/ui/switch';

  let isAnnual = $state(true);
  const plans = [
    {
      cta: 'Get Started',
      features: ['Basic Creighton charting', '30-day data history', 'Email support'],
      monthlyPrice: 9.99,
      title: 'Basic',
    },
    {
      cta: 'Go Pro',
      features: [
        'Advanced Creighton charting',
        'Unlimited data history',
        'Priority email support',
        'Fertility insights',
      ],
      monthlyPrice: 19.99,
      title: 'Pro',
    },
    {
      cta: 'Get Premium',
      features: [
        'Everything in Pro',
        'Personalized fertility analysis',
        '1-on-1 consultation',
        'API access',
      ],
      monthlyPrice: 29.99,
      title: 'Premium',
    },
  ];

  const calculatePrice = (monthlyPrice: number) => {
    const annualPrice = monthlyPrice * 12 * 0.9; // 10% discount
    return isAnnual ? (annualPrice / 12).toFixed(2) : monthlyPrice.toFixed(2);
  };
</script>

<section class="container py-16">
  <h2 class="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
    Choose Your Plan
  </h2>
  <div class="mb-8 flex items-center justify-center space-x-4">
    <span class="text-gray-600 dark:text-gray-300">Monthly</span>
    <Switch bind:checked={isAnnual} class="data-[state=checked]:bg-purple-600" />
    <span class="text-gray-600 dark:text-gray-300">Annual (Save 10%)</span>
  </div>
  <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
    {#each plans as plan, index}
      <Card.Root class={`flex flex-col ${index === 1 ? 'ring-2 ring-primary' : ''} relative`}>
        <Card.Header class={isAnnual ? 'pt-8' : ''}>
          <Card.Title class="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {plan.title}
          </Card.Title>
          <Card.Description class="text-4xl font-bold text-gray-800 dark:text-white">
            ${calculatePrice(plan.monthlyPrice)}
            <span class="text-base font-normal text-gray-600 dark:text-gray-300">
              /{isAnnual ? 'mo' : 'month'}
            </span>
            {#if isAnnual}
              <span class="block text-sm font-normal text-gray-600 dark:text-gray-300">
                billed annually
              </span>
            {/if}
          </Card.Description>
        </Card.Header>
        <Card.Content class="flex-grow">
          <ul class="space-y-2">
            {#each plan.features as feature}
              <li class="flex items-center">
                <CheckCircle2Icon class="mr-2 size-5 text-green-500" />
                <span class="text-gray-600 dark:text-gray-300">{feature}</span>
              </li>
            {/each}
          </ul>
        </Card.Content>
        <Card.Footer>
          <Button class="w-full bg-purple-600 text-white hover:bg-purple-700">{plan.cta}</Button>
        </Card.Footer>
      </Card.Root>
    {/each}
  </div>
</section>
