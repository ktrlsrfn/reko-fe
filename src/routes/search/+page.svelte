<script lang="ts">
    import ShowItem from "$lib/components/ShowItem.svelte";
    import { ConicGradient } from '@skeletonlabs/skeleton';
    import type { ConicStop } from '@skeletonlabs/skeleton';

    export let data;
    $: watchlist = data.watchlist;

    $: search = '';
    $: shows = [] as any;
    $: loading = false;

    const conicStops: ConicStop[] = [
        { color: 'transparent', start: 0, end: 25 },
        { color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
    ];

    async function searchShows() {
        loading = true;

        const response = await fetch('/api/show/search?' + new URLSearchParams({
            query: search
        }));

        if (response.status === 200) {
            const content = await response.json();
            shows = content.data;
        }
        
        loading = false;
    }
</script>

<div class="flex flex-col w-full p-4 gap-4 items-center">
    <h1 class="text-6xl font-extrabold py-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">Look for shows</h1>
    <div class="flex w-full h-12 gap-2 justify-center items-center px-16">
        <input bind:value={search} on:change={searchShows} type="text" class="input w-full h-full px-4 border-solid border-4 text-lg" placeholder="Search">
        <div class="{ loading ? 'flex' : 'hidden' } items-center h-full">
            <ConicGradient width="w-8" stops={conicStops} spin></ConicGradient>
        </div>
    </div>
    <div class="flex flex-wrap gap-2 justify-around">
        {#if !loading}
            {#each shows as show}
                <ShowItem {show} type={show.type} {watchlist} />
            {/each}
        {/if}
    </div>
</div>