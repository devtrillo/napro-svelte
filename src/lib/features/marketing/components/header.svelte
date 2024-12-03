<script lang="ts">
  import BrandLogo from '$lib/components/brand-logo.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as m from '$lib/paraglide/messages';
  const links = [
    {
      href: '/#features',
      name: m.marketing_features(),
    },
  ];
</script>

<header class="sticky top-0 z-10 flex w-full bg-background/95 py-6 shadow-xl">
  <nav class="container flex items-center gap-10 font-semibold">
    <a class="mr-auto" href="/">
      <BrandLogo />
    </a>

    {#each links as { href, name }}
      <a class="hidden text-lg sm:block" {href}>
        {name}
      </a>
    {/each}

    <Button href="/login">
      {m.login()}
    </Button>
  </nav>
</header>
