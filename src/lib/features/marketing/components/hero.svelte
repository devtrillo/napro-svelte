<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as m from '$lib/paraglide/messages';
</script>

<section
  id="hero"
  class="flex min-h-screen flex-col items-center justify-center gap-8 text-balance bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] px-4 text-center"
>
  <h1 class="mb-6 text-5xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
    {m.marketing_hero_title()}
  </h1>
  <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
    {m.marketing_hero_subtitle()}
  </p>
  <Button class="rounded-full from-primary to-secondary px-8 py-6 text-lg text-white">
    {m.marketing_hero_cta()}
  </Button>
</section>
