<script>
	import RekoLogo from '$lib/images/reko-logo.png';
	import { menus } from '$lib/stores/menus.js';
	import { page } from '$app/stores';

	$: slug = $page.params.slug?.toLowerCase();

	export let sidebar = false;
</script>

<header class="flex h-20 px-8 justify-between items-center shadow-xl z-10">
	<div class="flex items-center gap-8">
		<button class="text-white" class:sidebar on:click={() => sidebar = !sidebar}>
			<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
		</button>
		<a href="/">
			<img src={RekoLogo} alt="reko" class="h-10 mt-2" />
		</a>
	</div>
	<nav class="hidden sm:flex">
		<ul class="flex text-white font-sans gap-10 text-lg">
			{#each menus as { name, link }}
				<li class="flex items-center">
					<a href="/browse/{link}" class="{slug === link.toLowerCase() ? 'menu-select' : ''} p-4 font-semibold uppercase">{ name }</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.menu-select {
		color: #9e822f;
	}

	a:hover {
		text-decoration: none;
		filter: brightness(80%);
	}
</style>
