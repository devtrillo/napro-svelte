<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';

  let { name }: { name: string } = $props();
</script>

<Card.Root class="mb-6">
  <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
    <Card.Title>Welcome, {name}</Card.Title>
    <a class={buttonVariants({ variant: 'default' })} href="/record-day"> Record Today </a>
  </Card.Header>
  <Card.Content>
    <p>How are you feeling today? We hope you're having a great day!</p>
    <p>Here's an overview of your Creighton menstrual cycles.</p>
  </Card.Content>
</Card.Root>
