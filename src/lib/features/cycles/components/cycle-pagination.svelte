<script lang="ts">
  const {
    total,
    pageSize,
    currentPage,
  }: {
    total: number;
    pageSize: number;
    currentPage: number;
  } = $props();

  const arr = $derived(Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i));
</script>

<div class="pagination">
  {#each arr as idx}
    <a href="/cycles/{idx + 1}" class={currentPage === idx ? 'text-emerald-300' : ''}>
      {idx + 1}
    </a>
  {/each}
</div>
