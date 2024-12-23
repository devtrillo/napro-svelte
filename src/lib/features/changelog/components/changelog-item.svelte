<script lang="ts">
  import type { Dayjs } from 'dayjs';
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';

  import { Badge } from '$lib/components/ui/badge';
  dayjs.extend(localizedFormat);

  type Props = {
    date: Dayjs;
    version: string;
    title: string;
    description: string;
    changes: string[];
  };

  let { version, date, title, description, changes }: Props = $props();
</script>

<div class="relative flex flex-col gap-5 md:flex-row md:gap-20">
  <div class="top-28 flex h-min shrink-0 items-center gap-5 md:sticky">
    <Badge variant="secondary">Version: {version}</Badge>
    <span class="text-xs font-medium text-muted-foreground">{date.format('LL')}</span>
  </div>
  <div>
    <h2 class="mb-4 text-lg font-semibold md:text-2xl md:leading-5">
      {title}
    </h2>
    <p class="text-muted-foreground md:text-lg">
      {description}
    </p>
    <ul class="ml-4 mt-5 space-y-2 text-muted-foreground md:text-lg">
      {#each changes as change}
        <li class="list-disc">{change}</li>
      {/each}
    </ul>
  </div>
</div>
