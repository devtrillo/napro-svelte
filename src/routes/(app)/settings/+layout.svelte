<script lang="ts">
  import type { Snippet } from 'svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import * as m from '$lib/paraglide/messages';
  import { capitalize, cn } from '$lib/utils';

  let { children }: { children: Snippet } = $props();
  const sections = [
    m.settings_section_notification(),
    m.settings_section_display(),
    m.settings_section_privacy(),
    m.settings_section_payment(),
  ];
  $effect(() => {
    if ($page.url.pathname === '/settings') goto('/settings/notifications');
  });
</script>

<div class="container relative flex gap-x-2 py-8">
  <div class="sticky top-0 hidden md:block">
    <nav class="flex flex-col justify-center gap-4">
      {#each sections as section}
        <a
          href={`/settings/${section}`}
          class={cn(!!($page.url.pathname === `/settings/${section}`) && ['font-bold '])}
        >
          {capitalize(section)}
        </a>
      {/each}
    </nav>
  </div>
  <div class="block w-full md:hidden">
    <nav class="flex justify-center gap-4 bg-green-200">
      {#each sections as section}
        <a
          href={`/settings/${section}`}
          class={cn(!!($page.url.pathname === `/settings/${section}`) && ['font-bold '])}
        >
          {capitalize(section)}
        </a>
      {/each}
    </nav>
  </div>
  <div class="flex-1">
    {@render children()}
  </div>
</div>
