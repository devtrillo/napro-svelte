<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { User } from '$lib/server/db/schema';

  let { user }: { user: User } = $props();
</script>

<header class="sticky top-0 z-10 mb-5 flex w-full bg-background/95 py-2 shadow-xl">
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
            <DropdownMenu.Item>
              <a href="/logout" class="w-full bg-destructive">profile</a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="/logout" class="w-full bg-destructive">settings</a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="/logout" class="w-full">Log out</a>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  </div>
</header>
