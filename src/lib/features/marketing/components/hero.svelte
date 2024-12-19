<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as m from '$lib/paraglide/messages';
</script>

<section
  id="hero"
  class="flex min-h-screen flex-col items-center justify-center gap-8 text-balance bg-[radial-gradient(hsl(var(--secondary)),hsl(var(--primary)),hsl(var(--background))_60%)] px-4 text-center"
>
  <h1 class="mb-6 py-4 font-extrabold ~/lg:~text-4xl/6xl">
    {m.marketing_hero_title()}
  </h1>
  <p class="mx-auto mb-8 max-w-3xl ~/lg:~text-xl/2xl">
    {m.marketing_hero_subtitle()}
  </p>
  <Button class="rounded-full px-8 py-6 text-lg ">
    {m.marketing_hero_cta()}
  </Button>
</section>
