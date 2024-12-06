<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<main class="container flex h-full items-center justify-center">
  {@render children()}
</main>
