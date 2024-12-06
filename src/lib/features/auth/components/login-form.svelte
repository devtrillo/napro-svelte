<script lang="ts">
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as m from '$lib/paraglide/messages.js';

  import { type LoginSchema, loginSchema } from '../server/schema';

  let props: { form: SuperValidated<Infer<LoginSchema>> } = $props();

  const form = superForm(props.form, {
    validators: zodClient(loginSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
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
  <Form.Button class="w-full">{m.login()}</Form.Button>
</form>
