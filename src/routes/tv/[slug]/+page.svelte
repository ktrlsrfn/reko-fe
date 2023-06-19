<script>
	import ShowDetail from "$lib/components/ShowDetail.svelte";

  export let data;

  const show = data.show.content;
</script>

<div class="flex">
  <ShowDetail {show} />
</div>