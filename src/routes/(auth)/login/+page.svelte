<script lang="ts">
  import Separator from '$lib/components/separator.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';
  import LoginForm from '$lib/features/auth/components/login-form.svelte';

  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="text-2xl">Login</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    <LoginForm form={data.form} />
    <Separator>or</Separator>
    <Button href="/login/google">Login with Google</Button>
  </Card.Content>
</Card.Root>
