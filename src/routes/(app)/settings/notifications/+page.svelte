<script lang="ts">
  import type { PageData } from './$types';
  import NotificationsForm from './notifications-form.svelte';

  let { data }: { data: PageData } = $props();
</script>

<NotificationsForm />
