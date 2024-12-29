<script lang="ts">
  import dayjs from 'dayjs';
  import { ZapIcon } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import ChangelogItem from '$lib/features/changelog/components/changelog-item.svelte';

  import type { PageData } from './$types';
  import { emailSchema } from './schema';

  let { data }: { data: PageData } = $props();

  const form = superForm(data.form, {
    validators: zodClient(emailSchema),
  });
  const { enhance, form: formData } = form;
</script>

<main class="container mt-20">
  <div class="text-center">
    <h1 class="mb-4 text-3xl font-semibold md:text-5xl">Changelog</h1>
    <p class="mb-6 text-muted-foreground md:text-lg">
      Get the latest updates and improvements to our platform.
    </p>

    <form class="mx-auto mb-9 flex w-full max-w-sm items-start space-x-2" method="POST" use:enhance>
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Input
              {...props}
              class="w-full space-y-0"
              placeholder="abc@example.com"
              type="email"
              bind:value={$formData.email}
            />
          {/snippet}
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <button
        class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        type="submit"
      >
        Subscribe
      </button>
    </form>

    <div class="mx-auto flex w-fit items-center rounded-lg border px-3 py-2.5 text-xs">
      <span class="text-muted-foreground">New features and improvements!</span>
      <a class="ml-2 flex items-center font-semibold hover:underline" href="/">
        v1.2.1
        <ZapIcon class="size-3.5" />
      </a>
    </div>
  </div>
  <ChangelogItem
    date={dayjs()}
    version="1.0.0"
    title="Initial release"
    description="This is the first release of the project."
    changes={['Added a new feature', 'Fixed a bug', 'Improved performance']}
  />
</main>
