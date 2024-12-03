<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import CyclePagination from '$lib/features/cycles/components/cycle-pagination.svelte';
  import CycleSelector from '$lib/features/cycles/components/cycle-selector.svelte';
  import WelcomeCard from '$lib/features/cycles/components/welcome-card.svelte';

  import type { PageServerData } from './$types';

  const { data }: { data: PageServerData } = $props();

  const pageSize = 10;

  let currentPage = $derived(Number($page.params.page) - 1);
</script>

<WelcomeCard name={data.parent.name} />

<div class="container">
  <form method="POST" class="mb-4 flex w-full justify-end">
    <Button type="submit">Create New Cycle</Button>
  </form>
  {#await data.cycles}
    Loading Cycles...
  {:then cycles}
    <section class=" grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
      {#each cycles as cycle}
        <CycleSelector {cycle} />
      {/each}
    </section>
  {:catch error}
    <p>error loading comments: {error.message}</p>
  {/await}

  {#await data.totalCycles then total}
    <CyclePagination {total} {pageSize} {currentPage} />
  {/await}
</div>
