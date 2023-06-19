<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
    import { InputChip } from '@skeletonlabs/skeleton';
    import { modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

    $: title = '';
    $: content = '';
    $: tags = [];
    $: disableCreate = false;
    
    async function handleSubmit() {
        disableCreate = true;

        const data = {
            title,
            content,
            tags
        };

        if (!title.length || !content.length) {
            const modal: ModalSettings = {
                type: 'alert',
                title: 'Invalid',
                body: 'Please input all data'
            };
            modalStore.trigger(modal);
            disableCreate = false;
            return false;
        }

        const request = await fetch('/api/forum/create', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (request.status !== 200) {
            const modal: ModalSettings = {
                type: 'alert',
                title: 'Error',
                body: 'Unable to create thread'
            };
            modalStore.trigger(modal);
            disableCreate = false;
            return false;
        }

        const response = await request.json();
        const threadId = response.data.id;

        await goto(`/forum/thread/${threadId}`);
    }
</script>
<div class="flex flex-col items-start p-8 flex-grow w-full gap-4">
    <h1 class="text-white text-2xl font-semibold ml-2">Create new thread</h1>

    <form method="POST" on:submit|preventDefault={handleSubmit} class="flex flex-col w-full bg-slate-900 rounded-xl p-6 gap-6">
        <input id="title" bind:value={title} class="input h-10 px-4" type="text" placeholder="Title">

        <Editor bind:value={content}/>

        <InputChip bind:value={tags} name="chips" placeholder="Enter your tags here" />

        <div class="flex w-full justify-end">
            <button type="submit" class="btn variant-filled" disabled={disableCreate}>
                <span class="font-semibold">Create</span>
            </button>
        </div>
    </form>
</div>