<script lang="ts">
  import { CYCLE_LIMIT_FETCH } from '../CONSTANT';

  const {
    total,
    currentPage,
  }: {
    total: number;
    currentPage: number;
  } = $props();

  const arr = $derived(Array.from({ length: Math.ceil(total / CYCLE_LIMIT_FETCH) }, (_, i) => i));
  $effect(() => console.log(currentPage));
</script>

<div class="flex w-full items-center justify-center gap-x-5">
  {#each arr as idx}
    <a href={`/cycles?page=${idx + 1}`} class={currentPage === idx ? 'text-emerald-300' : ''}>
      {idx + 1}
    </a>
  {/each}
</div>
