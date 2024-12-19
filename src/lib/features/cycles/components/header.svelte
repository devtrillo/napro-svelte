<script lang="ts">
  import { page } from '$app/stores';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

  let { user }: { user: any } = $props();
</script>

<header class=" mb-5 flex w-full bg-background/95 py-2 shadow-xl">
  <div class="container mx-auto flex items-center justify-between px-4 py-3">
    <a href="/" class="text-2xl font-bold text-primary"> Napro </a>
    <nav>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar.Root>
            <Avatar.Image src={user.picture} alt={user.name} />
            <Avatar.Fallback>{user.name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
          </Avatar.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
            <DropdownMenu.Separator />
            {#if !$page.url.pathname.startsWith('/settings')}
              <DropdownMenu.Item>
                <a href="/settings" class="w-full">Settings</a>
              </DropdownMenu.Item>
            {/if}
            {#if !$page.url.pathname.startsWith('/cycles')}
              <DropdownMenu.Item>
                <a href="/cycles" class="w-full bg-destructive">Cycles</a>
              </DropdownMenu.Item>
            {/if}
            <DropdownMenu.Item>
              <a href="/logout" class="w-full">Log out</a>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  </div>
</header>
