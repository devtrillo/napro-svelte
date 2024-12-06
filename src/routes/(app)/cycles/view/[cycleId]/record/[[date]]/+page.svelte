<script lang="ts">
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  import * as Form from '$lib/components/ui/form';
  import * as RadioGroup from '$lib/components/ui/radio-group';
  import * as Select from '$lib/components/ui/select';

  dayjs.extend(localizedFormat);

  import {
    DateFormatter,
    type DateValue,
    fromDate,
    getLocalTimeZone,
    today,
  } from '@internationalized/date';
  import { CalendarIcon } from 'lucide-svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import * as Card from '$lib/components/ui/card';
  import { Label } from '$lib/components/ui/label';
  import * as Popover from '$lib/components/ui/popover';
  import { Textarea } from '$lib/components/ui/textarea';
  import { cn } from '$lib/utils';

  import type { PageData } from './$types';
  import { insertObservationSchema } from './schema';

  let { data }: { data: PageData } = $props();

  let contentRef = $state<HTMLElement | null>(null);
  const df = new DateFormatter('en-US', {
    dateStyle: 'long',
  });
  const changeDate = async (newDate?: DateValue) => {
    const validDate = dayjs(newDate?.toDate(getLocalTimeZone()) || new Date());

    return await goto(
      `/cycles/view/${$page.data.cycle.id}/record/${validDate.format('YYYY-MM-DD')}`,
    );
  };

  const valueCalendar = $derived(
    $page.params.date
      ? fromDate(dayjs($page.params.date).toDate(), getLocalTimeZone())
      : today(getLocalTimeZone()),
  );

  const form = superForm(data.form, {
    taintedMessage: () => {
      return confirm("You haven't saved the form. Are you sure you want to leave?");
    },
    validators: zodClient(insertObservationSchema),
  });

  const { form: formData, enhance, submitting, allErrors } = form;
  $effect(() => {
    console.log($allErrors);
  });

  const flowTypes = {
    H: 'Heavy flow',
    L: 'Light flow',
    M: 'Moderate flow',
    VL: 'Very light flow',
    none: '',
  };
  const dischargeTypes = {
    '': 'None',
    B: 'Brown (or black) bleeding',
    C: 'Cloudy',
    CK: 'Cloudy/clear',
    G: 'Gummy',
    K: 'Clear',
    L: 'Lubricative',
    P: 'Pasty',
    R: 'Red',
    Y: 'Yellow',
  };
  const lubricationStatus = {
    '0': 'Dry',
    '10DL': 'Damp with lubrication',
    '10SL': 'Shiny with lubrication',
    '10W': 'Wet with lubrication',
    '2': 'Damp without lubrication',
    '2W': 'Wet without lubrication',
    '4': 'Shiny without lubrication',
  };
  const observationFrequency = {
    AD: 'All day',
    X1: 'Seen once',
    X2: 'Seen twice',
    X3: 'Seen three times',
  };
</script>

<Card.Root class="container max-w-xl">
  <Card.Header>
    <Card.Title>Daily Observation Record</Card.Title>
  </Card.Header>
  <Card.Content>
    <form method="POST" class="space-y-3" use:enhance>
      <Label>Observation Date</Label>
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
          {df.format(valueCalendar.toDate(getLocalTimeZone()))}
        </Popover.Trigger>
        <Popover.Content bind:ref={contentRef} class="w-auto p-0">
          <Calendar
            maxValue={today(getLocalTimeZone())}
            onValueChange={changeDate}
            type="single"
            value={valueCalendar}
          />
        </Popover.Content>
      </Popover.Root>

      <Form.Fieldset {form} name="flowType" class="space-y-3">
        <Form.Legend>Flow Type</Form.Legend>
        <RadioGroup.Root bind:value={$formData.flowType} class="grid grid-cols-2 gap-4" name="type">
          {#each Object.entries(flowTypes) as [value, label]}
            <Form.Control>
              {#snippet children({ props })}
                <div class="flex items-center space-x-2">
                  {#if value === 'none'}
                    <RadioGroup.Item {...props} value={''} id={value} />
                    <Label for={value}>None</Label>
                  {:else}
                    <RadioGroup.Item {...props} {value} id={value} />
                    <Label for={value}>{`${label} (${value})`}</Label>
                  {/if}
                </div>
              {/snippet}
            </Form.Control>
          {/each}
        </RadioGroup.Root>
        <Form.FieldErrors />
      </Form.Fieldset>

      <Form.Field {form} name="dischargeType">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Discharge type</Form.Label>
            <Select.Root type="single" bind:value={$formData.dischargeType} name={props.name}>
              <Select.Trigger {...props}>
                {$formData.dischargeType ? $formData.dischargeType : 'None'}
              </Select.Trigger>
              <Select.Content>
                {#each Object.entries(dischargeTypes) as [value, label]}
                  {#if value === ''}
                    <Select.Item {value}>{label}</Select.Item>
                  {:else}
                    <Select.Item {value}>{`${label} (${value})`}</Select.Item>
                  {/if}
                {/each}
              </Select.Content>
            </Select.Root>
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Fieldset {form} name="lubricationStatus" class="space-y-3">
        <Form.Legend>Lubrication Status</Form.Legend>
        <RadioGroup.Root
          bind:value={$formData.lubricationStatus}
          class="grid grid-cols-2 gap-4"
          name="type"
        >
          {#each Object.entries(lubricationStatus) as [value, label]}
            <Form.Control>
              {#snippet children({ props })}
                <div class="flex items-center space-x-2">
                  <RadioGroup.Item {...props} {value} id={value} />
                  <Label for={value}>{`${label} (${value})`}</Label>
                </div>
              {/snippet}
            </Form.Control>
          {/each}
        </RadioGroup.Root>
        <Form.FieldErrors />
      </Form.Fieldset>
      <Form.Fieldset {form} name="frequency" class="space-y-3">
        <Form.Legend>Observation Frequency</Form.Legend>
        <RadioGroup.Root
          bind:value={$formData.frequency}
          class="grid grid-cols-2 gap-4"
          name="type"
        >
          {#each Object.entries(observationFrequency) as [value, label]}
            <Form.Control>
              {#snippet children({ props })}
                <div class="flex items-center space-x-2">
                  <RadioGroup.Item {...props} {value} id={value} />
                  <Label for={value}>{`${label} (${value})`}</Label>
                </div>
              {/snippet}
            </Form.Control>
          {/each}
        </RadioGroup.Root>
        <Form.FieldErrors />
      </Form.Fieldset>
      <Form.Field {form} name="notes">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Notes</Form.Label>
            <Textarea
              {...props}
              placeholder="Add notes here"
              class="resize-none"
              bind:value={$formData.notes}
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button type="submit" disabled={$submitting}>Submit</Form.Button>
      <SuperDebug data={$formData} />
    </form>
  </Card.Content>
</Card.Root>
