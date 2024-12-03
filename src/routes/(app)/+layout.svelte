<script lang="ts">
  import type { Snippet } from 'svelte';

  import Header from '$lib/features/dashboard/components/header.svelte';

  import type { LayoutData } from './$types';

  const { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<main class="grid min-h-dvh grid-rows-[auto_1fr_auto] selection:bg-[hsl(320,65%,52%,20%)]">
  <Header user={data.user} />
  <div class="container">
    {@render children()}
  </div>
</main>
