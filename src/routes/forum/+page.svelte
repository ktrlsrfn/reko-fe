<script lang="ts">
    import defaultProfile from '$lib/images/default-user.png';

    export let data: any;
    $: threads = data.threads;
    $: session = data.session;
</script>

<div class="flex flex-col w-full p-4 gap-4">
    <div class="{ session ? 'flex' : 'hidden' } w-full justify-end">
        <a href="/forum/create" class="bg-blue-500 rounded-3xl px-6 py-2 !no-underline hover:brightness-90 transition duration-75">
            <span class="text-white text-lg font-semibold">Create Thread</span>
        </a>
    </div>

    <div class="flex flex-col w-full overflow-hidden gap-4">
        {#each threads as thread}
            <a href="/forum/thread/{thread.id}" class="flex flex-col flex-wrap w-full h-[120px] justify-between bg-slate-900 rounded-lg px-4 py-4 overflow-hidden cursor-pointer !no-underline hover:brightness-90 transition-all duration-75">
                <div class="flex gap-2 h-6 items-center">
                    <img class="max-h-full rounded-full" src="{thread.author_avatar ?? defaultProfile}" alt="">
                    <span class="text-slate-100">{thread.author_name}</span>
                </div>
                <span class="text-2xl font-bold text-white overflow-hidden text-ellipsis">{thread.title}</span>
                <div class="flex gap-2 w-full overflow-hidden">
                    {#each thread.tags as tag}
                        <div class="flex justify-center items-center bg-blue-500 rounded-3xl h-6 px-3">
                            <span class="mt-[-2px]">{tag.name}</span>
                        </div>
                    {/each}
                </div>
            </a>
        {/each}
    </div>
</div>
