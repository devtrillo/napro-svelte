<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Record Today's Cycle Data</Dialog.Title>
      <Dialog.Description>
        Enter your observations for today. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4"></div>
  </Dialog.Content>
</Dialog.Root>
