<script lang="ts">
  import '../app.css';

  import { ParaglideJS } from '@inlang/paraglide-sveltekit';

  import { Toaster } from '$lib/components/ui/sonner';
  import { i18n } from '$lib/i18n';

  let { children } = $props();
</script>

<main class="h-dvh antialiased">
  <ParaglideJS {i18n}>
    <Toaster />
    {@render children()}
  </ParaglideJS>
</main>
