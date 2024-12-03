<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import * as m from '$lib/paraglide/messages';

  const reasons = [
    {
      description: m.marketing_why_with_us_reason_0_description(),
      title: m.marketing_why_with_us_reason_0_title(),
    },
    {
      description: m.marketing_why_with_us_reason_1_description(),
      title: m.marketing_why_with_us_reason_1_title(),
    },
    {
      description: m.marketing_why_with_us_reason_2_description(),
      title: m.marketing_why_with_us_reason_2_title(),
    },
  ];
</script>

<section class="container py-16">
  <h2 class="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
    {m.marketing_why_with_us_title()}
  </h2>
  <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
    {#each reasons as feature}
      <Card.Root class="text-center">
        <Card.Header>
          <Card.Title class="text-xl font-semibold text-primary ">
            {feature.title}
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <p class="text-secondary-foreground">{feature.description}</p>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
</section>
