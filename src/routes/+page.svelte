<script>
	import Dashboard from '$lib/components/Dashboard.svelte';
</script>

<svelte:head>
	<title>Reko</title>
</svelte:head>

<section>
	<Dashboard />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
