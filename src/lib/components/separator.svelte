<script lang="ts">
  import type { Snippet } from 'svelte';

  import { cn } from '$lib/utils';

  const { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn('my-2 flex items-center gap-4', className)}>
  {#if children}
    <div class="w-full border-t border-border"></div>
    <div class="text-muted-foreground">{@render children()}</div>
    <div class="w-full border-t border-border"></div>
  {:else}
    <div class="w-full border-t border-border"></div>
  {/if}
</div>
