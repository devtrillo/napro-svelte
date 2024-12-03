<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';

  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card/index.js';
  import type { Cycle } from '$lib/server/db/schema';

  dayjs.extend(localizedFormat);

  const { cycle }: { cycle: Cycle } = $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{dayjs(cycle.startDate).format('LL')}</Card.Title>
  </Card.Header>
  <Card.Content class="grid grid-cols-2">
    <p>End Date: {dayjs(cycle.endDate).format('LL')}</p>
    <p>PPP: {3}</p>
    <p>score: {10}</p></Card.Content
  >
  <Card.Footer class="grid grid-cols-2 gap-x-2">
    <Button variant="outline" class="bg-transparent">Share Cycle</Button>
    <Button href={`/cycles/view/${cycle.id}`}>View Cycle</Button>
  </Card.Footer>
</Card.Root>
