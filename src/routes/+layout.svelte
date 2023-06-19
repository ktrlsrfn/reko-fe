<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	import './styles.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	import type { LayoutData } from './$types';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';

	import { Modal } from '@skeletonlabs/skeleton';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event: any, _session: any) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	$: user = session?.user;

	export let sidebarOpen = false
</script>

<svelte:head>
	<title>Reko</title>
</svelte:head>

<div class="flex flex-col w-full min-h-full bg-slate-900">
	<Header bind:sidebar={sidebarOpen} />

	<main class="flex w-full min-h-full flex-grow bg-slate-800">
		<Sidebar bind:open={sidebarOpen} {user} />
		<slot />
	</main>

	<Modal />
</div>