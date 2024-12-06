<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone, today } from '@internationalized/date';
  import { CalendarIcon } from 'lucide-svelte';

  import * as Popover from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';

  import { buttonVariants } from './ui/button';
  import * as Calendar from './ui/calendar';

  const {
    initialDate,
  }: {
    initialDate: DateValue;
  } = $props();

  let contentRef = $state<HTMLElement | null>(null);
  const df = new DateFormatter('en-US', {
    dateStyle: 'long',
  });
</script>

<Popover.Root>
  <Popover.Trigger
    class={cn(
      buttonVariants({
        class: 'w-[280px] justify-start text-left font-normal',
        variant: 'outline',
      }),
    )}
  >
    <CalendarIcon />
    {df.format(initialDate.toDate(getLocalTimeZone()))}
  </Popover.Trigger>
  <Popover.Content bind:ref={contentRef} class="w-auto p-0">
    <Calendar.Root
      maxValue={today(getLocalTimeZone())}
      type="single"
      value={today(getLocalTimeZone())}
    />
  </Popover.Content>
</Popover.Root>
