<script lang="ts">
  import dayjs from 'dayjs';
  import { CalendarIcon } from 'lucide-svelte';

  import { buttonVariants } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card/index.js';

  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<main class="container space-y-6">
  <Card.Root>
    <Card.Header>
      <Card.Title class="text-xl font-semibold ">
        Cycle {data.cycle?.id}
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</p>
          <p class="text-lg font-semibold">{data.cycle.startDate}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</p>
          <p class="text-lg font-semibold">{data.cycle.endDate || 'Current'}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Peak Plus Phase (PPP)</p>
          <p class="text-lg font-semibold">{data.cycle.ppp} days</p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Cycle Length</p>
          <p class="text-lg font-semibold">
            {data.cycle?.days.length} days
          </p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Cycle Score</p>
          <p class="text-lg font-semibold">{data.cycle.score || 'current'}</p>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
  <a href={`/cycles/view/${data.cycle.id}/record`} class={buttonVariants()}>
    <CalendarIcon /> Register Today
  </a>
  <Card.Root class="bg-white dark:bg-gray-800">
    <Card.Header>
      <Card.Title class="text-xl font-semibold text-gray-900 dark:text-white">
        Daily Scores
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {#each data.cycle.days as day}
          <a
            href={`/cycles/view/${data.cycle.id}/record/${dayjs(day.date).format('YYYY-MM-DD')}`}
            class="flex items-center space-x-2 rounded-md border p-2 hover:shadow-md dark:border-gray-700"
          >
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {dayjs(day.date).format('MMM-DD')}
              </p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">{day}</p>
            </div>
          </a>
        {/each}
      </div>
    </Card.Content>
  </Card.Root>
</main>
