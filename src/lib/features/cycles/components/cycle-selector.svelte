<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import { EyeIcon } from 'lucide-svelte';

  import { buttonVariants } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card/index.js';

  import type { loadCycles } from '../server/load';

  dayjs.extend(localizedFormat);

  const { cycle }: { cycle: Awaited<ReturnType<typeof loadCycles>>[number] } = $props();
  let current = $derived(!cycle.endDate);
</script>

<Card.Root class="bg-white dark:bg-gray-800">
  <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
    <Card.Title class="text-sm font-medium text-gray-900 dark:text-white">
      Cycle {cycle.id}
    </Card.Title>
    {#if current}
      <div class="text-sm font-medium text-gray-500 dark:text-gray-400">Current Cycle</div>
    {:else}
      <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
        Score: {cycle.score}
      </div>
    {/if}
  </Card.Header>
  <Card.Content>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</p>
        <p class="text-lg font-semibold text-gray-900 dark:text-white">
          {dayjs(cycle.startDate).format('LL')}
        </p>
      </div>
      <div>
        {#if !current}
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">
            {cycle.endDate || 'Current'}
          </p>
        {/if}
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Peak Plus Phase (PPP)</p>
        <p class="text-lg font-semibold text-gray-900 dark:text-white">{cycle.ppp || 0} days</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Cycle Length</p>
        <p class="text-lg font-semibold text-gray-900 dark:text-white">{cycle.days} days</p>
      </div>
    </div>
  </Card.Content>
  <Card.Footer class="flex items-center justify-end">
    <a class={buttonVariants({})} href={`/cycles/view/${cycle.id}`}>
      <EyeIcon class="size-4" />
      View Cycle
    </a>
  </Card.Footer>
</Card.Root>
