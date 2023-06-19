<script lang="ts">
    import ShowItem from "$lib/components/ShowItem.svelte";


    export let data;
    $: watchlist = data.watchlist;
    $: shows = data.shows;
</script>

<div class="flex p-4 justify-start gap-2 flex-wrap">
    {#each shows as show}
        <ShowItem {show} type={show.type} {watchlist} />
    {/each}
</div>