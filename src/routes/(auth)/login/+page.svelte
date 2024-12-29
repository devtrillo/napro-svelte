<script lang="ts">
  import { GlobeIcon } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { loginSchema } from '$lib/features/auth/server/schema';
  import * as m from '$lib/paraglide/messages.js';

  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const form = superForm(data.form, {
    validators: zodClient(loginSchema),
  });

  const { form: formData, enhance } = form;
</script>

<section class="pb-32">
  <div class="container">
    <div class="flex flex-col gap-4">
      <div class="relative flex flex-col items-center overflow-hidden pb-6 pt-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          class="absolute top-10 -z-10 h-full w-[1250px] [mask-image:radial-gradient(circle,red,transparent,transparent,transparent)]"
        >
          <defs>
            <pattern id="innerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                class="stroke-muted-foreground/70"
                stroke-width="0.5"
              />
            </pattern>
            <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="url(#innerGrid)" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#grid)" />
        </svg>
        <img
          src="https://shadcnblocks.com/images/block/block-1.svg"
          alt="logo"
          class="mb-7 h-10 w-auto"
        />
        <p class="mb-2 text-2xl font-bold">Log in to your account</p>
        <p class="text-muted-foreground">Welcome back! Please enter your details.</p>
      </div>
      <div class="z-10 mx-auto w-full max-w-sm rounded-md bg-background p-6 shadow">
        <form method="post" use:enhance class="grid gap-4">
          <Form.Field {form} name="email">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>{m.email()}</Form.Label>
                <Input {...props} type="email" bind:value={$formData.email} />
              {/snippet}
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>
          <Form.Field {form} name="password">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>{m.password()}</Form.Label>
                <Input {...props} type="password" bind:value={$formData.password} />
              {/snippet}
            </Form.Control>

            <Form.FieldErrors />
          </Form.Field>

          <a href="/forgot-password" class="text-end text-sm font-medium text-primary">
            Forgot password
          </a>
          <Button type="submit" class="mt-2 w-full">Sign in</Button>
          <Button variant="outline" class="w-full">
            <GlobeIcon class="mr-2 size-5" />
            Sign up with Google
          </Button>
        </form>
      </div>
      <div class="mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
        <p>Don&apos;t have an account?</p>
        <a href="/sign-up" class="font-medium text-primary"> Sign up </a>
      </div>
    </div>
  </div>
</section>
