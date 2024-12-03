<script lang="ts">
  import WelcomeCard from '$lib/features/dashboard/components/welcome-card.svelte';

  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
</script>

<WelcomeCard name={data.name} />

{#await data.cycles}
  Loading Cycles...
{:then cycles}
  <pre>{JSON.stringify(cycles, null, 2)}</pre>
{:catch error}
  <p>error loading comments: {error.message}</p>
{/await}
