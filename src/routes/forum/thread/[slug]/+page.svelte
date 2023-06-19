<script lang="ts">
    import { modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    import defaultProfile from '$lib/images/default-user.png';

    export let data;
    $: ({ thread, session } = data);
    $: user = session?.user;

    $: comment = '';
    $: disableComment = false;
    $: posts = null as any;

    async function handleComment() {
        disableComment = true;

        if (!comment.length) {
            const modal: ModalSettings = {
                type: 'alert',
                title: 'Invalid',
                body: 'Comment cannot be blank'
            };
            modalStore.trigger(modal);
            disableComment = false;
            return;
        }

        const request = await fetch('/api/forum/post/create', {
            method: 'POST',
            body: JSON.stringify({
                id: thread.id,
                content: comment
            })
        });

        if (request.status !== 200) {
            const modal: ModalSettings = {
                type: 'alert',
                title: 'Error',
                body: 'Unable to create comment'
            };
            modalStore.trigger(modal);
            disableComment = false;
            return;
        }
        
        await loadPosts();

        comment = '';
        disableComment = false;
    }

    async function loadPosts() {
        const response = await fetch('/api/forum/post/list', {
            method: 'POST',
            body: JSON.stringify({
                id: thread.id
            })
        });

        if (response.status === 200) {
            const content = await response.json();
            posts = content.data;
        }
    }

    onMount(async () => {
        await loadPosts();
    });
</script>

<div class="flex flex-col p-4 w-full gap-4">
    <div class="flex flex-col w-full rounded-2xl bg-slate-900 p-4 gap-4">
        <div class="flex flex-col gap-2 justify-start">
            <div class="flex gap-2 h-6 items-center">
                <img class="max-h-full rounded-full" src="{thread.author_avatar ?? defaultProfile}" alt="">
                <span class="text-slate-100">{thread.author_name}</span>
            </div>
            <h1 class="font-bold text-3xl text-start">{thread.title}</h1>
            <div class="flex gap-2 w-full overflow-hidden">
                {#each thread.tags as tag}
                    <div class="flex justify-center items-center bg-blue-500 rounded-3xl h-6 px-3">
                        <span class="mt-[-2px]">{tag.name}</span>
                    </div>
                {/each}
            </div>
        </div>
        <div class="w-full px-2 bg-slate-400/50 h-[1px]"></div>
        <div>
            {@html thread.content}
        </div>
    </div>

    <div class="{ user ? 'flex' : 'hidden' } flex-col w-full rounded-2xl bg-slate-900 p-4 gap-4">
        <textarea bind:value={comment} class="textarea p-4" rows="2" placeholder="Comment here" />
        <div class="flex w-full justify-end">
            <button disabled={disableComment} on:click={handleComment} class="btn variant-filled">Comment</button>
        </div>
    </div>

    <div class="flex flex-col gap-2">
        {#if posts}
            {#each posts as post}
                <div class="flex flex-col w-full rounded-2xl bg-slate-900 p-4 gap-2">
                    <div class="flex gap-2 h-6 items-center">
                        <img class="max-h-full rounded-full" src="{post.author_avatar ?? defaultProfile}" alt="">
                        <span class="text-slate-100">{post.author_name}</span>
                    </div>
                    <span class="text-lg">
                        {post.content}
                    </span>
                </div>
            {/each}
        {:else}
            <span class="font-semibold text-2xl">Loading...</span>
        {/if}
    </div>
</div>