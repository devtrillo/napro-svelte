<script lang="ts">
  import { BananaIcon } from 'lucide-svelte';

  import * as m from '$lib/paraglide/messages';
</script>

<span class="flex flex-shrink-0 items-center gap-2 text-lg font-semibold">
  <BananaIcon class="size-8" />
  <span>{m.name()}</span>
</span>
