<script lang="ts">
  import '../app.css';

  import { ParaglideJS } from '@inlang/paraglide-sveltekit';

  import { i18n } from '$lib/i18n';

  let { children } = $props();
</script>

<main class="h-dvh antialiased">
  <ParaglideJS {i18n}>
    {@render children()}
  </ParaglideJS>
</main>
